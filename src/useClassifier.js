const bayes = require('syzer-level-naive-bayes')
const db = require('level')('./data/db')
const nb = bayes(db)

nb.classifyAsync('code is what i do').then(console.log)
nb.classifyAsync('gym').then(console.log)

module.exports = nb.classifyAsync
