import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book.model';

@Component({
  selector: 'app-books-list',
  template: `
    <h2>Bücher</h2>
    <div *ngIf="loading">Lade…</div>
    <ul *ngIf="!loading">
      <li *ngFor="let b of books">
        <a [routerLink]="['/books', b.isbn]">{{b.title}}</a> — {{b.author}}
      </li>
    </ul>
    <div *ngIf="error" style="color:red">Fehler: {{error}}</div>
  `
})
export class BooksListComponent implements OnInit {
  books: Book[] = [];
  loading = false;
  error: string | null = null;
  constructor(private svc: BookService) {}
  ngOnInit() {
    this.loading = true;
    this.svc.getBooks().subscribe({
      next: d => { this.books = d; this.loading=false; },
      error: e => { this.error = e.message || e; this.loading=false; }
    })
  }
}
