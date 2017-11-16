const bayes = require('syzer-level-naive-bayes')
const db = require('level')('./data/db')
const nb = bayes(db)

module.exports = require('./loadTwitts')
  .then(([ category1, category2 ]) => Promise.all([
    category1.map(e => nb.trainAsync('category1', e)),
    category2.map(e => nb.trainAsync('category2', e))
  ]))
  .catch(console.error)
