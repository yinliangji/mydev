<template>
	<div class="pageContent">
        <goAgile :go="'/product'" :text="'返回用户故事列表'" :TOP="'5'" />
        <Card>
            <div class="productAddBox">

                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140" >
                    <h3 class="Title"><span>基本信息</span></h3>
                    <div class="fromBox">
                       
                    <FormItem label="所属产品" >
                        <span>{{formValidate.product_name}}</span>
                    </FormItem>
              
                    <FormItem label="所属项目" >
                        <span>{{formValidate.prj_name}}</span>
                    </FormItem>

                    <FormItem label="责任人" >
                        <span>{{formValidate.charger}}</span>
                    </FormItem>
                           


                        <FormItem label="用户故事名称" prop="userstory_name">
                            <Input v-model="formValidate.userstory_name" placeholder="请填用户故事名称"></Input>
                        </FormItem>
                        <!-- <FormItem label="业务模块" prop="business">
                            <Select v-model="formValidate.business" multiple >
                                <Option v-for="item in businessList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem> -->

                        <FormItem label="故事类型" prop="userstory_type">
                            <Select v-model="formValidate.userstory_type" placeholder="请选择事项类型">
                                <Option v-for="(item,index) in userstory_typeList" :key="index" :value="item.value">{{item.label}}</Option>
                                <!-- <Option value="1">用户需求</Option>
                                <Option value="2">生产问题</Option>
                                <Option value="3">自主创新</Option> -->
                            </Select>
                        </FormItem>

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
                       
                        <FormItem label="状态" prop="userstory_status">
                            <RadioGroup v-model="formValidate.userstory_status">
                                <Radio v-for="(item,index) in userstory_statusList" :key="index" :label="item.value">{{item.label}}</Radio>
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
                            <Input v-model="formValidate.userstory_desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写故事描述"></Input>
                        </FormItem>
                    </div>


                    <h3 class="Title"><span>计划效率相关</span></h3>
                    <div class="fromBox">
                        <FormItem label="所属迭代" prop="sprint">
                            <Select clearable v-model="formValidate.sprint" placeholder="请选所属迭代">
                                <!-- <Option value="迭代1">迭代1</Option>
                                <Option value="迭代2">迭代2</Option>
                                <Option value="迭代3">迭代3</Option> -->
                                <Option v-for="(item , index) in sprintList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </FormItem>

                        <FormItem label="工时(预计)" prop="manhour">
                            <Input v-model="formValidate.manhour" placeholder="请填写工时(预计)" number style="width: 120px"></Input> 小时
                        </FormItem>
                    </div>

                    <h3 class="Title"><span>需求相关</span></h3>

                    <div class="fromBox">
                        <FormItem label="所属需求" prop="req_id">
                            <Select v-model="formValidate.req_id" placeholder="请选择所属需求">
                                <Option v-for="(item , index) in req_idList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </FormItem>


                        
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
    </div>
</template>
<script>
import Store from '@/vuex/store'


