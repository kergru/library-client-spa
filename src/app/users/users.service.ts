import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserListState, UserDetailState, User } from './user.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);

  getUsers(): Observable<UserListState> {
    return this.http.get<User[]>(environment.apiBaseUrl + '/admin/users')
    .pipe(
      map(users => ({ loading: false, error: null, users })),
      startWith({ loading: true, error: null, users: [] }),
    );
  }

  getUser(id: string): Observable<UserDetailState> {
    var url = environment.apiBaseUrl + '/admin/users/${id}';
    if(id === 'me') {
      url = environment.apiBaseUrl + '/me';
    }
    return this.http.get<User>(`${url}`)
    .pipe(
      map(user => ({ loading: false, error: null, user })),
      startWith<UserDetailState>({
        loading: true,
        error: null,
        user: null
      })
    );
  }
}
