import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsersService } from '../users.service';
import { UserDetailState } from '../user.model';
import { Observable } from 'rxjs';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent {
  state$: Observable<UserDetailState>;
  auth = inject(AuthService);

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) {
    var userId = this.route.snapshot.paramMap.get('id');
    if (userId === null) userId = "me"
    this.state$ = this.userService.getUser(userId!);
  }
}
