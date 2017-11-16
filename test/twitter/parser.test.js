const {tokenizeAndStem} = require('../../src/twitter/parser')

test('stemming and tokenizing', () =>
  expect(tokenizeAndStem(`McAfee's own anti-hacking service exposed users to banking malware`))
    .toBe('mcafe anti hack servic expos user bank malwar'))
