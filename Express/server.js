let express = require('express'); //引入express模块
let Mock = require('mockjs'); //引入mock模块

let app = express(); //实例化express

let bodyParser = require('body-parser'); //body-parser中间件来解析请求体

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    if (req.method == "OPTIONS") {
        res.sendStatus("200"); /*让options请求快速返回*/
    } else {
        next();
    }


};

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



let mockDataList = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": val1,
        "message": "mockDataList xxxxxxx",
        data: {
            "list|3-9": [{
                "id": 1,
                "prj_id": 1,
                "prj_name|5-8": /[a-zA-Z]/,
                "prj_manager": "项目经理",
                "prj_desc": "项目描述",
                "prj_goal": "项目目标",
                "settle_time": "2018-01-01",
                "start_time": "2018-10-10",
                "end_time": "2018-12-10",
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





let detail = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "detail xxxxxxx",
        data: {
            "id|+1": 1,
            "prj_id|+1": 100,

            "prj_name|5-8": /[a-zA-Z]/,
            "prj_manager": "项目经理",
            "prj_desc": "项目描述",
            "prj_goal": "项目目标",
            "prj_type": "2",
            "settle_time": "2018-01-01",
            "start_time": "2018-10-10",
            "end_time": "2018-12-10",
            
            "logic_sys_id": "logic_sys_id",
            "phycics_sys_id": "phycics_sys_id",
            "modules": "模块1-1|模块2-2|",
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
        person:[
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
                "title":"项目经理22",
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
                "title":"项目经理33",
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
                "title":"项目经理44",
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
                "title":"项目经理55",
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
                "title":"项目经理66",
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
        ],
    })
}



app.use(allowCrossDomain); //运用跨域的中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(bodyParser.text());//运用中间件，对请求体的文本进行解析
app.use(express.static("static/vConsole"))


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


let listUserstoryList = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": val1,
        "message": "mockDataList xxxxxxx",
        "rows|3-5": [{
            "id": 1,
            "userstory_id": 1,
            "userstory_name|5-8": /[a-zA-Z]/,
            "userstory_type": "产品需求",
            "charger": "谢呗",
            "userstory_status": "已完成",
            "sprint_id": "迭代1",
            "proi|1-3": 1,
            "manHours": "20 | 10",
            "mission": "5 | 10",
            "phycics_sys_id": "phycics_sys_id",
            "icon": "/assets/images/user_02.png",

            "__value2__page": val2,
            "__value3__pageline": val3,

        }],
        "page_rows|3-9": 3,
        "per_page|3-9": 3,
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
    res.json({ status: 200, message: "ok" });
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


app.all('/project/allgroup/', function(req, res) {
    let resVal = mockDataList(req.body.myStatus, req.body.page, req.body.pageline);
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
app.all('/project/addGroup/', function(req, res) {
    let resVal = mockDataList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(GroupList(req.body.myStatus));
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

app.all('/rbac/getRoles/', function(req, res) {
    let resVal = addGroupList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    
    res.json(addGroupList(req.body.myStatus, req.body.page, req.body.pageline));
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