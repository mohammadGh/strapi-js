import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { newStrapiSdk } from '../src'
import type { StrapiErrorResponse } from '../src/lib/types'
import { strapiDefaultConfig } from '../src/lib/config'
import { getStrapiAuthMockServer } from './mocks/strapiMockServer'

const server = getStrapiAuthMockServer(strapiDefaultConfig)
const strapiSdk = newStrapiSdk(strapiDefaultConfig)

describe('auth-sdk package exporting', () => {
  it('should export auth-sdk as a function with correct objects and methods', () => {
    expect(typeof strapiSdk.auth).toEqual('object')
    expect(Object.getOwnPropertyNames (strapiSdk.auth).sort()).toEqual([
      'changePassword',
      'emailConfirmation',
      'forgotPassword',
      'localRegister',
      'login',
      'resetPassword',
      'sendEmailConfirmation',
      'utilGetCurrentUser',
    ])
  })
})

describe('users-sdk package exporting', () => {
  it('should export users-sdk as a function with correct objects and methods', () => {
    expect(typeof strapiSdk.users).toEqual('object')
    expect(Object.getOwnPropertyNames (strapiSdk.users).sort()).toEqual([
      'deleteUserById',
      'getUserById',
      'getUsers',
      'me',
      'updateUserById',
    ])
  })
})

describe('auth-sdk login method', () => {
  it('should throwing bad request without setting identifier or password parameter', async () => {
    try {
      const param: any = { password: 'a-password' }
      await strapiSdk.auth.login(param)
    }
    catch (err: any) {
      const strapiError: StrapiErrorResponse = err
      expect(strapiError.status).toEqual(400)
      expect(strapiError.message).toEqual('identifier is a required field')
    }
  })

  it('should throwing invalid identifier or password with wrong password', async () => {
    try {
      await strapiSdk.auth.login({
        identifier: 'valid-user',
        password: 'invalid-password',
      })
    }
    catch (err: any) {
      const strapiError: StrapiErrorResponse = err
      expect(strapiError.status).toEqual(400)
      expect(strapiError.message).toEqual('Invalid identifier or password')
    }
  })

  it('should successfully logged in with correct credentials', async () => {
    const { user, jwt } = await strapiSdk.auth.login({
      identifier: 'valid-user',
      password: 'valid-password',
    })
    expect(user).toBeTruthy()
    expect(jwt).toBeTruthy()
  })
})

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
