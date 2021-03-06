#!/usr/bin/env node

'use strict'

//var logDebug = require('debug')('crypto-exchange-rates:test')

var exchangeRateSources = require("./lib/exchangeRateSources")

const pluginNames = [ 'coinbase', 'bitstamp', 'bitcoinaverage' ]
//const pluginNames = [ 'coinbase', 'bitstamp', 'bitcoinaverage', 'bravenewcoin' ]
const currencyPairs = [ { source: 'BTC', dest: 'USD' }, { source: 'ETH', dest: 'USD' } ]

console.log("pluginNames: ", pluginNames)
console.log("currencyPairs: ", currencyPairs)

pluginNames.forEach( function(name, index, array) {

  var plugin = new exchangeRateSources[name]

  var name = plugin.getName()
  console.log("getName() = ", name)

  var ret = plugin.getCurrencyPairs( currencyPairs, function(results) {
    console.log("RESULTS: %s: %o", name, results)
  })
})




