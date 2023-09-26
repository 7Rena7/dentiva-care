import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { baseUrl } from 'src/env/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  registerUser(data: FormGroup): Observable<any> {
    const { controls } = data;
    const url = baseUrl + '/users';

    const body = {
      firstName: controls['firstName'].value,
      lastName: controls['lastName'].value,
      dni: controls['dni'].value,
      cuil: controls['cuil'].value,
      telephone: controls['telephone'].value,
      consultingRoomName: controls['consultingRoomName'].value,
      consultingRoomTelephone: controls['consultingRoomTelephone'].value,
      consultingRoomAddress: null as unknown as {
        consultingRoomProvince: string;
        consultingRoomCity: string;
        consultingRoomPostalCode: string;
        consultingRoomStreet: string;
        consultingRoomNumber: string;
        consultingRoomDepartment: string;
      },
      email: controls['email'].value,
      password: controls['password'].value,
    };

    if (controls['consultingRoomStreet'].value !== '') {
      body.consultingRoomAddress = {
        consultingRoomProvince: controls['consultingRoomProvince'].value,
        consultingRoomCity: controls['consultingRoomCity'].value,
        consultingRoomPostalCode: controls['consultingRoomPostalCode'].value,
        consultingRoomStreet: controls['consultingRoomStreet'].value,
        consultingRoomNumber: controls['consultingRoomNumber'].value,
        consultingRoomDepartment: controls['consultingRoomDepartment'].value,
      };
    }

    return this.http.post(url, body);
  }

  getProvinces(): Observable<any> {
    const url =
      'https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre';
    return this.http.get(url).pipe(
      map((resp: any) => {
        const provinces = resp.provincias;
        return provinces.sort((a: any, b: any) =>
          a.nombre.localeCompare(b.nombre)
        );
      })
    );
  }

  getCities(provinceId: string): Observable<any> {
    const url = `https://apis.datos.gob.ar/georef/api/localidades?provincia=${provinceId}&campos=id,nombre&max=200`;
    return this.http.get(url).pipe(
      map((resp: any) => {
        const cities = resp.localidades;
        return cities.sort((a: any, b: any) =>
          a.nombre.localeCompare(b.nombre)
        );
      })
    );
  }
}
