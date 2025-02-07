import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table';
import { PurchaseDetailDto, PurchaseDto } from 'src/app/api/models';

@Component({
  selector: 'app-modal-purchase-detail',
  templateUrl: './modal-purchase-detail.component.html',
  styleUrls: ['./modal-purchase-detail.component.css']
})
export class ModalPurchaseDetailComponent {
  displayedColumns: string[] = ['productId', 'description', 'quantity', 'suggestedRetailPrice', 'unitCost']
  homeData: PurchaseDetailDto[] = []
  DataPurchaseDetail = new MatTableDataSource(this.homeData);

  @ViewChild(MatPaginator) paginationTable!: MatPaginator;


  constructor(
    private currentModal: MatDialogRef<ModalPurchaseDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public purchaseDto: PurchaseDto,
    private _MatPaginatorIntl: MatPaginatorIntl
  ) { }

  close() {
    this.currentModal.close("true")
  }

  ngOnInit(): void {
    this._MatPaginatorIntl.itemsPerPageLabel = 'Item por página';
    this._MatPaginatorIntl.firstPageLabel = "Primera página"
    this._MatPaginatorIntl.lastPageLabel = "Úlitma página"
    this._MatPaginatorIntl.nextPageLabel = "Página siguiente"
    this._MatPaginatorIntl.previousPageLabel = "Página anterior"

    this.DataPurchaseDetail.data = this.purchaseDto.detail
  }
  ngAfterViewInit(): void {
    this.DataPurchaseDetail.paginator = this.paginationTable
  }

  filterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.DataPurchaseDetail.filter = filterValue.trim().toLocaleLowerCase();
  }


}
