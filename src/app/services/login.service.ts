import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { baseUrl } from '../../env/environment';
import { Observable, map, of } from 'rxjs';
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
      const headers = new HttpHeaders().set('token', token);

      return this.http
        .post<any>(`${baseUrl}/login/validate`, {}, { headers })
        .pipe(
          map((resp) => {
            return resp.valid;
          })
        );
    } else {
      return of(false);
    }
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
