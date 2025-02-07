import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ModalAddPurchaseDetailComponent } from '../modal-add-purchase-detail/modal-add-purchase-detail.component';
import * as moment from 'moment';
import { UtilityService } from 'src/app/services/utility.service';
import {
  ProductDto,
  PurchaseDetailInputDto,
  PurchaseInputDto,
  SupplierDto,
  UserDto,
} from 'src/app/api/models';
import {
  AuthService,
  ProductService,
  PurchaseService,
  SupplierService,
} from 'src/app/api';

@Component({
  selector: 'app-modal-add-purchase',
  templateUrl: './modal-add-purchase.component.html',
  styleUrls: ['./modal-add-purchase.component.css'],
})
export class ModalAddPurchaseComponent {
  suppliers: SupplierDto[] = [];
  displayedColumns: string[] = [
    'productId',
    'description',
    'suggestedRetailPrice',
    'unitCost',
    'quantity',
    'subtotal',
    'actions',
  ];
  homeData: (PurchaseDetailInputDto & {
    description: string;
    subtotal: number;
  })[] = [];
  availableProducts: ProductDto[] = [];
  dataSource = new MatTableDataSource(this.homeData);
  session: UserDto;

  constructor(
    private formBuilder: FormBuilder,
    private supplierService: SupplierService,
    public dialog: MatDialogRef<ModalAddPurchaseComponent>,
    private dialogs: MatDialog,
    private productService: ProductService,
    private utilityService: UtilityService,
    private purchaseService: PurchaseService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.supplierService
      .apiSupplierGet$Json()
      .subscribe(({ data }) => (this.suppliers = data));

    this.productService
      .apiProductByTypeTypeGet$Json({ type: 'I' })
      .subscribe(
        ({ data }) =>
          this.availableProducts = data
      );

    this.session = this.authService.currentUser.user;
  }

  close() {
    this.dialog.close();
  }

  removeProduct(id: string) {
    this.homeData = this.homeData.filter((x) => x.productId != id);
    this.dataSource.data = this.homeData;
  }

  addProduct() {
    const dialogResult = this.dialogs.open(ModalAddPurchaseDetailComponent, {
      disableClose: true,
      width: '500px',
      data: this.availableProducts.filter(
        (ap) =>
          !this.homeData.some((x) => x.productId == ap.productId) &&
          ap.type != 'S'
      ),
    });

    dialogResult.afterClosed().subscribe((data: PurchaseDetailInputDto) => {
      if (!data) return;

      const { description } = this.availableProducts.find((x) => x.productId);
      this.homeData.push({
        ...data,
        description: description,
        subtotal: data.quantity * data.unitCost,
      });
      this.dataSource.data = this.homeData;
    });
  }

  createPurchase() {
    const purchase: PurchaseInputDto = {
      date: this.providerFormGroup.controls['date'].value.toISOString(),
      supplierId: this.providerFormGroup.controls['supplierId'].value,
      supplierInvoiceId:
        this.providerFormGroup.controls['supplierInvoiceId'].value,
      detail: this.homeData,
      discount: this.invoiceDetailGroup.controls['discount'].value,
      tax: this.invoiceDetailGroup.controls['tax'].value,
      subtotal: this.homeData.reduce((a, b) => a + b.subtotal, 0),
      branchId: this.session.defaultBranch.branchId,
    };

    this.purchaseService.apiPurchasePost$Json({ body: purchase }).subscribe({
      next: ({ message }) => {
        this.utilityService.ShowAlert(message, 'Éxito');
        this.dialog.close(true);
      },
      error: ({ error }) => {
        this.utilityService.ShowAlert(error.message, 'Error');
      },
    });
  }

  getErrorMessage() {
    if (this.providerFormGroup.controls['date'].hasError('required')) {
      return 'Debe ingresar la fecha de la compra';
    }
    return '';
  }

  providerFormGroup = this.formBuilder.group({
    date: [moment(), Validators.required],
    supplierId: ['', Validators.required],
    supplierInvoiceId: ['', Validators.required],
  });

  purchaseDetailGroup = this.formBuilder.group({});

  invoiceDetailGroup = this.formBuilder.group({
    discount: new FormControl(
      {
        value: 0,
        disabled: false,
      },
      Validators.required
    ),
    tax: new FormControl(
      {
        value: 0,
        disabled: false,
      },
      Validators.required
    ),
  });
}
