import { defineStore } from 'pinia'

import infiniteListState from './list/state/infinite.js'

import load from './list/actions/load.js'
import deleteOne from './list/actions/deleteOne.js'

export default (connectors) => {
  return defineStore('admins', {
    state: infiniteListState,
    actions: {
      load: load(connectors.list, { metaFirst: false }),
      deleteOne: deleteOne(connectors.deleteOne, { optimistic: true })
    }
  })
}
