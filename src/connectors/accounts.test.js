import { test, expect, describe, vi } from 'vitest'
import accounts from './accounts.js'
describe('test admin connectors', () => {
  // const apiUrl = 'https:/mua/accounts/'

  test('test list accounts', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { items: [{ _id: '123', name: 'account1', urlFriendlyName: 'accountFriendlyUrlName' }], count: 1 } })
    })

    const spy = vi.spyOn(fetch, 'impl')
    const res = await accounts(fetch, 'https:/mua/accounts').account.list()

    expect(spy).toHaveBeenLastCalledWith(
      'https:/mua/accounts/v1/accounts',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer  ' + localStorage.getItem('accessToken')
        }
      })

    expect(res).toEqual({ items: [{ _id: '123', name: 'account1', urlFriendlyName: 'accountFriendlyUrlName' }], count: 1 })
  })
})
