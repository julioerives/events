import { Component, Inject, inject, OnDestroy, OnInit, signal, Signal } from '@angular/core';
import { getErrorClass, getValidControl } from '../../../../helpers/formFunctions';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../../../data/services/products/products.service';
import { LoadingService } from '../../../../core/loading/loading.service';
import { AlertsService } from '../../../../core/alerts/alerts.service';
import { EventsModalComponent } from '../../../events/events-modal/events-modal.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Products, ProductType } from '../../../../data/models/products/product.model';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ProductTypeService } from '../../../../data/services/productType/product-type.service';

@Component({
  selector: 'app-products-modal',
  imports: [
    MatDialogModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './products-modal.component.html',
  styleUrl: './products-modal.component.scss'
})
export class ProductsModalComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isEditMode: boolean = false;
  isSend: boolean = false;
  private fb: FormBuilder = inject(FormBuilder);
  private dialogRef: MatDialogRef<EventsModalComponent> = inject(MatDialogRef<EventsModalComponent>);
  private _productService: ProductsService = inject(ProductsService);
  private _loadingService: LoadingService = inject(LoadingService);
  private _alertService: AlertsService = inject(AlertsService);
  private _productTypesService: ProductTypeService = inject(ProductTypeService)

  public productTypes = signal<ProductType[]>([]);

  private destroy$: Subject<void> = new Subject<void>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Products
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildForm(): void {
    this.isEditMode = !!this.data?.productId;

    this.form = this.fb.group({
      productId: [this.data?.productId, Validators.required],
      typeProductId: [this.data?.productType?.productTypeId, Validators.required],
      name: [this.data?.name, Validators.required],
      price: [this.data?.price, [Validators.required, Validators.min(0)]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

    getProducts() {
    this._productTypesService.getAll()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (d) => {
          this.productTypes.set(d.data)
        },
        error: (e) => {
          this._alertService.error(e.error.message)
        }
      })
  }


  postData(product: Products): void {
    this._productService.create(product)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loadingService.hideLoading();
        })
      )
      .subscribe({
        next: (d) => {
          this._alertService.success(d.message);
          this.dialogRef.close(true);
        },
        error: (e) => {
          this._alertService.error(e.message);
        }
      })
  }

  updateData(product: Products): void {
    this._productService.update(product.productId, product)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this._loadingService.hideLoading();
        })
      )
      .subscribe({
        next: (d) => {
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
    if (!this.form.valid) return;
    this._loadingService.showLoading();
    const product = this.form.value as Products;
    if (this?.data?.productId) {
      this.updateData(product);
    } else {
      this.postData(product);
    }
  }




  getErrorClass(control: string) {
    return getErrorClass(control, this.form, this.isSend)
  }

  getValidControl(control: string): boolean {
    return getValidControl(control, this.form, this.isSend)
  }

}
