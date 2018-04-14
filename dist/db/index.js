'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveToDb = undefined;

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _levelParty = require('level-party');

var _levelParty2 = _interopRequireDefault(_levelParty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO here ability to pick different db
const db = (0, _levelParty2.default)('./data/twitts');


const newKey = (category, id = _uuid2.default.v1()) => `${category}-${id}`;

const newPutOperation = category => value => ({
  type: 'put',
  key: newKey(category),
  value
});

// @see https://github.com/Level/levelup#batch
// $FlowOk
const saveToDb = exports.saveToDb = category => twitts => new Promise((resolve, reject) => db.batch(twitts.map(newPutOperation(category)), err => err ? reject(err) : resolve(twitts)));