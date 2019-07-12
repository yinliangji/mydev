import Vue from 'vue'
import Common from '@/Common';
import config from '@/api/config'
//axios --->
import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
Vue.use(VueAxios, axios);
let VM = new Vue(); 
/* Vue.prototype.axios = axios */
//axios <---

import * as errorCode from './error'
const {DemoURL_1} = Common.restUrl;
let AXIOS = axios.create(config);

AXIOS.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
//AXIOS.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
//AXIOS.defaults.headers['Content-Type'] = 'multipart/form-data'

AXIOS.interceptors.request.use( (config) => {
	//console.log("<========AXIOS添加【请求】拦截器 config==========",config,config.params,"====>");
    if(config){
        let mydata = Qs.parse(config.data);
        if(mydata && (!mydata.username || !mydata.prjSn)){
            if(!mydata.username){
                mydata.username = Common.getCookie("username") || "";    
            }
            if(!mydata.prjSn){
                mydata.prjSn = Common.getQueryString("prjSn",window.location.hash) || "";
            }
            config.data = mydata;
        }

        if(config.method == "get" && !config.params){
            config.params = {};
        }
        if(config.method == "get" && !config.params.username){
            config.params.username = Common.getCookie("username") || "";
        }
        if(config.method == "get" && !config.params.prjSn   ){
            let _prjSn = Common.getQueryString("prjSn",window.location.hash) || "";
            if(_prjSn){
                config.params.prjSn = _prjSn; 
            }
            
        }
        return config;
    }else{
        return Promise.reject("没有获得 config");
    }
	
},(error) => {
    // 对请求错误做些什么
    console.log("========AXIOS添加【请求】拦截器 error==========",error,"====>");
    return Promise.reject(error);
});

AXIOS.interceptors.response.use( (response) => {
    //console.log("========AXIOS添加 [响应] 拦截器 response==========",response,"====>");
    //return response
    if (response) {
        if(response.data && response.data.code && (response.data.code == 403 || response.data.code == 500)){
            if(response.data.code == 403){
                Common.CommonError(VM,response.data.message ? response.data.message : "权限错误");    
            }else{
                Common.CommonError(VM,response.data.message ? response.data.message : "服务器错误");
            }
            
            if(!response.data.message){response.data.message = "错误"}
            return Promise.reject(response);
        }
        return response
    }else{
        return Promise.reject("没有获得 response");
    }
},(error) => {
    // 对响应错误做点什么
    console.log("========AXIOS添加 [响应] 拦截器 error==========",error,"====>");
    return Promise.reject(error);
});

export default {
    demoPostAXIOS (url, data = {}, reset = {}) {/* demo */
        let _url = url?url:DemoURL_1;
        return AXIOS.post(_url,data,reset)
    },
    demoGetAXIOS (url, data = {}, reset = {}) {/* demo2 */
        let _url = url?url:DemoURL_1;
        return AXIOS.get(_url,{params:data},reset)
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

