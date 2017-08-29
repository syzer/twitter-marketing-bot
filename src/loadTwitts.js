const bayes = require('syzer-level-naive-bayes')
const db = require('level')('./data/db')
const _ = require('lodash')
const nb = bayes(db)
const Twitter = require('twitter')

const { consumer_key, consumer_secret, access_token_key, access_token_secret } = require('./config')
const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
})

const newQuery = e => ({ q: e, count: 100 })

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

const getTweetTexts = (searchResult) => {
  const result = []
  const statuses = searchResult.statuses
  for (const tweet of statuses) {
    result.push(tweet.text)
  }
  return result
}

const newCategory = (category = category1, categoryName = 'category1') => Promise.all(
  category.map(params => client.get('search/tweets', params).then(getTweetTexts))
).then(responses => responses.map(e => _.uniq(e)))
  .then(responses => responses.map(e => nb.trainAsync(categoryName, e)))
  .catch(console.error)

newCategory()
  .then(() => newCategory(category2, 'category2'))
  .then(() => nb.classifyAsync('gym')
    .then(console.log))

