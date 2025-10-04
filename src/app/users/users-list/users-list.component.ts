import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService } from '../users.service';
import { UserListState } from '../user.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './users-list.component.html'
})
export class UsersListComponent {
  state$: Observable<UserListState>;

  constructor(private userService: UsersService) {
    this.state$ = this.userService.getUsers();
  }
}
