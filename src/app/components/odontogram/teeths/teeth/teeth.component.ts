import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-teeth',
  templateUrl: './teeth.component.html',
  styleUrls: ['./teeth.component.css'],
})
export class TeethComponent {
  @Input() number: number = NaN;
}
