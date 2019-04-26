<template>
    <div class="pageContent">
        <Card id="BoxPT">
            <div class="aglieBox">
                <h3 class="Title"><span>敏捷项目列表</span></h3>
                <Form ref="formValidate" class="formValidate">

                    <FormItem >
                        <Row class="serchInputBox">
                            <Col span="20">
                                <Row class="SerchBox">
                                    <Col span="2" style="text-align: center">项目名称</Col>
                                    <Col span="6">
                                        <FormItem >
                                            <Input clearable v-model="formValidate.prj_name" placeholder="输入项目名称"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="2" style="text-align: center">项目编号</Col>
                                    <Col span="6">
                                        <FormItem >
                                            <Input clearable v-model="formValidate.prj_id" placeholder="输入项目编号"></Input>
                                        </FormItem>
                                    </Col>
                                    


                                    <Col span="2" style="text-align: center">项目类型</Col>
                                    <Col span="6">
                                        <FormItem >
                                            <Select clearable v-model="formValidate.prj_type" placeholder="请选择项目类型">
                                                
                                                <Option v-for="(item,index) in prj_typeList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>

                                </Row>

                              

                                <Row class="SerchBox" v-show="isShowMoreShow">
                                    <Col span="2" style="text-align: center">项目经理</Col>
                                    <Col span="6">
                                        <FormItem
                                            id="prjManager"
                                            :ref="ITMitem.AddGroupList[0]+'0'" 
                                            :class="ITMitem.AddGroupList[0]+'0'"
                                            >
                                            <Select v-model="ITMitem.AddGroupList[0].group" :id="'sel'+'0'" clearable filterable :loading="inputLoad"   :placeholder="'请输入内容并选择【'+ITMitem.AddGroupList[0].myLabel+'】'">
                                                <Option v-for="(item,index2) in ITMitem.AddGroupList[0].groupList" :value="item.value" :key="index2">
                                                    {{ item.label }}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                        <!-- <FormItem >
                                            <Select clearable v-model="formValidate.icdp_projManager" placeholder="请选择项目经理">
                                                
                                                <Option v-for="(item,index) in icdp_projManagerList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem> -->
                                    </Col>
                                    <Col span="2" style="text-align: center">实施部门</Col>
                                    <Col span="6">
                                        <FormItem >
                                            <Select clearable filterable v-model="formValidate.stff_nm_id" placeholder="请选择部门">
                                                <Option v-for="(item,index) in stff_nm_idList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                     
                                    <Col span="2" style="text-align: center">提出部门</Col>
                                    <Col span="6">
                                        <FormItem >
                                            <Select clearable filterable v-model="formValidate.dept_nm_id" placeholder="请选择部门">
                                                <Option v-for="(item,index) in dept_nm_idList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    
                                    
                                    
                                    
                                    
                                </Row>
                                <!--
                                <Row class="SerchBox" v-show="isShowMoreShow">
                                    
                                    <Col span="2" style="text-align: center">开始时间</Col>
                                    <Col span="6">
                                        <FormItem >
                                            <DatePicker placement="bottom-start" type="date" format="yyyy-MM-dd"  placeholder="选择开始日期" v-model="formValidate.start_time" />
                                        </FormItem>
                                    </Col>
                                    <Col span="2" style="text-align: center">结束时间</Col>
                                    <Col span="6">
                                        <FormItem >
                                            <DatePicker placement="bottom-start" type="date" format="yyyy-MM-dd"  placeholder="选择结束日期" v-model="formValidate.end_time" />
                                        </FormItem>
                                    </Col>
                                    
                                    <Col span="3" style="text-align: center">教练</Col>
                                    <Col span="5">
                                       
                                        <FormItem >
                                            <Select clearable v-model="formValidate.icdp_agileCoach" placeholder="请选择教练">
                                               
                                                <Option v-for="(item,index) in icdp_agileCoachList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>

                                    <Col span="3" style="text-align: center"> 测试人员 </Col>
                                    <Col span="5">
                                        <FormItem >
                                            <Select clearable v-model="formValidate.icdp_testTeam" placeholder="请选择测试人员">
                                               
                                                <Option v-for="(item,index) in icdp_testTeamList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    
                                    <Col span="3" style="text-align: center">&nbsp;</Col>
                                    <Col span="5">
                                        &nbsp;
                                    </Col>
                                </Row> 
                                -->

                            </Col>
                            <Col span="4" style="text-align: left" class="serchBtnBox">
                                <Button type="primary" icon="ios-search" class="serchBtn" @click="serchAll">查询</Button>
                                <Button class="cancelSerchBtn" @click="cancelSerchAll">重置</Button>
                            </Col>
                            
                        </Row>

                        <div class="formValidateMoreBtnBox" :class="isShowMoreShow ?'arrUp':'arrDown'" @click="isShowMoreShow = !isShowMoreShow">
                            <Icon type="chevron-down" color="#fff" ></Icon>
                            <Icon type="chevron-down" color="#fff" ></Icon>
                        </div>
                        
                    </FormItem>

                </Form>

                <div class="tableBox">
                    <div class="tableBtnBox">
                        <Button 
                            type="success" 
                            :disabled="authIs(['icdp_projList_mng','icdp_projList_view'])" 
                            @click="addItemFn" 
                            >
                            添加自研项目
                        </Button>
                        <Button 
                            type="warning" 
                            :disabled="authIs(['icdp_projList_mng','icdp_projList_edit','icdp_projList_view'])" 
                            @click="editItemFn"
                            v-show="false"
                            >
                            编辑
                        </Button>
                        <Button 
                            type="error" 
                            :disabled="authIs(['icdp_projList_mng','icdp_projList_view'])" 
                            @click="deleteTableItem"
                            >
                            删除
                        </Button>
                        <Button 
                            type="info" 
                            :disabled="authIsAdmin(['SuperAdmin','PlainAdmin'])"
                            @click="outinITM" 
                            >
                            从ITM导入项目
                        </Button>
                    </div>
                    <Table border stripe  ref="selection" :columns="columns" :data="tableData" class="myTable" @on-select="onSelectFn" @on-select-all="onSelectAllFn" @on-selection-change="onSelectionChangeFn"></Table>

                   


                    <!-- <Button @click="handleSelectAll(true)" v-if="!allSelectTableRome">设置全选</Button>
                    <Button @click="handleSelectAll(false)" v-else>全部取消</Button> -->

                    <div class="pageBox" v-if="tableData.length">
                        <Page :current="tableDAtaPageCurrent" :total="tableDAtaTatol/tableDAtaPageLine > 1 ? (tableDAtaTatol%tableDAtaPageLine ? parseInt(tableDAtaTatol/tableDAtaPageLine)+1 : tableDAtaTatol/tableDAtaPageLine)*10 : 1" show-elevator @on-change="changeCurrentPage" @on-page-size-change="changePageSize"></Page>
                        <p>总共{{tableDAtaTatol}}条记录</p>
                    </div>
                </div>
            </div>
        </Card>
        <!-- <Modal v-model="modaDelete" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>确认删除？请点击删除按钮</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
            </div>
        </Modal> -->


        <Modal v-model="modaDelete" width="300">
            <p slot="header" style="color:#f60;text-align:center">
              <Icon type="ios-information-circle"></Icon>
              <span>删除确认</span>
            </p>
            <div style="text-align:center">
              <p>删除无法恢复，是否继续？</p>
            </div>
            <div slot="footer">
              <Button color="#1c2438"  :loading="modal_loading"  @click="del">删除</Button>
              <Button type="primary" @click="cancel">取消</Button>
            </div>
        </Modal>

       
        
         
        
        <ItmPop :isShow="isShowItm" @itmClose="itmCloseFn" />


        <ToItmPop :isShow="isShowToItem" @itmClose="toItemCloseFn" />

        <!-- <AddItemPop :isShow="isShowAddPop" :isAdd="isAdd" :addLoading="true" @popClose="popCloseFn"  @tableDataAdd="tableDataAddFn" :tabDataRow="tableDataRow" /> -->

    </div>
