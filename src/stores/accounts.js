import { defineStore } from 'pinia'
import systemMessages from './systemMessages.js'
import infiniteListState from './list/state/infinite.js'
import load from './list/actions/load.js'

export default (connectors) => {

  const accountStore = defineStore('accounts', {
    state: infiniteListState,
    actions: {
      load: load(connectors.account.list,systemMessages().addError, { metaFirst: false })
    }
  })

  return accountStore
}
