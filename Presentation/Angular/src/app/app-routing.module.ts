import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout';
import { AuthGuard, PublicGuard } from './guards';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [PublicGuard],
    loadChildren: () =>
      import('./modules/auth/auth.module').then(({ AuthModule }) => AuthModule),
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/home/home.module').then(({ HomeModule }) => HomeModule),
  },
  {
    path: 'inventory',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/inventory/inventory.module').then(
        ({ InventoryModule }) => InventoryModule
      ),
  },
  {
    path: 'invoicing',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import('./modules/invoicing/invoicing.module').then(
        ({ InvoicingModule }) => InvoicingModule
      ),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () =>
      import('./modules/admin/admin.module').then(
        ({ AdminModule }) => AdminModule
      ),
  },
  {
    path: 'error',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/error/error.module').then(
        ({ ErrorModule }) => ErrorModule
      ),
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
