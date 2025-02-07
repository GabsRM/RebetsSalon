import Swal from 'sweetalert2';
import { AuthService, BranchService } from 'src/app/api';
import { UtilityService } from 'src/app/services/utility.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingComponent implements OnInit {
  HidePassword = true;
  branchs = [];
  isAdminUser = false;

  constructor(
    public _comunication: ComunicationService,
    private formBuilder: FormBuilder,
    private branchService: BranchService,
    private authService: AuthService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    const { user } = this.authService.currentUser;
    this.isAdminUser = user.roles.map(x => x.roleId).includes("admin")

    this.formUser.patchValue({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname
    });

    if (this.isAdminUser)
      this.branchService.apiBranchGet$Json().subscribe({
        next: ({ data }) => {
          this.formSecurity.patchValue({
            username: user.username,
            defaultBranch: user.defaultBranch?.branchId,
            roles: user.roles?.map(x => x.roleId) || []
          })

          this.branchs = data;
        },
      });
  }

  saveProfile() {
    const body = this.formUser.getRawValue();
    this.authService.apiAuthUserPut$Json({ body }).subscribe({
      next: async ({ message }) => {
        this.formPassword.reset();

        await Swal.fire('Cuenta actualizada', 'Datos de la cuenta actualizado exitosamente', 'success');

        this.authService.refreshUserData();
      },
      error: ({ error }) =>
        this.utilityService.ShowAlert(error.detail, 'Vuelva a intentar'),
    });
  }

  async updateSecurity() {
    const body = this.formSecurity.getRawValue();

    if (this.formSecurity.controls.roles.dirty) {
      const { isConfirmed } = await Swal.fire({
        title: 'Advertencia',
        text: '¿Está seguro que desea modificar sus permisos?',
        icon: 'warning',
        confirmButtonText: 'Si, estoy seguro',
        cancelButtonText: 'Cancelar',
        showCancelButton: true
      });

      if (!isConfirmed) {
        this.formSecurity.patchValue({
          username: this.authService.currentUser.user.username,
          defaultBranch: this.authService.currentUser.user.defaultBranch?.branchId,
          roles: this.authService.currentUser.user.roles?.map(x => x.roleId) || []
        })
        return;
      }
    }

    this.authService.apiAuthUserSecurityPut$Json({ body }).subscribe({
      next: async ({ message }) => {
        this.formPassword.reset();
        await Swal.fire('Cuenta actualizada', 'Datos de la cuenta actualizado exitosamente', 'success');
        this.authService.refreshUserData();
      },
      error: ({ error }) =>
        this.utilityService.ShowAlert(error.detail, 'Vuelva a intentar'),
    });
  }

  updatePassword() {
    const { newPassword, oldPassword, confirmPassword } =
      this.formPassword.getRawValue();

    if (newPassword != confirmPassword) {
      Swal.fire('Advertencia', 'Las contraseñas no coinciden', 'warning');
      return;
    }

    this.authService
      .apiAuthUserPasswordPut$Json({ password: oldPassword, newPassword })
      .subscribe({
        next: ({ message }) => {
          Swal.fire('Actualizado', message, 'success');
          this.formPassword.reset();
        },
        error: ({ error }) =>
          Swal.fire('Error', error.detail, 'error')
      });
  }

  formUser = this.formBuilder.group({
    username: ['', Validators.required],
    firstname: '',
    lastname: '',

  });

  formSecurity = this.formBuilder.group({
    username: ['', Validators.required],
    roles: new FormControl(
      {
        value: [],
        disabled: false,
      }
    ),
    defaultBranch: '',
  })

  formPassword = this.formBuilder.group({
    oldPassword: new FormControl(
      {
        value: '',
        disabled: false,
      },
      Validators.required
    ),
    newPassword: new FormControl(
      {
        value: '',
        disabled: false,
      },
      Validators.required
    ),
    confirmPassword: new FormControl(
      {
        value: '',
        disabled: false,
      },
      Validators.required
    ),
  });
}
