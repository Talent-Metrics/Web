import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'environment',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.scss']
})
export class EnvironmentComponent implements OnInit {
  @ViewChild('sidenav',{static:false}) sidenav: ElementRef;
  screenWidth: number;
  links = [
    { key: 'dashboard', value: 'Dashboard', icon: 'dashboard' },
    { key: 'customers', value: 'Customer', icon: 'group_work' },
    { key: 'organizations', value: 'Organization', icon: 'people' },
    { key: 'subscriptions', value: 'Subscription', icon: 'payment' },
    { key: 'surveys', value: 'Surveys', icon: 'work' },
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
