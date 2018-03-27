// @flow
import type { BayesClassifier } from '../type/index'

import bayes from 'syzer-level-naive-bayes'
import level from 'level'

const db = level('./data/db')
const nb: BayesClassifier = bayes(db)

module.exports = require('../twitter/load')
  .then(([ category1, category2 ]) => Promise.all([
    category1.map(e => nb.trainAsync('category1', e)),
    category2.map(e => nb.trainAsync('category2', e))
  ]))
  .catch(console.error)
