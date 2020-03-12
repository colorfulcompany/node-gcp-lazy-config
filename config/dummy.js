module.exports = ({ store }) => {
  return {
    key: {
      immediate: 'immediate',
      func: () => 'val',
      asyncFunc: async () => 'async',
      funcWithArg: (path) => path,
      doc: async () => await store.get('doc') || 'not exist'
    }
  }
}
