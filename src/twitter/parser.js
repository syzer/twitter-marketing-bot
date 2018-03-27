// @flow
import natural from 'natural'
import { join } from 'lodash'
import { pipe } from 'ramda'

const porterStemm = natural.PorterStemmer.tokenizeAndStem

// TODO consider storing links mentions, and users, emojis: separetly
const parseTweet = (str: string): string =>
  str.split(' ')
    .filter(word => !word.match(/^@(.+?)$/gi)) // remove mentions
    .filter(word => !word.match(/^http(s?):(.+)$/gi)) // remove urls
    .join(' ')
    .replace(/([.,:;!+&]+)/gi, ' $1 ') // separate punctuation
    .replace(/\s+/gi, ' ') // removing extra space

// https://stackoverflow.com/questions/18862256/how-to-detect-emoji-using-javascript
const isEmoji = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g

const joinWords = (arr: []): string => join(arr, ' ')

const addEmoji = (arr: [string], arr2: Array<string> | null): [string] => arr2
  // $FlowOk
  ? arr.concat(arr2)
  : arr

const tokenize = (str: string) => addEmoji(
  porterStemm(str),
  // $FlowOk
  str.match(isEmoji))

export const tokenizeAndStem = pipe(parseTweet, tokenize, joinWords)
