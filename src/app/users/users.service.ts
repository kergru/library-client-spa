import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private base = environment.apiBaseUrl + '/admin/users';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.base);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.base}/${id}`);
  }
}
