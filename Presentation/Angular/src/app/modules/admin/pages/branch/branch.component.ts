import Swal from 'sweetalert2';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { UtilityService } from 'src/app/services/utility.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BranchDto } from 'src/app/api/models';
import { ComunicationService } from 'src/app/services/comunication.service';
import { ModalBranchComponent } from '../../components';
import { BranchService } from 'src/app/api';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
})
export class BranchComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginationTable!: MatPaginator;

  '';
  constructor(
    private _MatPaginatorIntl: MatPaginatorIntl,
    private _comunication: ComunicationService,
    private dialog: MatDialog,
    private utilityService: UtilityService,
    private branchService: BranchService
  ) {}

  displayedColumns: string[] = ['branchId', 'name', 'address', 'actions'];
  homeData: BranchDto[] = [];
  DataCategoryList = new MatTableDataSource(this.homeData);

  ngOnInit() {
    this.getBranchs();
    this._MatPaginatorIntl.itemsPerPageLabel = 'Item por página';
    this._MatPaginatorIntl.firstPageLabel = 'Primera página';
    this._MatPaginatorIntl.lastPageLabel = 'Úlitma página';
    this._MatPaginatorIntl.nextPageLabel = 'Página siguiente';
    this._MatPaginatorIntl.previousPageLabel = 'Página anterior';
  }

  ngAfterViewInit(): void {
    this.DataCategoryList.paginator = this.paginationTable;
  }

  filterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.DataCategoryList.filter = filterValue.trim().toLocaleLowerCase();
  }

  getBranchs() {
    this.branchService.apiBranchGet$Json().subscribe({
      next: (data) => {
        this.DataCategoryList.data = data.data;
      },
    });
  }

  newBranch() {
    this.dialog
      .open(ModalBranchComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'true') {
          this.getBranchs();
        }
      });
  }

  editBranch(branch: BranchDto) {
    this._comunication.Id = branch.branchId.toString();
    this.dialog
      .open(ModalBranchComponent, {
        disableClose: true,
        data: branch,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'true') {
          this.getBranchs();
        }
      });
  }

  deleteBranch(branch: BranchDto) {
    Swal.fire({
      title: '¿Desea eliminar la sucursal?',
      text: branch.name,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.branchService
          .apiBranchIdDelete$Json({ id: branch.branchId })
          .subscribe({
            next: ({ message }) => {
              this.utilityService.ShowAlert(message, 'Listo');
              this.getBranchs();
            },
            error: (e) => {
              this.utilityService.ShowAlert(
                'No se pudo eliminar la sucursal',
                'Error'
              );
            },
          });
      }
    });
  }
}
