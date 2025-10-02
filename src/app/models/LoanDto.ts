import { BookDto } from './BookDto';

export interface LoanDto {
  book: BookDto;
  borrowedAt: string;   // Java Instant → ISO-String
  returnedAt: string | null;
}