</template>
<script>
import AddItemPop from "./additempop";
import ItmPop from "./itmpop";
import Store from '@/vuex/store'

import ToItmPop from "./toitmpop";

import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {projectAll,projectDelete,projectAllgroup,projectManagerGroup,projectDeveloperGroup,projectTesterGroup,byRole,getPermission,projectAddGroup,projectCondition} = Common.restUrl;

export default {
    name: 'aglie',
    mounted(){


        let auth_list = ()=>{
            this.getPermissionFn(getPermission).then((result)=>{
                this.getProjectCondition(projectCondition,{}).then((res)=>{
                    this.tableDataAjaxFn(projectAll,1,this.tableDAtaPageLine);
                },(err)=>{
                    this.tableDataAjaxFn(projectAll,1,this.tableDAtaPageLine);
                });
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
        this.tableDAtaPageCurrent = 1;

        

        
        

        

        /* 搜索条件 以后加上
        this.byRoleFn(byRole,"icdp_projManager");
        this.byRoleFn(byRole,"icdp_agileCoach");
        this.byRoleFn(byRole,"icdp_devTeam");
        this.byRoleFn(byRole,"icdp_testTeam");
        */
    },
    watch:{
        loginSave(curVal,oldVal){
            console.log(curVal,oldVal)
        },
        "ITMitem.AddGroupList"(curVal,oldVal){
            let _this = this;
            if(curVal){
                Common.changeArrSingle(this,curVal,Common,projectAddGroup,this.projectGroupFn,"prjManager")//下拉样子
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
    components: {
        AddItemPop,
        ItmPop,
        ToItmPop,
    },
    computed: {
        loginSave() {
            return this.$store.state["LOGIN_SAVE"].logged
        },
    },
    beforecreated(){
        console.log("agile--beforecreated-------",this.tableData,this.ITMitem);
    },
    created(){
        console.log("agile--created-------",this.tableData,this.ITMitem);
        Common.delStorageAndCookie(Common,"detail_id");
        Common.DelectLocalStorage(Common);
        this.addCheckSerch();
    },
    beforeUpdate(){
        console.log("agile--beforeUpdate-------",this.tableData,this.ITMitem)
    },
    updated(){
        console.log("agile--updated-------",this.tableData,this.ITMitem)
    },
    data () {
        return {
            isShowMoreShow:false,
            //allSelectTableRome:false,
            isShowAddPop:false,
            isAdd:true,
            tableDataRow:false,
            modaDelete: false,
            modal_loading: false,
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '项目编号',
                    key: 'prj_id',
                    width: 85,
                    align: 'center',
                },
                {
                    title: '项目名称',
                    key: 'prj_name',
                    //
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                //style:{color:'#2d8cf0'},
                                //attrs:{title:"xxxxx",href:"###"},
                                //domProps:{innerHTML:"内容",},
                                "class":{txtBlock:true,txtBlockNone:false},
                                attrs:{title:params.row.prj_name},
                                on: {
                                    click: () => {
                                        this.goAgileDetailFn(params.index,params)
                                    }
                                }
                            },
                            params.row.prj_name
                        );
                    }
                    //


                },
                
                {
                    title: '项目类型',
                    width: 90,
                    key: 'prj_type',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'p',
                            {
                                //domProps:{title:"prj_desc"},
                            },
                            this.translate(this.prj_typeList,params.row.prj_type)
                            
                        );
                    }
                    //
                },
                
                {
                    title: '项目经理',
                    key: 'manager',
                    render: (h, params) => {
                        return h(
                            'span',
                            {
                                "class":{txtBlock:true,txtBlockNone:false},
                                attrs:{title:Common.ReplaceAgileListTitleStr(params.row.manager)},
                            },
                            Common.ReplaceAgileListStr(Common,Common.FileterStr(params.row.manager))
                            //Common.FileterStr(params.row.manager)//params.row.manager.replace(/\|/g,"、")
                        );
                    }
                },
                // {
                //     title: '所属产品',
                //     key: 'prod_name'
                // },
                {
                    title: '开始时间',
                    key: 'start_time',
                    width: 100,
                    align: 'center',
                },
               
                {
                    title: '结束时间',
                    key: 'end_time',
                    width: 100,
                    align: 'center',
                },

                {
                    title: '操作',
                    key: 'action',
                    width: 230,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '2px',
                                    marginLeft: '2px',
                                    visibility:this.transform(this.prj_typeList,params.row.prj_type),
                                },
                                domProps:{disabled:!this.isEdit(params.row.isEdit)},
                                on: {
                                    click: () => {
                                        this.editItemFn({},params.index);
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '2px',
                                    marginLeft: '2px',
                                },
                                on: {
                                    click: () => {
                                        //this.goProductFn(params.index)
                                        this.goAgileDetailFn(params.index,params,"成员")
                                    }
                                }
                            }, '成员'),
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
                                        //this.goDevelopmentFn(params.index)
                                        this.goAgileDetailFn(params.index,params,"附件")
                                    }
                                }
                            }, '附件'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '2px',
                                    marginLeft: '2px',
                                    visibility:this.transform(this.prj_typeList,params.row.prj_type),
                                },
                                domProps:{},
                                on: {
                                    click: () => {
                                        this.toITM(params.row)
                                    }
                                }
                            }, '转立项'),
                            
                        ]);
                    }
                }
            ],
            tableData: [],

            tableDAtaTatol:0,
            tableDAtaPageLine:10,
            tableDAtaPageCurrent:1,
            actionArr:[],
            formValidate: {
                prj_name:"",//项目名称
                prj_id:"",//项目编号
                start_time:"",//开始时间
                end_time:"",//结束时间
                icdp_projManager:"",//ICDP项目经理
                icdp_agileCoach:"",//ICDP敏捷教练
                icdp_devTeam:"",//ICDP开发组
                icdp_testTeam:"",//ICDP测试组
                prj_type:"",//项目类型
                department:"",//部门
                dept_nm_id:"",//提出部门
                stff_nm_id:"",//实施部门
            },
            icdp_projManagerList:[],
            icdp_agileCoachList:[],
            icdp_devTeamList:[],
            icdp_testTeamList:[],
            prj_typeList:[],
            departmentList:[],
            dept_nm_idList:[],
            stff_nm_idList:[],


            prj_permission:[],
            identity:"",

            isShowItm:false,
            isShowToItem:false,

            ITMitem: {
                AddGroupList:[],
            },
            inputLoad:false,
        }
    },
    methods: {
        /* ====== */
        demo(){
            Store.dispatch('LOGIN_SAVE/incrementAsync', {
                isLogin: true
            })
        },
        /* ====== */
        transform(arr,val){
            //visible //hidden
            let name;
            if(arr && Array.isArray(arr) && arr.length){
                let nameObj = arr.find(item => item.value == (val+""));
                if(!nameObj){
                    if(val == 1){
                        name = "hidden";
                    }else if(val == 2){
                        name = "visible";
                    }else {
                        name = "inherit";
                    }
                }else{
                    if(nameObj.value == 1){
                        name = "hidden";
                    }else if(nameObj.value == 2){
                        name = "visible";
                    }else{
                        name = "inherit";
                    }
                }
            }else{
                name = val;    
            }
            return name
        },
        translate(arr,val){
            let name;
            if(arr && Array.isArray(arr) && arr.length){
                let nameObj = arr.find(item => item.value == (val+""));
                if(!nameObj){
                    if(val == 1){
                        name = "立项";
                    }else if(val == 2){
                        name = "自研";
                    }else {
                        name = "未知";
                    }
                }else{
                    name = nameObj.label;
                }
            }else{
                name = val;    
            }
            return name   
        },

        getProjectCondition(URL,params = {}){
            return defaultAXIOS(URL,params,{timeout:60000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======【getProjectCondition】***response+++",response,myData,"====>");
                if(myData.status == "success"){
                    if(Array.isArray(myData.type_list) && myData.type_list.length){
                        let obj = {};
                        this.prj_typeList = [];
                        myData.type_list.forEach((item)=>{
                            obj.value = item.type_num;
                            obj.label = item.type_name;
                            this.prj_typeList.push(obj);
                            obj = {}
                        })
                    }
                    if(Array.isArray(myData.org_list) && myData.org_list.length){
                        let obj = {};
                        this.departmentList = [];
                        myData.org_list.forEach((item,index)=>{
                            obj.value = item;
                            obj.label = item;
                            this.departmentList.push(obj);
                            obj = {}
                        })
                    }




                    if(Array.isArray(myData.dept_nm_list) && myData.dept_nm_list.length){
                        let obj = {};
                        this.dept_nm_idList = [];
                        myData.dept_nm_list.forEach((item)=>{
                            obj.value = item.num+"";
                            obj.label = item.name+"";
                            this.dept_nm_idList.push(obj);
                            obj = {}
                        })
                    }


                    if(Array.isArray(myData.stff_nm_list) && myData.stff_nm_list.length){
                        let obj = {};
                        this.stff_nm_idList = [];
                        myData.stff_nm_list.forEach((item)=>{
                            obj.value = item.num+"";
                            obj.label = item.name+"";
                            this.stff_nm_idList.push(obj);
                            obj = {}
                        })
                    }


                    
                    return Promise.resolve(myData)
                }else{
                    console.log(URL+"_"+myData.status);
                    return Promise.resolve(URL+"_"+myData.status)
                    this.showError(URL+"_"+myData.status);
                }
                
                
            }).catch( (error) => {
                console.log(error);
                return Promise.resolve(error)
                this.showError(error);
            });   
        },


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
                this.ITMitem.AddGroupList[0].groupList = [];
                this.ITMitem.AddGroupList[0].groupList = myData.data.list;
               
            }).catch( (error) => {
                console.log(error);
                this.inputLoad = false;
                this.showError(error);
            });   
        },


        isEdit(val){
            if(val){
                if(val === "null" || val === "undefined" || val === "false" || val === "NaN" || val === "NaN-aN-aN" || val === "0"){
                    return false
                }else{
                    return true;    
                }
            }else{
                return false;
            }
        },
        itmCloseFn(is,tab){
            this.isShowItm = is;
            if(tab){
                this.cancelSerchAll();
                this.tableDAtaPageCurrent = 1;
                this.tableDataAjaxFn(projectAll,1,this.tableDAtaPageLine);
                
            }
        },
        toItemCloseFn(is,tab){
            this.isShowToItem = is;
            if(tab){
                this.cancelSerchAll();
                this.tableDAtaPageCurrent = 1;
                this.tableDataAjaxFn(projectAll,1,this.tableDAtaPageLine);
                
            }
            
        },
        outinITM(){
            this.isShowItm = true;
        },


        toITM(data){
            console.error(data)
            this.isShowToItem = true;
        },




        authIsAdmin(KEY){
            return Common.AdminAuth(this,KEY)
        },
        

        authIs(KEY){
            return Common.auth(this,KEY);
        },
        authAdminIs(KEY){
            return Common.AdminAuth(this,KEY);
        },

        getPermissionFn(URL){
            return Common.GetPermission(defaultAXIOS,this,URL);
        },
        cancelSerchAll(){
            for(let i in this.formValidate){
                this.formValidate[i] = "";
            }
            this.ITMitem.AddGroupList[0].group = "";
            this.ITMitem.AddGroupList[0].groupList = [];
            

            this.$refs.formValidate.resetFields();
            this.serchAll();
        },
        searchKdy(){
            return [
                this.formValidate.prj_name,
                this.formValidate.prj_id,
                this.formValidate.start_time,
                this.formValidate.end_time,
                this.formValidate.icdp_projManager,
                this.formValidate.icdp_agileCoach,
                this.formValidate.icdp_devTeam,
                this.formValidate.icdp_testTeam,
                this.formValidate.prj_type,
                (this.ITMitem.AddGroupList[0].group || ""),
                this.formValidate.department,
                this.formValidate.dept_nm_id,
                this.formValidate.stff_nm_id,
            ]
        },

        serchAll(){
            let searchParams = this.searchKdy();
            this.tableDataAjaxFn(projectAll,1,this.tableDAtaPageLine,...searchParams);
            this.tableDAtaPageCurrent = 1;
        },
        byRoleFn(URL,roleName){
            defaultAXIOS(URL,{roleName},{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======agile byRole***response+++",roleName,response,myData,"======>");
                if(myData && (myData=="success")){

                }else if(myData && myData.length){
                    let _OBJ = {};
                    for(let i=0;i<myData.length;i++){
                        _OBJ.label = myData[i].nick_name
                        _OBJ.value = myData[i].user_name
                        this[roleName+"List"].push(_OBJ)
                        _OBJ = {};
                    }
                }else{
                    this.showError(URL+"****"+roleName+"_没有数据");
                }
                
                
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
        changeCurrentPage(i) {
            let searchParams = this.searchKdy();
            this.tableDataAjaxFn(projectAll,i,this.tableDAtaPageLine,...searchParams);
            this.tableDAtaPageCurrent = i;
        },
        changePageSize(i) {

        },
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },

        tableDataAjaxFn(URL = "",page = 1,pageline = 3,prj_name = "",prj_id = "",start_time = "",end_time = "",icdp_projManager = "" , icdp_agileCoach= "", icdp_devTeam = "" , icdp_testTeam = "",prj_type = "",prjManager = "",department = "",dept_nm_id = "",stff_nm_id = ""){
            let starttimeFromet = start_time ? start_time.Format("yyyy-MM-dd") : "";
            let endtimeFromet = end_time ? end_time.Format("yyyy-MM-dd") : "";
            let defaultAXIOSParams = {
                page,pageline,
                prj_name,
                prj_id,
                start_time:starttimeFromet,
                end_time:endtimeFromet,
                icdp_projManager,
                icdp_agileCoach,
                icdp_devTeam,
                icdp_testTeam,
                username:Common.getStorageAndCookie(this,Common,"username"),
                prj_type,
                prjManager,
                department,
                dept_nm_id,
                stff_nm_id,
            }
            defaultAXIOS(URL,defaultAXIOSParams,{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======agile***response+++",response,myData.data.list,"+++agile***response======>");
                if(myData.status == "success"){
                    this.tableData = myData.data.list;
                    this.tableDAtaTatol = myData.data.total;
                }else{
                    this.showError(URL+"_错误");
                }
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
        tabRowAddFn(){
            this.tableData.push(this.addtest);
            Store.dispatch('ADD_DATA_TEST/incrementAsync', {
                msg: false
            })
            console.log('this.$store.state["ADD_DATA_TEST"].data',this.$store.getters["ADD_DATA_TEST/getFn"])
        },
        //---------
        popCloseFn(){
            this.isShowAddPop = false;
            this.isAdd = true;
            this.tableDataRow = false;
            this.actionArr = [];
            this.$refs.selection.selectAll(false);
        },
        tableDataAddFn(Data){
            if(this.isAdd){
                this.tableData.push(Data);
                this.$Message.info('成功');
            }else{
                alert(JSON.stringify(Data))
            }
            
        },
        addItemFn(){
            this.$router.push('/agile/add')
            return;
            this.isShowAddPop = true;
            this.isAdd = true;
        },
        editItemFn(o,i){
            let obj;
            if(i || i == 0 || i == "0"){
                obj = this.tableData[i];
            }else{
                if(this.actionArr.length >1){
                    Common.CommonWarning(this,"只能选择一项，进行编辑！")
                    return
                }else if(!this.actionArr.length){
                    Common.CommonWarning(this,"请选择一项，进行编辑！")
                    return
                }
                
                obj = this.actionArr[0];
            }
            this.$router.push({path: '/agile/edit', query: {id:obj.id,prj_id:obj.prj_id}})
            this.actionArr = [];

            // this.isShowAddPop = true;
            // this.isAdd = false;
            // this.tableDataRow = this.actionArr;
        },
        tableDataDeleteAjaxFn(URL = "",ID = 0){
            
        },
        del () {
            this.modal_loading = true;

            
            let _arr = [];
            for(let I=0;I<this.actionArr.length;I++){
                _arr.push(this.actionArr[I].id)
            }


            defaultAXIOS(projectDelete,{idArray:_arr},{timeout:2000,method:'post'}).then((response) => {
                //alert(JSON.stringify(response))
                let myData = response.data;
                console.log("<======agile***response+++",response,myData,"+++agile***response======>");
                if(myData.status == "success"){
                    this.actionArr = [];
                    this.modal_loading = false;
                    this.modaDelete = false;
                    this.$Message.config({
                        top: 250,
                        duration: 3
                    });
                    this.$Message.success('删除完成');
                    this.tableDataAjaxFn(projectAll,1,this.tableDAtaPageLine);
                    this.tableDAtaPageCurrent = 1;
                }else{
                    this.actionArr = [];
                    this.modal_loading = false;
                    this.modaDelete = false;
                    this.showError('删除失败');
                }
                

            }).catch( (error) => {
                this.showError(error);
            });
        },
        cancel(){
          this.modaDelete = false;
        },
        error (MSG) {
            this.$Message.config({
                top: 250,
                duration: 3
            });
            this.$Message.error(MSG);
        },
        deleteTableItem(){
            if(this.actionArr.length){
                this.modaDelete = true;
            }else {
               this.error('请选择一行数据');
            }
        },
        onSelectionChangeFn(S){
            console.log("<===*onSelectionChangeFn*===Sel->",S,"<-Sel===*onSelectionChangeFn*===>")
            this.actionArr = S;
            // if(!S.length){
            //     this.allSelectTableRome = false;
            // }else{
            //     this.allSelectTableRome = true;
            // }

        },
        onSelectAllFn(S){
            console.log("<===*onSelectAllFn*===Sel 全选->",S,"<-Sel===*onSelectAllFn*===>")
        },
        onSelectFn(S,R){
            console.log("<===*onSelectFn*===Sel->",S,"<-Sel======ROW->",R,"<-ROW===*onSelectFn*===>")
        },
        handleSelectAll (status) {
            this.$refs.selection.selectAll(status);
        },
        goAgileDetailFn (I,P,R) {

            Common.setStorageAndCookie(Common,"id",this.tableData[I].id);
            Common.setStorageAndCookie(Common,"prjId",this.tableData[I].id);

            Common.setStorageAndCookie(Common,"prj_id",this.tableData[I].prj_id);
            Common.setStorageAndCookie(Common,"prjSn",this.tableData[I].prj_id);
            
            Common.setStorageAndCookie(Common,"prod_id",this.tableData[I].prod_id);

            let Query = {id: this.tableData[I].id,prj_id:this.tableData[I].prj_id,menuType:"new"}

            if(R == "成员"){
                Query.TabsCur = "name2"
            }
            if(R == "附件"){
                Query.TabsCur = "name3"
            }
            

            this.$router.push({path: '/agile/detail', query:Query })
        },


        goDemandFn (index) {

            this.$router.push('/demand')
        },
        goDevelopmentFn (I) {
            Common.setStorageAndCookie(Common,"id",this.tableData[I].id)
            Common.setStorageAndCookie(Common,"prj_id",this.tableData[I].prj_id)
            Common.setStorageAndCookie(Common,"prod_id",this.tableData[I].prod_id)
            
            this.$router.push({path: '/development', query: {board: true,id: this.tableData[I].id,menuType:"new"}})
        },
        goOverViewFn (I){
            this.$router.push('/overView')
        },
        goProductFn (I){

            Common.setStorageAndCookie(Common,"id",this.tableData[I].id)
            Common.setStorageAndCookie(Common,"prj_id",this.tableData[I].prj_id)
            Common.setStorageAndCookie(Common,"prod_id",this.tableData[I].prod_id)

            /*
            Common.setCookie("id",this.tableData[I].id);
            localStorage.setItem('id', this.tableData[I].id);

            Common.setCookie("prj_id",this.tableData[I].prj_id);
            localStorage.setItem('prj_id', this.tableData[I].prj_id);

            Common.setCookie("prod_id",this.tableData[I].prod_id);
            localStorage.setItem('prod_id',this.tableData[I].prod_id);
            */



            this.$router.push({path: '/product', query: {board: true,id: this.tableData[I].id,prj_id: this.tableData[I].prj_id,prod_id: this.tableData[I].prod_id,menuType:"new"}})
        },
        show (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
            })
        },
        remove (index) {
            this.data6.splice(index, 1);
        }
    }
}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';
.myTable {
    margin-bottom: 15px;
}
.crumbsBox{

}
.aglieBox{

}
.pageBox {
    padding-bottom:20px;
    padding-top:20px;
    overflow: hidden;
}
.tableBox{
    padding-top: 20px;
}
.tableBtnBox{
    padding-top:0;
    padding-bottom:10px;
}

/* ------ITM---- */
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
.ivu-card-body {
    padding-top:0;
}
</style>



