import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EventsModalComponent } from './events-modal/events-modal.component';
import { Event } from '../../data/models/events/event.model';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { EventsService } from '../../data/services/events/events.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { EventCardComponent } from './event-card/event-card.component';

@Component({
  selector: 'app-events',
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    EventCardComponent
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit,OnDestroy{
  private _dialog: MatDialog = inject(MatDialog);
  private _eventService: EventsService = inject(EventsService);
  public events = signal<Event[]>([]);
  isLoading: boolean = false;

  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.getEvents();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getEvents(): void {
    this.isLoading = true;
    this._eventService.getAllByPage(0, 50).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (res) => {
        this.events.set(res.data.content);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  deleteEvent(id: number): void {
    this.isLoading = true;
    this._eventService.delete(id).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (data) => {
        alert(data.message);
        this.getEvents();
      },
      error: (err) => {
        this.isLoading = false;
        alert(err.error.message);
      }
    });
  }


  openDialog(): void {
    const dialogRef = this._dialog.open(EventsModalComponent, {
      width: '600px',
      data: {}
    });

  }
}
