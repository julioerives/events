import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EventsModalComponent } from './events-modal/events-modal.component';
import { Event } from '../../data/models/events/event.model';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-events',
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  private _dialog: MatDialog = inject(MatDialog);
  event: Event = {
    eventName: 'Sample Event',
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

  getTimeIndicator() {
    const now = new Date();
    if (this.event.endDate < now) return '#9E9E9E';
    if (this.event.startDate > now) return '#4CAF50';
    return '#FF9800';
  }
}
