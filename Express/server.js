let express = require('express'); //引入express模块
let Mock = require('mockjs'); //引入mock模块
let app = express(); //实例化express
let bodyParser = require('body-parser'); //body-parser中间件来解析请求体
let myNumber = false;
let allowCrossDomain = function(req, res, next) {
    //console.log(res.req)
    //res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', ''+res.req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization,Cookie, Accept,X-Requested-With");
    if (req.method == "OPTIONS") {
        res.sendStatus("200"); /*让options请求快速返回*/
    } else {
        next();
    }
};



app.use(allowCrossDomain); //运用跨域的中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(bodyParser.text());//运用中间件，对请求体的文本进行解析
app.use(express.static("static/vConsole"))

let mockData = () => {
    return Mock.mock({
        "status": 200,
        "data|1-9": [{
            "name|5-8": /[a-zA-Z]/,
            "id|+1": 1,
            "value|0-500": 20
        }]
    })
}

let mockData2 = (val1, val2, val3 = 200) => {
    return Mock.mock({
        "status": val3,
        "message": "xxxxxxx",
        "data": {
            "y": 1,
            "lj": 2,
            "value": val1 + val2,
            "userId": 1234567890,
            "userKey": "====userKey===="
        }
    })
}



let menuGetMenu = (val1 = 0, val2 = 0, val3 = 200) => {
    return Mock.mock({
        "status": val3,
        "message": "menuGetMenu xxxxxxx",
        "data": {
            data: [],
        }
    })
}



let mockDataList = (val1 = "success", val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": val1,
        "message": "mockDataList xxxxxxx",
        data: {
            "list|3-9": [{
                "id": 1,
                "prj_id": 1,
                "prj_name|5-8": /[a-zA-Z0-9]/,
                "manager": /([a-zA-Z]{5,8})\|([a-zA-Z]{5,8})/,
                "prj_desc": "项目描述",
                "prj_goal": "项目目标",
                "settle_time": "@date(yyyy-MM-dd)",
                "start_time": "@date(yyyy-MM-dd)",
                "end_time": "@date(yyyy-MM-dd)",
                "prj_type|0-1": 0,
                "logic_sys_id": "logic_sys_id",
                "phycics_sys_id": "phycics_sys_id",
                "modules": "modules",
                "prod_id|+1": 500,
                "prod_name|5-8": /[a-zA-Z]/,
                "__value2__page": val2,
                "__value3__pageline": val3,

            }],
            "total|3-9": 3,
            "per_page|3-9": 3,
        },
       
    })
}

app.all('/json.action', function(req, res) {
    let resVal = mockData2(req.body.firstName, req.body.lastName, req.body.myStatus);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    //console.log(__dirname)
    //console.log("res==>",res);
    if (req.body.firstName == "yin") {
        res.json(mockData2(req.body.firstName, req.body.lastName, req.body.myStatus));
    } else {
        res.json(mockData());
    }
    //console.log("res==>",res); 
    res.end()
});





app.all('/project/all', function(req, res) {
    let resVal = mockDataList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(mockDataList(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});

app.all('/get_prj', function(req, res) {
    res.json([
        {
        id: 1,
        prj_name: "敏捷项目管理系统"
        },
        {
            id: 2,
            prj_name: "党群系统"
        },
        {
            id: 3,
            prj_name: "高校行政平台"
        },
        {
            id: 4,
            prj_name: "一体化研发平台"
        }
    ]);
    res.end()
});

app.all('/project/queryPrj_fromUser/', function(req, res) {
    res.json([
        {
            id: 1,
            prj_name: "敏捷项目管理系统"
        },
        {
            id: 2,
            prj_name: "党群系统"
        },
        {
            id: 3,
            prj_name: "高校行政平台"
        },
        {
            id: 4,
            prj_name: "一体化研发平台"
        }
    ]);
    res.end()
});


let listUserstoryList = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": val1,
        "message": "mockDataList xxxxxxx",
        "prj_name":"prj_name_xxxxxx",
        "product_name":"product_name_xxxxxxxx",
        "rows|3-5": [{
            "id": 1,
            "detail_id": 1,
            "userstory_id": 1,
            "userstory_name|5-8": /[a-zA-Z]/,
            "userstory_type|1-3": 1,
            "charger": "xiebei.zh",
            "nick_name":"谢蓓",
            //"charger": "@name",
            //"nick_name":"@cname",
            "userstory_status|1-4": 1,
            //"sprint_id": "迭代1",
            "proi|1-3": 1,
            "manHours": "10",
            "mission": "10",
            "phycics_sys_id": "phycics_sys_id",
            "icon": "/assets/images/user_02.png",

            "actual_online_time":"",
           
            "created_time":"2018-08-20 16:16:37",
            "last_chg_time":"",
            "last_chgr":"",
            "learn_concern":"",
            "plan_online_time":"",
            
            
            "proposer":"",
            "proposer_department":"",
            "req_id":"req_id_xxxxxx",
            "req_name":"",
            "sprint": 26,
            "sprint_name":26,
            "userstory_desc":"故事描述123123",

            "prj_id":"prj_id_xxxxxx",
            "prj_name":"敏捷项目0000",
            "prod_id":"product1",
            "product_name":"product_name_xxxxxxxx",




            
           
            
            



            "__value2__page": val2,
            "__value3__pageline": val3,

        }],
        "page_rows|9-16": 3,
        "per_page|9-16": 3,
    })
}

