import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Products, ProductType } from '../../../data/models/products/product.model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { HexToRgbaPipe } from '../../../pipes/HexToRgba/hex-to-rgba.pipe';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { ProductsService } from '../../../data/services/products/products.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertsService } from '../../../core/alerts/alerts.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LightColorPipe } from '../../../pipes/colors/lightColor/light-color.pipe';
import { ProductStats } from '../../../data/models/products/productStats.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductsModalComponent } from './products-modal/products-modal.component';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    MatTableModule,
    MatChipsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    LightColorPipe
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ["name", "productType", "price", "actions"];

  public nameControl = new FormControl<string>("");

  public page: number = 0;
  public size: number = 10;
  public length: number = 10;
  public name: string = ''

  products = signal<Products[]>([])

  productsStats = signal<ProductStats | null>(null);
  public dataSource: MatTableDataSource<Products> = new MatTableDataSource<Products>(this.products());

  private destroy$ = new Subject<void>();
  private destroyRef = inject(DestroyRef);

  private _productsService = inject(ProductsService);
  private _alert = inject(AlertsService);
  private _dialog: MatDialog = inject(MatDialog);


  ngOnInit(): void {
    this.getProducts()
    this.getAllStats()
    this.listenInputSearch()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  listenInputSearch() {
    this.nameControl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(350)
      )
      .subscribe(data => {
        this.name = data ?? '';
        this.getProducts()
      })
  }

  getProducts() {
    this._productsService.getAllByPageAndFilter(this.page, this.size, this.name)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (d) => {
          this.length = d.data.pagination.totalElements;
          this.changeDataTable(d.data.content)
        },
        error: (e) => {
          this.changeDataTable([])
          this._alert.error(e?.error?.message)
        }
      })

  }


  getAllStats() {
    this._productsService.getProductStats()
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: d => {
          this.productsStats.set(d.data)
        }
      })
  }

  openDialog(Products?: Products): void {
    const dialogRef = this._dialog.open(ProductsModalComponent, {
      disableClose: true,
      width: '600px',
      data: event,
      panelClass: "custom-dialog"
    })
    .afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe((result) => {
      if (result) {
        this.getProducts();
      }
    });

  }

  changeDataTable(data: Products[]) {
    this.products.set(data)
    this.dataSource.data = this.products()
  }

  pageChange(pageEvent: PageEvent) {
    this.page = pageEvent.pageIndex;
    this.size = pageEvent.pageSize;
    this.getProducts()
  }


}
