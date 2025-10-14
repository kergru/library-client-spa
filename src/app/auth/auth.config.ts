  import { AuthConfig } from 'angular-oauth2-oidc';

  export const authConfig: AuthConfig = {
    issuer: 'http://localhost:8085/realms/library',
    redirectUri: window.location.origin,
    clientId: 'library-client-spa',
    disablePKCE: false, // PKCE is required for SPAs
    responseType: 'code',
    scope: 'openid profile email',

    // nur für lokale Entwicklung!
    requireHttps: false,
    strictDiscoveryDocumentValidation: false,

    showDebugInformation: true,
    sessionChecksEnabled: true
  };
