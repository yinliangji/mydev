<template>
	<div class="pageContent">
        <goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :TOP="'5'" />
        <Card>
            <div class="aglieAddBox">
                
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" >
					<h3 class="Title"><span>项目基本信息</span></h3>


                    <div class="fromBox">
                        <FormItem label="所属产品" prop="pid">
                            <Select clearable v-model="formValidate.pid" placeholder="请选择所属产品">
                                <Option v-for="item in prod_idList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> 
                        </FormItem> 


                        <FormItem label="项目名称" prop="prj_name">
                            <Input v-model="formValidate.prj_name" placeholder="请填写项目名称"></Input>
                        </FormItem>

                      

                        <FormItem label="项目类型" prop="prj_type">
                            <RadioGroup v-model="formValidate.prj_type">
                                <Radio label="1">立研</Radio>
                                <Radio label="2">自研</Radio>
                            </RadioGroup>
                        </FormItem>

                      

    					<Row>
                            <Col span="12">
                                <FormItem label="开始时间" prop="start_time">
                            		<DatePicker placement="bottom-start" type="date" format="yyyy-MM-dd"  placeholder="选择开始日期"  :value="formValidate.start_time" v-model="formValidate.start_time"></DatePicker>
                        		</FormItem>
                            </Col>
                            <Col span="12">
                                 <FormItem label="结束时间" prop="end_time">
                            		<DatePicker  placement="bottom-start" type="date" :options="options3" placeholder="选择结束日期" v-model="formValidate.end_time" ></DatePicker>
                        		</FormItem>
                            </Col>
                        </Row>

                      
    					<FormItem label="项目描述" prop="prj_desc">
                            <Input v-model="formValidate.prj_desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写项目描述"></Input>
                        </FormItem>


                        <FormItem label="项目目标" prop="prj_goal">
                            <Input v-model="formValidate.prj_goal" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写项目目标"></Input>
                        </FormItem>


                        <FormItem label="填写模块" prop="createModule">
                            <Tag v-for="item in formValidate.createModule" :key="item" :name="item" closable @on-close="handleClose">
                                {{ item}}
                            </Tag>
                            <Button icon="ios-plus-empty" type="dashed" size="small" @click="addItem">
                                添加模块
                            </Button>
                        </FormItem>


                        <FormItem label="模块选择" prop="modules">
                            <Select v-model="formValidate.modules" multiple >
                                <Option v-for="item in moduleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>

                       
                    </div>
					<h3 class="Title"><span>成员信息</span></h3>
                    <div class="fromBox">
                        



                        <div class="addpartBox">
                            <Button type="success" @click="addpart">添加角色</Button>
                        </div>
                        <div class="newAddGroup">
                            <Row v-for="(myItem,index) in formValidate.AddGroupList" :key="index">
                                <Col span="18">



                                    
                                    <FormItem 
                                        :label="myItem.myLabel" 
                                        :prop="'AddGroupList.'+index+'.group'"
                                        :rules="{required: myItem.required, type: 'array', message: '请选择或者填写'+myItem.myLabel+'，不能为空！', trigger: 'change'}" 
                                         
                                        :ref="myItem.myRef+index" 
                                        :class="myItem.myRef+index"
                                    >
                                        <div >
                                            <Tag v-for="(item,index2) in myItem.groupList" :value="item.value" :key="index2" :name="index2" closable @on-close="handleClose">
                                                {{ item.label}}
                                            </Tag>
                                            <Button 
                                                icon="ios-plus-empty" 
                                                type="dashed" 
                                                size="small" 
                                                @click="addRole(index)"
                                            >
                                                添加角色
                                            </Button>

    
                                            <Modal 
                                                :ref="myItem.myReftemp+index" 
                                                :class="myItem.myReftemp+index" 
                                                v-model="formValidate.AddGroupList[index].modaAdd" 
                                                :title="'添加'+formValidate.AddGroupList[index].myLabel" 
                                                @on-ok="submitRole(index)"  
                                                ok-text="添加"
                                            >




                                                <Select v-model="myItem.grouptemp" :id="'sel'+index" filterable :loading="inputLoad"  multiple :placeholder="'请输入内容并选择【'+myItem.myLabel+'】'">
                                                    <Option v-for="(item,index2) in myItem.groupListtemp" :value="item.value" :key="index2">
                                                        {{ item.label }}
                                                    </Option>
                                                </Select>




                                                
                                            </Modal>


                                        </div>
                                    </FormItem>
                                    <!---->



                                    <!--
                                    <FormItem 
                                        :label="myItem.myLabel" 
                                        :prop="'AddGroupList.'+index+'.group'"
                                        :rules="{required: myItem.required, type: 'array', message: '请选择或者填写'+myItem.myLabel+'，不能为空！', trigger: 'change'}" 
                                         
                                        :ref="myItem.myRef+index" 
                                        :class="myItem.myRef+index"
                                        >
                                        <Select v-model="myItem.group" :id="'sel'+index" filterable :loading="inputLoad"  multiple :placeholder="'请输入内容并选择【'+myItem.myLabel+'】'">
                                            <Option v-for="(item,index2) in myItem.groupList" :value="item.value" :key="index2">
                                                {{ item.label }}
                                            </Option>
                                        </Select>
                                    </FormItem>
                                    -->

                                </Col>
                                <Col span="1">&nbsp;</Col>
                                <Col span="5">
                                    <Button v-if="myItem.delBtn" type="error" long @click="groupDel(index)">删除角色</Button>
                                </Col>
                            </Row>
                        </div>
                        
                                

                      
                    </div>
                    <FormItem>
    					<Button type="primary" :loading="modal_add_loading" @click="submitAdd">
    				        <span v-if="!modal_add_loading">提交</span>
    				        <span v-else>Loading...</span>
    				    </Button>
                        <Button type="ghost" style="margin-left: 8px" @click="cancel">返回</Button>
                    </FormItem>
                    
                </Form>
            </div>
        </Card>
        
        <Modal ref="addPop" v-model="modaAdd" title="添加模块" @on-ok="submitModule"  ok-text="提交" :loading="modal_add_loading" visible="true">
            <Form :model="formItem" :label-width="80" >
                <FormItem label="模块名称">
                    <Input v-model="formItem.businessName" placeholder="请输入项目名称"></Input>
                </FormItem>
            </Form>
        </Modal>    


        <Modal ref="addPartPop" v-model="partAdd" title="添加角色" @on-ok="submitPart('addPartPopBox')" on-cancel="partCancel"  ok-text="确定"  visible="true" :loading="formPartValidate.loading">
            <Form  :label-width="80" ref="addPartPopBox" :model="formPartValidate" :rules="rulePartValidate">
                <FormItem label="角色名称" prop="partName">

                    <Input v-model="formPartValidate.partName" placeholder="请输入角色名称（最多四个字）" :maxlength="8" v-if="!formPartValidate.addGroupList.length"></Input>

                    <Select v-model="formPartValidate.partName" placeholder="请选择角色" v-else>
                        <Option v-for="(item,index) in formPartValidate.addGroupList" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>

        <Modal v-model="modaDelete" width="300">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>删除无法恢复，是否继续？</p>
            </div>
            <div slot="footer">
                <Button color="#1c2438" @click="delEnter">删除</Button>
                <Button type="primary" @click="delCancel">取消</Button>
            </div>
        </Modal>



    </div>
