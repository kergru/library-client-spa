# Angular SPA Library Client - Example OAuth2 Authorization Code Flow

This is a simple example of an Angular SPA that uses the OAuth2 Authorization Code Flow with PKCE to authenticate with a Keycloak server.


## Architecture / Flow Diagram

```mermaid
flowchart BT
    subgraph SPA["🧭 Angular SPA – library-client-spa"]
        SPA1["Login via OIDC + PKCE"]
        SPA2["Store Access Token"]
        SPA3["Call REST APIs on library-frontend"]
        SPA4["Request User Info from OIDC Endpoint"]
    end

    subgraph FRONTEND["💻 library-frontend (Reactive Resource Server + Gateway)"]
        FE1["Validate JWT"]
        FE2["Forward Request to library-backend (Bearer Token)"]
        FE3["Return JSON to SPA"]
        FE4["Request User Info from OIDC Endpoint"]
    end

    subgraph BACKEND["⚙️ library-backend (Reactive Resource Server)"]
        BE1["Validate JWT via JWKS"]
        BE2["Perform Business Logic"]
        BE3["Return JSON"]
    end

    subgraph AUTH["🛡️ Keycloak (Authorization Server)"]
        AS1["/authorize + /token"]
        AS2["JWKS Endpoint"]
        AS3["/userinfo (User Info Endpoint)"]
    end

    SPA -->|"Authorization Code"| AUTH
    SPA -->|"Bearer Token"| FRONTEND
    FRONTEND -->|"Bearer Token"| BACKEND
    FRONTEND -->|"Validate JWT via JWKS"| AUTH
    FRONTEND -->|"Request User Info"| AUTH
    BACKEND -->|"Validate via JWKS"| AUTH
    BACKEND -->|"JSON"| FRONTEND
    FRONTEND -->|"JSON"| SPA
    SPA -->|"User Info"| AUTH

```
