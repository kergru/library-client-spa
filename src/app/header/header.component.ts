import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  template: `
  <header class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" routerLink="/">Bibliothek</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><a class="nav-link" routerLink="/books">Bücherliste</a></li>
          <li *ngIf="auth.hasRole('LIBRARIAN')" class="nav-item"><a class="nav-link" routerLink="/admin/users">Benutzerliste</a></li>
        </ul>
        <ul class="navbar-nav">
          <li *ngIf="!auth.isLoggedIn()" class="nav-item"><a class="nav-link" (click)="auth.login()">Login</a></li>
          <li *ngIf="auth.isLoggedIn()" class="nav-item"><a class="nav-link" (click)="auth.logout()">Logout</a></li>
        </ul>
      </div>
    </div>
  </header>
  `
})
export class HeaderComponent {
  constructor(public auth: AuthService) {}
}
