const chai = require('chai');
//        }).then(function(results) {
const { expect } = chai;

const exchangeRateSources = require('../exchangeRateSources.js');

const pluginExchangeNames = [
  'coinbase',
  'bitstamp',
  'bitcoinaverage',
  'bravenewcoin'
]

// all the allowed pairs for each exchange
const maxPairs = {
  coinbase: [
    'BTC-USD', 'BTC-EUR', 'ETH-USD', 'ETH-EUR'
  ],
  bitstamp: [
    'BTC-USD', 'BTC-EUR', 'EUR-USD', 'XRP-USD', 'XRP-EUR', 'XRP-BTC',
  ],
  bitcoinaverage: [
    'BTC-USD'
  ],
  bravenewcoin: [
    'BTC-USD', 'BTC-EUR', 'ETH-USD', 'ETH-EUR' 
  ],
}

describe('Positive cases', function() {
  pluginExchangeNames.forEach(function(exchangeName, index, array) {

    var plugin = require('../exchangeRateSources.js')[exchangeName];

    describe(exchangeName + ' exchangeRateLib:', function() {
      it('exchangeRateLib object', done => {
        expect(exchangeName).a('string')
        expect(plugin).an('object')
        expect(plugin).keys('getName', 'getCurrencyPairs')
        expect(plugin.getName).a('function')
        expect(plugin.getCurrencyPairs).a('function')
        done()
      })
    })

    describe(exchangeName + '.getName()', function() {
      it('getName() = ' + exchangeName, done => {
        var name = plugin.getName()
        expect(name).a('string')
        expect(name).equals(exchangeName)
        done()
      })
    })

    describe(exchangeName + '.getCurrencyPairs() BTC-USD', function() {
      const pairs = [ { source: 'BTC', dest: 'USD' } ]
      it(`getCurrencyPairs(${pairs})`, done => {
        var results = plugin.getCurrencyPairs(pairs, function(results) {
          expect(results).an('array')
          expect(results.length).equals(1)
          expect(results).keys('source', 'dest', 'value')
          expect(results.source).a('string')
          expect(results.dest).a('string')
          expect(results.value).a('string')
        })
        done()
      })
    })

    describe(exchangeName + '.getCurrencyPairs() BTC-USD', function() {
      const pairs = maxPairs[exchangeName]
      it(`getCurrencyPairs(${pairs})`, done => {
        var results = plugin.getCurrencyPairs(pairs, function(results) {
          expect(results).an('array')
          expect(results.length).equals(1)
          expect(results).keys('source', 'dest', 'value')
          expect(results.source).a('string')
          expect(results.dest).a('string')
          expect(results.value).a('string')
        })
        done()
      })
    })


  })
})


