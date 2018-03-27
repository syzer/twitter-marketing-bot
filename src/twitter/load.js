// @flow
// extract tweets and save it to db
import type { Twitt } from '../type'

import Twitter from 'twitter'
import { flattenDeep, uniq } from 'lodash'
import { map, filter, pipe, prop } from 'ramda'

import { tokenizeAndStem } from './parser'
import { saveToDb } from '../db'

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
]

// not interesting
const category2 = [
  'going to gym',
  'learning to take a pictures',
  'photography',
  'flowers'
]

type ExtractTweets = ({ statuses: [Twitt] }) => Array<string>
// TODO use functional approach, maybe grab pictures and links ?
// here the images and links are cut out and are empty
const extractTweets: ExtractTweets = pipe(prop('statuses'), map(prop('text')))

type QueryTweets = Array<string> => Promise<Array<string>>
const queryTweets: QueryTweets = (searchQueries = category1) =>
  Promise.all(
    searchQueries
      .map(newQuery)
      .map(q => client.get('search/tweets', q)
        .then(extractTweets)))
    .then(flattenDeep)
    // TODO add translation to german support here, because stemmer for german can decrease accuracy
    .then(pipe(map(tokenizeAndStem), filter(Boolean), uniq))

const load = () => Promise.all([
  queryTweets(category1).then(saveToDb('category1')),
  queryTweets(category2).then(saveToDb('category2'))
])
// .then(console.log)
// .catch(console.error)

type QueryAndSave = (string, Array<string>) => Promise<string>
const queryAndSave: QueryAndSave =
  (categoryName = 'programming', searchQueries = category1) =>
    queryTweets(searchQueries).then(saveToDb(categoryName))

export {
  load, // simple usage for 2 categories
  queryAndSave, // get all the tweets that maches example keywords,
  queryTweets
}
