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

# pnpm
pnpm add strapi-js

# yarn
yarn add strapi-js
```

### Import & Simple Usage:

```js
import { newStrapiSdk } from 'strapi-js'
// CommonJS: const { newStrapiSdk } = require('strapi-js')

// Usage: 1) provide config (the default configuration)
const config = {
  url: 'http://localhost:1337/',
  prefix: '/api',
  version: 'v4',
  logType: 'auto',
  retry: 0, // Number of auto retries for requests that have encountered an error
}

// Usage: 2) obtain sdk instance
const sdk = newStrapiSdk (config)

// Usage: 3) use it
const { user, jwt } = sdk.auth.login ({
  identifier: 'mgh@gmail.com',
  password: 'pass123'
})

sdk.auth.changePassword({
  currentPassword: 'pass123',
  password: 'pass123456',
  passwordConfirmation: 'pass123456'
})
```

# Docs
## Auth Sdk
This sdk i.e. **`sdk.auth`** contains APIs of Strapi related to path **`/api/auth`** for login, register, change-pass etc:
- `login`: login into strapi providing identifier (username/email) and password
- `register`: registers new user providing username, email and password
- `emailConfirmation`: confirms user's account with confirmation code
- `sendEmailConfirmation`: resends the activation email
- `changePassword`: changes user's password providing jwt-token, current-password and new-password
- `forgotPassword`: initiates a password reset request for a user's account using a registered email address
- `resetPassword`: sets new password using a code received with email
- `utilGetCurrentUser`: a utility function to get logged-in user info using the jwt-token (equal to `sdk.users.me()`)

## Users Sdk
This sdk i.e. **`sdk.users`** contains APIs of Strapi related to path **`/api/users`** for getting and setting users:
- `me`: gets logged-in user's info using the jwt-token
- `getUsers`: gets a list of registered users
- `getUserById`: gets user's data by user's id
- `updateUserById`: updates user's data by user's id
- `deleteUserById`: deletes a user by user's id

## Upload Sdk
This sdk i.e. **`sdk.upload`** contains APIs of Strapi related to path **`/api/upload`** for working with files/media:
- `upload`: uploads a file and simultaneously links it to a field in an entity
- `getFiles`: gets a list of uploaded files
- `getFileById`: gets details of a file using the file's id
- `deleteFileById`: deletes a file using the file's id

## Content Sdk (Collection Type)
This sdk i.e. **`sdk.content`** contains APIs of Strapi related to path **`/api/:pluralApiId`** and **`/api/:pluralApiId/:documentId`** for working with collection type:
- `find`: gets a list of entries stored in this `pluralApiId`.
- `create`: creates a new entry.
- `fineOne`: gets details of an entry using the entry's id
- `update`: updates details of an entry using the entry's id
- `deleteFileById`: deletes an entry using the entry's id
