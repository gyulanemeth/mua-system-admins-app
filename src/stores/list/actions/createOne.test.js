import { describe, expect, test } from 'vitest'

import createOne from './createOne.js'

describe('createOne', () => {
  test('true', () => {
    createOne()
    expect(true).toBe(true)
  })
})
