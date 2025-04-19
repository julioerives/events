import { Injectable } from '@angular/core';
import { RepoService } from '../repo/repo.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Event } from '../../models/events/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService extends RepoService<Event> {

  constructor(
    private client: HttpClient
  ) {
    super(client, 'events');
  }

}
