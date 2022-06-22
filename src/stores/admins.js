import { defineStore } from 'pinia'
import systemMessages from './systemMessages.js'
import infiniteListState from './list/state/infinite.js'
import load from './list/actions/load.js'
import deleteOne from './list/actions/deleteOne.js'

export default (connectors) => {

  const adminStore = defineStore('admins', {
    state: infiniteListState,
    actions: {
      load: load(connectors.admins.list,systemMessages().addError, { metaFirst: false }),
      deleteOne: deleteOne(connectors.admins.deleteOne,systemMessages().addError, { optimistic: false })
    }
  })

  return adminStore
}
