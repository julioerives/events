import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EventsModalComponent } from './events-modal/events-modal.component';

@Component({
  selector: 'app-events',
  imports: [
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  private _dialog: MatDialog = inject(MatDialog);
  openDialog(): void {
    const dialogRef = this._dialog.open(EventsModalComponent, {
      width: '600px',
      data: {}
    });

  }
}
