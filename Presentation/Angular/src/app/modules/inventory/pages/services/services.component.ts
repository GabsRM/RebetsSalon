import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UtilityService } from 'src/app/services/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalProductComponent } from '../../components';
import { ComunicationService } from 'src/app/services/comunication.service';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/api';
import { ProductDto } from 'src/app/api/models/product-dto';
import { ModalServiceComponent } from '../../components/modal-service/modal-service.component';

@Component({
  templateUrl: './services.component.html',
})
export class ServicesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'productId',
    'description',
    'price',
    'actions',
  ];
  homeData: ProductDto[] = [];
  DataProductList = new MatTableDataSource(this.homeData);

  @ViewChild(MatPaginator) paginationTable!: MatPaginator;

  constructor(
    private productService: ProductService,
    private matPaginatorIntl: MatPaginatorIntl,
    private utilityService: UtilityService,
    private dialog: MatDialog,
    private _comunication: ComunicationService
  ) {}

  ngOnInit(): void {
    this.getProduct();
    this.matPaginatorIntl.itemsPerPageLabel = 'Item por página';
    this.matPaginatorIntl.firstPageLabel = 'Primera página';
    this.matPaginatorIntl.lastPageLabel = 'Úlitma página';
    this.matPaginatorIntl.nextPageLabel = 'Página siguiente';
    this.matPaginatorIntl.previousPageLabel = 'Página anterior';
  }
  ngAfterViewInit(): void {
    this.DataProductList.paginator = this.paginationTable;

  }

  filterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.DataProductList.filter = filterValue.trim().toLocaleLowerCase();
  }

  getProduct() {
    this.productService.apiProductByTypeTypeGet$Json({ type: 'S' }).subscribe({
      next: ({ data }) => {
        this.DataProductList.data = data;
      },
      error: (e) => {
        this.utilityService.ShowAlert('Ha ocurrido un error', e.error);
      },
    });
  }

  newProduct() {
    this.dialog
      .open(ModalServiceComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'true') this.getProduct();
      });
  }

  editProduct(product: ProductDto) {
    this._comunication.Id = product.productId;
    this.dialog
      .open(ModalServiceComponent, {
        disableClose: true,
        data: product,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'true') {
          this.getProduct();
        }
      });
  }

  deleteProduct(product: ProductDto) {
    Swal.fire({
      title: '¿Desea eliminar el servicio?',
      text: product.description,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService
          .apiProductIdDelete$Json({ id: product.productId })
          .subscribe({
            next: (data) => {
              if (data) {
                this.utilityService.ShowAlert(
                  'El producto fue eliminado',
                  'Listo'
                );
                this.getProduct();
              } else
                this.utilityService.ShowAlert(
                  'No se pudo eliminar el producto',
                  'Error'
                );
            },
            error: (e) => {},
          });
      }
    });
  }
}
