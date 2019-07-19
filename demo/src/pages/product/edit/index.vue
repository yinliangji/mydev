<template>
	<div class="pageContent">
        <goAgile :go="'/product'" :text="'返回用户故事列表'" :Top="'5'" />
        <Card>
            <div class="productAddBox">

                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140" >
                    <h3 class="Title"><span>基本信息</span></h3>
                    <div class="fromBox">
                       
                        <!-- <FormItem label="所属产品" >
                            <span>{{formValidate.product_name}}</span>
                        </FormItem> -->
                   
                        <FormItem label="所属项目" >
                            <span>{{formValidate.prj_name}}</span>
                        </FormItem>

                        <FormItem label="用户故事名称" prop="userstory_name">
                            <Input v-model="formValidate.userstory_name" placeholder="请填用户故事名称"></Input>
                        </FormItem>

                        <Row>
                            <Col span="12">
                                <FormItem label="责任人" >
                                    <!-- <span>{{formValidate.charger}}</span> -->
                                    <Select filterable clearable v-model="formValidate.nick_name" placeholder="请选择责任人">
                                        <Option v-for="(item,index) in chargerList" :key="index" :value="item.value">{{item.label}}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span="12">
                               <FormItem label="故事类型" prop="userstory_type">
                                    <Select v-model="formValidate.userstory_type" placeholder="请选择故事类型">
                                        <Option v-for="(item,index) in userstory_typeList" :key="index" :value="item.value">{{item.label}}</Option>
                                        <!-- <Option value="1">用户需求</Option>
                                        <Option value="2">生产问题</Option>
                                        <Option value="3">自主创新</Option> -->
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>

                        <FormItem label="责任协助人" >
                            <span style="position: relative;">
                                <Tag 
                                    v-for="(item,index) in assistList"
                                    :value="index" 
                                    :key="index" 
                                    :name="index" 
                                    closable 
                                    @on-close="assistDel">
                                    {{ item.label}}
                                </Tag>
                                <Button 
                                    icon="ios-plus-empty" 
                                    type="dashed" 
                                    size="small" 
                                    @click="addAssist">
                                    添加责任协助人
                                </Button>
                                
                            </span>
                        </FormItem>

                        
                    


                        
                        <!-- <FormItem label="业务模块" prop="business">
                            <Select v-model="formValidate.business" multiple >
                                <Option v-for="item in businessList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem> -->

                        

                        <!-- <Row>
                            <Col span="12">
                               
                            </Col>
                            <Col span="12">
                                 <FormItem label="负责人" prop="person">
                                    <Select v-model="formValidate.person" placeholder="请选择负责人">
                                        <Option value="谢呗5">谢呗5</Option>
                                        <Option value="谢呗6">谢呗6</Option>
                                        <Option value="谢呗7">谢呗7</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row> -->  

                        <FormItem label="状态" prop="userstory_status" id="myUserstoryStatus">
                            <RadioGroup v-model="formValidate.userstory_status">
                                <Radio :disabled="item.value == formValidate.userstory_status ? false : true" v-for="(item,index) in userstory_statusList" :key="index" :label="item.value">{{item.label}}</Radio>
                                <!-- <Radio label="1">提出</Radio>
                                <Radio label="2">开发中</Radio>
                                <Radio label="3">测试</Radio>
                                <Radio label="4">上线</Radio> -->
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="优先级" prop="proi">
                            <RadioGroup v-model="formValidate.proi">
                                <Radio v-for="(item,index) in proiList" :key="index" :label="item.value" >{{item.label}}</Radio>
                                <!-- <Radio label="1">高</Radio>
                                <Radio label="2">中</Radio>
                                <Radio label="3">低</Radio> -->
                               
                            </RadioGroup>
                        </FormItem>

                        <FormItem label="故事描述">
                            <Input v-model="formValidate.userstory_desc" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请填写故事描述"></Input>
                        </FormItem>
                        <FormItem label="验收标准">
                            <Input v-model="formValidate.us_accept" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请填写验收标准"></Input>
                        </FormItem>
                    </div>


                    <h3 class="Title"><span>计划效率相关</span></h3>
                    <div class="fromBox">

                        <FormItem label="所属迭代" prop="sprint">
                            <Select clearable v-model="formValidate.sprint" placeholder="请选所属迭代">
                                <Option v-for="(item , index) in sprintList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                            <ToolTip content="计划在哪个迭代周期内完成此用户故事" />
                        </FormItem>

                        <Row >
                            <Col span="12">
                               <FormItem label="用户故事点数" prop="manhour">
                                    <Input v-model="formValidate.manhour" placeholder="请填写用户故事点数" number ></Input>
                                    <ToolTip content="统计用户故事的工时(2人/天 表示2个点)" />
                                </FormItem>
                            </Col>
                            <Col span="12" class="relZIndex1">
                                
                            </Col>
                            
                        </Row>

                        

                        
                    </div>

                    <h3 class="Title"><span>需求项分析相关</span></h3>

                    <div class="fromBox">
                        <FormItem label="所属需求项" prop="req_id">
                            <Select filterable clearable v-model="formValidate.req_id" placeholder="请选择所属需求项">
                                <Option v-for="(item , index) in req_idList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                            <ToolTip :W="135" content="此用户故事来源的需求项" />
                        </FormItem>

                        <div class="transBox" v-show="false">
                            <label class="transBoxTitle">关联业务功能</label>
                            <Row>
                                <Col span="10">&nbsp;</Col>
                                <Col span="14">
                                    <!-- 搜索选择开始 -->
                                    <div v-for="(myItem,index) in formValidate.AddGroupList" :key="index" >
                                       
                                        <FormItem 
                                            :label-width="100"
                                            :label="myItem.myLabel" 
                                            :prop="'AddGroupList.'+index+'.group'"
                                            :rules="{required: myItem.required, type: 'array', message: '请选择或者填写'+myItem.myLabel+'，不能为空！', trigger: 'change'}" 
                                             
                                            :ref="myItem.myRef+index" 
                                            :class="myItem.myRef+index"
                                            >
                                            <Select
                                                :ref="myItem.myRef+index+'_sel'"
                                                :class="myItem.myRef+index+'_sel'"
                                                @on-change="selectChange" 
                                                @on-query-change="selectQueryChange"
                                                v-model="myItem.group" 
                                                :id="'sel'+index" 
                                                filterable 
                                                :loading="inputLoad"  
                                                multiple 
                                                label-in-value
                                                :placeholder="'请输入内容并选择【'+myItem.myLabel+'】'"
                                                >
                                                <Option v-for="(item,index2) in myItem.groupList" :value="item.value" :label="item.label" :key="index2">
                                                    {{ item.label }}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </div>
                                    <!-- 搜索选择结束 -->
                                </Col>
                                <Trans 
                                    :TransDataGroup = "formValidate.AddGroupList[0].group" 
                                    :TransDataGroupList = "formValidate.AddGroupList[0].groupList" 
                                    :isPopsAdd = "isPopsAdd"
                                    :popsItem = "popsItem"
                                    :toLeftData="toLeftData"
                                    @dataLfn="leftData"
                                    @dataRfn="rightData"
                                    @modifyfn="modifyData"
                                    @modifyTagfn="modifyTagData"
                                    />
                            </Row>

                        </div>
                        
                       <!--  <FormItem label="用户故事提出人" prop="introducer">
                            <Select v-model="formValidate.introducer" placeholder="请选择用户故事提出人">
                                <Option value="提出人1">提出人1</Option>
                                <Option value="提出人2">提出人2</Option>
                                <Option value="提出人3">提出人3</Option>
                            </Select>
                        </FormItem>

                        <FormItem label="提出人部门" prop="department">
                            <Input v-model="formValidate.department" placeholder="请填提出人部门"></Input>
                        </FormItem> -->

                        <!-- <Row>
                            <Col span="12">
                                
                            </Col>
                            <Col span="12">
                                 
                            </Col>
                        </Row> -->
                    </div>

                    <h3 class="Title"><span>依赖相关</span></h3>
                    <div class="fromBox">

                        <FormItem label="添加依赖项" >
                            <span style="position: relative;">
                                <Tag 
                                    v-for="(item,index) in dependList"
                                    :value="index" 
                                    :key="index" 
                                    :name="index" 
                                    closable 
                                    @on-close="dependDel">
                                    {{ item.depd_name}}
                                </Tag>
                                <Button 
                                    icon="ios-plus-empty" 
                                    type="dashed" 
                                    size="small" 
                                    @click="addDepend">
                                    添加依赖项
                                </Button>
                                <ToolTip  placement="top-start" :T="-4" content="建议针对项目组外部依赖项的跟踪" />
                            </span>
                        </FormItem>
                        
                        <FormItem label="" >
                            &nbsp;
                        </FormItem>
                    </div>

                    <FormItem>
                        <Button type="primary" :loading="modal_add_loading" @click="submitAdd">
                            <span v-if="!modal_add_loading">提交</span>
                            <span v-else>Loading...</span>
                        </Button>
                        <Button  style="margin-left: 8px" @click="cancel">返回</Button>
                    </FormItem>
                </Form>
               
            </div>
        </Card>
        <Depend 
            :prjName="formValidate.prj_name" 
            :DependOnOff="dependonoff" 
            @sendDepend="receiveDepend" 
            @sendCloseDepend="receiveCloseDepend" 
        />
        <Assist 
            :Data="myAssistList"
            :List="myList"
            :AssistOnOff="assistonoff" 
            @sendAssist="receiveAssist" 
            @sendCloseAssist="receiveCloseAssist" 
        />
        <GoAgileMode :Data="GO" :Text="GOText" />
    </div>
