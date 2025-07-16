import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { getErrorClass, getValidControl } from '../../../helpers/formFunctions';
import { MatIconModule } from '@angular/material/icon';
import { Event } from '../../../data/models/events/event.model';
import { EventsService } from '../../../data/services/events/events.service';
import { LoadingService } from '../../../core/loading/loading.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { AlertsService } from '../../../core/alerts/alerts.service';

@Component({
  selector: 'app-events-modal',
  imports: [
    MatDialogModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './events-modal.component.html',
  styleUrl: './events-modal.component.scss'
})
export class EventsModalComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isEditMode: boolean = false;
  isSend: boolean = false;
  private fb: FormBuilder = inject(FormBuilder);
  private dialogRef: MatDialogRef<EventsModalComponent> = inject(MatDialogRef<EventsModalComponent>);
  private _eventService: EventsService = inject(EventsService);
  private _loadingService: LoadingService = inject(LoadingService);
  private _alertService: AlertsService = inject(AlertsService);

  private destroy$: Subject<void> = new Subject<void>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Event
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildForm(): void {
    this.isEditMode = !!this.data?.eventId;

    this.form = this.fb.group({
      eventId: [this.data?.eventId || ''],
      eventName: [this.data?.eventName || '', [Validators.required]],
      startDate: [this.data?.startDate || '', [Validators.required]],
      endDate: [this.data?.endDate || '', [Validators.required]],
      phoneNotifications: [this.data?.phoneNotifications || false, [Validators.required]],
      webNotifications: [this.data?.webNotifications || false, [Validators.required]],
      minutesAdvice: [this.data?.minutesAdvice || 15, [Validators.required, Validators.min(1)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  postData(event: Event): void {

    this._eventService.create(event)
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this._loadingService.hideLoading();
      })
    )
    .subscribe({
      next: (d)=> {
        this._alertService.success(d.message);
        this.dialogRef.close(true);
      },
      error: (e) => {
        this._alertService.error(e.message);
      }
    })
  }

  updateData(event: Event): void {
    this._eventService.update(event.eventId, event)
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => {
        this._loadingService.hideLoading();
      })
    )
    .subscribe({
      next: (d)=> {
        this._alertService.success(d.message);
        this.dialogRef.close(true);
      },
      error: (e) => {
        this._alertService.error(e.message);
      }
    })
  }

  onSubmit(): void {
    this.isSend = true;
    if(!this.form.valid) return;
    this._loadingService.showLoading();
    const event = this.form.value as Event;
    if(this?.data?.eventId){
      this.updateData(event);
    }else{
      this.postData(event);
    }
  }

  getErrorClass(control: string) {
    return getErrorClass(control, this.form, this.isSend)
  }

  getValidControl(control: string): boolean {
    return getValidControl(control, this.form, this.isSend)
  }

  get minEndDate(): Date {
    return this.form.get('startDate')?.value || new Date();
  }
}