app.all('/userstory/listUserstory/', function(req, res) {
    let resVal = listUserstoryList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(listUserstoryList(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});

app.all('/userstory/addUserstory/', function(req, res) {
    let resVal = listUserstoryList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    let _data = 
        { 
            status: "success", 
            message: "ok" ,
            "prj_name":"敏捷项目0000_xxxxxx",
            "product_name":"product_name_xxxxxxxx",
            getReq_fromPrj:[
                {
                    comment: 'xxxxx',
                    id: 1,
                    prj:250,
                    prj_tyope:"1",
                    req_id:"prj_id_xxxxxx",
                    req_name:"装服务器",
                    req_submitter:"百某某",
                    settle_time:"2018-08-05",
                    status:"0",
                },
                {
                    comment: 'xxxxx',
                    id: 2,
                    prj:251,
                    prj_tyope:"1",
                    req_id:"req_id_xxxxxx",
                    req_name:"装服务器1",
                    req_submitter:"百某某1",
                    settle_time:"2018-08-05",
                    status:"0",
                },
            ],
            getSprintsByPrj:[
                {
                    "sprint": 25,
                    "sp_id": 25,
                    "sp_name": 25,
                },
                {
                    "sprint": 26,
                    "sp_id": 26,
                    "sp_name": 26,
                },
                {
                    "sprint": 27,
                    "sp_id": 27,
                    "sp_name": 27,
                },
            ],
            userstory_type:[
                {value:"用户需求",key:"1"},
                {value:"生产问题",key:"2"},
                {value:"自主创新",key:"3"},
            ]
            ,
            userstory_status:[
                {value:"提出",key:"1"},
                {value:"开发中",key:"2"},
                {value:"测试",key:"3"},
                {value:"上线",key:"4"},
            ],
            proi:[
                {value:"高",key:"1"},
                {value:"中",key:"2"},
                {value:"低",key:"3"},
            ],




        }
    
    res.json(_data);
    res.end()
});

app.all('/userstory/modifyUserstory/', function(req, res) {
    let resVal = listUserstoryList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json([{ status: "success", message: "ok" ,}]);
    res.end()
});




let sprintList = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": val1,
        "message": "mockDataList xxxxxxx",
        
        "sprintlist|3-6": [{
            "sprint|+1": 25,
            "sp_id|+1": 25,
            "sp_name|+1": 25,

            "__value2__page": val2,
            "__value3__pageline": val3,

        }],
        "page_rows|3-9": 3,
        "per_page|3-9": 3,
    })
}







app.all('/sprint/getSprintsByPrj', function(req, res) {
    let resVal = sprintList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(sprintList(req.body.myStatus));
    res.end()
});


let kanbanList = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock([

        {
            count:1,
            userstory_status:"提出",
            list:[
                {
                    userstory_name:"userstory_namexxxxx",
                    userstory_id:1212334,
                    charger:"chargerxxxxxx",
                    proi:1,
                    id:1,
                },
                {
                    userstory_name:"userstory_namexxxxx",
                    userstory_id:1212334,
                    charger:"chargerxxxxxx",
                    proi:2,
                    id:1,
                },
                {
                    userstory_name:"userstory_namexxxxx",
                    userstory_id:1212334,
                    charger:"chargerxxxxxx",
                    proi:3,
                    id:1,
                },
                {
                    userstory_name:"userstory_namexxxxx",
                    userstory_id:1212334,
                    charger:"chargerxxxxxx",
                    proi:2,
                    id:1,
                }
            ]
        },
        {
            count:1,
            userstory_status:"开发中",
            list:[
                {
                    userstory_name:"userstory_namexxxxx",
                    userstory_id:1212334,
                    charger:"chargerxxxxxx",
                    proi:2,
                    id:1,
                },
                {
                    userstory_name:"userstory_namexxxxx",
                    userstory_id:1212334,
                    charger:"chargerxxxxxx",
                    proi:3,
                    id:1,
                },
                {
                    userstory_name:"userstory_namexxxxx",
                    userstory_id:1212334,
                    charger:"chargerxxxxxx",
                    proi:1,
                    id:1,
                },
                {
                    userstory_name:"userstory_namexxxxx",
                    userstory_id:1212334,
                    charger:"chargerxxxxxx",
                    proi:1,
                    id:1,
                }
            ]
        },
        {
            count:1,
            userstory_status:"测试",
            list:[
                {
                    userstory_name:"userstory_namexxxxx",
                    userstory_id:1212334,
                    charger:"chargerxxxxxx",
                    proi:1,
                    id:1,
                },
                {
                    userstory_name:"userstory_namexxxxx",
                    userstory_id:1212334,
                    charger:"chargerxxxxxx",
                    proi:3,
                    id:1,
                },
                {
                    userstory_name:"userstory_namexxxxx",
                    userstory_id:1212334,
                    charger:"chargerxxxxxx",
                    proi:1,
                    id:1,
                },
                {
                    userstory_name:"userstory_namexxxxx",
                    userstory_id:1212334,
                    charger:"chargerxxxxxx",
                    proi:2,
                    id:1,
                }
            ]
        },
        {
            count:1,
            userstory_status:"上线",
            list:[
                {
                    userstory_name:"userstory_namexxxxx",
                    userstory_id:1212334,
                    charger:"chargerxxxxxx",
                    proi:3,
                    id:1,
                },
                {
                    userstory_name:"userstory_namexxxxx",
                    userstory_id:1212334,
                    charger:"chargerxxxxxx",
                    proi:1,
                    id:1,
                },
                {
                    userstory_name:"userstory_namexxxxx",
                    userstory_id:1212334,
                    charger:"chargerxxxxxx",
                    proi:3,
                    id:1,
                },
                {
                    userstory_name:"userstory_namexxxxx",
                    userstory_id:1212334,
                    charger:"chargerxxxxxx",
                    proi:2,
                    id:1,
                }
            ]
        }

    ])
}


