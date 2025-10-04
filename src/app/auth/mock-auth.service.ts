import { Injectable, signal, computed } from '@angular/core';

export interface User {
  username: string;
  email?: string;
  roles: string[];
}

@Injectable({ providedIn: 'root' })
export class MockAuthService {
  private _currentUser = signal<User | null>(null);
  currentUser = this._currentUser.asReadonly();

  login() {
    // Fake-Login mit Dummy-Daten
    const fakeUser: User = {
      username: 'testuser',
      email: 'test@example.com',
      roles: ['LIBRARIAN'] // Rolle ändern, um Admin-Rechte zu testen
    };
    this._currentUser.set(fakeUser);
  }

  logout() {
    this._currentUser.set(null);
  }

  isLoggedIn = computed(() => this._currentUser() !== null);

  hasRole(role: string): boolean {
    return this._currentUser()?.roles.includes(role) ?? false;
  }

  getAccessToken() {
    return 'fake-token-123';
  }
}
