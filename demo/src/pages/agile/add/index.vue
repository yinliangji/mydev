<template>
	<div class="pageContent">
        <goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :Top="'5'" />
        <Card>
            <div class="aglieAddBox">
                
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" class="fromBox">
					<h3 class="Title">项目基本信息</h3>
                    <FormItem label="项目名称" prop="prj_name">
                        <Input v-model="formValidate.prj_name" placeholder="请填写项目名称"></Input>
                    </FormItem>

                   <!--  <FormItem label="设置时间" prop="date">
                        <DatePicker :value="formValidate.date" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="选择开始和结束日期" v-model="formValidate.date" split-panels  style="width: 300px"></DatePicker>
                    </FormItem> -->

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


                    <!-- <Input v-model="formValidate.moudle" placeholder="请填写模块名称"></Input> -->
                    <FormItem label="填写模块" prop="modules">
                        <Tag v-for="item in formValidate.modules" :key="item" :name="item" closable @on-close="handleClose">
                            {{ item}}
                        </Tag>
                        <Button icon="ios-plus-empty" type="dashed" size="small" @click="addItem">
                            添加模块
                        </Button>
                    </FormItem>





                    <FormItem label="模块选择" prop="module">
                        <Select v-model="formValidate.module" multiple >
                            <Option v-for="item in moduleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>

                    <!-- <FormItem label="技术模块" prop="technology">
                        <Select v-model="formValidate.technology" multiple >
                            <Option v-for="item in technologyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem> -->
					<h3 class="Title">成员信息</h3>

					

                    <Row>
                        <Col span="12">
							<FormItem label="总体组" prop="allgroup">
		                        <!-- <Select v-model="formValidate.group" placeholder="请选择总体组">
		                            <Option value="总体组1">总体组1</Option>
		                            <Option value="总体组2">总体组2</Option>
		                            <Option value="总体组3">总体组3</Option>
		                        </Select> -->
                                <Select v-model.lazy="formValidate.allgroup" filterable multiple>
                                    <Option v-for="item in allgroupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
		                    </FormItem> 
                        </Col>
                        <Col span="12">
	                        <FormItem label="项目经理" prop="managerGroup">
                                <Select v-model.lazy="formValidate.managerGroup" filterable multiple>
                                    <Option v-for="item in managerGroupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
		                        <!-- <Select v-model="formValidate.manager" placeholder="请选择项目经理">
		                            <Option value="经理1">经理1</Option>
		                            <Option value="经理2">经理2</Option>
		                            <Option value="经理3">经理3</Option>
		                        </Select> -->
		                    </FormItem> 
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col span="12">
							<FormItem label="开发组" prop="developerGroup">
                                <Select v-model.lazy="formValidate.developerGroup" filterable multiple>
                                    <Option v-for="item in developerGroupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <!-- <Select v-model="formValidate.developer" placeholder="请选择开发人员">
                                    <Option value="开发人员1">开发人员1</Option>
                                    <Option value="开发人员2">开发人员2</Option>
                                    <Option value="开发人员3">开发人员3</Option>
                                </Select> -->
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="测试组" prop="testerGroup">
                                <Select v-model.lazy="formValidate.testerGroup" filterable multiple>
                                    <Option v-for="item in testerGroupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <!-- <Select v-model="formValidate.tester" placeholder="请选择测试人员">
                                    <Option value="测试人员1">测试人员1</Option>
                                    <Option value="测试人员2">测试人员2</Option>
                                    <Option value="测试人员3">测试人员13</Option>
                                </Select> -->
                            </FormItem>
                        </Col>
                    </Row>
                                

                    <!-- 
                    
                    <Row>
                        <Col span="12">
                                   
                        </Col>
                        <Col span="12">
                            <FormItem label="维护人员" prop="maintainer">
                                <Select v-model="formValidate.maintainer" placeholder="请选择维护人员">
                                    <Option value="维护人员1">测试人员1</Option>
                                    <Option value="维护人员2">测试人员2</Option>
                                    <Option value="维护人员3">测试人员13</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row> 
                	-->
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
    </div>
</template>
<script>


import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {projectAdd,projectAll} = Common.restUrl;


