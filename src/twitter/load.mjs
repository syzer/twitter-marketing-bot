// @flow
// extract tweets and save it to db
import { saveToDb } from '../db/index.mjs'

const Twitter = require('twitter')
const { flow, flattenDeep, uniq } = require('lodash')

const { tokenizeAndStem } = require('./parser')

const {
  count,
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

const newQuery = e => ({ q: e + ' -RT', count })

// Interesting categories ( programming )
const category1 = [
  'learning to code',
  'love software',
  'javascript',
  'java',
  'VSAppCenter',
  'hacking'
].map(newQuery)

// not interesting
const category2 = [
  'going to gym',
  'learning to take a pictures',
  'photography',
  'flowers'
].map(newQuery)

// TODO types :Twitts
const extractTweets = ({ statuses }) => statuses.map(({ text }) => text)

const queryTweets = (searchQueries = category1) =>
  Promise.all(
    searchQueries
      .map(q => client.get('search/tweets', q)
        .then(extractTweets)))
    .then(flow(flattenDeep, uniq))
    .then(twitts => twitts.map(tokenizeAndStem))

const load = () =>     console.error('=====\n\ndsdsas')

export {
  load
}
