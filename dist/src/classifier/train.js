'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.train = undefined;

var _syzerLevelNaiveBayes = require('syzer-level-naive-bayes');

var _syzerLevelNaiveBayes2 = _interopRequireDefault(_syzerLevelNaiveBayes);

var _level = require('level');

var _level2 = _interopRequireDefault(_level);

var _load = require('../twitter/load');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const db = (0, _level2.default)('./data/db');
const nb = (0, _syzerLevelNaiveBayes2.default)(db);

const train = (0, _load.load)().then(([category1, category2]) => Promise.all([category1.map(e => nb.trainAsync('category1', e)), category2.map(e => nb.trainAsync('category2', e))])).catch(console.error);

exports.train = train;