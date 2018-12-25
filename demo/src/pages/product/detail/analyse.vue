<template>
    <div class="tableContBox">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140" style="min-height:300px;" >
            <Row>
                <Col span="21" id="serchReq" >
                    <!-- 搜索选择开始 -->
                        <div v-for="(myItem,index) in formValidate.AddGroupList" :key="index" >
                            <FormItem 
                                :label-width="100"
                                :label="myItem.myLabel" 
                                :prop="'AddGroupList.'+index+'.group'"
                                :rules="{required: myItem.required, type: 'array', message: '请选择或者填写'+myItem.myLabel+'，不能为空！', trigger: 'change'}" 
                                 
                                :ref="myItem.myRef+index" 
                                :class="myItem.myRef+index"
                                >
                                <Select
                                    :ref="myItem.myRef+index+'_sel'"
                                    :class="myItem.myRef+index+'_sel'"
                                    @on-change="selectChange" 
                                    @on-query-change="selectQueryChange"
                                    v-model="myItem.group" 
                                    :id="'sel'+index" 
                                    filterable 
                                    :loading="inputLoad"  
                                    multiple 
                                    label-in-value
                                    :placeholder="'请输入内容并选择【'+myItem.myLabel+'】'"
                                    :disabled = "serchDisabled"
                                    >
                                    <Option v-for="(item,index2) in myItem.groupList" :value="item.value" :label="item.label" :key="index2">
                                        {{ item.label }}
                                    </Option>
                                </Select>
                            </FormItem>
                        </div>
                    
                    <!-- 搜索选择结束 -->
                </Col>
                <Col span="3">
                    &nbsp;&nbsp;<Button type="success" @click="addBus()">新增业务功能</Button>
                </Col>
            </Row>
            <Table border :columns="columns3" :data="tableData3"  />
            <div style="text-align:center;padding-top:10px;" v-if="false">
                <Button type="primary" :loading="modal_add_loading" @click="submitAdd">
                    <span v-if="!modal_add_loading">　　　　保存　　　　</span>
                    <span v-else>Loading...</span>
                </Button>
            </div>
        </Form>
        <Delpop
            @delpopClose = "delpopCloseFn"
            @delpopEnter = "delpopEnterFn" 
            :isShow = "delpopIsShow"
            :isLoading = "delpopIsLoading"
        />
        <Buspop 
            @buspopClose = "buspopCloseFn"
            :data="buspopData"
            :isShow = "buspopIsShow"
            :isLoading = "buspopIsLoading"
        />
    </div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const { userstoryAddBus,userstoryRelative,userstoryListBusfunc,userstorydelete } = Common.restUrl;
