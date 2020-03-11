const { cosmiconfig } = require('cosmiconfig')

class FileLoader {
  /**
   * @param {string} moduleName
   * @param {object} opts
   * @return {object}
   */
  static async load (moduleName, opts = {}) {
    const explorer = cosmiconfig(moduleName)

    const config = (await explorer.load(this.path(moduleName))).config

    return (config.constructor.name.match(/Function/))
      ? config(opts)
      : config
  }

  /**
   * @param {string} moduleName
   * @return {Array}
   */
  static path (moduleName) {
    return `./config/${moduleName}.js`
  }
}

module.exports = FileLoader
