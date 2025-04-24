import { Component, Input } from '@angular/core';
import { Event } from '../../../data/models/events/event.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-event-card',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
  @Input() event!: Event;
  @Input() showActions: boolean = true;

  getTimeIndicator() {
    const now = new Date();
    if (this.event.endDate < now) return '#9E9E9E';
    if (this.event.startDate > now) return '#4CAF50';
    return '#FF9800';
  }
}