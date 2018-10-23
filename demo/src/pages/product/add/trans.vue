<template>
    <div class="transBody">
        <div class="transBodyLK" style="float:left;width:44%;">
            <!-- <div style="margin-bottom:10px;">&nbsp;</div> -->
            <div class="transBodyL">

                <div style="padding:6px;">
                    <Checkbox :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
                </div>

                <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                    <div class="userStoryTitle">
                      <div class="userStoryStatus" >
                          操作
                      </div>
                      <div class="userStoryName" >
                          名称
                      </div>
                    </div>
                    <ul>
                        <li v-for="(item,index) in dataL" :key="item.bfunc_id" class="storyBottom">
                            <div class="tranHeader">
                                <span class="userStoryStatus">
                                    <Button type="warning" shape="circle" size="small" @click="modify('edit',index)">编辑</Button>
                                </span>
                                <Checkbox :label="item.bfunc_id" class="translist">
                                    <em>{{item.bfunc_name}}</em>
                                </Checkbox>
                            </div>
                        </li>
                    </ul>
                </CheckboxGroup>
            </div>
        </div>
        <div class="transBodyC">
            <Button :type="bgcolorL" long icon="chevron-left" @click="toLeft" :disabled="toLeftOnoff" >
                <Icon type="chevron-left"></Icon>
            </Button>
            <Button :type="bgcolorR" long icon="chevron-right" @click="toRight" :disabled="toRightOnoff">
                <Icon type="chevron-right"></Icon>
            </Button>
        </div>
        <div class="transBodyRK" style="float:left;width:43%;">
            <!-- <div style="margin-bottom:10px;">
                <Row>
                    <Col span="7">
                        已有业务功能
                    </Col>
                    <Col span="13">
                        
                        <Select v-modle="reqserch" filterable multiple>
                            <Option v-for="(item ,index) in reqserchList" :value="item.value" :key="index">
                                {{item.label}}
                            </Option>
                        </Select>
                    </Col>
                    <Col span="1">
                        &nbsp;
                    </Col>
                    <Col span="3">
                        <Button type="primary" shape="circle" icon="ios-search"></Button>
                    </Col>
                </Row>
            </div>     -->
            <div class="transBodyR">
                <div class="transBodyRcon">
                    <div style="padding:8px 0;">
                        <Checkbox :value="checkAllR" @click.prevent.native="handleCheckAllR" style="margin-left:10px;">
                            全选
                        </Checkbox>
                    </div>
                    <CheckboxGroup v-model="checkAllGroupR" @on-change="checkAllGroupChangeR">
                        <div class="userStoryTitle">
                            <div class="userStoryStatus" >
                                操作
                            </div>
                            <div class="userStoryName" >
                                名称
                            </div>
                        </div>
                        <ul>
                            <li v-for="(item,index) in dataR" :key="item.bfunc_id" class="storyBottom">
                                <div class="tranHeader">
                                    <span class="userStoryStatus">
                                        <Button type="info" shape="circle" size="small" @click="modify('view',index)">查看</Button>
                                    </span>
                                    <Checkbox :label="item.bfunc_id" class="translist">
                                        <em>{{item.bfunc_name}}</em>
                                    </Checkbox>
                                </div>
                            </li>
                        </ul>
                    </CheckboxGroup>
                </div>
            </div>
        </div>
        <div  class="bottomAddBtnBox">
            <Button type="success" @click="modify('add',-1)">新增业务功能</Button>
        </div>
        <businessFunction
            :isView="IsView"
            @changeIsShow="changeIsShow"
            @addBus="addBus"
            @editBus="editBus"
            :isShow="isShowonoff"
            :title="titleName"
            :typeList="typeList"
            :statusList="statusList"
            :logicList="logicList"
            :isAddOrEdit="isAddOrEdit"
            ref="busdata" 
            :formData = "myFormData"
        />
    </div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {userstoryGetBfunc_type,userstoryGetLogic_sys_no,userstoryGetDetail,selbusinessList } = Common.restUrl;
