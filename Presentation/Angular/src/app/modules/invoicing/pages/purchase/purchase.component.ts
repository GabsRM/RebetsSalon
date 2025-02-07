import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'src/app/services/utility.service';
import { PurchaseDto } from 'src/app/api/models';
import {
  ModalPurchaseDetailComponent,
  ModalAddPurchaseComponent,
} from '../../components';
import Swal from 'sweetalert2';
import { AuthService, PurchaseService } from 'src/app/api';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'purchaseId',
    'date',
    'subtotal',
    'discount',
    'tax',
    'active',
    'supplier',
    'detail',
  ];
  homeData: PurchaseDto[] = [];
  DataPurchaseList = new MatTableDataSource(this.homeData);

  @ViewChild(MatPaginator) paginationTable!: MatPaginator;

  constructor(
    private purchaseService: PurchaseService,
    private utilityservice: UtilityService,
    private authService: AuthService,
    private _MatPaginatorIntl: MatPaginatorIntl,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getPurchase();
    this._MatPaginatorIntl.itemsPerPageLabel = 'Item por página';
    this._MatPaginatorIntl.firstPageLabel = 'Primera página';
    this._MatPaginatorIntl.lastPageLabel = 'Úlitma página';
    this._MatPaginatorIntl.nextPageLabel = 'Página siguiente';
    this._MatPaginatorIntl.previousPageLabel = 'Página anterior';
  }

  ngAfterViewInit(): void {
    this.DataPurchaseList.paginator = this.paginationTable;

  }

  filterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.DataPurchaseList.filter = filterValue.trim().toLocaleLowerCase();
  }

  getPurchase() {
    this.purchaseService.apiPurchaseGet$Json().subscribe({
      next: (data) => {
        this.DataPurchaseList.data = data.data;
      },
      error: () => {
        this.utilityservice.ShowAlert('Ha ocurrido un error', 'Opps!');
      },
    });
  }

  openDetail(purchaseDto: PurchaseDto) {
    this.dialog.open(ModalPurchaseDetailComponent, {
      disableClose: true,
      data: purchaseDto,
    });
  }

  async newPurchase(): Promise<any> {
    if (!this.authService.currentUser.user.defaultBranch)
      return Swal.fire('Información', "Necesitas una sucursal para registrar una compra", 'info');

    this.dialog
      .open(ModalAddPurchaseComponent, {
        disableClose: true,
        width: '60%',
      })
      .afterClosed()
      .subscribe((result) => result && this.getPurchase());
  }

  async cancelPurchase(id: string) {
    const { isConfirmed } = await Swal.fire({
      title: '¿Desea anular la compra?',
      text: `Se anulará la compra con id: ${id} y se extraerán los artículos del inventario`,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed) {
      this.purchaseService.apiPurchaseIdDelete$Json({ id }).subscribe({
        next: ({ message }) => {
          this.utilityservice.ShowAlert(message, 'Ok'), this.getPurchase();
        },
        error: ({ error, status }) => {
          if (status === 400)
            return Swal.fire('Error', error.detail, 'error') && null;

          Swal.fire('Error', 'Ha ocurrido un error al anular la compra ' + id, 'error');
        }
      });
    }
  }
}
