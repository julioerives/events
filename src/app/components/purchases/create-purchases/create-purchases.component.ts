import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AlertsService } from '../../../core/alerts/alerts.service';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-create-purchases',
  templateUrl: './create-purchases.component.html',
  styleUrls: ['./create-purchases.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule
    
  ]
})
export class CreatePurchasesComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  // private purchasesService = inject(PurchasesService);

  private alertsService = inject(AlertsService);
  
  private destroy$ = new Subject<void>();
  
  purchaseForm: FormGroup;
  isLoading = false;
  today = new Date().toISOString().split('T')[0];

  totalItems = computed(() => this.purchasesArray.length);
  totalAmount = computed(() => {
    return this.purchasesArray.controls.reduce((sum, control) => {
      return sum + (control.get('quantity')?.value || 0);
    }, 0);
  });

  constructor() {
    this.purchaseForm = this.fb.group({
      purchases: this.fb.array([this.createPurchaseFormGroup()])
    });
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createPurchaseFormGroup(): FormGroup {
    return this.fb.group({
      userId: [null, Validators.required],
      incomeTypeId: [null, Validators.required],
      quantity: [0, [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.maxLength(255)],
      date: [this.today, Validators.required]
    });
  }

  get purchasesArray(): FormArray {
    return this.purchaseForm.get('purchases') as FormArray;
  }

  addPurchase(): void {
    this.purchasesArray.push(this.createPurchaseFormGroup());
  }

  removePurchase(index: number): void {
    if (this.purchasesArray.length > 1) {
      this.purchasesArray.removeAt(index);
    } else {
      this.alertsService.warning('Debe mantener al menos un purchase');
    }
  }
  averagePerItem = computed(() => {
    return this.totalItems() > 0 ? this.totalAmount() / this.totalItems() : 0;
  });

  onSubmit(): void {
    // if (this.purchaseForm.invalid) {
    //   this.purchaseForm.markAllAsTouched();
    //   this.alertsService.error('Por favor complete todos los campos requeridos');
    //   return;
    // }

    // const purchasesData: IncomeRequestDTO[] = this.purchaseForm.value.purchases;
    
    // this.isLoading = true;
    // this.purchasesService.createMultiple(purchasesData)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe({
    //     next: (response) => {
    //       this.alertsService.success(`${purchasesData.length} purchases creados exitosamente`);
    //       this.purchaseForm.reset();
    //       this.purchasesArray.clear();
    //       this.purchasesArray.push(this.createPurchaseFormGroup());
    //     },
    //     error: (err) => {
    //       this.alertsService.error(err.error?.message || 'Error al crear purchases');
    //     },
    //     complete: () => {
    //       this.isLoading = false;
    //     }
    //   });
  }
}