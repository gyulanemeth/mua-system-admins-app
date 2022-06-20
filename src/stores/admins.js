import { defineStore } from 'pinia'

import infiniteListState from './list/state/infinite.js'

import load from './list/actions/load.js'
import deleteOne from './list/actions/deleteOne.js'

const db = [
  { _id: 1, name: 'admin1' },
  { _id: 2, name: 'admin2' },
  { _id: 3, name: 'admin3' }
]
function list () {
  return {
    items: db,
    count: db.length
  }
}

function cDeleteOne () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      db.pop()
      const err = new Error('Delete failed.')
      err.status = 403
      err.name = 'AUTHORIZATION_ERROR'
      reject(err)
      // resolve()
    }, 2000)
  })
}

export default defineStore('admins', {
  state: infiniteListState,
  actions: {
    load: load(list, { metaFirst: false }),
    deleteOne: deleteOne(cDeleteOne, { optimistic: false })
  }
})
