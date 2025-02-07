import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent, ProductComponent } from './pages';
import { ServicesComponent } from './pages/services/services.component';

const routes: Routes = [
  {
    path: 'products',
    title: 'Catálogo de Productos',
    component: ProductComponent,
  },
  {
    path: 'services',
    title: 'Catálogo de Servicios',
    component: ServicesComponent,
  },
  {
    title: 'Líneas de Productos',
    path: 'categories',
    component: CategoryComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
