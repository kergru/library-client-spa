import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, switchMap, debounceTime, distinctUntilChanged } from 'rxjs';
import { BookService } from '../book.service';

interface BookSearchParams {
  search: string;
  page: number;
  size: number;
  sortBy: string;
}

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './books-list.component.html'
})
export class BooksListComponent {
  private bookService = inject(BookService);

  // 🔸 Steuerungsparameter als BehaviorSubject
  private params$ = new BehaviorSubject<BookSearchParams>({
    search: '',
    page: 0,
    size: 5,
    sortBy: 'title'
  });

  // 📡 State-Observable
  state$ = this.params$.pipe(
    // kleine Pause beim Tippen in der Suche → vermeidet unnötige Requests
    debounceTime(300),
    distinctUntilChanged((a, b) =>
      a.search === b.search && a.page === b.page && a.size === b.size && a.sortBy === b.sortBy
    ),
    switchMap(params =>
      this.bookService.getBooks(params.search, params.page, params.size, params.sortBy)
    )
  );

  // 📥 Eingabefeld-Datenbindung
  searchTerm = '';

  onSearch() {
    this.params$.next({
      ...this.params$.value,
      search: this.searchTerm,
      page: 0 // immer zur ersten Seite springen bei neuer Suche
    });
  }

  changePage(page: number) {
    const current = this.params$.value;
    if (page >= 0) {
      this.params$.next({ ...current, page });
    }
  }

  getPagesArray(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, i) => i);
  }
}
