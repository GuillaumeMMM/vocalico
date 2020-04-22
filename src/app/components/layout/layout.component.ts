import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(public listService: ListService) { }

  ngOnInit() {
    if (localStorage.getItem('list-test')) {
      this.listService.list = JSON.parse(localStorage.getItem('list-test'));
    }
  }

}
