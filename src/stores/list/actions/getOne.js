import systemMessages from './systemMessages.js'

export default (connector) => {
  return async function getOne (id) {
    try {
      const item = this.items.find(item => item._id === id)
      if (!item) {
        throw new Error('???') // or maybe this.items.unshift later? it can also be a setting, since we can use this function for cacheing as well
      }
      // what about reading it from indexed db and in the meantime send a get request with select.updatedAt: 1
      // if the cached updatedAt differs from the real one, then we can send the real request
      // also, it's a possibility to send it in paralell
      const result = await connector({ ...this.params, id })
      item.data = result
      return result
    } catch (e) {
      systemMessages.addError(e)
    }
  }
}
