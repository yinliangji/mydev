<template>
        <Modal 
            
            ref="mySwitch" 
            
            v-model="isMyShow" 
            :loading="modal_add_loading"
            title="转立项"

            @on-ok="submitRole()"  
            :ok-text="okBtnTxt"
            @on-cancel="cancelRole()"
            @on-visible-change="changeRole"

            >
            
           

            <table class="ITMtable">
                <tr>
                    <th>项目名称</th><td><p>{{ ITMtable.prj_name | FALSEINFO}}</p></td>
                </tr>
                <tr>
                    <th>项目编号</th><td><p>{{ ITMtable.prj_id | FALSEINFO}}</p></td>
                </tr>
                <!-- <tr>
                    <th>项目描述</th><td><p>{{ ITMtable.msg | FALSEINFO}}</p></td>
                </tr> -->
            </table>
            
            <p :class="isShowTxt?'opacityTrue':'opacityFalse'">{{ ITMtable.msg | FALSEINFO}}</p>
        </Modal>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {projectAddGroup,importITMyes,importITMno,getITMtable,syncSearch,Switch} = Common.restUrl;
export default {
    name: 'itm',
    props: {
        Data: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        isShow: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
    },
    watch:{
        Data(data){
            this.showTableTxt(data)
        },
        isShow(data) {
            this.isMyShow = data;
            if(data){
                this.initAlertTxt();
                this.outinITM();
            }
        },
        
    },

    beforeUpdate(){
        console.log("beforeUpdate---itm导入弹出框----",this.ITMitem,this.ITMtable)
    },
    updated(){
        console.log("updated----itm导入弹出框---",this.ITMitem,this.ITMtable)
    },
    data () {
        return {
            isMyShow:false,
            ITMitem:{
                AddGroupList:[],
            },
            ITMtable:{
                prj_name:"",
                prj_id:"",
                desc:"",
                msg:"",
                isExist:"",
                id:"",
            },
            inputLoad:false,
            modal_add_loading:true,
            isShowTxt:false,
            okBtnTxt:"转立项",
        }
    },
    mounted(){
        this.isMyShow = this.isShow;
        this.showTableTxt(this.Data)
    },
    methods: {
        showTableTxt(data){
            if(data && Array.isArray(data) && data.length){
                this.ITMtableTxt("");
                this.ITMtable.prj_name = data[0].prj_name;
                this.ITMtable.prj_id = data[0].prj_id;
                this.ITMtable.id = data[0].id;
            }else{
                this.ITMtableTxt("");
            }
        },
        initAlertTxt(){
            this.isShowTxt = false;
            this.okBtnTxt = "转立项";
            modal_add_loading:true;
        },
        cleanITM(){
            this.ITMitem.AddGroupList = [];
            //this.ITMtableTxt("");
        },
        openChange(isShow){
            console.log(isShow)
        },
        ITMtableTxt(TXT = "没有数据"){
            for(let I in this.ITMtable){
                this.ITMtable[I] = TXT;
            }
        },
        
        getITMtableFn(URL,params = {}){
            if(params.prj_id){
                defaultAXIOS(URL,params,{timeout:5000,method:'get'}).then((response) => {
                    let myData = response.data;
                    console.log("<======agile ITMtable***response+++",response,myData,"======>");
                    if(myData.status == "success"){
                        for(let I in this.ITMtable){
                            if(myData.data[I]){
                                this.ITMtable[I] = myData.data[I];
                            }
                        }
                        this.ITMtable.msg = this.ITMtable.msg? this.ITMtable.msg : "有风险，添加请谨慎!"
                        this.ITMtable.prj_id = params.prj_id;
                        this.ITMtable.prj_name = params.prj_name;
                        if(myData.data && myData.data.isExist == "no"){
                            this.okBtnTxt = "确认转立项";
                        }else{
                            this.okBtnTxt = "转立项";
                        }
                    }else{
                        this.showError(URL+"错误");
                        this.ITMtableTxt("加载错误");
                    }
                    
                }).catch( (error) => {
                    console.log(error);
                    this.showError(error);
                    this.ITMtableTxt("加载错误");
                });
            }else{
                this.ITMtableTxt("");
            }
        },
        queryChange(val){
        },
        changeRole(is){
            this.$emit("toItmClose",is);
        },
        cancelRole(i,name,fromName){
            this.$emit("toItmClose",false);
        },
        submitRole(i,name,fromName){
            this.modal_add_loading = true;
            this.$nextTick(() => {
              this.modal_add_loading = true;
            });
            this.submitAddData(this);
        },
        submitAddData(that){
            this.initAlertTxt();
            let tempData = {
                id:this.ITMtable.id,
                prjId:this.ITMtable.id,
                prjSn:this.ITMtable.prj_id,
                prj_id:this.ITMtable.prj_id,
                username:Common.getStorageAndCookie(this,Common,"username"),
            }
            let URL = Switch;
            defaultAXIOS(URL,tempData,{timeout:5000,method:'post'}).then((response) => {
                let myData = response.data;
                console.log("<======agile ITMAdd***response+++",response,myData,"======>");
                if(myData.status == "success"){
                    this.modal_add_loading = false;
                    this.$emit("toItmClose",false,myData.status);
                    
                }else{
                    this.modal_add_loading = false;
                    this.showError(URL+"错误");
                    this.$emit("toItmClose",false,myData.message);
                }
                
            }).catch( (error) => {
                console.log(error);
                this.modal_add_loading = false;
                this.showError(error);
                this.$emit("toItmClose",false,JSON.stringify(error));
            });

        },
        outinITM(){
            this.cleanITM();

            if(!this.ITMitem.AddGroupList.length){
                this.ITMitem.AddGroupList.push({
                    myRef:"selfRef",
                    group:[],
                    groupList:[],
                    myLabel:"自研转立项",
                    delBtn:false,
                    groupName:"",
                    required:true,
                    modaAdd:true,//修改添加角色
                    grouptemp:[],//修改添加角色
                    groupListtemp: [],//修改添加角色
                    myReftemp: "selfRefRole",//修改添加角色
                })
            }
        },
        projectGroupFn2(URL,params = {},ARR,thatEle){

            params.prj_name = params.userName;
            params.prj_id = "";
            Common.ProjectGroup2(defaultAXIOS,this,URL,params,ARR,thatEle,this.ITMitem,this.addSelectEleList);
        },
        addSelectEleList(ARR,thatEle,dataList){
            if(typeof(ARR)  == "number"){
                if(thatEle && thatEle.temp && thatEle.temp.length){
                    let _tempArr = Common.returnDelArr(this.ITMitem.AddGroupList[ARR].grouptemp,dataList);

                    let _tempArr2 = [];
                    _tempArr2.push(...thatEle.temp,..._tempArr);
                    let _tempArr3 = Common.returnDelArr(this.ITMitem.AddGroupList[ARR].group,_tempArr2);
                   
                    this.ITMitem.AddGroupList[ARR].groupListtemp.push(..._tempArr3);

                }else{
                    let _tempArr4 = Common.returnDelArr(this.ITMitem.AddGroupList[ARR].group,dataList);
                    this.ITMitem.AddGroupList[ARR].groupListtemp.push(..._tempArr4);
                }
            }else{
                this.showError("addSelectEleList的参数ARR不是数字");
            }

        },
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
    }

}
</script>
<style lang="less" scoped>
.ITMtable {
    width:100%;
    margin-bottom:10px;
}
.ITMtable td, .ITMtable th{
    box-sizing: border-box;
    
    border: 1px solid #e9eaec;
    height: 1.5em;

    

    vertical-align:middle;
    box-sizing: border-box;
    /*
    border: 1px solid white;
    */
}
.ITMtable td{
    padding-left:0.5em;
    padding-top:0.5em;
    padding-bottom:0.5em;
    color:#495060;
    font-size:12px;
    line-height: 1.5em;
}
.ITMtable td p {
    width:100%;
     word-wrap: break-word; 
     word-break:break-all;
         height: 1.5em;
    overflow: hidden;

}
.ITMtable th{
    font-weight: normal;
    
    
    font-size:14px;
    background-color: #2db7f5;
    color: #fff;
    
    
    text-align: right;
    padding-right: 18px;
    width:20%;
}
.opacityTrue{
    color:red;
    opacity: 1;

}
.opacityFalse{
    color:red;
    opacity: 0;
}
</style>