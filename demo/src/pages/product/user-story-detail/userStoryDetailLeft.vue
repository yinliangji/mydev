<template>
    <div>
    	<Form 
    		id="leftform"
    		class="leftform" 
    		ref="formValidate" 
    		:model="formValidate" 
    		:rules="ruleValidate" 
    		:label-width="104" 
    		>
    		<FormItem label="故事名称" prop="userstory_name">
                <span v-show="!IsEditDetail">
                    {{formValidate.userstory_name}}
                </span>
                <Input
                    v-show="IsEditDetail" 
                    v-model="formValidate.userstory_name" 
                    placeholder="请填用户故事名称" 
                />

            </FormItem>
            <FormItem label="故事描述">
                <span v-show="!IsEditDetail">
                    <pre>{{formValidate.userstory_desc}}</pre>
                </span>
                <Input 
                    v-show="IsEditDetail" 
                    v-model="formValidate.userstory_desc" 
                    type="textarea" 
                    :autosize="{minRows: 5,maxRows: 10}" 
                    placeholder="请填写故事描述"
                    >
                </Input>
            </FormItem>
            <FormItem label="验收标准">
                <span v-show="!IsEditDetail">
                    <pre>{{formValidate.us_accept}}</pre>
                </span>
                <Input 
                    v-show="IsEditDetail" 
                    v-model="formValidate.us_accept" 
                    type="textarea" 
                    :autosize="{minRows: 5,maxRows: 10}" 
                    placeholder="请填写验收标准"
                    >
                </Input>
            </FormItem>
    	</Form>
    </div>
</template>
<script>
import Store from '@/vuex/store'
import Depend from '@/pages/product/add/depend'
import Assist from '@/pages/product/add/assist'
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {} = Common.restUrl;
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
};
export default {
	props: {
        IsEditDetail: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        Data: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        PrjPermission:{
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return [];
            }
        },
        Identity:{
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return "";
            }
        },
    },
    watch:{
        IsEditDetail(data){
        },
        Data(data){
        	if(data){
        		this.init(data)
        	}
        },
        PrjPermission(data){
            this.prj_permission = data;
        },
        Identity(data){
            this.identity = data;
        },
    },
    data () {
        return {
            modaAdd: false,
            ADDorEDIT:true,
            modal_add_loading: false,
            editTableData:false,
            formValidate: {
                userstory_id:"",
                userstory_name: "",
                userstory_type:"",
                userstory_status:"",
                proi:"",
                userstory_desc:"",
                sprint:"",
                prj_name:"",
                product_name:"",
                id:"",
                prj_id:"",
                prod_id:"",
                req_id:"",
                req_name:"",
                manHours:"",

                charger:"",//一对
                nick_name:"",//一对

                AddGroupList: [], //搜索查询
                bfunc: [], //弹出业务窗口

                us_accept:"",
                
            },
            req_idList:[
                
            ],
            sprintList:[
               
            ],
            businessList: [
            ],
            ruleValidate: {
                userstory_name: [
                    { required: true, message: '内容不能为空', trigger: 'blur' }
                ],
                department: [
                    { required: false, message: '内容不能为空', trigger: 'blur' }
                ],

                userstory_type: [
                    { required: true, message: '内容不能为空', trigger: 'change' }
                ],
                req_id: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                introducer: [
                    { required: false, message: '内容不能为空', trigger: 'change' }
                ],

                person: [
                    { required: true, message: '内容不能为空', trigger: 'change' }
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
                manHours: [
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
            NewStatusList:[
            ],

            chargerList:[],
            //查询搜索开始
            inputLoad:false,
            isPopsAdd:false,
            popsItem:false,
            //查询搜索结束
            //穿梭开始
            toLeftData:false,
            //穿梭结束
            
            //依赖开始
            dependList:[],
            depd_sn:"",
            dependonoff:false,
            //依赖结束
            //协助人开始
            assistList:[],
            assistonoff:false,
            //协助人结束
            

            prj_permission:[],
            identity:"",
            //检测id是否在projectListDataNew列表里
            GO:false,
            GOText:"",
        }
    },
    mounted(){
        if(this.Data){
            this.init(data)
        }
    },
    methods: {
    	init(data){
    		console.error("左侧 init",data);
    		let ID = Common.GETID(this,Common)
    		for (let i in this.formValidate){
                if(i == "manhour" || i == "manhour" || i == "manHour" || i == "manHours"){
                }else if(i == "AddGroupList" || i == "bfunc"){
                }else if(i == "depd_list"){
                }else if(i == "assist_list"){
                }else{
                    this.formValidate[i] = (data[i] || "")+"";
                }
            }
            
    	},
    }
}
</script>
<style>
.leftform {
	padding-right: 30px;
}
#leftform .ivu-form-item{

}
</style>
