<template>
    <div class="pageContent">
        <goAgile :go="'/product'" :text="'返回用户故事列表'" :TOP="'7'" />
        <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>
                <span class="crumbs">{{formValidate.prj_name}}</span>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <span class="crumbs">{{formValidate.req_name}}</span>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <span class="crumbs">{{formValidate.userstory_name}}</span>
                <!-- <span class="crumbs">（</span>
                <span class="crumbs">{{formValidate.sprint_name}}</span>
                <span class="crumbs">）</span> -->
            </BreadcrumbItem>
        </Breadcrumb>
        <Card>
            <div class="editBtn">
                <!-- :disabled="authIs(['icdp_userStory_mng','icdp_userStory_edit','icdp_userStory_view'])"  -->
                <Button 
                    type="warning" 
                    @click="editItemFn"
                    :disabled="iSauth(formValidate.editStatus)"
                    class="editBtn"
                    long
                    size="small"
                    v-show="(TabsCur == 'name1') ? true : false"
                    >
                    编辑
                </Button>
                <Button 
                    type="success" 
                    @click="goDevelopmentFn"
                    :disabled="false" 
                    class="editBtn2"
                    long
                    size="small"
                    >
                    工作项看板
                </Button>
            </div>
            <Tabs :value="TabsCur" type="card" :capture-focus="false" @on-click="tabsHandle" >
                <TabPane label="基本信息" name="name1">
                    <div class="baseInfoBox">
                        <!-- <h3 class="Title"><span>用户故事基本信息</span></h3> -->
                        <div class="tableBox">
                            <InfoTable :Data="formValidate" />
                        </div>
                    </div>
                </TabPane>
                <!--
                <TabPane label="需求项分析" name="name2">
                    <div class="baseInfoBox">
                        <h3 class="Title"><span>需求项信息</span></h3>
                        <div class="tableBox">
                            <AnalyseInfo :Data="formValidate" />
                        </div>
                        <br />
                        <h3 class="Title"><span>关联业务功能</span></h3>
                        <Analyse :TASKID="TASKID" :Data="formValidate" v-if="TabsCur == 'name2'" />
                    </div>
                </TabPane>
            
                <TabPane label="应用设计" name="name3">
                    <div class="baseInfoBox">
                        <h3 class="Title"><span>计划故事相关</span></h3>
                        <div class="tableBox">
                            <AppDesign :userStoryId="userStoryId" v-if="TabsCur == 'name3'" />
                        </div>
                    </div>
                </TabPane>
                -->
                <TabPane label="测试管理" name="name4">
                    <div class="baseInfoBox">
                        <!-- <h3 class="Title"><span>计划故事相关</span></h3> -->
                        <div class="tableBox">
                            <!-- wy start -->
                            <storyTestCase :storyInfo="storyTestCaseData" v-if="TabsCur == 'name4' && formValidate.id" />
                            <!-- wy end -->
                        </div>
                    </div>
                </TabPane>
                <TabPane label="用户故事变更记录" name="name5">
                    <div class="baseInfoBox">
                        <!-- <h3 class="Title"><span>用户故事变更记录</span></h3> -->
                        <div class="tableBox">
                            <!-- -->
                            <UsChange :TASKID="TASKID" v-if="TabsCur == 'name5'" />
                            <!-- -->
                        </div>
                    </div>
                </TabPane>
                <TabPane label="用户故事附件" name="name6">
                    <div class="baseInfoBox" >
                        <!-- <h3 class="Title"><span>计划故事相关</span></h3> -->
                        <div class="tableBox">
                            <!-- 用户故事附件制作中....... -->
                            <FileDownLoad :USID="formValidate.userstory_id" v-if="formValidate.userstory_id && TabsCur == 'name6'" />
                        </div>
                    </div>
                </TabPane>
                <!-- <TabPane label="评论" name="name7">
                    <div class="baseInfoBox" >
                        <h3 class="Title"><span>评论</span></h3>
                        <div class="tableBox">
                            <Comment :index="1" v-if="TabsCur == 'name7'" />
                        </div>
                    </div>
                </TabPane> -->
            </Tabs>
            
        </Card>
        <GoAgileMode :Data="GO" :Text="GOText" />
    </div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
