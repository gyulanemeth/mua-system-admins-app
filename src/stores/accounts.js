import { defineStore } from 'pinia'

import infiniteListState from 'pinia-list-store/src/state/infinite.js'
import load from 'pinia-list-store/src/actions/load.js'

import useSystemMessagesStore from './systemMessages.js'

export default (connectors) => {
  const accountStore = defineStore('accounts', {
    state: infiniteListState,
    actions: {
      load: load(connectors.account.list, useSystemMessagesStore().addError, { metaFirst: false }),
      async createOne (formData) {
        try {
          await connectors.account.createOne(formData)
          return 'success'
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      }
    }
  })

  return accountStore
}
