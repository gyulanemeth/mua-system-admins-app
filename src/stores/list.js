export default (baseRoute) => {
  /*
  function list () {}
  function createOne () {}
  function getOne() {}
  function updateOne() {}
  function patchOne() {}
  function deleteOne() {}
  */

  return {
    state: () => ({
      params: {},
      filter: {},
      select: {},
      sort: {},
      skip: 0,
      limit: 10,

      items: [],
      count: 0
    }),
    actions: {
      setParams () {},
      setFilter () {},
      setSelect () {},
      setSort () {},
      setSkip () {},
      setLimit () {},

      load () {},
      loadMore () {}
    }
  }
}