app.all('/userstory/getUserStoryKanBan/', function(req, res) {
    let resVal = kanbanList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(kanbanList(req.body.myStatus));
    res.end()
});




let Userstorydetail = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
            "status": val1,
            "message": "mockDataList xxxxxxx",
            "id": 1,
            "detail_id": 1,
            "userstory_id": 1,
            "userstory_name|5-8": /[a-zA-Z]/,
            "userstory_type|1-3": 1,
            "charger": "谢呗",
            "userstory_status|1-4": 1,
            //"sprint_id": "迭代1",
            "proi|1-3": 1,
            "manHours": "20 | 10",
            "mission": "5 | 10",
            "phycics_sys_id": "phycics_sys_id",
            "icon": "/assets/images/user_02.png",

            "actual_online_time":"",
            "charger":"",
            "created_time":"2018-08-20 16:16:37",
            "last_chg_time":"",
            "last_chgr":"",
            "learn_concern":"",
            "plan_online_time":"",
            
            
            "proposer":"",
            "proposer_department":"",
            "req_id":"req_id_xxxxxx",
            "req_name":"",
            "sprint": 26,
            "sprint_name":26,
            "userstory_desc":"故事描述123123",

            "prj_id":"prj_id_xxxxxx",
            "prj_name":"敏捷项目0000",
            "prod_id":"product1",
            "product_name":"product_name_xxxxxxxx",




            
           
            
            



            "__value2__page": val2,
            "__value3__pageline": val3,

        })
}


app.all('/userstory/getUserStoryDetail', function(req, res) {
    let resVal = Userstorydetail(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    //res.json(Userstorydetail(req.body.myStatus));
    res.json(Userstorydetail({}));
    res.end()
});


app.post('/project/add', function(req, res) {
    let resVal = mockDataList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);


    //res.json(mockDataList(req.body.myStatus,req.body.page,req.body.pageline));
    res.json({ status: "success" });
    res.end()
});

app.all('/project/detail/1', function(req, res) {
    let resVal = detail(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(detail(req.body.myStatus));
    res.end()
});
app.all('/project/detail/2', function(req, res) {
    let resVal = detail(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(detail(req.body.myStatus));
    res.end()
});
app.all('/project/detail/3', function(req, res) {
    let resVal = detail(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(detail(req.body.myStatus));
    res.end()
});
app.all('/project/detail/4', function(req, res) {
    let resVal = detail(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(detail(req.body.myStatus));
    res.end()
});


let mockproductList = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": val1,
        "message": "mockDataList xxxxxxx",
        "data|5": [{
                "pid|+1": 1,
                "product_id|5-8": /[a-zA-Z]/,
                "product_name|5-8": /[a-zA-Z]/,
                "__value2__page": val2,
                "__value3__pageline": val3,
            }
        ],
    })
}



app.all('/get_prod/', function(req, res) {
    
    res.json(mockproductList(req.body.myStatus));
    res.end()
});



let GroupList = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": val1,
        "message": "mockDataList xxxxxxx",
        data: {
            "list": [
                {
                    value: 'New York',
                    label: 'New York人1'
                },
                {
                    value: 'London',
                    label: 'London人2'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney人3'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa人4'
                },
                {
                    value: 'Paris',
                    label: 'Paris人5'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra人6'
                }
            ],

        },
    })
}

let _GroupList = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": val1,
        "message": "mockDataList xxxxxxx",
        data: {
            "list": [
                {
                    value: '_New York',
                    label: '_New York人1'
                },
                {
                    value: '_London',
                    label: '_London人2'
                },
                {
                    value: '_Sydney',
                    label: '_Sydney人3'
                },
                {
                    value: '_Ottawa',
                    label: '_Ottawa人4'
                },
                {
                    value: '_Paris',
                    label: '_Paris人5'
                },
                {
                    value: '_Canberra',
                    label: '_Canberra人6'
                }
            ],

        },
    })
}

let GroupList_ = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": val1,
        "message": "mockDataList xxxxxxx",
        data: {
            "list": [
                {
                    value: 'New York_',
                    label: 'New York_人1'
                },
                {
                    value: 'London_',
                    label: 'London_人2'
                },
                {
                    value: 'Sydney_',
                    label: 'Sydney_人3'
                },
                {
                    value: 'Ottawa_',
                    label: 'Ottawa_人4'
                },
                {
                    value: 'Paris_',
                    label: 'Paris_人5'
                },
                {
                    value: 'Canberra_',
                    label: 'Canberra_人6'
                }
            ],

        },
    })
}

let trueorfalse = 0;
app.all('/agile/getUsers/', function(req, res) {

    let resVal
    let Json
    if(trueorfalse == 0){
        Json =  GroupList(req.body.myStatus)   
        resVal = GroupList(req.body.myStatus, req.body.page, req.body.pageline);
    }else if(trueorfalse == 1){
        Json =  _GroupList(req.body.myStatus) 
        resVal = _GroupList(req.body.myStatus, req.body.page, req.body.pageline);

    }else{
        Json =  GroupList_(req.body.myStatus)   
        resVal = GroupList_(req.body.myStatus, req.body.page, req.body.pageline);     
    }
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    trueorfalse = trueorfalse>1 ? 0 : trueorfalse+1
    console.log(trueorfalse)
    res.json(Json);
    res.end()
});

