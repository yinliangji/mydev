<template>
    <div class="pageContent">
        <goAgile :go="'/demand'" :text="'返回项目需求项列表'" :TOP="'7'" />
        <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>
                <span class="crumbs">项目需求项</span>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <span class="crumbs">项目需求项详情</span>
            </BreadcrumbItem>
        </Breadcrumb>
        <Card>
            <div class="editBtn">
                <!--   -->
                <Button 
                    type="warning" 
                    @click="editItemFn"
                    class="editBtn"
                    long
                    size="small"
                    :disabled="authIs(['icdp_userStory_mng','icdp_userStory_edit','icdp_userStory_view'])"
                    v-show="(TabsCur == 'name1') ? true : false"
                    >
                    编辑
                </Button>
            </div>
            <Tabs :value="TabsCur" type="card" :capture-focus="false" @on-click="tabsHandle" >
                
                <TabPane label="项目需求项详情" name="name1">
                    <div class="baseInfoBox" >
                        <!-- <h3 class="Title"><span>计划故事相关</span></h3> -->
                        <div class="tableBox">
                            <InfoTable :Data="formValidate" v-if="TabsCur == 'name1'" />
                        </div>
                    </div>
                </TabPane>
                <TabPane label="项目需求项附件" name="name2">
                    <div class="baseInfoBox" >
                        <!-- <h3 class="Title"><span>计划故事相关</span></h3> -->
                        <div class="tableBox">
                            <FileDownLoad :REQID="formValidate.req_id" v-if="TabsCur == 'name2'" />
                        </div>
                    </div>
                </TabPane>
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
const {getPermission,DetailReq,projectListDataNew} = Common.restUrl;
import FileDownLoad from './filedown'
import InfoTable from './info'

import GoAgileMode from "@/components/goAgileMode";
export default {
    data () {
        return {
            formValidate: {
                req_id:"",
                detail_id:"",

                status:"",
                comment:"",
                remark:"",
                status_name:"",
                start_time:"",
                req_submitter:"",
                prj:"",
                create_user:"",
                end_time:"",
                
                settle_time:"",
                req_name:"",
                prj_type:"",
                id:"",
                prj_type_name:"",

                intro:"",
                req_source:"",
                req_source_name:"",
            },

            prj_permission:[],
            identity:"",
            
            //-- tabs start
            TabsCur:"name1",
            //-- tabs end
            
            ruleValidate: {
            },
            //检测id是否在projectListDataNew列表里
            GO:false,
            GOText:"",
            
        }
    },
    mounted(){

        let ID = Common.GETID(this,Common)
        let REQ_ID = Common.getStorageAndCookie(this,Common,"req_id");
        this.detail_id = Common.getStorageAndCookie(this,Common,"reqList_id");
        
        if(ID && REQ_ID){
            this.formValidate.req_id = REQ_ID;
            let params = {
                prjSn:Common.GETprjid(this,Common),
                prj_id:Common.GETprjid(this,Common),
            }
            this.getPermissionFn(getPermission,params).then((result)=>{
                if(this.detail_id){
                    this.GetDetail(DetailReq,this.detail_id)
                }else{
                    Common.CommonError(this,"没有detail_id")
                }
                
            },()=>{
                this.showError("权限不足，不能有任何动作");
            })
        }else{
            this.$router.push('/product')
        }

    },
    beforecreated(){
        console.log("项目需求项detail--beforecreated-------",this.formValidate)
    },
    created(){
        console.log("项目需求项detail--created-------",this.formValidate);
        Common.GetProjectList(defaultAXIOS,this,Common,projectListDataNew);
        this.changeDemandSerch();
    },
    beforeUpdate(){
        console.log("项目需求项detail--beforeUpdate-------",this.formValidate)
    },
    updated(){
        console.log("项目需求项detail--updated-------",this.formValidate)
    },
    methods: {
        changeDemandSerch(){
            if(Common.GetSession("demandSerch")){
                Common.SetSession("allDemandSession",Common.GetSession("demandSerch"));
                Common.RemoveSession("demandSerch");
            }
        },
        editItemFn(){
            let _query = {
                DATA: JSON.stringify(this.formValidate)
            }
            this.$router.push({path: '/demand/addEdit', query:_query})
            
        },
        GetDetail(URL = "",detail_id){
            return defaultAXIOS(URL,{detail_id},{timeout:5000,method:'get'})
            .then((response) => {
                let myData = response.data;
                console.log("<====== 项目需求项详情***response+++",response,myData,"======>");
                if(myData.status == "success" && myData.data && Object.getOwnPropertyNames(myData.data).length >2){
                    for(let i in myData.data){
                        if(i == "start_time" || i == "end_time"){
                            this.formValidate[i] = Common.replaceNullFn(myData.data[i])
                        }else{
                            this.formValidate[i] = myData.data[i]
                        }

                    }
                    return Promise.resolve(myData.data)                    

                }else{
                    return Promise.reject("错误");
                    this.showError("URL_错误");
                }
                /*

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
                */

            })
            .catch( (error) => {
                console.log(error);
                return Promise.reject(error);
                //this.showError(error);
            });
        },
        //tabs - start
        tabsHandle(name){
            this.TabsCur = name;
        },
        //tabs -end
        authIs(KEY){
            return Common.auth(this,KEY)
        },
        getPermissionFn(URL,params){
            return Common.GetPermission(defaultAXIOS,this,URL,params);
        },
        
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
              
    },
    components: {
        FileDownLoad,
        InfoTable,
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


