import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Products, ProductType } from '../../../data/models/products/product.model';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    MatTableModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
}
