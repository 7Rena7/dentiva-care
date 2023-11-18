import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-teeth',
  templateUrl: './teeth.component.html',
  styleUrls: ['./teeth.component.css'],
})
export class TeethComponent {
  @Input() teethNumber: number | undefined = undefined;
  @Output() selectTeethEvent = new EventEmitter<number | undefined>();
  @Input() selected = false;

  selectTeeth(teethNumber: number | undefined) {
    this.selected = !this.selected;
    if (teethNumber !== undefined) this.selectTeethEvent.emit(teethNumber);
  }
}