app.all('/system/loglist/', function(req, res) {

    let resVal
    let Json
    if(trueorfalse == 0){
        Json =  GroupList(req.body.myStatus)   
        resVal = GroupList(req.body.myStatus, req.body.page, req.body.pageline);
    }else if(trueorfalse == 1){
        Json =  _GroupList(req.body.myStatus) 
        resVal = _GroupList(req.body.myStatus, req.body.page, req.body.pageline);

    }else{
        Json =  GroupList_(req.body.myStatus)   
        resVal = GroupList_(req.body.myStatus, req.body.page, req.body.pageline);     
    }
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    trueorfalse = trueorfalse>1 ? 0 : trueorfalse+1
    console.log(trueorfalse)
    res.json(Json);
    res.end()
});

app.all('/system/phylist/', function(req, res) {

    let resVal
    let Json
    if(trueorfalse == 0){
        Json =  GroupList(req.body.myStatus)   
        resVal = GroupList(req.body.myStatus, req.body.page, req.body.pageline);
    }else if(trueorfalse == 1){
        Json =  _GroupList(req.body.myStatus) 
        resVal = _GroupList(req.body.myStatus, req.body.page, req.body.pageline);

    }else{
        Json =  GroupList_(req.body.myStatus)   
        resVal = GroupList_(req.body.myStatus, req.body.page, req.body.pageline);     
    }
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    trueorfalse = trueorfalse>1 ? 0 : trueorfalse+1
    console.log(trueorfalse)
    res.json(Json);
    res.end()
});



app.all('/project/allgroup/', function(req, res) {
    let resVal = GroupList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(GroupList(req.body.myStatus));
    res.end()
});
app.all('/project/managerGroup/', function(req, res) {
    let resVal = mockDataList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(GroupList(req.body.myStatus));
    res.end()
});
app.all('/project/developerGroup/', function(req, res) {
    let resVal = mockDataList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(GroupList(req.body.myStatus));
    res.end()
});
app.all('/project/testerGroup/', function(req, res) {
    let resVal = mockDataList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(GroupList(req.body.myStatus));
    res.end()
});




let storyGetReq = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": val1,
        "message": "mockDataList xxxxxxx",
        "data": [
            {
                comment: 'xxxxx',
                id: 1,
                prj:250,
                prj_tyope:"1",
                req_id:"prj_id_xxxxxx",
                req_name:"装服务器",
                req_submitter:"百某某",
                settle_time:"2018-08-05",
                status:"0",
            },
            {
                comment: 'xxxxx',
                id: 2,
                prj:251,
                prj_tyope:"1",
                req_id:"req_id_xxxxxx",
                req_name:"装服务器1",
                req_submitter:"百某某1",
                settle_time:"2018-08-05",
                status:"0",
            },
                
        ],
    })
}

app.all('/getReq_fromPrj/', function(req, res) {
    let resVal = storyGetReq(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(storyGetReq(req.body.myStatus));
    res.end()
});





let Role = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock([
                    {
                        "nick_name":"奇慧超",
                        "prj_id":"prj00010",
                        "role_name":"icdp_devTeam",
                        "user_name":"qihuichao",
                        "id":4,
                    },
                    {
                        "nick_name":"黄永华",
                        "prj_id":"prj00010",
                        "role_name":"icdp_devTeam",
                        "user_name":"huangyonghua",
                        "id":5,
                    },
                    {
                        "nick_name":"来咧",
                        "prj_id":"prj00010",
                        "role_name":"icdp_devTeam",
                        "user_name":"lailie",
                        "id":6,
                    },
                    {
                        "nick_name":"殷良骥",
                        "prj_id":"prj00010",
                        "role_name":"icdp_devTeam",
                        "user_name":"yinliangji",
                        "id":7,
                    },
    ])
}




app.all('/agile/getUsersByRole', function(req, res) {
    let resVal = Role(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(Role(req.body.myStatus));
    res.end()
});


let Condition = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock([
        {
            "value":"奇慧超",
            
            "key":4,
        },
        {
            "value":"黄永华",
            
            "key":5,
        },
        {
            "value":"来咧",
            
            "key":6,
        },
        {
            "value":"殷良骥",
           
            "key":7,
        },
        {
            "value":"谢蓓",
           
            "key":"xiebei.zh",
        },
    ])
}

