import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EventsModalComponent } from './events-modal/events-modal.component';
import { Event } from '../../data/models/events/event.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-events',
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  private _dialog: MatDialog = inject(MatDialog);
  event: Event = {
    eventId: 12345,
    startDate: new Date('2025-05-15T09:00:00'),
    endDate: new Date('2025-05-15T11:30:00'),
    phoneNotifications: true,
    webNotifications: false,
    minutesAdvice: 30
  };
  openDialog(): void {
    const dialogRef = this._dialog.open(EventsModalComponent, {
      width: '600px',
      data: {}
    });

  }
}
