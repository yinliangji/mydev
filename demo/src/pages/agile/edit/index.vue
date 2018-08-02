<template>
	<div class="pageContent">
        <goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :Top="'5'" />
        <Card>
            <div class="aglieAddBox">
                
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" class="fromBox">
					<h3 class="Title">编辑项目基本信息</h3>
                    <FormItem label="项目名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="请填写项目名称"></Input>
                    </FormItem>

                    <!-- <FormItem label="设置时间" prop="date">
                        <DatePicker :value="formValidate.date" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="选择开始和结束日期" v-model="formValidate.date" split-panels  style="width: 300px"></DatePicker>
                    </FormItem> -->

					<Row>
                        <Col span="12">
                            <FormItem label="开始时间" prop="startDate">
                        		<DatePicker placement="bottom-start" type="date" format="yyyy-MM-dd"  placeholder="选择开始日期"  :value="formValidate.startDate" v-model="formValidate.startDate"></DatePicker>
                    		</FormItem>
                        </Col>
                        <Col span="12">
                             <FormItem label="结束时间" prop="endDate">
                        		<DatePicker  placement="bottom-start" type="date" :options="options3" placeholder="选择结束日期" v-model="formValidate.endDate"></DatePicker>
                    		</FormItem>
                        </Col>
                    </Row>

                  
					<FormItem label="项目描述" prop="desc">
                        <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写项目描述"></Input>
                    </FormItem>


                    <FormItem label="项目目标" prop="target">
                        <Input v-model="formValidate.target" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写项目目标"></Input>
                    </FormItem>


                    <FormItem label="填写模块" prop="moudle">
                        <!-- <Input v-model="formValidate.moudle" placeholder="请填写模块名称"></Input> -->
                        <Tag v-for="item in formValidate.count" :key="item" :name="item" closable @on-close="handleClose">
                            {{ item}}
                        </Tag>
                        <Button icon="ios-plus-empty" type="dashed" size="small" @click="addItem">
                            添加模块
                        </Button>
                    </FormItem>

                    <FormItem label="模块选择" prop="business">
                        <Select v-model="formValidate.business" multiple >
                            <Option v-for="item in businessList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>

                    <!-- <FormItem label="技术模块" prop="technology">
                        <Select v-model="formValidate.technology" multiple >
                            <Option v-for="item in technologyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem> -->
					<h3 class="Title">编辑成员信息</h3>

					

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
            <Modal ref="addPop" v-model="modaAdd" title="添加模块" @on-ok="submitModule"  ok-text="提交" :loading="modal_add_loading" visible="true">
                <Form :model="formItem" :label-width="80" >
                    <FormItem label="模块名称">
                        <Input v-model="formItem.businessName" placeholder="请输入项目名称"></Input>
                    </FormItem>
                   
                </Form>
            </Modal>
        </Card>   
    </div>
</template>
<script>
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
        console.log("agileAdd--beforecreated-------",this.addtest)
    },
    created(){
        console.log("agileAdd--created-------",this.addtest)
    },
    beforeUpdate(){
        console.log("agileAdd--beforeUpdate-------",this.addtest)
    },
    updated(){
        console.log("agileAdd--updated-------",this.addtest)
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
                name: '',
                date:[],
                startDate: '',
                startTime: '',
                endDate: '',
                endTime: '',
                desc: '',
                manager:"", 
                developer:"", 
                tester:"", 
                maintainer:"", 
                target:"",
                technology: [],
                business:[],
                moudle:"",
                group:"",
                count:[],
                allgroup:[],
                managerGroup:[],
                developerGroup:[],
                testerGroup:[],
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
            businessList: [
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
                name: [
                    { required: true, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
                moudle: [
                    { required: false, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
                date: [
                    { required: true, type: 'array', validator: validateDate, trigger: ['blur','change'], }
                ],
                startDate: [
                    { required: false, type: 'date', message: 'Please select the date', trigger: ['blur','change'] }
                ],
                startTime: [
                    { required: false, type: 'string', message: 'Please select time', trigger: 'change' }
                ],
                endDate: [
                    { required: false, type: 'date', message: 'Please select the date', trigger: ['blur','change'] }
                ],
                endTime: [
                    { required: false, type: 'string', message: 'Please select time', trigger: 'change' }
                ],

                group: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],

                manager: [
                    { required: false, message: '请选择', trigger: 'change' }
                ],
                developer: [
                    { required: false, message: '请选择', trigger: 'change' }
                ],
                tester: [
                    { required: false, message: '请选择', trigger: 'change' }
                ],
                maintainer: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],


                desc: [
                    { required: false, message: 'Please enter a personal introduction', trigger: 'blur' },
                    //{ type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                ],
                target: [
                    { required: false, message: 'Please enter a personal introduction', trigger: 'blur' },
                    //{ type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                ],
                allgroup: [
                    { required: true, type: 'array',  message: '请选择内容，不能为空！', trigger: 'change' }
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

            this.formValidate.startDate  = nowDay;
        },
        addItem(){
            this.modaAdd = true;
            this.ADDorEDIT = true;
        },
        editItem(){
            this.$Message.config({
                top: 250,
                duration: 3
            });
            if(this.actionArr.length >1){
                this.error("只能选择一项，进行编辑！")
                return
            }else if(!this.actionArr.length){
                this.error("请选择一项，进行编辑！")
                return
            }
            this.modaAdd = true;
            this.ADDorEDIT = false;
        },
        formItemReset(){
            this.resetData(); //this.formValidate.date = [];
            this.editTableData = false;

            this.formValidate.date = [];
            this.formValidate.startDate = "";
            this.formValidate.startTime = "";
            this.formValidate.endDate = "";
            this.formValidate.endTime = "";
            this.formValidate.desc = "";
            this.formValidate.manager = "";
            this.formValidate.developer = "";
            this.formValidate.tester = "";
            this.formValidate.maintainer = "";
            this.formValidate.target = "";
            this.formValidate.technology = [];
            this.formValidate.business = [];
            this.formValidate.moudle = "";
            this.formValidate.group = "";
            this.formValidate.count = [];
            this.formValidate.allgroup = [];
            this.formValidate.managerGroup = [];
            this.formValidate.developerGroup = [];
            this.formValidate.testerGroup = [];

        },
        submitAddData(){
            let tempData = {
                name: this.formValidate.name,
                num: parseInt(Math.random()*100),
                describe: this.formValidate.desc,
                manager:this.formValidate.manager,
                // startTime:new Date(this.formValidate.date[0]).Format("yyyy-MM-dd"),
                // endTime:new Date(this.formValidate.date[1]).Format("yyyy-MM-dd"),
                // startTime:this.formValidate.startDate,
                // endTime:this.formValidate.endDate,


                startTime:new Date(this.formValidate.startDate).Format("yyyy-MM-dd"),
                endTime:new Date(this.formValidate.date[1]).Format("yyyy-MM-dd"),

                group:this.formValidate.group,
            }
           
          
            setTimeout(() => {
            	this.modal_add_loading = false;
          //   	Store.dispatch('ADD_DATA_TEST/incrementAsync', {
		        //     msg: tempData
		        // })
                this.formItemReset();
                this.$refs.formValidate.resetFields();
                this.$router.push('/agile');
                
                
                
            },1000)
        },
        submitAdd () {
            let IsStop = false;
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
            this.$emit("popClose",true)
        },
        handleClose (event, name) {
            const index = this.formValidate.count.indexOf(name);
            this.formValidate.count.splice(index, 1);
        },

        submitModule () {
            setTimeout(() => {
                this.formValidate.count.push(this.formItem.businessName)
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