import { createApp } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import { test, beforeEach, expect, describe } from 'vitest'

import RouteError from '../errors/RouteError.js'

import useAccountsStore from './accounts.js'

describe('accounts Store', () => {
  global.window = {
    config: {
      adminApiBaseUrl: 'http://admins-api.emailfox.link',
      accountsApiBaseUrl: 'http://accounts-api.emailfox.link'
    }
  }

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
    const mockCreateOne = async function (formData) {
      if (!formData || !formData.name || !formData.urlFriendlyName) {
        throw new RouteError('FormData Name And UrlFriendlyName Is Required')
      }
      return { name: 'accountExampleNew', urlFriendlyName: 'urlFriendlyNameNew', _id: '112test112' }
    }
    const mockUploadLogo = async function (params, formData) {
      if (!params || !params.id || !formData) {
        throw new RouteError('param and form Data Is Required')
      }
      return { success: true }
    }
    return {
      account: { list: mockList, createOne: mockCreateOne, uploadLogo: mockUploadLogo }
    }
  }

  beforeEach(() => {
    const pinia = createPinia().use(useAccountsStore)
    app.use(pinia)
    setActivePinia(createPinia())
  })

  test('test success List', async () => {
    const accountStore = useAccountsStore(mokeConnector())
    const store = accountStore()
    await store.loadPage(1)
    expect(store.count).toEqual(3)
  })

  test('test success createOne', async () => {
    const accountStore = useAccountsStore(mokeConnector())
    const store = accountStore()
    const res = await store.createOne({ name: 'testName', urlFriendlyName: 'testurlFriendlyName', logo: { test: 'success' } })
    expect(res).toEqual('success')
  })

  test('test createOne params error', async () => {
    const accountStore = useAccountsStore(mokeConnector())
    const store = accountStore()
    const res = await store.createOne({})
    expect(res.message).toEqual('FormData Name And UrlFriendlyName Is Required')
  })
})
