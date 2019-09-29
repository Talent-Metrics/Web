import {Component, OnDestroy, OnInit} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  user: User;
  users: User[];
  userId: string;
  customerId: string;
  userForm = new FormGroup({});
  getUser(id: string) {
    this.usersService.getUser(id)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((e: User) => {
        this.user = e;
        this.mockTest();
      }, err => {
        console.log(err);
        alert(err);
      }, () => { console.log('Get User complete'); });
  }
  getUsers(custId: string) {
    this.usersService.getUsersByCustomerId(custId)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((e: User[]) => {
        this.users = e;
        this.user = this.users[0];
        this.mockTest();
      }, err => {
        console.log(err);
        alert(err);
      }, () => { console.log('Get Users complete'); });
  }
  onSubmit() {
    this.usersService.updateUser(this.user._id, this.userForm.value)
      .subscribe((e) => {
        console.log(e);
      }, err => {
        console.log(err);
        alert(err);
      }, () => { console.log('Update User complete'); });
  }
  mockTest() {
    this.userForm.patchValue(this.user);
  }
  constructor(
    public usersService: UsersService
  ) { }

  ngOnInit() {
    this.userForm = this.usersService.userForm();
    this.customerId = '5c429b0a1c9d4400005b4830';
    this.userId = '5c429bf61c9d4400005b4831';
    this.getUser(this.userId);
    this.getUsers(this.customerId);
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
