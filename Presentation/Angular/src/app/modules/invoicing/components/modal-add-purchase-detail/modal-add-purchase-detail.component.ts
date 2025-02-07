import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import {
  ProductDto,
} from 'src/app/api/models';

@Component({
  selector: 'app-modal-add-purchase-detail',
  templateUrl: './modal-add-purchase-detail.component.html',
  styleUrls: ['./modal-add-purchase-detail.component.css'],
})
export class ModalAddPurchaseDetailComponent {
  formProduct = this.formBuild.group({
    productId: new FormControl(
      {
        disabled: false,
        value: '',
      },
      Validators.required
    ),
    unitCost: [1, Validators.required],
    quantity: [1, Validators.required],
    suggestedRetailPrice: [null, Validators.nullValidator],
  });

  filteredOptions: Observable<ProductDto[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public products: ProductDto[],
    private formBuild: FormBuilder
  ) {

  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.products.filter(option => option.productId.toLowerCase().includes(filterValue) || option.barcode.toLowerCase().includes(filterValue) || option.description.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    this.filteredOptions = this.formProduct.controls.productId.valueChanges.pipe(startWith(''),
      map(value => this._filter(value || '')),
    );
  }
}
