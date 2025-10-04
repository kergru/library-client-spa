import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface BookDetailState {
  loading: boolean;
  error: string | null;
  book: Book | null;
}

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-detail.component.html'
})
export class BookDetailComponent {
  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);

  state$: Observable<BookDetailState>;

  constructor() {
    this.state$ = this.route.paramMap.pipe(
      switchMap(params => {
        const isbn = params.get('isbn');
        if (!isbn) {
          return of({ loading: false, error: 'Keine ISBN angegeben', book: null });
        }
        return this.bookService.getBook(isbn);
      })
    );
  }
}
