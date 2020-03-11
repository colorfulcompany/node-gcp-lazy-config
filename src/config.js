const FileLoader = require('./file-loader')
const dig = require('lodash.get')

class Config {
  /**
   * @param {object} config
   */
  constructor (config) {
    this.config = config
  }

  /**
   * @param {string} moduleName
   * @return {object}
   */
  static async init (moduleName) {
    return new this(await FileLoader.load(moduleName))
  }

  /**
   * @param {Array} paths
   * @return {object}
   */
  async get (...paths) {
    const value = (paths.length > 1)
      ? dig(this.config, paths)
      : dig(this.config, paths[0])

    return value.constructor.name.match(/Function/)
      ? value.call()
      : value
  }
}

module.exports = Config
