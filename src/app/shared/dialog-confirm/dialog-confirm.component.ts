import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dialog-confirm',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.scss'
})
export class DialogConfirmComponent {
  private dialogRef = inject(MatDialogRef<DialogConfirmComponent>);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData,
  ) { }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  getIcon(): string {
    switch (this.data.type) {
      case 'warning': return 'warning';
      case 'error': return 'error';
      case 'success': return 'check_circle';
      default: return 'help_outline';
    }
  }

  getIconColor(): string {
    switch (this.data.type) {
      case 'warning': return 'warn';
      case 'error': return 'warn';
      case 'success': return 'primary';
      default: return 'accent';
    }
  }

  getButtonColor(): string {
    return this.data.type === 'error' ? 'warn' : 'primary';
  }
}
export interface ConfirmationDialogData {
  title: string;
  message: string;
  type?: 'info' | 'warning' | 'error' | 'success';
  confirmText?: string;
  cancelText?: string;
}