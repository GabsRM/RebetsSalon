import Swal from 'sweetalert2'
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table';
import { UtilityService } from 'src/app/services/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { ComunicationService } from 'src/app/services/comunication.service';
import { SupplierDto } from 'src/app/api/models';
import { ModalSupplierComponent } from '../../components/modal-supplier/modal-supplier.component';
import { SupplierService } from 'src/app/api';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id','name', 'email', 'address', 'phone', 'actions']
  homeData: SupplierDto[] = []
  DataSupplierList = new MatTableDataSource(this.homeData)

  @ViewChild(MatPaginator) paginationTable!: MatPaginator;

  constructor(
    private supplierService: SupplierService,
    private _MatPaginatorIntl: MatPaginatorIntl,
    private utilityService: UtilityService,
    private dialog: MatDialog,
    private _comunication: ComunicationService
  ) { }

  ngOnInit(): void {
    this.getSupplier();
    this._MatPaginatorIntl.itemsPerPageLabel = 'Item por página';
    this._MatPaginatorIntl.firstPageLabel = "Primera página"
    this._MatPaginatorIntl.lastPageLabel = "Úlitma página"
    this._MatPaginatorIntl.nextPageLabel = "Página siguiente"
    this._MatPaginatorIntl.previousPageLabel = "Página anterior"
  }

  ngAfterViewInit(): void {
    this.DataSupplierList.paginator = this.paginationTable
  }

  filterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.DataSupplierList.filter = filterValue.trim().toLocaleLowerCase();
  }

  getSupplier() {
    this.supplierService.apiSupplierGet$Json().subscribe({
      next: (data) => {
        this.DataSupplierList.data = data.data
      },
      error: (e) => {
        this.utilityService.ShowAlert("Ha ocurrido un error", e.error)
      }
    })
  }

  newSupplier() {
    this.dialog.open(ModalSupplierComponent, {
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result === "true")
        this.getSupplier();
    })
  }

  editSupplier(supplier: SupplierDto) {
    this._comunication.Id = supplier.supplierId
    this.dialog.open(ModalSupplierComponent, {
      disableClose: true,
      data: supplier
    }).afterClosed().subscribe(result => {
      if (result === "true") {
        this.getSupplier();
      }
    })
  }

  deleteSupplier(supplier: SupplierDto) {
    Swal.fire({
      title: '¿Desea eliminar el proveedor?',
      text: supplier.name,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: "Sí, eliminar",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.supplierService.apiSupplierIdDelete$Json({ id: supplier.supplierId }).subscribe({
          next: (data) => {
            if (data) {
              this.utilityService.ShowAlert("El producto fue eliminado", "Listo");
              this.getSupplier();
            } else
              this.utilityService.ShowAlert("No se pudo eliminar el producto", "Error")
          },
          error: (e) => { }
        })
      }
    })
  }


}
