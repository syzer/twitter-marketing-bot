const Twitter = require('twitter')
const { consumer_key, consumer_secret, access_token_key, access_token_secret } = require('./config')
const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret,
})

const params = { screen_name: 'nodejs' }
client.get('statuses/user_timeline', params, (error, tweets, response) => {
  if (!error) {
    console.log(tweets)
  }
  console.error(error)
})
