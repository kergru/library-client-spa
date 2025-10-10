import {Book} from "../books/book.model";
import {PageResponse} from "../page/page.model";

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
  page: PageResponse<User> | null;
}

export interface UserDetailState {
  loading: boolean;
  error: string | null;
  user: User | null;
}
