<template>
    <Modal ref="addPop" v-model="modaAdd" :title="ADDorEDIT?'添加':'编辑'" @on-ok="submitAdd" @on-cancel="cancel" ok-text="提交" :loading="modal_add_loading" >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="项目名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请填写项目名称"></Input>
            </FormItem>

            <FormItem label="技术模块" prop="technology">
                <Select v-model="formValidate.technology" multiple >
                    <Option v-for="item in technologyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>

            <FormItem label="业务模块" prop="business">
                <Select v-model="formValidate.business" multiple >
                    <Option v-for="item in businessList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>

            

            <FormItem label="项目经理" prop="manager">
                <Select v-model="formValidate.manager" placeholder="请选择项目经理">
                    <Option value="经理1">经理1</Option>
                    <Option value="经理2">经理2</Option>
                    <Option value="经理3">经理3</Option>
                </Select>
            </FormItem>


            <FormItem label="开发人员" prop="developer">
                <Select v-model="formValidate.developer" placeholder="请选择开发人员">
                    <Option value="开发人员1">开发人员1</Option>
                    <Option value="开发人员2">开发人员2</Option>
                    <Option value="开发人员3">开发人员3</Option>
                </Select>
            </FormItem>

            <FormItem label="测试人员" prop="tester">
                <Select v-model="formValidate.tester" placeholder="请选择测试人员">
                    <Option value="测试人员1">测试人员1</Option>
                    <Option value="测试人员2">测试人员2</Option>
                    <Option value="测试人员3">测试人员13</Option>
                </Select>
            </FormItem>

            <FormItem label="维护人员" prop="maintainer">
                <Select v-model="formValidate.maintainer" placeholder="请选择维护人员">
                    <Option value="维护人员1">测试人员1</Option>
                    <Option value="维护人员2">测试人员2</Option>
                    <Option value="维护人员3">测试人员13</Option>
                </Select>
            </FormItem>



            <FormItem label="设置时间" prop="date">
                <DatePicker :value="formValidate.date" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="选择开始和结束日期" v-model="formValidate.date" split-panels  style="width: 300px"></DatePicker>
            </FormItem>
            <FormItem label="项目描述" prop="desc">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写项目描述"></Input>
            </FormItem>

            <FormItem label="项目目标" prop="target">
                <Input v-model="formValidate.target" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写项目目标"></Input>
            </FormItem>


        </Form>
    </Modal>
</template>
<script>
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





    data () {
        return {
            nowDate:"",
            defDate:"",
            formValidate: {
                name: '',
                date:[],
                startDate: '',
                startTime: '',
                desc: '',
                manager:"", 
                developer:"", 
                tester:"", 
                maintainer:"", 
                target:"",
                technology: [],
                business:[],
            },
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
                    label: '业务模块2'
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
                date: [
                    { required: true, type: 'array', validator: validateDate, trigger: ['blur','change'], }
                ],
                startDate: [
                    { required: true, type: 'date', message: 'Please select the date', trigger: ['blur','change'] }
                ],
                startTime: [
                    { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                ],

                manager: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                developer: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                tester: [
                    { required: true, message: '请选择', trigger: 'change' }
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
                ]
            },
            modaAdd: false,
            ADDorEDIT:true,
            modal_add_loading: this.addLoading,
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
            this.formValidate.name = "";
            this.resetData(); //this.formValidate.date = [];
            this.formValidate.desc = "";
        },
        submitAddData(){
            let tempData = {
                name: this.formValidate.name,
                num: parseInt(Math.random()*100),
                describe: this.formValidate.desc,
                startTime:new Date(this.formValidate.date[0]).Format("yyyy-MM-dd"),
                endTime:new Date(this.formValidate.date[1]).Format("yyyy-MM-dd"),
            }
            // let tempData = {
            //     name: this.formValidate.name,
            //     num: parseInt(Math.random()*100),
            //     describe: this.formValidate.desc,
            //     startTime:JSON.stringify(this.formValidate.date[0]).split("T")[0].substring(1),
            //     endTime:JSON.stringify(this.formValidate.date[1]).split("T")[0].substring(1),
            // }
            // 
          
            setTimeout(() => {
                if(this.ADDorEDIT){
                    this.$emit("tableDataAdd",tempData)
                }
                this.modaAdd = false;
                this.formItemReset();
                this.$refs.formValidate.resetFields();
                this.$emit("popClose",true);
            },1000)
        },
        submitAdd () {
            let IsStop = false;
            this.$refs.formValidate.validate((valid)=>{//验证
                this.modal_add_loading = false;
                this.$nextTick(() => {
                  this.modal_add_loading = true;
                });
                //IsStop = !valid;
                if(valid){
                    this.modal_add_loading = true;
                    this.$nextTick(() => {
                      this.modal_add_loading = true;
                    });
                    this.submitAddData();
                }
            })
        },
        cancel () {
            //this.$Message.info('取消');
            this.formItemReset();
            this.$refs.formValidate.resetFields();
            this.$emit("popClose",true)
        },
    }

}
</script>
<style lang="less" scoped>

</style>