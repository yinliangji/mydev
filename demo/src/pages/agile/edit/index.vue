<template>
	<div class="pageContent">
        <goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :Top="'5'" />
        <Card>
            <div class="aglieAddBox">
                
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" >
					<h3 class="Title">编辑项目基本信息</h3>


                    <div class="fromBox">
                        <FormItem label="所属产品" prop="prod_id">
                                    <Select  v-model="formValidate.prod_id" :value="formValidate.prod_id" placeholder="请选择所属产品">
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


                        <FormItem label="填写模块" >
                            <Tag v-for="item in formValidate.modulesAdd" :key="item" :name="item" closable @on-close="handleClose">
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
					<h3 class="Title">编辑成员信息</h3>

					
                    <div class="fromBox">
                        



                        <div class="newAddGroup">
                            <Row v-for="(myItem,index) in formValidate.AddGroupList" :key="index">
                                <Col span="20">
                                    <FormItem 
                                        :label="myItem.myLabel" 
                                        :prop="'AddGroupList.'+index+'.group'"
                                        :rules="{required: myItem.required, type: 'array', message: '请选择或者填写'+myItem.myLabel+'，不能为空！', trigger: 'change'}" 
                                         
                                        :ref="myItem.myRef+index" 
                                        :class="myItem.myRef+index"
                                        >
                                        <Select v-model.lazy="myItem.group" :id="'sel'+index" filterable multiple :placeholder="'请输入内容并选择【'+myItem.myLabel+'】'">
                                            <Option v-for="(item,index2) in myItem.groupList" :value="item.value" :key="index2">
                                                {{ item.label }}
                                            </Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col span="1">&nbsp;</Col>
                                <Col span="3">
                                    <Button v-if="myItem.delBtn" type="error" long @click="groupDel(index)">删除</Button>
                                </Col>
                            </Row>
                        </div>
                        <div class="addpartBox">
                            <Button type="success" @click="addpart">添加角色</Button>
                        </div>
                                    

                    </div>
                    <FormItem>
                    	<!-- <Button type="primary" @click="submitAdd">提交</Button> -->
    					<Button type="primary" :loading="modal_add_loading" @click="submitAdd">
    				        <span v-if="!modal_add_loading">提交</span>
    				        <span v-else>Loading...</span>
    				    </Button>
                        <Button type="ghost" style="margin-left: 8px" @click="cancel">重填</Button>
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


        <Modal ref="addPartPop" v-model="partAdd" title="添加角色" @on-ok="submitPart" on-cancel="partCancel"  ok-text="确定"  visible="true">
            <Form  :label-width="80" >
                <FormItem label="角色名称">
                    <Input v-model="partName" placeholder="请输入角色名称（最多四个字）" :maxlength="8"></Input>
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
const {projectAdd,projectAll,projectEdit,projectAllgroup,projectManagerGroup,projectDeveloperGroup,projectTesterGroup,projectGetProd,projectAddGroup} = Common.restUrl;
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
        "formValidate.start_time":function(curVal,oldVal){

        },
        "formValidate.AddGroupList"(curVal,oldVal){
            let _this = this;
            if(curVal){
                this.$nextTick(()=>{
                    //
                    for(var i=0;i<curVal.length;i++){
                        let _DOM = this.$refs[curVal[i].myRef+i][0].$vnode.elm.childNodes[2].childNodes[0].childNodes[0].childNodes[2].getElementsByClassName("ivu-select-input")[0];
                        _DOM.addEventListener("keyup", function(event){
                            let _num = Number(this.parentNode.parentNode.parentNode.id.replace("sel",""));
                            //
                            Common.throttle(
                                ()=>{
                                    let _URL = false;
                                    if(curVal[_num].groupName == "allgroupList"){
                                        _URL = projectAllgroup;
                                    }else if(curVal[_num].groupName == "managerGroupList"){
                                        _URL = projectManagerGroup;
                                    }else if(curVal[_num].groupName == "developerGroupList"){
                                        _URL = projectDeveloperGroup;
                                    }else if(curVal[_num].groupName == "testerGroupList"){
                                        _URL = projectTesterGroup;
                                    }else{
                                        _URL = projectAddGroup;
                                    }
                                    _this.projectGroupFn(
                                        _URL
                                        ,
                                        {VALUE:this.value+"|"+curVal[_num].group.join("|"),}
                                        ,
                                        _num
                                    );
                                }
                                ,
                                2000
                            )();
                            //
                        })
                    }
                    //
                /*现在数据已经渲染完毕*/
                })
            }
        },
    },
    beforecreated(){
        console.log("agileEdit--beforecreated-------",this.formValidate.modules)
    },
    created(){
        console.log("agileEdit--created-------",this.formValidate.modules)
    },
    beforeUpdate(){
        console.log("agileEdit--beforeUpdate-------",this.formValidate.modules)
    },
    updated(){
        console.log("agileEdit--updated-------",this.formValidate.modules)
    },
	computed: {
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
                prod_id:"3",
                prj_type:"",
                prj_name:'',
                start_time: '',
                end_time: '',
                prj_desc: '',
                prj_goal:"",
                modulesAdd:[],
                modules:[],
                AddGroupList:[],


                allgroup:[],
                managerGroup:[],
                developerGroup:[],
                testerGroup:[],





                // prj_id:'',
                // date:[],
                // startTime: '',
                // endTime: '',
                // manager:"", 
                // developer:"", 
                // tester:"", 
                // maintainer:"", 
                // technology: [],
                // moudle:"",
                // group:"",
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
            AddGroupList:[

            ],
            allgroupList: [
               
            ],
            managerGroupList: [
               
            ],
            developerGroupList: [
               
            ],
            testerGroupList: [
               
            ],
            
            moduleList: [
                {
                    value: '模块1-1',
                    label: '模块1'
                },
                {
                    value: '模块2-2',
                    label: '模块2'
                },
                {
                    value: '模块3-3',
                    label: '模块3'
                },
               
            ],
            ruleValidate: {
                prod_id: [
                    { required: false,type: 'string',  message: 'Please select gender', trigger: 'change' }
                ],
                prj_type: [
                    { required: false, message: 'Please select gender', trigger: 'change' }
                ],
                
                prj_name: [
                    { required: true, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
                // start_time: [
                //     { required: false, type: 'date', message: 'Please select the date', trigger: 'change' }
                // ],
                end_time: [
                    { required: false, type: 'date', validator: validateDateEnd, trigger: 'change' }
                    //{ required: false, type: 'date', message: 'Please select the date', trigger: ['blur','change'] }
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
                modulesAdd: [
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
            partName:"",
            modaDelete: false,
            thisIndex:null,
            myGroupName:"",
            
            
        }
    },
    mounted(){
       
        this.projectGetProdFn();

        if(this.$router.history.current.query.id){
            this.projectEditFn();
        }else{
            this.resetData();
        }
        
    },
    
    methods: {
        groupDel(I){
            this.thisIndex = I;
            this.modaDelete = true;
            
        },
        partCancel(){
            this.partAdd = false;
            this.partName = "";
        },
        addpart(){
            this.partAdd = true;
        },
        submitPart(){
            let _tempObj = {
                myRef:"selfRef",
                group:[],
                groupList:[],
                myLabel:"",
                delBtn:true,
                groupName:"",
                required:true,
            }
            _tempObj.myLabel = this.partName;
            this.formValidate.AddGroupList.push(_tempObj);
            this.partName = "";
            _tempObj = null;

            // this.$refs.selfRef0.$children[0].$refs.reference.getElementsByClassName("ivu-select-input")[0].addEventListener("keyup", function(event){
            //     console.log(this.value)
            // })

        },
        delCancel(){
          this.modaDelete = false;
        },
        delEnter(){
            this.formValidate.AddGroupList.splice(this.thisIndex, 1);
            this.thisIndex = null;
            this.modaDelete = false;
        },

        projectGroupFn(URL,params = {},ARR){
            defaultAXIOS(URL,params,{timeout:5000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======【agile Allgroup get】***response+++",response,myData,"====>");
                if(typeof(ARR)  == "number"){
                    this.formValidate.AddGroupList[ARR].groupList = myData.data.list;
                }else{
                    this[ARR] = myData.data.list;    
                }
                
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });   
        },
        projectGetProdFn(){
            defaultAXIOS(projectGetProd,{},{timeout:5000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======【agile product get】***response+++",response,myData.data.list,"====>");
                let _tempObj = {};
                for(var i=0;i<myData.data.list.length;i++){
                    _tempObj.value = myData.data.list[i].id+"";
                    _tempObj.label = myData.data.list[i].product_id+"";
                    this.prod_idList.push(_tempObj);
                    _tempObj = {}
                }
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });            
        },
        projectEditFn(){
            defaultAXIOS(projectEdit,{id:this.$router.history.current.query.id},{timeout:2000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======【agile edit get】***response+++",response,myData.data,"====>");
                let _temp = false;
                for(var I in this.formValidate){
                    _temp = myData.data[I]+"";
                    if(_temp.indexOf("|") != -1){
                        this.formValidate[I] = myData.data[I].split("|").filter(item=>item)
                    }else{
                        this.formValidate[I] = myData.data[I];
                    }
                }

                
                

            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
        showError(ERR){
            alert(JSON.stringify(ERR))
        },
        resetData(){
            //new Date().Format("yyyy-MM-dd HH:mm:ss");
            let minute = 60*1000;
            let hour = minute *60;
            let day = 24*hour;
            let setDay = new Date().getTime()+day*2;
            var nowDay = new Date().Format("yyyy-MM-dd");
            var defDay = new Date(setDay).Format("yyyy-MM-dd");
            // this.formValidate.date[0] = nowDay;
            // this.formValidate.date[1] = defDay;

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
            this.formValidate.modulesAdd = [];
            this.formValidate.modules = [];

            this.formValidate.prod_id = "";
            //this.formValidate.AddGroupList = this.defaultGroup;
            


            this.formValidate.allgroup = [];
            this.formValidate.managerGroup = [];
            this.formValidate.developerGroup = [];
            this.formValidate.testerGroup = [];
            this.formValidate.prj_id = "";
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
            let _modules = false;
            let _join = "|";
            if(Array.isArray(this.formValidate.modulesAdd)){
                this.formValidate.modules.push(...this.formValidate.modulesAdd)
            }else{
                this.formValidate.modules.push(this.formValidate.modulesAdd)
            }
            _modules = this.formValidate.modules
            let _start_time = new Date(this.formValidate.start_time).Format("yyyy-MM-dd");
            let _end_time = this.formValidate.end_time ? new Date(this.formValidate.end_time).Format("yyyy-MM-dd") : this.formValidate.end_time;
            let tempData = {
                prj_type:this.formValidate.prj_type,
                prj_name: this.formValidate.prj_name,
                start_time:_start_time,
                end_time:_end_time,
                prj_desc: this.formValidate.prj_desc,
                prj_goal: this.formValidate.prj_goal,
                modules:_modules.join(_join),

                prod_id:this.formValidate.prod_id,
                AddGroupList:this.formValidate.AddGroupList,


               
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


            defaultAXIOS(projectAdd,tempData,{timeout:2000,method:'post'}).then((response) => {
                //alert(JSON.stringify(response))
                let myData = response.data;
                console.log("<======[agile edit post]***response+++",response,myData,"=====>");
                this.modal_add_loading = false;
                this.formItemReset();
                this.$refs.formValidate.resetFields();
                this.$router.push('/agile');
            }).catch( (error) => {
                console.log(error);
                this.modal_add_loading = false;
                this.showError(error);
            });

            /*
            setTimeout(() => {
            	this.modal_add_loading = false;
            	Store.dispatch('ADD_DATA_TEST/incrementAsync', {
		            msg: tempData
		        })
                this.formItemReset();
                this.$refs.formValidate.resetFields();
            },1000)
            */
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
            //this.$Message.info('取消');
            this.formItemReset();
            this.$refs.formValidate.resetFields();
        },
        handleClose (event, name) {
            const index = this.formValidate.modulesAdd.indexOf(name);
            this.formValidate.modulesAdd.splice(index, 1);
        },

        submitModule () {
            setTimeout(() => {
                this.formValidate.modulesAdd.push(this.formItem.businessName)
                this.modaAdd = false;
                this.$Message.info('成功');
                this.ModuleformItemReset();
            },1000)
            
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