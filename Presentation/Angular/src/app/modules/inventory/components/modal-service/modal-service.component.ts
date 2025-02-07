import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryDto, ProductInputDto } from 'src/app/api/models';

import { UtilityService } from 'src/app/services/utility.service';
import { ComunicationService } from 'src/app/services/comunication.service';
import { CategoryService, ProductService } from 'src/app/api';

@Component({
  templateUrl: './modal-service.component.html',
  styleUrls: ['./modal-service.component.css'],
})
export class ModalServiceComponent {
  formProduct: FormGroup;
  actionTitle: string = 'Agregar';
  actionButton: string = 'Guardar';
  categoryList: CategoryDto[] = [];

  constructor(
    private currentModal: MatDialogRef<ModalServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public productData: ProductInputDto,
    private fb: FormBuilder,
    private productService: ProductService,
    private utilityService: UtilityService,
    public _comunication: ComunicationService,
    public categoryService: CategoryService
  ) {
    this.formProduct = this.fb.group({
      description: ['', Validators.required],
      price: ['', Validators.required],
    });

    if (this.productData != null)
      (this.actionTitle = 'Editar'), (this.actionButton = 'Actualizar');
  }

  ngOnInit(): void {
    if (this.productData != null) {
      this.formProduct.patchValue({
        description: this.productData.description,
        barcode: this.productData.barcode,
        price: this.productData.price,
        minStock: this.productData.minStock,
      });
    }

    this.categoryService.apiCategoryGet$Json().subscribe({
      next: (data) => {
        if (data.message === 'Se ha realizado la consulta exitosamente') {
          this.categoryList = data.data;
        }
      },
    });
  }

  close() {
    this.currentModal.close('true');
  }

  saveEdit_Product() {
    const body: ProductInputDto = {
      description: this.formProduct.value.description,
      type: 'S',
      barcode: undefined,
      price: this.formProduct.value.price,
      minStock: undefined,
      photoUri: undefined,
      categories: [],
    };

    if (this.productData == null) {
      this.productService.apiProductPost$Json({ body }).subscribe({
        next: (data) => {
          if (data != null) {
            this.utilityService.ShowAlert(
              'El producto ha sido guardado',
              'Éxito'
            );
            this.currentModal.close('true');
          } else
            this.utilityService.ShowAlert(
              'No se pudo guardar el producto',
              'Error'
            );
        },
        error: ({ error, status }) => {
          if (status == 500)
            this.utilityService.ShowAlert(
              'No se pudo guardar el producto',
              'Error'
            );
          else if (status == 400)
            this.utilityService.ShowAlert(error.detail, 'Error');
        },
      });
    } else {
      this.productService
        .apiProductIdPut$Json({ id: this._comunication.Id, body })
        .subscribe({
          next: (data) => {
            if (data != null) {
              this.utilityService.ShowAlert(
                'El producto fue modificado',
                'Éxito'
              );
              this.currentModal.close('true');
            } else
              this.utilityService.ShowAlert(
                'No se pudo editar el producto',
                'Error'
              );
          },
          error: (e) =>
            this.utilityService.ShowAlert(
              'No se pudo editar el usuario',
              'Error'
            ),
        });
    }
  }
}
