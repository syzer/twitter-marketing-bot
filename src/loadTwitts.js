// extract tweets and save it to db
const _ = require('lodash')
const natural = require('natural')
natural.PorterStemmer.attach()
const db = require('levelup')('./data/twitts')
const Twitter = require('twitter')
const uuid = require('uuid')

const {
  count,
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
} = require('./config')
const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
})

const newQuery = e => ({ q: e, count })

// interesting
const category1 = [
  'learning to code',
  'love software'
].map(newQuery)

// not interesting
const category2 = [
  'going to gym',
  'learning to take a pictures',
  'photographhy'
].map(newQuery)

const getTweetTexts = ({ statuses }) => statuses.map(({ text }) => text)

// TODO write better tokenizer and steamer
const tokenizeAndStem = str => str.tokenizeAndStem().join(' ')

const newKey = categoryName => `${categoryName}-${uuid.v1()}`

const newPutOperation = categoryName => value => ({
  type: 'put',
  key: newKey(categoryName),
  value
})

// @see https://github.com/Level/levelup#batch
const saveToDb = categoryName => (twitts) => new Promise((resolve, reject) =>
  db.batch(twitts.map(newPutOperation(categoryName)), err =>
    err ? reject(err) : resolve(twitts)
  ))

const newCategory = (category = category1, categoryName = 'category1') => Promise.all(
  category.map(params => client.get('search/tweets', params).then(getTweetTexts))
)
  .then(_.flattenDeep)
  .then(_.uniq)
  .then(twitts => twitts.map(tokenizeAndStem))

module.exports = Promise.all([
  newCategory(category1, 'category1').then(saveToDb('category1')),
  newCategory(category2, 'category2').then(saveToDb('category2'))
])
  .then(([category1, category2]) => ({
    category1,
    category2
  }))
  // .then(console.log)
  .catch(console.error)
