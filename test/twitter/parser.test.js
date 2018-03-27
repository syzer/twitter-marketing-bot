import { tokenizeAndStem } from '../../src/twitter/parser'

test('stemming and tokenizing', () =>
  expect(tokenizeAndStem(`McAfee's own anti-hacking service exposed users to banking malware`))
    .toBe('mcafe anti hack servic expos user bank malwar'))

test('stemming and tokenizing', () =>
  expect(tokenizeAndStem(`If App Center is out of beta, when will @hockeyapp go away?`))
    .toBe('app center beta will go awai'))

test('stemming on UX emoticons heavy text', () =>
  expect(tokenizeAndStem(`zupa 😍🐗 https://t.co/XNkBBDBLcR`))
    .toBe(`zupa 😍 🐗`))
