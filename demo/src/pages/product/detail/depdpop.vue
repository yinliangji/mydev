<template>
    <Modal ref="busPop" v-model="modaAdd" title="业务浏览" @on-ok="ok" @on-cancel="cancel" ok-text="关闭" :loading="modal_add_loading" width="800px">
        <!-- -->
        <div class="productAddBox" id="depdPopBox">
                
            <Form  :label-width="120">
                <!-- <FormItem label="项目名称编号" >
                    <p >{{formValidate.prj_id}}</p>
                </FormItem> -->
                
                <FormItem label="依赖项名称" >
                    <p >{{formValidate.depd_name}}</p>
                </FormItem>
                <!-- <FormItem label="依赖项ID" >
                    <p >{{formValidate.id}}</p>
                </FormItem>
                <FormItem label="依赖项编号" >
                    <p >{{formValidate.depd_id}}</p>
                </FormItem> -->
                <FormItem label="依赖项类型" >
                    <p >{{formValidate.depd_main_type}}</p>
                </FormItem>
                
                <FormItem label="依赖项状态">
                    <p >{{formValidate.depd_status}}</p>
                </FormItem>

                <FormItem label="依赖项描述">
                    <p >{{formValidate.depd_desc}}</p>
                </FormItem>

                <FormItem label="依赖项创建人" >
                    <p >{{formValidate.created_user_username}}</p>
                </FormItem>
                
                <FormItem label="依赖项创建时间" >
                    <p >{{formValidate.create_time}}</p>
                </FormItem>
                
                <FormItem label="依赖项修改时间" >
                    <p >{{formValidate.modified_time}}</p>
                </FormItem>
                <FormItem label="依赖项修改人" >
                    <p >{{formValidate.modified_user_username}}</p>
                </FormItem>
                <FormItem label="依赖项关联编号" >
                    <p >{{formValidate.depd_sn}}</p>
                </FormItem>
                
                
            </Form>
        </div>
        <!-- -->
    </Modal>
</template>
<script>

import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {} = Common.restUrl;



export default {
    props: {
        isShow: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        isLoading: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        data: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        
    },
    watch:{
        isShow() {
            this.modaAdd = this.isShow;
        },
        data(){
            this.formValidate.depd_name = this.data.depd_name;
            this.formValidate.depd_id = this.data.depd_id;
            this.formValidate.depd_main_type = Common.DepdTypeFn(this.data.depd_main_type);
            this.formValidate.depd_status = Common.DepdStatusFn(this.data.depd_status);
            this.formValidate.depd_desc = this.data.depd_desc;
            this.formValidate.create_time = this.data.create_time;
            this.formValidate.created_user_username = this.data.created_user_username;
            this.formValidate.modified_time = this.data.modified_time;
            this.formValidate.modified_user_username = this.data.modified_user_username;
            this.formValidate.depd_sn = this.data.depd_sn;
            this.formValidate.id = this.data.id;
            this.formValidate.prj_id = this.data.prj_id;
        },
    },
    beforecreated(){
        console.log("beforecreated----业务查看弹出---",this.formValidate)
    },
    created(){
        console.log("created----业务查看弹出---",this.formValidate)
    },
    beforeUpdate(){
        console.log("beforeUpdate---业务查看弹出----",this.formValidate)
    },
    updated(){
        console.log("updated----业务查看弹出---",this.formValidate)
    },
    mounted(){
        
    },
    data() {
        return {
            modaAdd: false,
            modal_add_loading: this.isLoading,
            formValidate:{
                depd_name:"",
                depd_id:"",
                depd_main_type:"",
                depd_status:"",
                depd_desc:"",
                create_time:"",
                created_user_username:"",
                modified_time:"",
                modified_user_username:"",
                depd_sn:"",
                id:"",
                prj_id:"",
            },
        }
    },
    methods:{
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
        ok(){
            this.modal_add_loading = false;
            this.$nextTick(() => {
              this.modal_add_loading = true;
            });
                
            this.modal_add_loading = true;
            this.$nextTick(() => {
              this.modal_add_loading = true;
            });
            this.$emit("buspopClose",false)
        },
        cancel(){
            this.$emit("buspopClose",false)
        },
    },
}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';
.pageBox {
    padding-bottom:0px;
    padding-top:10px;
    overflow: hidden;
}

</style>
<style>
.stepBox img {
    max-width: 100%;
    display: block;
}
#depdPopBox .ivu-form-item {
    margin-bottom: 10px;
}
</style>