import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService, BranchService } from 'src/app/api';
import { BranchDto, UserDto } from 'src/app/api/models';
import { ComunicationService } from 'src/app/services/comunication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-edit-user',
  templateUrl: './modal-edit-user.component.html',
  styleUrls: ['./modal-edit-user.component.css']
})
export class ModalEditUserComponent {
  actionTitle: string = 'Agregar';
  actionButton: string = 'Guardar';

  formSecurity = this.formBuilder.group({
    username: ['', Validators.required],
    roles: new FormControl(
      {
        value: [] as string[],
        disabled: false,
      }
    ),
    defaultBranch: '',
  })

  branchs: BranchDto[];

  constructor(
    private currentModal: MatDialogRef<ModalEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: UserDto,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private branchService: BranchService,
    public _comunication: ComunicationService
  ) { }

  ngOnInit(): void {
    this.branchService.apiBranchGet$Json().subscribe({
      next: ({ data }) => {
        this.branchs = data;
      }
    })

    if (this.userData != null) {
      console.log({
        username: this.userData.username,
        defaultBranch: this.userData.defaultBranch?.branchId,
        roles: this.userData.roles.map(x => x.roleId)
      })
      this.formSecurity.patchValue({
        username: this.userData.username,
        defaultBranch: this.userData.defaultBranch?.branchId,
        roles: this.userData.roles.map(x => x.roleId)
      });
    }
  }

  close() {
    this.currentModal.close('true');
  }

  save() {
    const body = this.formSecurity.getRawValue();

    this.authService.apiAuthUserSecurityPut$Json({ body }).subscribe({
      next: async () => {
        await Swal.fire('Usuario actualizado', 'El usuario ha sido actualizado exitosamente', 'success');
        this.currentModal.close('true');
        if (body.username === this.authService.currentUser.user.username)
          this.authService.refreshUserData();
      },
      error: ({ error, status }) => {
        if (status == 500)
          Swal.fire('Error', 'Ha ocurrido un error al actualizar', 'error');
        else if (status == 400)
          Swal.fire('Advertencia', error.detail, 'warning');
      },
    });
  }
}
