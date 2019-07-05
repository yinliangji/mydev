<template>
	<div class="pageContent">
		<goAgile :go="'/demand'" :text="'返回需求项项列表'" :TOP="'5'" />
		<Card>
            <div class="aglieAddBox">
            	<!--  -->
            	<Form :model="formItem" :label-width="100" :rules="ruleValidate" ref="formValidate" style="width:100%;">
                    <h3 class="Title"><span>项目需求项{{ADDorEDIT?"添加":"编辑"}}</span></h3>
                    <div class="fromBox">
    		            <FormItem label="所属项目" >
    		                <p>{{formItem.prj_name}}</p>
    		            </FormItem>
    		            

    		            <FormItem label="需求项类型" prop="prj_type">
                            自研
    		                <RadioGroup v-model="formItem.prj_type" v-show="false">
    		                    <Radio label="1" v-show="false">
    		                        立项&nbsp;
    		                        <ToolTip placement="top-start" :T="1" content="在ITM中立项的项目对应的需求项" />
    		                    </Radio>
    		                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    		                    <Radio label="2">
    		                        自研&nbsp;
    		                        <ToolTip placement="top-start" :T="1" content="非立项项目对应的需求项" />
    		                    </Radio>
    		                </RadioGroup>
    		            </FormItem>
    		            
    		            
    		            <FormItem label="需求项编号" prop="req_id" v-show="formItem.prj_type  == 2 ? false : true" >
    		                <Input v-model="formItem.req_id"  :disabled="formItem.prj_type  == 1 ? false : true" placeholder="请输入需求项编号"></Input>
    		                <!-- <p v-show="formItem.prj_type  != 2 ? false : true">【需求项编号】自动生成</p> -->
    		                <ToolTip  content="项目在icdp自动生成需求编号" />
                            
    		            </FormItem>
    		            <FormItem label="需求项编号" v-show="formItem.prj_type  != 2 ? false : true">
    		                <p >【项目在icdp自动生成需求编号】</p>
    		                <!-- v-if="formItem.prj_type  == 2 ? false : true" -->
    		            </FormItem>
    		            <FormItem label="需求项名称" prop="req_name">
    		                <Input v-model="formItem.req_name" placeholder="请输入需求项名称"></Input>
    		            </FormItem>
                        <Row v-show="false">
                            <Col span="12">
                                <FormItem label="开始时间" >
                                    <!-- prop="start_time" -->
                                    <DatePicker placement="bottom-start" type="date" format="yyyy-MM-dd"  placeholder="选择开始日期"  :value="formItem.start_time" v-model="formItem.start_time" ></DatePicker>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                 <FormItem label="结束时间" >
                                    <!-- prop="end_time" -->
                                    <DatePicker  placement="bottom-start" type="date" :options="options3" placeholder="选择结束日期" v-model="formItem.end_time" ></DatePicker>
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem label="期望上线时间" >
                            <DatePicker  placement="bottom-start" type="date" :options="options3" placeholder="选择期望上线时间" v-model="formItem.hope_time" />
                        </FormItem>
    		            <FormItem label="提出部门" prop="req_submitter">
    		                <Input v-model="formItem.req_submitter" placeholder="请输入提出部门"></Input>
    		            </FormItem>

                        <Row v-show="formItem.prj_type  != 2 ? false : true">
                            <Col span="12">
                                <FormItem label="需求提出人">
                                    <Input v-model="formItem.intro" placeholder="请输入提出人"></Input>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                 <FormItem label="需求来源" >
                                    <Input v-model="formItem.req_source" placeholder="请输入需求来源"></Input>
                                    <!-- <Select  clearable v-model="formItem.req_source" placeholder="请选择需求来源">
                                        <Option v-for="(item,index) in req_sourceList" :value="item.value" :key="index">{{ item.label }}</Option>
                                    </Select> -->
                                </FormItem>
                            </Col>
                        </Row>

    		            <FormItem label="添加依赖项" v-show="false">
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

                        

                        

    		            <FormItem label="需求项描述" prop="comment" v-show="formItem.prj_type  != 2 ? false : true">
    		                <Input v-model="formItem.comment" type="textarea" :autosize="{minRows: 3,maxRows: 10}" placeholder="请填写需求项描述"></Input>
    		            </FormItem>
                        <FormItem label="需求项备注" prop="remark" >
                            <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 3,maxRows: 10}" placeholder="请填写需求项备注"></Input>
                        </FormItem>

    		            <FormItem>
        					<Button type="primary" :loading="modal_add_loading" @click="submitAdd">
        				        <span v-if="!modal_add_loading">提交</span>
        				        <span v-else>Loading...</span>
        				    </Button>
                            <Button  style="margin-left: 8px" @click="cancel">返回</Button>
                        </FormItem>
                    </div>
		        </Form>
            	<!--  -->
            </div>
        </Card>
		<Depend :prjName="formItem.prj_name" :DependOnOff="dependonoff" @sendDepend="receiveDepend" @sendCloseDepend="receiveCloseDepend" />
	</div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {reqAdd,reqGet,reqEdit,projectListDataNew,getReqDepd,getPrjTime} = Common.restUrl;
