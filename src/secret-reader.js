const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')

class SecretReader {
  /**
   * @param {object} param
   * @param {string} param.projectId
   */
  constructor ({ projectId = process.env.GCP_PROJECT } = {}) {
    this.project = projectId
    this.client = new SecretManagerServiceClient({
      projectId
    })
  }

  /**
   * @param {string} secret
   * @return {string}
   */
  name (secret) {
    return `projects/${this.project}/secrets/${secret}`
  }

  /**
   * @param {string} secret
   * @return {string}
   */
  async get (secret) {
    return this.latest(secret)
  }

  /**
   * @param {string} secret
   * @return {string|boolean}
   */
  async latest (secret) {
    let r
    try {
      [r] = await this.client.accessSecretVersion({
        name: `${this.name(secret)}/versions/latest`
      })
    } catch (e) {
      if (e.code !== 5) throw e // NOT_FOUNT error should be silent
    }

    return (r && r.payload)
      ? r.payload.data.toString('utf8')
      : false
  }
}

module.exports = SecretReader
