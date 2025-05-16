import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CreatePurchasesComponent } from './create-purchases/create-purchases.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HexToRgbaPipe } from '../../pipes/HexToRgba/hex-to-rgba.pipe';
import { Purchases } from '../../data/models/purchases/purchases.model';
import { Subject, takeUntil } from 'rxjs';
import { PurchasesService } from '../../data/services/purchases/purchases.service';
import { AlertsService } from '../../core/alerts/alerts.service';


@Component({
  selector: 'app-purchases',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    FormsModule,
    MatRadioModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
    HexToRgbaPipe
  ],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.scss'
})
export class PurchasesComponent implements OnInit, OnDestroy {
  hoveredItem: number | null = null;
  searchQuery: string = '';
  sortBy: string = 'recent';
  searchBy: string = 'description'
  selectedType: number | null = null;
  pageSize = 10;
  currentPage = 0;
  totalItems = 0;
  dateFrom: Date | null = null;
  dateTo: Date | null = null;

  productTypes = [
    { id: 1, name: 'Bebida' },
    { id: 2, name: 'Comida' },
    { id: 3, name: 'Electrónico' }
  ];

  purchases = signal<Purchases[]>([]);

  private destroy$ = new Subject<void>();

  private _purchasesService: PurchasesService = inject(PurchasesService);
  private _alert: AlertsService = inject(AlertsService);

  ngOnInit(): void {
    this.getPurchases()
  }

  ngOnDestroy(): void {
    this.destroy$.complete()
    this.destroy$.next()
  }

  get totalPurchases(): number {
    return this.purchases.length;
  }

  get totalProducts(): number {
    return this.purchases().reduce((sum, purchase) => sum + purchase.quantity, 0);
  }

  get totalSpent(): number {
    return this.purchases().reduce((sum, purchase) => sum + (purchase.price * purchase.quantity), 0);
  }

  get avgPurchase(): number {
    return this.totalPurchases > 0 ? this.totalSpent / this.totalPurchases : 0;
  }

  get filteredPurchases() {
    let filtered = [...this.purchases()];

    // Filtrar por tipo
    if (this.selectedType) {
      filtered = filtered.filter(p => p.product.productType.productTypeId === this.selectedType);
    }

    // Filtrar por búsqueda
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.product.name.toLowerCase().includes(query) ||
        p.product.productType.name.toLowerCase().includes(query)
      ) as any;
    }

    // Ordenar
    switch (this.sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.purchase_date).getTime() - new Date(b.purchase_date).getTime());
        break;
      case 'quantity':
        filtered.sort((a, b) => b.quantity - a.quantity);
        break;
      case 'price':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
    }

    // Paginación
    this.totalItems = filtered.length;
    const startIndex = this.currentPage * this.pageSize;
    return filtered.slice(startIndex, startIndex + this.pageSize);
  }

  getPurchases() {
    this._purchasesService.getPurchasesByFilters(this.sortBy, this.currentPage, this.pageSize, this.searchQuery, this.searchBy)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (d) => {
          this.purchases.set(d.data.content)
        },
        error: (e) => {
          this._alert.error(e.error.message)
        }
      })
  }


  clearFilters() {
    this.searchQuery = '';
    this.selectedType = null;
    this.dateFrom = null;
    this.dateTo = null;
    this.sortBy = 'recent';
  }

  resetFilters() {
    this.selectedType = null;
    this.searchQuery = '';
    this.sortBy = 'recent';
  }

  getCountByType(typeId: number): number {
    return this.purchases().filter(p => p.product.productType.productTypeId === typeId).length;
  }

  setSort(sortType: string) {
    this.sortBy = sortType;
    this.getPurchases()
  }

  setSearch(searchBy: string) {
    this.searchBy = searchBy;
    this.getPurchases()
  }

  filterByType(typeId: number) {
    this.selectedType = this.selectedType === typeId ? null : typeId;
  }

  getTypeColor(productType: any): string {
    return productType.colorRgba || '#cccccc';
  }
}
