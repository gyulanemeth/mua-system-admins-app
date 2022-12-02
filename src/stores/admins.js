import { defineStore } from 'pinia'

import pagedListState from 'pinia-list-store/src/state/paged.js'
import loadPage from 'pinia-list-store/src/actions/loadPage.js'
import load from 'pinia-list-store/src/actions/load.js'
import deleteAdmin from 'pinia-list-store/src/actions/deleteOne.js'
import useSystemMessagesStore from './systemMessages.js'

export default (connectors) => {
  const adminStore = defineStore('admins', {
    state: pagedListState,
    actions: {
      load: load(connectors.admins.list, useSystemMessagesStore().addError, { metaFirst: false }),
      loadPage: loadPage(connectors.admins.list, useSystemMessagesStore().addError, { metaFirst: false }),
      delete: deleteAdmin(connectors.admins.deleteOne, useSystemMessagesStore().addError, { optimistic: false }),
      async deleteOne ({ id, password }) {
        try {
          await connectors.admins.deletePermission(password)
          const res = await this.delete(id)
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
