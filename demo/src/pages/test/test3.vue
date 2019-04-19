<template>
    <Form    >
       
            <FormItem
                
                id="mydom"
                :ref="ITMitem.AddGroupList[0]+'0'" 
                :class="ITMitem.AddGroupList[0]+'0'"
                >
                <Select v-model="ITMitem.AddGroupList[0].group" :id="'sel'+'0'" clearable filterable :loading="inputLoad"   :placeholder="'请输入内容并选择【'+ITMitem.AddGroupList[0].myLabel+'】'">
                    <Option v-for="(item,index2) in ITMitem.AddGroupList[0].groupList" :value="item.value" :key="index2">
                        {{ item.label }}
                    </Option>
                </Select>
            </FormItem>
       
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
        
        "ITMitem.AddGroupList"(curVal,oldVal){
            let _this = this;
            if(curVal){
                Common.changeArrSingle(this,curVal,Common,projectAddGroup,this.projectGroupFn,"mydom")//下拉样子
            }
        },
        ITMitem: {
            handler(val, oldVal) {
                if(val){
                    Common.inputArr(this,val)//下拉样子
                }
            },
            deep: true
        },
        
       
    },
    beforecreated(){
        console.log("selectSerch--beforecreated-------",this.ITMitem.AddGroupList)
    },
    created(){
        console.log("selectSerch--created-------",this.ITMitem.AddGroupList);
        this.addCheckSerch();
    },
    beforeUpdate(){
        console.log("selectSerch--beforeUpdate-------",this.ITMitem.AddGroupList)
    },
    updated(){
        console.log("selectSerch--updated-------",this.ITMitem.AddGroupList)
    },
    computed: {
       
    },

    data () {
        return {
            ITMitem: {
                AddGroupList:[],
            },
            inputLoad:false,
        }
    },
    mounted(){
        
    },
    
    methods: {
       
        addCheckSerch(URL,params = {},Arr=[]){
            let _tempObj = {
                myRef: "selfRef",
                group: "",
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
            this.ITMitem.AddGroupList.push(_tempObj);  
        },
        
        projectGroupFn(URL,params = {},ARR,thatEle){
            defaultAXIOS(URL,params,{timeout:60000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======【checkSearch Allgroup】***response+++",response,myData,"====>");
                this.inputLoad = false;
                this.ITMitem.AddGroupList[ARR].groupList = [];
                if(typeof(ARR)  == "number"){
                    if(thatEle && thatEle.temp && thatEle.temp.length){
                        let _tempArr = Common.returnDelArr(this.ITMitem.AddGroupList[ARR].group,myData.data.list);
                        this.ITMitem.AddGroupList[ARR].groupList.push(...thatEle.temp,..._tempArr);

                    }else{
                        this.ITMitem.AddGroupList[ARR].groupList.push(...myData.data.list);
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


