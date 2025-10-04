import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { Book, BookListState, BookDetailState } from './book.model';
import { environment } from '../../environments/environment';
import {UserDetailState} from "../users/user.model";

@Injectable({ providedIn: 'root' })
export class BookService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl + '/books';

  getBooks(): Observable<BookListState> {
    return this.http.get<Book[]>(this.baseUrl)
    .pipe(
      map(books => ({ loading: false, error: null, books })),
      startWith({ loading: true, error: null, books: [] }),
      catchError(err =>
        of({ loading: false, error: err.message, books: [] })
      )
    );
  }

  getBook(isbn: string): Observable<BookDetailState> {
    return this.http.get<Book>(`${this.baseUrl}/${encodeURIComponent(isbn)}`)
    .pipe(
      map(book => ({ loading: false, error: null, book })),
      startWith({ loading: true, error: null, book: null })
    );
  }
}
