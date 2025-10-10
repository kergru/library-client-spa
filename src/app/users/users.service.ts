import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserListState, UserDetailState, User } from './user.model';
import { PageResponse } from "../page/page.model";
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);

  getUsers(searchString: string = '', page: number = 0, size: number = 10, sortBy: string = 'title'): Observable<UserListState> {
    const params = new HttpParams()
                                    .set('searchString', searchString)
                                    .set('page', page)
                                    .set('size', size)
                                    .set('sortBy', sortBy);

    return this.http.get<PageResponse<User>>(environment.apiBaseUrl + '/admin/users', { params })
    .pipe(
      map(pageData => ({ loading: false, error: null, page: pageData })),
      startWith({ loading: true, error: null, page: null }),
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
