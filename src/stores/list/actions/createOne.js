import useSystemMessages from '../../systemMessages.js'

export default (postConnector) => {
  return async function createOne (body) {
    let newItem
    try {
      newItem = { _id: 'unknown', status: 'creation-in-progress', data: body }
      this.items.unshift(newItem)
      const newItemData = await postConnector(body)
      newItem._id = newItemData._id
      newItem.data = newItemData
      newItem.status = 'ready'
    } catch (e) {
      this.items.splice(this.items.indexOf(newItem), 1)
      useSystemMessages().addError(e)
    }
  }
}
