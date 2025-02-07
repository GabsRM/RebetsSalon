import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BranchDto,
  InvoiceDetailDto,
  UserDto,
  AuthService,
  InvoiceService,
  ProductService,
  ProductAvailableDto,
  ProductDto,
} from 'src/app/api';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent {
  displayedColumns: string[] = [
    'description',
    'unitPrice',
    'quantity',
    'subtotal',
    'actions',
  ];
  homeData: InvoiceDetailDto[] = [];
  products: ProductAvailableDto[] = [];
  DataInvoiceList = new MatTableDataSource(this.homeData);
  filteredOptions: Observable<ProductDto[]>;
  subtotal = 0;
  active = true;
  discount = 0;
  user: UserDto;
  branch: BranchDto;
  date: string;
  id: string;

  constructor(
    private productService: ProductService,
    private invoiceService: InvoiceService,
    private matPaginatorIntl: MatPaginatorIntl,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    const id = this.route.snapshot.params['id'];
    this.id = id || undefined;
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.products
      .filter(option => !this.homeData.find(x => x.productId === option.productId))
      .filter(option => (option?.productId?.toLowerCase().includes(filterValue) || option?.barcode?.toLowerCase().includes(filterValue) || option?.description?.toLowerCase().includes(filterValue)));
  }

  async ngOnInit() {
    this.user = this.authService.currentUser.user;

    if (this.id) {
      this.invoiceService.apiInvoiceIdGet$Json({ id: this.id }).subscribe({
        next: ({ data }) => {
          this.homeData = data.details;
          this.subtotal = data.subtotal;
          this.discount = data.discount;
          this.active = data.active;
          this.date = moment(data.date).format('DD, MMMM YYYY');
          this.branch = data.branch;
          this.DataInvoiceList.data = data.details;
        },
        error: async ({ error }) => {
          await Swal.fire('Error', error.detail, 'error');
          this.router.navigateByUrl('/invoicing/invoices');
        },
      });
    } else {
      this.subtotal = this.homeData.reduce((a, b) => a + b.subtotal, 0);
      this.date = moment().format('DD, MMMM YYYY');
      const { defaultBranch } = this.authService.currentUser.user;

      if (!defaultBranch) {
        await Swal.fire(
          'Advertencia',
          'Su usuario no está asignado a una sucursal',
          'warning'
        );
        this.router.navigate(['invoicing', 'invoices']);
        return;
      }

      this.branch = defaultBranch;
    }

    this.productService.apiProductAvailableGet$Json().subscribe({
      next: ({ data }) => {
        this.products = data

        this.filteredOptions = this.productForm.controls.productKey.valueChanges.pipe(startWith(''),
          map(value => this._filter(value || '')),
        );
      },
    });



    this.matPaginatorIntl.itemsPerPageLabel = 'Item por página';
    this.matPaginatorIntl.firstPageLabel = 'Primera página';
    this.matPaginatorIntl.lastPageLabel = 'Úlitma página';
    this.matPaginatorIntl.nextPageLabel = 'Página siguiente';
    this.matPaginatorIntl.previousPageLabel = 'Página anterior';
  }

  addQuantity(productId: string) {
    const { stock } = this.products.find(x => x.productId === productId);

    if (this.homeData.find(x => x.productId === productId).quantity === stock)
      return Swal.fire(
        'Advertencia',
        'No existe stock del producto que desea facturar',
        'warning'
      ) && null;

    this.homeData.find(x => x.productId === productId).quantity++;
    this.DataInvoiceList.data = this.homeData;
  }

  substractQuantity(productId: string) {
    if (this.homeData.find(x => x.productId === productId).quantity <= 1)
      return
    this.homeData.find(x => x.productId === productId).quantity--;
    this.DataInvoiceList.data = this.homeData;
  }

  ngAfterViewInit(): void { }

  filterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.DataInvoiceList.filter = filterValue.trim().toLocaleLowerCase();
  }

  addProduct(productKey: string) {
    const product = this.products.find(
      (x) => x.barcode === productKey || x.productId === productKey
    );

    if (!product) {
      Swal.fire(
        'Advertencia',
        'No se ha encontrado el producto que intentas agregar',
        'warning'
      );
      return;
    }

    const existProduct = this.homeData.find(
      (x) => x.productId === product.productId
    );

    if (
      existProduct &&
      product.stock - existProduct.quantity === 0 &&
      product.productId.includes('P')
    ) {
      Swal.fire(
        'Advertencia',
        'No existe stock del producto que desea facturar',
        'warning'
      );
      return;
    }

    if (existProduct) {
      existProduct.quantity += 1;
      existProduct.subtotal = existProduct.quantity * existProduct.unitPrice;
      this.homeData = this.homeData.filter(
        (x) => x.productId !== existProduct.productId
      );
      this.homeData.push(existProduct);
    } else {
      this.homeData.push({
        productId: product.productId,
        description: product.description,
        quantity: 1,
        unitPrice: product.price,
        subtotal: product.price,
      });
    }
    this.DataInvoiceList.data = this.homeData;
    this.subtotal = this.homeData.reduce((a, b) => a + b.subtotal, 0);
  }

  substractProduct(productId: string) {
    const existProduct = this.homeData.find(
      (x) => x.productId === productId
    );

    if (existProduct && existProduct.quantity > 1) {
      existProduct.quantity--;
      existProduct.subtotal = existProduct.quantity * existProduct.unitPrice;
    }

    this.DataInvoiceList.data = this.homeData;
    this.subtotal = this.homeData.reduce((a, b) => a + b.subtotal, 0);
  }

  findProduct() {
    if (this.productForm.invalid) {
      Swal.fire(
        'Advertencia',
        'No se ha encontrado el producto que intentas ingresar',
        'warning'
      );
      return;
    }

    const { productKey } = this.productForm.getRawValue();

    this.addProduct(productKey);

    this.productForm.reset();
  }

  async removeProduct(id: string) {
    this.homeData = this.homeData.filter((x) => x.productId !== id);
    this.DataInvoiceList.data = this.homeData;
    this.subtotal = this.homeData.reduce((a, b) => a + b.subtotal, 0);
  }

  productForm = this.formBuilder.group({
    productKey: new FormControl(
      {
        disabled: false,
        value: '',
      },
      Validators.required
    ),
  });

  async saveInvoice() {
    if (!this.homeData.length) {
      Swal.fire(
        'Advertencia',
        'Debe ingresar al menos un producto para facturar',
        'warning'
      );
      return;
    }

    const { isConfirmed } = await Swal.fire({
      titleText: 'Guardar Factura',
      text: '¿Está seguro que desea guardar la factura?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Si, facturar',
      cancelButtonText: 'Cancelar',
    });

    if (!isConfirmed) return;

    this.invoiceService
      .apiInvoicePost$Json({
        body: {
          discount: 0,
          details: this.homeData,
        },
      })
      .subscribe({
        next: async ({ message }) => {
          const { isConfirmed } = await Swal.fire('Facturado', message, 'info');
          if (isConfirmed) this.router.navigateByUrl('/invoicing/invoices');
        },
        error: ({ error }) => { console.log(error); Swal.fire('Error', error?.message || error.detail, 'error') },
      });
  }
}
