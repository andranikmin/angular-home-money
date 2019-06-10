import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {BaseApiService} from '../../../shared/core/base-api.service';
import {AMEvent} from '../models/event.model';
import {Injectable} from '@angular/core';

@Injectable()
export class EventsService extends BaseApiService {
  constructor(public http: HttpClient) {
    super(http);
  }

  addEvent(event: AMEvent): Observable<AMEvent> {
    return this.post('events', event);
  }

  getEvents(): Observable<AMEvent[]> {
    return this.get('events');
  }

}
