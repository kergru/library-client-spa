## Sequence Diagram
```mermaid
sequenceDiagram
participant A as Angular SPA
participant F as Library Frontend Service
participant K as Keycloak
participant B as Library Backend Service

    rect rgb(240, 248, 255)
    note over A: 1. PKCE Flow - User Login
    A->>A: Generate code_verifier & code_challenge
    A->>K: GET /authorize
    note right of A: response_type=code
    note right of A: code_challenge=...
    note right of A: code_challenge_method=S256
    K-->>A: 302 Redirect to Login Page
    A->>K: POST /login (credentials)
    K-->>A: 302 Redirect with Authorization Code
    A->>K: POST /token
    note right of A: grant_type=authorization_code
    note right of A: code=...
    note right of A: code_verifier=...
    note right of A: redirect_uri=...
    K-->>A: ID Token + Access Token + Refresh Token
    end

    rect rgb(255, 240, 245)
    note over A,F: 2. Access Protected Resource
    A->>F: GET /api/resource
    note right of A: Authorization: Bearer <access_token>
    F->>K: GET /certs (JWKS)
    K-->>F: Public Key
    F->>F: Validate JWT Signature
    F->>B: Forward Request
    note right of F: Authorization: Bearer <access_token>
    B->>K: GET /certs (JWKS)
    K-->>B: Public Key
    B->>B: Validate JWT & Extract Roles
    B-->>F: 200 OK (Resource Data)
    F-->>A: 200 OK (Resource Data)
    end

    rect rgb(230, 255, 230)
    note over A: 3. Token Refresh Flow
    A->>K: POST /token
    note right of A: grant_type=refresh_token
    note right of A: refresh_token=...
    note right of A: client_id=...
    K-->>A: New Access Token + Refresh Token
    end
