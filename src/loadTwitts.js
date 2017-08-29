const Twitter = require('twitter')
const { consumer_key, consumer_secret, access_token_key, access_token_secret } = require('./config')
const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
})

const params = { q: 'learning to code' }

client.get('search/tweets', params)
  .then(console.log)
  .catch(console.error)