export default {
    props: {
        toLeftData: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        TransDataGroup: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        TransDataGroupList: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        isPopsAdd: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        popsItem: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
    },
    data () {
        return {
            reqserch:"",
            reqserchList:[
                {
                    value:"x1",
                    label:"x1"
                }
            ],
            selfDataGroup:[],
            selfDataGroupList:[],
            //
            proproName:"",
            isShowMngAllBtn:false,
            toLeftOnoff:true,
            toRightOnoff:true,
            addOrModifyStatus:false,//默认为false是添加，当修改时改为true
            sureInfo: "添加成功",
            storySearch: "",
            //
            curStoryType: "",
            curStoryTypeL:"",
            storyTypeList: [],

            curIteration: "",
            iterationList: [],
            curStoryStatus:"",
            curStoryStatusL:"",
            storyStatusList: [],
            curreqName:"",
            reqList:[],

            bgcolorL: "ghost",
            bgcolorR: "ghost",
            nowNum: 0,
            search: "",
            titleName: "",

            indeterminate: true,
            checkAll: false,
            checkAllR: false,
            checkAllGroup: [], //v-model的控制多选框组是否打钩的
            checkAllGroupR: [],
            checkAllGroupOnoff: [], //全选按钮
            checkAllGroupOnoffR: [],
            //
            dataL: [
                // {
                //     id:1,
                //     bfunc_name:"故事1",
                //     isShow:false,
                //     list:[],
                // },
                // {
                //     id:2,
                //     bfunc_name:"故事2",
                //     isShow:false,
                //     list:[],
                // },
            ],
            dataR: [
                // {
                //     id:3,
                //     bfunc_name:"故事3",
                //     isShow:false,
                //     list:[],
                // },
                // {
                //     id:4,
                //     bfunc_name:"故事4",
                //     isShow:false,
                //     list:[],
                // },
            ],
            //弹出业务窗口开始
            isShowonoff:false,
            titleName:"",
            typeList:[],
            statusList:[],
            logicList:[],
            isAddOrEdit:true,
            LeftData:false,
            RightData:false,
            myFormData:false,
            IsView:false,
            list_logic_type:false,
            
            //弹出业务窗口结束
            
        }
    },
    methods: {
        //弹出业务窗口开始
        //缺----展示 选择的下拉对 所属逻辑子系统搜素 bfunc_id who
        changeIsShow(){
            this.isShowonoff = false;
            this.IsView = false;
        },
        logic_sys_nameFn(val,arr){
            return arr[arr.findIndex(item=>val == item.logic_sys_no)].logic_sys_name;
        },
        addBus(D){
            this.IsView = false;
            
            let _logic_sys_name = D.logic_sys_no ? this.logic_sys_nameFn(D.logic_sys_no,this.logicList): "";
            let _temp = {};
            _temp.bfunc_name = D.bfunc_name
            _temp.bfunc_status = D.bfunc_status
            _temp.bfunc_type = D.bfunc_type
            _temp.bfunc_desc = D.businessDes
            _temp.logic_sys_no = D.logic_sys_no
            _temp.bfunc_id = D.bfunc_id
            _temp.who = D.who
            _temp.logic_sys_name = _logic_sys_name
            
            this.dataL.push(_temp)

        },
        editBus(D){
            
            this.IsView = false;
            let Index = this.dataL.findIndex((item)=>{
                return D.bfunc_id == item.bfunc_id
            })
            if(D.who){
                this.$set(this.dataL[Index],"bfunc_name", D.bfunc_name);
                this.$set(this.dataL[Index],"bfunc_status", D.bfunc_status);
                this.$set(this.dataL[Index],"bfunc_type", D.bfunc_type);
                this.$set(this.dataL[Index],"bfunc_desc", D.businessDes);
                this.$set(this.dataL[Index],"logic_sys_no", D.logic_sys_no);
                
            }else{
                this.dataL[Index].bfunc_name = D.bfunc_name;
                this.dataL[Index].bfunc_status = D.bfunc_status;
                this.dataL[Index].bfunc_type = D.bfunc_type;
                this.dataL[Index].bfunc_desc = D.businessDes;
                this.dataL[Index].logic_sys_no = D.logic_sys_no;
                
            }

            let _logic_sys_name = D.logic_sys_no ? this.logic_sys_nameFn(D.logic_sys_no,this.logicList): "";
            this.dataL[Index].logic_sys_name = _logic_sys_name

            if(D.who != "new" || D.who !== ""){ 
                this.$emit("modifyTagfn",D)
            };
            
        },
        userstoryGetDetailFn(URL,params = {},val,index,is){
            console.log(this.dataL[index],index,this.dataL,"userstoryGetDetailFn<【】======")

            let ckeckObj = (v,arr,txt,txt1)=>{
                let I = arr.findIndex((item)=>{
                    return v == item[txt]
                })
                return arr[I][txt1]+"";
            }
            let Title;
            let fromdataObj;
            if(val == "view"){
                Title = "查看业务功能";
                this.IsView = true;
                fromdataObj = this.dataR[index];
            }else if(val == "edit"){
                Title = "编辑业务功能";
                fromdataObj = this.dataL[index];

            }else{
                Title = "新增业务功能";
            }
            if(val == "add"){
                if(!window.creatId){
                    window.creatId = 1;
                }else{
                    window.creatId++;   
                }
                this.myFormData = {
                    bfunc_name:"",
                    bfunc_type:"",
                    logic_sys_no:"",
                    bfunc_desc:"",
                    bfunc_id:"creatId_"+window.creatId,
                    who:"new",
                    
                }
                this.titleName = Title;
                this.isShowonoff = is;

                return;
            }
            if(val == "view" && fromdataObj.bfunc_id.indexOf("creatId_") != -1){

               
                let _type2 = fromdataObj.bfunc_type ? ckeckObj(fromdataObj.bfunc_type,this.typeList,"bfunc_type","bfunc_type_name") : "";
                let _logic2 = fromdataObj.logic_sys_no ? ckeckObj(fromdataObj.logic_sys_no,this.logicList,"logic_sys_no","logic_sys_name") : "";

                this.myFormData = {
                    bfunc_name:fromdataObj.bfunc_name+"",
                    bfunc_type:_type2,
                    logic_sys_no:_logic2,
                    bfunc_desc:fromdataObj.bfunc_desc+"",
                    bfunc_id:fromdataObj.bfunc_id+"",
                    who:fromdataObj.who+"",
                    
                }
                this.titleName = Title;
                this.isShowonoff = is;
                return;
            }

            defaultAXIOS(URL,params,{timeout:60000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======【userstoryGetDetail productAdd】***response+++",response,myData,"====>");

                
                let _type = ckeckObj((fromdataObj.bfunc_type || myData.data.bfunc_type),this.typeList,"bfunc_type","bfunc_type_name");
                let _logic = ckeckObj((fromdataObj.logic_sys_no || myData.data.logic_sys_no),this.logicList,"logic_sys_no","logic_sys_name");

                if(val == "view"){
                    this.myFormData = {
                        bfunc_name:fromdataObj.bfunc_name || myData.data.bfunc_name+"",
                        bfunc_type:_type,
                        logic_sys_no:_logic,
                        bfunc_desc:fromdataObj.bfunc_desc || myData.data.bfunc_desc+"",
                        bfunc_id:fromdataObj.bfunc_id || params.busfunc_id+"",
                        who:fromdataObj.who || params.who+"",
                        
                    }
                }else{
                    if(fromdataObj.bfunc_id.indexOf("creatId_") != -1){
                        this.myFormData = {
                            bfunc_name:fromdataObj.bfunc_name+"",
                            bfunc_type:fromdataObj.bfunc_type+"",
                            logic_sys_no:fromdataObj.logic_sys_no+"",
                            bfunc_desc:fromdataObj.bfunc_desc+"",
                            bfunc_id:fromdataObj.bfunc_id+"",
                            who:fromdataObj.who+"",
                            
                        }
                    }else{
                        this.myFormData = {
                            bfunc_name:fromdataObj.bfunc_name || myData.data.bfunc_name+"",
                            bfunc_type:fromdataObj.bfunc_type || myData.data.bfunc_type+"",
                            logic_sys_no:fromdataObj.logic_sys_no || myData.data.logic_sys_no+"",
                            bfunc_desc:fromdataObj.bfunc_desc || myData.data.bfunc_desc+"",
                            bfunc_id:fromdataObj.bfunc_id || params.busfunc_id+"",
                            who:fromdataObj.who || params.who+"",
                            
                        }
                    }
                }

                this.titleName = Title;
                this.isShowonoff = is;
                
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });   
        },
        userstoryGetBfunc_typeFn(URL,params = {}){
            return defaultAXIOS(URL,params,{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======productAdd  userstoryGetBfunc_typeFn***+++",response,myData,"======>");
                if(myData.status == "success"){
                    //this.typeList = myData.data;
                    return Promise.resolve(myData.data)
                }else{
                    this.showError(URL+"错误");
                    return Promise.reject(false);
                }
                
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
                return Promise.reject(false);
            });
        },
        userstoryGetLogic_sys_noFn(URL,params = {}){
            return  defaultAXIOS(URL,params,{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======productAdd  userstoryGetLogic_sys_no***+++",response,myData,"======>");
                if(myData.status == "success"){
                    //this.logicList = myData.data;
                    return Promise.resolve(myData.data)
                }else{
                    this.showError(URL+"错误");
                    return Promise.reject(false);
                }
                
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
                return Promise.reject(false);
            });
        },
        selbusinessListFn(URL,params = {}){
            return  defaultAXIOS(URL,params,{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======productAdd  userstoryGetLogic_sys_no***+++",response,myData,"======>");
                if(myData.typeList && myData.logicList){
                    this.typeList = myData.typeList;
                    this.logicList = myData.logicList
                    return Promise.resolve(myData)
                }else{
                    this.showError(URL+"错误");
                    return Promise.reject(false);
                }
                
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
                return Promise.reject(false);
            });
        },
        //弹出业务窗口结束
        modify(v,i){
            //this.myFormData = false;
            //this.$refs.busdata.resetFields();
            //
            let _param;
            let check = (n,arr)=>{
                return {busfunc_id:arr[n].bfunc_id,who:arr[n].who}  
            }
            if(v == "view"){
                _param = check(i,this.dataR);
                this.isAddOrEdit = false;
            }else if(v == "edit"){
                _param = check(i,this.dataL)
                this.isAddOrEdit = false;
            }else{
                this.$refs.busdata.resetFields();//修改10-20
                _param = {};
                this.isAddOrEdit = true;
            }
            
            //let _type_logic = this.selbusinessListFn(selbusinessList,{prj_id:Common.GETprjid(this,Common)});
            Promise.all([this.list_logic_type]).then(()=>{
                this.userstoryGetDetailFn(userstoryGetDetail,_param,v,i,true)
            },()=>{
                this.showError(userstoryGetBfunc_type+"|"+userstoryGetLogic_sys_no);
            })
            //
            this.$emit("modifyfn",v,i,true);
            
        },
        selfAddItemFn(Group = [],GroupList = [],datal = [],datar = []){//没用
            let Fn1 = (val,arr)=>{
                let _obj = {
                    bfunc_id:"",
                    bfunc_name:"",
                    bfunc_status:"",
                    sys_id:"",
                    bfunc_desc:"",
                    isShow:"",
                    list:[],
                    who:"",
                    
                    
                };
                let _temp = arr.find((item)=>{
                    return val == item.value
                });

                _obj.bfunc_id = val;
                _obj.bfunc_name = _temp.label;
                _obj.who = _temp.who;
                
                let _checkR = (obj)=>{
                    return datar.findIndex((item)=>{
                        return obj.bfunc_id == item.bfunc_id 
                    })
                }
                let _checkL = (obj)=>{
                    return datal.findIndex((item)=>{
                        return obj.bfunc_id == item.bfunc_id 
                    })
                }

                
                if(_checkR(_obj)  == -1){
                    datar.push(_obj)
                }
                
            }
            for(let i=0;i<Group.length;i++){
                Fn1(Group[i],GroupList)
            }
        },
        selfChangeItem(value = "",List = [],data = []){
            let Fn1 = (val,arr)=>{
                let _obj = {
                    bfunc_id:"",
                    bfunc_name:"",
                    bfunc_status:"",
                    sys_id:"",
                    bfunc_desc:"",
                    isShow:"",
                    list:[],
                    who:"",
                    
                };
                let _temp = arr.find((item)=>{
                    return val == item.value
                });
                
                _obj.who = _temp.who;
                _obj.bfunc_id = val;
                _obj.bfunc_name = _temp.label;
                data.push(_obj);
            }
            Fn1(value,List)
        },
        selfChangeItem2(value = "",datar = [],datal = []){
            let Index = datar.findIndex(item => value == item.bfunc_id)
            let Index2 = datal.findIndex(item => value == item.bfunc_id);
            if(Index != -1){
                datar.splice(Index,1)
            }
            if(Index2 != -1){
                datal.splice(Index2,1)
            } 
            
        },
        //
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
        //
        toLeft() {
            
            this.checkAllGroupR.forEach(element => {
                this.dataL.push(this.dataR.find(n => n.bfunc_id == element));
                this.dataR.splice(this.dataR.findIndex(n => n.bfunc_id == element),1);
            });
            this.checkAll = false;
            this.checkAllR = false;
        },
        toRight() {
            this.checkAllGroup.forEach(element => {
                this.dataR.push(this.dataL.find(n => n.bfunc_id == element));
                this.dataL.splice(this.dataL.findIndex(n => n.bfunc_id == element),1);
            });
            this.checkAll = false;
            this.checkAllR = false;
        },
        handleCheckAll() {
            if (this.checkAll) {
                this.checkAllGroup = [];
            } else {
                this.checkAllGroup = this.checkAllGroupOnoff;
            }
            this.checkAll = !this.checkAll;
        },
        handleCheckAllR() {
            if (this.checkAllR) {
                this.checkAllGroupR = [];
            } else {
                this.checkAllGroupR = this.checkAllGroupOnoffR;
            }
            this.checkAllR = !this.checkAllR;
        },
        checkAllGroupChange(data) {
            if (data.length < this.dataL.length) {
                this.checkAll = false;
            } else {
                this.checkAll = true;
            }
        },
        checkAllGroupChangeR(data) {
            if (data.length < this.dataR.length) {
                this.checkAllR = false;
            } else {
                this.checkAllR = true;
            }
        },
    },
    watch: {
        toLeftData(){
            if(this.toLeftData){
                this.dataL.push(...this.toLeftData);
            }
        },
        //--检查搜索开始
        TransDataGroup(){
            this.selfDataGroup = this.TransDataGroup;
            setTimeout(()=>{
                if(this.isPopsAdd == "+"){
                    this.selfChangeItem(this.popsItem,this.TransDataGroupList,this.dataR);
                }else if(this.isPopsAdd == "-"){
                    this.selfChangeItem2(this.popsItem,this.dataR,this.dataL)
                }
                //this.dataL = [];
                //this.dataR = [];
                //this.selfAddItemFn(this.TransDataGroup,this.TransDataGroupList,this.dataL,this.dataR)
            },1)
        },
        TransDataGroupList(){
            this.selfDataGroupList = this.TransDataGroupList;
        },
        //--检查搜索结束
        checkAllGroup(val) {
            console.log(val);
            if (val.length > 0) {
                this.bgcolorR = "info";
                this.toRightOnoff = false;
            } else {
                this.bgcolorR = "ghost";
                this.toRightOnoff = true;
            }
        },
        checkAllGroupR(val) {
            console.log(val);
            if (val.length > 0) {
                this.bgcolorL = "info";
                this.toLeftOnoff = false;
            } else {
                this.bgcolorL = "ghost";
                this.toLeftOnoff = true;
            }
        },
        dataL(val) {
            this.checkAllGroupOnoff = [];
            val.forEach(element => {
                this.checkAllGroupOnoff.push(element.bfunc_id);
            });
            this.checkAllGroup = [];
            this.$emit("dataLfn",val)
        },
        dataR(val) {
            this.checkAllGroupOnoffR = [];
            val.forEach(element => {
                this.checkAllGroupOnoffR.push(element.bfunc_id);
            });
            this.checkAllGroupR = [];
            this.$emit("dataRfn",val)
        },
        
    },
    created() {
        this.dataL.forEach(element => {
            this.checkAllGroupOnoff.push(element.bfunc_id);
        });
        this.dataR.forEach(element => {
            this.checkAllGroupOnoffR.push(element.bfunc_id);
        });
    },
    beforeUpdate(){
        console.log("trans--beforeUpdate-------",this.myFormData)
    },
    updated(){
        console.log("trans--updated-------",this.myFormData)
    },
    mounted(){
        this.list_logic_type = this.selbusinessListFn(selbusinessList,{prj_id:Common.GETprjid(this,Common)});
    },
}


