export default (getConnector, onError = () => {}, settings = {}) => {
  return async function load () {
    try {
      this.status = 'loading-in-progress'
      this.items = []
      this.count = 0
      const result = await getConnector(this.params, { filter: this.filter, select: this.select, sort: this.sort, skip: this.skip, limit: this.limit })
      this.items = result.items.map(item => {
        return {
          _id: item._id,
          status: settings.metaFirst ? 'loading-in-progress' : 'ready',
          data: item
        }
      })
      this.count = result.count
      this.isLoading = false

      if (settings.metaFirst) {
        // load the items one by one
        this.items.forEach(item => {
          this.getOne(item._id)
        })
      }
    } catch (e) {
      this.status = 'encountered-an-error'
      this.errors.push(e)
      onError(e)
      throw e
    }
  }
}
