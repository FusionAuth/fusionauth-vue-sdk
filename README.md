An SDK for using FusionAuth in Vue applications.

# Table of Contents

-   [Overview](#overview)

-   [Getting Started](#getting-started)

-   [Installation](#installation)

-   [Server Code Requirements](#server-code-requirements)

-   [Usage](#usage)

-   [Pre-built buttons](#pre-built-buttons)

-   [Service usage](#service-usage) 

-   [Documentation](#documentation)

-   [Quickstart](#quickstart)

-   [Releases](#releases)

<!--
this tag, and the corresponding end tag, are used to delineate what is pulled into the FusionAuth docs site (the client libraries pages). Don't remove unless you also change the docs site.

Please also use ``` instead of indenting for code blocks. The backticks are translated correctly to adoc format.
-->

# Overview

<!--
tag::forDocSite[]
-->

This SDK allows you to add login, logout, and registration buttons to
your Vue application. You can do this via pre-built buttons, or with
the FusionAuthService in your own components.

Your users will be sent to FusionAuth’s themeable hosted login pages and
then log in. After that, they are sent back to your Vue application.

Once authentication succeeds, the following secure, HTTP-only cookies
will be set:

-   `app.at` - an OAuth [Access
    Token](https://fusionauth.io/docs/v1/tech/oauth/tokens#access-token)

-   `app.rt` - a [Refresh
    Token](https://fusionauth.io/docs/v1/tech/oauth/tokens#refresh-token)
    used to obtain a new `app.at`. This cookie will only be set if
    refresh tokens are enabled on your FusionAuth instance.

The access token can be presented to APIs to authorize the request and
the refresh token can be used to get a new access token.

Note that this SDK requires you to have a server that performs the OAuth
token exchange. See [Server Code
Requirements](#server-code-requirements) for more details.

You can use this library against any version of FusionAuth or any OIDC
compliant identity server.

## Getting Started

### Installation

NPM:

```bash
npm install @fusionauth/vue-sdk
```

Yarn:

```bash
yarn add @fusionauth/vue-sdk
```

### Configuring the Vue SDK

To configure the SDK, initialize the `FusionAuthVuePlugin` when you init your Vue app:

```typescript
const app = createApp(App)

app.use(FusionAuthVuePlugin, {
  clientId: '',
  serverUrl: '',
  redirectUri: '',
});

app.mount('#app')
```

If you want to use the pre-styled buttons, don't forget to import the css file:

```typescript
import '@fusionauth/vue-sdk/dist/style.css';
```

<!-- this is pulled into docs and our link checker complains if we don't have the id tag here -->
<h2 id="server-code-requirements">Server Code Requirements</h2>

The FusionAuth Vue SDK was built against the [Hosted Backend API](https://fusionauth.io/docs/v1/tech/apis/hosted-backend), but can also be used with any server that will perform the OAuth token exchange. This server must have the following endpoints:

#### `GET /app/login`

This endpoint must:

1.  Generate PKCE code.
    a. The code verifier should be saved in a secure HTTP-only cookie.
    b. The code challenge is passed along
2.  Encode and save `redirect_url` from vue app to `state`.
3.  Redirect browser to `/oauth2/authorize` with a `redirect_uri` to `/app/token-exchange`

#### `GET /app/callback`

This endpoint must:

1.  Call
    [/oauth2/token](https://fusionauth.io/docs/v1/tech/oauth/endpoints#complete-the-authorization-code-grant-request)
    to complete the Authorization Code Grant request. The `code` comes from the request query parameter and
    `code_verifier` should be available in the secure HTTP-only cookie, while
    the rest of the parameters should be set/configured on the server
    side.

2.  Once the token exchange succeeds, read the `app.at` from the
    response body and set it as a secure, HTTP-only cookie with the same
    name.

3.  If you wish to support refresh tokens, repeat step 2 for the
    `app.rt` cookie.

4.  Save the expiration time in a readable `app.at_exp` cookie.  And save the `app.idt` id token in a readable cookie.

5.  Redirect browser back to encoded url saved in `state`.

4.  Call
    [/oauth2/userinfo](https://fusionauth.io/docs/v1/tech/oauth/endpoints#userinfo)
    to retrieve the user info object and respond back to the client with
    this object.

#### `GET /app/register`

This endpoint is similar to `/login`.  It must:

1.  Generate PKCE code.
    a. The code verifier should be saved in a secure HTTP-only cookie.
    b. The code challenge is passed along
2.  Encode and save `redirect_url` from vue app to `state`.
3.  Redirect browser to `/oauth2/register` with a `redirect_uri` to `/app/callback`

#### `GET /app/me`

This endpoint must:

1.  Use `app.at` from cookie and use as the Bearer token to call `/oauth2/userinfo`
2.  Return json data

#### `GET /app/logout`

This endpoint must:

1.  Clear the `app.at` and `app.rt` secure, HTTP-only
    cookies.
2.  Clear the `app.at_exp` and `app.idt` secure cookies.
3.  Redirect to `/oauth2/logout`

#### `POST /app/refresh` (optional)

This endpoint is necessary if you wish to use refresh tokens. This
endpoint must:

1.  Call
    [/oauth2/token](https://fusionauth.io/docs/v1/tech/oauth/endpoints#refresh-token-grant-request)
    to get a new `app.at` and `app.rt`.

2.  Update the `app.at`, `app.at_exp`, `app.idt`, and `app.rt` cookies from the
    response.

## Usage

### Pre-built buttons

There are three pre-styled buttons that are configured to perform
login/logout/registration. They can be placed anywhere in your app as
is.

```vue
<template>
  <FusionAuthLoginButton/>
  <FusionAuthLogoutButton/>
  <FusionAuthRegisterButton/>
</template>

<style>
  :root {
    --fusionauth-button-background-color: #096324;
    --fusionauth-button-text-color: #fff;
  }
</style>
```

With the CSS variables, you can customize the buttons to match your app’s style.

### Service usage

Alternatively, you may interact with the SDK Service by using the composable `useFusionAuth`.

```vue
<template>
  <button @click="fusionAuth.login">Login</button>
  <button @click="fusionAuth.logout">Logout</button>
  <button @click="fusionAuth.register">Register</button>
</template>

<script setup lang="ts">
  import {useFusionAuth} from "@fusionauth/vue-sdk";
  
  const fusionAuth = useFusionAuth();
</script>
```

#### State parameter

The `login` and `register` functions both accept an optional string
parameter called `state`. The login and register components can also be passed the
state as a prop. The state that is passed in to the function call will be echoed
back in the state query parameter of the callback uri specified in `redirectUri` on
the `FusionAuthConfig` used to initialize the `FusionAuthVuePlugin`. Though you may
pass any value you would like for the state parameter, it is often used to indicate
which page the user was on before redirecting to login or registration, so that the
user can be returned to that location after a successful authentication.

## Quickstart

See the [FusionAuth Vue Quickstart](https://fusionauth.io/docs/quickstarts/quickstart-javascript-vue-web) for more information.

## Documentation

[Full library
documentation](https://github.com/FusionAuth/fusionauth-vue-sdk/blob/main/docs/documentation.md)

<!--
end::forDocSite[]
-->

Use backticks for code in this readme. This readme is included on the fusionauth website, and backticks show the code in the best light there.

## Releases

To perform a release to NPM, create a release on GitHub. That will automatically publish a release to GitHub.
