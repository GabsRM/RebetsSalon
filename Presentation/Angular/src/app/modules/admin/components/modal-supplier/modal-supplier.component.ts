import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/app/services/utility.service';
import { ComunicationService } from 'src/app/services/comunication.service';
import { SupplierInputDto } from 'src/app/api/models';
import { SupplierService } from 'src/app/api';

@Component({
  selector: 'app-modal-supplier',
  templateUrl: './modal-supplier.component.html',
  styleUrls: ['./modal-supplier.component.css'],
})
export class ModalSupplierComponent {
  formSupplier: FormGroup;
  actionTitle: string = 'Agregar';
  actionButton: string = 'Guardar';

  constructor(
    private currentModal: MatDialogRef<ModalSupplierComponent>,
    @Inject(MAT_DIALOG_DATA) public supplierData: SupplierInputDto,
    private fb: FormBuilder,
    private _supplierService: SupplierService,
    private _utilityService: UtilityService,
    public _comunication: ComunicationService
  ) {
    this.formSupplier = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });
    if (this.supplierData != null) {
      (this.actionTitle = 'Editar'), (this.actionButton = 'Actualizar');
    }
  }

  ngOnInit() {

    if (this.supplierData != null) {
      this.formSupplier.patchValue({
        name: this.supplierData.name,
        email: this.supplierData.email,
        address: this.supplierData.address,
        phone: this.supplierData.phone,
      });
    }
  }

  close() {
    this.currentModal.close('true');
  }

  saveEdit_Supplier() {
    const body: SupplierInputDto = this.formSupplier.getRawValue();

    if (this.supplierData === null) {
      this._supplierService.apiSupplierPost$Json({ body }).subscribe({
        next: (data) => {
          if (data != null) {
            this._utilityService.ShowAlert(
              'El proveedor ha sida guardado',
              'Éxito'
            );
            this.currentModal.close('true');
          }
        },
        error: ({ error, status }) => {
          this._utilityService.ShowAlert(
            'No se pudo guardar el proveedor',
            'Error'
          );
        },
      });
    } else {
      this._supplierService
        .apiSupplierIdPut$Json({ id: this._comunication.Id, body })
        .subscribe({
          next: (data) => {
            if (data != null) {
              this._utilityService.ShowAlert(
                'El proveedor fue editado',
                'Éxito'
              );
              this.currentModal.close('true');
            }
          },
          error: ({ error }) => {
            this._utilityService.ShowAlert(
              'No se pudo editar el proveedor',
              'Error'
            );
          }
        });
    }
  }
}
