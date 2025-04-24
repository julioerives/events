import { Injectable } from '@angular/core';
import { RepoService } from '../repo/repo.service';
import { Login } from '../../models/auth/auth.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Response } from '../../models/response/response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RepoService<Login>{

  public isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private client: HttpClient) {
    super(client, 'auth');
   }
  login(login: Login):Observable<Response<Login>> {
    return this.httpClient.post<Response<Login>>(`${this.fullUrl}`, login);
  }
  
  register(data: Login):Observable<Response<Login>>{
    return this.httpClient.post<Response<Login>>(`${this.fullUrl}/singIn`, data);
  }

  verifyToken() {
    return this.httpClient.get<{ isValid: boolean }>(`${this.fullUrl}/verify`,{
      withCredentials: true,
    }).pipe(
      tap((response) => {
        this.isAuthenticated$.next(response.isValid);
      },)
    );
  }
}
