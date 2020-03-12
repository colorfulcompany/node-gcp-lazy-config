# Google Cloud Lazy Config

## Features

 * read File in Source Code
 * support function
 * support Firestore Simple Repository
 * support SecretManager

## How To Install

add as below in package.json\'s dependencies section

```
"gcp-config-lazy": "https://github.com/colorfulcompany/node-gcp-lazy-config"
```

or 

```
$ npm install https://github.com/colorfulcompany/node-gcp-lazy-config
```

## How To Use

```javascript
const { RepositoryCreator } = require('gcp-firestore-simple-repository')
const { Config, FirestoreReader, SecretReader } = require('gcp-lazy-config')

;(async () => {
  const repos = RepositoryCreate.create(<name>)
  const store = new FirestoreReader(repos)
  const secret = new SecretReader()

  const config = await Config.init(<name>, { store, secret })
  await config.get('credential')
})()
```

in config/\<name\>.js

```javascript
module.exports = ({ store, secret }) => {
  return {
    immediate: 'immediate',
    func: () => 'val',
    asyncFunc: async () => 'async',
    doc: async (path) => await store.get('doc', path) || process.env.CONFIG1,
    credential: async () => await secret.get('sample') || process.env.SECRET1
  }
}
```
