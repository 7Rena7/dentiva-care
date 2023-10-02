import { Component } from '@angular/core';

@Component({
  selector: 'app-teeths',
  templateUrl: './teeths.component.html',
  styleUrls: ['./teeths.component.css'],
})
export class TeethsComponent {
  firstSection = [
    { number: 18, name: '18' },
    { number: 17, name: '17' },
    { number: 16, name: '16' },
    { number: 15, name: '15' },
    { number: 14, name: '14' },
    { number: 13, name: '13' },
    { number: 12, name: '12' },
    { number: 11, name: '11' },
  ];

  secondSection = [
    { number: 21, name: '21' },
    { number: 22, name: '22' },
    { number: 23, name: '23' },
    { number: 24, name: '24' },
    { number: 25, name: '25' },
    { number: 26, name: '26' },
    { number: 27, name: '27' },
    { number: 28, name: '28' },
  ];

  thirdSection = [
    { number: 48, name: '48' },
    { number: 47, name: '47' },
    { number: 46, name: '46' },
    { number: 45, name: '45' },
    { number: 44, name: '44' },
    { number: 43, name: '43' },
    { number: 42, name: '42' },
    { number: 41, name: '41' },
  ];

  fourthSection = [
    { number: 31, name: '31' },
    { number: 32, name: '32' },
    { number: 33, name: '33' },
    { number: 34, name: '34' },
    { number: 35, name: '35' },
    { number: 36, name: '36' },
    { number: 37, name: '37' },
    { number: 38, name: '38' },
  ];

  constructor() {}
}
