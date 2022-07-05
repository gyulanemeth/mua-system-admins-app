import { test, beforeEach, expect, describe, vi } from 'vitest'

import admin from './admin.js'

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

  const apiUrl = 'https:/mua/admin'
  beforeEach(async () => {
    localStorage.setItem('accessToken', 'Token')
  })

  test('test list admins', async () => {
    const fetch = vi.fn()

    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { items: [{ _id: '123', name: 'user1', email: 'user1@gamil.com' }], count: 1 } })
    })

    const spy = vi.spyOn(fetch, 'impl')
    const res = await admin(fetch, apiUrl).admins.list()

    expect(spy).toHaveBeenLastCalledWith(
      'https:/mua/admin/v1/admins',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })

    expect(res).toEqual({ items: [{ _id: '123', name: 'user1', email: 'user1@gamil.com' }], count: 1 })
  })

  test('test list admins with query', async () => {
    const fetch = vi.fn()

    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { items: [{ _id: '123', name: 'user1', email: 'user1@gamil.com' }], count: 1 } })
    })

    const spy = vi.spyOn(fetch, 'impl')
    const res = await admin(fetch, apiUrl).admins.list({}, { $text: { $search: 'user1' } })

    expect(spy).toHaveBeenLastCalledWith(
      'https:/mua/admin/v1/admins?$text[$search]=user1',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })

    expect(res).toEqual({ items: [{ _id: '123', name: 'user1', email: 'user1@gamil.com' }], count: 1 })
  })

  test('test readOne admin', async () => {
    const fetch = vi.fn()

    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { _id: '123', name: 'user1', email: 'user1@gamil.com' } })
    })

    const spy = vi.spyOn(fetch, 'impl')
    const res = await admin(fetch, apiUrl).admins.readOne({ id: '123' })

    expect(spy).toHaveBeenLastCalledWith(
      'https:/mua/admin/v1/admins/123',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })
    expect(res).toEqual({ _id: '123', name: 'user1', email: 'user1@gamil.com' })
  })

  test('test readOne admin Error no Id', async () => {
    const fetch = vi.fn()

    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { _id: '123', name: 'user1', email: 'user1@gamil.com' } })
    })

    await expect(admin(fetch, apiUrl).admins.readOne()).rejects.toThrowError('Admin ID Is Required')
  })

  test('test getAccessToken admin', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { accessToken: 'Token' } })
    })

    const spy = vi.spyOn(fetch, 'impl')
    const res = await admin(fetch, apiUrl).admins.getAccessToken({ id: '123' })

    expect(spy).toHaveBeenLastCalledWith(
      'https:/mua/admin/v1/admins/123/access-token',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })
    expect(res).toEqual({ accessToken: 'Token' })
  })

  test('test getAccessToken admin id Error', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { accessToken: 'Token' } })
    })

    await expect(admin(fetch, apiUrl).admins.getAccessToken()).rejects.toThrowError('Admin ID Is Required')
  })

  test('test delete admin', async () => {
    const fetch = vi.fn()

    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { _id: '123', name: 'user1', email: 'user1@gamil.com' } })
    })

    const spy = vi.spyOn(fetch, 'impl')
    const res = await admin(fetch, apiUrl).admins.deleteOne({ id: '123' })

    expect(spy).toHaveBeenLastCalledWith(
      'https:/mua/admin/v1/admins/123',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })

    expect(res).toEqual({ _id: '123', name: 'user1', email: 'user1@gamil.com' })
  })

  test('test delete without id admin', async () => {
    const fetch = vi.fn()

    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { id: '123', name: 'user1', email: 'user1@gamil.com' } })
    })

    await expect(admin(fetch, apiUrl).admins.deleteOne()).rejects.toThrowError('Admin ID Is Required')
  })

  test('test patchName admin', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { success: true } })
    })

    const spy = vi.spyOn(fetch, 'impl')
    const res = await admin(fetch, apiUrl).admins.patchName({ id: '123', name: 'newUserName' })

    expect(spy).toHaveBeenLastCalledWith(
      'https:/mua/admin/v1/admins/123/name',
      {
        method: 'PATCH',
        body: JSON.stringify({ name: 'newUserName' }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })
    expect(res).toEqual({ success: true })
  })

  test('test patchName with undefined input admin', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { success: true } })
    })

    await expect(admin(fetch, apiUrl).admins.patchName({ id: '123' })).rejects.toThrowError('Admin ID And New Name Is Required')
  })

  test('test patchPassword admin', async () => {
    const fetch = vi.fn()

    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { success: true } })
    })

    const spy = vi.spyOn(fetch, 'impl')
    const res = await admin(fetch, apiUrl).admins.patchPassword({ id: '123', oldPassword: 'oldPassword', newPassword: 'newPassword', newPasswordAgain: 'newPassword' })
    expect(spy).toHaveBeenLastCalledWith(
      'https:/mua/admin/v1/admins/123/password',
      {
        method: 'PATCH',
        body: JSON.stringify({ oldPassword: 'oldPassword', newPassword: 'newPassword', newPasswordAgain: 'newPassword' }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })
    expect(res).toEqual({ success: true })
  })

  test('test patchPassword with undefined input admin', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { success: true } })
    })

    await expect(admin(fetch, apiUrl).admins.patchPassword({ id: '123', newPasswordAgain: 'newPassword' })).rejects.toThrowError('Admin ID And New Password Is Required')
  })

  test('test login admin', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { loginToken: 'Token' } })
    })

    const spy = vi.spyOn(fetch, 'impl')
    const res = await admin(fetch, apiUrl).admins.login({ email: 'user1@gmail.com', password: 'user1Password' })
    expect(spy).toHaveBeenLastCalledWith(
      'https:/mua/admin/v1/login',
      {
        method: 'POST',
        body: JSON.stringify({ email: 'user1@gmail.com', password: 'user1Password' }),
        headers: { 'Content-Type': 'application/json' }
      })
    expect(res).toEqual('Token')
  })

  test('test login with undefined input admin', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { loginToken: 'Token' } })
    })

    await expect(admin(fetch, apiUrl).admins.login()).rejects.toThrowError('Admin Email And Password Is Required')
  })

  test('test sendInvitation admin', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { success: true } })
    })

    const spy = vi.spyOn(fetch, 'impl')
    const res = await admin(fetch, apiUrl).invitation.send({ email: 'newUser@gmail.com' })
    expect(spy).toHaveBeenLastCalledWith(
      'https:/mua/admin/v1/invitation/send',
      {
        method: 'POST',
        body: JSON.stringify({ email: 'newUser@gmail.com' }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })
    expect(res).toEqual({ success: true })
  })

  test('test sendInvitation undefined input admin', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { success: true } })
    })

    await expect(admin(fetch, apiUrl).invitation.send()).rejects.toThrowError('Email Is Required')
  })

  test('test accept invitation admin', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { loginToken: 'Token' } })
    })

    const spy = vi.spyOn(fetch, 'impl')
    const res = await admin(fetch, apiUrl).invitation.accept({ token: 'token', newPassword: 'newPassword', newPasswordAgain: 'newPassword' })
    expect(spy).toHaveBeenLastCalledWith(
      'https:/mua/admin/v1/invitation/accept',
      {
        method: 'POST',
        body: JSON.stringify({ newPassword: 'newPassword', newPasswordAgain: 'newPassword' }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })
    expect(res).toEqual({ loginToken: 'Token' })
  })

  test('test accept invitation without password admin', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { loginToken: 'Token' } })
    })

    await expect(admin(fetch, apiUrl).invitation.accept()).rejects.toThrowError('Admin Password Is Required')
  })

  test('test forgotPassword send admin', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { success: true } })
    })

    const spy = vi.spyOn(fetch, 'impl')
    const res = await admin(fetch, apiUrl).forgotPassword.send({ email: 'user1@gmail.com' })
    expect(spy).toHaveBeenLastCalledWith(
      'https:/mua/admin/v1/forgot-password/send',
      {
        method: 'POST',
        body: JSON.stringify({ email: 'user1@gmail.com' }),
        headers: { 'Content-Type': 'application/json' }
      })
    expect(res).toEqual({ success: true })
  })

  test('test forgotPassword send without email admin', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { success: true } })
    })

    await expect(admin(fetch, apiUrl).forgotPassword.send()).rejects.toThrowError('Email Is Required')
  })

  test('test forgotPassword reset admin', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { loginToken: 'Token' } })
    })

    const spy = vi.spyOn(fetch, 'impl')
    const res = await admin(fetch, apiUrl).forgotPassword.reset({ token: 'token', newPassword: 'newPassword', newPasswordAgain: 'newPassword' })
    expect(spy).toHaveBeenLastCalledWith(
      'https:/mua/admin/v1/forgot-password/reset',
      {
        method: 'POST',
        body: JSON.stringify({ newPassword: 'newPassword', newPasswordAgain: 'newPassword' }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })
    expect(res).toEqual({ loginToken: 'Token' })
  })

  test('test forgotPassword reset with undefined input admin', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { loginToken: 'Token' } })
    })

    await expect(admin(fetch, apiUrl).forgotPassword.reset()).rejects.toThrowError('Admin Password Is Required')
  })

  test('test getConfig admin', async () => {
    const fetch = vi.fn()
    fetch.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({ result: { accountsApiUrl: 'accountsApiUrl', accountsAppUrl: 'accountsAppUrl', appUrl: 'appUrl' } })
    })

    const spy = vi.spyOn(fetch, 'impl')
    const res = await admin(fetch, apiUrl).config.getConfig()
    expect(spy).toHaveBeenLastCalledWith(
      'https:/mua/admin/v1/config',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
    expect(res).toEqual({ accountsApiUrl: 'accountsApiUrl', accountsAppUrl: 'accountsAppUrl', appUrl: 'appUrl' })
  })
})
