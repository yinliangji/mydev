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
const {DemoURL_1} = Common.restUrl;
let AXIOS = axios.create(config);

//AXIOS.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
//AXIOS.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
//AXIOS.defaults.headers['Content-Type'] = 'multipart/form-data;charset=UTF-8'

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
    demo2AXIOS (url, data = {}, reset = {}) {/* demo2 */
        let _url = url?url:DemoURL_1;
        return AXIOS.post(_url,data,reset)
    },
    defaultAXIOS (url, data = {}, reset = {}) {/* 敏捷项目列表 */
        if(!url){
            return new Promise((resolve, reject) => {reject("没有url")});
        }
        if(reset.method && /post/gi.test(reset.method)){
            return AXIOS.post(url,data,reset)
        }else if(reset.method && /delete/gi.test(reset.method)){
            return AXIOS.delete(url,Object.assign({params: data},reset));
        }else{
            return AXIOS.get(url,Object.assign({params: data},reset));
        }
    },
   

}

