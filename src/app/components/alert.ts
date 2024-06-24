import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';



@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(public snackBar: MatSnackBar) { }
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    duracion = 2500;
    showExit(message: string): void {

        this.snackBar.open('✔️ ' + message, '', {
            duration: this.duracion,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });

    }

    showAlert(message: string): void {
        this.snackBar.open('⚠️ ' + message, '', {
            duration: this.duracion,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

    showError(message: string): void {

        this.snackBar.open('❌ ' + message, '', {
            duration: this.duracion,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

    showExist(message: string): void {
        this.snackBar.open('🖊️ ' + message, '', {
            duration: this.duracion,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
}
