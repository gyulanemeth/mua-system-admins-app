import { defineStore } from 'pinia'

import pagedListState from 'pinia-list-store/src/state/paged.js'
import loadPage from 'pinia-list-store/src/actions/loadPage.js'

import useSystemMessagesStore from './systemMessages.js'

export default (connectors) => {
  const accountStore = defineStore('accounts', {
    state: pagedListState,
    actions: {
      loadPage: loadPage(connectors.account.list, useSystemMessagesStore().addError, { metaFirst: false }),
      async createOne (formData) {
        try {
          const avatar = formData.avatar
          const accountData = await connectors.account.createOne(formData)
          await connectors.account.uploadAvatar({ id: accountData._id }, avatar)
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
