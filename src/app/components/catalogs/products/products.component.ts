import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Products, ProductType } from '../../../data/models/products/product.model';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { HexToRgbaPipe } from '../../../pipes/HexToRgba/hex-to-rgba.pipe';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from '../../../data/services/products/products.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertsService } from '../../../core/alerts/alerts.service';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    MatTableModule,
    MatChipsModule,
    MatPaginatorModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ["name", "productType", "price", "actions"];

  public page: number = 0;
  public size: number = 10;
  public length: number = 10;
  public name: string = ''

  products = signal<Products[]>([])
  public dataSource: MatTableDataSource<Products> = new MatTableDataSource<Products>(this.products());

  private destroy$ = new Subject<void>();
  private destroyRef = inject(DestroyRef);

  private _productsService = inject(ProductsService);
  private _alert = inject(AlertsService);

  ngOnInit(): void {
    this.getProducts()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getProducts() {
    this._productsService.getAllByPageAndFilter(this.page, this.size, this.name)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (d) => {
          this.length = d.data.pagination.totalElements;
          this.products.set(d.data.content)
          this.dataSource.data = this.products()
        },
        error: (e) => {
          this._alert.error(e?.error?.message)
        }
      })
  }

  pageChange(pageEvent: PageEvent) {
    this.page = pageEvent.pageIndex;
    this.size = pageEvent.pageSize;
    this.getProducts()
  }


}
