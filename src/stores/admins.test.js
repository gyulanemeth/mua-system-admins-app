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

    const mockDeleteMyAccount = ({id, password}) => {
      if (!id || !password) {
        throw new RouteError('Password and Admin\'s Id Is Required')
      }
      return { name: 'user1', email: 'user1@gmail.com', _id: '12test12' }
    }
    return {
      admins: { list: mockList, deleteOne: mockDeleteOne, deleteMyAccount: mockDeleteMyAccount }
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
    await store.load()
    expect(store.count).toEqual(4)
  })

  test('test success DeleteOne', async () => {
    const adminStore = useAdminsStore(mokeConnector())
    const store = adminStore()
    await store.load()
    await store.deleteOne(store.items[0]._id)
    expect(store.items.length).toEqual(3)
    expect(store.items[0].data.name).toEqual('user2')
  })

  test('test success delete My Account', async () => {
    const adminStore = useAdminsStore(mokeConnector())
    const store = adminStore()
    await store.load()
    const res = await store.deleteMyAccount({id:123456, password: 123123})
    expect(res).toEqual({name: 'user1', email: 'user1@gmail.com', _id: '12test12' })
  })

  test('test error delete My Account', async () => {
    const adminStore = useAdminsStore(mokeConnector())
    const store = adminStore()
    await store.load()
    const res = await store.deleteMyAccount({})
    expect(res.message).toEqual('Password and Admin\'s Id Is Required')
  })
})
