import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/app/services/utility.service';
import { BranchDto, BranchInputDto, CategoryDto } from 'src/app/api/models';
import { BranchService } from 'src/app/api';
import { ComunicationService } from 'src/app/services/comunication.service';

@Component({
  selector: 'app-modal-branch',
  templateUrl: './modal-branch.component.html',
  styleUrls: ['./modal-branch.component.css'],
})
export class ModalBranchComponent {
  formCategory: FormGroup;
  actionTitle: string = 'Agregar';
  actionButton: string = 'Guardar';
  categoryList: CategoryDto[] = [];

  constructor(
    private currentModal: MatDialogRef<ModalBranchComponent>,
    @Inject(MAT_DIALOG_DATA) public branchData: BranchDto,
    private fb: FormBuilder,
    private _branchService: BranchService,
    private _utilityService: UtilityService,
    private _comunication: ComunicationService
  ) {
    this.formCategory = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: '',
    });

    if (this.branchData != null) {
      (this.actionTitle = 'Editar'), (this.actionButton = 'Actualizar');
    }
  }

  ngOnInit(): void {
    if (this.branchData != null) {
      this.formCategory.patchValue({
        name: this.branchData.name,
        address: this.branchData.address,
        phone: this.branchData.phone,
      });
    }

    this._branchService.apiBranchGet$Json().subscribe({
      next: (data) => {
        if (data.message == 'Se ha realizado la consulta exitosamente')
          this.categoryList = data.data;
      },
    });
  }

  close() {
    this.currentModal.close('true');
  }

  saveEditBranch() {
    const body: BranchInputDto = {
      name: this.formCategory.value.name,
      address: this.formCategory.value.address,
      phone: this.formCategory.value.phone,
    };

    if (this.branchData == null) {
      this._branchService.apiBranchPost$Json({ body }).subscribe({
        next: (data) => {
          if (data != null) {
            this._utilityService.ShowAlert(
              'La sucursal ha sido guardada',
              'Éxito'
            );
            this.currentModal.close('true');
          } else
            this._utilityService.ShowAlert(
              'No se pudo guardar la catogoría',
              'Error'
            );
        },
        error: ({ error, status }) => {
          if (status == 500)
            this._utilityService.ShowAlert(
              'No se pudo guardar la sucursal',
              'Error'
            );
          else if (status == 400)
            this._utilityService.ShowAlert(error.detail, 'Error');
        },
      });
    } else {
      this._branchService
        .apiBranchIdPut$Json({ id: this._comunication.Id, body })
        .subscribe({
          next: (data) => {
            if (data != null) {
              this._utilityService.ShowAlert(
                'La sucursal ha sido editada',
                'Éxito'
              );
              this.currentModal.close('true');
            } else
              this._utilityService.ShowAlert(
                'No se pudo editar la sucursal',
                'Error'
              );
          },
          error: (e) =>
            this._utilityService.ShowAlert(
              'No se pudo editar la sucursal',
              'Error'
            ),
        });
    }
  }
}
