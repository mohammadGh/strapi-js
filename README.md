# strapi-js

![Build](https://img.shields.io/github/actions/workflow/status/mohammadGh/strapi-js/build-typecheck-test.yml)
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
// CommonJS: const { StrapiSdk } = require('strapi-js')
import { StrapiSdk } from 'strapi-js'

// Usage: 1) provide config (the default configuration)
const config = {
  url: 'http://localhost:1337/',
  prefix: '/api',
  version: 'v4',
  logType: 'auto',
  retry: 0, // Number of retries for requests that have encountered an error
}

// Usage: 2) obtain sdk instance
const strapi = StrapiSdk (config)

// Usage: 3) use it
const { user, jwt } = strapi.auth.login ({
  identifier: 'mgh@gmail.com',
  password: 'pass123'
})
strapi.auth.changePassword({
  currentPassword: 'pass123',
  password: 'pass123456',
  passwordConfirmation: 'pass123456'
})
```
# Docs
## Users Sdk
This sdk i.e. `StrapiSdk.auth` contains APIs of Strapi related to path **`/auth`**:
- `login`: Login into strapi providing identifier (username/email) and password
- `register`: Register new user providing username, email and password
- `emailConfirmation`: Confirm user's account with confirmation code
- `sendEmailConfirmation`: Resend email confirmation token to registered user
- `changePassword`: Change user's password providing jwt-token, current-password and new-password
- `forgotPassword`: Request to reset the password using a registered email address
- `resetPassword`: Set new password using a code received with email
- `currentUser`: Get user information using the jwt-token
