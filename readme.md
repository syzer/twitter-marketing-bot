# wat

Marketing tool for twitter,
Find potential customers interested in ex: going to your gym, or interested in your hosted event (like leanpoker competition).

# how

## Get Twitter api access keys
and after 
```
cp .env.dist .env
```
put them in .env file

```bash
git clone https://github.com/syzer/twitter-marketing-bot.git
cd twitter-marketing-bot
npm install
cp .env.dist .env
# get your key from https://dev.twitter.com/resources/signup
# edit .env with all the kys 
npm start
```

## If build fails
you need working c++ compiler to compile leveldb database(it's like Sqllite but more key-valye and faster)
ex on mac:
```bash
xcode-select --install 
#and then 
sudo xcodebuild -license accept
```

# requirements

- node 8+
- npm


# use case

AKA leads generator.
Find people that would be potentially interested about you new product/promotion, like:

- ### gym
- ### programing
- ### photography

Extract tweets and build ML pipeline with:
```bash
node src/train.js
```

Use classifier, to figure out what category people are interested.

```bash
node src/classifier/classify.test.js
```

# Show stored twitts 
```bash
npm run view-twitts
```
and then:
```js
ls()
get(keyName)
```


# Test
## Type checking
```bash
npm run flow
```

## Unit tests
```bash
npm test
```


# Development
```bash
npm i -g babel-node
babel-node --version
```
