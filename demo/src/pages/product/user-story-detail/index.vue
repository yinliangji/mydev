<template>
    <Drawer
        :title="userStoryDetail.title"
        v-model="userStoryDetail.show"
        @on-close="onClose"
        @on-visible-change="onVisibleChange"
        :width="drawerWidth"
        :mask-closeable="true"
        :styles="userStoryDetail.styles"
        :closable="true" 
        >
        <div slot="header">
            {{userStoryDetail.title}}
            <Button 
                type="primary" 
                class="edit-btn" 
                size="small" 
                @click="editSubmitUserStory"
                :disabled="false"
                >
                {{userStoryDetail.isEditDetail?"提交":"编辑"}}
            </Button>
            <!--
            v-if="userStoryDetail.isEditDetail" 
            <Button 
                type="primary" 
                class="edit-btn" 
                size="small" 
                v-else
                @click="submitUserStory"
            >
                提交
            </Button> -->
        </div>
        
        <span class="usPopBoxRight">
            <UserStoryDetailRight 
                :IsEditDetail="userStoryDetail.isEditDetail"
                :Data="Data"
                :PrjPermission="PrjPermission"
                :Identity="Identity" 
                :ReqIdList="ReqIdList"
                :SprintList="SprintList"
                :ProiList="ProiList"
                :UserstoryTypeList="UserstoryTypeList"
                :UserstoryStatusList="UserstoryStatusList"
                :ChargerList="ChargerList"
                :groupNameList="groupNameList"
                :userstoryCategoryList="userstoryCategoryList"
            />
            <UserStoryDepdRight 
                :IsEditDetail="userStoryDetail.isEditDetail"
                :Data="Data"
                :PrjPermission="PrjPermission"
                :Identity="Identity" 
            />
        </span>
        
        <span class="usPopBoxLeft">
            <UserStoryDetailLeft 
                :IsEditDetail="userStoryDetail.isEditDetail"
                :Data="Data"
                :PrjPermission="PrjPermission"
                :Identity="Identity" 

            />
            <AttachmentTable
                :IsEditDetail="userStoryDetail.isEditDetail"
                :USID="Data.userstory_id"
            />
            <otherIfo
                :IsEditDetail="userStoryDetail.isEditDetail"
                :Data="Data"
                :PrjPermission="PrjPermission"
                :Identity="Identity" 
            />
        </span>
        
        <!-- <Row :gutter="0">
            <Col span="18" style="background:red;">
                <userStoryDetailLeft :isEditDetail="userStoryDetail.isEditDetail"></userStoryDetailLeft>
                <attachmentTable></attachmentTable>
                <otherIfo></otherIfo>
            </Col>
            <Col span="6"  style="background:green;">
                <userStoryDetailRight :isEditDetail="userStoryDetail.isEditDetail"></userStoryDetailRight>
            </Col>
        </Row> -->
    </Drawer>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
import { EventBus } from "@/tools";
import Store from '@/vuex/store'
const {getPermission} = Common.restUrl;

import UserStoryDetailLeft from "./userStoryDetailLeft"
import UserStoryDetailRight from "./userStoryDetailRight"
import AttachmentTable from "./attachmentTable"
import OtherIfo from "./otherIfo"

import UserStoryDepdRight from "./userStoryDepdRight"

