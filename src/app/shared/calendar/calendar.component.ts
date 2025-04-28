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
  @Input() initialDate: Date = new Date();
  @Input() events: EventInput[] = [];
  @Output() eventClick = new EventEmitter<any>();
  @Output() dateClick = new EventEmitter<any>();
  @Output() datesSet = new EventEmitter<any>();

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    initialDate: this.initialDate,
    events: this.events,
    eventClick: (info) => this.handleEventClick(info),
    dateClick: (info) => this.handleDateClick(info),
    datesSet: this.onDatesSet.bind(this),
    eventContent: (arg) => ({ html: `<app-calendar-event [event]="arg.event"></app-calendar-event>` }),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin]
  };

  handleEventClick(info: any) {
    console.log("🚀 ~ CalendarComponent ~ handleEventClick ~ info:", info)
    this.eventClick.emit(info.event);
  }

  onDatesSet(dateInfo: DatesSet) {
    this.datesSet.emit(dateInfo);
  }



  handleDateClick(info: any) {
    this.dateClick.emit(info.date);
  }
}
