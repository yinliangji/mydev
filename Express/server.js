let express = require('express'); //引入express模块
let Mock = require('mockjs'); //引入mock模块
let app = express(); //实例化express
let bodyParser = require('body-parser'); //body-parser中间件来解析请求体
let myNumber = false;
let itemNumber = 9;
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





let menuGetMenu = (val1 = 0, val2 = 0, val3 = 200) => {
    return Mock.mock({
        "status": val3,
        "message": "menuGetMenu xxxxxxx",
        "data": {
            data: [],
        }
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


let mockDataList = (val1 = "success", val2 = 1, val3 = 3) => {

    let _manager = ["lizhuo.zh(李卓-中国建设银行北京开发中心)|miaoxinyu.zh(苗新宇-中国建设银行北京开发中心)","miaoxinyu.zh(苗新宇-中国建设银行北京开发中心)","lizhuo.zh(李卓-中国建设银行北京开发中心)|miaoxinyu.zh(苗新宇-中国建设银行北京开发中心)|xiebei.zh(谢蓓-中国建设银行北京开发中心)","lizhuo.zh(李卓-中国建设银行北京开发中心)|miaoxinyu.zh(苗新宇-中国建设银行北京开发中心)","lizhuo.zh(李卓-中国建设银行北京开发中心)","xiebei.zh(谢蓓-中国建设银行北京开发中心)"]

    //((N)=>{let num;if(N<=0.2){num = 0;}else if(N>0.2 && N<0.4){num = 1;}else if(N>=0.4 && N<0.6){num = 2;}else if(N>=0.6 && N<0.8){num = 3;}else{num = 4;}return _manager[num];})(Math.random())    
    let fn = (N,arr)=>{
        let num;
        if(N<=0.2){
            num = 0;
        }else if(N>0.2 && N<0.4){
            num = 1;
        }else if(N>=0.4 && N<0.6){
            num = 2;
        }else if(N>=0.6 && N<0.8){
            num = 3;
        }else{
            num = 4;
        }
        return arr[num];
    }
    let _modules = ["MD-PJ1901790-68|MD-PJ1901790-67|MD-PJ1901790-66","MD-PJ1901790-67|MD-PJ1901790-66","MD-PJ1901790-68|MD-PJ1901790-67","MD-PJ1901790-67","MD-PJ1901790-68","MD-PJ1901790-68"]
    let _logic_sys_id = ["A0920","A0920","A0920","A0920","A0920","A0920"];
    let _phycics_sys_id = ["W09020|TA2230","W09020","TA2230","TA2230|W09020","W09020"];
    let list = [];
    let obj = {};

    for(let i =1;i<10;i++){
        let _prj_type = ((N)=>{return N >0.5?1:2 })(Math.random())
        obj.id = i;
        obj.prj_id = "PJ10000"+i;
        obj.itm_id_sn = "Itm10000"+i;
        obj.prj_name = /([a-zA-Z0-9]{5,128})/;
        obj.manager = fn(Math.random(),_manager);
        obj.prj_desc = "项目描述"+i;
        obj.prj_goal = "项目目标"+i;
        obj.settle_time = "2019-0"+i+"-01";
        obj.start_time = "2019-0"+i+"-12";
        obj.end_time = "2019-0"+i+"-23";
        obj.prj_type = _prj_type;
        obj.itm_url = _prj_type == 1 ?"http://www.baidu.com":"";
        obj.logic_sys_id = fn(Math.random(),_logic_sys_id);
        obj.phycics_sys_id = fn(Math.random(),_phycics_sys_id);
        obj.modules = fn(Math.random(),_modules);
        obj.isEdit = ((N)=>{return N >0.5?true:false })(Math.random());
        obj.prod_id = "prod_id"+i;
        obj.prod_name =  "prod_name"+i;
        obj.status = 0;
        obj.status_name = "ACTIVE";
        obj.itm_status = ((N)=>{return N >0.5?"1":"2" })(Math.random());
        obj.itm_aply_id = "xxxxx,jjjjj,kkkkk";
        obj.subject_sn = "su-0000";
        obj.subject_name = "su-0000Name";
        list.push(obj);
        obj = {};

    }
    return Mock.mock({
        "status": val1,
        "message": "mockDataList xxxxxxx",
        data: {
            "_list|9": [{
                "id|+1": 1,
                "prj_id|+1":1,
                "prj_name|5-148": /[a-zA-Z0-9]/,
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
                "isEdit|1": [true,true,true,true,true,"true",true,false,null,undefined,0,NaN,"false","null","undefined","NaN","NaN-aN-aN","0"],
                "prod_id|+1": 500,
                "prod_name|5-8": /[a-zA-Z]/,
                "__value2__page": val2,
                "__value3__pageline": val3,

            }],
            list:list,
            "total|19-29": 3,
            "per_page|9-19": 3,
        },
       
    })
}



app.all('/project/all', function(req, res) {
    let resVal = mockDataList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(mockDataList(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});

let detail = (val1 = 200,num, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "detail xxxxxxx",
        data: {
            "create_person":"xiebei.zh",
            "id": num,
            "prj_id":"PJ10000"+num,

            "prj_name|5-8": /[a-zA-Z]/,
            "manager|6-10": /[a-zA-Z0-9]/,
            "prj_desc": "@ctitle",
            "prj_goal": "@ctitle",
            "prj_type|1": ["1","2"],
            "settle_time": "@date(yyyy-MM-dd)",
            "start_time": "@date(yyyy-MM-dd)",
            "end_time": "2019-12-12",
            
            
            "logic_sys_name": "逻辑子系统1|逻辑子系统2",
            "logic_sys_id": "logic_sys_id|logic_sys_id2",
            "physics_sys_id": "phycics_sys_id|phycics_sys_id2",
            "physics_sys_name": "物理子系统1|物理子系统2",
            "modules": "mid0001|mid0002|",
            "allgroup": "Canberra|London|",
            "managerGroup": "Sydney|Ottawa|",
            "developerGroup": "Paris|",
            "testerGroup": "Canberra|",
            "prod_id": "2",
            "pid": "2",
            "prod_name|5-8": /[a-zA-Z]/,

            "subject|1": [2,"SU-0000"],
            "subject_name": "@ctitle",
            "dept_nm_id": "@ctitle",
            "stff_nm_id": "@ctitle",
            "itm_status|1-5": 0,
            "itm_status_name": "@ctitle",

            //"propose_depart": "@ctitle",
            //"aply_id": "@ctitle",
            "propose_depart": [
                {
                    org_id:1,
                    org_name:"dept-->name1",
                    org_sn:11,
                },
            ],
            "aply_id": [
                {
                    org_id:2,
                    org_name:"name2",
                    org_sn:22,
                },
            ],

            "itm_prj_eng_nm":"@title",
            "itm_prj_eng_short_num":"@title",
            "itm_type|1":["1","2"],
            "itm_assignment_date":"@date(yyyy-MM-dd)",
            "itm_tech_target":"@ctitle",
            "itm_prj_tsk_id|5-10":/[a-zA-Z0-9]/,
            "itm_lob":"@ctitle",
            "itm_wthr_snd_ntc":"@ctitle",
            "itm_id_sn|5-10":/[a-zA-Z0-9]/,
            "itm_url|1":["","http://www.baidu.com"],

            subject_sn:"SU-0010",

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
                        "nick_name":"赖磊",
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
                "title":"敏捷教练",
                "value":"icdp_agileCoach",
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
                "title":"测试组",
                "value":"icdp_testTeam",
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
                "value":"icdp_devTeam",
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
                        "nick_name":"赖磊",
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
        pm:[
            {
                value: 'Canberra',
                label: 'Canberra人6'
            },
            {
                value: 'London',
                label: 'London人2'
            },
        ],
        tm:[
            {
                value: 'London',
                label: 'London人2'
            },
        ],
        bm:[
            {
                value: 'London',
                label: 'London人2'
            },
        ],
        corerole:{
            "bm|0-10":["@cname"],
            "tm|1-5":["@cname"],
            "pm|0-3":["@cname"],
        },
        otherole:[
            {
                "title":"敏捷教练",
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
                "title":"测试组",
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
                        "nick_name":"赖磊",
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
    })
}

app.all('/project/edit', function(req, res) {
    let resVal = detail(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(detail(req.body.myStatus));
    res.end()
});

app.all('/project/list_role_user/', function(req, res) {
    let resVal = detail(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(detail(req.body.myStatus));
    res.end()
});


app.all("/project/detail/1", function(req, res) {
    console.log("req==>", req.body);
    res.json(detail(req.body.myStatus,1));
    res.end()
});

for(let i=2;i<=itemNumber;i++){
    eval('app.all("/project/detail/'+i+'", function(req, res) {res.json(detail(req.body.myStatus,'+i+'));res.end();});')
}

app.all("/project/getOtherDetail/", function(req, res) {
    console.log("req==>", req.body);
    res.json(detail(req.body.myStatus,1));
    res.end()
});




let queryPrj_fromUser = (val1 = "success", val2 = 1, val3 = 3) => {
    let _data = [
            {
                id: 1,
                prod:1,
                prj_id:"PJ100001",
                prj_type:((d)=>{return d>0.5 ? 1:2 })(Math.random()),
                create_person:"xiebei.zh",
                status:0,
                prj_name: "敏捷项目管理系统"
            },
            {
                id: 2,
                prod:2,
                prj_id:"PJ100002",
                prj_type:((d)=>{return d>0.5 ? 1:2 })(Math.random()),
                create_person:"xiebei.zh",
                status:0,
                prj_name: "党群系统"
            },
            {
                id: 3,
                prod:3,
                prj_id:"PJ100003",
                prj_type:((d)=>{return d>0.5 ? 1:2 })(Math.random()),
                create_person:"xiebei.zh",
                status:0,
                prj_name: "高校行政平台"
            },
            {
                id: 4,
                prod:4,
                prj_id:"PJ100004",
                prj_type:((d)=>{return d>0.5 ? 1:2 })(Math.random()),
                create_person:"xiebei.zh",
                status:0,
                prj_name: "一体化研发平台"
            }
        ];
    
    for(let i=5;i<=itemNumber;i++){
        let obj = {
            id:i,
            prod:i,
            prj_id:"PJ10000"+i,
            prj_type:((d)=>{return d>0.5 ? 1:2 })(Math.random()),
            create_person:"xiebei.zh",
            status:0,
            prj_name: "敏捷项目_"+i

        };
        _data.push(obj);
    }        
    return Mock.mock({
        "status": val1,
        "message": "mockDataList xxxxxxx",
        "data": _data,
        "total|19-29": 3,
        "per_page|9-19": 3,
       
    })
}

app.all('/project/queryPrj_fromUser/', function(req, res) {

    let resVal = queryPrj_fromUser(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(queryPrj_fromUser(req.body.myStatus, req.body.page, req.body.pageline));
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


let listUserstoryList = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "mockDataList xxxxxxx",
        "prj_name":"prj_name_xxxxxx",
        "product_name":"product_name_xxxxxxxx",
        "rows|3-4": [{
            "id|+1": 1,
            "detail_id": 1,
            "userstory_id": 1,
            "userstory_name|5-158": /[a-zA-Z]/,
            "userstory_type|1-5": 1,
            "charger": "xiebei.zh",
            "nick_name":"谢蓓",
            //"charger": "@name",
            //"nick_name":"@cname",
            "userstory_status|0-8": 0,
            //"sprint_id": "迭代1",
            "proi|1-5": 1,
            "manHours": "10",
            "mission": "10",
            "phycics_sys_id": "phycics_sys_id",
            "icon": "/assets/images/user_02.png",
            "complete_task|1-100":0,
            not_complete_task:"106",

            "actual_online_time":"",
           
            "created_time":"@date(yyyy-MM-dd)",
            "last_chg_time":"",
            "last_chgr":"",
            "learn_concern":"",
            "plan_online_time":"",
            
            
            "proposer":"",
            "proposer_department":"",
            "req_id|+1":4,
            "req_name":"",
            "sprint|+1": 4,
            "sprint_name|+1":4,
            "userstory_desc":"故事描述123123",
            us_accept:"验收标准.....",

            "prj_id":"prj_id_xxxxxx",
            "prj_name":"敏捷项目0000",
            "prod_id":"product1",
            "product_name":"product_name_xxxxxxxx",

            "editStatus|1":[true,false],


            "__value2__page": val2,
            "__value3__pageline": val3,

        }],
        "page_rows|19-36": 3,
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

app.all('/userstory/get_select_info/', function(req, res) {
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
    res.json({ status: "success", message: "ok" ,});
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




let kanbanList = (val1 = 200, val2 = 1, val3 = 3,num = 8) => {
    console.log("num=====",num)
    let data = [];
    let _data = [
            {
                count:4,
                userstory_status:"提出",
                wip:4,
                class:"所属分类xxx_1",
                list:[
                    {
                        userstory_name:"userstory_name_1",
                        userstory_id:101,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:1,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|0-0":0,
                        "isDiscard":true,
                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":4,
                        "sprintName":"sprint_齐慧超(qihuichao)",

                        
                    },
                    {
                        userstory_name:"userstory_name_2",
                        userstory_id:102,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:2,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|0-0":0,
                        "isDiscard":true,

                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":5,
                        "sprintName":"sprint_黄永华(huangyonghua)",

                    },
                    {
                        userstory_name:"userstory_name_3",
                        userstory_id:103,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:3,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|1-99":0,
                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":6,
                        "sprintName":"sprint_赖磊(lailei)",

                    },
                    {
                        userstory_name:"userstory_name_4",
                        userstory_id:104,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:4,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|1-99":0,
                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":7,
                        "sprintName":"sprint_殷良骥(yinliangji)",

                    }
                ]
            },
            {
                count:4,
                userstory_status:"设计分析",
                wip:((N)=>{if(N<3){return 0}else if(N<6){return 3}else {return 7}})(Math.random()*10),
                class:"所属分类xxx_5",
                list:[
                    {
                        userstory_name:"userstory_name_5",
                        userstory_id:105,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:5,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|0-0":0,
                        "isDiscard":true,
                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":4,
                        "sprintName":"sprint_齐慧超(qihuichao)",


                    },
                    {
                        userstory_name:"userstory_name_6",
                        userstory_id:106,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:6,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|1-99":0,
                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":5,
                        "sprintName":"sprint_黄永华(huangyonghua)",

                    },
                    {
                        userstory_name:"userstory_name_7",
                        userstory_id:107,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:7,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|1-99":0,
                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":6,
                        "sprintName":"sprint_赖磊(lailei)",

                    },
                    {
                        userstory_name:"userstory_name_8",
                        userstory_id:108,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:8,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|1-99":0,
                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":7,
                        "sprintName":"sprint_殷良骥(yinliangji)",

                    }
                ]
            },
            {
                count:2,
                userstory_status:"开发测试",
                wip:((N)=>{if(N<3){return 0}else if(N<6){return 3}else {return 7}})(Math.random()*10),
                class:"所属分类xxx_9",
                list:[
                    {
                        userstory_name:"userstory_name_9",
                        userstory_id:109,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:9,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|1-99":0,
                        "isDiscard":true,
                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":0,
                        "sprintName":"为规划迭代",

                    },
                    {
                        userstory_name:"userstory_name_10",
                        userstory_id:110,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:10,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|1-99":0,
                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":4,
                        "sprintName":"sprint_齐慧超(qihuichao)",

                    },
                ]
            },
            {
                count:2,
                userstory_status:"用户验收测试",
                wip:((N)=>{if(N<3){return 0}else if(N<6){return 3}else {return 7}})(Math.random()*10),
                class:"所属分类xxx_11",
                list:[
                    {
                        userstory_name:"userstory_name_11",
                        userstory_id:111,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:11,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|1-99":0,
                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":6,
                        "sprintName":"sprint_赖磊(lailei)",

                    },
                    {
                        userstory_name:"userstory_name_12",
                        userstory_id:112,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:12,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|1-99":0,
                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":7,
                        "sprintName":"sprint_殷良骥(yinliangji)",

                    },
                ]
            },
            {
                count:2,
                userstory_status:"待投产",
                wip:((N)=>{if(N<3){return 0}else if(N<6){return 3}else {return 7}})(Math.random()*10),
                class:"所属分类xxx_13",
                list:[
                    {
                        userstory_name:"userstory_name_13",
                        userstory_id:113,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:13,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|1-99":0,
                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":5,
                        "sprintName":"sprint_黄永华(huangyonghua)",


                    },
                    {
                        userstory_name:"userstory_name_14",
                        userstory_id:114,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:14,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|1-99":0,
                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":6,
                        "sprintName":"sprint_赖磊(lailei)",

                    },
                   
                ]
            },
            {
                count:2,
                userstory_status:"已投产",
                wip:((N)=>{if(N<3){return 0}else if(N<6){return 3}else {return 7}})(Math.random()*10),
                class:"所属分类xxx_15",
                list:[
                    {
                        userstory_name:"userstory_name_15",
                        userstory_id:115,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:15,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|1-99":0,
                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":4,
                        "sprintName":"sprint_齐慧超(qihuichao)",

                    },
                    {
                        userstory_name:"userstory_name_16",
                        userstory_id:116,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:16,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|1-99":0,
                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":6,
                        "sprintName":"sprint_赖磊(lailei)",

                    },
                ]
            },
            {
                count:2,
                userstory_status:"停滞",
                wip:((N)=>{if(N<3){return 0}else if(N<6){return 3}else {return 7}})(Math.random()*10),
                class:"所属分类xxx_17",
                list:[
                    {
                        userstory_name:"userstory_name_17",
                        userstory_id:117,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:17,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|1-99":0,
                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":4,
                        "sprintName":"sprint_齐慧超(qihuichao)",

                    },
                    {
                        userstory_name:"userstory_name_18",
                        userstory_id:118,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:18,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|1-99":0,
                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":5,
                        "sprintName":"sprint_黄永华(huangyonghua)",

                    },
                ]
            },
            {
                count:2,
                userstory_status:"废弃",
                wip:0,
                class:"所属分类xxx_19",
                list:[
                
                    {
                        userstory_name:"userstory_name_19",
                        userstory_id:119,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:19,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|0-0":0,
                        "isDiscard":true,
                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":5,
                        "sprintName":"sprint_黄永华(huangyonghua)",

                    },
                    {
                        userstory_name:"userstory_name_20",
                        userstory_id:120,
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        "proi|1":[1,2,3],
                        id:20,
                        "req_id|1":[5,6],
                        "isDepd|1":["no","yes"],
                        "isFile|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "task_count|0-0":0,
                        "isDiscard":true,
                        "testCase|1-99":0,
                        "username|1":["lizhuo.zh","xiebei.zh"],
                        "taskDesc":"工作项个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "depdName|1":["依赖性测试",""],
                        "depd_main_type_name|1":["用户故事",""],
                        "userstory_desc":"@title",
                        "sprint":5,
                        "sprintName":"sprint_黄永华(huangyonghua)",

                    },
                ]
            },
        ];
    let _num = num ? num : 8;
    for(let i=0;i<_num;i++){
        data.push(_data[i])
    }
    console.error("data======",data)
    return Mock.mock({
        status: "success", 
        message: "ok" ,
        data:data,
        "role|1":["_icdp_projManager","icdp_teamLeader"],
    })
}
//"role|1":["icdp_projManager","icdp_teamLeader"],

app.all('/userstory/getUserStoryKanBan/', function(req, res) {
    let resVal = kanbanList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==看板>", req._parsedUrl.query);
    let arr = req._parsedUrl.query.split("&");
    let str = "";
    
    for(let i=0;i<arr.length;i++){
        if(arr[i].indexOf("uss") != -1){
            str = arr[i];
        }
    }
    str = decodeURIComponent(str).split("=")[1];
    arr = JSON.parse(str)
    //console.log("resVal==看板>", resVal);
    let num = str ? arr.length : 8;
    res.json(kanbanList("","","",num));
    res.end()
});

let kanbanReqList = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        status: "success", 
        message: "ok" ,
        data:[
            {
                count:3,
                req_status:"提出",
                list:[
                    {
                        req_name:"req_name_1",
                        req_id:"RQ-PJ1800130-101",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:4,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1":[0,10],
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    },
                    {
                        req_name:"req_name_2",
                        req_id:"RQ-PJ1800130-102",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:5,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1-99":0,
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    },
                    
                    {
                        req_name:"req_name_4",
                        req_id:"RQ-PJ1800130-104",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:6,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1-99":0,
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    }
                ]
            },
            {
                count:4,
                req_status:"价值分析",
                list:[
                    {
                        req_name:"req_name_3",
                        req_id:"RQ-PJ1800130-103",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:4,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1-99":0,
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    },
                    {
                        req_name:"req_name_5",
                        req_id:"RQ-PJ1800130-105",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:5,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1":[0,10],
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    },
                    {
                        req_name:"req_name_6",
                        req_id:"RQ-PJ1800130-106",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:6,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1-99":0,
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    },
                    {
                        req_name:"req_name_7",
                        req_id:"RQ-PJ1800130-107",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:7,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1-99":0,
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    },
                    {
                        req_name:"req_name_8",
                        req_id:"RQ-PJ1800130-108",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:8,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1-99":0,
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    }
                ]
            },
            {
                count:2,
                req_status:"已选中",
                list:[
                    {
                        req_name:"req_name_9",
                        req_id:"RQ-PJ1800130-109",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:4,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1-99":0,
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    },
                    {
                        req_name:"req_name_10",
                        req_id:"RQ-PJ1800130-110",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:5,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1":[0,10],
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    },
                   
                ]
            },
            {
                count:2,
                req_status:"澄清",
                list:[
                    {
                        req_name:"req_name_11",
                        req_id:"RQ-PJ1800130-111",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:4,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1-99":0,
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    },
                    {
                        req_name:"req_name_12",
                        req_id:"RQ-PJ1800130-112",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:5,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1-99":0,
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    },
                   
                ]
            },
            {
                count:2,
                req_status:"开发测试",
                list:[
                    {
                        req_name:"req_name_13",
                        req_id:"RQ-PJ1800130-113",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:4,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1":[0,10],
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    },
                    {
                        req_name:"req_name_14",
                        req_id:"RQ-PJ1800130-114",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:5,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1-99":0,
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    },
                   
                ]
            },
            {
                count:2,
                req_status:"验收测试",
                list:[
                    {
                        req_name:"req_name_15",
                        req_id:"RQ-PJ1800130-115",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:4,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1":[0,10],
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    },
                    {
                        req_name:"req_name_16",
                        req_id:"RQ-PJ1800130-116",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:5,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1-99":0,
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    },
                   
                ]
            },
            {
                count:2,
                req_status:"上线投产",
                list:[
                    {
                        req_name:"req_name_17",
                        req_id:"RQ-PJ1800130-117",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:4,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1-99":0,
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    },
                    {
                        req_name:"req_name_18",
                        req_id:"RQ-PJ1800130-118",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:5,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1":[0,10],
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    },
                   
                ]
            },
            {
                count:3,
                req_status:"完成确认",
                list:[
                    {
                        req_name:"req_name_19",
                        req_id:"RQ-PJ1800130-119",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:4,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1-99":0,
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    },
                    {
                        req_name:"req_name_20",
                        req_id:"RQ-PJ1800130-120",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:5,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1":[0,10],
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    },
                    {
                        req_name:"req_name_21",
                        req_id:"RQ-PJ1800130-121",
                        "charger|1":["@cname","xiebei.zh(谢蓓)"],
                        id:6,
                        comment:"@title",
                        "isDepd|1":["no","yes"],
                        "isFinish|1":["finish","unfinish"],
                        "us_counts|1":[0,10],
                        "usDesc":"用户故事个数->@title",
                        "depdDesc":"依赖项状态->@title",
                        "isFile|1":["no","yes"],

                        "desc":"@title",
                        "start_time":"@date(yyyy-MM-dd)",
                        "end_time":"@date(yyyy-MM-dd)",
                        "intro":"@cname",
                        "submit_department":"@name",
                    },
                   
                ]
            },
        ],
        "role|1":["icdp_projManager","icdp_teamLeader","icdp_teamLeader","icdp_teamLeader"],
        status_data:[
            {value:"提出",key:"1"},
            {value:"价值分析",key:"2"},
            {value:"已选中",key:"3"},
            {value:"澄清",key:"4"},
            {value:"开发测试",key:"5"},
            {value:"验收测试",key:"6"},
            {value:"上线投产",key:"7"},
            {value:"完成确认",key:"8"},
        ],

    })
}

app.all('/req/getRequirementKanBan/', function(req, res) {
    let resVal = kanbanReqList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(kanbanReqList(req.body.myStatus));
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
            "charger": "xiebei.zh",
            "nick_name":"@cname",
            "userstory_status|1-4": 1,
            //"sprint_id": "迭代1",
            "proi|1-3": 1,
            "manHours": "10",
            "mission": "10",
            "phycics_sys_id": "phycics_sys_id",
            "icon": "/assets/images/user_02.png",
            "actual_online_time":"",
            "created_time":"@date(yyyy-MM-dd)",
            "last_chg_time":"",
            "last_chgr":"",
            "learn_concern":"",
            "plan_online_time":"",
            
            
            "proposer":"",
            "proposer_department":"",
            "req_id":"6",
            "req_name":"@title",
            "sprint": 6,
            "sprint_name":6,
            "userstory_desc":"故事描述123123",
            us_accept:"验收标准-详情....",

            "prj_id":"prj_id_xxxxxx",
            "prj_name":"敏捷项目0000",
            "prod_id":"product1",
            "product_name":"product_name_xxxxxxxx",

            "editStatus|1":[true,true],

            assist_list:[
                {"nick_name":"黄永华(huangyonghua)","user_name":5,},
                {"nick_name":"赖磊(lailei)","user_name":6,},
                {"nick_name":"殷良骥(yinliangji)","user_name":7,},
            ],

            "depd_list|2-10":[
                {
                    create_time:"@date(yyyy-MM-dd)",
                    "created_user_username":"@cname",
                    "depd_desc":"@title",
                    "depd_id|5-8":/[a-zA-Z]/,
                    "depd_main_type":2,
                    "depd_name":"@cname",
                    "depd_sn|+1":1,
                    "depd_status":1,
                    "id|+10":1,
                    "modified_time":"@date(yyyy-MM-dd)",
                    "modified_user_username":"@cname",
                    "prj_id|+100":1,
                }
            ],

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



let GroupList = (val1 = 200, val2 = "", val3 = 3) => {
    return Mock.mock({
        "status": val1,
        "message": "mockDataList xxxxxxx",
        data: {
            "list": [
                {
                    value: 'New York',
                    label: 'New York人1@'+val2,
                    "who|1":["icdp","itm"],
                    prj_id: 'New York',
                    prj_name: 'New York人1',
                },
                {
                    value: 'London',
                    label: 'London人2@'+val2,
                    "who|1":["icdp","itm"],
                    prj_id: 'London',
                    prj_name: 'London人2',
                },
                {
                    value: 'Sydney',
                    label: 'Sydney人3@'+val2,
                    "who|1":["icdp","itm"],
                    prj_id: 'Sydney',
                    prj_name: 'Sydney人3',
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa人4@'+val2,
                    "who|1":["icdp","itm"],
                    prj_id: 'Ottawa',
                    prj_name: 'Ottawa人4',
                },
                {
                    value: 'Paris',
                    label: 'Paris人5@'+val2,
                    "who|1":["icdp","itm"],
                    prj_id: 'Paris',
                    prj_name: 'Paris人5',
                },
                {
                    value: 'Canberra',
                    label: 'Canberra人6@'+val2,
                    "who|1":["icdp","itm"],
                    prj_id: 'Canberra',
                    prj_name: 'Canberra人6',
                }
            ],
        },
        "__value2__page": val2,
        "__value3__pageline": val3,
    })
}

let _GroupList = (val1 = 200, val2 = "", val3 = 3) => {
    return Mock.mock({
        "status": val1,
        "message": "mockDataList xxxxxxx",
        data: {
            "list": [
                {
                    value: '_New York',
                    label: '_New York人1@'+val2,
                    "who|1":["_icdp","_itm"],
                    prj_id: '_New York',
                    prj_name: '_New York人1',
                },
                {
                    value: '_London',
                    label: '_London人2@'+val2,
                    "who|1":["_icdp","_itm"],
                    prj_id: '_London',
                    prj_name: '_London人2',
                },
                {
                    value: '_Sydney',
                    label: '_Sydney人3@'+val2,
                    "who|1":["_icdp","_itm"],
                    prj_id: '_Sydney',
                    prj_name: '_Sydney人3',
                },
                {
                    value: '_Ottawa',
                    label: '_Ottawa人4@'+val2,
                    "who|1":["_icdp","_itm"],
                    prj_id: '_Ottawa',
                    prj_name: '_Ottawa人4',
                },
                {
                    value: '_Paris',
                    label: '_Paris人5@'+val2,
                    "who|1":["_icdp","_itm"],
                    prj_id: '_Paris',
                    prj_name: '_Paris人5',
                },
                {
                    value: '_Canberra',
                    label: '_Canberra人6@'+val2,
                    "who|1":["_icdp","_itm"],
                    prj_id: '_Canberra',
                    prj_name: '_Canberra人6',
                }
            ],
        },
        "__value2__page": val2,
        "__value3__pageline": val3,
    })
}

let GroupList_ = (val1 = 200, val2 = "", val3 = 3) => {
    return Mock.mock({
        "status": val1,
        "message": "mockDataList xxxxxxx",
        data: {
            "list": [
                {
                    value: 'New York_',
                    label: 'New York_人1@'+val2,
                    "who|1":["icdp_","itm_"],
                    prj_id: 'New York_',
                    prj_name: 'New York_人1',
                },
                {
                    value: 'London_',
                    label: 'London_人2@'+val2,
                    "who|1":["icdp_","itm_"],
                    prj_id: 'London_',
                    prj_name: 'London_人2',
                },
                {
                    value: 'Sydney_',
                    label: 'Sydney_人3@'+val2,
                    "who|1":["icdp_","itm_"],
                    prj_id: 'Sydney_',
                    prj_name: 'Sydney_人3',
                },
                {
                    value: 'Ottawa_',
                    label: 'Ottawa_人4@'+val2,
                    "who|1":["icdp_","itm_"],
                    prj_id: 'Ottawa_',
                    prj_name: 'Ottawa_人4',
                },
                {
                    value: 'Paris_',
                    label: 'Paris_人5@'+val2,
                    "who|1":["icdp_","itm_"],
                    prj_id: 'Paris_',
                    prj_name: 'Paris_人5',
                },
                {
                    value: 'Canberra_',
                    label: 'Canberra_人6@'+val2,
                    "who|1":["icdp_","itm_"],
                    prj_id: 'Canberra_',
                    prj_name: 'Canberra_人6',
                }
            ],
        },
        "__value2__page": val2,
        "__value3__pageline": val3,
    })
}

let trueorfalse = 0;



app.all('/agile/getUsers/', function(req, res) {

    let val2 = req.query && req.query.userName ? req.query.userName : "";
    let resVal
    let Json
    if(trueorfalse == 0){
        Json =  GroupList(req.body.myStatus,val2)   
        //resVal = GroupList(req.body.myStatus, req.body.page, req.body.pageline);
    }else if(trueorfalse == 1){
        Json =  _GroupList(req.body.myStatus,val2) 
        //resVal = _GroupList(req.body.myStatus, req.body.page, req.body.pageline);

    }else{
        Json =  GroupList_(req.body.myStatus,val2)   
        //resVal = GroupList_(req.body.myStatus, req.body.page, req.body.pageline);     
    }
    console.log("req==>", req._parsedUrl,req.statusCode,req.statusMessage);
    console.log("Json==>", Json);
    trueorfalse = trueorfalse>1 ? 0 : trueorfalse+1
    console.log(trueorfalse)
    res.json(Json);
    res.end()
});

app.all('/prj/sync_search/', function(req, res) {

    let val2 = req.query && req.query.userName ? req.query.userName : "";
    let resVal
    let Json
    if(trueorfalse == 0){
        Json =  GroupList(req.body.myStatus,val2)   
        //resVal = GroupList(req.body.myStatus, req.body.page, req.body.pageline);
    }else if(trueorfalse == 1){
        Json =  _GroupList(req.body.myStatus,val2) 
        //resVal = _GroupList(req.body.myStatus, req.body.page, req.body.pageline);

    }else{
        Json =  GroupList_(req.body.myStatus,val2)   
        //resVal = GroupList_(req.body.myStatus, req.body.page, req.body.pageline);     
    }
    console.log("req==>", req._parsedUrl,req.statusCode,req.statusMessage);
    console.log("Json==>", Json);
    trueorfalse = trueorfalse>1 ? 0 : trueorfalse+1
    console.log(trueorfalse)
    res.json(Json);
    res.end()
});

app.all('/findItm/', function(req, res) {

    let val2 = req.query && req.query.userName ? req.query.userName : "";
    let resVal
    let Json
    if(trueorfalse == 0){
        Json =  GroupList(req.body.myStatus,val2)   
        //resVal = GroupList(req.body.myStatus, req.body.page, req.body.pageline);
    }else if(trueorfalse == 1){
        Json =  _GroupList(req.body.myStatus,val2) 
        //resVal = _GroupList(req.body.myStatus, req.body.page, req.body.pageline);

    }else{
        Json =  GroupList_(req.body.myStatus,val2)   
        //resVal = GroupList_(req.body.myStatus, req.body.page, req.body.pageline);     
    }
    console.log("req==>", req._parsedUrl,req.statusCode,req.statusMessage);
    console.log("Json==>", Json);
    trueorfalse = trueorfalse>1 ? 0 : trueorfalse+1
    console.log(trueorfalse)
    res.json(Json);
    res.end()
});

app.all('/system/loglist/', function(req, res) {
    let val2 = req.query && req.query.name ? req.query.name : "";
    let resVal
    let Json
    if(trueorfalse == 0){
        Json =  GroupList(req.body.myStatus,val2)   
        //resVal = GroupList(req.body.myStatus, req.body.page, req.body.pageline);
    }else if(trueorfalse == 1){
        Json =  _GroupList(req.body.myStatus,val2) 
        //resVal = _GroupList(req.body.myStatus, req.body.page, req.body.pageline);

    }else{
        Json =  GroupList_(req.body.myStatus,val2)   
        //resVal = GroupList_(req.body.myStatus, req.body.page, req.body.pageline);     
    }
    console.log("req==>", req._parsedUrl,req.statusCode,req.statusMessage);
    console.log("Json==>", Json);
    trueorfalse = trueorfalse>1 ? 0 : trueorfalse+1
    console.log(trueorfalse)
    res.json(Json);
    res.end()
});


app.all('/system/phylist/', function(req, res) {

    let val2 = req.query && req.query.name ? req.query.name : "";
    let resVal
    let Json
    if(trueorfalse == 0){
        Json =  GroupList(req.body.myStatus,val2)   
        //resVal = GroupList(req.body.myStatus, req.body.page, req.body.pageline);
    }else if(trueorfalse == 1){
        Json =  _GroupList(req.body.myStatus,val2) 
        //resVal = _GroupList(req.body.myStatus, req.body.page, req.body.pageline);

    }else{
        Json =  GroupList_(req.body.myStatus,val2)   
        //resVal = GroupList_(req.body.myStatus, req.body.page, req.body.pageline);     
    }
    console.log("req==>", req._parsedUrl,req.statusCode,req.statusMessage);
    console.log("Json==>", Json);
    trueorfalse = trueorfalse>1 ? 0 : trueorfalse+1
    console.log(trueorfalse)
    res.json(Json);
    res.end()
});

app.all('/agile/search_busfunc/', function(req, res) {

    let val2 = req.query && req.query.userName ? req.query.userName : "";
    let resVal
    let Json
    if(trueorfalse == 0){
        Json =  GroupList(req.body.myStatus,val2)   
        //resVal = GroupList(req.body.myStatus, req.body.page, req.body.pageline);
    }else if(trueorfalse == 1){
        Json =  _GroupList(req.body.myStatus,val2) 
        //resVal = _GroupList(req.body.myStatus, req.body.page, req.body.pageline);

    }else{
        Json =  GroupList_(req.body.myStatus,val2)   
        //resVal = GroupList_(req.body.myStatus, req.body.page, req.body.pageline);     
    }
    console.log("req==>", req._parsedUrl,req.statusCode,req.statusMessage);
    console.log("Json==>", Json);
    trueorfalse = trueorfalse>1 ? 0 : trueorfalse+1
    console.log(trueorfalse)
    res.json(Json);
    res.end()
});


let searchBusfunc1 = (val1 = 200, val2 = "", val3 = 3) => {
    /*
    "list|6": [
        {
            bfunc_id: /[a-zA-Z]{5,8}/,
            bfunc_name: "@name",
            logic_sys_name:"@title",
            create_date:"@date(yyyy-MM-dd)",
            "version|+1":1,
            "value|+10":1,
            label:"@cname",
            who:"itm",
        },
    ],
    */
    return Mock.mock({
        "status": "success",
        "message": "searchBusfunc1 xxxxxxx",
        data: {
           "list": [
                {
                    bfunc_id: /[a-zA-Z]{5,8}/,
                    bfunc_name: "@name",
                    logic_sys_name:"@title",
                    create_date:"@date(yyyy-MM-dd)",
                    "version":1,
                    "value":1,
                    label:"a-abc@"+val2,
                    who:"itm",
                },
                {
                    bfunc_id: /[a-zA-Z]{5,8}/,
                    bfunc_name: "@name",
                    logic_sys_name:"@title",
                    create_date:"@date(yyyy-MM-dd)",
                    "version":1,
                    "value":2,
                    label:"aa-abc@"+val2,
                    who:"itm",
                },
                {
                    bfunc_id: /[a-zA-Z]{5,8}/,
                    bfunc_name: "@name",
                    logic_sys_name:"@title",
                    create_date:"@date(yyyy-MM-dd)",
                    "version":1,
                    "value":3,
                    label:"aaa-abc@"+val2,
                    who:"itm",
                },
            ],
        },
        "__value2__page": val2,
        "__value3__pageline": val3,
    })
    
}
let searchBusfunc2 = (val1 = 200, val2 = "", val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "searchBusfunc2 xxxxxxx",
        data: {
           "list": [
                {
                    bfunc_id: /[a-zA-Z]{5,8}/,
                    bfunc_name: "@name",
                    logic_sys_name:"@title",
                    create_date:"@date(yyyy-MM-dd)",
                    "version":1,
                    "value":11,
                    label:"b-abc@"+val2,
                    who:"itm",
                },
                {
                    bfunc_id: /[a-zA-Z]{5,8}/,
                    bfunc_name: "@name",
                    logic_sys_name:"@title",
                    create_date:"@date(yyyy-MM-dd)",
                    "version":1,
                    "value":12,
                    label:"bb-abc@"+val2,
                    who:"itm",
                },
                {
                    bfunc_id: /[a-zA-Z]{5,8}/,
                    bfunc_name: "@name",
                    logic_sys_name:"@title",
                    create_date:"@date(yyyy-MM-dd)",
                    "version":1,
                    "value":13,
                    label:"bbb-abc@"+val2,
                    who:"itm",
                },
            ],
        },
        "__value2__page": val2,
        "__value3__pageline": val3,
    })
}
let searchBusfunc3 = (val1 = 200, val2 = "", val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "searchBusfunc2 xxxxxxx",
        data: {
           "list": [
                {
                    bfunc_id: /[a-zA-Z]{5,8}/,
                    bfunc_name: "@name",
                    logic_sys_name:"@title",
                    create_date:"@date(yyyy-MM-dd)",
                    "version":1,
                    "value":101,
                    label:"c-abc@"+val2,
                    who:"itm",
                },
                {
                    bfunc_id: /[a-zA-Z]{5,8}/,
                    bfunc_name: "@name",
                    logic_sys_name:"@title",
                    create_date:"@date(yyyy-MM-dd)",
                    "version":1,
                    "value":102,
                    label:"cc-abc@"+val2,
                    who:"itm",
                },
                {
                    bfunc_id: /[a-zA-Z]{5,8}/,
                    bfunc_name: "@name",
                    logic_sys_name:"@title",
                    create_date:"@date(yyyy-MM-dd)",
                    "version":1,
                    "value":103,
                    label:"ccc-abc@"+val2,
                    who:"itm",
                },
            ],
        },
        "__value2__page": val2,
        "__value3__pageline": val3,
    })
}


app.all('/agile/search_busfunc2/', function(req, res) {
    let val2 = req.query && req.query.userName ? req.query.userName : "";
    let resVal
    let Json
    if(trueorfalse == 0){
        Json =  searchBusfunc1(req.body.myStatus,val2)   
        //resVal = searchBusfunc1(req.body.myStatus, req.body.page, req.body.pageline);
    }else if(trueorfalse == 1){
        Json =  searchBusfunc2(req.body.myStatus,val2) 
        //resVal = searchBusfunc2(req.body.myStatus, req.body.page, req.body.pageline);

    }else{
        Json =  searchBusfunc3(req.body.myStatus,val2)   
        //resVal = searchBusfunc3(req.body.myStatus, req.body.page, req.body.pageline);     
    }    
    console.log("req==>", req._parsedUrl,req.statusCode,req.statusMessage);
    console.log("Json==>", Json);
    trueorfalse = trueorfalse>1 ? 0 : trueorfalse+1
    console.log(trueorfalse)
    res.json(Json);
    res.end()
});


let list_busfunc = (val1 = 200, val2 = 1, val3 = 3) => {
    let mk = Mock.mock({
        "status": val1,
        "message": "mockDataList xxxxxxx",
        data: {
            "list|1-3": [
                {
                    bfunc_id: /[a-zA-Z]{5,8}/,
                    bfunc_name: "@name",
                    logic_sys_name:"核心银行业务处理系统",
                    create_date:"@date(yyyy-MM-dd)",
                    "version|+1":10000,
                    "value|+10":10000,
                    label:"@cname",

                    bfunc_desc: /[a-zA-Z]{5,8}/,
                    bfunc_status: 2,
                    bfunc_type: 2,
                    create_person:"@cname",
                    "id|+100":10000,
                    logic_sys_no:"Z0250",
                    operation_step:"<p>列表HTML文字</p>",
                    remark1:"",
                    remark2:"",
                    req_id:"RQ-Pj1800110-6",
                    req_name:"@title",
                    synergetic_relation:"@title",
                    us_id:"US-HP18000030-01-2111111",

                },
            ],
        },
    });
    let pushObj = [
        {
            bfunc_id: "version_1|value_1|label_a-abc",
            bfunc_name: "name",
            logic_sys_name:"核心银行业务处理系统",
            create_date:"0000-00-00",
            version:1,
            value:1,
            label:"a-abc",

            bfunc_desc: "version_1|value_1|label_a-abc",
            bfunc_status: 2,
            bfunc_type: 2,
            create_person:"cname",
            id:100000000,
            logic_sys_no:"Z0250",
            operation_step:"<p>列表HTML文字</p>",
            remark1:"",
            remark2:"",
            req_id:"RQ-Pj1800110-6",
            req_name:"title",
            synergetic_relation:"title",
            us_id:"US-HP18000030-01-2111111",

        },
        {
            bfunc_id: "version_1|value_11|label_b-abc",
            bfunc_name: "name",
            logic_sys_name:"核心银行业务处理系统",
            create_date:"0000-00-00",
            version:1,
            value:11,
            label:"b-abc",

            bfunc_desc: "version_1|value_11|label_b-abc",
            bfunc_status: 2,
            bfunc_type: 2,
            create_person:"cname",
            id:100000000,
            logic_sys_no:"Z0250",
            operation_step:"<p>列表HTML文字</p>",
            remark1:"",
            remark2:"",
            req_id:"RQ-Pj1800110-6",
            req_name:"title",
            synergetic_relation:"title",
            us_id:"US-HP18000030-01-2111111",

        },
        {
            bfunc_id: "version_1|value_101|label_c-abc",
            bfunc_name: "name",
            logic_sys_name:"核心银行业务处理系统",
            create_date:"0000-00-00",
            version:1,
            value:101,
            label:"c-abc",

            bfunc_desc: "version_1|value_11|label_b-abc",
            bfunc_status: 2,
            bfunc_type: 2,
            create_person:"cname",
            id:100000000,
            logic_sys_no:"Z0250",
            operation_step:"<p>列表HTML文字</p>",
            remark1:"",
            remark2:"",
            req_id:"RQ-Pj1800110-6",
            req_name:"title",
            synergetic_relation:"title",
            us_id:"US-HP18000030-01-2111111",

        },
    ]
    mk.data.list.push(...pushObj)
    return mk;
}

app.all('/agile/list_busfunc2/', function(req, res) {

    let resVal
    let Json
    Json =  list_busfunc(req.body.myStatus)   
    resVal = list_busfunc(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    //console.log("resVal==>", resVal);
    
     
    
    console.log("Json==>", Json,Json.data.list);
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
        "data|10-20": [
            {
                comment: 'xxxxx',
                "id|+1": 1,
                "prj|+1":250,
                prj_tyope:"1",
                "req_id|+1":1,
                "req_name|1":"@title",
                req_submitter:"百某某",
                settle_time:"@date(yyyy-MM-dd)",
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
                        "nick_name":"赖磊",
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
        {"value":"齐慧超(qihuichao)","key":4,},
        {"value":"黄永华(huangyonghua)","key":5,},
        {"value":"赖磊(lailei)","key":6,},
        {"value":"殷良骥(yinliangji)","key":7,},
        {"value":"谢蓓(xiebei)","key":"xiebei.zh",},
    ])
}

 let ConditionOBJECT = 
        {
            userstory_type:[
                {value:"用户需求",key:"1"},
                {value:"生产问题",key:"2"},
                {value:"自主创新",key:"3"},
            ],
            userstory_status:[
                {value:"提出",key:"1"},
                {value:"设计分析",key:"2"},
                {value:"开发测试",key:"6"},
                {value:"用户验收测试",key:"3"},
                {value:"待投产",key:"4"},
                {value:"已投产",key:"5"},
                {value:"停滞",key:"7"},
                {value:"废弃",key:"0"},
            ],
            _userstory_status:[
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
                // {"value":"奇慧超","key":4,},
                // {"value":"黄永华","key":5,},
                // {"value":"赖磊","key":6,},
                // {"value":"殷良骥","key":7,},
                 
                {
                    "value":"req_id_齐慧超(qihuichao)@需求完成",
                    "key":4,
                    "reqID":"RQ-PJ@title",
                    "req_status_name":"需求完成",
                    "req_status":8,
                },
                {
                    "value":"req_id_黄永华(huangyonghua)",
                    "key":5,
                    "reqID":"RQ-PJ@title",
                    "req_status_name":"已选中",
                    "req_status":3,
                },
                {
                    "value":"req_id_赖磊(lailei)@需求完成",
                    "key":6,
                    "reqID":"RQ-PJ@title",
                    "req_status_name":"需求完成",
                    "req_status":8,

                },
                {
                    "value":"req_id_殷良骥(yinliangji)",
                    "key":7,
                    "reqID":"RQ-PJ@title",
                    "req_status_name":"上线投产",
                    "req_status":7,
                },
                
            ],
            charger:[
                // {"value":"奇慧超","key":4,},
                // {"value":"黄永华","key":5,},
                // {"value":"赖磊","key":6,},
                // {"value":"殷良骥","key":7,},
                // {"value":"谢蓓","key":"xiebei.zh",},
                {"value":"齐慧超(qihuichao)","key":4,},
                {"value":"黄永华(huangyonghua)","key":5,},
                {"value":"赖磊(lailei)","key":6,},
                {"value":"殷良骥(yinliangji)","key":7,},
                {"value":"谢蓓(xiebei)","key":"xiebei.zh",},
            ],
            learn_concern:[
                // {"value":"奇慧超","key":4,},
                // {"value":"黄永华","key":5,},
                // {"value":"赖磊","key":6,},
                // {"value":"殷良骥","key":7,},
                {"value":"learn_concern_齐慧超(qihuichao)","key":4,},
                {"value":"learn_concern_黄永华(huangyonghua)","key":5,},
                {"value":"learn_concern_赖磊(lailei)","key":6,},
                {"value":"learn_concern_殷良骥(yinliangji)","key":7,},
            ],
            sprint:[
                // {"value":"奇慧超","key":4,},
                // {"value":"黄永华","key":5,},
                // {"value":"赖磊","key":6,},
                // {"value":"殷良骥","key":7,},
                {"value":"sprint_齐慧超(qihuichao)","key":4,},
                {"value":"sprint_黄永华(huangyonghua)","key":5,},
                {"value":"sprint_赖磊(lailei)","key":6,},
                {"value":"sprint_殷良骥(yinliangji)","key":7,},
            ],
            group_name:[
                // {"value":"奇慧超","key":4,},
                // {"value":"黄永华","key":5,},
                // {"value":"赖磊","key":6,},
                // {"value":"殷良骥","key":7,},
                {"value":"group_name_齐慧超(qihuichao)","key":4,},
                {"value":"group_name_黄永华(huangyonghua)","key":5,},
                {"value":"group_name_赖磊(lailei)","key":6,},
                {"value":"group_name_殷良骥(yinliangji)","key":7,},
            ],
            userstory_category:[
                {
                    //"value":"userstory_category_齐慧超(qihuichao)",
                    //"key":4,
                    "uscName":"userstory_category_齐慧超(qihuichao)",
                    "uscSn":4,
                },
                {
                    //"value":"userstory_category_黄永华(huangyonghua)",
                    //"key":5,
                    "uscName":"userstory_category_黄永华(huangyonghua)",
                    "uscSn":5,
                },
                {
                    //"value":"userstory_category_赖磊(lailei)",
                    //"key":6,
                    "uscName":"userstory_category_赖磊(lailei)",
                    "uscSn":6,
                },
                {
                    //"value":"userstory_category_殷良骥(yinliangji)",
                    //"key":7,
                    "uscName":"userstory_category_殷良骥(yinliangji)",
                    "uscSn":7,
                },
            ],
            
        }

app.all('/userstory/getUserstoryCondition', function(req, res) {
    //let resVal = Condition(req.body.myStatus, req.body.page, req.body.pageline);
    //console.log("req==>", req.body);
    //console.log("resVal==>", resVal);
    
    console.log("res====>",res.req._parsedUrl.query,res.req._parsedUrl.query.indexOf("userstory_type"))
    

   
    
    res.json(ConditionOBJECT);
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
app.all('/userstory/modifyCondition', function(req, res) {
    console.log("res====>",res.req._parsedUrl.query,res.req._parsedUrl.query.indexOf("userstory_type"))
    res.json(ConditionOBJECT);
    res.end();
    return

    
});



let getPermission = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        //"status": "fail",
        //"status": "redirect",
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
            
            "icdp_sprint_view",//22
            "icdp_codeRepoLf_view",//23
            "icdp_projDetail_mng",//24

            "icdp_projList_view",//10


            "icdp_proj_group_mng",//项目设置
            "icdp_proj_group_menber_edit",//项目设置

            
            "icdp_projList_mng",//25
            //========
            
            "icdp_projList_edit",//21
            "icdp_proj_role_edit",

            //=======
            "icdp_prjrequirement_mng",
            "icdp_prjrequirement_view",
            "icdp_prjrequirement_edit",
            "icdp_prjrequirement_confirm",
        ],
        identity:"SuperAdmin",
        //PlainAdmin
        //SuperAdmin
        //PrjManager
        //Admin
    })
}
let getPermission2 = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        //"status": "fail",
        //"status": "redirect",
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
            
            "icdp_sprint_view",//22
            "icdp_codeRepoLf_view",//23
            "icdp_projDetail_mng",//24

            "icdp_projList_view",//10

            "icdp_proj_group_mng",//项目设置
            "icdp_proj_group_menber_edit",//项目设置

            
            "icdp_proj_role_edit",
            //========
            "icdp_projList_mng",//25
            "icdp_projList_edit",//21


            //=======
            "icdp_prjrequirement_mng",
            "icdp_prjrequirement_view",
            "icdp_prjrequirement_edit",
            //"icdp_prjrequirement_confirm",
        ],
        identity:"SuperAdmin",
        //PlainAdmin
        //SuperAdmin
        //PrjManager
        //Admin
    })
}

app.all('/auth/getPermissionfromUser', function(req, res) {
    let resVal = getPermission(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    Math.random() > 0.5 ? res.json(getPermission(req.body.myStatus)) : res.json(getPermission2(req.body.myStatus))
    //res.json(getPermission(req.body.myStatus));
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
        let res1 = {
            status:"success",
            no_complete_task_list:[],
            req_status: 8,
            req_status_name: "需求完成",
        }
        let res2 = {
            status:"success",
            no_complete_task_list:[],
            req_status: 3,
            req_status_name: "已选中",
        }
        
        res.json((()=>{return Math.random() > 0.5 ? res1 : res2})());
    }
    res.end()
});

app.all('/req/setRequirementFinish/', function(req, res) {
    let resVal = changeUserstoryStatus(req.body.myStatus, req.body.page, req.body.pageline);
    //console.log("resVal==>", resVal);
    console.log("req.body==>", req.body);
    console.log("req==req/setRequirementFinish==>",req._parsedUrl.query);
    res.json({status:"success",message:"改变成功"});
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
        "message": "敏捷项目获取角色 xxxxxxx",
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
        "status": "success",
        "message": "mockDataList xxxxxxx",
        data:{
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
        },
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
    res.json({nick_name:"谢蓓-建行",user_name:"xiebei.zh"});
    res.end()
});

let reqList = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "mockDataList xxxxxxx",
        "data|4": [{
            "id|+1": 4,
            "req_id|+1": 4,
            "req_submitter|5-8": /[a-zA-Z]/,
            "req_name|5-8": /[a-zA-Z0-9]/,
            "prj_type|1": [1,2],
            "on_line":"1 | 5",
            "comment":"@title",
            "status|1-8":1,
            "start_time":"@date(yyyy-MM-dd)",
            "end_time":"@date(yyyy-MM-dd)",
            remark:"@title",

            "intro":"@name",
            "hope_time":"@date(yyyy-MM-dd)",
            "req_source|1":['server','oa','mail','tel','metting'],


            "__value2__page": val2,
            "__value3__pageline": val3,

        }],
        "total|23-29": 3,
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
    res.json({ status: "success" });//fial
    res.end()
});

app.all('/req/deleteReq/', function(req, res) {
    res.json({ status: "success" ,message:"req/deleteReq 删除完成"});
    res.end()
});

app.all('/req/updateReq/', function(req, res) {
    res.json({ status: "success" });
    res.end()
});




app.all('/userstory/getDefaultSpringIdByPrj/', function(req, res) {
    //res.json({ status: "success",data:"" });
    res.json({ status: "success",data:"6" });
    res.end()
});
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
            "userstory_status|1":[1],
            "status_name|1":["提出"],
            "userstory_id|+1":280,
            "userstory_name|6-10":/[a-zA-Z0-9]/,
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
app.all('/userstoryEvo/Newlist/', function(req, res) {
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
            "file_path|1":["files/xxxxx/xxx.jpg","files/xxxxx/xxx.doc"],
            filesize:"162M",
            url:"/uploads/files/xxx.txt",
            
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


app.all('/uploadfiles/delete_file/', function(req, res) {
    let resVal = filedown(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json({status: "success",message: "delete success",});
    res.end()
});



app.all('/uploadfiles/getuploadedfiles/', function(req, res) {
    let resVal = filedown(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(filedown(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});



app.all('/agile/us/export/', function(req, res) {
    let resVal = filedown(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(filedown(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});

app.all('/agile/req/export/', function(req, res) {
    let resVal = filedown(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(filedown(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});

app.all('/agile/prj/export/', function(req, res) {
    let resVal = filedown(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(filedown(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});

app.all('/agile/download_template/', function(req, res) {
    let resVal = filedown(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(filedown(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});

let Import = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "message xxxxxxx",
        "data":{
            "total|10-20": 1,
            "success_total|10-20": 1,
            "fail_total|10-20": 1,
        },
        
    })
}

app.all('/agile/import_us/', function(req, res) {
    let resVal = Import(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(Import(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});

app.all('/agile/import_req/', function(req, res) {
    let resVal = Import(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(Import(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});



app.all('/prj/update_submit/', function(req, res) {
    console.log("req==>", req.body);
    res.json({status: "success",message: "import success",});
    res.end()
});

let get_count = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "message xxxxxxx",
        "data":{
            "count|1":[0,10],
        },
        
    })
}

app.all('/req/get_count/', function(req, res) {

    let resVal = get_count(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(get_count(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});
app.all('/req/save_req_list/', function(req, res) {
    let resVal = filedown(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json({status: "success",message: "import success",});
    res.end()
});

let getITMtable = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "message xxxxxxx",
        "data":{
            name:"@title",
            "num|1-100":1,
            "desc|5-10":/[a-zA-Z0-9]/,
            "msg":"@ctitle",
            "isExist|1":["yes","no"],
            "isSwitch|1":["yes","no"],
        },
    })
}

app.all('/prj/sync_check/', function(req, res) {
    let resVal = getITMtable(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(getITMtable(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});



let userstoryGetDetail = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "message xxxxxxx",
       
        

        "data": {
            "bfunc_desc|5-8": /[a-zA-Z]/,
            "bfunc_id": 1,
            "req_submitter|5-8": /[a-zA-Z]/,
            "bfunc_name|5-8": /[a-zA-Z0-9]/,
            "bfunc_type": 2,
            "bfunc_status": 1,
            create_date:null,
            create_person:"",
            id:2,
            logic_sys_name:"核心一行",
            logic_sys_no:"0011",
            prj_id:"PH18-01",
            remark1:"",
            remark2:"",
            req_id:"1641",
            req_name:"继承ITM",
            us_id:"US-PH18-01-0040",

            "__value2__page": val2,
            "__value3__pageline": val3,

        },

       
    })
}

app.all('/agile/detail/', function(req, res) {
    let resVal = userstoryGetDetail(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    
    res.json(userstoryGetDetail(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});



app.all('/agile/detail/', function(req, res) {
    let resVal = userstoryGetDetail(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    
    res.json(userstoryGetDetail(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});


let userstoryGetBfunc_type = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "message xxxxxxx",
        "data":[
            {bfunc_type:"1",bfunc_type_name:"bfunc_type_name1"},
            {bfunc_type:"2",bfunc_type_name:"bfunc_type_name2"}
        ],
    })
}

app.all('/userstoryGetBfunc_type/xxxxxxxxxx/', function(req, res) {
   
    let resVal = userstoryGetBfunc_type(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(userstoryGetBfunc_type(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});


let userstoryGetLogic_sys_no = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "message xxxxxxx",
        "data":[
            {logic_sys_no:"1",logic_sys_name:"logic_sys_name1"},
            {logic_sys_no:"2",logic_sys_name:"logic_sys_name2"}
        ],
    })
}

app.all('/userstoryGetLogic_sys_no/xxxxxxxxxx/', function(req, res) {
   
    let resVal = userstoryGetLogic_sys_no(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(userstoryGetLogic_sys_no(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});

let selectBusFuncStatus = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "message xxxxxxx",
        "typeList":[
            {bfunc_type:"1",bfunc_type_name:"优化"},
            {bfunc_type:"2",bfunc_type_name:"新增"},
            {bfunc_type:"3",bfunc_type_name:"重构"},
        ],
        logicList:[
            {logic_sys_no:"Z0250",logic_sys_name:"核心银行业务处理系统"},
            {logic_sys_no:"0011",logic_sys_name:"综合前端系统"},
            {logic_sys_no:"0020",logic_sys_name:"证券业务系统"},
        ],
    })
}

app.all('/agile/selectBusFuncStatus/', function(req, res) {
   
    let resVal = selectBusFuncStatus(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(selectBusFuncStatus(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});

app.all('/agile/addBusfuncQueryCombox/', function(req, res) {
   
    let resVal = selectBusFuncStatus(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(selectBusFuncStatus(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});


let returnbfunc = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "message xxxxxxx",
        "data|2-5":[
            {
                "bfunc_name":"@name",
                "bfunc_type|1":["1", "2", "3"],
                "logic_sys_no|1":["Z0250", "0011", "0020"],
                "bfunc_desc":/[a-zA-Z]{5,8}/,
                "bfunc_id|+1":1,
                "who":"",
            },
        ],
        "__value2__": val2,
        "__value3__": val3,
        
    })
}

app.all('/userstory/returnbfunc/', function(req, res) {
   
    let resVal = returnbfunc(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(returnbfunc(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});



let get_bfunc_by_rpj_req = (val1 = 200, val2 = 1, val3 = 3) => {
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
            "bfunc_desc|5-8": /[a-zA-Z]/,
            "bfunc_id|5-8": /[a-zA-Z0-9]/,
            "bfunc_name|1": "@title",
            "bfunc_status|1": [1,2,3],
            "bfunc_type|1": [1,2,3],
            "create_date": "@date(yyyy-MM-dd)",
            "create_person":"@name",
            "id|+1":1,
            "logic_sys_name":"证券业务系统",
            "logic_sys_no":"0020",
            "prj_id":"HP1800000040-01",
            remark1:"",
            remark2:"",
            req_id:"PH18000000-xx",
            "req_name|5-8":/[a-zA-Z]/,
            us_id:"US-PH1800000-01-3333",


            "__value2__page": val2,
            "__value3__pageline": val3,

        }],

        "total|9-20": 3,
    })
}




app.all('/agile/get_bfunc_by_prj_req/', function(req, res) {
    let resVal = get_bfunc_by_rpj_req(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(get_bfunc_by_rpj_req(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});



app.all('/uploadfiles/add/', function(req, res) {
    res.json({});
    res.end()
});
app.all('/uploadfiles/detail/', function(req, res) {
    res.json({});
    res.end()
});


app.all('/agile/relative_userstory/', function(req, res) {
    res.json({
        "status": "success",
        "message": "message xxxxxxx",
        "data":"",
    });
    res.end()
});




let edit_bfunc2 = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "message xxxxxxx",
        

        "data": {
            "bfunc_desc|5-8": /[a-zA-Z]/,
            "bfunc_id|5-8": /[a-zA-Z0-9]/,
            "bfunc_name|1": "@title",
            "bfunc_status|1": [1,2,3],
            "bfunc_type|1": [1,2,3],
            "create_date": "@date(yyyy-MM-dd)",
            "create_person":"@name",
            "id|+1":1,
            "logic_sys_name":"证券业务系统",
            "logic_sys_no":"0020",
            "prj_id":"HP1800000040-01",
            remark1:"",
            remark2:"",
            req_id:"PH18000000-xx",
            "req_name|5-8":/[a-zA-Z]/,
            us_id:"US-PH1800000-01-3333",
            value:"xxx@111",
            "synergetic_relation|10-20":/[a-zA-Z0-9]/,
            operation_step:"<p>获取的文字</p>",
            version:1,


            "__value2__page": val2,
            "__value3__pageline": val3,

        },

        
    })
}

app.all('/agile/edit_bfunc2/', function(req, res) {
    let resVal = edit_bfunc2(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(edit_bfunc2(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});


app.all('/agile/add_bfunc1/', function(req, res) {
    res.json({
        "status": "success",
        "message": "message xxxxxxx",
        "data":{
            value:"xxx@111",
            version:1,
            bfunc_id:10,
        },
    });
    res.end()
});

app.all('/agile/add_bfunc2/', function(req, res) {
    res.json({
        "status": "success",
        "message": "message xxxxxxx",
        "data":"",
    });
    res.end()
});



app.all('/agile/uploadFile', function(req, res) {
    
    res.json({status: "success",message: "uploadFile success",});
    res.end()
});

app.all('/agile/delete_bfunc3/', function(req, res) {
    
    res.json({status: "success",message: "delete_bfunc3 success",});
    res.end()
});

let getuploadedfiles = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "message xxxxxxx",
        "files|0-3": [{
            "fileId|+1":1,
            "fileName":"@name",
            "file_path":"/static/img/logo.281c95a.png",
            "created_time":"@date(yyyy-MM-dd)",
            "creater":"@cname",
            "url":"http://127.0.0.1:8000/static/img/logo.281c95a.png",

            "__value2__page": val2,
            "__value3__pageline": val3,
        }],
    })
}


app.all('/agile/getuploadedfiles/', function(req, res) {
    let resVal = getuploadedfiles(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(getuploadedfiles(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});

app.all('/agile/deleteFile/', function(req, res) {
    res.json({status: "success",message: "delete_bfunc3 success",});
    res.end()
});

let deleteUserstory = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status|1": ["success","fail"],
        "message": "message xxxxxxx",
    })
}

app.all('/userstory/deleteUserstory/', function(req, res) {
    //res.json({status: "success",message: "delete_list success",});
    res.json(deleteUserstory(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});

app.all('/exportExcelFile/usDetailExp/', function(req, res) {
    res.json({status: "success",message: "usDetailExp success",});
    res.end()
});

app.all('/exportExcelFile/usBfuncExp/', function(req, res) {
    res.json({status: "success",message: "usBfuncExp success",});
    res.end()
});




app.all('/designer/application_erro/', function(req, res) {
    res.json({status: "success",message: "application_erro success",});
    res.end()
});
app.all('/designer/project_id/', function(req, res) {
    res.json({status: "success",message: "project_id success",});
    res.end()
});

app.all('/agile/groupmemagement/add_group_users/', function(req, res) {
    res.json({status: "success",message: "add_group_users success",data:"groupSnxxxxx"});
    res.end()
});

app.all('/agile/groupmemagement/add_user/', function(req, res) {
    res.json({status: "success",message: "add_users success"});
    res.end()
});

app.all('/agile/groupmemagement/delete_member/', function(req, res) {
    res.json({status: "success",message: "delete_member success"});
    res.end()
});

app.all('/agile/groupmemagement/delete_group/', function(req, res) {
    res.json({status: "success",message: "delete_group success"});
    res.end()
});

app.all('/agile/groupmemagement/delete_group_leader/', function(req, res) {
    res.json({status: "success",message: "delete_member success"});
    res.end()
});

app.all('/agile/groupmemagement/add_leader/', function(req, res) {
    res.json({status: "success",message: "add_users success"});
    res.end()
});





let GetUserByProjId = (val1 = 200, val2 = "", val3 = 3) => {
    return Mock.mock([
        {
            nick_name: 'lihua3.zh(李华-中国建设银行)',
            user_name: 'lihua3.zh',
            prj_id:"PH1800040-01",
            
        },
        {
            nick_name: 'xiebei.zh(谢蓓-中国建设银行)',
            user_name: 'xiebei.zh',
            prj_id:"PH1800040-01",
            
        },
        {
            nick_name: 'lizhuo.zh(李卓-中国建设银行)',
            user_name: 'lizhuo.zh',
            prj_id:"PH1800040-01",
        },
        
    ])
}

app.all('/agile/getUserByProjId/', function(req, res) {
    let Json = GetUserByProjId(req.body.myStatus);
    console.log("req==>", req._parsedUrl,req.statusCode,req.statusMessage);
    console.log("Json==>", Json);
    res.json(Json);
    res.end()
});


let getSetGroup = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "detail xxxxxxx",
        data: [
            {
                "group_sn":"groupSn-1",
                "groupName":"产品经理",
                "isEdit|1":[true,false],
                group_leader:"",
                "member":[
                    {
                        "nick_name":"李卓",
                        "user_name":"lizhuo.zh",
                    },
                   
                ],

            },
            {   
                "group_sn":"groupSn-2",
                "groupName":"项目经理",
                "isEdit|1":[true,false],
                group_leader:
                    {
                        "nick_name":"谢蓓",
                        "user_name":"xiebei.zh",
                    },
                member:[
                    {
                        "nick_name":"谢蓓",
                        "user_name":"xiebei.zh",
                    },
                   
                ],

            },
            {
                "group_sn":"groupSn-3",
                "groupName":"开发组",
                "isEdit|1":[true,false],
                group_leader:"",
                "member":[
                    {
                        "nick_name":"奇慧超",
                        "user_name":"qihuichao",
                    },
                    {
                        "nick_name":"黄永华",
                        "user_name":"huangyonghua",
                       
                    },
                    {
                        "nick_name":"赖磊",
                        "user_name":"lailie",
                    },
                    {
                        "nick_name":"殷良骥",
                        "user_name":"yinliangji",
                    },
                ],

            },
        ],
        
        
    })
}

app.all('/agile/groupmemagement/list/', function(req, res) {
    let Json = getSetGroup(req.body.myStatus);
    console.log("req==>", req._parsedUrl,req.statusCode,req.statusMessage);
    console.log("Json==>", Json);
    res.json(Json);
    res.end()
});


let getReqDepd = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
            "status": "success",
            "message": "getReqDepd xxxxxxx",
            "data|2-10":[
                {
                    create_time:"@date(yyyy-MM-dd)",
                    "created_user_username":"@cname",
                    "depd_desc":"@title",
                    "depd_id|5-8":/[a-zA-Z]/,
                    "depd_main_type":2,
                    "depd_name":"@cname",
                    "depd_sn|+1":1,
                    "depd_status":1,
                    "id|+10":1,
                    "modified_time":"@date(yyyy-MM-dd)",
                    "modified_user_username":"@cname",
                    "prj_id|+100":1,
                }
            ],

            "__value2__page": val2,
            "__value3__pageline": val3,

        })
}
app.all('/req/getReqDepd/', function(req, res) {
    let Json = getReqDepd(req.body.myStatus);
    console.log("req==>", req._parsedUrl,req.statusCode,req.statusMessage);
    console.log("Json==>", Json);
    res.json(Json);
    res.end()
});



let DetailReq = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "getReqDepd xxxxxxx",
        "data":{
            status:1,
            comment:"@title",
            status_name:"带实施",
            "start_time|1":["null",null,"@date(yyyy-MM-dd)"],
            req_submitter:"开发部",
            prj:83,
            create_user:"",
            "end_time|1":["null",null,"@date(yyyy-MM-dd)"],
            req_id:"RQ-PJ1800150-82",
            "settle_time":"@date(yyyy-MM-dd)",
            "req_name|5-8":/[a-zA-Z0-9]/,
            prj_type:"2",
            id:10039,
            prj_type_name:"自研",
            remark:"@title",
            intro:"@name",
            req_source:"oa",
            req_source_name:"OA",
            "depd_list|2-10":[
                {
                    create_time:"@date(yyyy-MM-dd)",
                    "created_user_username":"@cname",
                    "depd_desc":"@title",
                    "depd_id|5-8":/[a-zA-Z]/,
                    "depd_main_type":2,
                    "depd_name":"@cname",
                    "depd_sn|+1":1,
                    "depd_status":1,
                    "id|+10":1,
                    "modified_time":"@date(yyyy-MM-dd)",
                    "modified_user_username":"@cname",
                    "prj_id|+100":1,
                }
            ],
            
        },
        "__value2__page": val2,
        "__value3__pageline": val3,
    })
}
app.all('/req/DetailReq/', function(req, res) {
    let Json = DetailReq(req.body.myStatus);
    console.log("req==>", req._parsedUrl,req.statusCode,req.statusMessage);
    console.log("Json==>", Json);
    res.json(Json);
    res.end()
});




let getRequirementStatList = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "getReqDepd xxxxxxx",
        "data":[
            {
               param_name:"待实施",
               param_id:1,
            },
            {
               param_name:"分析中",
               param_id:2,
            },
            {
               param_name:"迭代中",
               param_id:3,
            },
            {
               param_name:"设计",
               param_id:4,
            },
            {
               param_name:"开发中",
               param_id:5,
            },
            {
               param_name:"用户验收测试",
               param_id:6,
            },
            {
               param_name:"已上线",
               param_id:7,
            },
            {
               param_name:"确认完成",
               param_id:8,
            },
        ],
        "__value2__page": val2,
        "__value3__pageline": val3,
    })
}
app.all('/req/getRequirementStatList/', function(req, res) {
    let Json = getRequirementStatList(req.body.myStatus);
    console.log("req==>", req._parsedUrl,req.statusCode,req.statusMessage);
    console.log("Json==>", Json);
    res.json(Json);
    res.end()
});



/************qhc */

app.all('/devtask/changeTaskStatus/', function(req, res) {
    res.json({success:true,status: "success",message: "add_users success"});
    res.end()
});


let devtaskList = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
            "success":true,
            "status": "success",
            "message": "getReqDepd xxxxxxx",

            limit:10,
            page:1,
            page_rows:10,
            pageno:1,
            rows:[],
            table_id:"listview_table",
            total:5,
            
           

            "__value2__page": val2,
            "__value3__pageline": val3,

        })
}
app.all('/devtask/list/', function(req, res) {
    let Json = devtaskList(req.body.myStatus);
    console.log("req==>", req._parsedUrl,req.statusCode,req.statusMessage);
    console.log("Json==>", Json);
    res.json(Json);
    res.end()
});


let queryCondition = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
            "success":true,
            "status": "success",
            "message": "getReqDepd xxxxxxx",
            "prjGroup":[],
            "prjUser":[],
            prj_name:"new1",
            "product_name":"一体化研发平台",
            sprintlist:[],
            sprints_story:{
                "1":[],
                "11":[],
                "21":[],
            },
            statuslist:[],
            typelist:[],
            userstory:[],
           

            "__value2__page": val2,
            "__value3__pageline": val3,

        })
}
app.all('/devtask/queryCondition/', function(req, res) {
    let Json = queryCondition(req.body.myStatus);
    console.log("req==>", req._parsedUrl,req.statusCode,req.statusMessage);
    console.log("Json==>", Json);
    res.json(Json);
    res.end()
});

let get_kanban_data = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
            "success":true,
            "status": "success",
            "message": "getReqDepd xxxxxxx",
            "statusList":[
                {
                    stateStr: "新建",
                    state: 1,
                    taskNumber: 3
                },
                {
                    stateStr: "进行中",
                    state: 2,
                    taskNumber: 4
                },
                {
                    stateStr: "完成",
                    state: 3,
                    taskNumber: 5
                },
                {
                    stateStr: "废弃",
                    state: 4,
                    taskNumber: 6
                },
            ],
            "groupList":[
                {
                    text: "用户故事"
                },
                {
                    bgcolor:"FEB159",
                    isStoryPerson:false,
                    text: "用户登录",
                    groupId: 12799,
                    "us_status|1":["提出","设计分析"],
                },
                {
                    bgcolor:"FE4514",
                    isStoryPerson:true,
                    text: "创建代码仓库",
                    groupId: 12800,
                    "us_status|1":["提出","设计分析"],
                },
                {
                    bgcolor:"FEB159",
                    isStoryPerson:true,
                    text: "未知项1",
                    groupId: 12605,
                    "us_status|1":["提出","设计分析"],
                }
            ],
            cardList:[
                {
                    "isDepend|1":["no","yes"],
                    "isFile|1":["no","yes"],
                    "isFinish|1":["finish","unfinish"],
                    isTaskPerson:true,

                    groupId:12799,
                    taskId: "TS-PJ1800150-US0001",
                    nickName: "xiebei.zh(谢蓓)",
                    taskName:"任务名1XXX",
                    userId: "xiebei.zh",
                    id:1,
                    taskStatus: 1,
                    bgcolor:"#FE4514",
                    headPortrait:"xxx/xx.jpg",

                    "desc":"<pre>*desc*</pre>",
                    "actual_hours|1":["1.2",1.2],
                    "plan_hours|1":["4.5",4.5],
                },
                {
                    "isDepend|1":["no","yes"],
                    "isFile|1":["no","yes"],
                    "isFinish|1":["finish","unfinish"],
                    isTaskPerson:true,
                    
                    groupId:12800,
                    isTaskPerson:true,
                    taskId: "TS-PJ1800150-US0002",
                    nickName: "xiebei.zh(谢蓓)",
                    taskName:"任务名2XXX",
                    userId: "xiebei.zh",
                    id:2,
                    taskStatus: 2,
                    bgcolor:"#FEB159",
                    headPortrait:"xxx/xx.jpg",

                    "desc":"<pre>*desc*</pre>",
                    "actual_hours|1":["1.2",1.2],
                    "plan_hours|1":["4.5",4.5],
                },
                {
                    "isDepend|1":["no","yes"],
                    "isFile|1":["no","yes"],
                    "isFinish|1":["finish","unfinish"],
                    isTaskPerson:true,
                    
                    groupId:12799,
                    isTaskPerson:true,
                    taskId: "TS-PJ1800150-US0003",
                    nickName: "xiebei.zh(谢蓓)",
                    taskName:"任务名3XXX",
                    userId: "xiebei.zh",
                    id:3,
                    taskStatus: 4,
                    bgcolor:"#FE4514",
                    headPortrait:"xxx/xx.jpg",

                    "desc":"<pre>*desc*</pre>",
                    "actual_hours|1":["1.2",1.2],
                    "plan_hours|1":["4.5",4.5],
                },
                {
                    "isDepend|1":["no","yes"],
                    "isFile|1":["no","yes"],
                    "isFinish|1":["finish","unfinish"],
                    isTaskPerson:true,
                    
                    groupId:12605,
                    isTaskPerson:false,
                    taskId: "TS-PJ1800150-US0004",
                    nickName: "xiebei.zh(谢蓓)",
                    taskName:"任务名4XXX",
                    userId: "xiebei.zh",
                    id:4,
                    taskStatus: 3,
                    bgcolor:"#FEB159",
                    headPortrait:"xxx/xx.jpg",

                    "desc":"<pre>*desc*</pre>",
                    "actual_hours|1":["1.2",1.2],
                    "plan_hours|1":["4.5",4.5],
                },
                {
                    "isDepend|1":["no","yes"],
                    "isFile|1":["no","yes"],
                    "isFinish|1":["finish","unfinish"],
                    isTaskPerson:true,
                    
                    groupId:12605,
                    isTaskPerson:false,
                    taskId: "TS-PJ1800150-US0005",
                    nickName: "lizhuo.zh(李卓)",
                    taskName:"任务名5XXX",
                    userId: "lizhuo.zh",
                    id:5,
                    taskStatus: 2,
                    bgcolor:"#FEB159",
                    headPortrait:"xxx/xx.jpg",

                    "desc":"<pre>*desc*</pre>",
                    "actual_hours|1":["1.2",1.2],
                    "plan_hours|1":["4.5",4.5],
                },
            ],

            "__value2__page": val2,
            "__value3__pageline": val3,

        })
}
app.all('/devtask/get_kanban_data/', function(req, res) {
    let Json = get_kanban_data(req.body.myStatus);
    console.log("req==>", req._parsedUrl,req.statusCode,req.statusMessage);
    console.log("Json==>", Json);
    res.json(Json);
    res.end()
});


let mockIterationList = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": val1,
        "message": "success",
        "rows|3-9": [{
            "id|4-7": 4,
            "prj_id|4-7": 4, //所属项目
            "sprint_id|4-7": 4, //迭代编号
            "sprint_name|5-8": /[0-9a-zA-Z]/, //迭代名称
            "start_time": "2018-10-10",
            "end_time": "2018-12-10",
            "status": "进行中"
        }],
        "total|3-9": 3,
        "count|3-9": 3,
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




let get_queryPublicRep = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "message get_queryPublicRep",
        pageRows:10,
        "data|3-5": [{

            "policy|1":["RELEASE","SNAPSHOT"],
            "path":"http://xxxxx.xxxx.xx/xx/xx",
            "repId|5-8": /[a-zA-Z]/,
            "type|1":["proxy","group","hosted"],

            "__value2__page": val2,
            "__value3__pageline": val3,

        }],

        "total|20-30":1,
        "count|20-30":1,
        
    })
}




app.all('/maven/queryPublicRep/', function(req, res) {
    let resVal = get_queryPublicRep(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(get_queryPublicRep(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});





app.all('/req/prj_time/', function(req, res) {
    let obj = {
        status: "success",
        message: "add_users success",
        data:{
            end_time:"2019-05-01",
            intro:"@name",
            req_source:"oa",
        },
        req_sourceList:[
            {
                value: 'server',
                label: '服务请求',
            },
            {
                value: 'oa',
                label: 'OA',
            },
            {
                value: 'mail',
                label: '邮件',
            },
            {
                value: 'tel',
                label: '电话',
            },
            {
                value: 'metting',
                label: '会议',
            },
        ],
    }
    res.json(obj);
    res.end()
});



let getDayDownCount = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "message getDayDownCount",
        "data|30": [{
            date:"@date(yyyy-MM-dd)",
            "value|100-10000":0,
            "__value2__page": val2,
            "__value3__pageline": val3,

        }],
    })
}




app.all('/maven/getDayDownCount/', function(req, res) {
    let resVal = getDayDownCount(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(getDayDownCount(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});

app.all('/maven/getDayActiveUserCount/', function(req, res) {
    let resVal = getDayDownCount(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(getDayDownCount(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});







let getDayActiveUserList = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "message getDayActiveUserList",
        "data|10": [{
            "ip|1":["255.255.255.255","192.168.1.1"],
            "value|100-10000":0,
            time:"@date(yyyy-MM-dd)",
            "__value2__page": val2,
            "__value3__pageline": val3,
        }],
        "total|20-30":0,
        "pagetotal|20-30":0,
        "totalDown|100-1000":0,
    })
}




app.all('/maven/getDayActiveUserList/', function(req, res) {
    let resVal = getDayActiveUserList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(getDayActiveUserList(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});

app.all('/maven/queryUserRecordsByIp/', function(req, res) {
    let resVal = getDayActiveUserList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(getDayActiveUserList(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});


app.all('/maven/getDownTopGroupByIp/', function(req, res) {
    let resVal = getDayActiveUserList(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(getDayActiveUserList(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});


app.all('/project/proByUser/', function(req, res) {
    res.json({status: "success",message: "proByUser success",data:[3,1,2,4,5,6,7,8,9]});
    res.end()
});

app.all('/project/add_role/', function(req, res) {
    res.json({status: "success",message: "project/add_role success"});
    res.end()
});

app.all('/project/del_role/', function(req, res) {
    res.json({status: "success",message: "project/add_role success"});
    res.end()
});

app.all('/project/del_user/', function(req, res) {
    res.json({status: "success",message: "project/del_user success"});
    res.end()
});

app.all('/project/add_user/', function(req, res) {
    res.json({status: "success",message: "project/add_user success"});
    res.end()
});

app.all('/project/switch/', function(req, res) {
    res.json({status: "success",message: "project/switch success"});
    res.end()
});





let searchJarByKey = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "message getDayActiveUserList",
        "data|10": [{
            "repId|5-8": /[a-zA-Z]/,
            "groupId|5-8": /[a-zA-Z0-9]/,
            "artifactId|5-8": /[a-zA-Z]/,
            "version|1-100":0,
            "type|1":["jar","pom","java-source"],
            "__value2__page": val2,
            "__value3__pageline": val3,
        }],
        "count|20-30":0,
        "total|20-30":0,
        "pagetotal|20-30":0,
    })
}




app.all('/maven/searchJarByKey/', function(req, res) {
    let resVal = searchJarByKey(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(searchJarByKey(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});

app.all('/maven/searchJarByGav/', function(req, res) {
    let resVal = searchJarByKey(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(searchJarByKey(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});


app.all('/maven/getAllRepId/', function(req, res) {
    res.json({status: "success",message: "proByUser success",data:["all","id1","id2",3,4,5,6,7,8,9]});
    res.end()
});



let queryJarDetailByGav = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "message getDayActiveUserList",
        "data|4": [{
            "fileName|1": ["file1.rar","file2.rar"],
            "url|1": ["//www.baidu.com/","//www.sohu.com/"],
            "xml|1": ["<w><v>vw</v></w>","<m><z>mz</z></m>"],
            "__value2__page": val2,
            "__value3__pageline": val3,
        }],
        "count|20-30":0,
        "total|20-30":0,
        "pagetotal|20-30":0,
    })
}




app.all('/maven/queryJarDetailByGav/', function(req, res) {
    let resVal = queryJarDetailByGav(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(queryJarDetailByGav(req.body.myStatus, req.body.page, req.body.pageline));
    res.end()
});



let projectCondition = (val1 = 200, val2 = 1, val3 = 3) => {
    return Mock.mock({
        "status": "success",
        "message": "message projectCondition",
        "type_list":[
            {
                type_num:1,
                type_name:"立项",
            },
            {
                type_num:2,
                type_name:"自研",
            }
        ],
        "org_list|5":["@title"],

        "dept_nm_list|5":[
            {
                "num|+1":1,
                "name|+1":1,
            },
        ],
        "stff_nm_list|6":[
            {
                "num|+1":1,
                "name|+1":1,
            },
        ],

        "subject_list":[
            {
                "num":1,
                "name":"类型1",
            },
            {
                "num":"2",
                "name":"类型2",
            },
            {
                "num":3,
                "name":"类型3",
            },
            {
                "num":"SU-0000",
                "name":"SU-0000",
            },
        ],

        "itm_status_list":[
            {
                "num":"1",
                "name":"状态1",
            },
            {
                "num":2,
                "name":"状态2",
            },
            {
                "num":"3",
                "name":"状态3",
            },
            {
                "num":4,
                "name":"状态4",
            },
            {
                "num":"5",
                "name":"状态5",
            },
        ],
        dept_list:[
            {
                org_id:1,
                org_name:"dept-->name1",
                org_sn:11,
            },
            {
                org_id:2,
                org_name:"name2",
                org_sn:22,
            },
            {
                org_id:3,
                org_name:"name3",
                org_sn:33,
            }
        ],
        aply_list:[
            {
                org_id:1,
                org_name:"aply-->name1",
                org_sn:11,
            },
            {
                org_id:2,
                org_name:"name2",
                org_sn:22,
            },
            {
                org_id:3,
                org_name:"name3",
                org_sn:33,
            }
        ],

        "data": [{
            "__value2__page": val2,
            "__value3__pageline": val3,
        }],
        "count|20-30":0,
        "total|20-30":0,
        "pagetotal|20-30":0,
    })
}


app.all('/project/condition/', function(req, res) {
    let resVal = projectCondition(req.body.myStatus, req.body.page, req.body.pageline);
    console.log("req==>", req.body);
    console.log("resVal==>", resVal);
    res.json(projectCondition(req.body.myStatus, req.body.page, req.body.pageline));
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