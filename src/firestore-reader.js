class FirestoreReader {
  /**
   * @param {object} repos - FirestoreSimpleRepository
   */
  constructor (repos) {
    this.repos = repos
  }

  /**
   * @param {string} id
   * @return {object|undefined}
   */
  async get (id) {
    const snap = await this.repos.find(id)

    return (snap)
      ? snap.data()
      : undefined
  }
}

module.exports = FirestoreReader
