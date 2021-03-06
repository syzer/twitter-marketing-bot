// @flow
// TODO nodemon -q -w ./src/ -e js -x 'babel-node src/twitter/labelUser.js'
import type { Twitt, UserHandle } from '../type'

import _ from 'lodash'
import { countBy, head, identity, last, pipeP, pluck, sortBy, toPairs } from 'ramda'
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

const fetchUserStatuses = (user: string, howMany: number = 200): Promise<Array<Twitt>> =>
  client.get('statuses/user_timeline', {
    screen_name: user,
    include_rts: false,
    count: howMany
  })

const labelUser = (twitterHandle: string) =>
  // $FlowOk
  fetchUserStatuses(twitterHandle)
    .then(pluck('text'))
    .then(twitts =>
      Promise.all(twitts
        .map(classify)))
    .then(countBy(identity))

type BestLabelForUser = UserHandle => string
const bestLabelForUser: BestLabelForUser = pipeP(labelUser, toPairs, sortBy(last), last, head)

export {
  labelUser,
  fetchUserStatuses,
  bestLabelForUser
}

// the cli mode
if (!module.parent) {
  const twitterHandle = 'AlainFrapolli'

  labelUser(twitterHandle)
    .then(categories => _(categories)
      .countBy(a => a === 'category1')
      .toPairs()
      .map(e => e.pop())
      .value())
    .then(([category1, category2]) =>
      category1 > category2 ? 'category1' : 'category2')
    .then(e => console.log(`User will more like category: ${e}`))
    .catch(console.error)
}