import Depend from '@/pages/product/add/depend'
export default {
	data () {
        let _this = this;
        const validateDateEnd = Common.checkEndDate(this,"formItem");
        const req_idCheck = (rule, value, callback) => {
            if(this.formItem.prj_type  != 1){
                callback()
            }else{
                //
                if (!value) {
                    return callback(new Error('不能为空！'));
                }else if(value == "需求项编号已有"){
                    return callback(new Error('需求项编号已有，请重填！'));

                }else{
                    callback()   
                }
                //
            }
        };        
        return {
            options3: {
                disabledDate (date) {
                    if(_this.formItem.start_time){
                        return date && date.valueOf() < _this.formItem.start_time.getTime() + 86400000;//24*60*1000*60
                    }else{
                        //return date && date.valueOf() < Date.now() - 86400000;//24*60*1000*60
                    }
                    
                }
            },
            modaAdd: false,
            modal_add_loading: false,
            ADDorEDIT:true,
            editTableData:false,
            itemEndTime:"",
            formItem: {
                req_name:"",
                req_id:"",
                prj_type:"2",
                req_submitter:"",
                prj_id:"",
                prj_name:"",
                myId:"",
                comment:"",
                start_time:"",
                end_time:"",
                remark:"",
                intro:"",
                req_source:"",
                hope_time:"",
            },

            ruleValidate: {
                req_name: [
                    { required: true, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
                req_id: [
                    { required: true,validator: req_idCheck,  trigger: 'blur' }//message: '编号为空或重复！',
                ],
                req_submitter: [
                    { required: false, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
                comment: [
                    { required: false, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
                remark: [
                    { required: false, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
                start_time: [
                     { required: true, type: 'date', message: '请选择日期！', trigger: 'change' }
                 ],
                end_time: [//
                    { required: true, type: 'date', validator: validateDateEnd, trigger: 'change' }
                    //{ required: false, type: 'date', message: 'Please select the date', trigger: 'change' }
                ],
            },
            req_sourceList:[
            ],
            prj_idList:[
            ],
            //依赖开始
            dependList:[],
            depd_sn:"",
            dependonoff:false,
            //依赖结束
        }
    },
    beforecreated(){
        console.log("需求项添加或编辑--beforecreated--",this.formItem)
    },
    created(){
        console.log("需求项添加或编辑--created--",this.formItem);
        this.checkMenuListFn(projectListDataNew);
    },
    beforeUpdate(){
        console.log("需求项添加或编辑--beforeUpdate--",this.formItem)
    },
    updated(){
        console.log("需求项添加或编辑--updated--",this.formItem)
    },
	mounted(){
        this.getTimerPrj(getPrjTime,{prj_id:Common.GETID(this,Common)}).then((D)=>{
            this.isDATA(D);
        },()=>{
            this.isDATA();
        })
		
	},
	methods: {
        isDATA(D){
            if(this.$router.history.current.query.DATA){
                let _DATA = JSON.parse(this.$router.history.current.query.DATA);
                _DATA = Array.isArray(_DATA) ? _DATA : [_DATA];
                this.ADDorEDIT = false;
                this.changeDemandSerch();
                this.getReqDepdFn(getReqDepd,{prjId:Common.GETID(this,Common),reqId:_DATA[0].id});
                
                this.editFn(_DATA);
            }

        },
        changeDemandSerch(){
            if(this.ADDorEDIT){
                Common.RemoveSession("demandSerch");
                Common.RemoveSession("allDemandSession");
            }else if(Common.GetSession("demandSerch")){
                Common.SetSession("allDemandSession",Common.GetSession("demandSerch"));
                Common.RemoveSession("demandSerch");
            }
        },
        getTimerPrj(URL,params = {}){
            return defaultAXIOS(URL,params,{timeout:5000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======需求项 获取项目时间***response+++",response,myData,"======>");
                if(myData.status == "success"){
                    this.itemEndTime = myData.data.end_time;
                    this.req_sourceList = myData.req_sourceList;

                    return Promise.resolve(myData.data)
                    //this.formItem.intro = myData.data.intro;
                    //this.formItem.req_source = myData.data.req_source;

                }else{
                    this.showError(myData.status);
                    return Promise.reject(myData.status);  
                }
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
                return Promise.reject(myData.status);
            });
        },
		//依赖开始
		getReqDepdFn(URL,params = {}){
			defaultAXIOS(URL,params,{timeout:5000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======需求项 获取依赖项***response+++",response,myData,"======>");
                if(myData.status == "success"){
                	this.dependList = myData.data;
                }else{
                    this.showError(myData.status);
                }
                
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
		},
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
        editFn(data){
            if(data && Array.isArray(data)){
                this.formItem.start_time = data[0].start_time+"";
                this.formItem.end_time = data[0].end_time+"";

                this.formItem.req_id = data[0].req_id+"";
                this.formItem.req_name = data[0].req_name+"";
                this.formItem.req_submitter = data[0].req_submitter+"";
                this.formItem.prj_type = data[0].prj_type+"";
                this.formItem.prj_id = Common.GETID(this,Common);
                this.formItem.myId = data[0].id+"" || "";
                this.formItem.comment = data[0].comment+"";
                this.formItem.remark = data[0].remark+"";

                this.formItem.intro = (data[0].intro || "")+"";
                this.formItem.req_source = (data[0].req_source || "")+"";


                this.formItem.hope_time = data[0].hope_time;

            }
        },
        addItem(){
            this.modaAdd = true;
        },
        formItemReset(){

            this.formItem.start_time = "";
            this.formItem.end_time = "";
            this.formItem.remark = "";

            this.formItem.req_name = "";
            this.formItem.req_id = "";
            this.formItem.req_submitter = "";
            this.formItem.prj_type = "2";
            this.formItem.prj_id = "";
            this.editTableData = false;
            this.formItem.myId = "";
            this.formItem.comment = "";
            this.formItem.intro = "";
            this.formItem.hope_time = "";
            this.formItem.req_source = "";
            this.dependList = [];
            this.depd_sn = "";
            
        },
        submitAddData(){
            let _start_time = Common.DateFormat(Common,this.formItem.start_time);
            let _end_time = Common.DateFormat(Common,this.formItem.end_time);
            let tempData = {
                start_time:_start_time,
                end_time:_end_time,
                remark:this.formItem.remark,

                req_name: this.formItem.req_name,
                req_id: this.formItem.req_id,
                //req_id:this.formItem.prj_type == 2 ? "" : this.formItem.req_id,
                req_submitter:this.formItem.req_submitter,
                prj_type:this.formItem.prj_type,
                prj_id:this.formItem.prj_id,
                myId:this.formItem.myId,
                comment:this.formItem.comment,

                depd_main_type:1,
                depd_list:this.dependList,
                depd_sn:this.formItem.req_id,
                username:Common.getStorageAndCookie(this,Common,"username") || "",

                intro:this.formItem.intro,
                hope_time:this.formItem.hope_time,
                req_source:this.formItem.req_source,
            }
            
            let URL = this.ADDorEDIT ? reqAdd : reqEdit;
            defaultAXIOS(URL,tempData,{timeout:5000,method:'post'}).then((response) => {
                let myData = response.data;
                console.log("<======demand reqAdd***response+++",response,myData,"======>");
                if(myData.status == "success"){

                    this.modaAdd = false;
                    this.formItemReset();
                    this.$refs.formValidate.resetFields();
                    this.$router.push({path: '/demand/', query: {}})
                    
                }else{
                    this.modaAdd = true;
                    this.modal_add_loading = false;
                    this.showError(myData.status);
                }
                
            }).catch( (error) => {
                console.log(error);
                
                this.modal_add_loading = false;
                this.showError(error);
            });
            //
           

        },
        submitAdd () {
        	this.modal_add_loading = true;
            this.checkReqId(reqGet,this.req_id,Common.GETID(this,Common))
            .then(()=>{
                this.$refs.formValidate.validate((valid)=>{//验证
                    this.modal_add_loading = false;
                    if(valid){
                        this.submitAddData();
                    }else{
                        Common.CommonWarning(this,"有必选的还未填写或不正确！");
                    }
                })
            },(error)=>{
                console.log(error)
                if(error == "需求项编号已有"){
                    this.formItem.req_id = "需求项编号已有"
                }
                this.$refs.formValidate.validate();
                this.formItem.req_id = "";

            })
            this.modal_add_loading = false;
                this.$nextTick(() => {
                  this.modal_add_loading = true;
                });

        },
        cancel () {
            this.formItemReset();
            this.$refs.formValidate.resetFields();
            this.$router.push('/demand');
        },
        checkReqId(URL,prj_id,req_id){

            return defaultAXIOS(URL,{prj_id,req_id,debug:false},{timeout:60000,method:'get'})
            .then((response) => {
                let myData = response.data;
                console.log("<======【demand reqGet get】***response+++",response,myData,"====>");
                if(Array.isArray(myData.data)){
                    if(!myData.data.length){
                        return Promise.resolve(true);
                    }else{
                        return Promise.reject("需求项编号已有");
                    }
                }else{
                    
                    return Promise.reject("数据类型错误");
                }
            })
            .catch( (error) => {
                console.log(error);
                if(error != "需求项编号已有"){
                    this.showError(error);
                }
                return Promise.reject(error);
            });  

        },
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
        checkMenuListFn(URL){
            if(Common.getStorageAndCookie(this,Common,"prj_name") && Common.getStorageAndCookie(this,Common,"prjId")){
                this.formItem.prj_id = Common.getStorageAndCookie(this,Common,"prjId");
                this.formItem.prj_name = Common.getStorageAndCookie(this,Common,"prj_name");
                return
            }

            defaultAXIOS(URL,{username:Common.getStorageAndCookie(this,Common,"username")},{timeout:5000,method:'get'})
            .then((response) => {
                let myData = response.data;
                console.log("<======demand projectListDateNew***response+++",response,myData,"======>");
                let _newData = myData.data ? myData.data : myData;
                if(Array.isArray(_newData) && _newData.length){
                    //
                    let _tempObj = {};
                    for(let i=0;i<_newData.length;i++){
                        if(Common.GETID(this,Common) == _newData[i].id){
                            this.formItem.prj_id = _newData[i].id+"";
                            this.formItem.prj_name = _newData[i].prj_name+"";
                        }
                        _tempObj.value = _newData[i].id+"";
                        _tempObj.label = _newData[i].prj_name+"";
                        this.prj_idList.push(_tempObj);
                        _tempObj = {}
                    }
                    //
                }else{
                    this.showError(URL+"_错误");
                }
                
            })
            .catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
    },
	components:{
		Depend,
		
	},
	watch:{
        
    },
}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';
.top,.bottom{
    text-align: center;
}
.center{
    width: 300px;
    margin: 10px auto;
    overflow: hidden;
}
.center-left{
    float: left;
}
.center-right{
    float: right;
}
.fromBox {
    width: 80%;
}
</style>