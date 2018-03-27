// @flow
import { pipe } from 'ramda'
import bayes from 'syzer-level-naive-bayes'
import level from 'level'

import { tokenizeAndStem } from '../twitter/parser'

const db = level('./data/db')
const nb = bayes(db)

const classify = pipe(tokenizeAndStem, nb.classifyAsync)

export default classify
