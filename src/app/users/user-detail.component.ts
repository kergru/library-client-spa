import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from './users.service';
import { User } from './user.model';

@Component({
  selector: 'app-user-detail',
  template: `
    <div *ngIf="user">
      <h2>{{user.username}}</h2>
      <p><strong>ID:</strong> {{user.id}}</p>
      <p><strong>Email:</strong> {{user.email}}</p>
      <p><strong>Rollen:</strong> {{user.roles?.join(', ')}}</p>
    </div>
  `
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  constructor(private route: ActivatedRoute, private svc: UsersService) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.svc.getUser(id).subscribe(d => this.user = d);
  }
}
