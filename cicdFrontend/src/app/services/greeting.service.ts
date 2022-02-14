import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Greeting } from '../models/greeting.model';

@Injectable({
  providedIn: 'root'
})
export class GreetingService {

  constructor(private readonly httpClient: HttpClient) { }

  fetch(): Observable<Greeting> {
    // @ts-ignore
    return this.httpClient.get(environment.api.greeting).pipe(map((res: Greeting) => res));
  }
}
