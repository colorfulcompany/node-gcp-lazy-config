/* global describe, it */

const assert = require('power-assert')

const FileLoader = require('file-loader')

describe('FileLoader', () => {
  it('.load', async () => {
    assert.equal(typeof (await FileLoader.load('dummy')), 'object')
  })
})
