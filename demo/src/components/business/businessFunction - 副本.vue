<template>
	<Modal  v-model="isShowChild" :title="title" @on-ok="submitAdd" @on-cancel="cancel" ok-text="提交">
		<Form :model="formValidate" :label-width="120" :rules="ruleValidate" ref="formValidate"   >
			<FormItem label="业务功能名称" prop="bfunc_name">
                <Input v-model="formValidate.bfunc_name" placeholder="请输入业务功能名称"></Input>
            </FormItem>
            <FormItem label="业务类型" >
                <Select v-model="formValidate.bfunc_type" clearable >
                    <Option v-for="(item,index) in typeList" :value="item.bfunc_type" :key="index">{{ item.bfunc_type_name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="所属逻辑子系统" prop="logic_sys_no">
                <Select v-model="formValidate.logic_sys_no" clearable filterable >
                    <Option v-for="(item,index) in logicList" :value="item.logic_sys_no" :key="index">{{ item.logic_sys_name }}</Option>
                </Select>
                <Button type="primary" @click="linkToNew">ITM新建逻辑子系统</Button>
            </FormItem>
            <FormItem label="业务功能描述">
                <Input v-model="formValidate.businessDes" type="textarea" :autosize="{minRows:2,maxRows:5}" placeholder="写点什么..."></Input>
            </FormItem>
		</Form>
	</Modal>
</template>
<script>
import Common from '@/Common';
const {reqAdd,reqGet,projectListDataNew } = Common.restUrl;
export default {
	props: {
		title: {
            type: String,
            default: function() {
                return "新增业务功能";
            }
        },

        typeList: {
            type: Array,
            default: function() {
                return [];
            }
        },
        statusList: {
            type: Array,
            default: function() {
                return [];
            }
        },
        logicList: {
            type: Array,
            default: function() {
                return [];
            }
        },

        isShow: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        formData: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        isAddOrEdit: {
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
            this.isShowChild = this.isShow;
        },
        formData(){
        	this.formValidate.bfunc_name = this.formData.bfunc_name;
        	this.formValidate.bfunc_type = this.formData.bfunc_type+"";
        	this.formValidate.logic_sys_no = this.formData.logic_sys_no;
        	this.formValidate.businessDes = this.formData.bfunc_desc;
            this.formValidate.bfunc_id = this.formData.bfunc_id;
            this.formValidate.who = this.formData.who;
        },
    },
    computed: {
    },
    data(){
    	return {
    		isShowChild:false,
    		formValidate:{
    			bfunc_id:"",
                bfunc_name:"",
    			logic_sys_no:"",
    			businessDes:"",
    			bfunc_type:"",
    			bfunc_status:"",
                who:"",
    		},
    		ruleValidate:{
    			bfunc_name:[
    				{ required: true, message: '请填写内容，不能为空', trigger: 'blur' }
    			],
    			bfunc_type:[
    				{ required: true, message: '请选择业务类型', trigger: 'change' }
    			],
    			bfunc_status:[
    				{ required: true, message: '请选择状态', trigger: 'change' }
    			],
    			logic_sys_no:[
    				{ required: true, message: '请选择逻辑子系统', trigger: 'change' }
    			],
    		}
    	}
    },
    methods:{
    	submitAdd(){
    		this.$refs.formValidate.validate((val)=>{
    			if(val){
    				if(this.isAddOrEdit){

		    			this.$emit('addBus')
		    		}else{
		    			this.$emit('editBus',this.formValidate)
		    		}
    			}else{
    				this.$Modal.error({
    					title:"提示",
    					content:"操作失败，请填写",
    				})
    			}

    		})
    		
    		this.$emit('changeisShow');
    	},
    	cancel(){
    		this.$emit('changeIsShow');
    		this.$refs.formValidate.resetFields();
    		this.formValidate.bfunc_type="";
    		this.formValidate.businessDes="";
    	},
    	linkToNew(){

    	},
    },
    created(){

    },
    mounted(){

    },
}
</script>
<style lang="less" scoped>

</style>