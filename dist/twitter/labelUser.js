'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bestLabelForUser = exports.fetchUserStatuses = exports.labelUser = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ramda = require('ramda');

var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _classify = require('../classifier/classify');

var _classify2 = _interopRequireDefault(_classify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
} = require('../config');
// TODO nodemon -q -w ./src/ -e js -x 'babel-node src/twitter/labelUser.js'


const client = new _twitter2.default({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
});

const fetchUserStatuses = (user, howMany = 200) => client.get('statuses/user_timeline', {
  screen_name: user,
  include_rts: false,
  count: howMany
});

const labelUser = (twitterHandle
// $FlowOk
) => fetchUserStatuses(twitterHandle).then((0, _ramda.pluck)('text')).then(twitts => Promise.all(twitts.map(_classify2.default))).then((0, _ramda.countBy)(_ramda.identity));

const bestLabelForUser = (0, _ramda.pipeP)(labelUser, _ramda.toPairs, (0, _ramda.sortBy)(_ramda.last), _ramda.last, _ramda.head);

exports.labelUser = labelUser;
exports.fetchUserStatuses = fetchUserStatuses;
exports.bestLabelForUser = bestLabelForUser;

// the cli mode

if (!module.parent) {
  const twitterHandle = 'AlainFrapolli';

  labelUser(twitterHandle).then(categories => (0, _lodash2.default)(categories).countBy(a => a === 'category1').toPairs().map(e => e.pop()).value()).then(([category1, category2]) => category1 > category2 ? 'category1' : 'category2').then(e => console.log(`User will more like category: ${e}`)).catch(console.error);
}