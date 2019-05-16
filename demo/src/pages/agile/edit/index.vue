<template>
	<div class="pageContent">
        <goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :TOP="'5'" />
        <Card>
            <div class="aglieAddBox">
                
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140" >
					<h3 class="Title"><span>编辑项目基本信息</span></h3>


                    <div class="fromBox">
                        <FormItem label="所属产品" prop="pid" v-show="false">
                            <Select clearable v-model="formValidate.pid"  placeholder="请选择所属产品">
                                <Option v-for="item in prod_idList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select> 
                            <ToolTip  content="项目归属的产品，如项目“企业现金二期”所属产品是“企业现金”" />
                        </FormItem> 

                        <FormItem label="项目名称" prop="prj_name">
                            <span v-show="isMyEdit('prj_name')">
                                {{formValidate.prj_name}}
                            </span>
                            <Input v-show="isMyEdit('prj_name','else')" v-model="formValidate.prj_name" placeholder="请填写项目名称" ></Input>
                            
                        </FormItem>
                        
                        <Row>
                            <Col span="12">
                                <FormItem label="项目状态" prop="itm_status" >
                                    <span v-show="isMyEdit('itm_status')">
                                        {{valueChangelabel(formValidate.itm_status,itm_statusList)}}
                                    </span> 
                                    <Select v-show="isMyEdit('itm_status','else')" clearable v-model="formValidate.itm_status" placeholder="请选项目状态" >
                                        <Option v-for="item in itm_statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    
                                </FormItem>
                                
                            </Col>
                            <Col span="12">
                                <FormItem label="总分行一体化研发类型" prop="subject" >
                                    <span v-show="isMyEdit('subject')">
                                        {{valueChangelabel(formValidate.subject,subjectList)}}
                                    </span> 
                                    <Select clearable v-model="formValidate.subject" placeholder="请选总分行一体化研发类型" v-show="isMyEdit('subject','else')">
                                        <Option v-for="item in subjectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select> 
                                    
                                </FormItem> 
                                <FormItem label="项目类型" prop="prj_type" v-show="false">
                                    <RadioGroup v-model="formValidate.prj_type">
                                        <Radio :disabled="true" title="在ITM中已立项的项目" label="1">立项</Radio>
                                        <Radio :disabled="true" title="非立项项目" label="2">自研</Radio>
                                        <ToolTip :L="105"  content="立项：在ITM中已立项的项目　　　自研：非立项项目" />
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                        </Row>


                       

    					<Row>
                            <Col span="12">
                                
                                <FormItem label="项目启动时间" >
                                    <!-- prop="start_time" -->
                                    <span v-show="isMyEdit('start_time')">
                                        {{formValidate.start_time}}
                                    </span> 
                                    <DatePicker placement="bottom-start" type="date" format="yyyy-MM-dd"  placeholder="选择项目启动时间"  :value="formValidate.start_time" v-model="formValidate.start_time" v-show="isMyEdit('start_time','else')"></DatePicker>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                 <FormItem label="项目结束时间" >
                                    <!-- prop="end_time" -->
                                    <span v-show="isMyEdit('end_time')">
                                        {{formValidate.end_time}}
                                    </span>
                            		<DatePicker placement="bottom-start" type="date" :options="options3" placeholder="选择项目结束日期" v-model="formValidate.end_time" v-show="isMyEdit('end_time','else')" ></DatePicker>
                        		</FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                                <FormItem label="提出部门" prop="propose_depart">
                                    <span v-if="isMyEdit('propose_depart')">
                                        {{formValidate.propose_depart}}
                                    </span>
                                    <Input v-model="formValidate.propose_depart" placeholder="请填写提出部门" v-if="isMyEdit('propose_depart','else')"></Input>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="实施部门" prop="aply_id">
                                    <span v-if="isMyEdit('aply_id')">
                                        {{formValidate.aply_id}}
                                    </span>
                                    <Input v-model="formValidate.aply_id" placeholder="请填写实施部门" v-if="isMyEdit('aply_id','else')"></Input>
                                </FormItem> 
                            </Col>
                        </Row>

                        <Row v-if="formValidate.prj_type == '1'">
                            <Col span="12">
                                <FormItem label="项目英文名称">
                                    <span >
                                        {{formValidate.itm_prj_eng_nm}}
                                    </span>
                                    
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="项目英文简称">
                                    <span >
                                        {{formValidate.itm_prj_eng_short_num}}
                                    </span>
                                </FormItem> 
                            </Col>
                        </Row>
                        <Row  v-if="formValidate.prj_type == '1'">
                            <Col span="12">
                                <FormItem label="立项类型">
                                    <span >
                                        {{formValidate.itm_type}}
                                    </span>
                                    
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="下达任务书时间">
                                    <span >
                                        {{formValidate.itm_assignment_date}}
                                    </span>
                                </FormItem> 
                            </Col>
                        </Row>
                        
                        <Row  v-if="formValidate.prj_type == '1'">
                            <Col span="12">
                                <FormItem label="是否发送通知书">
                                    <span >
                                        {{formValidate.itm_wthr_snd_ntc}}
                                    </span>
                                </FormItem> 
                            </Col>
                            <Col span="12">
                                <FormItem label="项目任务书编号">
                                    <span >
                                        {{formValidate.itm_prj_tsk_id}}
                                    </span>
                                </FormItem> 
                            </Col>
                        </Row>
                        <FormItem label="技术目标" v-if="formValidate.prj_type == '1'">
                            {{formValidate.itm_tech_target}}
                        </FormItem>
                        <FormItem label="业务条线" v-if="formValidate.prj_type == '1'">
                            {{formValidate.itm_lob}}
                        </FormItem>


                      
    					<FormItem label="项目描述" prop="prj_desc">
                            <span v-show="isMyEdit('prj_desc')">
                                <pre>{{formValidate.prj_desc}}</pre>
                            </span>
                            <Input v-model="formValidate.prj_desc" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请填写项目描述" v-show="isMyEdit('prj_desc','else')"></Input>
                        </FormItem>


                        <FormItem label="业务目标" prop="prj_goal">
                            <span v-show="isMyEdit('prj_goal')">
                                <pre>{{formValidate.prj_goal}}</pre>
                            </span>
                            <Input v-model="formValidate.prj_goal" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请填写业务目标" v-show="isMyEdit('prj_goal','else')"></Input>
                        </FormItem>


                        <FormItem label="填写模块" v-show="false">
                            <span style="position: relative;">
                                <Tag v-for="item in formValidate.createModule" :key="item" :name="item" closable @on-close="handleClose">
                                    {{ item}}
                                </Tag>
                                <Button icon="ios-plus-empty" type="dashed" size="small" @click="addItem">
                                    添加模块
                                </Button>
                                <ToolTip :T="-4" placement="top-start" content="项目对应的功能模块，该模块将会与代码工程对应，一个代码工程可以对应1-n个模块" />
                            </span>
                        </FormItem>
                        <FormItem label="模块选择" prop="modules" v-show="false">
                            <Select v-model="formValidate.modules" multiple >
                                <Option v-for="item in moduleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>

                       
                    </div>

                    
                    <h3 class="Title" v-show="false"><span>关联子系统</span></h3>
                    <div class="fromBox fromBox2" v-show="false">
                        <div class="newAddGroup">
                            <Row v-for="(myItem,index) in formValidate.AddGroupList" :key="index" v-if="index<2">
                                <Col span="20">
                                    <FormItem 
                                        :label="myItem.myLabel" 
                                        :prop="'AddGroupList.'+index+'.group'"
                                        :rules="{required: myItem.required, type: 'array', message: '请选择或者填写'+myItem.myLabel+'，不能为空！', trigger: 'change'}" 
                                         
                                        :ref="myItem.myRef+index" 
                                        :class="myItem.myRef+index"
                                        >
                                        <div :id="'roleBox_'+index">
                                            <Tag v-for="(item,index2) in myItem.groupList" :value="item.value" :key="index2" :name="index2" closable @on-close="roleClose">
                                                {{ item.label}}
                                            </Tag>
                                            <Button 
                                                icon="ios-plus-empty" 
                                                type="dashed" 
                                                size="small" 
                                                @click="addRole(index)"
                                                >
                                                添加系统
                                            </Button>
                                            <Modal 
                                                :ref="myItem.myReftemp+index" 
                                                :class="myItem.myReftemp+index" 
                                                v-model="formValidate.AddGroupList[index].modaAdd" 
                                                :title="'添加'+formValidate.AddGroupList[index].myLabel+''" 
                                                @on-ok="submitRole(index)"  
                                                ok-text="添加"
                                                @on-cancel="cancelRole(index)"
                                                >
                                                <Select v-model="myItem.grouptemp" :id="'sel'+index" filterable :loading="inputLoad"  multiple :placeholder="'请输入用户ID或者中文名进行搜索添加'">
                                                    <!-- 【'+myItem.myLabel+'】 -->
                                                    <Option v-for="(item,index2) in myItem.groupListtemp" :value="item.value" :key="index2">
                                                        {{ item.label }}
                                                    </Option>
                                                </Select>
                                            </Modal>
                                        </div>
                                    </FormItem>

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
                                <Col span="3">
                                    <Button v-if="myItem.delBtn"  type="error" long  @click="groupDel(index)">删除角色</Button>
                                </Col>
                            </Row>
                        </div>
                    </div>

					<h3 class="Title" v-show="false"><span>编辑成员信息</span></h3>

					
                    <div class="fromBox fromBox2" v-show="false">
                        


                        <div class="addpartBox">
                            <Button type="success" @click="addpart">添加角色</Button>
                        </div>
                        <div class="newAddGroup">
                            <Row v-for="(myItem,index) in formValidate.AddGroupList" :key="index" v-if="index>1">
                                <Col span="20">
                                    <FormItem 
                                        :label="myItem.myLabel" 
                                        :prop="'AddGroupList.'+index+'.group'"
                                        :rules="{required: myItem.required, type: 'array', message: '请选择或者填写'+myItem.myLabel+'，不能为空！', trigger: 'change'}" 
                                         
                                        :ref="myItem.myRef+index" 
                                        :class="myItem.myRef+index"
                                        >
                                        <div :id="'roleBox_'+index">
                                            <Tag v-for="(item,index2) in myItem.groupList" :value="item.value" :key="index2" :name="index2" closable @on-close="roleClose">
                                                {{ item.label}}
                                            </Tag>
                                            <Button 
                                                icon="ios-plus-empty" 
                                                type="dashed" 
                                                size="small" 
                                                @click="addRole(index)"
                                                >
                                                添加人员
                                            </Button>
                                            <Modal 
                                                :ref="myItem.myReftemp+index" 
                                                :class="myItem.myReftemp+index" 
                                                v-model="formValidate.AddGroupList[index].modaAdd" 
                                                :title="'添加'+formValidate.AddGroupList[index].myLabel+'人员'" 
                                                @on-ok="submitRole(index)"  
                                                ok-text="添加"
                                                @on-cancel="cancelRole(index)"
                                                >
                                                <Select v-model="myItem.grouptemp" :id="'sel'+index" filterable :loading="inputLoad"  multiple :placeholder="'请输入用户ID或者中文名进行搜索添加'">
                                                    <!-- 【'+myItem.myLabel+'】 -->
                                                    <Option v-for="(item,index2) in myItem.groupListtemp" :value="item.value" :key="index2">
                                                        {{ item.label }}
                                                    </Option>
                                                </Select>
                                            </Modal>
                                        </div>
                                    </FormItem>
                                    <!--
                                    <FormItem 
                                        :label="myItem.myLabel" 
                                        :prop="'AddGroupList.'+index+'.group'"
                                        :rules="{required: myItem.required, type: 'array', message: '请选择或者填写'+myItem.myLabel+'，不能为空！', trigger: 'change'}" 
                                         
                                        :ref="myItem.myRef+index" 
                                        :class="myItem.myRef+index"
                                        >
                                        <Select v-model.lazy="myItem.group" :id="'sel'+index" filterable multiple :loading="inputLoad" :placeholder="'请输入内容并选择【'+myItem.myLabel+'】'">
                                            <Option v-for="(item,index2) in myItem.groupList" :value="item.value" :key="index2">
                                                {{ item.label }}
                                            </Option>
                                        </Select>
                                    </FormItem>
                                    -->
                                </Col>
                                <Col span="1">&nbsp;</Col>
                                <Col span="3">
                                    <Button v-if="myItem.delBtn" type="error" long @click="groupDel(index)">删除</Button>
                                </Col>
                            </Row>
                        </div>
                        
                                    

                    </div>
                    <FormItem>
                    	<!-- <Button type="primary" @click="submitAdd">提交</Button> -->
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
       
        <AddPartPop :isShow="partAdd" :data="formPartValidate.addGroupList" :items="formValidate.AddGroupList" @closeAddPartPop="partCancel3" @sendAddPartPop="submitPart3" />

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

        <GoAgileMode :Data="GO" :Text="GOText" />


    </div>
