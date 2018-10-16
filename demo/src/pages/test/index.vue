<template>
    <Form ref="formValidate" :model="formValidate"   >
        <div v-for="(myItem,index) in formValidate.AddGroupList" :key="index" >
            <FormItem 
                :label-width="320"
                :label="myItem.myLabel" 
                :prop="'AddGroupList.'+index+'.group'"
                :rules="{required: myItem.required, type: 'array', message: '请选择或者填写'+myItem.myLabel+'，不能为空！', trigger: 'change'}" 
                 
                :ref="myItem.myRef+index" 
                :class="myItem.myRef+index"
                >
                <Select v-model="myItem.group" :id="'sel'+index" filterable :loading="inputLoad"  multiple :placeholder="'请输入内容并选择【'+myItem.myLabel+'】'">
                    <Option v-for="(item,index2) in myItem.groupList" :value="item.value" :key="index2">
                        {{ item.label }}
                    </Option>
                </Select>
            </FormItem>
        </div>
    </Form>
</template>
<script>


import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {projectAddGroup} = Common.restUrl;
import Store from '@/vuex/store'



export default {
    props: {
        
    },
    watch:{
        "formValidate.AddGroupList"(curVal,oldVal){
            let _this = this;
            if(curVal){
                Common.changeArr(this,curVal,Common,projectAddGroup)//下拉样子
            }
        },
        formValidate: {
            handler(val, oldVal) {
                if(val){
                    Common.inputArr(this,val)//下拉样子
                    
                }
            },
            deep: true
        },
    },
    beforecreated(){
        console.log("selectSerch--beforecreated-------",this.formValidate)
    },
    created(){
        console.log("selectSerch--created-------",this.formValidate)
    },
    beforeUpdate(){
        console.log("selectSerch--beforeUpdate-------",this.formValidate)
    },
    updated(){
        console.log("selectSerch--updated-------",this.formValidate)
    },
    computed: {
       
    },

    data () {
        return {
            formValidate: {
                AddGroupList:[],
            },
            inputLoad:false,
        }
    },
    mounted(){
        this.addCheckSerch();
    },
    
    methods: {
       
        addCheckSerch(URL,params = {},Arr=[]){
            let _tempObj = {
                myRef: "selfRef",
                group: [],
                groupList: [],
                myLabel: "项目经理",
                myValue: "xmjl",
                delBtn: false,
                groupName: "",
                required: true,
                modaAdd:false,//修改添加角色
                grouptemp:[],//修改添加角色
                groupListtemp: [],//修改添加角色
                myReftemp: "selfRefRole",//修改添加角色
            }
            this.formValidate.AddGroupList.push(_tempObj);  
        },
        
        projectGroupFn(URL,params = {},ARR,thatEle){
            defaultAXIOS(URL,params,{timeout:60000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======【checkSearch Allgroup】***response+++",response,myData,"====>");
                this.inputLoad = false;
                this.formValidate.AddGroupList[ARR].groupList = [];
                if(typeof(ARR)  == "number"){
                    if(thatEle && thatEle.temp && thatEle.temp.length){
                        let _tempArr = Common.returnDelArr(this.formValidate.AddGroupList[ARR].group,myData.data.list);
                        this.formValidate.AddGroupList[ARR].groupList.push(...thatEle.temp,..._tempArr);

                    }else{
                        this.formValidate.AddGroupList[ARR].groupList.push(...myData.data.list);
                    }
                }
            }).catch( (error) => {
                console.log(error);
                this.inputLoad = false;
                this.showError(error);
            });   
        },
      
        showError(ERR){
            Common.ErrorShow(ERR,this);

        },
    }

}
</script>
<style lang="less" scoped>

</style>


