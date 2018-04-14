// @flow
import test from 'jest-t-assert'
import classify, { classifyLabels } from '../../src/classifier/classify'

test('category 1', t =>
  classify('code is what i do')
    .then(category => t.deepEqual(category, 'category1')))

test('category 2', t =>
  classify('gym makes you stronger')
    .then(category => t.deepEqual(category, 'category2')))

test('category 1 on javascript', t =>
  classify('Live code and debug with your friends')
    .then(category => t.deepEqual(category, 'category1')))

test('category 1 on java', t =>
  classify('Ship five-star apps faster and with more confidence')
    .then(category => t.deepEqual(category, 'category1')))

test('category 1 on xamarin', t =>
  classify('If App Center is out of beta, when will @hockeyapp go away?')
    .then(category => t.deepEqual(category, 'category1')))

test('category 1 on hacking', t =>
  classify('McAfee\'s own anti-hacking service exposed users to banking malware')
    .then(category => t.deepEqual(category, 'category1')))

test('Can get all log probabilities', t =>
  classifyLabels('HR likes flowers')
    .then(categories => {
      // most fitting category is:
      const { label, logProb } = categories.shift()
      t.deepEqual(label, 'category2')
      // our spam category
      t.true(logProb < 0)
      // ahh... JS math
      // try 0 < 1 < 2 vs 1 < 0 < 2 vs 0 < 2 < 1

      // what about least likely category?
      const { label: leastLikelyLabel, logProb: leastLikelyLogProb } = categories.pop()
      t.deepEqual(leastLikelyLabel, 'category1')
      // which is programming
      t.true(leastLikelyLogProb < 0)
      // And now it's official:
      // clearly we can see that HR is as farther away from programming as possible
    }))

test('Can get all log probabilities2', t =>
  classifyLabels('Hacker way of life')
    .then(categories => {
      const { label, logProb } = categories.shift()
      t.deepEqual(label, 'category1')
      t.true(logProb < 0)
      // it mean that Hacking is about programming

      const { label: leastLikelyLabel, logProb: leastLikelyLogProb } = categories.pop()
      t.deepEqual(leastLikelyLabel, 'category2')
      t.true(leastLikelyLogProb < 0)
      // and not about flowers and HR
    }))
