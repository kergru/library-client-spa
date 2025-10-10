import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, switchMap, debounceTime, distinctUntilChanged } from 'rxjs';
import { UsersService } from '../users.service';

interface UserSearchParams {
  search: string;
  page: number;
  size: number;
  sortBy: string;
}

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './users-list.component.html'
})
export class UsersListComponent {
  private usersService = inject(UsersService);

  private params$ = new BehaviorSubject<UserSearchParams>({
    search: '',
    page: 0,
    size: 10,
    sortBy: 'userName'
  });

  state$ = this.params$.pipe(
    debounceTime(300),
    distinctUntilChanged(
      (a, b) =>
        a.search === b.search &&
        a.page === b.page &&
        a.size === b.size &&
        a.sortBy === b.sortBy
    ),
    switchMap(params =>
      this.usersService.getUsers(params.search, params.page, params.size, params.sortBy)
    )
  );

  searchTerm = '';

  onSearch() {
    this.params$.next({
      ...this.params$.value,
      search: this.searchTerm,
      page: 0
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