import Buspop from './buspop'
import Delpop from '@/components/delectAlert'
export default {
    props: {
        TASKID: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        Data: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        
    },
    data () {
        return {
            //查询搜索开始
            inputLoad:false,
            isPopsAdd:false,
            popsItem:false,
            serchDisabled:false,
            serchCurDelTagVal:false,
            serchCurDelTagNull:false,
            //查询搜索结束
            //关联业务开始
            columns3: [
                {
                    title: '编号',
                    key: 'bfunc_id',
                    align: 'center'
                },
                {
                    title: '名称',
                    key: 'label',
                    align: 'center',
                    
                },
                {
                    title: '逻辑子系统名称',
                    key: 'logic_sys_name',
                    align: 'center',
                },
                {
                    title: '修改时间',
                    key: 'create_date',
                    align: 'center',
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                domProps:{disabled:this.serchDisabled},
                                on: {
                                    click: () => {
                                        this.editBus(params.index);
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '2px',
                                    marginLeft: '2px',
                                },
                                on: {
                                    click: () => {
                                        this.busView(params.index);
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '2px',
                                    marginLeft: '2px',
                                },
                                domProps:{disabled:this.serchDisabled},
                                on: {
                                    click: () => {
                                        this.deleteBusFn(params.index);
                                    }
                                }
                            }, '删除'),
                            
                        ]);
                    }
                },
            ],
            tableData3: [],
            tableDataCur:false,
            tableData3Length:0,

            //关联业务结束
            ruleValidate: {
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
                AddGroupList:[],//搜索查询
                bfunc:[],//弹出业务窗口           
            },
            //业务弹出--start
            buspopIsShow:false,
            buspopIsLoading:false,
            buspopData:false,
            //业务弹出--end
            //删除弹出--start
            delpopIsShow:false,
            delpopIsLoading:false,
            //删除弹出--end
            modal_add_loading: false,
            
        }
    },
    methods: {
        //业务窗口 -start
        buspopCloseFn(B){
            this.buspopIsShow = B;
        },
        buspopOpenFn(B,i){
            this.buspopData = this.tableData3[i];
            this.buspopIsShow = B;
        },
        //业务窗口 -end
        //删除窗口 -start
        delpopCloseFn(B){
            this.delpopIsShow = B;
        },
        delpopEnterFn(B){
            let URL = userstorydelete;
            let params = {
                us_id:this.tableData3[this.tableDataCur].us_id || this.formValidate.userstory_id,
                bfunc_id:this.tableData3[this.tableDataCur].bfunc_id,
                version:this.tableData3[this.tableDataCur].version,
            }
            return defaultAXIOS(URL,params,{timeout:20000,method:'post'}).then((response) => {
                let myData = response.data;
                console.log("<======product 业务列表删除***response+++",response,myData,"======>");
                if(myData.status == "success"){
                    this.delpopIsLoading = B;
                    this.delpopIsShow = B;
                    this.deleteBus(this.tableDataCur)
                    this.Message("删除完成")
                    return Promise.resolve(myData.status)                    
                }else{
                    this.delpopIsLoading = B;
                    this.delpopIsShow = B;
                    this.error(myData.message)
                    return Promise.reject(myData.status);
                }
            }).catch( (error) => {
                console.log(error);
                this.delpopIsLoading = B;
                this.delpopIsShow = B;
                return Promise.reject(error);
                
            });
            
            
        },
        delpopOpenFn(B){
            this.delpopIsShow = B;
        },
        //删除窗口 -end
        //查询搜索开始
        modifyTagData(D){
            Common.ModifyTagData(D,this)
        },
        modifyData(v,i,is){
            //view edit add
        },
        leftData(D){
            this.formValidate.bfunc = D;
        },
        rightData(D){
        },
        selectQueryChange(ITEM){
            console.log(ITEM,"selectQueryChange")
        },
        selectChange(ITEM){
            console.log(ITEM,"selectChange",this.isPopsAdd ,this.popsItem );
            Common.SelectChange(this);
            //this.serchCurDelTagVal = false; //禁止删除功能--注释掉
            if(this.isPopsAdd == "+"){
                this.serchCurDelTagVal = false;//禁止删除功能--增加
                this.selfChangeItemAdd(this.popsItem,this.formValidate.AddGroupList[0].groupList,this.tableData3);
            }else if(this.isPopsAdd == "-"){
                //this.selfChangeItemRemove(this.popsItem,this.tableData3)//禁止删除功能--注释掉
            }
        },
        addCheckSerch(){
            if(!this.formValidate.AddGroupList.length){
                return Common.AddCheckSerch(this,"已有业务功能","xxxxx",false,false,"");    
            }else{
                return Promise.reject(this.formValidate.AddGroupList);
            }
        },
        projectGroupFn(URL,params = {},ARR,thatEle){
            let OBJ = {
                busTable:this.tableData3,
            }
            Common.ProjectGroupFN(defaultAXIOS,this,URL,params,ARR,thatEle,OBJ);
        },
        unique(arr1 = [],arr2 = []){
            let Num = [];
            let fn = (val,Arr)=>{
                let Index = Arr.findIndex(item => item.value == val);
                return Index != -1 ? Index : false;
            }
            for(let i=0;i<arr1.length;i++){
                if(fn(arr1[i].value,arr2) !== false){
                    Num.push(arr1[i].value)
                }
            }
            return Num
        },
        //查询搜索结束
        //相关业务功能列表--start
        Message(MSG = "保存完成"){
            Common.CommonMessage(this,MSG)
        },
        error(MSG = "错误") {
            Common.CommonError(this,MSG)
        },
        viewBusData(URL,refresh){
            let _params = {prj_id:Common.GETprjid(this,Common),us_id:this.formValidate.userstory_id,req_id:this.formValidate.req_id,}
            return defaultAXIOS(URL,_params,{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======product 获取业务功能列表 ***response+++",response,myData,"======>");
                if(myData.status == "success" || myData.status == 200){
                    if(myData.data && myData.data.list && Array.isArray(myData.data.list)){
                        this.tableData3 = myData.data.list;
                        return Promise.resolve(myData.data.list)    
                    }else{
                        return Promise.reject(URL+"错误");
                    }
                }else{
                    return Promise.reject(myData.status);
                }
            }).catch( (error) => {
                console.log(error);
                return Promise.reject(error);
                
            });
            
        },
        submitAdd(){
            this.modal_add_loading = true;
            this.saveBusData(userstoryRelative,this.tableData3).then((res)=>{
                this.modal_add_loading = false;
                this.Message();
                this.removeMenuData(0);

                
                this.viewBusData(userstoryListBusfunc).then(()=>{},(error)=>{
                    this.showError(error)
                })
                

            },(error)=>{
                this.showError(error)
            })
        },
        removeMenuData(N = 0){
            this.formValidate.AddGroupList[N].group = [];
            this.formValidate.AddGroupList[N].groupList = []
            this.formValidate.AddGroupList[N].groupListtemp = [];
            this.formValidate.AddGroupList[N].grouptemp = [];
            document.getElementById("sel"+N).getElementsByClassName("ivu-select-input")[0].temp = false;
            delete document.getElementById("sel"+N).getElementsByClassName("ivu-select-input")[0].temp;
        },
        cacheMenuData(N = 0){
            return false;
            let cache = {
                group: this.formValidate.AddGroupList[N].group,
                groupList:this.formValidate.AddGroupList[N].groupList,
                groupListtemp:this.formValidate.AddGroupList[N].groupListtemp,
                grouptemp:this.formValidate.AddGroupList[N].grouptemp,
                temp:document.getElementById("sel"+N).getElementsByClassName("ivu-select-input")[0].temp,
            }
            return this.formValidate.AddGroupList[N].group.length ? JSON.stringify(cache) : false
        },
        setCacheMenuData(N = 0){
            if(Common.GetSession("cacheMenu")){
                let cache = JSON.parse(Common.GetSession("cacheMenu"));
                this.formValidate.AddGroupList[N].group = cache.group;
                this.formValidate.AddGroupList[N].groupList = cache.groupList
                this.formValidate.AddGroupList[N].groupListtemp = cache.groupListtemp;
                this.formValidate.AddGroupList[N].grouptemp = cache.grouptemp;
                document.getElementById("sel"+N).getElementsByClassName("ivu-select-input")[0].temp = cache.temp; 
                Common.RemoveSession("cacheMenu");
            }
        },

        saveBusData(URL,list){
            return defaultAXIOS(URL,{list},{timeout:20000,method:'post'}).then((response) => {
                let myData = response.data;
                console.log("<======product 业务列表提交***response+++",response,myData,"======>");
                if(myData.status == "success"){
                    return Promise.resolve(myData.status)                    
                }else{
                    return Promise.reject(myData.status);
                }
            }).catch( (error) => {
                console.log(error);
                return Promise.reject(error);
                
            });
        },

        addBus(){
            let detail_id = this.$router.history.current.query.detail_id;
            let us_id = this.formValidate.userstory_id;
            let req_id = this.formValidate.req_id;
            this.$router.push({path:'/product/business/add/',query:{detail_id,us_id,req_id}});
        },
        busView(i){
            this.buspopOpenFn(true,i)
            //this.buspopIsShow = true;
        },
        editBus(i){


            let detail_id = this.$router.history.current.query.detail_id;
            let _query = {detail_id,tabNum:i}
            if(this.cacheMenuData(0)){
                _query.menu = this.cacheMenuData(0)
            }
            let addus_id = (arr)=>{
                if(!arr.us_id){arr.us_id = this.formValidate.userstory_id};
                arr.req_id = this.formValidate.req_id
                return arr;
            }
            _query.data = JSON.stringify(addus_id(this.tableData3[i]));
            //_query.data = JSON.stringify(this.tableData3[i]);
            this.$router.push({path:'/product/business/edit/',query:_query});
        },
        deleteBus(i){
            let list = this.formValidate.AddGroupList[0].group;
            let Index = list.findIndex(item => item == this.tableData3[i].value )
            if(Index >= 0){
                list.splice(Index,1);
                this.formValidate.AddGroupList[0].grouptemp = list;    
            }
            this.serchCurDelTagVal = this.tableData3[i].value;
            this.serchCurDelTagNull = Index;
            this.tableDataCur = false;

            this.tableData3.splice(i,1);
            this.tableData3Length = this.tableData3.length;

            if(window.location.port == "9000"){
                return;    
            }
            this.viewBusData(userstoryListBusfunc).then(()=>{
                this.tableData3Length = this.tableData3.length;
                this.setCacheMenuData();
            },(error)=>{
                this.showError(error);
            })

        },
        deleteBusFn(i){

            this.delpopOpenFn(true);
            this.tableDataCur = i;
        },
        selfChangeItemAdd(value = "",List = [],data = []){
            let Fn1 = (val,arr)=>{
                let _temp = arr.find((item)=>{
                    return val == item.value
                });
                data.unshift(_temp);
            }
            Fn1(value,List)
        },
        selfChangeItemRemove(val = "",data = []){
            let Index = data.findIndex(item =>  item.value == val  )
            
            if(Index != -1){
                data.splice(Index,1)
            }
        },
        saveBusListData(URL,params = {}){
            return defaultAXIOS(URL,params,{timeout:20000,method:'post'}).then((response) => {
                let myData = response.data;
                console.log("<======product 业务列表添加、删除***response+++",response,myData,"======>");
                if(myData.status == "success"){
                    return Promise.resolve(myData.status)                    
                }else{
                    return Promise.reject(myData.status);
                }
            }).catch( (error) => {
                console.log(error);
                return Promise.reject(error);
                
            });
        },
        busListAdd(params){
            if(!params.value){
                if(params.value !== 0){
                    this.serchDisabled = false;
                    document.getElementsByClassName("ivu-select-dropdown")[0].removeAttribute("id");
                    this.serchCurDelTagVal = false;
                    return
                }
            }

            this.saveBusListData(userstoryRelative,params).then((res)=>{
                this.Message((val=>val == "minus" ? "删除成功":"添加成功")(params.add));
                this.serchDisabled = false;
                document.getElementsByClassName("ivu-select-dropdown")[0].removeAttribute("id");
                this.serchCurDelTagVal = false;
                this.serchCurDelTagNull = false;

                if(window.location.port == "9000"){
                    return;    
                }
                this.viewBusData(userstoryListBusfunc,true).then(()=>{},(error)=>{
                    this.showError(error)
                })
                

            },(error)=>{
                this.error();
                this.showError(error);
                this.serchDisabled = false;
                document.getElementsByClassName("ivu-select-dropdown")[0].removeAttribute("id");
                this.serchCurDelTagVal = false;
            })
        },
        //相关业务功能列表--end
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
    },
    watch: {
        TASKID(){
        },
        "Data.userstory_id"(){
            this.formValidate = this.Data;
            setTimeout(()=>{
                if(this.Data.userstory_id && this.TASKID){
                    this.viewBusData(userstoryListBusfunc).then(()=>{
                        this.tableData3Length = this.tableData3.length;
                        this.setCacheMenuData();
                    },(error)=>{
                        this.showError(error);
                    })
                    this.addCheckSerch().then((res)=>{},(error)=>{});//搜索查询    
                }    
            },1)
        },
        //查询搜索开始
        "formValidate.AddGroupList"(curVal,oldVal){
            let _this = this;
            if(curVal){
                Common.changeArr(this,curVal,Common,userstoryAddBus,{prj_id:Common.GETprjid(this,Common)})//下拉样子
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
        //查询搜索结束
        tableData3(curVal,oldVal){
            //console.log(curVal,oldVal,"tableData3",curVal.length - this.tableData3Length)
            if(curVal.length - this.tableData3Length <= 1 && curVal.length - this.tableData3Length >= -1){
                if(curVal.length - this.tableData3Length != 0){
                    document.getElementsByClassName("ivu-select-dropdown")[0].setAttribute("id","hidden");
                    this.serchDisabled = true;

                    let params = {
                        prj_id:Common.GETprjid(this,Common),
                        us_id:this.formValidate.userstory_id,
                        req_id:this.formValidate.req_id,
                    }
                    let setPro = (Obj,name)=>{
                        let V = "";
                        if(Obj && Obj[name]){
                            V = Obj[name];
                        }
                        return V
                    }
                    if(this.serchCurDelTagVal !== false){
                        params.add = "minus";
                        params.value = this.serchCurDelTagVal;
                        let myObj = Common.checkValToObj(this.serchCurDelTagVal,this.formValidate.AddGroupList[0].groupList);
                        params.who = setPro(myObj,"who");
                    }else if(curVal.length - this.tableData3Length > 0){
                        params.add = "plus";
                        params.value = this.popsItem;
                        let myObj = Common.checkValToObj(this.popsItem,this.formValidate.AddGroupList[0].groupList);
                        params.who = setPro(myObj,"who");
                        params.bfunc_name = setPro(myObj,"bfunc_name");
                    }else if(curVal.length - this.tableData3Length < 0){
                        params.add = "minus";
                        params.value = this.popsItem;
                        let myObj = Common.checkValToObj(this.popsItem,this.formValidate.AddGroupList[0].groupList);
                        params.who = setPro(myObj,"who");
                    }
                   


                    this.busListAdd(params);
                    this.serchCurDelTagVal = false;
                    


                }
            }
            this.tableData3Length = curVal.length;
        },
        
    },
    created() {
        
    },
    beforeUpdate(){
        console.log("需求分析--beforeUpdate-------",this.formValidate)
    },
    updated(){
        console.log("需求分析--updated-------",this.formValidate)
    },
    mounted(){
        setTimeout(()=>{
            if(this.TASKID && this.Data.userstory_id){
                this.formValidate = this.Data;
                this.viewBusData(userstoryListBusfunc).then(()=>{
                    this.tableData3Length = this.tableData3.length;
                    this.setCacheMenuData();
                },(error)=>{
                    this.showError(error);
                })
                this.addCheckSerch().then((res)=>{},(error)=>{});//搜索查询
            }
        },1)
    },
    components: {
        Buspop,
        Delpop,

    },
}


</script>

<style lang="less" scoped>

</style>