app.all('/userstory/getUserstoryCondition', function(req, res) {
    let resVal = Condition(req.body.myStatus, req.body.page, req.body.pageline);
    //console.log("req==>", req.body);
    //console.log("resVal==>", resVal);
    
    console.log("res====>",res.req._parsedUrl.query,res.req._parsedUrl.query.indexOf("userstory_type"))
    

    let OBJECT = 
        {
            userstory_type:[
                {value:"用户需求",key:"1"},
                {value:"生产问题",key:"2"},
                {value:"自主创新",key:"3"},
            ]
            ,
            userstory_status:[
                {value:"提出",key:"1"},
                {value:"开发中",key:"2"},
                {value:"测试",key:"3"},
                {value:"上线",key:"4"},
            ],
            proi:[
                {value:"高",key:"1"},
                {value:"中",key:"2"},
                {value:"低",key:"3"},
            ],
            req_id:[
                {"value":"奇慧超","key":4,},
                {"value":"黄永华","key":5,},
                {"value":"来咧","key":6,},
                {"value":"殷良骥","key":7,},
            ],
            charger:[
                {"value":"奇慧超","key":4,},
                {"value":"黄永华","key":5,},
                {"value":"来咧","key":6,},
                {"value":"殷良骥","key":7,},
                {"value":"谢蓓","key":"xiebei.zh",},
            ],
            learn_concern:[
                {"value":"奇慧超","key":4,},
                {"value":"黄永华","key":5,},
                {"value":"来咧","key":6,},
                {"value":"殷良骥","key":7,},
            ],
            sprint:[
                {"value":"奇慧超","key":4,},
                {"value":"黄永华","key":5,},
                {"value":"来咧","key":6,},
                {"value":"殷良骥","key":7,},
            ],
            
        }
    
    res.json(OBJECT);
    res.end();
    return

    let obj = false;

    if(res.req._parsedUrl.query.indexOf("userstory_type") != -1){
        let _OBJ = [
            {value:"用户需求",key:"1"},
            {value:"生产问题",key:"2"},
            {value:"自主创新",key:"3"},
        ]
        obj = (P)=>{
            return _OBJ;
        }
        res.json(_OBJ);

    }else if(res.req._parsedUrl.query.indexOf("userstory_status") != -1){
        let _OBJ = [
            {value:"提出",key:"1"},
            {value:"开发中",key:"2"},
            {value:"测试",key:"3"},
            {value:"上线",key:"4"},
        ]
        obj = (P)=>{
            return _OBJ;
        }
        res.json(_OBJ);

    }else if(res.req._parsedUrl.query.indexOf("proi") != -1){
        let _OBJ = [
            {value:"高",key:"1"},
            {value:"中",key:"2"},
            {value:"低",key:"3"},
            
        ]
        obj = (P)=>{
            return _OBJ;
        }
        res.json(_OBJ);

        
    }else{
        res.json(Condition(req.body.myStatus));
    }

    
    res.end()
});



let getPermission = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "mockDataList xxxxxxx",
        prj_permission:[
            "icdp_pipeline_view",//0
            "icdp_proj_level",//1
            "icdp_userStory_mng",//2
            "icdp_codeRepo_mng",//3
            "icdp_devTask_view",//4
            "icdp_projOverview_view",//5
            "icdp_mainportal_view",//6
            "icdp_sprint_mng",//7
            "icdp_devTask_mng",//8
            "icdp_userStory_view",//9
            "icdp_projList_view",//10
            "icdp_pipelineLf_view",//11
            "icdp_agile_view",//12
            "icdp_projDetail_view",//13
            "icdp_workbench_view",//14
            "icdp_sshkey_mng",//15
            "icdp_codeRepo_view",//16
            "icdp_sshkey_view",//17
            "icdp_devWorkbench_view",//18
            "icdp_mngrWorkbench_view",//19
            "icdp_pipeline_mng",//20
            //"icdp_projList_edit",//21
            "icdp_sprint_view",//22
            "icdp_codeRepoLf_view",//23
            "icdp_projDetail_mng",//24

            //========
            //"icdp_projList_mng",//25
            //"icdp_projList_edit",//21
            //=======
            "icdp_prjrequirement_mng",
            "icdp_prjrequirement_view",
            "icdp_prjrequirement_edit",
        ],
        identity:"SuperAdmin",
        //PlainAdmin
        //SuperAdmin
        //Admin
    })
}

app.all('/auth/getPermissionfromUser', function(req, res) {
    let resVal = getPermission(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(getPermission(req.body.myStatus));
    res.end()
});



let changeUserstoryStatus = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "changeUserstoryStatus xxxxxxx",
        "no_complete_task_list|0-5":[
            {
                charger:"mahuachao.sc",
                comment:"<pre></pre>",
                create_time:"2018-09-18",
                design_desc:"<pre></pre>",
                fin_time:null,
                "id|+1":1,
                nick_name:"麻花超-中国建设银行",
                "prj_id|+1":401,
                relay_module_rec:"<pre></pre>",
                "sprint_id|+1":301,
                task_desc:"<pre></pre>",
                task_id:"TS-PJ800010-8",
                task_name:"@title",
                task_status:1,
                task_type:1,
                test_req:"<pre></pre>",
                "us_id|+1":501,
            }
        ],
        "__value2__": val1,
        "__value2__": val2,
        "__value3__": val3,
        
    })
}

app.all('/userstory/changeUserstoryStatus/', function(req, res) {
    let resVal = changeUserstoryStatus(req.body.myStatus, req.body.page, req.body.pageline);
    //console.log("resVal==>", resVal);
    console.log("req.body==>", req.body);
    console.log("req==userstory/changeUserstoryStatus==>", req._parsedUrl.query);
    if(req._parsedUrl.query.indexOf("userstory_status=4") != -1){
        res.json(changeUserstoryStatus(req.body.myStatus, req.body.page, req.body.pageline));
    }else{
        res.json({status:"success",no_complete_task_list:[]});
    }
    
    
    res.end()
});






app.all('/project/edit', function(req, res) {
    let resVal = detail(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(detail(req.body.myStatus));
    res.end()
});

app.post('/project/delete', function(req, res) {
    let resVal = mockDataList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);


    //res.json(mockDataList(req.body.myStatus,req.body.page,req.body.pageline));
    res.json({ status: "success" });
    res.end()
});




