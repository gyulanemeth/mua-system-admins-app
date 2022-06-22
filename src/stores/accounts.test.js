import {test, beforeEach, expect, describe, vi} from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { createApp } from 'vue'
import  accountsStore  from './accounts.js'
import RouteError from '../errors/RouteError.js'
describe('accounts Store', () => {

  const app = createApp({})
  const secrets = "verylongsecret1"

  const mokeConnector = () => {

    const mockList = () => {
      return {items:[
      { name: "accountExample1", urlFriendlyName: "urlFriendlyName1", _id:"12test12" },
      { name: "accountExample2", urlFriendlyName: "urlFriendlyName2", _id:"13test13" },
      { name: "accountExample3", urlFriendlyName: "urlFriendlyName3", _id:"14test14" }

    ],count:3}
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
    const store = accountStore();
    const res = await store.load()
    expect(store.count).toEqual(3)
  })

})
