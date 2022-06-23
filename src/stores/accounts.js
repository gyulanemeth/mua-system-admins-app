import { defineStore } from 'pinia'
import systemMessages from './systemMessages.js'
import infiniteListState from 'pinia-list-store/src/state/infinite.js'
import load from 'pinia-list-store/src/actions/load.js'

export default (connectors) => {

  const accountStore = defineStore('accounts', {
    state: infiniteListState,
    actions: {
      load: load(connectors.account.list,systemMessages().addError, { metaFirst: false })
    }
  })

  return accountStore
}
