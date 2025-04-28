import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { CalendarComponent } from '../../shared/calendar/calendar.component';
import { Event } from '../../data/models/events/event.model';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-calendar-event',
  imports: [
    CommonModule,
    CalendarComponent,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './calendar-event.component.html',
  styleUrl: './calendar-event.component.scss'
})
export class CalendarEventComponent {
  calendarEvents: EventInput[] = [];
  loading = true;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventDisplay: 'block',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    },
    eventDidMount: this.customizeEvent.bind(this)
  };

  constructor() {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {

  }

  transformEvents(events: Event[]): EventInput[] {
    return events.map(event => ({
      id: event.eventId?.toString(),
      title: event.eventName || 'Evento sin título',
      start: event.startDate,
      end: event.endDate,
      extendedProps: {
        phoneNotifications: event.phoneNotifications,
        webNotifications: event.webNotifications,
        minutesAdvice: event.minutesAdvice
      },
      color: this.getEventColor(event)
    }));
  }

  getEventColor(event: Event): string {
    if (event.phoneNotifications && event.webNotifications) {
      return 'var(--primary-color)';
    } else if (event.phoneNotifications) {
      return 'var(--secondary-color)';
    } else if (event.webNotifications) {
      return 'var(--succes-color)';
    }
    return 'var(--medium-color)';
  }

  customizeEvent(info: any): void {
    const event = info.event;
    const element = info.el;
    
    if (event.extendedProps.phoneNotifications) {
      element.classList.add('has-phone-notification');
    }
    if (event.extendedProps.webNotifications) {
      element.classList.add('has-web-notification');
    }
    
    element.title = `Notificaciones: 
      ${event.extendedProps.phoneNotifications ? 'Teléfono' : ''}
      ${event.extendedProps.webNotifications ? 'Web' : ''}
      Aviso: ${event.extendedProps.minutesAdvice} minutos antes`;
  }

  handleEventClick(eventInfo: any): void {
    console.log('Event clicked:', eventInfo.event);
  }

  handleDateSelect(selectInfo: any): void {
    console.log('Date selected:', selectInfo);
  }
}
