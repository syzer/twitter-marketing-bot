const Twitter = require('twitter')
const { consumer_key, consumer_secret, access_token_key, access_token_secret } = require('./config')
const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret,
})

const params = { q: 'learning to code', count: 100 }

const getTweetTexts = (searchResult) => {
  const result = [];
  const statuses = searchResult.statuses;
  for (const tweet of statuses) {
    result.push(tweet.text);
  }
  return result;
};

client.get('search/tweets', params)
  .then(getTweetTexts)
  .then(console.log)
  .catch(console.error)
