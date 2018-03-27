import classify from '../../src/classifier/classify'

test('category 1', () =>
  classify('code is what i do')
    .then(category => expect(category).toBe('category1')))

test('category 2', () =>
  classify('gym')
    .then(category => expect(category).toBe('category2')))

test('category 1 on javascript', () =>
  classify('Live code and debug with your friends')
    .then(category => expect(category).toBe('category1')))

test('category 1 on java', () =>
  classify('Ship five-star apps faster and with more confidence')
    .then(category => expect(category).toBe('category1')))

test('category 1 on xamarin', () =>
  classify('If App Center is out of beta, when will @hockeyapp go away?')
    .then(category => expect(category).toBe('category1')))

test('category 1 on hacking', () =>
  classify('McAfee\'s own anti-hacking service exposed users to banking malware')
    .then(category => expect(category).toBe('category1')))
