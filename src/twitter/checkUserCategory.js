// @flow
// TODO nodemon -q -w ./src/ -e js -x 'babel-node src/twitter/checkUserCategory.js'
import type { Twitt } from '../type'

import _ from 'lodash'
import { pluck } from 'ramda'
import Twitter from 'twitter'

import classify from '../classifier/classify'

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
  .then(pluck('text'))
  .then(twitts =>
    Promise.all(twitts
      .map(classify))
      .then(categories => _(categories)
        .countBy(a => a === 'category1')
        .toPairs()
        .map(e => e.pop())
        .value())
      .then(([category1, category2]) =>
        category1 > category2 ? 'category1' : 'category2')
      .then(e => console.log(`User will more like category: ${e}`)))
  .catch(console.error)
