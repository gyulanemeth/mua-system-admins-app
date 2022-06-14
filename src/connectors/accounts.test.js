import {test, expect, describe, vi} from 'vitest'
import accounts from './accounts.js'
describe("test admin connectors", () => {
  const apiUrl = "https:/mua/accounts/"

  test("test list accounts", async () => {
  const fetch = vi.fn()
  fetch.mockResolvedValue({ ok: true, headers: { get: () => 'application/json' },
  json: () => Promise.resolve({ result: { items: [{_id:"123",name:"account1",urlFriendlyName:"accountFriendlyUrlName"}], count: 1 } }) })

  const res = await accounts(fetch, apiUrl).account.list();
  expect(res).toEqual( { items: [{_id:"123",name:"account1",urlFriendlyName:"accountFriendlyUrlName"}], count: 1 } )

  })
})
