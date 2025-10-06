import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BooksListComponent } from './books/books-list/books-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { ForbiddenComponent } from './errors/forbidden/forbidden.component';
import { NotFoundComponent } from './errors/notfound/notfound.component';

import { authGuard } from './auth/auth.guard';
import { roleGuard } from './auth/role.guard';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'me', component: UserDetailComponent, canActivate: [authGuard] },

  // Bücher: nur Login notwendig
  { path: 'books', component: BooksListComponent, canActivate: [authGuard] },
  { path: 'books/:isbn', component: BookDetailComponent, canActivate: [authGuard] },

  // Admin: braucht spezielle Rollen
  { path: 'admin/users', component: UsersListComponent, canActivate: [roleGuard(['LIBRARIAN', 'ADMIN'])] },
  { path: 'admin/users/:id', component: UserDetailComponent, canActivate: [roleGuard(['LIBRARIAN', 'ADMIN'])] },

  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: NotFoundComponent }, // jede unbestimmte Route auf NotFoundComponent umleiten

];
