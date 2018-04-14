// @flow
import type { Category, Twitts } from '../type'
import uuid from 'uuid'
import level from 'level-party'

// TODO here ability to pick different db
const db = level('./data/twitts')

const newKey = (category: Category, id = uuid.v1()) => `${category}-${id}`

const newPutOperation = (category: Category) => value => ({
  type: 'put',
  key: newKey(category),
  value
})

// @see https://github.com/Level/levelup#batch
// $FlowOk
export const saveToDb = (category: Category) => (twitts: Twitts) => new Promise((resolve, reject) =>
  db.batch(twitts.map(newPutOperation(category)), err =>
    err ? reject(err) : resolve(twitts)
  ))