</template>
<script>
window.dateEditError =()=>{
    
}

import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {projectAdd,projectAll,projectEdit,projectAllgroup,projectManagerGroup,projectDeveloperGroup,projectTesterGroup,projectGetProd,projectAddGroup,addTeam,projectDetail,listModule,logicSystem,phySystem,projectListDataNew,projectCondition} = Common.restUrl;
import Store from '@/vuex/store'
import AddPartPop from '@/pages/agile/add/addpartpop';
import GoAgileMode from "@/components/goAgileMode";
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
                //Common.changeArr(this,curVal,Common,projectAddGroup)//下拉样子
                Common.changeArr2(this,curVal,Common,projectAddGroup,this.projectGroupFn2)//修改添加角色
            }
        },
        formValidate: {
            handler(val, oldVal) {
                if(val){
                    //Common.inputArr(this,val)//下拉样子
                    Common.inputArr2(this,val)//修改添加角色
                }
            },
            deep: true
        }
    },
    beforecreated(){
        console.log("agileEdit--beforecreated-------",this.formValidate)
    },
    created(){
        console.log("agileEdit--created-------",this.formValidate);
        
        Common.GetProjectList(defaultAXIOS,this,Common,projectListDataNew);
    },
    beforeUpdate(){
        console.log("agileEdit--beforeUpdate-------",this.formValidate)
    },
    updated(){
        console.log("agileEdit--updated-------",this.formValidate)
    },
	computed: {
    },

    data () {
        let _this = this;
        const validateDateEnd = Common.checkEndDate(this);
        const validatePart = Common.checkPart(this);
       
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
                pid:"",
                prj_type:"",
                prj_name:'',
                start_time: '',
                end_time: '',
                prj_desc: '',
                prj_goal:"",
                createModule:[],
                modules:[],
                AddGroupList:[],

                subject:"",
                itm_status:"",
                aply_id:"",
                propose_depart:"",


                "itm_prj_eng_nm":"",
                "itm_prj_eng_short_num":"",
                "itm_type":"",
                "itm_assignment_date":"",
                "itm_tech_target":"",
                "itm_prj_tsk_id":"",
                "itm_lob":"",
                "itm_wthr_snd_ntc":"",


                allgroup:[],
                managerGroup:[],
                developerGroup:[],
                testerGroup:[],
                prj_id:'',

            },
            prod_idList: [],
            AddGroupList:[],
            allgroupList: [],
            managerGroupList: [],
            developerGroupList: [],
            testerGroupList: [],
            moduleList: [],

            itm_statusList:[],
            subjectList:[],




            ruleValidate: {

                aply_id: [
                    { required:false, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
                propose_depart: [
                    { required:false, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],


                subject: [
                    { required: false,type: 'string',  message: 'Please select gender', trigger: 'change' }
                ],
                itm_status: [
                    { required: false,type: 'string',  message: 'Please select gender', trigger: 'change' }
                ],


                prod_id: [
                    { required: false,type: 'string',  message: 'Please select gender', trigger: 'change' }
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

        

                start_time: [
                    { required:false, type: 'date', message: '请选择日期！', trigger: 'change' }
                ],
                end_time: [
                    { required:false, type: 'date', validator: validateDateEnd, trigger: 'change' }
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
                // modules: [
                //     { required: false, type: 'array', message: '请填写内容，不能为空！', trigger: 'change' }
                // ],
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
            //检测id是否在projectListDataNew列表里
            GO:false,
            GOText:"",
        }
    },
    mounted(){
        
        let ID = Common.GETID(this,Common,"inUrl") ? Common.GETID(this,Common,"inUrl") : "";
        let PRJ_ID = Common.GETprjid(this,Common,"inUrl") ? Common.GETprjid(this,Common,"inUrl") : "";
        this.getProjectCondition(projectCondition);
        if(ID && PRJ_ID){
            this.addTeamFn(addTeam);
            this.projectGetProdFn(projectGetProd,{id:ID,prj_id:PRJ_ID});
            this.projectEditFn(projectEdit,{id:ID,prj_id:PRJ_ID});
        }else{
            Common.CommonError(this,"没有获取到prjId或id 和 prjSn或prj_id")
            this.resetData();
        }

        this.listModuleFn(listModule,((Id)=>{return Id?{id:Id}:{id:""}})(Common.GETID(this,Common,"inUrl"))).then((res)=>{
            let fn = (obj)=>{
                return obj.label+"【"+obj.value+"】";            
            }
            if(res && Array.isArray(res) && res.length){
                if(!this.formValidate.createModule){
                    this.formValidate.createModule = [];
                }
                if(Array.isArray(this.formValidate.createModule)){
                    res.forEach((item)=>{
                      this.formValidate.createModule.push(fn(item))  
                    });
                }
            }
        }, (error)=>{});

    },
    
    methods: {
        valueChangelabel(val,arr){
            let obj = arr.find(item=>item.value == val)
            return obj && obj.label ? obj.label : ""; 
        },
        isMyEdit(val,Else,prjType){
            let PrjType = prjType ? prjType : this.formValidate.prj_type;
            if(val == "subject"){
                return Else ? true : false;
            }else{
                if(PrjType == "1"){
                    return !Else ? true : false;  
                }else{
                    return Else ? true : false;
                }
            }
        },
        getProjectCondition(URL,params = {}){
            return Common.GetProjectCondition(Common,this,defaultAXIOS,URL,params);
        },
        /* 修改添加角色 */
        cancelRole(i){
            Common.CancelRole(this,i)
        },
        roleClose (event, name) {
            Common.RoleClose(this,event, name)
        },
        addRole(i){
            Common.AddRole(this,i)
        },
        submitRole(i){
            Common.SubmitRole(this,i,Common);
        },
        
        projectGroupFn2(URL,params = {},ARR,thatEle){
            Common.ProjectGroup2(defaultAXIOS,this,URL,params,ARR,thatEle);
        },
        addSelectEleList(ARR,thatEle,dataList){
            if(typeof(ARR)  == "number"){
                if(thatEle && thatEle.temp && thatEle.temp.length){
                    let _tempArr = Common.returnDelArr(this.formValidate.AddGroupList[ARR].grouptemp,dataList);

                    let _tempArr2 = [];
                    _tempArr2.push(...thatEle.temp,..._tempArr);
                    let _tempArr3 = Common.returnDelArr(this.formValidate.AddGroupList[ARR].group,_tempArr2);
                    this.formValidate.AddGroupList[ARR].groupListtemp.push(..._tempArr3);
                }else{
                    let _tempArr4 = Common.returnDelArr(this.formValidate.AddGroupList[ARR].group,dataList);
                    this.formValidate.AddGroupList[ARR].groupListtemp.push(..._tempArr4);
                }
            }else{
                this.showError("addSelectEleList的参数ARR不是数字");
            }

        },
        /* 修改添加角色 */
        listModuleFn(URL,params = {}){
            return Common.Modulelist(defaultAXIOS,this,URL,params)
        },

        addTeamFn(URL,params = {}){
            Common.AddTeam(defaultAXIOS,this,URL,params);
             
        },
        groupDel(I){
            this.thisIndex = I;
            this.modaDelete = true;
            
        },
        
        addpart(){
            this.partAdd = true;
        },
        partCancel(){
            this.partAdd = false;
            this.formPartValidate.partName = "";
            this.$refs.addPartPopBox.resetFields();
        },
        submitPart(name){
            //Common.addPartPopBox(name,this)//下拉样子
            Common.addPartPopBox2(name,this); //修改添加角色
        },
        partCancel3(isClose){
            this.partAdd = isClose;
            this.formPartValidate.partName = "";
        },
        submitPart3(name,partName){
            this.formPartValidate.partName = partName;
            Common.addPartPopBox3(name,this,partName); //修改添加角色
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
                this[ARR] = [];

                if(typeof(ARR)  == "number"){
                    if(thatEle && thatEle.temp && thatEle.temp.length){
                        let _tempArr = Common.returnDelArr(this.formValidate.AddGroupList[ARR].group,myData.data.list);
                        this.formValidate.AddGroupList[ARR].groupList.push(...thatEle.temp,..._tempArr);

                    }else{
                        this.formValidate.AddGroupList[ARR].groupList.push(...myData.data.list);
                    }
                }else{
                    if(thatEle && thatEle.temp && thatEle.temp.length){
                        let _tempArr = Common.returnDelArr(this.formValidate.AddGroupList[ARR].group,myData.data.list);
                        this[ARR].groupList.push(...thatEle.temp,..._tempArr);

                    }else{
                        this[ARR].groupList.push(...myData.data.list);
                    }
                }
                
            }).catch( (error) => {
                console.log(error);
                this.inputLoad = false;
                this.showError(error);
            });   
        },
        projectGetProdFn(URL,Obj = {}){
            defaultAXIOS(URL,Obj,{timeout:5000,method:'get'}).then((response) => {
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
        projectEditFn(URL = "",IDPRJID = {}){

            defaultAXIOS(URL,IDPRJID,{timeout:5000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======【agile edit get】***response+++",response,myData,"====>");
                let _temp = false;
                let _log = {
                    myRef:"selfRef",
                    group:[],
                    groupList:[],
                    myLabel:"逻辑子系统",
                    delBtn:false,
                    groupName:logicSystem,
                    required:false,
                    modaAdd:false,//修改添加角色
                    grouptemp:[],//修改添加角色
                    groupListtemp: [],//修改添加角色
                    myReftemp: "selfRefRole",//修改添加角色
                }
                let phy = {
                    myRef:"selfRef",
                    group:[],
                    groupList:[],
                    myLabel:"物理子系统",
                    delBtn:false,
                    groupName:phySystem,
                    required:false,
                    modaAdd:false,//修改添加角色
                    grouptemp:[],//修改添加角色
                    groupListtemp: [],//修改添加角色
                    myReftemp: "selfRefRole",//修改添加角色
                }
                for(var I in this.formValidate){
                    _temp = myData.data[I]+"";
                    if(I == "AddGroupList"){

                    }else if(_temp.indexOf("|") != -1){
                        this.formValidate[I] = myData.data[I].split("|").filter(item=>item)
                    }else{
                        if(myData.data[I]){
                            this.formValidate[I] = myData.data[I]+"";    
                        }
                        
                    }
                }
                if(window.location.host == "127.0.0.1:9000"){
                    let _DATA = this.$router.history.current.query.DATA;
                    _DATA = _DATA ? JSON.parse(_DATA) : _DATA;
                    this.formValidate.prj_type = _DATA && _DATA.prj_type ? _DATA.prj_type : "";
                }


                let addsystem = (_obj,_myData)=>{
                    if(_myData && Array.isArray(_myData)){
                        _obj.groupList = _myData;
                        if(_myData.length){
                            _obj.group = _myData.map((item)=>{
                                return item.value
                            })
                        }
                        
                        this.formValidate.AddGroupList.unshift(_obj)
                    }
                }
                addsystem(phy,myData.phySystem)
                addsystem(_log,myData.logicSystem)
                
                let checkSystem = (arr,lab)=>{
                    let check = arr.findIndex(
                        (item)=>item.myLabel === lab
                    )
                    if(check != -1){
                        return true;
                    }else{
                        return false;
                    }
                    
                }
                setTimeout(()=>{
                    !checkSystem(this.formValidate.AddGroupList,"逻辑子系统") && this.formValidate.AddGroupList.unshift(_log);
                    !checkSystem(this.formValidate.AddGroupList,"物理子系统") && this.formValidate.AddGroupList.unshift(phy);
                },1)

                this.formValidate.prj_type = this.formValidate.prj_type+"";

                this.formValidate.pid = this.formValidate.pid ? this.formValidate.pid+"" : "";

                let objVal = (Arr,Lab) => {
                    for(var O = 0;O< Arr.length;O++ ){
                        if(Arr[O].label ==Lab){
                            return Arr[O].value
                        }
                    }
                }

                let groupList = (Arr)=>{
                    let _demoObj = {};
                    let _demoArr = [];
                    if(Arr.length){
                        for(var A=0;A<Arr.length;A++){
                            _demoObj.value = Arr[A].user_name;
                            _demoObj.label = Arr[A].nick_name;
                            _demoArr.push(_demoObj);
                            _demoObj = {};
                        }
                        return _demoArr;
                    }else{
                        return  [];
                    }
                }
                let group = (Arr)=>{
                  
                    let _demoArr = [];
                    if(Arr.length){
                        for(var A=0;A<Arr.length;A++){
                            _demoArr.push(Arr[A].user_name);
                        }
                        return _demoArr;
                    }else{
                        return  [];
                    }
                }

                if(myData.role_user_info && myData.role_user_info.length){
                    
                    let _tempObj = false;
                    for(var J=0;J< myData.role_user_info.length;J++){

                        _tempObj = {
                            myRef:"selfRef",
                            group:[],
                            groupList:[],
                            myLabel:"",
                            myValue:"",
                            delBtn:true,
                            groupName:"",
                            required:true,
                            modaAdd:false,//修改添加角色
                            grouptemp:[],//修改添加角色
                            groupListtemp: [],//修改添加角色
                            myReftemp: "selfRefRole",//修改添加角色
                        }

                        _tempObj.myLabel = myData.role_user_info[J].title;
                        _tempObj.myValue = objVal(this.formPartValidate.addGroupList,myData.role_user_info[J].title)
                        _tempObj.groupList = groupList(myData.role_user_info[J].member);
                        _tempObj.group = group(myData.role_user_info[J].member); 
                        //_tempObj.groupList = [{"value":"lizhuo.zh","label":"李卓"}]; 
                        
                        this.formValidate.AddGroupList.push(_tempObj);
                        _tempObj = false;
                    }
                    //
                }

            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
        showError(ERR){
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
            // this.formValidate.date[0] = nowDay;
            // this.formValidate.date[1] = defDay;

            this.formValidate.start_time  = nowDay;
        },
       
        
        formItemReset(){
            this.resetData(); //this.formValidate.date = [];
            this.formValidate.pid = "";
            this.formValidate.prj_type = "1";
            this.formValidate.prj_name = "";
            this.formValidate.start_time = "";
            this.formValidate.end_time = "";
            this.formValidate.prj_desc = "";
            this.formValidate.prj_goal = "";
            this.formValidate.createModule = [];
            this.formValidate.modules = [];

            this.formValidate.prod_id = "";
            //this.formValidate.AddGroupList = this.defaultGroup;
            
            //this.formValidate.prj_id = this.$router.history.current.query.id ? this.$router.history.current.query.id : "";
            this.formValidate.prj_id = "";
            this.formValidate.propose_depart = "";
            this.formValidate.aply_id = "";
            this.formValidate.subject = "";
            this.formValidate.itm_status = "";
            


            this.formValidate.allgroup = [];
            this.formValidate.managerGroup = [];
            this.formValidate.developerGroup = [];
            this.formValidate.testerGroup = [];
            
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
            
            let _modules = Array.isArray(this.formValidate.modules) ? this.formValidate.modules.join(_join) : this.formValidate.modules;
            let _createModule_ = ((createModule)=>{
                let fn = (name)=>{
                    if(name.toString().indexOf("【") != -1 && name.toString().indexOf("】") != -1){
                        return true;
                    }else{
                        return false;
                    }
                }
                if(Array.isArray(createModule) && createModule.length){
                    for (let i = createModule.length - 1; i >= 0; i--) {
                        if (fn(createModule[i])) {
                            createModule.splice(i, 1);
                        }
                    }
                    return createModule.join(_join);
                }else{
                    return createModule
                }
            })(this.formValidate.createModule)
            let _createModule =  Array.isArray(_createModule_) && _createModule_.length == 0 ? "" : _createModule_;
            // let _start_time = new Date(this.formValidate.start_time).Format("yyyy-MM-dd");
            // let _end_time = this.formValidate.end_time ? new Date(this.formValidate.end_time).Format("yyyy-MM-dd") : this.formValidate.end_time;
            let _start_time = Common.DateFormat(Common,this.formValidate.start_time);
            let _end_time = Common.DateFormat(Common,this.formValidate.end_time);
             

            //let _proj_role = JSON.stringify(Common.CheeckRoleVal(this,Common.objInArr(this.formValidate.AddGroupList)));

            let _proj_role_ = Common.CheeckRoleVal(this,Common.objInArr(this.formValidate.AddGroupList));
            let _System = _proj_role_.splice(0, 2);
            //console.log(_System[0].member,_System[1].member)
            
            let _logicSystem = JSON.stringify(_System[0].member.map((item)=>{return item.value}));
            let _phySystem = JSON.stringify(_System[1].member.map((item)=>{return item.value}));
            let _proj_role = JSON.stringify(_proj_role_);
            let _pid = this.formValidate.pid ? this.formValidate.pid : "";
            let _username = Common.getStorageAndCookie(this,Common,"username");

            let tempData = {
                id:Common.GETID(this,Common,"inUrl"),
                prjId:Common.GETID(this,Common,"inUrl"),
                prj_type:this.formValidate.prj_type,
                prj_name: this.formValidate.prj_name,
                start_time:_start_time,
                end_time:_end_time,
                prj_desc: this.formValidate.prj_desc,
                prj_goal: this.formValidate.prj_goal,
                prj_id: this.formValidate.prj_id,
                prjSn: this.formValidate.prj_id,
                username:_username,
                propose_depart:this.formValidate.propose_depart,
                aply_id:this.formValidate.aply_id,
                subject:this.formValidate.subject,
                itm_status:this.formValidate.itm_status,

                /*
                modules:_modules,
                createModule:_createModule,
                prod_id:this.formValidate.prod_id,
                pid:this.formValidate.prod_id,
                AddGroupList:JSON.stringify(this.formValidate.AddGroupList),
                proj_role:_proj_role,
                pid:_pid,
                logicSystem:_logicSystem,//子系统
                phySystem:_phySystem,//子系统
                */

                
            }

            //projectEdit
            defaultAXIOS(projectEdit,tempData,{timeout:5000,method:'post'}).then((response) => {
                //alert(JSON.stringify(response))
                let myData = response.data;
                console.log("<======[agile edit post]***response+++",response,myData,"=====>");
                if(myData.status == "success"){
                    this.modal_add_loading = false;
                    this.formItemReset();
                    this.$refs.formValidate.resetFields();

                    if(this.$router.history.current.query.from == "detail"){
                        let urlObj = {
                            id: this.$router.history.current.query.id,
                            prjId: this.$router.history.current.query.id,
                            prj_id:this.$router.history.current.query.prj_id,
                            prjSn:this.$router.history.current.query.prj_id,
                        }
                        this.$router.push({path: '/agile/detail', query: urlObj})
                    }else{
                        this.$router.push('/agile');
                    }

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
                }else{
                    Common.CommonWarning(this,"有必选的还未填写！")
                }
            })
        },
        cancel () {
            this.formItemReset();
            this.$refs.formValidate.resetFields();

            if(this.$router.history.current.query.from == "detail"){
                let urlObj = {
                    id: this.$router.history.current.query.id,
                    prjId: this.$router.history.current.query.id,
                    prj_id:this.$router.history.current.query.prj_id,
                    prjSn:this.$router.history.current.query.prj_id,
                }
                this.$router.push({path: '/agile/detail', query: urlObj})
            }else{
                this.$router.push('/agile');
            }
            
        },
        handleClose (event, name) {
            let getStr = (string,str_after,str_before)=>{
                return string.substring(string.indexOf(str_after)+1,string.lastIndexOf(str_before))
            }
            if(name.toString().indexOf("【") != -1 && name.toString().indexOf("】") != -1){
                let _arr = _.cloneDeep(this.formValidate.modules)
                _arr.splice(_arr.indexOf(getStr(name,"【","】")),1);
                this.formValidate.modules = [];
                this.formValidate.modules = _arr;
            }
            const index = this.formValidate.createModule.indexOf(name);
            this.formValidate.createModule.splice(index, 1);
        },

        submitModule () {
            if(!this.formValidate.createModule){
                this.formValidate.createModule = [];
            }
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
    },
    components: {
        AddPartPop,
        GoAgileMode,
    },

}
</script>
<style lang="less" scoped>
.aglieAddBox {

}
.fromBox {
	width: 80%;
}
.fromBox2 {
    //width: 70%;
}
.addpartBox{
    padding-bottom: 20px;
    text-align: left;
}
</style>