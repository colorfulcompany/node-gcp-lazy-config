class FirestoreReader {
  /**
   * @param {object} repos - FirestoreSimpleRepository
   */
  constructor (repos) {
    this.repos = repos
  }

  /**
   * @param {string} id
   * @param {string} path
   * @return {object|undefined}
   */
  async get (id, path = undefined) {
    const snap = await this.repos.find(id)

    return (snap)
      ? ((path)
        ? snap.get(path)
        : snap.data())
      : undefined
  }
}

module.exports = FirestoreReader
