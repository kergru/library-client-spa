import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private authConfig: AuthConfig = {
    issuer: environment.oidc.issuer,
    clientId: environment.oidc.clientId,
    redirectUri: environment.oidc.redirectUri,
    responseType: environment.oidc.responseType,
    scope: environment.oidc.scope,
    showDebugInformation: environment.oidc.showDebugInformation
  };

  constructor(private oauth: OAuthService) {
    this.oauth.configure(this.authConfig);
    this.oauth.loadDiscoveryDocumentAndTryLogin();
  }

  login() { this.oauth.initLoginFlow(); }
  logout() { this.oauth.logOut(); }

  isLoggedIn(): boolean { return this.oauth.hasValidAccessToken(); }

  getAccessToken() { return this.oauth.getAccessToken(); }

  hasRole(role: string): boolean {
    const claims: any = this.oauth.getIdentityClaims() || {};
    const realmRoles = claims['realm_access']?.roles || [];
    if (realmRoles.includes(role)) return true;
    const resourceAccess = claims['resource_access'] || {};
    for (const k of Object.keys(resourceAccess || {})) {
      if (resourceAccess[k]?.roles?.includes(role)) return true;
    }
    return false;
  }
}
