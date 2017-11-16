// @flow
import type { Category, Twitts } from '../type'
import uuid from 'uuid'
const db = require('levelup')('./data/twitts')

const newKey = (category: Category) => `${category}-${uuid.v1()}`

const newPutOperation = (category: Category) => value => ({
  type: 'put',
  key: newKey(category),
  value
})

// @see https://github.com/Level/levelup#batch
const saveToDb = (category: Category) => (twitts: Twitts) => new Promise((resolve, reject) =>
  db.batch(twitts.map(newPutOperation(category)), err =>
    err ? reject(err) : resolve(twitts)
  ))

export {
  saveToDb
}