app.all('/menu/getMenu', function(req, res) {
    let resVal = menuGetMenu(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(menuGetMenu(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});




let addGroupList = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": val1,
        "message": "mockDataList xxxxxxx",
        data: [
            {
                cn_name:"ICDP超级管理员",
                create_tiem:"2018-08-13 11:05:01",
                description:"平台级别角色",
                domain:"",
                id:1,
                name:"icdp_superAdmin",
                order:0,
                reserve:false,
                sub_name:"",
            },
            {
                cn_name:"ICDP管理员",
                create_tiem:"2018-08-13 11:05:01",
                description:"平台级别角色",
                domain:"",
                id:2,
                name:"icdp_adminTeam",
                order:0,
                reserve:false,
                sub_name:"",
            },
            {
                cn_name:"ICDP配置管理员",
                create_tiem:"2018-08-13 11:05:01",
                description:"项目级别角色",
                domain:"",
                id:3,
                name:"icdp_confAdmin",
                order:0,
                reserve:false,
                sub_name:"",
            },
            {
                cn_name:"ICDP项目经理",
                create_tiem:"2018-08-13 11:05:01",
                description:"项目级别角色",
                domain:"",
                id:4,
                name:"icdp_projManager",
                order:0,
                reserve:false,
                sub_name:"",
            },
            {
                cn_name:"ICDP产品经理",
                create_tiem:"2018-08-13 11:05:01",
                description:"项目级别角色",
                domain:"",
                id:5,
                name:"icdp_prodManager",
                order:0,
                reserve:false,
                sub_name:"",
            },
            {
                cn_name:"ICDP小组长",
                create_tiem:"2018-08-13 11:05:01",
                description:"项目级别角色",
                domain:"",
                id:6,
                name:"icdp_teamLeader",
                order:0,
                reserve:false,
                sub_name:"",
            },
            {
                cn_name:"ICDP敏捷教练",
                create_tiem:"2018-08-13 11:05:01",
                description:"项目级别角色",
                domain:"",
                id:7,
                name:"icdp_agileCoach",
                order:0,
                reserve:false,
                sub_name:"",
            },
            {
                cn_name:"ICDP总体组",
                create_tiem:"2018-08-13 11:05:01",
                description:"项目级别角色",
                domain:"",
                id:8,
                name:"icdp_generalTeam",
                order:0,
                reserve:false,
                sub_name:"",
            },
            {
                cn_name:"ICDP测试组",
                create_tiem:"2018-08-13 11:05:01",
                description:"项目级别角色",
                domain:"",
                id:9,
                name:"icdp_testTeam",
                order:0,
                reserve:false,
                sub_name:"",
            },
            {
                cn_name:"ICDP开发组",
                create_tiem:"2018-08-13 11:05:01",
                description:"项目级别角色",
                domain:"",
                id:10,
                name:"icdp_devTeam",
                order:0,
                reserve:false,
                sub_name:"",
            },
        ],
    })
}

app.all('/agile/getRoles/', function(req, res) {
    let resVal = addGroupList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    
    res.json(addGroupList(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});




let listModule = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": val1,
        "message": "mockDataList xxxxxxx",
        
        "res": [
            {
                "physics_sys_id": 1,
                "func_desc|5-8":/[a-zA-Z0-9]/,
                "logic_sys_id":1,
                "module_id":"mid0001",
                "module_name":"模块1",
                "prod":1,
                "id":1,
                "__value2__": val2,
                "__value3__": val3,
            },
            {
                "physics_sys_id": 2,
                "func_desc|5-8":/[a-zA-Z0-9]/,
                "logic_sys_id":2,
                "module_id":"mid0002",
                "module_name":"模块2",
                "prod":2,
                "id":2,
                "__value2__": val2,
                "__value3__": val3,
            }
        ],
        
    })
}

app.all('/module/listModule/', function(req, res) {
    let resVal = listModule(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(listModule(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});

app.all('/auth/publishUser/', function(req, res) {
    res.json({nick_name:"谢蓓",user_name:"xiebei.zh"});
    res.end()
});



let reqList = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "mockDataList xxxxxxx",
        "data|3-5": [{
            "req_id|+1": 1,
            "req_submitter|5-8": /[a-zA-Z]/,
            "req_name|5-8": /[a-zA-Z0-9]/,
            "prj_type": 1,

            "__value2__page": val2,
            "__value3__pageline": val3,

        }],
        "total|3-9": 3,
    })
}

