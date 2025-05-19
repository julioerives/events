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
// En tu componente
sampleProducts: Products[] = [
  {
    productId: 1,
    name: 'Laptop Elite',
    price: 1299.99,
    createdAt: new Date('2023-05-15'),
    productType: {
      productTypeId: 1,
      name: 'Electrónicos',
      description: 'Dispositivos electrónicos',
      colorRgba: 'rgba(75, 192, 192, 0.2)'
    }
  },
  {
    productId: 2,
    name: 'Camisa Formal',
    price: 49.99,
    createdAt: new Date('2023-06-20'),
    productType: {
      productTypeId: 2,
      name: 'Ropa',
      description: 'Prendas de vestir',
      colorRgba: 'rgba(255, 99, 132, 0.2)'
    }
  },
  {
    productId: 3,
    name: 'Libro de Angular',
    price: 35.50,
    createdAt: new Date('2023-07-10'),
    productType: {
      productTypeId: 3,
      name: 'Libros',
      description: 'Material de lectura',
      colorRgba: 'rgba(54, 162, 235, 0.2)'
    }
  }
];

productTypes: ProductType[] = [
  {
    productTypeId: 1,
    name: 'Electrónicos',
    description: 'Dispositivos electrónicos',
    colorRgba: 'rgba(75, 192, 192, 0.2)'
  },
  {
    productTypeId: 2,
    name: 'Ropa',
    description: 'Prendas de vestir',
    colorRgba: 'rgba(255, 99, 132, 0.2)'
  },
  {
    productTypeId: 3,
    name: 'Libros',
    description: 'Material de lectura',
    colorRgba: 'rgba(54, 162, 235, 0.2)'
  }
];

// Variables para el modal
showModal = false;
editingProduct = false;
currentProduct: Products = {
  productId: 0,
  name: '',
  price: 0,
  productType: {
    productTypeId: 0,
    name: '',
    description: '',
  }
};

// Variables para paginación
currentPage = 1;
totalPages = 3;
searchTerm = '';

// Métodos vacíos (solo estructura)
openAddModal(): void {
  // Lógica para abrir modal de agregar
}

editProduct(product: Products): void {
  // Lógica para editar producto
}

deleteProduct(id: number): void {
  // Lógica para eliminar producto
}

closeModal(): void {
  // Lógica para cerrar modal
}

saveProduct(): void {
  // Lógica para guardar producto
}
}
