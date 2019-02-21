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
            
            <Tabs :value="TabsCur" type="card" :capture-focus="false" @on-click="tabsHandle" >
                
                <TabPane label="项目需求项附件" name="name1">
                    <div class="baseInfoBox" >
                        <!-- <h3 class="Title"><span>计划故事相关</span></h3> -->
                        <div class="tableBox">
                            <FileDownLoad :REQID="formValidate.req_id" v-if="TabsCur == 'name1'" />
                        </div>
                    </div>
                </TabPane>
            </Tabs>
            
        </Card>
    </div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
import Store from '@/vuex/store'
const {getPermission} = Common.restUrl;
import FileDownLoad from './filedown'

export default {
    data () {
        return {
            
            formValidate: {
                req_id:"",
            },

            prj_permission:[],
            identity:"",
            
            //-- tabs start
            TabsCur:"name1",
            //-- tabs end
            
            ruleValidate: {
            },
            
        }
    },
    mounted(){

        let ID = Common.GETID(this,Common)
        let REQ_ID = Common.getStorageAndCookie(this,Common,"req_id")
        if(ID && REQ_ID){
            this.formValidate.req_id = REQ_ID;
            this.getPermissionFn(getPermission).then((result)=>{
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
        console.log("项目需求项detail--created-------",this.formValidate)
        
    },
    beforeUpdate(){
        console.log("项目需求项detail--beforeUpdate-------",this.formValidate)
    },
    updated(){
        console.log("项目需求项detail--updated-------",this.formValidate)
    },
    methods: {
        //tabs - start
        tabsHandle(name){
            this.TabsCur = name;
        },
        //tabs -end
        authIs(KEY){
            return Common.auth(this,KEY)
        },
        getPermissionFn(URL){
            return Common.GetPermission(defaultAXIOS,this,URL);
        },
        
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
              
    },
    components: {
        FileDownLoad,
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


