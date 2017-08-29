const Twitter = require('twitter')
const q = require('bluebird')
const { consumer_key, consumer_secret, access_token_key, access_token_secret } = require('./config')
const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret,
})

const params = { screen_name: 'nodejs' }

const promissedGet = new Promise((resolve, reject) => {

})
q.promisifyAll(client)

client.getAsync('statuses/user_timeline', params)
  .then(console.warn)
  .catch(console.error)
