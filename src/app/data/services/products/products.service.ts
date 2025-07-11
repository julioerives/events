import { Injectable } from '@angular/core';
import { RepoService } from '../repo/repo.service';
import { Products } from '../../models/products/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends RepoService<Products> {

  constructor(private client: HttpClient) {
    super(client, 'products')
  }

  getProductStats(){
    return this.client.get(`${this.fullUrl}/stats`)
  }
}
