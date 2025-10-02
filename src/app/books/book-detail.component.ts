import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from './book.service';
import { Book } from './book.model';

@Component({
  selector: 'app-book-detail',
  template: `
    <div *ngIf='loading'>Lade…</div>
    <div *ngIf='book'>
      <h2>{{book.title}}</h2>
      <p><strong>Autor:</strong> {{book.author}}</p>
      <p><strong>ISBN:</strong> {{book.isbn}}</p>
      <p>{{book.description}}</p>
    </div>
  `
})
export class BookDetailComponent implements OnInit {
  book: Book | null = null;
  loading = false;
  constructor(private route: ActivatedRoute, private svc: BookService) {}
  ngOnInit(){
    const isbn = this.route.snapshot.paramMap.get('isbn')!;
    this.loading=true;
    this.svc.getBook(isbn).subscribe({
      next: b => { this.book = b; this.loading=false; },
      error: e => { console.error(e); this.loading=false; }
    });
  }
}
