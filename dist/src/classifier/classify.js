'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classifyLabels = undefined;

var _ramda = require('ramda');

var _syzerLevelNaiveBayes = require('syzer-level-naive-bayes');

var _syzerLevelNaiveBayes2 = _interopRequireDefault(_syzerLevelNaiveBayes);

var _levelParty = require('level-party');

var _levelParty2 = _interopRequireDefault(_levelParty);

var _parser = require('../twitter/parser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO here allow change of db
const db = (0, _levelParty2.default)('./data/db');
const nb = (0, _syzerLevelNaiveBayes2.default)(db);

const classify = (0, _ramda.pipe)(_parser.tokenizeAndStem, nb.classifyAsync);
const classifyLabels = (0, _ramda.pipe)(_parser.tokenizeAndStem, nb.classifyLabelsAsync);

exports.default = classify;
exports.classifyLabels = classifyLabels;