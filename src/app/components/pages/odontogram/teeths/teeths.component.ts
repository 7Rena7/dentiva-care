import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Teeth } from 'src/app/types';

@Component({
  selector: 'app-teeths',
  templateUrl: './teeths.component.html',
})
export class TeethsComponent implements AfterContentInit {
  @Input() teeths: Teeth[] = [];
  @Output() selectTeethEvent = new EventEmitter<number | undefined>();
  @Input() selectedTeeth: number | undefined = undefined;
  firstSection: Teeth[] = [];
  secondSection: Teeth[] = [];
  thirdSection: Teeth[] = [];
  fourthSection: Teeth[] = [];

  ngAfterContentInit() {
    this.firstSection = this.teeths.filter(
      (tooth) => tooth.number <= 18 && tooth.number >= 11
    );
    this.secondSection = this.teeths.filter(
      (tooth) => tooth.number >= 21 && tooth.number <= 28
    );
    this.thirdSection = this.teeths.filter(
      (tooth) => tooth.number >= 41 && tooth.number <= 48
    );
    this.fourthSection = this.teeths.filter(
      (tooth) => tooth.number >= 31 && tooth.number <= 38
    );
  }

  teethSelected(teethNumberSelected: number | undefined) {
    this.selectTeethEvent.emit(teethNumberSelected);
  }
}
