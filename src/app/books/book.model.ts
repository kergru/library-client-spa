export interface Book {
  isbn: string;
  title: string;
  author: string;
  publishedAt?: number;
  publisher?: string;
  language?: string;
  pages?: number;
  description?: string;
  loanStatus?: LoanStatus;
}

export interface LoanStatus {
  available: boolean;
}

export interface LoanStatusDto {
  status: string;
  until?: string;
}

export interface BookListState {
  loading: boolean;
  error: string | null;
  books: Book[];
}

export interface BookDetailState {
  loading: boolean;
  error: string | null;
  book: Book | null;
}
