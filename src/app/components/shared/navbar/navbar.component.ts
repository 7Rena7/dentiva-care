import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-white bg-white px-3">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/home"
          ><img src="../assets/logo.svg" alt="" width="175" height="50"
        /></a>
        <button class="btn btn-outline-danger" type="button" (click)="logout()">
          Cerrar Sesión
        </button>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  constructor(private login: LoginService) {}

  logout() {
    this.login.logout();
  }
}
