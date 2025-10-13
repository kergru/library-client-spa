import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';

interface BookDetailState {
  loading: boolean;
  error: string | null;
  book: Book | null;
}

type BorrowResult = 'success' | 'conflict' | 'unknown' | null;

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-detail.component.html'
})
export class BookDetailComponent {
  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);
  auth = inject(AuthService);

  state$: Observable<BookDetailState>;

  // 🔹 nur UI-Flags – keine Texte
  borrowBusy = false;
  borrowResult: BorrowResult = null;

  constructor() {
    this.state$ = this.route.paramMap.pipe(
      switchMap(params => {
        const isbn = params.get('isbn');
        if (!isbn) {
          return of({ loading: false, error: 'Keine ISBN angegeben', book: null });
        }
        // Erwartet von deinem Service ein Objekt { loading:false, error:null, book }
        // Falls getBook nur Book liefert, dort entsprechend mappen.
        return this.bookService.getBook(isbn);
      })
    );
  }

  onBorrow(book: Book) {
    if (!book?.loanStatus?.available || this.borrowBusy) return;

    this.borrowBusy = true;
    this.borrowResult = null;

    this.bookService.borrowBook(book.isbn).subscribe({
      next: () => {
        this.borrowBusy = false;
        this.borrowResult = 'success';
        // 🔄 Badge in der UI umschalten (minimal, ohne state$-Refactor)
        if (book.loanStatus) book.loanStatus.available = false;
      },
      error: (err) => {
        this.borrowBusy = false;
        this.borrowResult = err?.status === 409 ? 'conflict' : 'unknown';
      }
    });
  }
}
