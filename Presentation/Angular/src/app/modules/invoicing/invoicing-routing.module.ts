import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  InvoiceComponent,
  InvoiceListComponent,
  PurchaseComponent,
} from './pages';

const routes: Routes = [
  {
    path: 'invoices',
    children: [
      {
        path: '',
        title: 'Listado de Facturas',
        component: InvoiceListComponent,
      },
      {
        path: 'new',
        title: 'Nueva Factura',
        component: InvoiceComponent,
      },
      {
        path: ':id',
        title: 'Visualizar Factura',
        component: InvoiceComponent,
      },
    ],
  },
  {
    path: 'purchases',
    title: 'Listado de Compras',
    component: PurchaseComponent,
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
export class InvoicingRoutingModule {}
