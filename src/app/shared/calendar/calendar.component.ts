import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
@Component({
  selector: 'app-calendar',
  imports: [
    CommonModule,
    FullCalendarModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  @Input() initialDate: Date = new Date();
  @Input() events: EventInput[] = [];
  @Output() eventClick = new EventEmitter<any>();
  @Output() dateClick = new EventEmitter<any>();

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    initialDate: this.initialDate,
    events: this.events,
    eventClick: (info) => this.handleEventClick(info),
    dateClick: (info) => this.handleDateClick(info),
    eventContent: (arg) => ({ html: `<app-calendar-event [event]="arg.event"></app-calendar-event>` }),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin]
  };

  handleEventClick(info: any) {
    this.eventClick.emit(info.event);
  }

  handleDateClick(info: any) {
    this.dateClick.emit(info.date);
  }
}
