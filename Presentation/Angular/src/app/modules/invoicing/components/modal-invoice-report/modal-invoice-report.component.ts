import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { ApiConfiguration } from 'src/app/api';

@Component({
  selector: 'app-modal-invoice-report',
  templateUrl: './modal-invoice-report.component.html',
  styleUrls: ['./modal-invoice-report.component.css']
})
export class ModalInvoiceReportComponent {
  public src = '';
  isPdfLoaded = false;
  private pdf: PDFDocumentProxy;

  onLoaded(pdf: PDFDocumentProxy) {
    this.pdf = pdf;
    this.isPdfLoaded = true;
  }

  ngOnInit() {
    this.src = `${this.config.rootUrl}/api/Invoice/GetInvoiceReport?invoiceId=${this.invoiceId}`;
  }

  print() {
    this.pdf.getData().then((u8) => {
        let blob = new Blob([u8.buffer], {
            type: 'application/pdf'
        });

        const blobUrl = window.URL.createObjectURL((blob));
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        document.body.appendChild(iframe);
        iframe.contentWindow.print();
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public invoiceId: string,
    protected config: ApiConfiguration
  ) { }
}
