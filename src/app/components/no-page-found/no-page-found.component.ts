import { Component } from '@angular/core';

@Component({
  selector: 'app-no-page-found',
  template: `
    <div class="px-4 py-5 my-5 text-center animated fadeIn fast">
      <img
        class="d-block mx-auto mb-4"
        src="../../assets/no-page-found.jpeg"
        alt=""
        width="500"
        height="400"
      />
      <h1 class="display-5 fw-bold text-body-emphasis">
        Error 404 - Página no encontrada
      </h1>
      <div class="col-lg-6 mx-auto pt-5">
        <p class="lead mb-4 fs-3">
          ¡Vaya! Parece que has llegado a un lugar inexplorado. Aquí no hay nada
          más que el eco de una página perdida en el vasto universo digital.
          ¿Quizás te perdiste en el camino? ¡Regresemos juntos a tierras
          conocidas! Mientras tanto, disfruta de este pequeño espacio en el
          limbo digital.
        </p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <a
            type="button"
            class="btn btn-outline-secondary fs-3"
            [routerLink]="['/home']"
          >
            Volver a Home <i class="bi bi-house-fill"></i>
          </a>
        </div>
      </div>
    </div>
  `,
})
export class NoPageFoundComponent {}
