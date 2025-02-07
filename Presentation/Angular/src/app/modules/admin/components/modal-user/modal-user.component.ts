import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/api';
import { UserDataInputDto, UserDto } from 'src/app/api/models';
import { ComunicationService } from 'src/app/services/comunication.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css'],
})
export class ModalUserComponent {
  formUser: FormGroup;
  hidePassword: boolean = true;
  actionTitle: string = 'Agregar';
  actionButton: string = 'Guardar';
  HidePassword: boolean = true;

  constructor(
    private currentModal: MatDialogRef<ModalUserComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: UserDto,
    private fb: FormBuilder,
    private _userService: AuthService,
    private _utilityService: UtilityService,
    public _comunication: ComunicationService
  ) {
    this.formUser = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: [
        '',
        _comunication.showField
          ? Validators.required
          : Validators.nullValidator,
      ],
      username: ['', Validators.required],
    });

    if (this.userData != null) {
      this.actionTitle = 'Editar';
      this.actionButton = 'Actualizar';
    }
  }

  ngOnInit(): void {
    if (this.userData != null) {
      this.formUser.patchValue({
        firstname: this.userData.firstname,
        lastname: this.userData.lastname,
        password: "",
        username: this.userData.username,
      });
    }
  }

  close() {
    this.currentModal.close('true');
  }

  saveEdit_User() {
    const body: UserDataInputDto = {
      username: this.formUser.value.username,
      firstname: this.formUser.value.firstname,
      lastname: this.formUser.value.lastname,
      password: this.formUser.value.password,
    };

    if (this.userData == null) {
      this._userService.apiAuthUserPost$Json({ body }).subscribe({
        next: (data) => {
          if (data != null) {
            this._utilityService.ShowAlert(
              'El usuario ha sido guardado',
              'Éxito'
            );
            this.currentModal.close('true');
          } else
            this._utilityService.ShowAlert(
              'No se pudo guardar el usuario',
              'Error'
            );
        },
        error: ({ error, status }) => {
          if (status == 500)
            this._utilityService.ShowAlert(
              'No se pudo guardar el usuario',
              'Error'
            );
          else if (status == 400)
            this._utilityService.ShowAlert(error.detail, 'Error');
        },
      });
    } else {
      this._userService.apiAuthUserPut$Json({ body }).subscribe({
        next: (data) => {
          if (data != null) {
            this._utilityService.ShowAlert('El usuario fue editado', 'Éxito');
            this.currentModal.close('true');
          } else
            this._utilityService.ShowAlert(
              'No se se pudo editar el usuario',
              'Error'
            );
        },
        error: (e) => {
          this._utilityService.ShowAlert(
            'No se pudo editar el usuario',
            'Error'
          );
        },
      });
    }
  }
}
