import useSystemMessages from '../../systemMessages.js'

// in this case we might introduce a setting that does the following
// either puts the returned data on the object
// or it puts it before calling the connector assuming that the operation will be successful
// in the second case, whenever there is an error, we will have to restore the previous state

export default (putConnector, settings) => {
  return async function updateOne (id, body) {
    let item
    let previousState
    try {
      const item = this.items.find(item => item._id === id)
      if (!item) {
        throw new Error('what store errors shall we introduce?')
      }
      if (settings.optimistic) {
        previousState = JSON.parse(JSON.stringify(item.data))
        item.data = body
      } else {
        item.status = 'update-in-progress'
      }
      const result = await putConnector({ ...this.params, id }, body)
      if (!settings.optimistic) {
        item.data = result
        item.status = 'ready'
      }
      return result
    } catch (e) {
      if (settings.optimistic) {
        item.data = previousState
      }
      useSystemMessages().addError(e)
    }
  }
}
