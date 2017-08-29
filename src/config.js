require('dotenv').config()

const config = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
}

const allKeysPresent = Object.values(config).filter(e => Boolean(e)).length === Object.keys(config).length
if (!allKeysPresent) {
  throw Error('Not all twitter data initialized')
}

module.exports = config
