import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksListComponent } from './books/books-list.component';
import { BookDetailComponent } from './books/book-detail.component';
import { UsersListComponent } from './users/users-list.component';
import { UserDetailComponent } from './users/user-detail.component';
import { authGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BooksListComponent, canActivate: [authGuard] },
  { path: 'books/:isbn', component: BookDetailComponent, canActivate: [authGuard] },
  { path: 'admin/users', component: UsersListComponent, canActivate: [authGuard] },
  { path: 'admin/users/:id', component: UserDetailComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
