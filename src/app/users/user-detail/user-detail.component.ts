import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsersService } from '../users.service';
import { UserDetailState } from '../user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent {
  state$: Observable<UserDetailState>;

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) {
    const userId = this.route.snapshot.paramMap.get('id');
    this.state$ = this.userService.getUser(userId!);
  }
}
