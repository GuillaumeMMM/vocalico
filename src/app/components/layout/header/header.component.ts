import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public layoutService: LayoutService, public router: Router) { }

  ngOnInit() {
  }

  backClicked = () => {
    this.layoutService.goBack$.next(true);
  }

}
