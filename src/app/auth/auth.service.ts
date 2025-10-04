import { Injectable, signal, computed, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

export interface OidcClaims {
  sub: string;
  preferred_username?: string;
  email?: string;
  realm_access?: { roles: string[] };
  resource_access?: { [resource: string]: { roles: string[] } };
  [key: string]: unknown;
}

export interface User {
  username: string;
  email?: string;
  roles: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private oauth = inject(OAuthService);

  private _currentUser = signal<User | null>(null);
  readonly currentUser = this._currentUser.asReadonly();

  readonly isLoggedIn = computed(() => this.oauth.hasValidAccessToken());

  constructor() {
    this.oauth.configure(authConfig);
  }

  async initLoginFlow(): Promise<void> {
    try {
      const loggedIn = await this.oauth.loadDiscoveryDocumentAndLogin();

      if (loggedIn) {
        this.updateUserFromClaims();
      } else {
        this.oauth.initLoginFlow();
      }
    } catch (err) {
      console.error('OIDC-Login fehlgeschlagen', err);
      this.oauth.initLoginFlow();
    }

    this.oauth.events.subscribe(e => {
      if (e.type === 'token_received' || e.type === 'token_refreshed') {
        this.updateUserFromClaims();
      }
      if (e.type === 'logout') {
        this._currentUser.set(null);
      }
    });

    this.oauth.setupAutomaticSilentRefresh();

    if (this.oauth.hasValidAccessToken()) {
      this.updateUserFromClaims();
    }
  }

  logout(): void {
    this.oauth.logOut();
    this._currentUser.set(null);
  }

  getAccessToken(): string | null {
    return this.oauth.getAccessToken();
  }

  hasRole(role: string): boolean {
    return this._currentUser()?.roles.includes(role) ?? false;
  }

  private updateUserFromClaims(): void {
    const claims = this.oauth.getIdentityClaims() as OidcClaims | null;
    if (!claims) {
      this._currentUser.set(null);
      return;
    }

    const roles: string[] = [
      ...(claims.realm_access?.roles ?? []),
      ...Object.values(claims.resource_access ?? {}).flatMap(r => r.roles ?? [])
    ];

    const user: User = {
      username: claims.preferred_username ?? claims.sub,
      email: claims.email,
      roles
    };

    this._currentUser.set(user);
  }
}
