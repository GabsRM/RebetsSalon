/* tslint:disable */
/* eslint-disable */
export interface ProductInputDto {
  barcode?: null | string;
  categories: Array<number>;
  description: string;
  minStock?: null | number;
  photoUri?: null | string;
  price: number;
  type: string;
}
