// @flow
const { flow } = require('lodash')
const bayes = require('syzer-level-naive-bayes')
const db = require('level')('./data/db')
const nb = bayes(db)

const { tokenizeAndStem } = require('../twitter/parser')

module.exports = flow(tokenizeAndStem, nb.classifyAsync)
