import useSystemMessages from '../../systemMessages.js'

export default (getConnector, settings) => {
  return async function loadMore () {
    if (this.count <= this.items.length) {
      return
    }
    try {
      this.isLoading = true
      this.skip = this.items.length
      const result = await getConnector(this.params, { filter: this.filter, select: this.select, sort: this.sort, skip: this.skip, limit: this.limit })
      this.items = [...this.items, ...result.items.map(item => {
        return {
          _id: item._id,
          status: settings.loadMetaFirst ? 'loading-in-progress' : 'ready',
          data: item
        }
      })]
      this.count = result.count
      this.isLoading = false

      if (settings.loadMetaFirst) {
        result.items.forEach(item => {
          this.getOne(item._id)
        })
      }
    } catch (e) {
      useSystemMessages().addError(e)
    }
  }
}
