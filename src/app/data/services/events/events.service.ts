import { Injectable } from '@angular/core';
import { RepoService } from '../repo/repo.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Event } from '../../models/events/event.model';
import { Observable } from 'rxjs';
import { Response } from '../../models/response/response.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService extends RepoService<Event> {

  constructor(
    private client: HttpClient
  ) {
    super(client, 'events');
  }

  getAllByDates(startDate: string, endDate: string): Observable<Response<Event[]>> {
    return this.client.get<Response<Event[]>>(`${this.fullUrl}/byDates`, {
      params: {
        startDate,
        endDate
      }
    });
  }

}
