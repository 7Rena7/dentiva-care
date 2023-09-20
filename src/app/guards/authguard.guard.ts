import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private login: LoginService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.login.isTokenValid().pipe(
      map((valid) => {
        if (valid) {
          console.log('Token is valid');
          return true;
        } else {
          this.router.navigate(['/login']);
          console.log('Token is not valid');
          return false;
        }
      })
    );
  }
}
