import systemMessages from './systemMessages.js'

// setting: remove before the request or show a delete in progress status

export default (connector, settings) => {
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
      }
      const result = await connector({ ...this.params, id })
      if (!settings.optimistic) {
        this.items.splice(this.items.indexOf(item), 1)
      }
      return result
    } catch (e) {
      if (settings.optimistic) {
        this.items.splice(previousIdx, 0, item)
      }
      systemMessages.addError(e)
    }
  }
}
