import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GreetingService {

  constructor(private readonly httpClient: HttpClient) { }

  fetch(): Observable<string> {
    // @ts-ignore
    return this.httpClient.get(environment.api.greeting).pipe(map((res: EntityArrayResponseType) => res ? res.body : ''));
  }
}

type EntityArrayResponseType = HttpResponse<string>;
