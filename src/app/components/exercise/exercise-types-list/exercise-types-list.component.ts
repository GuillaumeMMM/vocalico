import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-exercise-types-list',
  templateUrl: './exercise-types-list.component.html',
  styleUrls: ['./exercise-types-list.component.scss']
})
export class ExerciseTypesListComponent implements OnInit {

  @Input() list: any;
  @Output() chooseListType: EventEmitter<{from: string, to: string}> = new EventEmitter; 

  public exerciseTypes: {from: string, to: string}[];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChange) {
    if (change && change['list'] && change['list']['currentValue']) {
      if (change['list']['currentValue'].categories) {
        change['list']['currentValue'].categories.forEach(cat1 => {
          change['list']['currentValue'].categories.forEach(cat2 => {
            if (cat2 !== cat1) {
              if (!this.exerciseTypes) {
                this.exerciseTypes = [{from: cat1, to: cat2}];
              } else {
                this.exerciseTypes.push({from: cat1, to: cat2});
              }
            }
          })
        })
      }
    }
  }

  selectExercisetype = (exercise) => {
    this.chooseListType.emit(exercise);
  }

}
