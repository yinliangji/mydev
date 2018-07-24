<template>
    <Modal ref="addPop" v-model="modaAdd" :title="ADDorEDIT?'添加':'编辑'" @on-ok="submitAdd" @on-cancel="cancel" ok-text="提交" :loading="modal_add_loading" width="600px">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">









            <FormItem label="产品待办事项名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请填写产品待办事项名称"></Input>
            </FormItem>
          
            


            <FormItem label="业务模块" prop="business">
                <Select v-model="formValidate.business" multiple >
                    <Option v-for="item in businessList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>


           


            <Row>
                <Col span="12">
                   <FormItem label="事项类型" prop="style">
                        <Select v-model="formValidate.style" placeholder="请选择事项类型">
                            <Option value="产品需求">产品需求</Option>
                            <Option value="事项类型1">事项类型1</Option>
                            <Option value="事项类型2">事项类型2</Option>
                        </Select>
                    </FormItem>
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
            </Row>  
           
            <FormItem label="状态" prop="status">
                <RadioGroup v-model="formValidate.status">
                    <Radio label="未开始">未开始</Radio>
                    <Radio label="处理中">处理中</Radio>
                    <Radio label="已完成">已完成 </Radio>
                    <Radio label="废弃">废弃</Radio>
                </RadioGroup>
            </FormItem>

            <FormItem label="优先级" prop="grade">
                <RadioGroup v-model="formValidate.grade">
                    <Radio label="1">高</Radio>
                    <Radio label="2">中</Radio>
                    <Radio label="3">低</Radio>
                   
                </RadioGroup>
            </FormItem>

            <Row>
                <Col span="12">
                    <FormItem label="所属迭代" prop="iteration">
                        <Select v-model="formValidate.iteration" placeholder="请选所属迭代">
                            <Option value="迭代1">迭代1</Option>
                            <Option value="迭代2">迭代2</Option>
                            <Option value="迭代3">迭代3</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                     <FormItem label="工时(预计)" prop="manhour">
                        <Input v-model="formValidate.manhour" placeholder="请填写工时(预计)" number style="width: 70px"></Input> 小时
                    </FormItem>
                </Col>
            </Row>


          <!--   <FormItem label="关联任务(全部)" prop="mission">
                <Input v-model="formValidate.mission" placeholder="请填写关联任务(全部)" number></Input>
            </FormItem> -->


        </Form>
    </Modal>
</template>
<script>
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



export default {
    props: {
        isShow: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        isAdd: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        tabDataRow: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        addLoading: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        }
    },
    watch:{
        isShow() {
            this.ADDorEDIT = this.isAdd;
            this.editTableData = this.tabDataRow;
            this.modaAdd = this.isShow;
        },
        
        
       
    },
    beforeUpdate(){
        console.log("beforeUpdate-------",this.editTableData,"this.isShow----",this.isShow)
    },
    updated(){
        console.log("updated-------",this.editTableData,"this.isShow----",this.isShow)
    },
    mounted(){
        
    },
    data() {
        return {
            modaAdd: false,
            ADDorEDIT:true,
            modal_add_loading: this.addLoading,
            editTableData:false,
            formValidate: {
                name: '',
                style:"",
                person:"",
                status:"未开始",
                iteration:"",
                grade:"3",
                manhour:"",
                mission:"",
                business:[],


                mail: '',
                city: '',
                gender: '',
                interest: [],
                date: '',
                time: '',
                desc: ''
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

                style: [
                    { required: true, message: 'Please select the city', trigger: 'change' }
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
                    { required: true, message: 'Please select gender', trigger: 'change' }
                ],
                manhour: [
                    { required: true,validator: validateNumber, trigger: 'blur' }
                
                    // { required: true, message: 'The name cannot be empty', trigger: 'blur' },
                    // { type: 'number', message: 'Incorrect email format', trigger: 'blur' }
                ],
                mission: [
                    {required: true, validator: validateNumber, trigger: 'blur' }
                ],


                
                


                // mail: [
                //     { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                //     { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                // ],
               
                // gender: [
                //     { required: true, message: 'Please select gender', trigger: 'change' }
                // ],
                // interest: [
                //     { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                //     { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                // ],
                // date: [
                //     { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                // ],
                // time: [
                //     { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                // ],
                // desc: [
                //     { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                //     { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                // ]
            },
            //
        }
    },
    methods:{
       
        editItem(I){
            //this.tableDataIndex = I;
            this.modaAdd = true;
            this.ADDorEDIT = false;



           


            // name: '项目名称3',
            // num: 24,
            // describe: '产品需求',
            // person:"谢呗3",
            // status:"未开始",
            // Iteration:"迭代3",
            // priority:"3",
            // manHours:"20 | 10",
            // correlation:"5 | 10",
            // icon: require("@/assets/images/user_02.png")

            // name: this.formValidate.name,
            // age: parseInt(Math.random()*100),
            // describe: '产品需求',
            // person:this.formValidate.person,
            // status:this.formValidate.status,
            // Iteration:this.formValidate.iteration,
            // priority:this.formValidate.grade,
            // manHours:"0 | "+this.formValidate.manhour,
            // correlation:"0 | 0",
            // icon: require("@/assets/images/user_02.png"),





        },
        formItemReset(){
            this.formValidate.name='';
            this.formValidate.style="";
            this.formValidate.person="";
            this.formValidate.status="";
            this.formValidate.iteration="";
            this.formValidate.grade="";
            this.formValidate.manhour="";
            this.editTableData=false;
        },
        submitAddData(){
            let tempData = {
                name: this.formValidate.name,
                num: parseInt(Math.random()*100),
                describe: '产品需求',
                person:this.formValidate.person,
                status:this.formValidate.status,
                Iteration:this.formValidate.iteration,
                priority:this.formValidate.grade,
                manHours:"0 | "+this.formValidate.manhour,
                mission:this.formValidate.mission + " | 0",
                icon: require("@/assets/images/user_02.png"),
            }
            setTimeout(() => {
                // if(this.ADDorEDIT){
                //     this.$emit("tableDataAdd",tempData)
                // }
                this.$emit("tableDataAdd",tempData)
                this.modaAdd = false;
                this.formItemReset();
                this.$refs.formValidate.resetFields();
                this.$emit("popClose",true);

            },1000)
        },
        submitAdd(){
            let IsStop = false;
            this.$refs.formValidate.validate((valid)=>{//验证
                this.modal_add_loading = false;
                this.$nextTick(() => {
                  this.modal_add_loading = true;
                });
                console.log(valid)
                if(valid){
                    this.modal_add_loading = true;
                    this.$nextTick(() => {
                      this.modal_add_loading = true;
                    });
                    this.submitAddData();
                }
            })
        },
        cancel(){
            this.formItemReset();
            this.$refs.formValidate.resetFields();
            this.$emit("popClose",true)
        },
    },
}
</script>
<style lang="less" scoped>

</style>