</script>

<style lang="less" scoped>

.userStoryTitle{
    height:40px;
    line-height:40px;
    border:1px solid #d8d8d8;
    border-right:none; 
    border-left:0;
}
.transBodyL .userStoryTitle .userStoryName{
    float:left;
    width:58%;
    padding-left:10px;
}
.userStoryName{
    float:left;
    width:68%;
    padding-left:10px;
}
 .userStoryType{
    float:left;
    width:84px;
    text-align: center;
}
 .userStoryStatus{
    float:right;
    width:80px;
    text-align: center;
}

.container-transfer {
    width: 100%;
    margin: 0 auto;
    font-size: 14px;
}
.interation-tip {
    font-size: 12px;
    color: #909090;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #e0e0e0;
    margin-top: 30px;
    line-height: 20px;
}


.transBody {
    overflow: hidden;
   
    margin-top: 0px;
   
    padding: 10px 0 10px 10px;
    border:none;
    border-radius:2px;
    background:#e9eaec;
    
   

}
.transBodyL {
    /* flex-grow:1; */
    width: 100%;
    float: left;
    overflow: hidden;
    border: 1px solid #d8d8d8;
    border-radius: 2px;

    min-height:40vh;
    background:#fff;
    padding-top:6px;
}
.transBody h3 {
    height: 40px;
    line-height: 40px;
    text-indent: 10px;
    background: #f9fafc;
    margin-bottom: 10px;
}
.transBodyL li {
    /* margin-top: 20px; */
}

