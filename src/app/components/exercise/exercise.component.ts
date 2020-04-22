import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/services/layout.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  constructor(public listService: ListService, public router: Router, public layoutService: LayoutService) { }

  public choosenExercise: {from: string, to: string};
  public destroySubject$: Subject<any> = new Subject;

  ngOnInit() {
    if (!this.listService.list) {
      this.router.navigate(['']);
    }

    this.layoutService.goBack$.pipe(takeUntil(this.destroySubject$)).subscribe(res => {
      if (res) {
        if (this.choosenExercise) {
          this.choosenExercise = null;
        } else {
          this.router.navigate(['']);
        }
      }
    })
  }

  chooseListType = (exercise) => {
    console.log(exercise)
    this.choosenExercise = exercise;
  }

}
