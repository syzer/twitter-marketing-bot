// @flow
const natural = require('natural')
const { flow, join } = require('lodash')

const tokenize = natural.PorterStemmer.tokenizeAndStem
const joinWords = (arr: []): string => join(arr, ' ')

const parseTweet = (str: string): string =>
  str.split(' ')
    .filter(word => !word.match(/^@(.+?)$/gi)) // remove mentions
    .filter(word => !word.match(/^http(s?):(.+)$/gi)) // remove urls
    .join(' ')
    .replace(/([.,:;!+&]+)/gi, ' $1 ') // separate punctuation
    .replace(/\s+/gi, ' ') // removing extra space

const tokenizeAndStem = flow(parseTweet, tokenize, joinWords)

module.exports = {
  tokenizeAndStem
}
