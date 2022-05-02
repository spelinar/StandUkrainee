import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubscribeService {
  constructor(private http: HttpClient) {}

  public subscribeEmail(mail: string): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}againstwar/contact`,
      { mail },
      { responseType: 'text' }
    ).pipe(
      catchError((response) => {
        throw response.error ?? 'Something goes wrong. Try again later';
      })
    );
  }
}
