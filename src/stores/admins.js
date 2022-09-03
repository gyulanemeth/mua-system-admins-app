import { defineStore } from 'pinia'

import infiniteListState from 'pinia-list-store/src/state/infinite.js'
import load from 'pinia-list-store/src/actions/load.js'
import deleteOne from 'pinia-list-store/src/actions/deleteOne.js'
import useSystemMessagesStore from './systemMessages.js'

export default (connectors) => {
  const adminStore = defineStore('admins', {
    state: infiniteListState,
    actions: {
      load: load(connectors.admins.list, useSystemMessagesStore().addError, { metaFirst: false }),
      deleteOne: deleteOne(connectors.admins.deleteOne, useSystemMessagesStore().addError, { optimistic: false }),
      async deleteMyAccount ({ id, password }) {
        try {
          const res = await connectors.admins.deleteMyAccount({ id, password })
          return res
        } catch (e) {
          useSystemMessagesStore().addError(e)
          return e
        }
      }
    }
  })

  return adminStore
}
