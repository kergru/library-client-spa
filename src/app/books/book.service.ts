import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book.model';
import { environment } from '../../environments/environment';

@Injectable({providedIn:'root'})
export class BookService {
  private base = environment.apiBaseUrl + '/books';
  constructor(private http: HttpClient){}
  getBooks(): Observable<Book[]> { return this.http.get<Book[]>(this.base); }
  getBook(isbn: string): Observable<Book> { return this.http.get<Book>(`${this.base}/${encodeURIComponent(isbn)}`); }
}
