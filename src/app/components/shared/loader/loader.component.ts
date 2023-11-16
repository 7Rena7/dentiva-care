import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class="loader-container"></div>
    <div class="loader"></div>
  `,
  styles: [
    `
      .loader {
        width: 50px;
        aspect-ratio: 1;
        --_c: no-repeat radial-gradient(farthest-side, #25b09b 92%, #0000);
        background: var(--_c) top, var(--_c) left, var(--_c) right,
          var(--_c) bottom;
        background-size: 12px 12px;
        animation: l7 1s infinite;
      }
      @keyframes l7 {
        to {
          transform: rotate(0.5turn);
        }
      }
    `,
  ],
})
export class LoaderComponent {}
