export default (getConnector, onError = () => {}) => {
  return async function getOne (id) {
    let item
    try {
      item = this.items.find(item => item._id === id)
      if (!item) {
        throw new Error(`Item with _id: ${id} was not found in the store.`)
      }
      item.status = 'loading-in-progress'
      const result = await getConnector({ ...this.params, id })
      item.data = result
      item.status = 'ready'
      return result
    } catch (e) {
      if (item) {
        item.status = 'encountered-an-error'
        item.errors.push(e)
      } else {
        this.status = 'encountered-an-error'
        this.errors.push(e)
      }
      onError(e)
      throw e
    }
  }
}
