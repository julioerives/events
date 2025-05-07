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
    MatChipsModule
  ],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.scss'
})
export class PurchasesComponent {
    hoveredItem: number | null = null;

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
          "productId": 5,
          "productType": {
            "productTypeId": 2,
            "name": "Comida",
            "description": "Alimentos consumidos",
            "colorRgba": "rgba(255, 152, 0, 0.8)"
          },
          "price": 150.0,
          "name": "Hamburguesa",
          "createdAt": null
        },
        "quantity": 2,
        "price": 300.0,
        "purchase_date": "2023-06-14"
      },
      {
        "purchase_id": 3,
        "product": {
          "productId": 7,
          "productType": {
            "productTypeId": 3,
            "name": "Electrónico",
            "description": "Productos electrónicos",
            "colorRgba": "rgba(63, 81, 181, 0.8)"
          },
          "price": 500.0,
          "name": "Auriculares",
          "createdAt": null
        },
        "quantity": 1,
        "price": 500.0,
        "purchase_date": "2023-06-13"
      }
    ];

    getTypeColor(productType: any): string {
      return productType.colorRgba || '#cccccc';
    }
}
