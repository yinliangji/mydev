<template>
	<div class="pageContent">
        <goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :Top="'5'" />
        <Card>
            <div class="productAddBox">

                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140" class="fromBox">
                    <h3 class="Title">编辑基本信息</h3>
                    <Row>
                        <Col span="12">
                            <FormItem label="所属产品" >
                                <span>xxxxx产品</span>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="所属项目" >
                                <span>xxxx项目</span>
                            </FormItem>
                        </Col>
                    </Row>


                    <FormItem label="用户故事名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="请填用户故事名称"></Input>
                    </FormItem>
                    <!-- <FormItem label="业务模块" prop="business">
                        <Select v-model="formValidate.business" multiple >
                            <Option v-for="item in businessList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem> -->

                    <FormItem label="故事类型" prop="style">
                        <Select v-model="formValidate.style" placeholder="请选择故事类型">
                            <Option value="用户需求">用户需求</Option>
                            <Option value="生产问题">生产问题</Option>
                            <Option value="自主创新">自主创新</Option>
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
                   
                    <FormItem label="状态" prop="status">
                        <RadioGroup v-model="formValidate.status">
                            <Radio label="提出">提出</Radio>
                            <Radio label="开发中">开发中</Radio>
                            <Radio label="测试">测试</Radio>
                            <Radio label="上线">上线</Radio>
                        </RadioGroup>
                    </FormItem>

                    <FormItem label="优先级" prop="grade">
                        <RadioGroup v-model="formValidate.grade">
                            <Radio label="1">高</Radio>
                            <Radio label="2">中</Radio>
                            <Radio label="3">低</Radio>
                           
                        </RadioGroup>
                    </FormItem>

                    <FormItem label="故事描述">
                        <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写故事描述"></Input>
                    </FormItem>


                    <h3 class="Title">编辑计划效率相关</h3>

                    <FormItem label="所属迭代" prop="iteration">
                        <Select v-model="formValidate.iteration" placeholder="请选所属迭代">
                            <Option value="迭代1">迭代1</Option>
                            <Option value="迭代2">迭代2</Option>
                            <Option value="迭代3">迭代3</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="工时(预计)" prop="manhour">
                        <Input v-model="formValidate.manhour" placeholder="请填写工时(预计)" number style="width: 120px"></Input> 小时
                    </FormItem>

                    <h3 class="Title">编辑需求相关</h3>

                    <FormItem label="所属需求" prop="demand">
                        <Select v-model="formValidate.demand" placeholder="请选择所属需求">
                            <Option value="需求1">需求1</Option>
                            <Option value="需求2">需求2</Option>
                            <Option value="需求3">需求3</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="用户故事提出人" prop="introducer">
                        <Select v-model="formValidate.introducer" placeholder="请选择用户故事提出人">
                            <Option value="提出人1">提出人1</Option>
                            <Option value="提出人2">提出人2</Option>
                            <Option value="提出人3">提出人3</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="提出人部门" prop="department">
                        <Input v-model="formValidate.department" placeholder="请填提出人部门"></Input>
                    </FormItem>

                    <!-- <Row>
                        <Col span="12">
                            
                        </Col>
                        <Col span="12">
                             
                        </Col>
                    </Row> -->

                    <FormItem>
                        <Button type="primary" :loading="modal_add_loading" @click="submitAdd">
                            <span v-if="!modal_add_loading">提交</span>
                            <span v-else>Loading...</span>
                        </Button>
                        <Button type="ghost" style="margin-left: 8px" @click="cancel">重填</Button>
                    </FormItem>
                </Form>
               
            </div>
        </Card>
    </div>
</template>
<script>
import Store from '@/vuex/store'
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
export default {
    beforecreated(){
        console.log("productAdd--beforecreated-------",this.addtest)
    },
    created(){
        console.log("productAdd--created-------",this.addtest)
    },
    beforeUpdate(){
        console.log("productAdd--beforeUpdate-------",this.addtest)
    },
    updated(){
        console.log("productAdd--updated-------",this.addtest)
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
                name: '',
                style:"",
                person:"",
                status:"",
                iteration:"",
                grade:"3",
                manhour:"",
                mission:"",
                business:[],
                demand:"",
                introducer:"",
                department:"",
                desc: '',






                mail: '',
                city: '',
                gender: '',
                interest: [],
                date: '',
                time: '',
                
            },
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
                name: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                ],
                department: [
                    { required: false, message: 'The name cannot be empty', trigger: 'blur' }
                ],

                style: [
                    { required: true, message: 'Please select the city', trigger: 'change' }
                ],
                demand: [
                    { required: true, message: 'Please select the city', trigger: 'change' }
                ],
                introducer: [
                    { required: false, message: 'Please select the city', trigger: 'change' }
                ],

                person: [
                    { required: true, message: 'Please select the city', trigger: 'change' }
                ],
                status: [
                    { required: true, message: 'Please select gender', trigger: 'change' }
                ],
                
                iteration: [
                    { required: false, message: 'Please select the city', trigger: 'change' }
                ],

                grade: [
                    { required: false, message: 'Please select gender', trigger: 'change' }
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
        }
    },
    methods:{
        editItem(I){
            //this.tableDataIndex = I;
            this.modaAdd = true;
            this.ADDorEDIT = false;
        },
        formItemReset(){

            this.formValidate.name='';
            this.formValidate.style="";
            this.formValidate.person="";
            this.formValidate.status="";
            this.formValidate.iteration="";
            this.formValidate.grade="3";
            this.formValidate.manhour="";
            this.formValidate.mission="";
            this.formValidate.mission=[];
            this.formValidate.demand="";
            this.formValidate.introducer="";
            this.formValidate.department="";
            this.formValidate.desc="";
            this.editTableData=false;
        },
        submitAddData(){
            let tempData = {
                name: this.formValidate.name,
                num: parseInt(Math.random()*100),
                describe: '产品需求',
                person:"谢蓓",
                status:this.formValidate.status,
                Iteration:this.formValidate.iteration,
                priority:this.formValidate.grade,
                manHours:"0 | "+this.formValidate.manhour,
                mission:this.formValidate.mission + " | 0",
                icon: require("@/assets/images/user_02.png"),

                
            }
            setTimeout(() => {
                this.modal_add_loading = false;
                // Store.dispatch('ADD_DATA_TEST/incrementAsync', {
                //     msg: tempData
                // })
                this.formItemReset();
                this.$refs.formValidate.resetFields();
                this.$router.push('/product');
            },1000)
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
            
        },
    },
}
</script>
<style lang="less" scoped>
.fromBox {
    width: 50%;
}
</style>