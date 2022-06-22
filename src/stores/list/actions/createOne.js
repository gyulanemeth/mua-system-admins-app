export default (postConnector, onError = () => {}, settings = {}) => {
  return async function createOne (body) {
    let newItem
    try {
      if (settings.optimistic) {
        newItem = { _id: 'unknown', status: 'creation-in-progress', data: body }
        this.items.unshift(newItem)
      }
      const result = await postConnector({ ...this.params }, body)
      const retVal = JSON.parse(JSON.stringify(result)) // result will be a reactive vue obj after adding it to the state, that is why we need to copy the object

      if (settings.optimistic) {
        newItem._id = result._id
        newItem.data = result
        newItem.status = 'ready'
      } else {
        this.items.unshift({ _id: result._id, status: 'ready', data: result })
      }

      return retVal
    } catch (e) {
      this.status = 'encountered-an-error'
      this.errors.push(e)

      if (settings.optimistic) {
        this.items.splice(this.items.indexOf(newItem), 1)
      }
      
      onError(e)
      throw e
    }
  }
}
