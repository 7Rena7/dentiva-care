import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { baseUrl } from 'src/env/environment';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor(private http: HttpClient) {}

  getQuery(query: string) {
    const url = `${baseUrl}/geolocation/${query}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this.http.get(url, { headers });
  }

  getProvinces(): Observable<any> {
    return this.getQuery(`provinces`).pipe(
      map((resp: any) => resp.data.provinces)
    );
  }

  getCities(provinceId: string): Observable<any> {
    return this.getQuery(`cities/${provinceId}`).pipe(
      map((resp: any) => resp.data.cities)
    );
  }
}