import Store from '@/vuex/store'
Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
}

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
        
    },
    beforecreated(){
        console.log("agileAdd--beforecreated-------",this.formValidate.modules)
    },
    created(){
        console.log("agileAdd--created-------",this.formValidate.modules)
    },
    beforeUpdate(){
        console.log("agileAdd--beforeUpdate-------",this.formValidate.modules)
    },
    updated(){
        console.log("agileAdd--updated-------",this.formValidate.modules)
        if(this.addtest){
        	this.$router.push('/agile')
        }
    },
	computed: {
        addtest() {
            return this.$store.state["ADD_DATA_TEST"].data
        },
    },

    data () {
        let _this = this;
        return {
            options3: {
                disabledDate (date) {
                    if(_this.formValidate.startDate){
                        return date && date.valueOf() < _this.formValidate.startDate.getTime() + 86400000;//24*60*1000*60
                    }else{
                        //return date && date.valueOf() < Date.now() - 86400000;//24*60*1000*60
                    }
                    
                }
            },
            nowDate:"",
            defDate:"",
            formValidate: {
                prj_name:'',
                start_time: '',
                end_time: '',
                prj_desc: '',
                prj_goal:"",
                modules:[],
                module:"",
                allgroup:[],
                managerGroup:[],
                developerGroup:[],
                testerGroup:[],






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
            allgroupList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
                {
                    value: 'Paris',
                    label: 'Paris'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }
            ],
            managerGroupList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
                {
                    value: 'Paris',
                    label: 'Paris'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }
            ],
            developerGroupList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
                {
                    value: 'Paris',
                    label: 'Paris'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }
            ],
            testerGroupList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
                {
                    value: 'Paris',
                    label: 'Paris'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }
            ],
            technologyList: [
                {
                    value: 'New York',
                    label: '技术模块1'
                },
                {
                    value: 'London',
                    label: '技术模块2'
                },
                {
                    value: 'Sydney',
                    label: '技术模块3'
                },
               
            ],
            moduleList: [
                {
                    value: 'New York',
                    label: '业务模块1'
                },
                {
                    value: 'London',
                    label: '技术模块1'
                },
                {
                    value: 'Sydney',
                    label: '业务模块3'
                },
               
            ],
            ruleValidate: {
                prj_name: [
                    { required: true, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
                start_time: [
                    { required: false, type: 'date', message: 'Please select the date', trigger: ['blur','change'] }
                ],
                end_time: [
                    { required: false, type: 'date', message: 'Please select the date', trigger: ['blur','change'] }
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
            
        }
    },
    mounted(){
        this.resetData()
    },
    
    methods: {
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
            this.formValidate.prj_name = "";
            this.formValidate.start_time = "";
            this.formValidate.end_time = "";
            this.formValidate.prj_desc = "";
            this.formValidate.prj_goal = "";
            this.formValidate.modules = [];
            this.formValidate.moudle = "";
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
            let _modules = this.formValidate.module ? this.formValidate.modules.push(this.formValidate.module) : this.formValidate.modules;
            //let _modules = this.formValidate.modules;
            let _start_time = new Date(this.formValidate.start_time).Format("yyyy-MM-dd");
            let _end_time = this.formValidate.end_time ? new Date(this.formValidate.end_time).Format("yyyy-MM-dd") : this.formValidate.end_time;
            let tempData = {
                prj_name: this.formValidate.prj_name,
                start_time:_start_time,
                end_time:_end_time,
                prj_desc: this.formValidate.prj_desc,
                prj_goal: this.formValidate.prj_goal,
                modules:_modules,
                allgroup: this.formValidate.allgroup,
                managerGroup: this.formValidate.managerGroup,
                developerGroup: this.formValidate.developerGroup,
                testerGroup: this.formValidate.testerGroup,
               


                num: parseInt(Math.random()*100),
                manager:"经理",
                group:"group|group",
                // startTime:new Date(this.formValidate.date[0]).Format("yyyy-MM-dd"),
                // endTime:new Date(this.formValidate.date[1]).Format("yyyy-MM-dd"),
                // startTime:this.formValidate.startDate,
                // endTime:this.formValidate.endDate,
            }

/**/
defaultAXIOS(projectAll,{page:1,pageline:3},{timeout:2000,method:'post'}).then((response) => {
                alert(JSON.stringify(response))
                let myData = response.data;
                console.log("<======agile***response+++",response,myData.data.list,"+++agile***response======>");
                this.tableData = myData.data.list;
                this.tableDAtaTatol = myData.data.total;
            }).catch( (error) => {
                console.log(error);
                alert(error)
            });

            defaultAXIOS(projectAdd,{page:1,pageline:3},{timeout:2000,method:'post'}).then((response) => {
                alert(JSON.stringify(response))
                let myData = response.data;
                console.log("<======agile***response+++",response,myData,"+++agile***response======>");
                this.modal_add_loading = false;
                this.formItemReset();
                this.$refs.formValidate.resetFields();
                //this.$router.push('/agile')
            }).catch( (error) => {
                console.log(error);
                alert(error)
                this.modal_add_loading = false;
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
            const index = this.formValidate.modules.indexOf(name);
            this.formValidate.modules.splice(index, 1);
        },

        submitModule () {
            setTimeout(() => {
                this.formValidate.modules.push(this.formItem.businessName)
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
</style>