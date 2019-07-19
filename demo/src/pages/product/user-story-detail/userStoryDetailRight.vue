<template>
	<div>
	    <Form 
	    	id="rightform"
	    	ref="formValidate" 
	    	:model="formValidate" 
	    	:rules="ruleValidate" 
	    	:label-width="100" 
	    	class="rightform" 
	    	>
	    	<FormItem label="所属项目" >
	            <span>{{formValidate.prj_name}}</span>
	        </FormItem>
	        
	        <FormItem label="故事类型" prop="userstory_type">
	            <Select v-model="formValidate.userstory_type" placeholder="请选择故事类型">
	                <Option v-for="(item,index) in userstory_typeList" :key="index" :value="item.value">{{item.label}}</Option>
	            </Select>
	        </FormItem>
	        <FormItem label="所属迭代" prop="sprint">
	            <Select clearable v-model="formValidate.sprint" placeholder="请选所属迭代">
	                <Option v-for="(item , index) in sprintList" :value="item.value" :key="index">{{ item.label }}</Option>
	            </Select>
	            <ToolTip content="计划在哪个迭代周期内完成此用户故事" />
	        </FormItem>
	        <FormItem label="所属需求项" prop="req_id">
	            <Select filterable clearable v-model="formValidate.req_id" placeholder="请选择所属需求项">
	                <Option v-for="(item , index) in req_idList" :value="item.value" :key="index">{{ item.label }}</Option>
	            </Select>
	            <ToolTip :W="135" content="此用户故事来源的需求项" />
	        </FormItem>
	        <FormItem label="责任人" >
	            <Select filterable clearable v-model="formValidate.charger" placeholder="请选择责任人">
	                <Option v-for="(item,index) in chargerList" :key="index" :value="item.value">{{item.label}}</Option>
	            </Select>
	        </FormItem>
	        <FormItem label="责任协助人" >
	            <span style="position: relative;">
	                <Tag 
	                    v-for="(item,index) in assistList"
	                    :value="index" 
	                    :key="index" 
	                    :name="index" 
	                    closable 
	                    @on-close="assistDel">
	                    {{ item.label}}
	                </Tag>
	                <Button 
	                    icon="ios-add" 
	                    type="dashed" 
	                    size="small" 
	                    @click="addAssist">
	                    添加责任协助人
	                </Button>
	                
	            </span>
	        </FormItem>
	        <FormItem label="优先级" prop="proi">
	            <RadioGroup v-model="formValidate.proi">
	                <Radio v-for="(item,index) in proiList" :key="index" :label="item.value" >{{item.label}}</Radio>
	            </RadioGroup>
	        </FormItem>
	        <FormItem label="用户故事点数" prop="manHours">
                <Input v-model="formValidate.manHours" placeholder="请填写用户故事点数" number ></Input>
                <ToolTip content="统计用户故事的工时(2人/天 表示2个点)" />
            </FormItem>
	        <FormItem label="状态" prop="userstory_status" id="myUserstoryStatus" v-show="false">
	            <RadioGroup v-model="formValidate.userstory_status">
	                <Radio :disabled="item.value == formValidate.userstory_status ? false : true" v-for="(item,index) in userstory_statusList" :key="index" :label="item.value">{{item.label}}</Radio>
	            </RadioGroup>
	        </FormItem>
	    </Form>
	    <Depend 
            :prjName="formValidate.prj_name" 
            :DependOnOff="dependonoff" 
            @sendDepend="receiveDepend" 
            @sendCloseDepend="receiveCloseDepend" 
        />
        <Assist 
            :Data="myAssistList"
            :List="myList"
            :AssistOnOff="assistonoff" 
            @sendAssist="receiveAssist" 
            @sendCloseAssist="receiveCloseAssist" 
        />
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


        UserstoryTypeList:{
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return [];
            }
        },
        UserstoryStatusList:{
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return [];
            }
        },
        ReqIdList:{
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return [];
            }
        },
        ProiList:{
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return [];
            }
        },
        ChargerList:{
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return [];
            }
        },
        SprintList:{
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return [];
            }
        },
        groupNameList:{
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return [];
            }
        },
        userstoryCategoryList:{
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return [];
            }
        },
    },
    watch:{
        Data(data){
        	if(data){
        		this.init(data)
        	}
        },
        PrjPermission(data){
            console.error("PrjPermission",data)
            this.prj_permission = data;
        },
        Identity(data){
            console.error("Identity",data)
            this.identity = data;
        },
        UserstoryTypeList(data){
            console.error("UserstoryTypeList",data)
            this.userstory_typeList = data;
        },
        UserstoryStatusList(data){
            console.error("UserstoryStatusList",data)
            this.userstory_statusList = data;
        },
        ReqIdList(data){
            console.error("ReqIdList",data);
            this.req_idList = data;
        },
        ProiList(data){
            console.error("ProiList",data)
            this.proiList = data;
        },
        ChargerList(data){
            console.error("ChargerList",data)
            this.chargerList = data;
        },
        SprintList(data){
            console.error("SprintList",data)
            this.sprintList = data
        },
        groupNameList(data){
            console.error("groupNameList",data)
        },
        userstoryCategoryList(data){
            console.error("userstoryCategoryList",data)
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
    		console.error("右侧 init",data);
    		let ID = Common.GETID(this,Common)
    		for (let i in this.formValidate){
                if(i == "manhour" || i == "manhour" || i == "manHour" || i == "manHours"){
                    this.formValidate.manHours = ((data[i] - 0) || "")
                }else if(i == "AddGroupList" || i == "bfunc"){
                }else if(i == "depd_list"){
                }else if(i == "assist_list"){
                }else{
                    this.formValidate[i] = (data[i] || "")+"";
                }
            }
            if(data.assist_list){
            	this.assistList = ((arr)=>{
                    let _arr = [];
                    let obj = {};
                    if(arr && Array.isArray(arr)){
                        arr.forEach((item)=>{
                            obj.value = (item.value || item.user_name)+"";
                            obj.label = (item.label || item.nick_name)+"";
                            _arr.push(obj);
                            obj = {};
                        })
                    }
                    return _arr
                })(data.assist_list);
            }
            if(data.depd_list){
            	this.dependList = data.depd_list;
            }
    	},
    	//协助人开始
        addAssist(){
            this.assistonoff = true;
        },
        assistDel(event,name){
            this.assistList.splice(name,1)
        },
        receiveCloseAssist(boo){
            this.assistonoff = boo;
        },
        receiveAssist(arr){
            if(Array.isArray(arr)){
                arr.forEach((item)=>{
                    for(let i=0;i<this.chargerList.length;i++){
                        if(item == this.chargerList[i].value){
                            this.assistList.push(this.chargerList[i]);
                        }
                    }
                })
            }
            this.assistonoff = false;
        },
        //协助人结束
        //依赖开始
        addDepend(){
            this.dependonoff = true;
        },
        dependDel(event,name){
            this.dependList.splice(name,1)
        },
        receiveDepend(obj){
            this.dependList.push(obj);
            this.dependonoff = false;
        },
        receiveCloseDepend(boo){
            this.dependonoff = boo;
        },
        //依赖结束
    },
    components: {
       Depend,
       Assist,
    },
    computed: {
        myAssistList(){
            return this.assistList;
        },
        myList(){
            return this.chargerList;
        }    
    },
}
</script>
<style>
.rightform {
	padding-right: 30px;
}
#rightform .ivu-form-item{

}
</style>
