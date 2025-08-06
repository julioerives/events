import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, inject, Inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EventsModalComponent } from './events-modal/events-modal.component';
import { Event } from '../../data/models/events/event.model';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { EventsService } from '../../data/services/events/events.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { EventCardComponent } from './event-card/event-card.component';
import { AlertsService } from '../../core/alerts/alerts.service';
import { DialogConfirmComponent } from '../dialogs/dialog-confirm/dialog-confirm.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSmallComponentComponent } from "../../shared/loading-small-component/loading-small-component.component";

@Component({
  selector: 'app-events',
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    EventCardComponent,
    MatProgressSpinnerModule,
    LoadingSmallComponentComponent
],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;
  private _dialog: MatDialog = inject(MatDialog);
  private _eventService: EventsService = inject(EventsService);
  private _alertService: AlertsService = inject(AlertsService);
  public events = signal<Event[]>([]);
  isLoading = signal<boolean>(false);
  hasNextValue = signal<boolean>(true);


  private observer!: IntersectionObserver;


  private currentPage = 0;
  private pageSize = 50;

  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.getEvents();
    this.setupIntersectionObserver();
  }

  ngAfterViewInit(): void {
  this.scrollContainer.nativeElement.addEventListener('scroll', this.onElementScroll.bind(this));

  }

onElementScroll(event: any): void {
  const target = event.target as HTMLElement;

  const scrollTop = target.scrollTop;
  const scrollHeight = target.scrollHeight;
  const offsetHeight = target.offsetHeight;

  if (scrollTop + offsetHeight >= scrollHeight - 150 && this.hasNextValue() && !this.isLoading()) {
    this.pageSize += 50;
    this.getEvents();
  }
}


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.pageSize += 20;
          this.getEvents();
        }
      });
    }, options);
  }

  getEvents(): void {
    this.isLoading.set(true);
    this._eventService.getAllByPage(this.currentPage, this.pageSize).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (res) => {
        this.hasNextValue.set(res.data.pagination.hasNext);
        this.events.set(res.data.content);
      },
      error: () => {
      }
    });
  }

  deleteEvent(id: number): void {
    this._eventService.delete(id).pipe(
      takeUntil(this.destroy$),
      // finalize(() => this.isLoading = false)
    ).subscribe({
      next: (data) => {
        this._alertService.success(data.message);
        this.getEvents();
      },
      error: (err) => {
        this._alertService.error(err.error.message);
      }
    });
  }

  deleteEventConfirm(id: number): void {
    this._dialog.open(DialogConfirmComponent, {
      width: '480px',
      disableClose: true,
      panelClass: 'elegant-dialog',
      data: {
        title: 'Eliminar evento',
        message: '¿Está seguro de eliminar este evento?',
        type: 'warning',
        confirmText: 'Eliminar',
        cancelText: 'Cancelar'
      }
    })
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result) {
          this.deleteEvent(id);
        }
      });
  }


  openDialog(event?: Event): void {
    const dialogRef = this._dialog.open(EventsModalComponent, {
      disableClose: true,
      width: '600px',
      data: event,
      panelClass: "custom-dialog"
    })
    .afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe((result) => {
      if (result) {
        this.getEvents();
      }
    });

  }
}
