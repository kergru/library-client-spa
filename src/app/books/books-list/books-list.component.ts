import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { Observable } from 'rxjs';

interface BooksState {
  loading: boolean;
  error: string | null;
  books: Book[];
}

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './books-list.component.html'
})
export class BooksListComponent {
  private bookService = inject(BookService);

  state$: Observable<BooksState>;

  constructor() {
    this.state$ = this.bookService.getBooks();
  }
}
