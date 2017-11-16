const natural = require('natural')
natural.PorterStemmer.attach()

// parseTweet :: String -> String
const parseTweet = str =>
  str.split(' ')
    .filter(word => !word.match(/^@(.+?)$/gi)) // remove mentions
    .filter(word => !word.match(/^http(s?):(.+)$/gi)) // remove urls
    .join(' ')
    .replace(/([.,:;!+&]+)/gi, ' $1 ') // separate punctuation
    .replace(/\s+/gi, ' ') // removing extra space

const tokenizeAndStem = str => parseTweet(str).tokenizeAndStem().join(' ')

module.exports = {
  tokenizeAndStem
}
