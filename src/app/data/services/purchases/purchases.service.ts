import { Injectable } from '@angular/core';
import { RepoService } from '../repo/repo.service';
import { Purchases } from '../../models/purchases/purchases.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService extends RepoService<Purchases> {

  constructor(
    private client: HttpClient
  ) {
    super(client, "purchases")
  }
}
