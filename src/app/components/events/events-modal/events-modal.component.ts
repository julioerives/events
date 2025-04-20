import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { getErrorClass } from '../../../helpers/formFunctions';
import { MatIconModule } from '@angular/material/icon';

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
export class EventsModalComponent {
  form: FormGroup;
  isEditMode: boolean = false;
  isSend: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EventsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data?.eventId;
    
    this.form = this.fb.group({
      startDate: [data?.startDate || '', [Validators.required]],
      endDate: [data?.endDate || '', [Validators.required]],
      phoneNotifications: [data?.phoneNotifications || false, [Validators.required]],
      webNotifications: [data?.webNotifications || false, [Validators.required]],
      minutesAdvice: [data?.minutesAdvice || 15, [Validators.required, Validators.min(1)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
  }

    getErrorClass(control: string){
      return getErrorClass(control, this.form, this.isSend)
    }

  get minEndDate(): Date {
    return this.form.get('startDate')?.value || new Date();
  }
}
