const classify = require('../src/useClassifier')

test('category 1', () =>
  classify('code is what i do')
    .then(category => expect(category).toBe('category1')))

test('category 2', () =>
  classify('gym')
    .then(category => expect(category).toBe('category2')))
