import Swal from 'sweetalert2';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from 'src/app/services/utility.service';
import { UserDto } from 'src/app/api/models';
import { ModalUserComponent } from '../../components/modal-user/modal-user.component';
import { ComunicationService } from 'src/app/services/comunication.service';
import { AuthService } from 'src/app/api';
import { ModalEditUserComponent } from '../../components/modal-edit-user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'actions'];
  homeData: UserDto[] = [];
  DataUserList = new MatTableDataSource(this.homeData);

  @ViewChild(MatPaginator) paginationTable!: MatPaginator;

  constructor(
    private userService: AuthService,
    private utilityservice: UtilityService,
    private _MatPaginatorIntl: MatPaginatorIntl,
    private dialog: MatDialog,
    private _Comunicate: ComunicationService
  ) {}

  ngOnInit() {
    this.getUsers();
    this._MatPaginatorIntl.itemsPerPageLabel = 'Item por página';
    this._MatPaginatorIntl.firstPageLabel = 'Primera página';
    this._MatPaginatorIntl.lastPageLabel = 'Úlitma página';
    this._MatPaginatorIntl.nextPageLabel = 'Página siguiente';
    this._MatPaginatorIntl.previousPageLabel = 'Página anterior';
  }

  ngAfterViewInit(): void {
    this.DataUserList.paginator = this.paginationTable;
  }

  filterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.DataUserList.filter = filterValue.trim().toLocaleLowerCase();
  }

  getUsers() {
    this.userService.apiAuthUserGet$Json().subscribe({
      next: (data) => {
        this.DataUserList.data = data.data;
      },
      error: () => {
        this.utilityservice.ShowAlert('Ha ocurrido un error', 'Opps!');
      },
    });
  }

  newUser() {
    this._Comunicate.showField = true;
    this.dialog
      .open(ModalUserComponent, {
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'true') {
          this.getUsers();
        }
      });
  }

  editUser(user: UserDto) {
    this._Comunicate.showField = false;
    this.dialog
      .open(ModalEditUserComponent, {
        disableClose: true,
        data: user,
        width: '400'
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'true') {
          this.getUsers();
        }
      });
  }

  deleteUser(user: UserDto) {
    Swal.fire({
      title: '¿Desea eliminar el usuario?',
      text: `Esta seguro que desea eliminar el usuario: ${user.username}`,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService
          .apiAuthUserUsernameDelete$Json({ username: user.username })
          .subscribe({
            next: (data) => {
              if (data) {
                this.utilityservice.ShowAlert(
                  'El usuario fue eliminado',
                  'Listo!'
                );
                this.getUsers();
              } else
                this.utilityservice.ShowAlert(
                  'No se pudo eliminar el usuario',
                  'Error'
                );
            },
            error: (e) => {},
          });
      }
    });
  }
}
