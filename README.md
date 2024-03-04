# strapi-js

![Build](https://img.shields.io/github/actions/workflow/status/mohammadGh/strapi-js/ci.yml)
![package.json version (main branch)](https://img.shields.io/github/package-json/v/mohammadGh/strapi-js/main)
![npm](https://img.shields.io/npm/v/strapi-js)
![Codecov](https://img.shields.io/codecov/c/github/mohammadGh/strapi-js)

A nodejs/browser typescript/javascript sdk for Strapi headless CMS. You can use it to communicate with Strapi-CMS in client-side applications (such as a Vue.js SPA) or server-side applications (such as an SSR server like Nuxt or other NodeJs based applications).

# Features

- 📦 TypeScript & Fully Typed APIs
- ✔️ based on Ofetch and Works with Node.js / Browser / Edge
- ⚡️ Fast Build System [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild)
- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest) and high test coverage.

## 🚀 Quick Start

### Install:

```bash
# npm
npm i strapi-js

# yarn
yarn add strapi-js
```

### Import & Simple Usage:

```js
// ESM | Typescript
import { StrapiSdk } from 'strapi-js' // CommonJS: const { StrapiSdk } = require('strapi-js')

// Usage: obtain sdk-instance and use it to login and perform other functions
const config = { url: 'http://localhost:1337', prefix: 'api' } // the default configuration
const strapiSdk = StrapiSdk (config) // or if you doesn't provide config the sdk will be use the default configuration

const { user, jwt } = strapiSdk.users.login ({ identifier: 'username', password: 'pass' })
```
# Docs
## Users Sdk
`strapiSdk.users` contains these methods:
- `login`: login providing identifier (username or email) and password
- `getCurrentUser`: get user profile using the jwt-token received with `login` method
- `register`: register new user providing username, email and password
- `sendEmailConfirmation`: resend confirmation token using a registered email address
- `changePassword`: change logged in user's password providing jwt-token, current-password and new-password
- `forgotPassword`: request to reset the password using a registered email address
- `resetPassword`: set new password using token received with previous method
- `getProviderAuthenticationUrl`: not-implemented-yet
