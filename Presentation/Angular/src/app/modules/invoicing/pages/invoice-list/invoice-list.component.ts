import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UtilityService } from 'src/app/services/utility.service';
import { InvoiceDto } from 'src/app/api/models';
import Swal from 'sweetalert2';
import { ModalInvoiceReportComponent } from '../../components';
import { InvoiceService } from 'src/app/api';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
})
export class InvoiceListComponent {
  displayedColumns: string[] = [
    'invoiceId',
    'date',
    'subtotal',
    'discount',
    'tax',
    'active',
    'branch',
    'actions',
  ];
  homeData: InvoiceDto[] = [];
  DataInvoiceList = new MatTableDataSource(this.homeData);

  @ViewChild(MatPaginator) paginationTable!: MatPaginator;

  constructor(
    private invoiceService: InvoiceService,
    private utilityservice: UtilityService,
    private _MatPaginatorIntl: MatPaginatorIntl,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getInvoices();
    this._MatPaginatorIntl.itemsPerPageLabel = 'Item por página';
    this._MatPaginatorIntl.firstPageLabel = 'Primera página';
    this._MatPaginatorIntl.lastPageLabel = 'Úlitma página';
    this._MatPaginatorIntl.nextPageLabel = 'Página siguiente';
    this._MatPaginatorIntl.previousPageLabel = 'Página anterior';
  }

  ngAfterViewInit(): void {
    this.DataInvoiceList.paginator = this.paginationTable;

  }

  filterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.DataInvoiceList.filter = filterValue.trim().toLocaleLowerCase();
  }

  getInvoices() {
    this.invoiceService.apiInvoiceGet$Json().subscribe({
      next: (data) => {
        this.DataInvoiceList.data = data.data;
      },
      error: () => {
        this.utilityservice.ShowAlert('Ha ocurrido un error', 'Opps!');
      },
    });
  }

  openReport(id: string) {
    this.dialog.open(ModalInvoiceReportComponent, {
      disableClose: true,
      data: id,
    });
  }

  async cancelInvoice(id: string) {
    const { isConfirmed } = await Swal.fire({
      title: '¿Desea anular la factura?',
      text: `Se anulará la factura con id: ${id} y se devolverá los artículos al inventario`,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed) {
      this.invoiceService.apiInvoiceIdDelete$Json({ id }).subscribe({
        next: ({ message }) => {
          this.utilityservice.ShowAlert(message, 'Ok'), this.getInvoices();
        },
        error: ({ error }) =>
          this.utilityservice.ShowAlert(error.message, 'Ok'),
      });
    }
  }
}
