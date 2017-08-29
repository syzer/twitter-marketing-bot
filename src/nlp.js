// example parsing couple (2) of tweets
const natural = require('natural')
natural.PorterStemmer.attach()
console.log('RT @pythonbot_: Python: 2 Books In 1: Tips And Tricks + Best Practices To Programming Code With Pyth  https://t.co/a46C2dlPAC #learning #py…\''.tokenizeAndStem().join(' '))
console.log('RT @teamswapspace: Would you love to give learning to code a shot? Then signup for our next batch of training'.tokenizeAndStem().join(' '))
// console.log('chainsaws'.stem())
