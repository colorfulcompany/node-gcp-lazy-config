/* global describe, it, beforeEach */

const assert = require('power-assert')

const Config = require('config')

describe('Config', () => {
  let config
  beforeEach(async () => { config = await Config.init('dummy') })

  describe('asyncFunc', () => {
    it('resolved', async () => {
      assert.equal(await config.get('key.asyncFunc'), 'async')
      assert.equal(typeof (await config.get('key', 'asyncFunc')), 'string')
    })
  })
  describe('func', () => {
    it('called', async () => {
      assert.equal(await config.get('key.func'), 'val')
      assert.equal(typeof (await config.get('key', 'func')), 'string')
    })
  })
  describe('immediate', () => {
    it('thru', async () => {
      assert.equal(await config.get('key.immediate'), 'immediate')
      assert.equal(typeof (await config.get('key', 'immediate')), 'string')
    })
  })
})
