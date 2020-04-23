import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(public layoutService: LayoutService, public router: Router) { }

  public destroySubject$: Subject<any> = new Subject;

  ngOnInit() {
    this.layoutService.goBack$.pipe(takeUntil(this.destroySubject$)).subscribe(res => {
      this.router.navigate(['']);
    });
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

}
