<template>
    <Modal ref="addPop" v-model="modaAdd" :title="ADDorEDIT?'添加':'编辑'" @on-ok="submitAdd"  ok-text="提交" :loading="modal_add_loading" @on-cancel="cancel" visible="true">
        <Form :model="formItem" :label-width="80" :rules="ruleValidate" ref="formValidate">
            <FormItem label="项目名称" prop="name">
                <Input v-model="formItem.name" placeholder="请输入项目名称"></Input>
            </FormItem>
        </Form>
    </Modal>
</template>
<script>
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
        console.log("beforeUpdate-------",this.editTableData)
    },
    updated(){
        console.log("updated-------",this.editTableData)
    },
    data () {
        return {
            modaAdd: false,
            modal_add_loading: true,
            ADDorEDIT:true,
            editTableData:false,
            formItem: {
                name:"",
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
        addItem(){
            this.modaAdd = true;
        },
        formItemReset(){
            this.formItem.name = "";
            this.editTableData = false;
        },
        submitAddData(){
            let tempData = {
                name: this.formItem.name,
                num: parseInt(Math.random()*100),
                percent:"0%",
            }
            setTimeout(() => {
                // if(this.ADDorEDIT){
                    
                // }
                this.$emit("tableDataAdd2",tempData)
                this.modaAdd = false;
                this.formItemReset();
                this.$refs.formValidate.resetFields();
                this.$emit("popClose2",true);
            },1000)
        },
        submitAdd () {
            this.$refs.formValidate.validate((valid)=>{//验证
                this.modal_add_loading = false;
                this.$nextTick(() => {
                  this.modal_add_loading = true;
                });
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
            this.formItemReset();
            this.$refs.formValidate.resetFields();
            this.$emit("popClose2",true)
        },
    },
}
</script>
<style lang="less" scoped>

</style>