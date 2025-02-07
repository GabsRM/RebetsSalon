import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private _snackBar: MatSnackBar) { }

  ShowAlert(message: string, type: string) {
    this._snackBar.open(message, type, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    })
  }


}
