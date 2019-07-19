<template>
    <Drawer
        :title="userStoryDetail.title"
        v-model="userStoryDetail.show"
        @on-close="onClose"
        @on-visible-change="onVisibleChange"
        width="1220"
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
                v-if="userStoryDetail.isDetail"
                @click="editUserStory"
            >
                编辑
            </Button>
            <Button 
                type="primary" 
                class="edit-btn" 
                size="small" 
                v-else
                @click="submitUserStory"
            >
                编辑
            </Button>
        </div>
        
        <div class="usPopBoxRight">
            <UserStoryDetailRight 
                :isDetail="userStoryDetail.isDetail"
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
                :isDetail="userStoryDetail.isDetail"
                :Data="Data"
                :PrjPermission="PrjPermission"
                :Identity="Identity" 
            />
        </div>
        <div class="usPopBoxCenter">&nbsp;</div>
        <div class="usPopBoxLeft">
            <UserStoryDetailLeft 
                :isDetail="userStoryDetail.isDetail"
                :Data="Data"
                :PrjPermission="PrjPermission"
                :Identity="Identity" 

            />
            <AttachmentTable
                :USID="Data.userstory_id"
            />
            <otherIfo />
        </div>
        
        <!-- <Row :gutter="0">
            <Col span="18" style="background:red;">
                <userStoryDetailLeft :isDetail="userStoryDetail.isDetail"></userStoryDetailLeft>
                <attachmentTable></attachmentTable>
                <otherIfo></otherIfo>
            </Col>
            <Col span="6"  style="background:green;">
                <userStoryDetailRight :isDetail="userStoryDetail.isDetail"></userStoryDetailRight>
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
            console.error("isShow",data)
            this.userStoryDetail.show = data;
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
        if(this.Data){
            this.init(data)
        }
    },
    data () {
        return {
            userStoryDetail:{
                title:"用户故事详情",
                show:false,
                //详情还是编辑
                isDetail:true,
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
           
            //--业务功能列表开始
            
            //--业务功能列表结束
            //-- tabs start
            TabsCur:"name1",
            //-- tabs end
            //查询搜索开始
           
            //查询搜索结束
            //关联业务开始
            
            //关联业务结束
            ruleValidate: {
            },
            
            
            
            // wy start
            storyTestCaseData:{},
            // wy end
            //juzi start
            userStoryId:"",
            //juzi end
            //检测id是否在projectListDataNew列表里
            GO:false,
            GOText:"",
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
        editUserStory(){
            this.userStoryDetail.isDetail = false;
        },
        submitUserStory(){
            this.userStoryDetail.isDetail = true;
        },
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
    background:#f5f5f5;
    position: absolute;
    width:354px;
    right: 0;
    top: 0;
}
.usPopBoxCenter {
    position: absolute;
    width: 12px;
    background: #edf2f5;
    right: 354px;
    bottom: 0;
    top: 0;
}
.usPopBoxLeft{
    background:#ccc;
    position: absolute;
    left: 0;
    right: 366px;

}
.edit-btn{
    float: right;
    margin-right: 30px;
}    
</style>
