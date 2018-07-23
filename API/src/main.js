import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import store from './vuex/store'
import promise from 'promise-polyfill';
!window.Promise && (window.Promise = promise);
import 'babel-polyfill'
import Lodash from 'lodash'
Vue.prototype._ = Lodash
Vue.use(iView)
Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$axios = axios

import '@/assets/css/normalize.css'
import '@/assets/css/reset.css'
import '@/assets/css/common.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
