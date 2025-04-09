import { Injectable } from '@angular/core';
import { RepoService } from '../repo/repo.service';
import { Login } from '../../models/auth/auth.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RepoService<Login>{

  constructor(private client: HttpClient) {
    super(client, 'auth');
   }
  login(login: Login) {
    return this.client.post<Login>(`${this.fullUrl}/login`, login);
  }
}
