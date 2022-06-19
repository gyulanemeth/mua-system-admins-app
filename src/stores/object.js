import systemMessagesStore from './systemMessages.js'

export default (connectors) => {
  // kind of an object cache store
  // we will also be able to cache the items to indexed db
  return {
    state: () => ({
      items: [] // { id, status, data }
    }),
    getters: {
      findOne () {
        this.items.find()
      }
    },
    actions: {
      addOne () {
        // the item was fetched from somewhere else, for example from a list
      },
      async createOne (data) {
        try {
          const newItem = { _id: 'unknown', status: 'creation-in-progress', data }
          this.items.push(newItem)
          const newItemData = await connectors.createOne(data)
          newItem._id = newItemData._id
          newItem.data = newItemData
          newItem.status = 'ready'
        } catch (e) {
          systemMessagesStore.addError(e)
        }
      },
      getOne () {
        // add item { id, status: 'loading-in-progress', data: null }
        // get item by id
        // set data
        // set status to 'ready'
      },
      async updateOne () {
        try {
          // find item
          // set status to 'update-in-progress'
          const data = await connectors.updateOne()
          // set data
          // set status to 'ready'
        } catch (e) {

        }
      },
      deleteOne () {
        // find item
        // set status to 'delete-in-progress'
        // remove item
        // remove item from related stores?
      }
    }
  }
}
