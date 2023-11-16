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
    const token = localStorage.getItem('token') || '';
    return this.login.isTokenValid(token).pipe(
      map((valid: boolean) => {
        if (valid) return true;
        else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }

  restorePassword(): Observable<boolean> {
    const token = localStorage.getItem('restoreToken') || '';
    return this.login.isTokenValid(token).pipe(
      map((valid: boolean) => {
        if (valid) return false;
        else {
          this.router.navigate(['/login']);
          return true;
        }
      })
    );
  }
}