export default {
    props: {
        isShow:{
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        
        Data:{
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
    watch: {
        isShow(data){
            this.userStoryDetail.show = data;
            if(!data){
                this.userStoryDetail.isEditDetail = data
            }
        },
        Data(data){
            if(data){
                this.init(data)
            }
        },
        PrjPermission(data){
        },
        Identity(data){
        },
        UserstoryTypeList(data){
        },
        UserstoryStatusList(data){
        },
        ReqIdList(data){
        },
        ProiList(data){
        },
        ChargerList(data){
        },
        SprintList(data){
        },
        groupNameList(data){
        },
        userstoryCategoryList(data){
        },
    },
    beforecreated(){
    },
    created(){
    },
    beforeUpdate(){
    },
    updated(){
    },
    mounted(){
        this.userStoryDetail.show = this.isShow;
        if(!this.isShow){
            this.userStoryDetail.isEditDetail = this.isShow;
        }
        if(this.Data){
            this.init(data)
        }
    },
    data () {
        return {
            drawerWidth:document.documentElement.clientWidth - 260,//1220
            userStoryDetail:{
                title:"用户故事详情",
                show:false,
                //详情还是编辑
                isEditDetail:false,
                styles:{
                    height:"calc(100% - 41px)",
                    overflow:"auto",
                    padding:"0",
                    position:"relative",
                    background:"#fff",
                },
            },
            formValidate: {
                id: "",
                userstory_id: "",
                userstory_name: "",
                userstory_type: "",
                charger: "",
                userstory_status: "",
                proi: "",
                manHours: "",
                mission: "",
                complete_mission: "",
                phycics_sys_id:"",
                actual_online_time:"",
                charger:"",
                nick_name:"",
                created_time:"",
                last_chg_time:"",
                last_chgr:"",
                learn_concern:"",
                plan_online_time:"",
                proposer:"",
                proposer_department:"",
                req_id:"",
                req_name:"",
                sprint: "",
                sprint_name:"",
                userstory_desc:"",
                prj_id:"",
                prj_name:"",
                prod_id:"",
                product_name:"",
                depd_list:[],  
                AddGroupList:[],//搜索查询
                bfunc:[],//弹出业务窗口  
                editStatus:"", 
                us_accept:"",  
                assist_list:[],       
            },
            userstory_typeList:[],
            userstory_statusList:[],
            NewStatusList:[],
            userstory_categoryList:[],
            req_idList:[],
            proiList:[],
            chargerList:[],
            learn_concernList:[],
            sprintList:[],
            group_nameList:[],



            GetDetail:"",

            prj_permission:[],
            identity:"",
            TASKID:"",
           
            
            //-- tabs start
            TabsCur:"name1",
            //-- tabs end
           
            // wy start
            storyTestCaseData:{},
            // wy end
            //juzi start
            userStoryId:"",
            //juzi end
            
        }
    },
    methods: {
        init(myData){
            console.error("index init",myData);
            
            for(let i in myData){
                if(i == "proi"){
                    this.formValidate[i] = Common.ProiFn(myData[i],i)
                }else if(i == "userstory_type"){
                    this.formValidate[i] = Common.TypeFn(myData[i],i)
                }else if(i == "userstory_status"){
                    this.formValidate[i] = Common.StatusFn(myData[i],i,this)
                }
                else{
                    this.formValidate[i] = myData[i]
                }
            }
            
            let ID = Common.GETID(this,Common)

        },
        getPermissionFn(URL,params){
            return Common.GetPermission(defaultAXIOS,this,URL,params);
        },
        onClose(data){
            this.$emit("sendDetailClose",false);
        },
        onVisibleChange(data){
            //console.error("onVisibleChange",data,this.userStoryDetail.show)
            //this.$emit("sendDetailClose",this.userStoryDetail.show);
        },
        editSubmitUserStory(){
            this.userStoryDetail.isEditDetail = !this.userStoryDetail.isEditDetail;
        }
    },
    components: {
        UserStoryDetailLeft,
        UserStoryDetailRight,
        AttachmentTable,
        OtherIfo,
        UserStoryDepdRight,
    },
    computed: {

    },
    
}
</script>
<style>
.ivu-drawer{
    top: 74px ;
    bottom: 50px;
    height: auto;
    
}
.usPopBox{
    
}
.usPopBoxRight{
    position: absolute;
    width:354px;
    right: 0;
    top: 0;
}
.usPopBoxRight:before{
    left: -12px;
}

.usPopBoxLeft{
    position: absolute;
    left: 0;
    right: 366px;
}
.usPopBoxLeft:after{
    right: -12px;
}
.usPopBoxRight:before , .usPopBoxLeft:after{
    position: absolute;
    content: "";
    top: 0;
    height: 100%;
    width: 12px;
    background: #edf2f5;
}
.edit-btn{
    float: right;
    margin-right: 30px;
}    
</style>
