module.exports = ({ store }) => {
  return {
    key: {
      immediate: 'immediate',
      func: () => 'val',
      asyncFunc: async () => 'async',
      doc: async () => await store.get('doc') || 'not exist'
    }
  }
}
