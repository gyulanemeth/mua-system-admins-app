import {test, expect, describe, vi} from 'vitest'
import admin from './admin.js'
describe("test admin connectors", () => {
  const apiUrl = "https:/mua/admin/"

  test("test list admins", async () => {
  const fetch = vi.fn()
  fetch.mockResolvedValue({ ok: true, headers: { get: () => 'application/json' },
  json: () => Promise.resolve({ result: { items: [{_id:"123",name:"user1",email:"user1@gamil.com"}], count: 1 } }) })

  const res = await admin(fetch, apiUrl).admins.list();
  expect(res).toEqual({ items:  [{_id:"123",name:"user1",email:"user1@gamil.com"}], count: 1 })

  })

  test("test readOne admin", async () => {
  const fetch = vi.fn()
  fetch.mockResolvedValue({ ok: true, headers: { get: () => 'application/json' },
  json: () => Promise.resolve({ result: {_id:"123",name:"user1",email:"user1@gamil.com"} }) })

  const res = await admin(fetch, apiUrl).admins.readOne({id:"123"});
  expect(res).toEqual({_id:"123",name:"user1",email:"user1@gamil.com"})

  })


  test("test getAccessToken admin", async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({ ok: true, headers: { get: () => 'application/json' },
    json: () => Promise.resolve({ result: {accessToken: "accessToken"} })})

    const res = await admin(fetch, apiUrl).admins.getAccessToken({id:"123"});
    expect(res).toEqual({accessToken: "accessToken"})

  })

  test("test delete admin", async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({ ok: true, headers: { get: () => 'application/json' },
    json: () => Promise.resolve({ result: { _id: "123" , name: "user1", email: "user1@gamil.com" } }) })

    const res = await admin(fetch, apiUrl).admins.deleteOne({id: "123"});
    expect(res).toEqual({ _id: "123" , name: "user1", email: "user1@gamil.com" })

  })

  test("test patchName admin", async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({ ok: true, headers: { get: () => 'application/json' },
    json: () => Promise.resolve({ result: {success: true} }) })

    const res = await admin(fetch, apiUrl).admins.patchName({id:"123", name:"newUserName"});
    expect(res).toEqual({success: true})

  })

  test("test patchPassword admin", async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({ ok: true, headers: { get: () => 'application/json' },
    json: () => Promise.resolve({ result: { success: true }})})

    const res = await admin(fetch, apiUrl).admins.patchPassword({id:"123", newPassword:"newPassword", newPasswordAgain:"newPassword"});
    expect(res).toEqual({success: true})

  })

  test("test login admin", async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({ ok: true, headers: { get: () => 'application/json' },
    json: () => Promise.resolve({ result: { loginToken: "accessToken" }})})

    const res = await admin(fetch, apiUrl).admins.login({email:"user1@gmail.com", password:"user1Password"});
    expect(res).toEqual({ loginToken: "accessToken" })

  })
  test("test sendInvitation admin", async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({ ok: true, headers: { get: () => 'application/json' },
    json: () => Promise.resolve({ result: { success: true }})})

    const res = await admin(fetch, apiUrl).invitation.send({email:"newUser@gmail.com"});
    expect(res).toEqual({success: true})

  })

  test("test accept invitation admin", async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({ ok: true, headers: { get: () => 'application/json' },
    json: () => Promise.resolve({ result: { loginToken: "accessToken" }})})

    const res = await admin(fetch, apiUrl).invitation.accept({newPassword:"newPassword", newPasswordAgain:"newPassword"});
    expect(res).toEqual({loginToken: "accessToken"})

  })

  test("test forgotPassword send admin", async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({ ok: true, headers: { get: () => 'application/json' },
    json: () => Promise.resolve({ result: { success: true }})})

    const res = await admin(fetch, apiUrl).forgotPassword.send({email:"user1@gmail.com"});
    expect(res).toEqual({success: true})

  })

  test("test forgotPassword reset admin", async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({ ok: true, headers: { get: () => 'application/json' },
    json: () => Promise.resolve({ result: { loginToken: "accessToken" }})})

    const res = await admin(fetch, apiUrl).forgotPassword.reset({password:"newPassword", passwordAgain:"newPassword"});
    expect(res).toEqual({loginToken: "accessToken"})

  })

  test("test forgotPassword reset admin", async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({ ok: true, headers: { get: () => 'application/json' },
    json: () => Promise.resolve({ result: { accountsApiUrl: "accountsApiUrl", accountsAppUrl: "accountsAppUrl", appUrl: "appUrl" }})})

    const res = await admin(fetch, apiUrl).config.getConfig();
    expect(res).toEqual({ accountsApiUrl: "accountsApiUrl", accountsAppUrl: "accountsAppUrl", appUrl: "appUrl" })

  })
})
