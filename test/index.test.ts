import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { StrapiContentSdk, StrapiUserSdk } from '../src'
import { strapiMockServer as server } from './mocks/strapiMockServer'

describe('Sdk package exporting', () => {
  it('should export user-sdk as a function', () => {
    expect(typeof StrapiUserSdk).toEqual('function')
  })

  it('should export content-sdk as a function', () => {
    expect(typeof StrapiContentSdk).toEqual('function')
  })
})

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
