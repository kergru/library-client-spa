import {Book} from "../books/book.model";

export interface User {
  firstName: string;
  lastName: string;
  userName: string;
  email?: string;
  loans?: Loan[];
}

export interface Loan {
  book: Book;
  borrowedAt: Date;
  returnedAt: Date;
}

export interface UserListState {
  loading: boolean;
  error: string | null;
  users: User[];
}

export interface UserDetailState {
  loading: boolean;
  error: string | null;
  user: User | null;
}