import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {storyAdd,storyGetSprint,storyGetReq,storyGetCondition,publishUser } = Common.restUrl;

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
        console.log("productAdd--beforecreated-------",this.formValidate,this.proiList,this.userstory_typeList,this.userstory_statusList)
    },
    created(){
        console.log("productAdd--created-------",this.formValidate,this.proiList,this.userstory_typeList,this.userstory_statusList)
    },
    beforeUpdate(){
        console.log("productAdd--beforeUpdate-------",this.formValidate,this.proiList,this.userstory_typeList,this.userstory_statusList)
    },
    updated(){
        console.log("productAdd--updated-------",this.formValidate,this.proiList,this.userstory_typeList,this.userstory_statusList)
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
                userstory_name: '',
                userstory_type:"",
                userstory_status:"1",
                proi:"3",
                userstory_desc: '',
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






                person:"",
                
                
                
                
                mission:"",
                business:[],
                
                introducer:"",
                department:"",
                






                mail: '',
                city: '',
                gender: '',
                interest: [],
                date: '',
                time: '',
                
            },
            req_idList:[
                // {
                //     value: 'New York',
                //     label: '业务模块1'
                // },
               
            ],
            sprintList:[
                // {
                //     value: 'New York',
                //     label: '业务模块1'
                // },
            ],

            businessList: [
                {
                    value: 'New York',
                    label: '业务模块1'
                },
                {
                    value: 'London',
                    label: '业务模块2'
                },
                {
                    value: 'Sydney',
                    label: '业务模块3'
                },
               
            ],
            ruleValidate: {
                userstory_name: [
                    { required: true, message: '请填写，不能为空', trigger: 'blur' }
                ],
                department: [
                    { required: false, message: '请填写，不能为空', trigger: 'blur' }
                ],

                userstory_type: [
                    { required: true, message: '请选择 ', trigger: 'change' }
                ],
                req_id: [
                    { required: true, message: '请选择 ', trigger: 'change' }
                ],
                introducer: [
                    { required: false, message: '请选择 ', trigger: 'change' }
                ],

                person: [
                    { required: true, message: '请选择 ', trigger: 'change' }
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

        }
    },
    mounted(){
        let ID = Common.GETID(this,Common);
        let prj_ID = Common.GETprjid(this,Common);
        let prod_ID = Common.GETprodid(this,Common);

        



        if(prj_ID && prod_ID && ID){
            this.formValidate.prj_id = prj_ID;
            this.formValidate.prod_id = prod_ID;
            this.formValidate.id = ID;

            this.getStoryAddFn(storyAdd,ID,ID,prod_ID);
            this.storyGetSprintFn(storyGetSprint,ID,ID,prod_ID)
            this.storyGetReqFn(storyGetReq,ID,ID,prod_ID)



            this.storyGetConditionFn(storyGetCondition,"userstory_type",ID);
            //this.storyGetConditionFn(storyGetCondition,"userstory_status",ID);
            //this.storyGetConditionFn(storyGetCondition,"proi",ID);


            this.publishUserFn(publishUser);

            



        }else{
            this.$router.push('/agile');
        }
    },
    methods:{


        publishUserFn(URL,params = {}){
            Common.PublishUser(defaultAXIOS,this,URL,params)
        },

        storyGetConditionFn(URL,condition,prj_id){
            return Common.GetConditionAll(defaultAXIOS,this,URL,"xxxxx",prj_id,["userstory_type","userstory_status","proi"]);
            //Common.GetCondition(defaultAXIOS,this,URL,condition,prj_id);
        },
        storyGetReqFn(URL = "",id,prj_id,prod_id){
            defaultAXIOS(URL,{id,prj_id,prod_id},{timeout:20000,method:'get'}).then((response) => {
                //alert(JSON.stringify(response))
                let myData = response.data;
                console.log("<======product get storyGetReq***response+++",response,myData,"======>");


                
                if(myData.data && myData.data.length){
                     //value: 'New York',
                //     label: '业务模块1'
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
            defaultAXIOS(URL,{id,prj_id,prod_id},{timeout:20000,method:'get'}).then((response) => {
                //alert(JSON.stringify(response))
                let myData = response.data;
                console.log("<======product get sprintlist***response+++",response,myData,"======>");


                
                if(myData.sprintlist && myData.sprintlist.length){
                     //value: 'New York',
                //     label: '业务模块1'
                    let _tempObj = {};
                    for(let i=0;i<myData.sprintlist.length;i++){
                        _tempObj.value = myData.sprintlist[i].sp_id+"";
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
        getStoryAddFn(URL = "",id,prj_id,prod_id){
            defaultAXIOS(URL,{id,prj_id,prod_id},{timeout:20000,method:'get'}).then((response) => {
                //alert(JSON.stringify(response))
                let myData = response.data;
                console.log("<======product get***response+++",response,myData,"======>");

                
                let _data = Array.isArray(myData) ? myData[0] : myData
                
                if(_data.status == "success"){
                    this.formValidate.prj_name = _data.prj_name;
                    this.formValidate.product_name = _data.product_name;
                }else{
                    this.showError(myData);
                }
                
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
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
            this.formValidate.req_id="";
            this.formValidate.req_name="";

            




            this.formValidate.person="";
            
            
            
            
            this.formValidate.mission=[];
            
            this.formValidate.introducer="";
            this.formValidate.department="";
            
            this.editTableData=false;
        },
        submitAddData(){
            let tempData = {
                userstory_name: this.formValidate.userstory_name,
                userstory_type: this.formValidate.userstory_type,
                userstory_status:this.formValidate.userstory_status,
                "proi": this.formValidate.proi,
                "userstory_desc":this.formValidate.userstory_desc,
                sprint:this.formValidate.sprint,
                manHours:this.formValidate.manhour,
                mission:this.formValidate.mission + " | 0",
                icon: "/assets/images/user_02.png",
                id:this.formValidate.id,
                prj_id:this.formValidate.prj_id,
                prod_id:this.formValidate.prod_id,
                product_name:this.formValidate.product_name,
                prj_name:this.formValidate.prj_name,
                req_id:this.formValidate.req_id,
                req_name:this.formValidate.req_name,
                charger:this.formValidate.nick_name,//一对
                nick_name:this.formValidate.charger,//一对
                


                //num: parseInt(Math.random()*100),
                // priority:this.formValidate.grade,
                // icon: require("@/assets/images/user_02.png"),
                // person:"谢蓓",

                
            }
            
            defaultAXIOS(storyAdd,tempData,{timeout:20000,method:'post'}).then((response) => {
                //alert(JSON.stringify(response))
                let myData = response.data;
                console.log("<======product add***response+++",response,myData,"======>");
                if(myData.status = "success"){
                    this.modal_add_loading = false;
                    this.formItemReset();
                    this.$refs.formValidate.resetFields();
                    this.$router.push('/product');
                }else{
                    this.modal_add_loading = false;
                    this.showError(myData.status);
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
                }
            })
        },
        cancel(){
            this.formItemReset();
            this.$refs.formValidate.resetFields();
            this.$router.push('/product');
            
        },
    },
}
</script>
<style lang="less" scoped>
.fromBox {
    width: 50%;
}
</style>