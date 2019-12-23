import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.scss']
})
export class EnvironmentComponent implements OnInit {
  @ViewChild('sidenav', {read: ElementRef, static: false}) sidenav: ElementRef;
  screenWidth: number;
  links = [
    { key: 'dashboard', value: 'Dashboard', icon: 'dashboard' },
    { key: 'customers', value: 'Customers', icon: 'group_work' },
    { key: 'wordbank', value: 'Word Bank', icon: 'font_download' },
    { key: 'users', value: 'User', icon: 'person' }
  ];

  constructor(
  ) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit() {
  }

}