.transBodyC {
    width: 60px;
    float: left;
    overflow: hidden;
    margin: 0 10px;
    margin-top: 6vh;
    line-height: 40px;
}
.transBodyR {
    /* flex-grow:1; */
    width: 100%;
    float: left;
    overflow: hidden;
    border: 1px solid #d8d8d8;
    border-radius: 2px;

    min-height:40vh;
    background:#fff;
   
}
.trans-top {
    margin-top: 10px;
    padding-left: 8px;
    background:#f9f9f9;
    margin-bottom: 4px;
    margin-top: 4px;
}


.addTaskTable {
    padding:20px 10px 0;
    border: 1px solid #aae5d1;
    border-radius: 2px;
    background: #edf6fb;

}
.taskrow {
    height: 30px;
}
.tranHeader {
    padding: 10px;
    background: #f5f5f5;
    border-bottom:none;
    font-size:12px;
    padding-right:0;
    padding-top:6px;
    padding-bottom: 6px;
    overflow: hidden;
}
/*
.tranHeader .more{
   padding:4px 8px; background:#f9f9f9;
   position: relative;
   top: -4px
}
.tranHeader:hover {
    background:#f9f9f9
}
*/
.tranHeader .ivu-icon {
    float: right;
    cursor: pointer;
    padding:0px 8px;
}
.totalNum {
    margin-right: 10px;
    color: #00bcd5;
    font-weight: normal;
    font-size: 14px;
}
.infoGroup {
}
.ivu-checkbox{margin-right:6px;}
.storyBottom{
    border-top:2px dotted  #d8d8d8;
}
.translist{
    display:block;
    margin-right:80px;
    padding-top:5px;
}


.bottomAddBtnBox{
    clear:both;
    padding-top:10px;
}
</style>