app.all('/req/queryReq/', function(req, res) {
    let resVal = reqList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(reqList(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});



app.all('/req/getReq/', function(req, res) {
    let D = false
    if(res.req._parsedUrl.query.indexOf("debug=true") != -1){
        D = {data:[{},{}], status: "success" }
    }else{
        D = {data:[], status: "success" }
    }
    res.json(D);
    res.end()
});

app.all('/req/addReq/', function(req, res) {
    res.json({ status: "fial" });
    res.end()
});

app.all('/req/deleteReq/', function(req, res) {
    res.json({ status: "success" });
    res.end()
});




let detail = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "detail xxxxxxx",
        data: {
            "id|+1": 1,
            "prj_id|+1": 100,

            "prj_name|5-8": /[a-zA-Z]/,
            "manager|6-10": /[a-zA-Z0-9]/,
            "prj_desc": "@title",
            "prj_goal": "项目目标",
            "prj_type": "2",
            "settle_time": "@date(yyyy-MM-dd)",
            "start_time": "@date(yyyy-MM-dd)",
            "end_time": "@date(yyyy-MM-dd)",
            
            "logic_sys_id": "logic_sys_id",
            "phycics_sys_id": "phycics_sys_id",
            "modules": "mid0001|mid0002|",
            "allgroup": "Canberra|London|",
            "managerGroup": "Sydney|Ottawa|",
            "developerGroup": "Paris|",
            "testerGroup": "Canberra|",
            "prod_id": "2",
            "pid": "2",
            "prod_name|5-8": /[a-zA-Z]/,
            AddGroupList: [
                {
                    myRef: "selfRef",
                    group: ["Canberra", "London", ],
                    groupList: [{
                            value: 'London',
                            label: 'London人2'
                        },
                        {
                            value: 'Canberra',
                            label: 'Canberra人6'
                        }
                    ],
                    myLabel: "总体组",
                    delBtn: false,
                    groupName: "allgroupList",
                    required: true,
                },
                {
                    myRef: "selfRef",
                    group: ["Sydney", "Ottawa", ],
                    groupList: [{
                            value: 'Sydney',
                            label: 'Sydney人3'
                        },
                        {
                            value: 'Ottawa',
                            label: 'Ottawa人4'
                        },
                    ],
                    myLabel: "项目经理",
                    delBtn: false,
                    groupName: "managerGroupList",
                    required: false,
                },
                {
                    myRef: "selfRef",
                    group: ["Paris", ],
                    groupList: [{
                        value: 'Paris',
                        label: 'Paris人5'
                    }, ],
                    myLabel: "开发组",
                    delBtn: true,
                    groupName: "developerGroupList",
                    required: false,
                },
                {
                    myRef: "selfRef",
                    group: ["Canberra", ],
                    groupList: [{
                        value: 'Canberra',
                        label: 'Canberra人6'
                    }],
                    myLabel: "测试组",
                    delBtn: true,
                    groupName: "testerGroupList",
                    required: false,
                },
            ],
            modulesAdd: "",
            "__value2__page": val2,
            "__value3__pageline": val3,
        },
        "person|0-10":[
            {
                "title|+1":["ICDP超级管理员","ICDP管理员","ICDP配置管理员","ICDP项目经理","ICDP产品经理","ICDP小组长","ICDP敏捷教练","ICDP总体组","ICDP开发组"],
                "member|1-10":[
                    {
                        "nick_name|1":'@cname',
                        "prj_id|5-10":/[a-zA-Z0-9]/,
                        "role_name":/[a-zA-Z]{5,8}/,
                        "user_name":'@name',
                        "id|+1":100,
                    },
                ]
            }
        ],
        person_:[

            {
                "title":"产品经理",
                "member":[
                    {
                        "nick_name":"李卓",
                        "prj_id":"prj00010",
                        "role_name":"icdp_prodManager",
                        "user_name":"lizhuo.zh",
                        "id":4,
                    },
                   
                ],
            },

            {
                "title":"项目经理",
                "member":[
                    {
                        "nick_name":"谢蓓",
                        "prj_id":"prj00010",
                        "role_name":"icdp_projManager",
                        "user_name":"xiebei.zh",
                        "id":4,
                    },
                   
                ],
            },

            {
                "title":"开发组",
                "member":[
                    {
                        "nick_name":"奇慧超",
                        "prj_id":"prj00010",
                        "role_name":"icdp_devTeam",
                        "user_name":"qihuichao",
                        "id":4,
                    },
                    {
                        "nick_name":"黄永华",
                        "prj_id":"prj00010",
                        "role_name":"icdp_devTeam",
                        "user_name":"huangyonghua",
                        "id":5,
                    },
                    {
                        "nick_name":"来咧",
                        "prj_id":"prj00010",
                        "role_name":"icdp_devTeam",
                        "user_name":"lailie",
                        "id":6,
                    },
                    {
                        "nick_name":"殷良骥",
                        "prj_id":"prj00010",
                        "role_name":"icdp_devTeam",
                        "user_name":"yinliangji",
                        "id":7,
                    },
                ],
            },

            {
                "title":"超级管理员",
                "member":[
                    {
                        "nick_name":"谢蓓22",
                        "prj_id":"prj00010",
                        "role_name":"icdp_projManager",
                        "user_name":"xiebei.zh",
                        "id":4,
                    },
                   
                ],
            },
              
            {
                "title":"管理员",
                "member":[
                    {
                        "nick_name":"谢蓓3333",
                        "prj_id":"prj00010",
                        "role_name":"icdp_projManager",
                        "user_name":"xiebei.zh",
                        "id":4,
                    },
                   
                ],
            },

            {
                "title":"配置管理员",
                "member":[
                    {
                        "nick_name":"谢蓓444",
                        "prj_id":"prj00010",
                        "role_name":"icdp_projManager",
                        "user_name":"xiebei.zh",
                        "id":4,
                    },
                   
                ],
            },

            {
                "title":"小组长",
                "member":[
                    {
                        "nick_name":"谢蓓2555",
                        "prj_id":"prj00010",
                        "role_name":"icdp_projManager",
                        "user_name":"xiebei.zh",
                        "id":4,
                    },
                   
                ],
            },

            {
                "title":"敏捷教练",
                "member":[
                    {
                        "nick_name":"谢蓓6666",
                        "prj_id":"prj00010",
                        "role_name":"icdp_projManager",
                        "user_name":"xiebei.zh",
                        "id":4,
                    },
                   
                ],
            },

            {
                "title":"测试组",
                "member":[
                    {
                        "nick_name":"谢蓓777",
                        "prj_id":"prj00010",
                        "role_name":"icdp_projManager",
                        "user_name":"xiebei.zh",
                        "id":4,
                    },
                   
                ],
            },

            {
                "title":"总体组",
                "member":[
                    {
                        "nick_name":"谢蓓888",
                        "prj_id":"prj00010",
                        "role_name":"icdp_projManager",
                        "user_name":"xiebei.zh",
                        "id":4,
                    },
                   
                ],
            },
            /*
            */         
        ],
        role_user_info:[
            {
                "title":"产品经理",
                "member":[
                    {
                        "nick_name":"李卓",
                        "prj_id":"prj00010",
                        "role_name":"icdp_prodManager",
                        "user_name":"lizhuo.zh",
                        "id":4,
                    },
                   
                ],

            },
            {
                "title":"项目经理",
                "member":[
                    {
                        "nick_name":"谢蓓",
                        "prj_id":"prj00010",
                        "role_name":"icdp_projManager",
                        "user_name":"xiebei.zh",
                        "id":4,
                    },
                   
                ],

            },
            {
                "title":"开发组",
                "member":[
                    {
                        "nick_name":"奇慧超",
                        "prj_id":"prj00010",
                        "role_name":"icdp_devTeam",
                        "user_name":"qihuichao",
                        "id":4,
                    },
                    {
                        "nick_name":"黄永华",
                        "prj_id":"prj00010",
                        "role_name":"icdp_devTeam",
                        "user_name":"huangyonghua",
                        "id":5,
                    },
                    {
                        "nick_name":"来咧",
                        "prj_id":"prj00010",
                        "role_name":"icdp_devTeam",
                        "user_name":"lailie",
                        "id":6,
                    },
                    {
                        "nick_name":"殷良骥",
                        "prj_id":"prj00010",
                        "role_name":"icdp_devTeam",
                        "user_name":"yinliangji",
                        "id":7,
                    },
                ],

            },
        ],
        logicSystem:[
            {
                value: 'Canberra',
                label: 'Canberra人6'
            },
            {
                value: 'London',
                label: 'London人2'
            },
        ],
        phySystem:[
            {
                value: 'London',
                label: 'London人2'
            },
        ],
    })
}


