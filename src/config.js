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
   * @param {object} opts
   * @return {object}
   */
  static async init (moduleName, opts) {
    return new this(await FileLoader.load(moduleName, opts))
  }

  /**
   * @param {string} path
   * @param {string} subpath
   * @return {object}
   */
  async get (path, subpath = undefined) {
    const value = dig(this.config, path)

    return (value && value.constructor.name.match(/Function/))
      ? value.call(this, subpath)
      : value
  }
}

module.exports = Config
