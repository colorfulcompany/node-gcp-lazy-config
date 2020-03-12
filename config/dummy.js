module.exports = ({ store, secret }) => {
  return {
    key: {
      immediate: 'immediate',
      func: () => 'val',
      asyncFunc: async () => 'async',
      funcWithArg: (path) => path,
      doc: async (path) => await store.get('doc', path) || 'not exist'
    },
    credential: async () => secret.get('sample')
  }
}
