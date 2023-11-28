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

  registerPatient(data: FormGroup, profileImage?: File): Observable<any> {
    const { controls } = data;

    console.log(controls);
    // const formData = new FormData();
    // formData.append('profileImage', profileImage || '');
    // formData.set('firstName', controls['firstName'].value);
    // formData.append('lastName', controls['lastName'].value);
    // formData.append('dni', controls['dni'].value);
    // formData.append('cuil', controls['cuil'].value);
    // formData.append('dob', controls['dob'].value);
    // formData.append('telephone', controls['telephone'].value);
    // formData.append(
    //   'address',
    //   JSON.stringify({
    //     province: controls['province'].value,
    //     city: controls['city'].value,
    //     street: controls['street'].value,
    //     number: controls['number'].value,
    //     department: controls['department'].value,
    //   })
    // );
    // formData.append('medicalService', controls['medicalService'].value);
    // formData.append(
    //   'medicalServiceNumber',
    //   controls['medicalServiceNumber'].value
    // );
    // formData.append('alergies', controls['alergies'].value);
    // formData.append('diabetes', controls['diabetes'].value);
    // formData.append('reumaticFiber', controls['reumaticFiber'].value);
    // formData.append('epilepsy', controls['epilepsy'].value);
    // formData.append('cardiopathy', controls['cardiopathy'].value);
    // formData.append('hepatithis', controls['hepatithis'].value);
    // formData.append('other', controls['other'].value);
    // formData.append('otherIllnesses', controls['otherIllnesses'].value);
    // formData.append('otherDetails', controls['otherDetails'].value);
    // formData.append('generalApretiation', controls['generalApretiation'].value);

    // console.log(formData);

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
      profileImage: profileImage || '',
    };

    return this.postQuery(body);
  }

  updatePatient(uid: string, data: FormGroup): Observable<any> {
    const { controls } = data;

    const body = {
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

    const url = `${baseUrl}/patients/${uid}`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this.http.put(url, body, { headers });
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
