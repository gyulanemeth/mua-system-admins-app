import { defineStore } from 'pinia'

import systemMessages from './systemMessages.js'

export default (id, connectors) => {
  if (!connectors.list) {
    throw Error('connectors.list is mandatory!')
  }

  const state = {
    isLoading: false,

    params: {},
    filter: {},
    select: {},
    sort: {},
    skip: 0,
    limit: 10,

    items: [],
    count: 0
  }

  const actions = {
    async load () {
      try {
        this.isLoading = true
        this.items = []
        this.count = 0
        const result = await connectors.list(this.params, { filter: this.filter, select: this.select, sort: this.sort, skip: this.skip, limit: this.limit })
        this.items = result.items
        this.count = result.count
        this.isLoading = false
      } catch (e) {
        systemMessages.addError(e)
      }
    },
    async loadMore () {
      if (this.count <= this.items.length) {
        return
      }
      try {
        this.isLoading = true
        this.skip = this.items.length
        const result = await connectors.list(this.params, { filter: this.filter, select: this.select, sort: this.sort, skip: this.skip, limit: this.limit })
        this.items = [...this.items, ...result.items]
        this.count = result.count
        this.isLoading = false
      } catch (e) {
        systemMessages.addError(e)
      }
    }
  }

  if (connectors.createOne) {
    actions.createOne = async function (body) {
      try {
        this.isLoading = true
        this.skip = this.items.length
        const result = await connectors.createOne(this.params, body)
        this.items = [...this.items, ...result.items]
        this.count = result.count
        this.isLoading = false
      } catch (e) {
        systemMessages.addError(e)
      }
    }
  }

  if (connectors.updateOne) {
    actions.updateOne = async function (id, body) {

    }
  }

  if (connectors.deleteOne) {
    actions.deleteOne = async function (id) {

    }
  }

  Object.keys(connectors).filter(actConnectorKey => actConnectorKey.startsWith('patch')).forEach(actConnectorKey => {
    actions[actConnectorKey] = function (id, body) {

    }
  })

  return defineStore(id, { state: () => (state), actions })
}
