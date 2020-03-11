const { cosmiconfig } = require('cosmiconfig')

class FileLoader {
  /**
   * @param {string} moduleName
   * @return {object}
   */
  static async load (moduleName) {
    const explorer = cosmiconfig(moduleName)

    return (await explorer.load(this.path(moduleName))).config
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
