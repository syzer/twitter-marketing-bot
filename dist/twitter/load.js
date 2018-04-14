'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryTweets = exports.queryAndSave = exports.load = undefined;

var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _lodash = require('lodash');

var _ramda = require('ramda');

var _parser = require('./parser');

var _db = require('../db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// extract tweets and save it to db
const {
  count,
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
} = require('../config');

const client = new _twitter2.default({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
});

const newQuery = e => ({ q: e + ' -RT', count });

// Interesting categories ( programming )
const category1 = ['learning to code', 'love software', 'javascript', 'java', 'VSAppCenter', 'hacking'];

// not interesting
const category2 = ['going to gym', 'learning to take a pictures', 'photography', 'flowers'];

// TODO use functional approach, maybe grab pictures and links ?
// here the images and links are cut out and are empty
const extractTweets = (0, _ramda.pipe)((0, _ramda.prop)('statuses'), (0, _ramda.map)((0, _ramda.prop)('text')));

const queryTweets = (searchQueries = category1) => Promise.all(searchQueries.map(newQuery).map(q => client.get('search/tweets', q).then(extractTweets))).then(_lodash.flattenDeep)
// TODO add translation to german support here, because stemmer for german can decrease accuracy
.then((0, _ramda.pipe)((0, _ramda.map)(_parser.tokenizeAndStem), (0, _ramda.filter)(Boolean), _lodash.uniq));

const load = () => Promise.all([queryTweets(category1).then((0, _db.saveToDb)('category1')), queryTweets(category2).then((0, _db.saveToDb)('category2'))]);
// .then(console.log)
// .catch(console.error)

const queryAndSave = (categoryName = 'programming', searchQueries = category1) => queryTweets(searchQueries).then((0, _db.saveToDb)(categoryName));

exports.load = load;
exports.queryAndSave = queryAndSave;
exports.queryTweets = queryTweets;