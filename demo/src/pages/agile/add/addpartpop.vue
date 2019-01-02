<template>
    <Modal ref="addPartPop" v-model="partAdd" :title="isInput?'添加小组':'添加角色'" @on-ok="submitPart('addPartPopBox')" @on-cancel="partCancel('addPartPopBox')"  ok-text="确定"  visible="true" :loading="formPartValidate.loading">
        <Form  :label-width="80" ref="addPartPopBox" :model="formPartValidate" :rules="rulePartValidate">
            <FormItem :label="isInput?'小组名称':'角色名称'" prop="partName">
                <!-- <Input v-model="formPartValidate.partName" placeholder="请输入角色名称（最多四个字）" :maxlength="8" v-if="!formPartValidate.addGroupList.length"></Input> -->
                <Input v-model="formPartValidate.partName" placeholder="请输入角色名称（最多八个字）" :maxlength="8" v-if="isInput"></Input>
                <Select v-model="formPartValidate.partName" placeholder="请选择角色" v-else>
                    <Option v-for="(item,index) in formPartValidate.addGroupList" :value="item.value" :key="index">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <p>若下拉列表中没有合适的角色，请联系我们 <span style="color:red;">010-63314458</span> 帮您提供更多新的角色。</p>
        </Form>
    </Modal>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';

export default {
    name: 'addpartpop',
    props: {
        isShow: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        data: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return [];
            }
        },
        items: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return [];
            }
        },
        isInput: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
    },
    watch:{
        isShow() {
            this.partAdd = this.isShow;
            if(this.isShow){
                
            }
        },
        data(){
            this.formPartValidate.addGroupList = this.data;
        },
        items(){
            this.formValidate.AddGroupList = this.items;
        },
        
    },

    beforeUpdate(){
        console.log("beforeUpdate---添加角色弹出框----",this.formPartValidate,this.partAdd)
    },
    updated(){
        console.log("updated----添加角色弹出框---",this.formPartValidate,this.partAdd)
    },
    data () {
        const validatePart = (rule, value, callback) => {
            if(!value){
                return callback(new Error('内容不能为空！'));    
            }else{
                if(this.formValidate.AddGroupList.length){
                    for(var i=0;i<this.formValidate.AddGroupList.length;i++){
                        if(this.formValidate.AddGroupList[i].myValue == (value+"")){
                            return callback(new Error('内容重复！')); 
                        }
                    }
                    callback()
                }else{
                    callback()
                }
            }
        };
        return {
            partAdd:false,
            formValidate: {
                AddGroupList:[],
            },
            
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
        }
    },
    mounted(){
        
    },
    methods: {
        submitPart(name){
            this.$refs[name].validate((valid) => {
                this.formPartValidate.loading = false;
                this.$nextTick(() => {
                  this.formPartValidate.loading = true;
                });
                if (valid) {
                    this.formPartValidate.loading = true;
                    this.$nextTick(() => {
                        this.formPartValidate.loading = true;
                    });
                    this.$emit("sendAddPartPop",name,this.formPartValidate.partName);
                    this.formPartValidate.partName = "";
                    this.$refs.addPartPopBox.resetFields();
                }
            })
            
        },
        partCancel(name){
            this.formPartValidate.partName = "";
            this.$refs.addPartPopBox.resetFields();
            this.$emit("closeAddPartPop",false);
            
        },
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
    }

}
</script>
<style lang="less" scoped>

</style>