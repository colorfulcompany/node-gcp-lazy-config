/* global describe, it, beforeEach */

const assert = require('power-assert')

const SecretReader = require('secret-reader')

describe('SecretReader', () => {
  /**
   * @return {boolean}
   */
  function isCloudBuild () {
    return process.env.PROJECT_ID ? true : false // eslint-disable-line no-unneeded-ternary
  }

  let reader
  beforeEach(() => {
    if (isCloudBuild()) {
      reader = new SecretReader({ projectId: process.env.PROJECT_ID })
    }
  })

  describe('found', () => {
    it('return string', async () => {
      if (isCloudBuild()) {
        assert.equal(typeof (await reader.latest('sample')), 'string')
      }
    })
  })
  describe('not found', () => {
    it('return false', async () => {
      if (isCloudBuild()) {
        assert.equal(await reader.latest('notexist'), false)
      }
    })
  })
})
