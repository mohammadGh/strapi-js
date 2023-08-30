import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { StrapiContentSdk, StrapiUserSdk } from '../src'
import { strapiMockServer as server } from './mocks/strapiMockServer'

describe('should', () => {
  it('exported', () => {
    expect(typeof StrapiContentSdk).toEqual('function')
    expect(typeof StrapiUserSdk).toEqual('function')
  })
})

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())