import { Component } from '@angular/core';
import { CreatePurchasesComponent } from './create-purchases/create-purchases.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips'; 
import { FormsModule } from '@angular/forms';


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
    FormsModule
  ],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.scss'
})
export class PurchasesComponent {
  hoveredItem: number | null = null;
  searchQuery: string = '';
  sortBy: string = 'recent';
  selectedType: number | null = null;
  pageSize = 10;
  currentPage = 0;
  totalItems = 0;

  productTypes = [
    { id: 1, name: 'Bebida' },
    { id: 2, name: 'Comida' },
    { id: 3, name: 'Electrónico' }
  ];

  purchases = [
    {
      "purchase_id": 1,
      "product": {
        "productId": 3,
        "productType": {
          "productTypeId": 1,
          "name": "Bebida",
          "description": "Bebidas tomadas",
          "colorRgba": "rgba(76, 175, 80, 0.8)"
        },
        "price": 100.0,
        "name": "Coca Cola",
        "createdAt": null
      },
      "quantity": 3,
      "price": 100.0,
      "purchase_date": "2023-06-15"
    },
    {
      "purchase_id": 2,
      "product": {
        "productId": 3,
        "productType": {
          "productTypeId": 1,
          "name": "Bebida",
          "description": "Bebidas tomadas",
          "colorRgba": "rgba(38, 0, 255, 0.8)"
        },
        "price": 100.0,
        "name": "Coca Cola",
        "createdAt": null
      },
      "quantity": 3,
      "price": 100.0,
      "purchase_date": "2023-06-15"
    },
    {
      "purchase_id": 3,
      "product": {
        "productId": 3,
        "productType": {
          "productTypeId": 1,
          "name": "Bebida",
          "description": "Bebidas tomadas",
          "colorRgba": "rgba(0, 0, 0, 0.8)"
        },
        "price": 100.0,
        "name": "Coca Cola",
        "createdAt": null
      },
      "quantity": 3,
      "price": 100.0,
      "purchase_date": "2023-06-15"
    },
    // ... más compras ...
  ];

  get filteredPurchases() {
    let filtered = [...this.purchases];
    
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
      );
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

  getCountByType(typeId: number): number {
    return this.purchases.filter(p => p.product.productType.productTypeId === typeId).length;
  }

  filterByType(typeId: number) {
    this.selectedType = this.selectedType === typeId ? null : typeId;
    this.currentPage = 0;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  getTypeColor(productType: any): string {
    return productType.colorRgba || '#cccccc';
  }
}
