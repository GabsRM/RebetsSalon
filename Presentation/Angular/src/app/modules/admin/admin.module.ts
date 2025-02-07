import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import {
  BranchComponent,
  SettingComponent,
  SupplierComponent,
  UserComponent,
} from './pages';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  ModalBranchComponent,
  ModalSupplierComponent,
  ModalUserComponent,
} from './components';
import { HttpClientModule } from '@angular/common/http';
import { ModalEditUserComponent } from './components/modal-edit-user/modal-edit-user.component';

@NgModule({
  declarations: [
    UserComponent,
    ModalUserComponent,

    BranchComponent,
    ModalBranchComponent,

    SettingComponent,
    ModalSupplierComponent,

    SupplierComponent,
      ModalEditUserComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ],
})
export class AdminModule {}
