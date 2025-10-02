export interface Book {
  isbn: string;
  title: string;
  author: string;
  publishedAt?: number;
  publisher?: string;
  language?: string;
  pages?: number;
  description?: string;
  loanStatus?: LoanStatusDto;
}

export interface LoanStatusDto {
  status: string;
  until?: string;
}
