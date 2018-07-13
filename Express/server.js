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
/**
 * 监听9090端口
 */
var server = app.listen('9090' , function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://127.0.0.1:"+port+"/json.action", host, port)
});


//  http://127.0.0.1:8090/test.action