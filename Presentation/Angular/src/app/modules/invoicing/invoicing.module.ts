import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicingRoutingModule } from './invoicing-routing.module';
import {
  ModalAddPurchaseComponent,
  ModalAddPurchaseDetailComponent,
  ModalInvoiceReportComponent,
  ModalPurchaseDetailComponent,
} from './components';
import {
  InvoiceComponent,
  InvoiceListComponent,
  PurchaseComponent,
} from './pages';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    InvoiceListComponent,
    PurchaseComponent,
    InvoiceComponent,
    
    ModalInvoiceReportComponent,
    ModalPurchaseDetailComponent,
    ModalAddPurchaseComponent,
    ModalAddPurchaseDetailComponent,
  ],
  imports: [CommonModule, InvoicingRoutingModule, SharedModule],
})
export class InvoicingModule {}
