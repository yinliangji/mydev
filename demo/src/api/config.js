import Qs from 'qs'
//baseURL: 'http://127.0.0.1:9090/',
const defaultSet = {
  method: 'post',
  url: 'json.action',
  baseURL:process.env.TEST_URL,
  data: {
    firstName: '_firstName',
    lastName: '_lastName'
  },
  transformRequest: [function (data) {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    console.log("========transformRequest=======",data)
    //data = JSON.stringify(data)
    //data = JSON.parse(JSON.stringify(data))
    data = Qs.stringify(data);
    //data = Qs.parse(data)
    return data;
  }],
   transformResponse: [function (data) {
    // 这里提前处理返回的数据
    console.log("============transformResponse================",data)
    return data;
  }],
   // 请求头信息
  headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}, //application/x-www-form-urlencoded;charset=UTF-8 //application/json

    //设置超时时间
  timeout: 5000,
  //返回数据类型
  responseType: 'json', // default
}
export default defaultSet