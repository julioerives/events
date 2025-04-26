import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private defaultDuration = 5000;

  private snackBar: MatSnackBar = inject(MatSnackBar);
  constructor() { }

  private getConfig(panelClass: string, horizontalPosition: MatSnackBarHorizontalPosition): MatSnackBarConfig {
    return {
      duration: this.defaultDuration,
      panelClass: ['custom-snackbar', panelClass],
      horizontalPosition: horizontalPosition,
      verticalPosition: 'top',
      politeness: 'assertive'
    };
  }

  success(message: string, title?: string) {
    this.show(message, 'success-snackbar', title || 'Éxito', 'center');
  }

  error(message: string, title?: string) {
    this.show(message, 'error-snackbar', title || 'Error');
  }

  warning(message: string, title?: string) {
    this.show(message, 'warning-snackbar', title || 'Advertencia');
  }

  info(message: string, title?: string) {
    this.show(message, 'info-snackbar', title || 'Información');
  }

  private show(message: string, panelClass: string, title: string, horizontalPosition: MatSnackBarHorizontalPosition = 'right') {
    const config = this.getConfig(panelClass, horizontalPosition);
    this.snackBar.open(message, 'Cerrar', {
      ...config,
      data: { title: title }
    });
  }
}
