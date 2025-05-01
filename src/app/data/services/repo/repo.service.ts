import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PaginatorResponse, Response } from '../../models/response/response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class RepoService<T> {
  private readonly URL_API = environment.URL_API;
  protected fullUrl: string;

  constructor(public httpClient: HttpClient, path: string) {
    this.fullUrl = `${this.URL_API}/${path}`;
  }

  getAll() {
    return this.httpClient.get<Response<T[]>>(this.fullUrl);
  }

  getById(id: string | number) {
    return this.httpClient.get<Response<T>>(`${this.fullUrl}/${id}`);
  }

  create(item: T) {
    return this.httpClient.post<Response<T>>(this.fullUrl, item);
  }

  update(id: string | number = 0, item: T) {
    return this.httpClient.put<Response<T>>(`${this.fullUrl}/${id}`, item);
  }

  delete(id: string | number) {
    return this.httpClient.delete<Response<never>>(`${this.fullUrl}/${id}`);
  }

  softDelete(id: string | number) {
    return this.httpClient.patch<Response<never>>(`${this.fullUrl}/${id}`, null);
  }

  getAllByPage(page: number, size: number):Observable<Response<PaginatorResponse<T>>> {
    return this.httpClient.get<Response<PaginatorResponse<T>>>(`${this.fullUrl}`, {
      params: {
        page,
        size
      }
    });
  }
  getAllByPageAndFilter(page: number, size: number, name: string) {
    return this.httpClient.get<Response<T[]>>(`${this.fullUrl}`, {
      params: {
        page,
        size,
        name
      }
    });
  }
}
