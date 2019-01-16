<template>
	<Modal  v-model="isShowChild" :title="title" @on-ok="submitAdd" @on-cancel="cancel" :ok-text="isView?'关闭': okText" :loading="busLoading">
		<Form :model="formValidate" :label-width="120" :rules="ruleValidate" ref="formValidate"   >
			<FormItem label="业务功能名称" prop="bfunc_name">
                <p v-if="isView">{{formValidate.bfunc_name}}</p>
                <Input v-else v-model="formValidate.bfunc_name" placeholder="请输入业务功能名称"></Input>
            </FormItem>
            <FormItem label="业务类型" >
                <p v-if="isView">{{formValidate.bfunc_type}}</p>
                <Select v-else v-model="formValidate.bfunc_type" :clearable="isClearable" :disabled="isDisabled" ><!-- //10-24修改 -->
                    <Option v-for="(item,index) in typeList" :value="item.bfunc_type" :key="index">{{ item.bfunc_type_name }}</Option>
                </Select>
            </FormItem>
            <Row>
                <Col span="16">
                    <FormItem label="所属逻辑子系统" prop="logic_sys_no">
                        <input id="demo" type="hidden" /><!-- 修改10-20 -->
                        <p v-if="isView">{{formValidate.logic_sys_no}}</p>
                        <Select ref="logicSelect" v-else v-model="formValidate.logic_sys_no" clearable filterable id="logicSelect"><!-- 修改10-20 -->
                            <Option v-for="(item,index) in logicList" :value="item.logic_sys_no" :key="index">{{ item.logic_sys_name }}</Option>
                        </Select>
                        
                    </FormItem>
                </Col>
                <Col span="1">&nbsp;</Col>
                <Col span="7">
                    <Button v-if="!isView" type="primary" @click="linkToNew">ITM新建逻辑子系统</Button>
                </Col>
            </Row>
            
            <FormItem label="业务功能描述">
                <p v-if="isView">{{formValidate.businessDes}}</p>
                <Input v-else v-model="formValidate.businessDes" type="textarea" :autosize="{minRows:2,maxRows:5}" placeholder="写点什么..."></Input>
            </FormItem>
            <FormItem label="上传附件">
                <Upload
                    multiple
                    :action="actionUrl"
                    name="file"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :show-upload-list="false"
                    class="UploadBtn"
                    >
                    <Button type="ghost" icon="ios-cloud-upload-outline">文件上传</Button>
                </Upload>
            </FormItem>
		</Form>
	</Modal>
</template>
<script>
import Common from '@/Common';
const {reqAdd,reqGet,projectListDataNew } = Common.restUrl;
export default {
	props: {
        okText: {//10-24修改
            type: [Boolean,String],
            default: function() {
                return '提交';
            }
        },
        isClearable: {//10-24修改
            type: Boolean,
            default: function() {
                return true;
            }
        },
        isDisabled: {//10-24修改
            type: Boolean,
            default: function() {
                return false;
            }
        },
        isView: {
            type: Boolean,
            default: function() {
                return false;
            }
        },
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
            /* //修改10-20
            setTimeout(()=>{
                if(this.isShow && this.isAddOrEdit){
                    this.creatResetFields();
                    this.$refs.logicSelect.clearSingleSelect();
                }
            },1)
            */
            setTimeout(()=>{
                if(this.isShow && !this.isAddOrEdit){
                    if(this.formValidate.logic_sys_no && document.getElementById("logicSelect")){
                        let obj = this.logicList.find((item)=>{
                            return item.logic_sys_no == this.formData.logic_sys_no 
                        })
                        let dom = document.getElementById("logicSelect").getElementsByClassName("ivu-select-dropdown")[0];//修改10-20
                        dom.setAttribute("hidden",true);//修改10-20
                        this.$refs.logicSelect.setQuery(obj.logic_sys_name);
                        setTimeout(()=>{
                            document.getElementById("demo").click();//修改10-20
                            setTimeout(()=>{
                                dom.removeAttribute("hidden");     
                            },500)
                        },1)
                        
                    }
                }
                
            },200)
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
            isFilterable:true,
            busLoading:true,
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
    		},
            //附件上传--开始
            actionUrl:"//jsonplaceholder.typicode.com/posts/",
            //附件上传--结束
            
    	}
    },
    methods:{
        //附件上传-start
        handleSuccess(){

        },
        handleError(){

        },
        //附件上传 -end
    	submitAdd(){
            if(this.isView){
                this.cancel();
                return;
            }
    		this.$refs.formValidate.validate((val)=>{
                this.busLoading = false;
                this.$nextTick(() => {
                  this.busLoading = true;
                });
    			if(val){
    				if(this.isAddOrEdit){
		    			this.$emit('addBus',this.formValidate)
		    		}else{
		    			this.$emit('editBus',this.formValidate)
		    		}
                    this.busLoading = true;
                    this.$nextTick(() => {
                      this.busLoading = true;
                    });

                    
                    this.$emit('changeIsShow');
                    //this.cancel();
    			}

    		})
    		
    		
    	},
    	cancel(){
            // this.formValidate.bfunc_id="";
            // this.formValidate.bfunc_name="";
            // this.formValidate.logic_sys_no="";
            // this.formValidate.bfunc_status="";
            // this.formValidate.who="";
    		//
    		this.formValidate.bfunc_type="";
    		this.formValidate.businessDes="";
            this.$refs.formValidate.resetFields();
            
            this.$emit('changeIsShow');
    	},
        resetFields(){
            this.$refs.formValidate.resetFields();
            this.$refs.logicSelect.clearSingleSelect();//修改10-20
        },
        creatResetFields(){
            this.formValidate.bfunc_name="";
            this.formValidate.logic_sys_no="";
            this.formValidate.bfunc_status="";
            this.formValidate.bfunc_type="";
            this.formValidate.businessDes="";
            //
            this.$refs.formValidate.resetFields();
            //
            
        },
    	linkToNew(){
            //this.creatResetFields();//修改10-20
    	},
    },
    mounted(){

    },
    beforecreated(){
        console.log("businessFunction--beforecreated-------",this.formValidate)
    },
    created(){
        console.log("businessFunction--created-------",this.formValidate)
    },
    beforeUpdate(){
        console.log("businessFunction--beforeUpdate-------",this.formValidate)
    },
    updated(){
        console.log("businessFunction--updated-------",this.formValidate)
    },
    
}
</script>
<style lang="less" scoped>

</style>