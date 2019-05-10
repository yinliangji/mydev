<template>
    <div>
        <Modal 
            v-for="(myItem,index) in ITMitem.AddGroupList" :key="index"
            :ref="myItem.myReftemp+index" 
            :class="myItem.myReftemp+index" 
            v-model="myItem.modaAdd" 
            :title="myItem.myLabel+''" 
            :loading="modal_add_loading"

            @on-ok="submitRole(index,myItem.myRef+index,'formITMitem'+index)"  
            :ok-text="okBtnTxt"
            @on-cancel="cancelRole(index,myItem.myRef+index,'formITMitem'+index)"
            @on-visible-change="changeRole"

            >
            <!-- :prop="myItem.grouptemp" -->
            <!-- :prop="'ITMitem.AddGroupList.'+index+'.grouptemp'" -->
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
            <Form :label-width="100"  :ref="'formITMitem'+index" :model="ITMitem">
                <FormItem 
                    :label="myItem.myLabel"
                    :prop="'AddGroupList.'+index+'.grouptemp'"
                    :rules="{required: true, type: 'array', message: '请选择或者填写'+myItem.myLabel+'，不能为空！', trigger: 'change'}" 
                     
                    :ref="myItem.myRef+index" 
                    :class="myItem.myRef+index"
                    >
                    <Select 
                        @on-query-change="queryChange"
                        @on-change="selChange"
                        @on-open-change="openChange"
                        v-model="myItem.grouptemp" 
                        :id="'sel'+index" 
                        filterable 
                        multiple
                        :loading="inputLoad" 
                        :placeholder="'请输入内容并选择【'+myItem.myLabel+'】'"
                        >
                        <Option v-for="(item,index2) in myItem.groupListtemp" :value="item.value" :key="index2">
                            {{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
            <p :class="isShowTxt?'opacityTrue':'opacityFalse'">{{ ITMtable.msg | FALSEINFO}}</p>
        </Modal>
    </div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {projectAddGroup,getITMtable,Switch,findItm} = Common.restUrl;
export default {
    name: 'itm',
    props: {
        isShow: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        Data: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return [];
            }
        },
    },
    watch:{
        Data(data) {
            if(data){
                this.formValidateData = data;
            }else{
                this.formValidateData = [];
            }
        },
        isShow(data) {
            if(data){
                this.initAlertTxt("确定");
                this.outinITM();
            }
        },
        "ITMitem.AddGroupList"(curVal,oldVal){
            let _this = this;
            if(curVal){
                Common.changeArr2(this,curVal,Common,findItm,this.projectGroupFn2)//修改添加角色
            }
        },
        ITMitem: {
            handler(val, oldVal) {
                if(val){
                    if(val.AddGroupList[0].grouptemp.length == 1){
                    }
                    Common.inputArr2(this,val)//修改添加角色
                }
            },
            deep: true
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
            ITMitem:{
                AddGroupList:[],
            },
            ITMtable:{
                prj_name:"",
                prj_id:"",
                desc:"",
                msg:"",
                isExist:"",
                isSwitch:"",

            },
            inputLoad:false,
            modal_add_loading:true,
            isShowTxt:true,
            okBtnTxt:"",
            formValidateData:[],
        }
    },
    mounted(){
        if(this.Data) {
            this.formValidateData = this.Data;
        }else{
            this.formValidateData = [];
        }
    },
    methods: {
        initAlertTxt(BtnTxt){
            this.isShowTxt = true;
            this.okBtnTxt = BtnTxt ? BtnTxt : "转立项";
            modal_add_loading:true;
        },
        cleanITM(){
            this.ITMitem.AddGroupList = [];
            this.ITMtableTxt("");
        },
        openChange(isShow){
            console.log(isShow)
        },
        ITMtableTxt(TXT = "没有数据"){
            for(let I in this.ITMtable){
                this.ITMtable[I] = TXT;
            }
        },
        selChange(val){
            let _val = val[val.length-1];
            this.ITMitem.AddGroupList[0].grouptemp = [];
            this.ITMitem.AddGroupList[0].grouptemp.push(_val);

            let _obj = this.ITMitem.AddGroupList[0].groupListtemp.find(item => item.value == _val);

            this.ITMtableTxt("加载中......");
            this.initAlertTxt("加载中");
            
            Common.throttle(
                (value, THIS) => {
                    THIS.getITMtableFn(getITMtable,{prj_id:value,prj_name:_obj?_obj.prj_name : ""})
                },
                this,
                1500,
                _val,
                2000
            )();
            //
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
                        this.ITMtable.msg = this.ITMtable.msg? this.ITMtable.msg : "有风险，操作请谨慎!"
                        this.ITMtable.prj_id = params.prj_id;
                        this.ITMtable.prj_name = params.prj_name;
                        if(myData.data && (myData.data.isSwitch == "no" || !myData.data.isSwitch) ){
                            this.okBtnTxt = "不能转立项，选择其他";
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
            this.$refs[fromName][i].resetFields();
        },
        submitRole(i,name,fromName){
            let _isSwitch = this.ITMtable.isSwitch;
            if(_isSwitch != "yes"){
                this.modal_add_loading = false;
                setTimeout(()=>{
                    this.$nextTick(() => {
                      this.modal_add_loading = true;
                    });
                },300)
                return
            }
            
            this.modal_add_loading = false;
            setTimeout(()=>{
                this.$nextTick(() => {
                  this.modal_add_loading = true;
                });
            },300)
            

            this.$refs[fromName][i].validate((valid)=>{//验证
                if(valid){
                    this.modal_add_loading = true;
                    this.$nextTick(() => {
                      this.modal_add_loading = true;
                    });
                    this.submitAddData(i,fromName,this.ITMitem.AddGroupList[i],this,this.ITMitem.AddGroupList[i].grouptemp,_isSwitch);
                }
            })
        },
        submitAddData(i,fromName,obj,that,group,isSwitch){
            this.initAlertTxt();
            let tempData = {
                prj_id:group[0],
                prjSn:group[0],
                current_prjSn:this.formValidateData[0].prj_id,
                prj_name:(obj.groupListtemp.find(item=>item.value == group[0]) || {}).prj_name || "",
                username:Common.getStorageAndCookie(this,Common,"username"),
                current_prjId:this.formValidateData[0].id,
            }
            let URL = Switch;
            defaultAXIOS(URL,tempData,{timeout:5000,method:'post'}).then((response) => {
                let myData = response.data;
                console.log("<======agile ITMAdd***response+++",response,myData,"======>");
                if(myData.status == "success"){
                    that.$refs[fromName][i].resetFields();
                    that.modal_add_loading = false;
                    obj.modaAdd = false;
                    that.$emit("toItmClose",false,myData.status);
                    
                }else{
                    obj.modaAdd = true;
                    that.modal_add_loading = false;
                    that.showError(URL+"错误");
                    this.$emit("toItmClose",false);
                }
                
            }).catch( (error) => {
                console.log(error);
                that.modal_add_loading = false;
                that.showError(error);
                that.$emit("toItmClose",false);
            });

        },
        outinITM(){
            this.cleanITM();
            if(!this.ITMitem.AddGroupList.length){
                this.ITMitem.AddGroupList.push({
                    myRef:"selfRef",
                    group:[],
                    groupList:[],
                    myLabel:"转立项项目",
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