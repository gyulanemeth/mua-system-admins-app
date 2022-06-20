import useSystemMessages from '../../systemMessages.js'

// setting: remove before the request or show a delete in progress status

export default (deleteConnector, settings) => {
  return async function deleteOne (id) {
    let item
    let previousIdx
    try {
      item = this.items.find(item => item._id === id)
      if (!item) {
        throw new Error('what store errors shall we introduce?')
      }
      if (settings.optimistic) {
        previousIdx = this.items.indexOf(item)
        this.items.splice(this.items.indexOf(item), 1)
      } else {
        item.status = 'delete-in-progress'
      }
      const result = await deleteConnector({ ...this.params, id })
      if (!settings.optimistic) {
        this.items.splice(this.items.indexOf(item), 1)
      }
      return result
    } catch (e) {
      if (item && settings.optimistic) {
        this.items.splice(previousIdx, 0, item)
      }

      // if there is a not found error, then we actually could remove the element, since that is already non-existent in the db
      useSystemMessages().addError(e)
    }
  }
}
