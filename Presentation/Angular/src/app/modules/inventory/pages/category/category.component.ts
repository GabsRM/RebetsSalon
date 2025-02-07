import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { UtilityService } from 'src/app/services/utility.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDto } from 'src/app/api/models';
import { ComunicationService } from 'src/app/services/comunication.service';
import { ModalCategoryComponent } from '../../components/modal-category/modal-category.component';

import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/api';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginationTable!: MatPaginator;

  constructor(
    private categoryService: CategoryService,
    private matPaginatorIntl: MatPaginatorIntl,
    private comunication: ComunicationService,
    private dialog: MatDialog,
    private utilityService: UtilityService
  ) {}

  displayedColumns: string[] = ['categoryId', 'name', 'description', 'actions'];
  homeData: CategoryDto[] = [];
  DataCategoryList = new MatTableDataSource(this.homeData);

  ngOnInit() {
    this.getCategory();
    this.matPaginatorIntl.itemsPerPageLabel = 'Item por página';
    this.matPaginatorIntl.firstPageLabel = 'Primera página';
    this.matPaginatorIntl.lastPageLabel = 'Úlitma página';
    this.matPaginatorIntl.nextPageLabel = 'Página siguiente';
    this.matPaginatorIntl.previousPageLabel = 'Página anterior';
  }

  ngAfterViewInit(): void {
    this.DataCategoryList.paginator = this.paginationTable;

  }

  filterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.DataCategoryList.filter = filterValue.trim().toLocaleLowerCase();
  }

  getCategory() {
    this.categoryService.apiCategoryGet$Json().subscribe({
      next: (data) => {
        this.DataCategoryList.data = data.data;
      },
    });
  }

  newCategory() {
    this.dialog
      .open(ModalCategoryComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'true') {
          this.getCategory();
        }
      });
  }

  editCategory(category: CategoryDto) {
    this.comunication.Id = category.categoryId.toString();
    this.dialog
      .open(ModalCategoryComponent, {
        disableClose: true,
        data: category,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'true') {
          this.getCategory();
        }
      });
  }
  deleteCategory(category: CategoryDto) {
    Swal.fire({
      title: '¿Desea eliminar el producto?',
      text: category.name,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService
          .apiCategoryIdDelete$Json({ id: category.categoryId.toString() })
          .subscribe({
            next: (data) => {
              if (data) {
                this.utilityService.ShowAlert(
                  'El producto fue eliminado',
                  'Listo'
                );
                this.getCategory();
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
