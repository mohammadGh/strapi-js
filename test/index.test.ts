import { describe, expect, it } from 'vitest'
import { StrapiContentSdk, StrapiUserSdk } from '../src'

describe('should', () => {
  it('exported', () => {
    expect(typeof StrapiContentSdk).toEqual('function')
    expect(typeof StrapiUserSdk).toEqual('function')
  })
})
