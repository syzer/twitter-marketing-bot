import test from 'jest-t-assert'
import { pipeP } from 'ramda'
import { labelUser, bestLabelForUser } from '../../src/twitter/labelUser'

test('Can label user/AlainFrapolli to category1, which is important/programming', t =>
  pipeP(
    labelUser,
    ({ category1, category2 }) => t.true(category1 > category2))('AlainFrapolli'))

test('Can find best label/product for the user/AlainFrapolli', t =>
  pipeP(
    bestLabelForUser,
    (bestLabel) => t.deepEqual(bestLabel, 'category1'))('AlainFrapolli'))
