export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8081/api',
  oidc: {
    issuer: 'http://localhost:8085/realms/library',
    clientId: 'library-frontend',
    redirectUri: window.location.origin + '/',
    responseType: 'code',
    scope: 'openid profile email',
    showDebugInformation: true
  }
};
