'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://127.0.0.1:9090"',
  //SUB_BASE_URL: '"http://128.192.219.84:8006"',
  SUB_BASE_URL: '"http://127.0.0.1:9090"',
  TEST_URL:'"http://127.0.0.1:9090"'
})
