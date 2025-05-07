import { Injectable } from '@angular/core';
import { RepoService } from '../repo/repo.service';
import { MultiplePurchases, Purchases } from '../../models/purchases/purchases.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../models/response/response.model';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService extends RepoService<Purchases> {

  constructor(
    private client: HttpClient
  ) {
    super(client, "purchases")
  }

  createMultiple(data: MultiplePurchases): Observable<Response<MultiplePurchases>>{
    return this.httpClient.post<Response<MultiplePurchases>>(`${this.fullUrl}/multiple`, data)
  }
}
