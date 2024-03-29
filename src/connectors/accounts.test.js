import { test, expect, describe, vi } from 'vitest'

import accounts from './accounts.js'

describe('test admin connectors', () => {
  global.localStorage = {
    data: {},
    getItem (key) {
      return this.data[key]
    },
    setItem (key, value) {
      this.data[key] = value
    },
    removeItem (key) {
      delete this.data[key]
    }
  }

  global.window = {
    config: {
      adminApiBaseUrl: 'http://admins-api.emailfox.link',
      accountsApiBaseUrl: 'http://accounts-api.emailfox.link'
    }
  }

  global.FormData = class FormData {
    constructor () {
      this.entries = []
    }

    append (key, value) {
      this.entries.push([key, value])
    }
  }

  const apiUrl = 'https:/mua/accounts'

  test('test list accounts', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { items: [{ _id: '123', name: 'account1', urlFriendlyName: 'accountFriendlyUrlName' }], count: 1 } })
    })

    const spy = vi.spyOn(fetch, 'impl')
    const res = await accounts(fetch, apiUrl).account.list()

    expect(spy).toHaveBeenLastCalledWith(
      'https:/mua/accounts/v1/accounts',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })

    expect(res).toEqual({ items: [{ _id: '123', name: 'account1', urlFriendlyName: 'accountFriendlyUrlName' }], count: 1 })
  })

  test('test createOne account', async () => { // admin
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { success: true } })
    })

    const spy = vi.spyOn(fetch, 'impl')
    const res = await accounts(fetch, apiUrl).account.createOne({ name: 'AccountName', urlFriendlyName: 'updateUrlFriendlyName' })

    expect(spy).toHaveBeenLastCalledWith(
      'https:/mua/accounts/v1/accounts',
      {
        method: 'POST',
        body: JSON.stringify({ name: 'AccountName', urlFriendlyName: 'updateUrlFriendlyName' }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })
    expect(res).toEqual({ success: true })
  })

  test('test createOne with undefined input ', async () => { // admin
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { success: true } })
    })
    await expect(accounts(fetch, apiUrl).account.createOne()).rejects.toThrowError('Name And UrlFriendlyName Is Required')
  })

  test('test upload account logo ', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { success: true } })
    })

    const formData = new FormData()
    formData.append('logo', { test: 'test' })

    const spy = vi.spyOn(fetch, 'impl')
    const res = await accounts(fetch, apiUrl).account.uploadLogo({ id: '123test123' }, { test: 'test' })

    expect(spy).toHaveBeenLastCalledWith(
      'https:/mua/accounts/v1/accounts/123test123/logo/',
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })
    expect(res).toEqual({ success: true })
  })

  test('test upload with undefined input ', async () => { // admin
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { success: true } })
    })
    await expect(accounts(fetch, apiUrl).account.uploadLogo()).rejects.toThrowError('param and form Data Is Required')
  })
})
