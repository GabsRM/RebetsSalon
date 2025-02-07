import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { ModalCategoryComponent, ModalProductComponent } from './components';
import { CategoryComponent, ProductComponent } from './pages';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServicesComponent } from './pages/services/services.component';
import { ModalServiceComponent } from './components/modal-service/modal-service.component';

@NgModule({
  declarations: [
    CategoryComponent,
    ModalCategoryComponent,
    ProductComponent,
    ModalProductComponent,
    ServicesComponent,
    ModalServiceComponent,
  ],
  imports: [CommonModule, InventoryRoutingModule, SharedModule],
})
export class InventoryModule {}
