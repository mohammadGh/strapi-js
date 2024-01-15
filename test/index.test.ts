import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { StrapiContentSdk, StrapiSdk, StrapiUserSdk } from '../src'
import type { StrapiErrorResponse } from '../src/lib/types'
import { strapiDefaultConfigs } from '../src/lib/getStrapiFetcher'
import { getStrapiMockServer } from './mocks/strapiMockServer'

const server = getStrapiMockServer(strapiDefaultConfigs)
const strapiSdk = StrapiSdk(strapiDefaultConfigs)

describe('Sdk package exporting', () => {
  it('should export user-sdk as a function with correct methods', () => {
    expect(typeof StrapiUserSdk).toEqual('function')
    expect(Object.getOwnPropertyNames (strapiSdk.users).sort()).toEqual([
      'authenticateProvider',
      'changePassword',
      'confirmAccount',
      'forgotPassword',
      'getCurrentUser',
      'getProviderAuthenticationUrl',
      'login',
      'register',
      'resetPassword',
      'sendEmailConfirmation',
    ])
  })

  it('should export content-sdk as a function', () => {
    expect(typeof StrapiContentSdk).toEqual('function')
  })
})

describe('user-sdk login method', () => {
  it('should throwing bad request without setting identifier or password parameter', async () => {
    try {
      const param: any = { password: 'a-password' }
      await strapiSdk.users.login(param)
    }
    catch (err: any) {
      const strapiError: StrapiErrorResponse = err
      expect(strapiError.status).toEqual(400)
      expect(strapiError.message).toEqual('identifier is a required field')
    }
  })

  it('should throwing invalid identifier or password with wrong password', async () => {
    try {
      await strapiSdk.users.login({
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
    const { user, jwt } = await strapiSdk.users.login({
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
