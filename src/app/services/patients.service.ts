import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/env/environment';
import { Patient, PatientsResponse } from '../types';
import { Observable, map } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private http: HttpClient) {}

  getQuery(query: string) {
    const url = `${baseUrl}/patients${query}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this.http.get(url, { headers });
  }

  postQuery(data: any) {
    const url = `${baseUrl}/patients`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this.http.post(url, data, { headers });
  }

  getPatients(query: string): Observable<PatientsResponse> {
    return this.getQuery(`?search=${query}`).pipe(
      map((resp: any) => resp.data)
    );
  }

  getPatientById(uid: string): Observable<Patient> {
    return this.getQuery(`/${uid}`).pipe(map((resp: any) => resp.data));
  }

  registerPatient(data: FormGroup): Observable<any> {
    const { controls } = data;

    const body = {
      firstName: controls['firstName'].value,
      lastName: controls['lastName'].value,
      dni: controls['dni'].value,
      cuil: controls['cuil'].value,
      dob: controls['dob'].value,
      telephone: controls['telephone'].value,
      address: {
        province: controls['province'].value,
        city: controls['city'].value,
        street: controls['street'].value,
        number: controls['number'].value,
        department: controls['department'].value,
      },
      medicalService: controls['medicalService'].value,
      medicalServiceNumber: controls['medicalServiceNumber'].value,
      alergies: controls['alergies'].value,
      diabetes: controls['diabetes'].value,
      reumaticFiber: controls['reumaticFiber'].value,
      epilepsy: controls['epilepsy'].value,
      cardiopathy: controls['cardiopathy'].value,
      hepatithis: controls['hepatithis'].value,
      other: controls['other'].value,
      otherIllnesses: controls['otherIllnesses'].value,
      otherDetails: controls['otherDetails'].value,
      generalApretiation: controls['generalApretiation'].value,
    };

    return this.postQuery(body);
  }

  deletePatient(uid: string): Observable<any> {
    const url = `${baseUrl}/patients/${uid}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this.http.delete(url, { headers });
  }
}
