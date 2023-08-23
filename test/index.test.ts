import { describe, expect, it } from 'vitest'
import { one, two } from '../src/index'

describe('should', () => {
  it('exported', () => {
    expect(one).toEqual(1)
    expect(two).toEqual(2)
  })
})
