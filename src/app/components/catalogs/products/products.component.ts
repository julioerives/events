import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Products, ProductType } from '../../../data/models/products/product.model';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { HexToRgbaPipe } from '../../../pipes/HexToRgba/hex-to-rgba.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';

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
export class ProductsComponent {
  displayedColumns: string[] = ["name", "productType", "price", "actions"];
  products: Products[] = [
  {
    productId: 1,
    productType: {
      productTypeId: 101,
      name: "Electrónica",
      description: "Dispositivos electrónicos",
      colorRgba: "rgba(0,123,255,1)"
    },
    price: 599.99,
    name: "Smartphone X200",
    createdAt: new Date("2025-01-15")
  },
  {
    productId: 2,
    productType: {
      productTypeId: 102,
      name: "Hogar",
      description: "Electrodomésticos para el hogar",
      colorRgba: "rgba(255,193,7,1)"
    },
    price: 299.99,
    name: "Aspiradora ProClean",
    createdAt: new Date("2025-02-10")
  },
  {
    productId: 3,
    productType: {
      productTypeId: 103,
      name: "Juguetes",
      description: "Juguetes para niños de todas las edades",
      colorRgba: "rgba(40,167,69,1)"
    },
    price: 49.99,
    name: "Robot Interactivo Zeta",
    createdAt: new Date("2025-03-01")
  },
  {
    productId: 4,
    productType: {
      productTypeId: 104,
      name: "Ropa",
      description: "Ropa para hombre y mujer"
      // Sin colorRgba
    },
    price: 79.99,
    name: "Chaqueta Impermeable",
    // Sin createdAt
  }
];
  public dataSource: MatTableDataSource<Products> = new MatTableDataSource<Products>(this.products);

}
