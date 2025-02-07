import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  BranchComponent,
  SettingComponent,
  SupplierComponent,
  UserComponent,
} from './pages';

const routes: Routes = [
  {
    path: 'user',
    title: 'Usuarios',
    component: UserComponent,
  },
  {
    path: 'supplier',
    title: 'Proveedores',
    component: SupplierComponent,
  },
  {
    path: 'branch',
    title: 'Sucursales',
    component: BranchComponent,
  },
  {
    path: 'setting',
    title: 'Configuracion',
    component: SettingComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
