import systemMessages from './systemMessages.js'

// there can be a setting for this function to not load the whole objects just the metadata.
// after loading the list, it can call get getOne functions, to load the items one by one
// this way we can show the list very quickly if the objects in the list contain a lot of data
// and load the whole objects later on (settings.metaFirst)

// there might be another setting for paged/infinite behaviour
export default (connector, settings) => {
  return async function load () {
    try {
      this.isLoading = true
      this.items = []
      this.count = 0
      const result = await connector(this.params, { filter: this.filter, select: this.select, sort: this.sort, skip: this.skip, limit: this.limit })
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
      systemMessages.addError(e)
    }
  }
}
