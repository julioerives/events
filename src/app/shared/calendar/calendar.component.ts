import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DatesSet } from '../../data/models/calendar/calendar.model';
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
  private _events: EventInput[] = [];

  @Input() set events(value: EventInput[]) {
    this._events = value;
    this.calendarOptions.events = [...this._events]; 
  }
  get events(): EventInput[] {
    return this._events;
  }

  @Output() eventClick = new EventEmitter<any>();
  @Output() dateClick = new EventEmitter<any>();
  @Output() datesSet = new EventEmitter<any>();

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: this._events,
    eventClick: (info) => this.handleEventClick(info),
    dateClick: (info) => this.handleDateClick(info),
    datesSet: this.onDatesSet.bind(this),
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

  onDatesSet(dateInfo: DatesSet) {
    this.datesSet.emit(dateInfo);
  }

  handleDateClick(info: any) {
    this.dateClick.emit(info.date);
  }
}
