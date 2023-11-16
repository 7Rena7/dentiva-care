import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div class="container py-3">
      <footer
        class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top mt-auto"
      >
        <p class="col-md-4 mb-0 text-secondary-emphasis">
          &copy; 2023 Dentiva Care
        </p>
        <a class="navbar-brand" routerLink="/home"
          ><img src="../assets/logo.svg" alt="" width="175" height="50"
        /></a>
      </footer>
    </div>
  `,
})
export class FooterComponent {}
