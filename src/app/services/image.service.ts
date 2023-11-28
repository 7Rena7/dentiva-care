import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { baseUrl } from 'src/env/environment';

export class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  postQuery(path: string, data: any) {
    const url = `${baseUrl}/upload/${path}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this.http.post(url, data, { headers });
  }

  public uploadImage(image: File): Observable<any> {
    console.log(image);
    const formData = new FormData();
    formData.append('image', image);
    return this.http
      .post('profile-picture', formData)
      .pipe(map((res: any) => res));
  }
}
