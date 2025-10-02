import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './user.model';

@Component({
  selector: 'app-users-list',
  template: `
    <h2>Benutzer</h2>
    <ul>
      <li *ngFor="let u of users">
        <a [routerLink]="['/admin/users', u.id]">{{u.username}}</a> ({{u.email}})
      </li>
    </ul>
  `
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  constructor(private svc: UsersService) {}
  ngOnInit() {
    this.svc.getUsers().subscribe(d => this.users = d);
  }
}
