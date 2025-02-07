import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UtilityService } from 'src/app/services/utility.service';
import { CategoryDto, CategoryInputDto } from 'src/app/api/models';
import { ComunicationService } from 'src/app/services/comunication.service';
import { CategoryService } from 'src/app/api';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.css'],
})
export class ModalCategoryComponent {
  formCategory: FormGroup;
  actionTitle: string = 'Agregar';
  actionButton: string = 'Guardar';
  categoryList: CategoryDto[] = [];

  constructor(
    private currentModal: MatDialogRef<ModalCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public categoryData: CategoryInputDto,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private utilityService: UtilityService,
    private comunication: ComunicationService
  ) {
    this.formCategory = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    if (this.categoryData != null) {
      (this.actionTitle = 'Editar'), (this.actionButton = 'Actualizar');
    }
  }

  ngOnInit(): void {
    if (this.categoryData != null) {
      this.formCategory.patchValue({
        name: this.categoryData.name,
        description: this.categoryData.description,
      });
    }

    this.categoryService.apiCategoryGet$Json().subscribe({
      next: (data) => {
        if (data.message == 'Se ha realizado la consulta exitosamente')
          this.categoryList = data.data;
      },
    });
  }

  close() {
    this.currentModal.close('true');
  }

  saveEdit_Category() {
    const body: CategoryInputDto = {
      name: this.formCategory.value.name,
      description: this.formCategory.value.description,
    };

    if (this.categoryData == null) {
      this.categoryService.apiCategoryPost$Json({ body }).subscribe({
        next: (data) => {
          if (data != null) {
            this.utilityService.ShowAlert(
              'La categoría ha sido guardada',
              'Éxito'
            );
            this.currentModal.close('true');
          } else
            this.utilityService.ShowAlert(
              'No se pudo guardar la catogoría',
              'Error'
            );
        },
        error: ({ error, status }) => {
          if (status == 500)
            this.utilityService.ShowAlert(
              'No se pudo guardar la categoría',
              'Error'
            );
          else if (status == 400)
            this.utilityService.ShowAlert(error.detail, 'Error');
        },
      });
    } else {
      this.categoryService
        .apiCategoryIdPut$Json({ id: this.comunication.Id, body })
        .subscribe({
          next: (data) => {
            if (data != null) {
              this.utilityService.ShowAlert(
                'La categoría ha sido editada',
                'Éxito'
              );
              this.currentModal.close('true');
            } else
              this.utilityService.ShowAlert(
                'No se pudo editar la categoría',
                'Error'
              );
          },
          error: (e) =>
            this.utilityService.ShowAlert(
              'No se pudo editar la categoría',
              'Error'
            ),
        });
    }
  }
}
