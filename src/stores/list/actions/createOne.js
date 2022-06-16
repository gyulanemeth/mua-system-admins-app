import systemMessages from './systemMessages.js'

export default (connector) => {
  return async function createOne (body) {
    try {
      const newItem = { _id: 'unknown', status: 'creation-in-progress', body }
      this.items.unshift(newItem)
      const newItemData = await connector(body)
      newItem._id = newItemData._id
      newItem.data = newItemData
      newItem.status = 'ready'
    } catch (e) {
      // might add status flag like unsuccessful-create... so the user can retry the save, or we can automatically do that
      // introduce lastError prop on items?
      systemMessages.addError(e)
    }
  }
}