app.all('/userstory/getDefaultSpringIdByPrj/1', function(req, res) {
    res.json({ status: "success",data:"7" });
    res.end()
});
app.all('/userstory/getDefaultSpringIdByPrj/2', function(req, res) {
    res.json({ status: "success",data:"6" });
    res.end()
});
app.all('/userstory/getDefaultSpringIdByPrj/3', function(req, res) {
    res.json({ status: "success",data:"5" });
    res.end()
});
app.all('/userstory/getDefaultSpringIdByPrj/4', function(req, res) {
    res.json({ status: "success",data:"4" });
    res.end()
});




let missionChangeList = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "message xxxxxxx",
        limit:10,
        page:1,
        page_rows:10,
        pegeno:1,
        "rows|3-5":[{
            change_time:"2018-09-12 10:27:22",
            "id|+1":280,
            operator_id:"xiebei.zh",
            operator_name:"谢蓓",
            "task_id|+1":110,
            userstory_status:"未开始",
            "userstory_id|6-10":/[a-zA-Z0-9]/,
        }],
        table_id:"listview_bable",

        "data|3-5": [{
            "req_id|+1": 1,
            "req_submitter|5-8": /[a-zA-Z]/,
            "req_name|5-8": /[a-zA-Z0-9]/,
            "prj_type": 1,

            "__value2__page": val2,
            "__value3__pageline": val3,

        }],

        "total|3-9": 3,
    })
}




app.all('/userstoryEvo/list/', function(req, res) {
    let resVal = missionChangeList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(missionChangeList(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});


let filedown = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "message xxxxxxx",
        "files|3-5":[{
            created_time:"@date(yyyy-MM-dd)",
            creater:"@cname",
            "fileId|+1":280,
            "fileName|5-10":/[a-zA-Z0-9]/,
            file_path:"files/xxxxx/xxx.jpg",
            filesize:"162M",
            url:"/uploads/files/xxx.jpg",
            
        }],
        "total|10-20": 1,
    })
}

app.all('/uploadfiles/getuploadedfiles/', function(req, res) {
    let resVal = filedown(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(filedown(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});

app.all('/uploadfiles/upload_file/', function(req, res) {
    let resVal = filedown(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json({status: "success",message: "success",});
    res.end()
});
app.all('/uploadfiles/delete_file/', function(req, res) {
    let resVal = filedown(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json({status: "success",message: "delete success",});
    res.end()
});

/************qhc */
let mockIterationList = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": val1,
        "message": "success",
        "rows|3-9": [{
            "id": 1,
            "prj_id|+1": 1, //所属项目
            "sprint_id|5-8": /[0-9a-zA-Z]/, //迭代编号
            "sprint_name|5-8": /[0-9a-zA-Z]/, //迭代名称
            "start_time": "2018-10-10",
            "end_time": "2018-12-10",
            "status": "进行中"
        }],
        "total|3-9": 3,
        "per_page|3-9": 3,
    })
}
app.all('/sprint/listSprint', function(req, res) {
    res.json(mockIterationList(req.body.myStatus));
    res.end()
});
app.all('/login_save', function(req, res) {
    res.json({});
    res.end()
});
/*************qhc */
/**
 * 监听9090端口
 */
var server = app.listen('9090', function() {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://127.0.0.1:" + port + "/json.action", host, port)
});


//  http://127.0.0.1:8090/test.action