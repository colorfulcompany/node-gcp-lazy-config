module.exports = ({ store }) => {
  return {
    key: {
      immediate: 'immediate',
      func: () => 'val',
      asyncFunc: async () => 'async',
      funcWithArg: (path) => path,
      doc: async (path) => await store.get('doc', path) || 'not exist'
    }
  }
}