</template>
<script>


import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {projectAdd,projectAll,projectAllgroup,projectManagerGroup,projectDeveloperGroup,projectTesterGroup,projectGetProd,projectAddGroup,addTeam,listModule,publishUser} = Common.restUrl;
import Store from '@/vuex/store'

const validateDate = (rule, value, callback) => {
    if (!value || !value[0] || !value[1]) {
        console.log("value 错误",)  
        return callback(new Error('请选择日期'));
    }else{
        let nowTime = new Date().getTime();
        let valueTime = new Date(value[1]).getTime()
        if(nowTime > valueTime){
            return callback(new Error('结束日期小于现在，请从新选择结束日期'));
        }
        callback()   
    }
};

export default {
    props: {
        
    },
    watch:{
        "formValidate.AddGroupList"(curVal,oldVal){
            let _this = this;
            if(curVal){
                //Common.changeArr(this,curVal,Common,projectAddGroup)
                Common.changeArr2(this,curVal,Common,projectAddGroup)
            }
        },
        formValidate: {
            handler(val, oldVal) {
                if(val){
                    //Common.inputArr(this,val)
                }
            },
            deep: true
        },
        "formPartValidate.addGroupList"(curVal,oldVal){
            if(curVal && curVal.length){
                this.publishUserFn(publishUser,{},curVal);
            }
        },


        
    },
    beforecreated(){
        console.log("agileAdd--beforecreated-------",this.formValidate)
    },
    created(){
        console.log("agileAdd--created-------",this.formValidate)
    },
    beforeUpdate(){
        console.log("agileAdd--beforeUpdate-------",this.formValidate)
    },
    updated(){
        console.log("agileAdd--updated-------",this.formValidate)
    },
	computed: {
        addtest() {
            return this.$store.state["ADD_DATA_TEST"].data
        },
    },

    data () {
        let _this = this;
        const validateDateEnd = (rule, value, callback) => {
            if (value) {
                let Timer = new Date(value).getTime() - new Date(this.formValidate.start_time).getTime();
                if(Timer >= 0){
                    callback()
                }else{
                    return callback(new Error('结束日期早于开始日期！'));
                }
            }else{
                callback()  
            }
        };
        const validatePart = (rule, value, callback) => {
            console.log(value)
            if(!value){
                return callback(new Error('内容不能为空！'));    
            }else{
                if(this.formValidate.AddGroupList.length){
                    for(var i=0;i<this.formValidate.AddGroupList.length;i++){
                        if(this.formValidate.AddGroupList[i].myValue == (value+"")){
                            return callback(new Error('内容重复！')); 
                        }
                    }
                    callback()
                }else{
                    callback()
                }
            }
        };
        return {
            options3: {
                disabledDate (date) {
                    if(_this.formValidate.start_time){
                        return date && date.valueOf() < _this.formValidate.start_time.getTime() + 86400000;//24*60*1000*60
                    }else{
                        //return date && date.valueOf() < Date.now() - 86400000;//24*60*1000*60
                    }
                    
                }
            },
            nowDate:"",
            defDate:"",
            formValidate: {
                prod_id:"",
                prj_type:"1",
                prj_name:'',
                start_time: '',
                end_time: '',
                prj_desc: '',
                prj_goal:"",
                createModule:[],
                modules:[],
                AddGroupList:[],
                pid:"",








                allgroup:[],
                managerGroup:[],
                developerGroup:[],
                testerGroup:[],
                prj_id:'',
                date:[],
                startTime: '',
                endTime: '',
                manager:"", 
                developer:"", 
                tester:"", 
                maintainer:"", 
                technology: [],
                moudle:"",
                group:"",
            },
            prod_idList: [
                // {
                //   "id":1 ,
                //   "product_id":"x000001",
                //   "product_name":"product",
                 
                // }
                // {
                //     value: 'New York1',
                //     label: 'New York总体组人1'
                // },
            ],
            
            
            moduleList: [
                // {
                //     value: '模块1-1',
                //     label: '模块1'
               
            ],
            ruleValidate: {
                prod_id: [
                    { required: false,type: 'string', message: 'Please select gender', trigger: 'change' }
                ],
                pid: [
                    { required: false,type: 'string',  message: 'Please select gender', trigger: 'change' }
                ],
                prj_type: [
                    { required: false, message: 'Please select gender', trigger: 'change' }
                ],
                
                prj_name: [
                    { required: true, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
                // start_time: [
                //     { required: false, type: 'date', message: 'Please select the date', trigger: ['blur','change'] }
                // ],
                end_time: [//
                    { required: false, type: 'date', validator: validateDateEnd, trigger: 'change' }
                    //{ required: false, type: 'date', message: 'Please select the date', trigger: 'change' }
                ],
                prj_desc: [
                    { required: false, message: 'Please enter a personal introduction', trigger: 'blur' },
                    //{ type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                ],
                prj_goal: [
                    { required: false, message: 'Please enter a personal introduction', trigger: 'blur' },
                    //{ type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                ],
                modules: [
                    { required: false, type: 'array', message: '请填写内容，不能为空！', trigger: 'change' }
                ],
                createModule: [
                    { required: false, type: 'array', message: '请填写内容，不能为空！', trigger: 'change' }
                ],
                allgroup: [
                    { required: true, type: 'array',  message: '请选择内容，不能为空！', trigger: 'change' }
                ],
                managerGroup: [
                    { required: false, type: 'array', message: '请选择', trigger: 'change' }
                ],
                developerGroup: [
                    { required: false, type: 'array', message: '请选择', trigger: 'change' }
                ],
                testerGroup: [
                    { required: false, type: 'array', message: '请选择', trigger: 'change' }
                ],



               


                prj_id: [
                    { required: false, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
                date: [
                    { required: true, type: 'array', validator: validateDate, trigger: ['blur','change'], }
                ],
               
                startTime: [
                    { required: false, type: 'string', message: 'Please select time', trigger: 'change' }
                ],
                
                endTime: [
                    { required: false, type: 'string', message: 'Please select time', trigger: 'change' }
                ],

                group: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                maintainer: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
            },
            
            editTableData:false,
            modal_add_loading:false,
            formItem: {
                technologyName:"",
                businessName:"",
            },
            modaAdd: false,



            
            partAdd: false,
            modaDelete: false,
            thisIndex:null,
            myGroupName:"",
            defaultGroup:[],
            formPartValidate: {
                loading:true,
                partName: '',
                addGroupList: [
                ],
            },
            rulePartValidate: {
                partName: [
                    { required: true, validator: validatePart,  trigger: 'blur' }
                ],
                
            },

            inputLoad:false,





            
        }
    },
    mounted(){
        this.resetData();

        this.defaultGroup = [
            {
                myRef:"selfRef",
                group:[],
                groupList:[],
                myLabel:"总体组",
                delBtn:false,
                groupName:"allgroupList",
                required:true,
            },
            {
                myRef:"selfRef",
                group:[],
                groupList:[],
                myLabel:"项目经理",
                delBtn:false,
                groupName:"managerGroupList",
                required:false,
            },
            {
                myRef:"selfRef",
                group:[],
                groupList:[],
                myLabel:"开发组",
                delBtn:true,
                groupName:"developerGroupList",
                required:false,
            },
            {
                myRef:"selfRef",
                group:[],
                groupList:[],
                myLabel:"测试组",
                delBtn:true,
                groupName:"testerGroupList",
                required:false,
            },
        ];
        this.formValidate.AddGroupList = []//this.defaultGroup;

        this.addTeamFn(addTeam);

        this.projectGetProdFn();


        this.listModuleFn(listModule,((ID)=>{return ID?{id:ID}:{id:""}})(Common.GETID(this,Common)))

        


    },
    
    methods: {
        /* 修改添加角色 */
        addRole(i){
            this.formValidate.AddGroupList[i].modaAdd = true
        },
        submitRole(i){
            console.log(this.formValidate.AddGroupList[i])
            let List = this.formValidate.AddGroupList;
            let List2 = Common.objCopyArr(List[i].grouptemp,List[i].groupListtemp)

            if(List[i].grouptemp && Array.isArray(List[i].grouptemp) && List[i].grouptemp.length && List2 && Array.isArray(List2) && List2.length){
                List[i].group.push(...List[i].grouptemp)
                List[i].groupList.push(...List2)
            }

            List[i].grouptemp = [];
            List[i].groupListtemp = [];
                


            





            

            


            
            // this.formValidate.createModule.push(this.formItem.businessName)
            // this.modaAdd = false;
            // this.$Message.info('成功');
            // this.ModuleformItemReset();
           
        },
        projectGroupFn2(URL,params = {},ARR,thatEle){
            defaultAXIOS(URL,params,{timeout:60000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======【agile Allgroup get】***response+++",response,myData,"====>");
                this.inputLoad = false;
                this.formValidate.AddGroupList[ARR].groupListtemp = [];


                if(typeof(ARR)  == "number"){
                    this.formValidate.AddGroupList[ARR].groupListtemp.push(...myData.data.list);
                }
                
            }).catch( (error) => {
                console.log(error);
                this.inputLoad = false;
                this.showError(error);
            });   
        },
        /* 修改添加角色 */
        publishUserFn(URL,params = {},Arr=[]){
            defaultAXIOS(URL,params,{timeout:5000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======【agile publishUser get】***response+++",response,myData,"====>");
               
                let _tempObj = {
                    myRef: "selfRef",
                    group: [],
                    groupList: [],
                    myLabel: "",
                    myValue: "",
                    delBtn: false,
                    groupName: "",
                    required: true,
                    modaAdd:true,//修改添加角色
                    grouptemp:[],//修改添加角色
                    groupListtemp: [],//修改添加角色
                    myReftemp: "selfRefRole",//修改添加角色
                }
                
                for(let i=0;i<Arr.length;i++){
                    if(Arr[i].label.indexOf("项目经理")  != -1){
                        _tempObj.myLabel = Arr[i].label
                        _tempObj.myValue = Arr[i].value
                    }
                }

                let _ARRobj = {}
                if(myData.nick_name && myData.user_name){
                    _ARRobj.label = myData.nick_name
                    _ARRobj.value = myData.user_name
                    _tempObj.group.push(myData.user_name)
                    _tempObj.groupList.push(_ARRobj)
                }else{
                    _ARRobj.label = Common.getCookie("username") 
                    _ARRobj.value = Common.getCookie("nickname")
                    _tempObj.group.push(Common.getCookie("nickname"))
                    _tempObj.groupList.push(_ARRobj)

                }
                

                
                this.formValidate.AddGroupList.push(_tempObj);
            }).catch( (error) => {
                console.log(error);
               
                this.showError(error);
            });   
        },




        listModuleFn(URL,params = {}){
            Common.Modulelist(defaultAXIOS,this,URL,params)
        },

        demoFn(query,a){
            console.log(query,a)

        },
        addTeamFn(URL,params = {}){
            Common.AddTeam(defaultAXIOS,this,URL,params);
            
        },



        groupDel(I){
            this.thisIndex = I;
            this.modaDelete = true;
            
        },
        partCancel(){
            this.partAdd = false;
            this.formPartValidate.partName = "";
            this.$refs.addPartPopBox.resetFields();
            
        },
        addpart(){
            this.partAdd = true;
        },
        submitPart(name){
        	//Common.addPartPopBox(name,this);
            Common.addPartPopBox2(name,this); //修改添加角色
        	
        },
        
        delCancel(){
          this.modaDelete = false;
        },
        delEnter(){
            this.formValidate.AddGroupList.splice(this.thisIndex, 1);
            this.thisIndex = null;
            this.modaDelete = false;
        },




        projectGroupFn(URL,params = {},ARR,thatEle){
            defaultAXIOS(URL,params,{timeout:60000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======【agile Allgroup get】***response+++",response,myData,"====>");
                this.inputLoad = false;
                this.formValidate.AddGroupList[ARR].groupList = [];


                if(typeof(ARR)  == "number"){
                    if(thatEle && thatEle.temp && thatEle.temp.length){
                        let _tempArr = Common.returnDelArr(this.formValidate.AddGroupList[ARR].group,myData.data.list);
                        this.formValidate.AddGroupList[ARR].groupList.push(...thatEle.temp,..._tempArr);

                    }else{
                        this.formValidate.AddGroupList[ARR].groupList.push(...myData.data.list);
                    }
                }
                
            }).catch( (error) => {
                console.log(error);
                this.inputLoad = false;
                this.showError(error);
            });   
        },

        



        projectGetProdFn(){
            defaultAXIOS(projectGetProd,{},{timeout:5000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======【agile product get】***response+++",response,myData,"====>");
                let _tempObj = {};
                for(var i=0;i<myData.data.length;i++){
                    _tempObj.value = myData.data[i].pid+"";
                    _tempObj.label = myData.data[i].product_name+"";
                    this.prod_idList.push(_tempObj);
                    _tempObj = {}
                }
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
        showError(ERR){
            //alert(JSON.stringify(ERR))
            Common.ErrorShow(ERR,this);

        },
        resetData(){
            //new Date().Format("yyyy-MM-dd HH:mm:ss");
            let minute = 60*1000;
            let hour = minute *60;
            let day = 24*hour;
            let setDay = new Date().getTime()+day*2;
            var nowDay = new Date().Format("yyyy-MM-dd");
            var defDay = new Date(setDay).Format("yyyy-MM-dd");
            this.formValidate.date[0] = nowDay;
            this.formValidate.date[1] = defDay;

            this.formValidate.start_time  = nowDay;
        },
       
        
        formItemReset(){
            this.resetData(); //this.formValidate.date = [];
            this.formValidate.prj_type = "1";
            this.formValidate.prj_name = "";
            this.formValidate.start_time = "";
            this.formValidate.end_time = "";
            this.formValidate.prj_desc = "";
            this.formValidate.prj_goal = "";
            this.formValidate.createModule = [];
            this.formValidate.modules = [];
            this.formValidate.allgroup = [];
            this.formValidate.managerGroup = [];
            this.formValidate.developerGroup = [];
            this.formValidate.testerGroup = [];
            this.formValidate.prod_id = "";
            this.formValidate.AddGroupList = this.defaultGroup;
            this.formValidate.pid = "";
            



            this.formValidate.prj_id = this.$router.history.current.query.id ? this.$router.history.current.query.id : "";
            this.editTableData = false;
            this.formValidate.date = [];
            this.formValidate.startTime = "";
            this.formValidate.endTime = "";
            this.formValidate.manager = "";
            this.formValidate.developer = "";
            this.formValidate.tester = "";
            this.formValidate.maintainer = "";
            this.formValidate.technology = [];
            this.formValidate.business = [];
            this.formValidate.group = "";
            
        },
        submitAddData(){
           
            let _join = "|";
            /*
            if(  Array.isArray(this.formValidate.modules) && Array.isArray(this.formValidate.modulesAdd)  ){
                this.formValidate.modules.push(...this.formValidate.modulesAdd)
            }else if(Array.isArray(this.formValidate.modules) && !Array.isArray(this.formValidate.modulesAdd)){
                this.formValidate.modules.push(this.formValidate.modulesAdd)
            }else if(!Array.isArray(this.formValidate.modules) && Array.isArray(this.formValidate.modulesAdd)){
                this.formValidate.modules = this.formValidate.modulesAdd.join(_join);
            }else{
                this.formValidate.modules = this.formValidate.modules + this.formValidate.modulesAdd;
            }
            */

            let _modules = Array.isArray(this.formValidate.modules) ? this.formValidate.modules.join(_join) : this.formValidate.modules;
            let _createModule = Array.isArray(this.formValidate.createModule) ? this.formValidate.createModule.join(_join) : this.formValidate.createModule;
            

            let _start_time = new Date(this.formValidate.start_time).Format("yyyy-MM-dd");
            let _end_time = this.formValidate.end_time ? new Date(this.formValidate.end_time).Format("yyyy-MM-dd") : this.formValidate.end_time;


            let _proj_role = JSON.stringify(Common.objInArr(this.formValidate.AddGroupList));


            let tempData = {
                prj_type:this.formValidate.prj_type,
                prj_name: this.formValidate.prj_name,
                start_time:_start_time,
                end_time:_end_time,
                prj_desc: this.formValidate.prj_desc,
                prj_goal: this.formValidate.prj_goal,
                modules:_modules,
                createModule:_createModule,
                prod_id:this.formValidate.prod_id,
                pid:this.formValidate.prod_id,
                AddGroupList:JSON.stringify(this.formValidate.AddGroupList),
                proj_role:_proj_role,
                pid:this.formValidate.pid,



               
                // allgroup: this.formValidate.allgroup.join(_join),
                // managerGroup: this.formValidate.managerGroup.join(_join),
                // developerGroup: this.formValidate.developerGroup.join(_join),
                // testerGroup: this.formValidate.testerGroup.join(_join),
                //prj_id: this.formValidate.prj_id,
                //num: parseInt(Math.random()*100),
                //manager:"经理",
                //group:"group|group",
                // startTime:new Date(this.formValidate.date[0]).Format("yyyy-MM-dd"),
                // endTime:new Date(this.formValidate.date[1]).Format("yyyy-MM-dd"),
                // startTime:this.formValidate.startDate,
                // endTime:this.formValidate.endDate,
            }
            
            defaultAXIOS(projectAdd,tempData,{timeout:5000,method:'post'}).then((response) => {
                //alert(JSON.stringify(response))
                let myData = response.data;
                console.log("<======agile add***response+++",response,myData,"+++agile add***response======>");
                if(myData.status == "success"){
                    this.modal_add_loading = false;
                    this.formItemReset();
                    this.$refs.formValidate.resetFields();
                    this.$router.push('/agile');
                }else{
                    this.modal_add_loading = false;
                    this.showError(myData.status);
                }
                
            }).catch( (error) => {
                console.log(error);
                this.modal_add_loading = false;
                this.showError(error);
            });
            
        },
        submitAdd () {
            this.$refs.formValidate.validate((valid)=>{//验证
                if(valid){
                    this.submitAddData();
                    this.modal_add_loading = true;
                }
            })
        },
        cancel () {
            
            this.formItemReset();
            this.$refs.formValidate.resetFields();
            this.$router.push('/agile');
        },
        handleClose (event, name) {
            const index = this.formValidate.createModule.indexOf(name);
            this.formValidate.createModule.splice(index, 1);
        },

        submitModule () {
            this.formValidate.createModule.push(this.formItem.businessName)
            this.modaAdd = false;
            this.$Message.info('成功');
            this.ModuleformItemReset();
        },
        addItem(){
            this.modaAdd = true;
        },
        ModuleformItemReset(){
            this.$nextTick(() => {
                this.formItem.technologyName = "";
                this.formItem.businessName = "";
            });
        },
    }

}
</script>
<style lang="less" scoped>
.aglieAddBox {

}
.fromBox {
	width: 50%;
}
.addpartBox{
    padding-bottom: 20px;
    text-align: center;
}
</style>


