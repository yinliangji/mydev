<template>
	<div class="pageContent">
        <goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :Top="'5'" />
        <Card>
            <div class="aglieAddBox">
                
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" class="fromBox">
					<h3 class="Title">项目基本信息</h3>



                    <FormItem label="所属产品" prop="prod_id">
                                <Select v-model="formValidate.prod_id" placeholder="请选择所属产品">
                                    <Option value="1">产品1</Option>
                                    <Option value="2">产品2</Option>
                                    <Option value="3">产品3</Option>
                                </Select> 
                                
                            </FormItem> 


                    <FormItem label="项目名称" prop="prj_name">
                        <Input v-model="formValidate.prj_name" placeholder="请填写项目名称"></Input>
                    </FormItem>

                   <!--  <FormItem label="项目编号" prop="prj_id">
                        <Input v-model="formValidate.prj_id" placeholder="请填写项目编号"></Input>
                    </FormItem> -->

                    <FormItem label="项目类型" prop="prj_type">
                        <RadioGroup v-model="formValidate.prj_type">
                            <Radio label="0">立研</Radio>
                            <Radio label="1">自研</Radio>
                        </RadioGroup>
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
							<FormItem label="总体组" prop="allgroup" ref="allgroupBox">
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
const {projectAdd,projectAll,projectAllgroup,projectManagerGroup,projectDeveloperGroup,projectTesterGroup} = Common.restUrl;


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

let throttle = (func, wait, options) =>{
    /* options的默认值
     *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
     *  options.leading = true;
     * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
     *  options.trailing = true; 
     * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
     */
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
        previous = options.leading === false ? 0 : _.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function() {
        var now = _.now();
        if (!previous && options.leading === false) previous = now;
        // 计算剩余时间
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 当到达wait指定的时间间隔，则调用func函数
        // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
        if (remaining <= 0 || remaining > wait) {
            // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
            if (timeout) {
              clearTimeout(timeout);
              timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            // options.trailing=true时，延时执行func函数
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
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
                prj_type:"0",
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
            allgroupList: [
                {
                    value: 'New York1',
                    label: 'New York总体组人1'
                },
                {
                    value: 'London',
                    label: 'London总体组人2'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney总体组人3'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa总体组人4'
                },
                {
                    value: 'Paris',
                    label: 'Paris总体组人5'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra总体组人6'
                }
            ],
            managerGroupList: [
                {
                    value: 'New York2',
                    label: 'New York项目经理1'
                },
                {
                    value: 'London',
                    label: 'London项目经理2'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney项目经理3'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa项目经理4'
                },
                {
                    value: 'Paris',
                    label: 'Paris项目经理5'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra项目经理6'
                }
            ],
            developerGroupList: [
                {
                    value: 'New York3',
                    label: 'New York开发人员1'
                },
                {
                    value: 'London',
                    label: 'London开发人员2'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney开发人员3'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa开发人员4'
                },
                {
                    value: 'Paris',
                    label: 'Paris开发人员5'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra开发人员6'
                }
            ],
            testerGroupList: [
                {
                    value: 'New York4',
                    label: 'New York测试人员1'
                },
                {
                    value: 'London',
                    label: 'London测试人员2'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney测试人员3'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa测试人员4'
                },
                {
                    value: 'Paris',
                    label: 'Paris测试人员5'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra测试人员6'
                }
            ],
            technologyList: [
                {
                    value: 'New York5',
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
                    { required: false, message: 'Please select gender', trigger: 'change' }
                ],
                prj_type: [
                    { required: false, message: 'Please select gender', trigger: 'change' }
                ],
                
                prj_name: [
                    { required: true, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
                start_time: [
                    { required: false, type: 'date', message: 'Please select the date', trigger: ['blur','change'] }
                ],
                end_time: [//
                    //{ required: false, type: 'date', validator: validateDate2, trigger: 'change' }
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
            
        }
    },
    mounted(){
        this.resetData();


        
        //this.$refs.allgroupBox.$children[0].$refs.reference.getElementsByClassName("ivu-select-input")[0].style.background = 'red';

        let allgroupBoxDOM = this.$refs.allgroupBox.$children[0].$refs.reference.getElementsByClassName("ivu-select-input")[0];
        let allgroupBoxDOMThrottle = throttle(()=>{console.log(allgroupBoxDOM.value)},1500)        
        allgroupBoxDOM.addEventListener("keyup", function(event){ 
            allgroupBoxDOMThrottle();//queryData(this.value)
            
        })

        function queryData(text){
            console.log("搜索：" + text);
        }
        
        //.$children[0].$sel.childNodes[0].childNodes[2].childNodes[3]
    },
    
    methods: {
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
            this.formValidate.date[0] = nowDay;
            this.formValidate.date[1] = defDay;

            this.formValidate.start_time  = nowDay;
        },
       
        
        formItemReset(){
            this.resetData(); //this.formValidate.date = [];
            this.formValidate.prj_type = "0";
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
            this.formValidate.prod_id = "";
            



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
            let _join = ";";
            if(this.formValidate.module){
                if(Array.isArray(this.formValidate.module)){
                    this.formValidate.modules.push(...this.formValidate.module)
                }else{
                    this.formValidate.modules.push(this.formValidate.module)
                }
                _modules = this.formValidate.modules
            }else{
                _modules = this.formValidate.modules
            }
            let _start_time = new Date(this.formValidate.start_time).Format("yyyy-MM-dd");
            let _end_time = this.formValidate.end_time ? new Date(this.formValidate.end_time).Format("yyyy-MM-dd") : this.formValidate.end_time;
            let tempData = {
                prj_type:this.formValidate.prj_type,
                prj_name: this.formValidate.prj_name,
                start_time:_start_time,
                end_time:_end_time,
                prj_desc: this.formValidate.prj_desc,
                prj_goal: this.formValidate.prj_goal,
                modules:_modules.join("<=>"),
                allgroup: this.formValidate.allgroup.join(_join),
                managerGroup: this.formValidate.managerGroup.join(_join),
                developerGroup: this.formValidate.developerGroup.join(_join),
                testerGroup: this.formValidate.testerGroup.join(_join),
                prod_id:this.formValidate.prod_id,


               

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
                console.log("<======agile add***response+++",response,myData,"+++agile add***response======>");
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