import Store from '@/vuex/store'
const {storyGetDetail,storyGetCondition,getPermission,getMissionChange,userstoryGetBus,userstoryAddBus,projectListDataNew} = Common.restUrl;
import FileDownLoad from './filedown'
import InfoTable from './info'
import UsChange from './change'
import Analyse from './analyse'
import AnalyseInfo from './analyseinfo'
// wy start
import storyTestCase from '@/components/storyTestCase'
// wy end
//juzi start
import AppDesign from '@/pages/appdesign'
//juzi end

import GoAgileMode from "@/components/goAgileMode";
import Comment from "@/components/comment/Comment";


export default {
    data () {
        return {
            count: ["技术模块1", "技术模块2", "技术模块3"],
            count2: ["业务模块1", "业务模块2", "业务模块3"],
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
            },
            userstory_typeList:[],
            userstory_statusList:[],
            req_idList:[],
            proiList:[],
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
    mounted(){
        Common.UserstorySession(Common,this);

        //this.getPermissionFn(getPermission); 获取权限开始
        let auth_list = ()=>{
            let params = {
                prjSn:Common.GETprjid(this,Common),
                prj_id:Common.GETprjid(this,Common),
            }
            this.getPermissionFn(getPermission,params).then((result)=>{
                setTimeout(()=>{
                    EVENT.emit("SIDER1",result);
                },500)
            },()=>{
                this.showError("权限不足，不能有任何动作");
            })
        }
        EVENT.on("USER",(result)=>{
            if(Common.getStorageAndCookie(this,Common,"username")){
                console.log('EVENT.on("USER",(result) -- auth_list()');
                auth_list();
            }
        })
        if(Common.getStorageAndCookie(this,Common,"username")){
            console.log('直接执行 auth_list()');
            auth_list();
        }else{
            Store.dispatch('EVENT_EMIT/incrementAsync', {isEmit: true,})
        }
        // 获取权限结束

        let detailID = Common.GETdetail_id(this,Common)
        let ID = Common.GETID(this,Common)
        if(detailID && ID){

            if(!Common.GETID(this,Common)){//if(!Common.GETID(this,Common,"inCookie")){
                Common.setStorageAndCookie(Common,"id",ID)
            }

            //let _type = this.storyGetConditionFn(storyGetCondition,"userstory_type",ID);
            //let _status = this.storyGetConditionFn(storyGetCondition,"userstory_status",ID);
            let _proi = this.storyGetConditionFn(storyGetCondition,"proi",ID);

            Promise.all([_proi]).then((REP)=>{
                this.storyGetDetailFn(storyGetDetail,detailID).then((TASKID)=>{
                    //wy start
                    this.copydata(this.storyTestCaseData,this.formValidate);
                    //wy end
                    //juzi start
                    this.userStoryId = this.formValidate.userstory_id;
                    //juzi end
                   
                    this.TASKID = TASKID;
                    
                    //this.getMissionChangeFn2(userstoryGetBus,TASKID,1,this.tableDAtaPageLine2);

                },(error)=>{
                    console.log(error)
                    this.showError(error)
                })
            },(ERR)=>{
                console.log(ERR)
                this.showError("没有 userstory_type,userstory_status,proi 其中之一")
            })
        }else{
            this.$router.push('/product')
        }

    },
    beforecreated(){
        console.log("用户故事detail--beforecreated-------",this.formValidate)
    },
    created(){
        console.log("用户故事detail--created-------",this.formValidate)
        /*
        let detailID = Common.GETdetail_id(this,Common,"inUrl");
        if(detailID){
            this.storyTestCaseData.detail_id = detailID;
        }
        */

        let _TabsCur = this.$router.history.current.query.TabsCur
        if(_TabsCur){
            this.TabsCur = _TabsCur;
        }
        Common.GetProjectList(defaultAXIOS,this,Common,projectListDataNew);
    },
    beforeUpdate(){
        console.log("用户故事detail--beforeUpdate-------",this.formValidate)
    },
    updated(){
        console.log("用户故事detail--updated-------",this.formValidate)
    },
    methods: {
        iSauth(KEY){
            let key;
            if(KEY){
                if(KEY != "false" || KEY != "null" || KEY != "undefined"){
                    key = true;
                }else{
                    key = false;
                }
            }else{
                key = false;
            }
            return !key;
        },
        //wy start
        copydata(to,from){
            Object.assign(to,from)
        },
        //wy end
        //业务窗口 -start
        
        //业务窗口 -end
        //删除窗口 -start
        
        //删除窗口 -end
        //查询搜索开始
        
        //查询搜索结束
        //相关业务功能列表--start
        
        //相关业务功能列表--end
        //tabs - start
        tabsHandle(name){
            this.TabsCur = name;
            let Query = {
                TabsCur:name,
                detail_id:Common.GETdetail_id(this,Common),
            }
            this.$router.push({path: '/product/detail', query:Query})
        },
        //tabs -end
        //业务功能列表-start -- 废弃
        
        
        //业务功能列表-end
        goDevelopmentFn () {
            this.$router.push({path: '/development', query: {board: true,us_name:this.formValidate.id}});
        },
       
        authIs(KEY){
            return Common.auth(this,KEY)
        },
        getPermissionFn(URL,params){
            return Common.GetPermission(defaultAXIOS,this,URL,params);
        },
        editItemFn(){
            let _query = {
                fromEdit:true,
                DATA: JSON.stringify(this.GetDetail)
            }
            if(this.TabsCur == 'name1'){
                this.$router.push({path: '/product/edit', query:_query})
            }else if(this.TabsCur == 'name2'){
                if(this.cacheMenuData(0)){
                    _query.menu = this.cacheMenuData(0);
                }
                this.$router.push({path: '/product/edit', query:_query})
            }else if(this.TabsCur == 'name3'){

            }else if(this.TabsCur == 'name4'){

            }
            
        },
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
        storyGetDetailFn(URL = "",detail_id){
            return defaultAXIOS(URL,{detail_id,username:Common.getCookie("username")},{timeout:5000,method:'get'})
            .then((response) => {
                let myData = response.data;
                console.log("<======product detail***response+++",response,myData,"======>");

                if(Object.getOwnPropertyNames(myData).length >2){
                    this.GetDetail = myData;
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
                    return Promise.resolve(myData.id)
                }else{
                    return Promise.reject("没有数据");
                    //this.showError("没有数据");
                }

            })
            .catch( (error) => {
                console.log(error);
                return Promise.reject(error);
                //this.showError(error);
            });
        },
        storyGetConditionFn(URL,condition,prj_id){

            return Common.GetConditionAll(defaultAXIOS,this,URL,"xxxxx",prj_id,["userstory_type","userstory_status","proi"]);

            // return Common.GetCondition(defaultAXIOS,this,URL,condition,prj_id).then((D)=>{
            //  return Promise.resolve("resolve")
            // },(E)=>{
            //  return Promise.reject("reject");
            // });
        },
    },
    components: {
        Comment,
        storyTestCase,
        AppDesign,
        FileDownLoad,
        InfoTable,
        UsChange,
        Analyse,
        AnalyseInfo,
        GoAgileMode,
    },
    watch:{
    },
}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';
.tableBox{
    padding-top: 0;
}
.addModule{
    padding-top:30px;
    padding-bottom:30px;
}
.tagBox {
    padding-bottom:30px;

}
h4{
    font-size:14px;
    color:#495060;
    font-weight: normal;
    height:26px;
    line-height: 26px;
}
.editBtn{
    position:absolute;
    right:10px;
    top:6px;
    z-index: 10;
    width: 62px;
}
.editBtn2{
    position:absolute;
    right:80px;
    top:6px;
    z-index: 10;
    width: 82px;
}

.ivu-tabs {
    //overflow:inherit;
    //overflow-x: hidden;
}



</style>
<style>
#hidden {
    visibility: hidden;
}
#serchReq .ivu-select-item-selected{
    display: none;
}

#serchReq .ivu-tag-checked{
    display: none;
}


#serchReq .ivu-tag .ivu-icon-ios-close-empty{
    display: none !important;
}

   
.crumbs {
    display: inline-block;
    max-width: 15em;
    height: 1.1em;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
</style>


