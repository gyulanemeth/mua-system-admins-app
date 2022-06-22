export default (deleteConnector, onError = () => {}, settings = {}) => {
  return async function deleteOne (id) {
    let item
    let previousIdx
    try {
      item = this.items.find(item => item._id === id)
      if (!item) {
        throw new Error(`Item with _id: ${id} was not found in the store.`)
      }
      if (settings.optimistic) {
        previousIdx = this.items.indexOf(item)
        this.items.splice(previousIdx, 1)
      } else {
        item.status = 'delete-in-progress'
      }
      const result = await deleteConnector({ ...this.params, id })
      if (!settings.optimistic) {
        this.items.splice(this.items.indexOf(item), 1)
      }
      return result
    } catch (e) {
      if (item) {
        item.status = 'encountered-an-error'
        item.errors.push(e)

        if (settings.optimistic) {
          this.items.splice(previousIdx, 0, item)
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
