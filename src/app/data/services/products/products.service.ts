import { Injectable } from '@angular/core';
import { RepoService } from '../repo/repo.service';
import { Products } from '../../models/products/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../models/response/response.model';
import { ProductStats } from '../../models/products/productStats.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends RepoService<Products> {

  constructor(private client: HttpClient) {
    super(client, 'products')
  }

  getProductStats(): Observable<Response<ProductStats>>{
    return this.client.get<Response<ProductStats>>(`${this.fullUrl}/stats`)
  }
}
