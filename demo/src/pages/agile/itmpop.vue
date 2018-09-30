<template>
    <div>
        <Modal 
            v-for="(myItem,index) in ITMitem.AddGroupList" :key="index"
            :ref="myItem.myReftemp+index" 
            :class="myItem.myReftemp+index" 
            v-model="myItem.modaAdd" 
            :title="'添加'+myItem.myLabel+''" 
            :loading="modal_add_loading"

            @on-ok="submitRole(index,myItem.myRef+index,'formITMitem'+index)"  
            ok-text="添加"
            @on-cancel="cancelRole(index,myItem.myRef+index,'formITMitem'+index)"
            @on-visible-change="changeRole"

            >
            <!-- :prop="myItem.grouptemp" -->
            <!-- :prop="'ITMitem.AddGroupList.'+index+'.grouptemp'" -->
            <table class="ITMtable">
                <tr>
                    <th>项目名称</th><td><p>{{ ITMtable.name | FALSEINFO}}</p></td>
                </tr>
                <tr>
                    <th>项目编号</th><td><p>{{ ITMtable.num | FALSEINFO}}</p></td>
                </tr>
                <tr>
                    <th>项目描述</th><td><p>{{ ITMtable.desc | FALSEINFO}}</p></td>
                </tr>
            </table>
            <Form :label-width="80"  :ref="'formITMitem'+index" :model="ITMitem">
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
        </Modal>
    </div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {projectAddGroup,importITM,getITMtable} = Common.restUrl;
export default {
    name: 'itm',
    props: {
        isShow: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
    },
    watch:{
        isShow() {
            if(this.isShow){
                this.outinITM()
            }
        },
        "ITMitem.AddGroupList"(curVal,oldVal){
            let _this = this;
            if(curVal){
                Common.changeArr2(this,curVal,Common,projectAddGroup,this.projectGroupFn2)//修改添加角色
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
        console.log("beforeUpdate-------",)
    },
    updated(){
        console.log("updated-------",)
    },
    data () {
        return {
            ITMitem:{
                AddGroupList:[],
            },
            ITMtable:{
                name:"",
                num:"",
                desc:"",
            },
            inputLoad:false,
            modal_add_loading:true,
        }
    },
    mounted(){
        
    },
    methods: {
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
            this.ITMtableTxt("加载中......");
            Common.throttle(
                (value, THIS) => {
                    console.log(value);
                    THIS.getITMtableFn(getITMtable,{xxxxx:value})
                },
                this,
                1500,
                _val,
                2000
            )();
            //
        },
        getITMtableFn(URL,params = {}){
            if(params.xxxxx){
                defaultAXIOS(URL,params,{timeout:5000,method:'post'}).then((response) => {
                    let myData = response.data;
                    console.log("<======agile ITMtable***response+++",response,myData,"======>");
                    if(myData.status == "success"){
                        for(let I in this.ITMtable){
                            this.ITMtable[I] = myData.data[I];
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
            this.$emit("itmClose",is);
        },
        cancelRole(i,name,fromName){
            this.$refs[fromName][i].resetFields();
        },
        submitRole(i,name,fromName){
            this.$refs[fromName][i].validate((valid)=>{//验证
                this.modal_add_loading = false;
                this.$nextTick(() => {
                  this.modal_add_loading = true;
                });
                if(valid){
                    this.modal_add_loading = true;
                    this.$nextTick(() => {
                      this.modal_add_loading = true;
                    });
                    this.submitAddData(i,fromName,this.ITMitem.AddGroupList[i],this,this.ITMitem.AddGroupList[i].grouptemp);
                }
            })
            
        },
        submitAddData(i,fromName,obj,that,group){
            let tempData = {
                xxxxx:JSON.stringify(group),
            }
            //
            defaultAXIOS(importITM,tempData,{timeout:5000,method:'post'}).then((response) => {
                let myData = response.data;
                console.log("<======agile ITMAdd***response+++",response,myData,"======>");
                if(myData.status == "success"){
                    that.$refs[fromName][i].resetFields();
                    that.modal_add_loading = false;
                    obj.modaAdd = false;
                   
                    that.$emit("itmClose",false,"tableData");
                    
                }else{
                    obj.modaAdd = true;
                    that.modal_add_loading = false;
                    that.showError(importITM+"错误");
                    this.$emit("itmClose",false);
                }
                
            }).catch( (error) => {
                console.log(error);
                that.modal_add_loading = false;
                that.showError(error);
                that.$emit("itmClose",false);
            });
            //

        },
        outinITM(){
            this.cleanITM();
            if(!this.ITMitem.AddGroupList.length){
                this.ITMitem.AddGroupList.push({
                    myRef:"selfRef",
                    group:[],
                    groupList:[],
                    myLabel:"ITM项目",
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
</style>