</template>
<script>
import Store from '@/vuex/store'
import Trans from '@/pages/product/add/trans'
import Depend from '@/pages/product/add/depend'
import Assist from '@/pages/product/add/assist'

import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
import GoAgileMode from "@/components/goAgileMode";
const {storyAdd,storyEdit,storyGetSprint,storyGetReq,modifyCondition,publishUser,userstoryAddGroup,userstoryGetDetail,userstoryGetBfunc_type,userstoryGetLogic_sys_no,userstoryGetReturnbfunc,storyGetDetail,projectListDataNew,getPermission} = Common.restUrl;

const validateNumber = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请填写内容，不能为空'));
    }
    // 模拟异步验证效果
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error('请填写数字'));
        } else {
            callback();
            // if (value < 18) {
            //     callback(new Error('Must be over 18 years of age'));
            // } else {
            //     callback();
            // }
        }
    }, 1000);
};

const validateNumber2 = (rule, value, callback) => {
    if (!value) {
        return callback();
    }else if (!Number.isInteger(value)) {
        return callback(new Error('请填写数字'));
    }else{
        callback();
    }
    // 模拟异步验证效果
    /*
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error('请填写数字'));
        } else {
            callback();
            // if (value < 18) {
            //     callback(new Error('Must be over 18 years of age'));
            // } else {
            //     callback();
            // }
        }
    }, 1000);
    */
};
export default {
    beforecreated(){
        //console.log("productAdd--beforecreated-------",this.formValidate,this.req_idList,"sprintList=>",this.sprintList)
    },
    created(){
        //console.log("productAdd--created-------",this.formValidate,this.req_idList,"sprintList=>",this.sprintList);
        this.addCheckSerch();//搜索查询
        Common.GetProjectList(defaultAXIOS,this,Common,projectListDataNew);
    },
    beforeUpdate(){
        //console.log("productAdd--beforeUpdate-------",this.formValidate,this.req_idList,"sprintList=>",this.sprintList)
    },
    updated(){
        //console.log("productAdd--updated-------",this.formValidate,this.req_idList,"sprintList=>",this.sprintList)
        if(this.addtest){
            this.$router.push('/product')
        }
       
    },
    computed: {
        addtest() {
            return this.$store.state["ADD_DATA_TEST"].data
        },
    },
    data() {
        return {
            modaAdd: false,
            ADDorEDIT:true,
            modal_add_loading: false,
            editTableData:false,
            formValidate: {
                userstory_id:"",
                userstory_name: "",
                userstory_type:"",
                userstory_status:"",
                proi:"",
                userstory_desc:"",
                sprint:"",
                prj_name:"",
                product_name:"",
                id:"",
                prj_id:"",
                prod_id:"",
                req_id:"",
                req_name:"",
                manhour:"",

                charger:"",//一对
                nick_name:"",//一对

                AddGroupList: [], //搜索查询
                bfunc: [], //弹出业务窗口

                us_accept:"",
                
            },
            req_idList:[
                
            ],
            sprintList:[
               
            ],
            businessList: [
            ],
            ruleValidate: {
                userstory_name: [
                    { required: true, message: '内容不能为空', trigger: 'blur' }
                ],
                department: [
                    { required: false, message: '内容不能为空', trigger: 'blur' }
                ],

                userstory_type: [
                    { required: true, message: '内容不能为空', trigger: 'change' }
                ],
                req_id: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                introducer: [
                    { required: false, message: '内容不能为空', trigger: 'change' }
                ],

                person: [
                    { required: true, message: '内容不能为空', trigger: 'change' }
                ],
                userstory_status: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                
                sprint: [
                    { required: false, message: '请选择', trigger: 'change' }
                ],

                proi: [
                    { required: false, message: '请选择', trigger: 'change' }
                ],
                manhour: [
                    { required: false,type: 'number',validator: validateNumber2, message: 'Incorrect number format', trigger: 'blur' }
                
                    // { required: true, message: 'The name cannot be empty', trigger: 'blur' },
                    // { type: 'number', message: 'Incorrect email format', trigger: 'blur' }
                ],
                mission: [
                    {required: true, validator: validateNumber, trigger: 'blur' }
                ],
            },

            proiList:[],
            userstory_typeList:[],
            userstory_statusList:[],
            NewStatusList:[
            ],

            chargerList:[],
            //查询搜索开始
            inputLoad:false,
            isPopsAdd:false,
            popsItem:false,
            //查询搜索结束
            //穿梭开始
            toLeftData:false,
            //穿梭结束
            
            //依赖开始
            dependList:[],
            depd_sn:"",
            dependonoff:false,
            //依赖结束
            //协助人开始
            assistList:[],
            assistonoff:false,
            //协助人结束
            

            prj_permission:[],
            identity:"",
            //检测id是否在projectListDataNew列表里
            GO:false,
            GOText:"",
        }
    },
    mounted(){


        this.getPermissionFn(getPermission).then((result)=>{
            let IS = this.authIs2(['icdp_userStory_mng','icdp_userStory_view']);
            if(IS){
                this.GO = true;
                this.GOText = "没有权限";    
            }
        },()=>{
            this.showError("获取权限失败");
        })
        
        if(!this.$router.history.current.query.fromEdit){
            Common.UserstorySession(Common);
        }

        let ID = Common.GETID(this,Common);
        let prj_ID = false;
        let prod_ID = false;
       
        if(this.$router.history.current.query.DATA){
            
            let _DATA = JSON.parse(this.$router.history.current.query.DATA);
            //console.log("_DATA=",_DATA)
            this.formValidate.userstory_id = _DATA.userstory_id;

            this.storyGetDetailFn(storyGetDetail,((D)=>{return D ? D : _DATA.id})(_DATA.detail_id));

            this.getStoryEditFn(_DATA)
            this.storyGetSprintFn(storyGetSprint,ID,ID,_DATA.prod_id)
            this.storyGetReqFn(storyGetReq,ID,ID,_DATA.prod_id);


            //this.storyGetConditionFn(storyGetCondition,"userstory_type",ID);
            //this.storyGetConditionFn(storyGetCondition,"userstory_status",ID);
            this.storyGetConditionFn(modifyCondition,"proi",ID).then(()=>{
                
                let any = this.req_idList.findIndex(item => this.formValidate.req_id == item.value+"");
                if(any == -1){
                    this.formValidate.req_id = "";
                }
                if(!this.$route.query.Copy){
                    return
                }
                if(Array.isArray(this.userstory_statusList) && this.userstory_statusList.length){
                    this.formValidate.userstory_status = this.userstory_statusList[0].value
                }
                if(Array.isArray(this.req_idList) && this.req_idList.length){

                    let isOver = this.req_idList.find((item)=>{
                        return item.value == this.formValidate.req_id;
                    })
                    if(isOver && isOver.req_status == "8"){
                        this.formValidate.req_id = "";
                    }
                    if(this.req_idList[0].req_status || this.req_idList[0].req_status_name){
                        Common.DelArrN(this.req_idList,"8","req_status");
                        if(!this.req_idList.length){
                            Common.CommonWarning(this,"都是已完成的需求，没有可选需求！");
                        }     
                    }

                    /*
                    if(isOver && isOver.label.indexOf("@需求完成") != -1){
                        this.formValidate.req_id = "";
                    }

                    let isOvers = this.req_idList.filter((item)=>{
                        return item.label.indexOf("@需求完成") != -1;
                    })

                    isOvers.forEach((item)=>{
                        Common.DelArrN(this.req_idList,item.value,"value")    
                    })
                    */

                }

            },()=>{

            })

            this.publishUserFn(publishUser);

            this.userstoryGetReturnbfuncFn(userstoryGetReturnbfunc,Common.GETID(this,Common),Common.GETprjid(this,Common),_DATA.userstory_id)

            

        }else{
            this.$router.push('/product');
        }
    },
    methods:{

        authIs(KEY){
            return Common.auth(this,KEY)            
        },
        authIs2(KEY){
            return Common.auth2(this,KEY)            
        },
        

        getPermissionFn(URL,params){
            return Common.GetPermission(defaultAXIOS,this,URL,params);
        },

        storyGetDetailFn(URL = "",detail_id){
            return defaultAXIOS(URL,{detail_id},{timeout:5000,method:'get'})
            .then((response) => {
                let myData = response.data;
                //console.log("<======product detail***response+++",response,myData,"======>");

                if(Object.getOwnPropertyNames(myData).length >2){
                    this.dependList = myData.depd_list;
                    this.formValidate.manhour = myData.manHours - 0;
                    this.assistList = ((arr)=>{
                        let _arr = [];
                        let obj = {};
                        if(arr && Array.isArray(arr)){
                            arr.forEach((item)=>{
                                obj.value = (item.value || item.user_name)+"";
                                obj.label = (item.label || item.nick_name)+"";
                                _arr.push(obj);
                                obj = {};
                            })
                        }
                        return _arr
                    })(myData.assist_list);
                    
                    
                    return Promise.resolve(myData)
                }else{
                    return Promise.reject("没有数据");
                    
                }

            })
            .catch( (error) => {
                console.log(error);
                this.showError(error);
                return Promise.reject(error);
                
            });
        },
        //依赖开始
        addDepend(){
            this.dependonoff = true;
        },
        dependDel(event,name){
            this.dependList.splice(name,1)
        },
        receiveDepend(obj){
            this.dependList.push(obj);
            this.dependonoff = false;
        },
        receiveCloseDepend(boo){
            this.dependonoff = boo;
        },
        //依赖结束
        //协助人开始
        addAssist(){
            this.assistonoff = true;
        },
        assistDel(event,name){
            this.assistList.splice(name,1)
        },
        receiveCloseAssist(boo){
            this.assistonoff = boo;
        },
        receiveAssist(arr){
            if(Array.isArray(arr)){
                arr.forEach((item)=>{
                    for(let i=0;i<this.chargerList.length;i++){
                        if(item == this.chargerList[i].value){
                            this.assistList.push(this.chargerList[i]);
                        }
                    }
                })
            }
            this.assistonoff = false;
            //return
            //this.assistList.push(obj);
            //this.assistonoff = false;
        },
        //协助人结束
        //穿梭开始
        userstoryGetReturnbfuncFn(URL = "",id,prj_id,us_id){
            defaultAXIOS(URL,{id,prj_id,us_id},{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                //console.log("<======product userstoryGetReturnbfunc***+++",response,myData,"======>");
                if(myData.status = "success"){
                    this.toLeftData = myData.data;
                    for(let i=0;i<this.toLeftData.length;i++){
                        for(let k in this.toLeftData[i]){
                            this.toLeftData[i][k] = this.toLeftData[i][k]+"";
                        }
                    }
                }else{
                    this.showError(error);
                }
                
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
        //穿梭结束
        //查询搜索开始
        modifyTagData(D){
            Common.ModifyTagData(D,this)
        },
        modifyData(v,i,is){
            //view edit add
        },
        leftData(D){
            this.formValidate.bfunc = D;
        },
        rightData(D){
        },
        selectQueryChange(ITEM){
            //console.log(ITEM,"selectQueryChange")
        },
        selectChange(ITEM){
            //console.log(ITEM,"selectChange");
            Common.SelectChange(this);
        },
        addCheckSerch(){
            Common.AddCheckSerch(this,"已有业务功能","xxxxx",false,false,"");
        },
        projectGroupFn(URL,params = {},ARR,thatEle){
            Common.ProjectGroupFN(defaultAXIOS,this,URL,params,ARR,thatEle);
        },
        //查询搜索结束
        publishUserFn(URL,params = {}){
            
            let dataJson = JSON.parse(this.$router.history.current.query.DATA)
            Common.AddChargerMenu(this,"charger",{charger:dataJson.nick_name,nick_name:dataJson.charger});
            this.formValidate.nick_name = "";
            setTimeout(()=>{
                this.formValidate.nick_name = dataJson.charger;
            },1)
            
            //return Common.PublishUser(defaultAXIOS,this,URL,params)
        },
        storyGetConditionFn(URL,condition,prj_id){
            return Common.GetConditionAll(defaultAXIOS,this,URL,"xxxxx",prj_id,["userstory_type","userstory_status","proi","charger","sprint","req_id"]);
            //Common.GetCondition(defaultAXIOS,this,URL,condition,prj_id);
        },
        storyGetReqFn(URL = "",id,prj_id,prod_id){
            return
            defaultAXIOS(URL,{id,prj_id,prod_id},{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                //console.log("<======product get storyGetReq***response+++",response,myData,"======>");
                
                if(myData.data && myData.data.length){
                    //value: 'New York',
                    // label: '业务模块1'
                    let _tempObj = {};
                    for(let i=0;i<myData.data.length;i++){
                        _tempObj.value = myData.data[i].req_id+"";
                        _tempObj.label = myData.data[i].req_name+"";
                        this.req_idList.push(_tempObj);
                        _tempObj = {};
                    }
                    
                }else{
                    this.showError("没有数据");
                }
                
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
        storyGetSprintFn(URL = "",id,prj_id,prod_id){
            return
            defaultAXIOS(URL,{id,prj_id,prod_id},{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                //console.log("<======product get sprintlist***response+++",response,myData,"======>");
                
                if(myData.sprintlist && myData.sprintlist.length){
                     //value: 'New York',
                //     label: '业务模块1'
                    let _tempObj = {};
                    for(let i=0;i<myData.sprintlist.length;i++){
                        _tempObj.value = myData.sprintlist[i].sprint? myData.sprintlist[i].sprint+"" : myData.sprintlist[i].sp_id+"";
                        _tempObj.label = myData.sprintlist[i].sp_name+"";
                        this.sprintList.push(_tempObj);
                        _tempObj = {};
                    }

                    
                }else{
                    this.showError("没有数据");
                }
                
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
        getStoryEditFn(DATA){
            for (let i in this.formValidate){
                if(i == "manhour"){
                    let temp;
                    if(Common.replaceNullFn(DATA.manHours).toString().indexOf("/") != -1){
                        temp = "/"
                    }else if(Common.replaceNullFn(DATA.manHours).toString().indexOf("|") != -1){
                        temp = "|"
                    }
                    temp = temp? DATA.manHours.split(temp)[1] : Common.replaceNullFn(DATA.manHours);
                    this.formValidate.manhour = Number(temp)
                }else if(i == "AddGroupList" || i == "bfunc"){
                }else{
                    this.formValidate[i] = (DATA[i] || "")+"";
                }
            }

            let _Copy = this.$route.query.Copy;
            if(_Copy){
                this.formValidate.userstory_name = _Copy+this.formValidate.userstory_name;
            }

        },
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
        editItem(I){
            //this.tableDataIndex = I;
            this.modaAdd = true;
            this.ADDorEDIT = false;
        },
        formItemReset(){

            this.formValidate.userstory_name='';
            this.formValidate.userstory_type="";
            this.formValidate.userstory_status="";
            this.formValidate.proi="3";
            this.formValidate.userstory_desc="";
            this.formValidate.sprint="";
            this.formValidate.manhour="";
            this.formValidate.mission="";
            this.formValidate.product_name="";
            this.formValidate.prj_name="";
            this.formValidate.req_id="";
            this.formValidate.req_name="";

            this.formValidate.bfunc = [];

            this.formValidate.us_accept = "";
          
        },
        submitAddData(){
            let _bfunc = this.formValidate.bfunc ? JSON.stringify(this.formValidate.bfunc) : "";

            let _sprint = Common.replaceNullFn(this.formValidate.sprint);
            let _charger = Common.replaceNullFn(this.formValidate.nick_name);
            let _nick_name = Common.replaceNullFn(this.formValidate.charger);
            let _prj_id = this.$route.query.Copy?Common.GETprjid(this,Common):this.formValidate.prj_id;
            let _id = this.$route.query.Copy?Common.GETID(this,Common):this.formValidate.id;

            let _assist_list = ((arr)=>{
                let _arr = [];
                let obj = {};
                if(arr && Array.isArray(arr)){
                    arr.forEach((item)=>{
                        obj.user_name = item.value;
                        obj.nick_name =  item.label;
                        _arr.push(obj);
                        obj = {};
                    })
                }
                return JSON.stringify(_arr)
            })(this.assistList)

            // let _sprint = (this.formValidate.sprint === null ? "" : this.formValidate.sprint) || "";
            // let _charger = (this.formValidate.nick_name === null ? "" : this.formValidate.nick_name) || "";
            // let _nick_name = (this.formValidate.charger === null ? "" : this.formValidate.charger) || "";

            let tempData = {
                userstory_name: this.formValidate.userstory_name,
                userstory_type: this.formValidate.userstory_type,
                userstory_status:this.formValidate.userstory_status,
                "proi": this.formValidate.proi,
                "userstory_desc":this.formValidate.userstory_desc,
                sprint:_sprint,
                manHours:this.formValidate.manhour,
                mission:this.formValidate.mission + " | 0",
                icon: "/assets/images/user_02.png",
                id:_id,
                prj_id:_prj_id,
                prod_id:this.formValidate.prod_id,
                product_name:this.formValidate.product_name,
                prj_name:this.formValidate.prj_name,
                req_id:this.formValidate.req_id,
                req_name:this.formValidate.req_name,
                charger:_charger,//一对
                nick_name:_nick_name,//一对
                bfunc:_bfunc,
                userstory_id:this.formValidate.userstory_id,
                depd_sn:this.formValidate.userstory_id,
                depd_main_type:2,
                depd_list:this.dependList,
                us_accept:this.formValidate.us_accept,
                username:Common.getStorageAndCookie(this,Common,"username"),
                assist_list:_assist_list,
            
            }
            let URL = this.$route.query.Copy?storyAdd:storyEdit;
            defaultAXIOS(URL,tempData,{timeout:20000,method:'post'}).then((response) => {
                let myData = response.data;
                //console.log("<======product add***response+++",response,myData,"======>");
                if(myData.status == "success"){
                    this.modal_add_loading = false;
                    this.formItemReset();
                    this.$refs.formValidate.resetFields();
                    this.$router.push('/product');
                }else{
                    this.showError(myData);
                    Common.CommonWarning(this,myData.message);
                }

                
            }).catch( (error) => {
                console.log(error);
                this.modal_add_loading = false;
                this.showError(error);
            });
            // setTimeout(() => {
            //     this.modal_add_loading = false;
            //     Store.dispatch('ADD_DATA_TEST/incrementAsync', {
            //         msg: tempData
            //     })
            //     this.formItemReset();
            //     this.$refs.formValidate.resetFields();
            // },1000)
        },
        submitAdd(){
            let IsStop = false;
            this.$refs.formValidate.validate((valid)=>{//验证
                if(valid){
                    this.submitAddData();
                    this.modal_add_loading = true;
                }else{
                    Common.CommonWarning(this,"有必选的还未填写！")
                }
            })
        },
        cancel(){
            this.formItemReset();
            this.$refs.formValidate.resetFields();
            this.$router.push('/product');
            
        },
    },
    components: {
       Trans,
       Depend,
       GoAgileMode,
       Assist,
    },
    watch:{
        //查询搜索开始
        "formValidate.AddGroupList"(curVal,oldVal){
            let _this = this;
            if(curVal){
                Common.changeArr(this,curVal,Common,userstoryAddGroup,{prj_id:Common.GETprjid(this,Common)})//下拉样子
            }
        },
        formValidate: {
            handler(val, oldVal) {
                if(val){
                    Common.inputArr(this,val)//下拉样子
                }
            },
            deep: true
        },
        //查询搜索结束
    },
    computed: {
        myAssistList(){
            return this.assistList;
        },
        myList(){
            return this.chargerList;
        }    
    },
}
</script>
<style lang="less" scoped>
.fromBox {
    width: 80%;
}
@import '../add/style.less';
</style>
<style >
.translist>span{
    float: left;
} 
.translist em{
    display: block;
    margin-left: 16px;
    padding-top: 2px;
    padding-left:0.5em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; 
    
} 
</style>