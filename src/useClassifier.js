const {flow} = require('lodash')
const bayes = require('syzer-level-naive-bayes')
const db = require('level')('./data/db')
const nb = bayes(db)

const {tokenizeAndStem} = require('../src/twitter/parser')

// nb.classifyAsync('code is what i do').then(console.log)
// nb.classifyAsync('gym').then(console.log)

module.exports = flow(tokenizeAndStem, nb.classifyAsync)
