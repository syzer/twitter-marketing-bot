// @flow
// TODO nodemon -q -w ./src/ -e js -x 'babel-node src/twitter/checkUserCategory.js'
import type { Twitt } from '../type'

const _ = require('lodash')
const Twitter = require('twitter')
const classify = require('../classifier/classify')

const {
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
} = require('../config')

const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
})

const checkUserCategory = (user: string): Promise<Array<Twitt>> =>
  client.get('statuses/user_timeline', {
    screen_name: user,
    include_rts: false
  })

const user = 'AlainFrapolli'

checkUserCategory(user)
  .then(twitts =>
    Promise.all(twitts
      .map(({ text }) => text)
      .map(classify)))
  .then(categories => _(categories)
    .countBy(a => a === 'category1')
    .toPairs()
    .map(e => e.pop())
    .value())
  .then(([category1, category2]) =>
    category1 > category2 ? 'category1' : 'category2')
  .then(e => console.log(`User will more like category: ${e}`))
  .catch(console.error)
