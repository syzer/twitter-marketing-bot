// @flow
import type { Category, Twitts } from '../type'
const uuid = require('uuid')

const db = require('levelup')('./data/twitts')

const newKey = (category: Category, id = uuid.v1()) => `${category}-${id}`

const newPutOperation = (category: Category) => value => ({
  type: 'put',
  key: newKey(category),
  value
})

// @see https://github.com/Level/levelup#batch
// $FlowFixMe
const saveToDb = (category: Category) => (twitts: Twitts) => new Promise((resolve, reject) =>
  db.batch(twitts.map(newPutOperation(category)), err =>
    err ? reject(err) : resolve(twitts)
  ))

module.exports = {
  saveToDb
}
