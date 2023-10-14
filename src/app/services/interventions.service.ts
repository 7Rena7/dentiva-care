import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { baseUrl } from 'src/env/environment';
import { LineIntervention } from '../types';

@Injectable({
  providedIn: 'root',
})
export class InterventionsService {
  constructor(private http: HttpClient) {}

  getQuery(query: string) {
    const url = `${baseUrl}/interventions${query}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this.http.get(url, { headers });
  }

  postQuery(data: any) {
    const url = `${baseUrl}/interventions`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this.http.post(url, data, { headers });
  }

  putQuery(uid: string, data: any) {
    const url = `${baseUrl}/interventions/${uid}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this.http.put(url, data, { headers });
  }

  getInterventions(patientId: string): Observable<any> {
    return this.getQuery(`/${patientId}`).pipe(map((resp: any) => resp.data));
  }

  getInterventionById(uid: string): Observable<any> {
    return this.getQuery(`/${uid}`).pipe(map((resp: any) => resp.data));
  }

  registerIntervention(
    data: FormGroup,
    lineInterventions: Array<LineIntervention>,
    patientId: string
  ): Observable<any> {
    const { controls } = data;
    console.log(data);
    console.log(lineInterventions);

    const body = {
      date: controls['date'].value,
      softTissues: controls['softTissues'].value,
      observations: controls['observations'].value,
      patientId,
      lineInterventions: lineInterventions,
    };

    return this.postQuery(body);
  }

  updateIntervention(
    uid: string,
    data: FormGroup,
    lineInterventions: Array<LineIntervention>
  ): Observable<any> {
    const { controls } = data;

    const body = {
      date: controls['date'].value,
      softTissues: controls['softTissues'].value,
      observations: controls['observations'].value,
      interventions: lineInterventions,
    };

    return this.putQuery(uid, body);
  }
}
