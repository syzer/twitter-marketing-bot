import test from 'jest-t-assert'
import { contains, filter, pipeP, length } from 'ramda'
import { queryTweets } from '../../src/twitter/load'

const fixture = ['insurance 2016', 'insurance 2017', 'travel insurance']

test('Can find tweets for insurance', t =>
  pipeP(
    queryTweets,
    filter(contains('insur')),
    length,
    tweets => t.true(tweets >= 100))(fixture))
