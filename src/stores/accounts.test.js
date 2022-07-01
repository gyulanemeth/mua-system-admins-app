import { createApp } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import { test, beforeEach, expect, describe } from 'vitest'

import accountsStore from './accounts.js'

describe('accounts Store', () => {
  const app = createApp({})

  const mokeConnector = () => {
    const mockList = () => {
      return {
        items: [
          { name: 'accountExample1', urlFriendlyName: 'urlFriendlyName1', _id: '12test12' },
          { name: 'accountExample2', urlFriendlyName: 'urlFriendlyName2', _id: '13test13' },
          { name: 'accountExample3', urlFriendlyName: 'urlFriendlyName3', _id: '14test14' }

        ],
        count: 3
      }
    }

    return {
      account: { list: mockList }
    }
  }

  beforeEach(() => {
    const pinia = createPinia().use(accountsStore)
    app.use(pinia)
    setActivePinia(createPinia())
  })

  test('test success List', async () => {
    const accountStore = accountsStore(mokeConnector())
    const store = accountStore()
    await store.load()
    expect(store.count).toEqual(3)
  })
})
