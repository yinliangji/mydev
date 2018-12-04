'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

var getLocation = '"//127.0.0.1:9090"'
var file_zuul_rul = '"/zuul/ag_e"'
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: getLocation,
  SUB_BASE_URL: getLocation,
  TEST_URL:getLocation,
  BASE_ZUUL_URL: file_zuul_rul,
})

