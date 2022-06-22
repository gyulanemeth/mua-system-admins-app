export default (putConnector, onError = () => {}, settings = {}) => {
  return async function updateOne (id, body) {
    let item
    let previousState
    try {
      item = this.items.find(item => item._id === id)
      if (!item) {
        throw new Error(`Item with _id: ${id} was not found in the store.`)
      }

      if (settings.optimistic) {
        previousState = JSON.parse(JSON.stringify(item.data))
        item.data = body
      } else {
        item.status = 'update-in-progress'
      }

      const result = await putConnector({ ...this.params, id }, body)
      const retVal = JSON.parse(JSON.stringify(result)) // result will be a reactive vue obj after adding it to the state, that is why we need to copy the object

      if (!settings.optimistic) {
        item.data = result
        item.status = 'ready'
      }

      return retVal
    } catch (e) {
      if (item) {
        item.status = 'encountered-an-error'
        item.errors.push(e)

        if (settings.optimistic) {
          item.data = previousState
        }
      } else {
        this.status = 'encountered-an-error'
        this.errors.push(e)
      }

      onError(e)
      throw e
    }
  }
}
