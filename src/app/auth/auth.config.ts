  import { AuthConfig } from 'angular-oauth2-oidc';

  export const authConfig: AuthConfig = {
    issuer: 'http://localhost:8085/realms/library', // dein OIDC-Server
    redirectUri: window.location.origin,
    clientId: 'library-client-spa',
    responseType: 'code',
    scope: 'openid profile email',

    // nur für lokale Entwicklung!
    requireHttps: false,
    strictDiscoveryDocumentValidation: false,

    showDebugInformation: true,
    sessionChecksEnabled: true
  };
