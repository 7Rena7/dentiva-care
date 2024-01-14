import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { baseUrl } from 'src/env/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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

    if (
      controls['consultingRoomProvinceName'].value ||
      controls['consultingRoomCity'].value ||
      controls['consultingRoomPostalCode'].value ||
      controls['consultingRoomStreet'].value ||
      controls['consultingRoomNumber'].value ||
      controls['consultingRoomDepartment'].value
    ) {
      body.consultingRoomAddress = {
        consultingRoomProvince: controls['consultingRoomProvinceName'].value,
        consultingRoomCity: controls['consultingRoomCity'].value,
        consultingRoomPostalCode: controls['consultingRoomPostalCode'].value,
        consultingRoomStreet: controls['consultingRoomStreet'].value,
        consultingRoomNumber: controls['consultingRoomNumber'].value,
        consultingRoomDepartment: controls['consultingRoomDepartment'].value,
      };
    }

    return this.http.post(url, body);
  }

  confirmUser(activateToken: string): Observable<any> {
    const url = baseUrl + `/users/activate/${activateToken}`;
    return this.http.get(url).pipe(map((resp: any) => resp));
  }
}
