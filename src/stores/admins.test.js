import { createApp } from 'vue'
import { setActivePinia, createPinia } from 'pinia'
import { test, beforeEach, expect, describe } from 'vitest'

import useAdminsStore from './admins.js'
import RouteError from '../errors/RouteError.js'

describe('admins Store', () => {
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
          { name: 'user1', email: 'user1@gmail.com', _id: '12test12' },
          { name: 'user2', email: 'user2@gmail.com', _id: '13test13' },
          { name: 'user3', email: 'user3@gmail.com', _id: '14test14' },
          { name: 'user4', email: 'user4@gmail.com', _id: '15test15' }
        ],
        count: 4
      }
    }

    const mockDeleteOne = (id) => {
      if (id === undefined) {
        throw new RouteError('Admin ID Is Required')
      }
      return { name: 'user1', email: 'user1@gmail.com', _id: '12test12' }
    }

    const mockDeletePermission = (password) => {
      if (!password) {
        throw new RouteError('Password Is Required')
      }
      return { name: 'user1', email: 'user1@gmail.com', _id: '12test12' }
    }
    return {
      admins: { list: mockList, deleteOne: mockDeleteOne, deletePermission: mockDeletePermission }
    }
  }

  beforeEach(() => {
    const pinia = createPinia().use(useAdminsStore)
    app.use(pinia)
    setActivePinia(createPinia())
  })

  test('test success List', async () => {
    const adminStore = useAdminsStore(mokeConnector())
    const store = adminStore()
    await store.loadPage(1)
    expect(store.count).toEqual(4)
  })

  test('test success deleteOne', async () => {
    const adminStore = useAdminsStore(mokeConnector())
    const store = adminStore()
    await store.loadPage(1)
    await store.delete(store.items[0]._id)
    expect(store.items.length).toEqual(3)
    expect(store.items[0].data.name).toEqual('user2')
  })

  test('test success delete ', async () => {
    const adminStore = useAdminsStore(mokeConnector())
    const store = adminStore()
    await store.loadPage(1)
    const res = await store.deleteOne({ id: store.items[0]._id, password: 123123 })
    expect(res).toEqual({ name: 'user1', email: 'user1@gmail.com', _id: '12test12' })
  })

  test('test error delete ', async () => {
    const adminStore = useAdminsStore(mokeConnector())
    const store = adminStore()
    await store.loadPage(1)
    const res = await store.deleteOne({})
    expect(res.message).toEqual('Password Is Required')
  })
})
