# wat

Marketing tool for twitter,
Find potential customers interested in ex: going to your gym, or intrereted in your hosted event (like leanpoker).

(requires node 8+)

# how

```bash
git clone https://github.com/syzer/twitter-marketing-bot.git
cd twitter-marketing-bot
npm install
cp .env.dist .env
# get your key from https://dev.twitter.com/resources/signup
# edit .env with all the kys 
npm start
```

# use case
## gym
## programing
## photography

Extract tweets and build ML pipeline with:
```bash
node src/newClassifier.js
```

Use classifier
```bash
node src/useClassifier.test.js
```

# show stored twitts 

```bash
npm run view-twitts
```
and then:
ls()
get(keyName)

# test
```bash
npm test
```
