import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AlertsService } from '../../../core/alerts/alerts.service';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { Products } from '../../../data/models/products/product.model';
import { ProductsService } from '../../../data/services/products/products.service';
import { PurchasesService } from '../../../data/services/purchases/purchases.service';
import { MultiplePurchases } from '../../../data/models/purchases/purchases.model';

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
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule

  ]
})
export class CreatePurchasesComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private purchasesService = inject(PurchasesService);
  private alertsService = inject(AlertsService);
  private productsService = inject(ProductsService);

  private destroy$ = new Subject<void>();
  public products = signal<Products[]>([]);
  private productSelected: Products | null = null;

  getPurchaseFormGroup(index: number): FormGroup {
    return this.purchasesArray.at(index) as FormGroup;
  }

  purchaseForm!: FormGroup;
  isLoading = false;
  today = new Date().toISOString().split('T')[0];

  totalItems = signal(0);
  totalAmount = signal(0);
  averagePerItem = signal(0);

  constructor() {

  }
  ngOnInit(): void {
    this.buildForm();
    this.getProducts();

    this.purchasesArray.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateComputedValues();
      });

    this.updateComputedValues();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateComputedValues(): void {
    const itemsCount = this.purchasesArray.length;
    this.totalItems.set(itemsCount);

    const productsCache = new Map(
      this.products().map(p => [p.productId, p.price])
    );

    const amount = this.purchasesArray.controls.reduce((sum, control) => {
      const productId = control.get('productId')?.value;
      const quantity = control.get('quantity')?.value || 0;
      const price = productsCache.get(productId) || 0;
      return sum + (price * quantity);
    }, 0);

    this.totalAmount.set(amount);
    this.averagePerItem.set(itemsCount > 0 ? amount / itemsCount : 0);
  }

  buildForm() {
    this.purchaseForm = this.fb.group({
      purchases: this.fb.array([this.createPurchaseFormGroup()])
    });
  }

  createPurchaseFormGroup(): FormGroup {
    return this.fb.group({
      productId: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.maxLength(255)],
      purchaseDate: [this.today, Validators.required],
      price: [0, Validators.required]
    });
  }

  get purchasesArray(): FormArray {
    return this.purchaseForm.get('purchases') as FormArray;
  }

  addPurchase(): void {
    this.purchasesArray.push(this.createPurchaseFormGroup());
  }

  getProducts() {
    this.productsService.getAll()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (d) => {
          this.products.set(d.data)
        },
        error: (e) => {
          this.alertsService.error(e.error.message)
        }
      })
  }

  removePurchase(index: number): void {
    if (this.purchasesArray.length > 1) {
      this.purchasesArray.removeAt(index);
    } else {
      this.alertsService.warning('Debe mantener al menos un purchase');
    }
  }

  onProductSelect(productId: number, i: number) {
    if (!productId) return;
    const product = this.products().find(p => p.productId === productId)
    const control = this.purchasesArray.at(i)
    const newValue = (control.get('quantity')?.value as number) * (product?.price || 0)
    control.get('price')?.setValue(newValue)
  }

  onSubmit(): void {
    if (this.purchaseForm.invalid) {
      this.purchaseForm.markAllAsTouched();
      this.alertsService.error('Por favor complete todos los campos requeridos');
      return;
    }

    const purchasesData: MultiplePurchases = {
      items: this.purchaseForm.value.purchases
    };

    this.isLoading = true;
    this.purchasesService.createMultiple(purchasesData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.alertsService.success(response.message);
          this.purchaseForm.reset();
          this.purchasesArray.clear();
          this.purchasesArray.push(this.createPurchaseFormGroup());
        },
        error: (err) => {
          this.alertsService.error(err.error?.message || 'Error al crear purchases');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}