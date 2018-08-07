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

import axios from 'axios'
Vue.prototype.$axios = axios

Vue.use(iView)
Vue.config.productionTip = false

import goAgile from './components/goAgile/index.js'
Vue.use(goAgile);

import selectMenu from './components/selectMenu'
Vue.use(selectMenu);

import '@/assets/css/normalize.css'
import '@/assets/css/reset.css'
import '@/assets/css/common.css'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts;

Vue.filter('FALSEINFO', value => { // 交易明细
  if (!value) {
    return "没有数据"
  }else{
  	return value;
  }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})