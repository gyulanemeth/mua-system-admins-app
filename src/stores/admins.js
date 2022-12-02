import { defineStore } from 'pinia'

import pagedListState from 'pinia-list-store/src/state/paged.js'
import loadPage from 'pinia-list-store/src/actions/loadPage.js'
import deleteAdmin from 'pinia-list-store/src/actions/deleteOne.js'
import useSystemMessagesStore from './systemMessages.js'

export default (connectors) => {
  const adminStore = defineStore('admins', {
    state: pagedListState,
    actions: {
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
