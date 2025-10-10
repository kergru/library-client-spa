import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { Book, BookListState, BookDetailState } from './book.model';
import { PageResponse } from '../page/page.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BookService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl + '/books';

  getBooks(searchString: string = '', page: number = 0, size: number = 10, sortBy: string = 'title'): Observable<BookListState> {
    const params = new HttpParams()
                                    .set('searchString', searchString)
                                    .set('page', page)
                                    .set('size', size)
                                    .set('sortBy', sortBy);

    return this.http.get<PageResponse<Book>>(this.baseUrl, { params })
    .pipe(
      map(pageData => ({ loading: false, error: null, page: pageData })),
      startWith({ loading: true, error: null, page: null }),
      catchError(err =>
        of({ loading: false, error: err.message, page: null })
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
