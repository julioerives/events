import { Injectable } from '@angular/core';
import { RepoService } from '../repo/repo.service';
import { ProductType } from '../../models/products/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService extends RepoService<ProductType>{

  constructor(
    private client: HttpClient
  ) {
    super(client, "type_products")
  }
}
