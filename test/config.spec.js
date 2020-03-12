/* global describe, it, beforeEach, afterEach, before, after */

const EmulatorController = require('gcp-firestore-simple-repository/src/emulator-controller')
const sleep = require('sleep-promise')
const assert = require('power-assert')

const { RepositoryCreator } = require('gcp-firestore-simple-repository')
const FirestoreReader = require('firestore-reader')
const SecretReader = require('secret-reader')

const Config = require('config')

describe('Config', function () {
  this.timeout(5000)

  const host = '127.0.0.1'
  const port = 9876
  let emu, repos, store

  /**
   * @return {boolean}
   */
  function isCloudBuild () {
    return process.env.PROJECT_ID ? true : false // eslint-disable-line no-unneeded-ternary
  }

  before(async () => {
    if (!isCloudBuild()) {
      emu = EmulatorController.invoke(host, port)
      process.env.FIRESTORE_EMULATOR_HOST = `${host}:${port}`
      await sleep(2500)
    }
    repos = RepositoryCreator.create('dummy', { projectId: process.env.PROJECT_ID || 'test-project' })
    store = new FirestoreReader(repos)
  })
  after(async () => {
    if (!isCloudBuild()) {
      await emu.kill()
      delete process.env.FIRESTORE_EMULATOR_HOST
    }
  })

  let config
  beforeEach(async () => { config = await Config.init('dummy', { store }) })
  afterEach(async () => { await repos.clear() })

  describe('asyncFunc', () => {
    it('resolved', async () => {
      assert.equal(await config.get('key.asyncFunc'), 'async')
      assert.equal(typeof (await config.get('key.asyncFunc')), 'string')
    })
  })
  describe('func', () => {
    describe('no args', () => {
      it('called', async () => {
        assert.equal(await config.get('key.func'), 'val')
        assert.equal(typeof (await config.get('key.func')), 'string')
      })
    })
    describe('with args', () => {
      it('passed', async () => {
        assert.equal(await config.get('key.funcWithArg', 'arg'), 'arg')
      })
    })
  })
  describe('immediate', () => {
    it('thru', async () => {
      assert.equal(await config.get('key.immediate'), 'immediate')
      assert.equal(typeof (await config.get('key.immediate')), 'string')
    })
  })
  describe('firestore doc', () => {
    describe('exists', () => {
      let doc
      beforeEach(async () => {
        doc = {
          key: 'first level',
          sub: {
            leaf: 'leaf'
          }
        }
        const docRef = repos.col.doc('doc')
        await docRef.set(doc)
      })
      it('no path given, return whole object', async () => {
        assert.deepEqual(await config.get('key.doc'), doc)
      })
      it('path given, return sub tree', async () => {
        assert.deepEqual(await config.get('key.doc', 'sub.leaf'), 'leaf')
      })
    })
    describe('not exist', () => {
      it('fallback to string', async () => {
        await assert.equal(await config.get('key.doc'), 'not exist')
      })
    })
  })
  describe('secret manager', () => {
    let secret
    beforeEach(async () => {
      if (isCloudBuild()) {
        secret = new SecretReader({ projectId: process.env.PROJECT_ID })
        config = await Config.init('dummy', { store, secret })
      }
    })
    it('common interface', async function () {
      if (isCloudBuild()) {
        assert.equal(await config.get('credential'), 'value')
      } else {
        this.skip()
      }
    })
  })
})
