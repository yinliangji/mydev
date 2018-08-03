let express = require('express');    //引入express模块
let Mock = require('mockjs');        //引入mock模块

let app = express();                //实例化express

let bodyParser = require('body-parser');//body-parser中间件来解析请求体

let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    if(req.method=="OPTIONS") {
      res.sendStatus("200");/*让options请求快速返回*/
    }else{
      next();
    }

    
};

let mockData = ()=>{
  return Mock.mock({
      "status": 200,
      "data|1-9": [{
          "name|5-8": /[a-zA-Z]/,
          "id|+1": 1,
          "value|0-500": 20
      }]
  })
}

let mockData2 = (val1,val2,val3 = 200)=>{
  return Mock.mock({
      "status": val3,
      "message":"xxxxxxx",
      "data": {
          "y":1 ,
          "lj": 2,
          "value":val1+val2,
          "userId":1234567890,
          "userKey":"====userKey===="
      }
  })
}



let mockDataList = (val1 = 200,val2 = 1,val3 = 3)=>{
  return Mock.mock({
      "status": val1,
      "message":"xxxxxxx",
      data:{
        "list|3-9":[ {
          "id|+1":1 ,
          "prj_id|+1":100,
          "prj_name|5-8":/[a-zA-Z]/,
          "prj_manager":"项目经理",
          "prj_desc":"项目描述",
          "prj_goal":"项目目标",
          "settle_time":"2018-01-01",
          "start_time":"2018-10-10",
          "end_time":"2018-12-10",
          "prj_type|0-1":0,
          "logic_sys_id":"logic_sys_id",
          "phycics_sys_id":"phycics_sys_id",
          "modules":"modules",
          "prod_id|+1":500,
          "prod_name|5-8":/[a-zA-Z]/,
          "__value2__page":val2,
          "__value3__pageline":val3,
          
      }],
      "total|3-9":3,
      "per_page|3-9":3,
      },
  })
}

app.use(allowCrossDomain);//运用跨域的中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(bodyParser.text());//运用中间件，对请求体的文本进行解析
app.use(express.static("vConsole"))


app.all('/json.action', function(req, res) {
  let resVal = mockData2(req.body.firstName,req.body.lastName,req.body.myStatus);
  console.log("req==>",req.body);
  console.log("resVal==>",resVal);
  //console.log(__dirname)
  //console.log("res==>",res);
  if(req.body.firstName == "yin"){
    res.json(mockData2(req.body.firstName,req.body.lastName,req.body.myStatus));
  }else{
    res.json(mockData());
  }
  //console.log("res==>",res); 
  res.end()
});


app.all('/project/all', function(req, res) {
  let resVal = mockDataList(req.body.myStatus,req.body.page,req.body.pageline);
  console.log("req==>",req.body);
  console.log("resVal==>",resVal);
  res.json(mockDataList(req.body.myStatus,req.body.page,req.body.pageline));
  res.end()
});


/**
 * 监听9090端口
 */
var server = app.listen('9090' , function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://127.0.0.1:"+port+"/json.action", host, port)
});


//  http://127.0.0.1:8090/test.action