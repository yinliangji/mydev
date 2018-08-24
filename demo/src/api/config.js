import Qs from 'qs'
const defaultSet = {
  method: 'post',
  url: 'json.action',
  //baseURL:process.env.TEST_URL,
  baseURL:"",
  
  data: {
    defaultParams:Date.now(),
  },

  transformRequest: [function (data) {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    console.log("<======== 发送请求之前 transformRequest =======",data,"====>")

    // let formData = new FormData();
    // for (var I in data){
    //   formData.append(I, data[I]);
    // }
    // data = formData;
    
    data = JSON.stringify(data)
    //data = JSON.parse(JSON.stringify(data))
    //data = Qs.stringify(data);
    //data = Qs.parse(data)
    return data;
    
  }],

  transformResponse: [function (data) {
    // 这里提前处理返回的数据
    console.log("<========= 提前处理返回 transformResponse =======",data,"====>")
    return data;
  }],

   // 请求头信息
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    //"Cookie" : document.cookie + ';',
    //'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
    //multipart/form-data;charset=UTF-8 
    //application/x-www-form-urlencoded;charset=UTF-8 
    //application/json;charset=UTF-8
  },
    //设置超时时间
  timeout: 60000,

  //返回数据类型
  responseType: 'json', // default

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: true, // 默认的
}
export default defaultSet