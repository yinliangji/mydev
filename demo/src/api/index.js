import Vue from 'vue'
import Common from '@/Common';
import config from '@/api/config'
//axios --->
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
/* Vue.prototype.axios = axios */
//axios <---

import * as errorCode from './error'
const {DemoURL_1,projectAll} = Common.restUrl;
let AXIOS = axios.create(config);

//AXIOS.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
//AXIOS.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

AXIOS.interceptors.request.use( (config) => {
	console.log("========AXIOS添加请求拦截器 config==========",config);
	return config;
},(error) => {
    // 对请求错误做些什么
    console.log("========AXIOS添加请求拦截器 error==========",error);
    return Promise.reject(error);
});

AXIOS.interceptors.response.use( (response) => {
    console.log("========AXIOS添加响应拦截器 response==========",response);
    //return response
    if (response) {
        return response
    }else{
        alert("没有获得 response")
    }
  
},(error) => {
    // 对响应错误做点什么
    console.log("========AXIOS添加响应拦截器 error==========",error);
    return Promise.reject(error);
});

export default {
    demoAXIOS (url, data = {}, reset = {}) {/* demo */
        let _url = url?url:DemoURL_1;
        return AXIOS.post(_url,data,reset)
    },
    projectAllAXIOS (url, data = {}, reset = {}) {/* demo */
        let _url = url?url:projectAll; 
        return AXIOS.post(_url,data,reset)
    },
   

}

