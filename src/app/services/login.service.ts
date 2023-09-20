import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { baseUrl } from '../../env/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(data: FormGroup): Observable<any> {
    const url = baseUrl + '/login';

    const body = {
      email: data.controls['email'].value,
      password: data.controls['password'].value,
    };

    return this.http.post(url, body).pipe(map((resp: any) => resp.token));
  }

  isTokenValid(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new Headers().set('token', token);

      return this.http.post<any>(`${baseUrl}/login/validate`, { headers }).pipe(
        map((resp) => {
          console.log(resp);
          return resp.valid;
        }),
        catchError((err) => {
          console.log(err);
          return of(false);
        })
      );
    } else {
      return of(false);
    }
  }
}
