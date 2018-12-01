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
                                    <Col span="2" style="text-align: center">开始时间</Col>
                                    <Col span="6">
                                        <FormItem >
                                            <DatePicker placement="bottom-start" type="date" format="yyyy-MM-dd"  placeholder="选择开始日期" v-model="formValidate.start_time"></DatePicker>
                                        </FormItem>
                                    </Col>
                                </Row>

                              

                                <Row class="SerchBox" v-if="isShowMoreShow">
                                    <Col span="2" style="text-align: center">结束时间</Col>
                                    <Col span="6">
                                        <FormItem >
                                            <DatePicker placement="bottom-start" type="date" format="yyyy-MM-dd"  placeholder="选择结束日期" v-model="formValidate.end_time"></DatePicker>
                                        </FormItem>
                                    </Col>
                                    <Col span="2" style="text-align: center"><!-- 项目经理 --></Col>
                                    <Col span="6">
                                        <!-- <FormItem >
                                            <Select clearable v-model="formValidate.icdp_projManager" placeholder="请选择项目经理">
                                                
                                                <Option v-for="(item,index) in icdp_projManagerList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem> -->
                                    </Col>
                                    
                                    <Col span="2" style="text-align: center"><!-- 开发人员 --></Col>
                                    <Col span="6">
                                        <!-- <FormItem >
                                            <Select clearable v-model="formValidate.icdp_devTeam" placeholder="请选择开发人员">
                                               
                                                <Option v-for="(item,index) in icdp_devTeamList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem> -->
                                    </Col>
                                </Row>
                                <!-- <Row class="SerchBox" v-if="isShowMoreShow">
                                    <Col span="3" style="text-align: center">教练</Col>
                                    <Col span="5">
                                       
                                        <FormItem >
                                            <Select clearable v-model="formValidate.icdp_agileCoach" placeholder="请选择教练">
                                               
                                                <Option v-for="(item,index) in icdp_agileCoachList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>

                                    <Col span="3" style="text-align: center">测试人员</Col>
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
                                </Row>  -->

                            </Col>
                            <Col span="4" style="text-align: left" class="serchBtnBox">
                                <Button type="primary" icon="ios-search" class="serchBtn" @click="serchAll">查询</Button>
                                <Button class="cancelSerchBtn" @click="cancelSerchAll">重填</Button>
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
                            添加
                        </Button>
					    <Button 
                            type="warning" 
                            :disabled="authIs(['icdp_projList_mng','icdp_projList_edit','icdp_projList_view'])" 
                            @click="editItemFn"
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
                            :disabled="authIsAdmin(['SuperAdmin'])"
                            @click="outinITM" 
                            >
                            从ITM导入项目 功能制作中，不能点！！！
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
        <!-- <AddItemPop :isShow="isShowAddPop" :isAdd="isAdd" :addLoading="true" @popClose="popCloseFn"  @tableDataAdd="tableDataAddFn" :tabDataRow="tableDataRow" /> -->

	</div>
</template>
<script>
import AddItemPop from "./additempop";
import ItmPop from "./itmpop";
import Store from '@/vuex/store'


import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {projectAll,projectDelete,projectAllgroup,projectManagerGroup,projectDeveloperGroup,projectTesterGroup,byRole,getPermission,projectAddGroup} = Common.restUrl;

export default {
	name: 'aglie',
    mounted(){

        let auth_list = ()=>{
            this.getPermissionFn(getPermission).then((result)=>{

                this.tableDataAjaxFn(projectAll,1,this.tableDAtaPageLine);
                setTimeout(()=>{
                    EVENT.emit("SIDER1",result);
                },500)
            },()=>{
                this.showError("权限不足，不能有任何动作");
            })
        }
        
        EVENT.on("USER",(result)=>{
            if(Common.getCookie("username")){
                console.log('EVENT.on("USER",(result) -- auth_list()');
                auth_list();
            }
        })
        if(Common.getCookie("username")){
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
                Common.changeArr2(this,curVal,Common,projectAddGroup,this.projectGroupFn2)//修改添加角色
            }
        },
        ITMitem: {
            handler(val, oldVal) {
                if(val){
                    if(val.AddGroupList[0].grouptemp.length == 1){
                        //console.log(val.AddGroupList[0].grouptemp[0])
                    }
                    Common.inputArr2(this,val)//修改添加角色
                }
            },
            deep: true
        },
       
        
    },
    components: {
        AddItemPop,
        ItmPop,
    },
    computed: {
        loginSave() {
            return this.$store.state["LOGIN_SAVE"].logged
        },
    },
    beforecreated(){
        console.log("agile--beforecreated-------",this.tableData,this.ITMitem);
        Common.delStorageAndCookie(Common,"detail_id")

    },
    created(){
        console.log("agile--created-------",this.tableData,this.ITMitem);

        
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
                /*
                {
                    title: '项目描述',
                    key: 'prj_desc',
                    render: (h, params) => {
                        return h(
                            'p',
                            {
                                domProps:{title:"prj_desc"},
                            },
                            params.row.prj_name
                        );
                    }
                    //
                },
                */
                {
                    title: '项目经理',
                    key: 'manager',
                    render: (h, params) => {
                        return h(
                            'span',
                            Common.FileterStr(params.row.manager)//params.row.manager.replace(/\|/g,"、")
                        );
                    }
                },
                {
                    title: '所属产品',
                    key: 'prod_name'
                },
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
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            // h('Button', {
                            //     props: {
                            //         type: 'primary',
                            //         size: 'small'
                            //     },
                            //     style: {
                            //         marginRight: '5px'
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.goDemandFn(params.index)
                            //         }
                            //     }
                            // }, '需求项'),
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '2px',
                                    marginLeft: '2px',
                                },
                                on: {
                                    click: () => {
                                        this.goProductFn(params.index)
                                    }
                                }
                            }, '用户故事'),
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
                                        this.goDevelopmentFn(params.index)
                                    }
                                }
                            }, '任务'),
                            
                        ]);
                    }
                }
            ],
            tableData: [
                // {
                //     prj_name: '项目名称1',
                //     prj_id: 18,
                //     prj_desc: '项目描述1',
                //     prj_manager:"项目经理1",
                //     start_time:"2012-10-10",
                //     end_time:"2012-10-10",
                //     prod_name:"产品1",
                // },
               
            ],

            tableDAtaTatol:0,
            tableDAtaPageLine:5,
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
            },
            icdp_projManagerList:[],
            icdp_agileCoachList:[],
            icdp_devTeamList:[],
            icdp_testTeamList:[],

            prj_permission:[],
            identity:"",

            isShowItm:false,
            

        }
    },
    methods: {
        itmCloseFn(is,tab){
            this.isShowItm = is;
            if(tab){
                this.cancelSerchAll();
                this.tableDAtaPageCurrent = 1;
                this.tableDataAjaxFn(projectAll,1,this.tableDAtaPageLine);
                
            }
        },
        outinITM(){
            this.isShowItm = true;
        },
        authIsAdmin(KEY){
            return Common.AdminAuth(this,KEY)
        },
        /* ====== */
        demo(){
            
            Store.dispatch('LOGIN_SAVE/incrementAsync', {
                isLogin: true
            })
            
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
            this.$refs.formValidate.resetFields();
        },

        serchAll(){
            this.tableDataAjaxFn(projectAll,1,this.tableDAtaPageLine,this.formValidate.prj_name,this.formValidate.prj_id,this.formValidate.start_time,this.formValidate.end_time,this.formValidate.icdp_projManager,this.formValidate.icdp_agileCoach,this.formValidate.icdp_devTeam,this.formValidate.icdp_testTeam);
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
            this.tableDataAjaxFn(projectAll,i,this.tableDAtaPageLine,this.formValidate.prj_name,this.formValidate.prj_id,this.formValidate.start_time,this.formValidate.end_time,this.formValidate.icdp_projManager,this.formValidate.icdp_agileCoach,this.formValidate.icdp_devTeam,this.formValidate.icdp_testTeam);
            this.tableDAtaPageCurrent = i;
        },
        changePageSize(i) {

        },
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },

        tableDataAjaxFn(URL = "",page = 1,pageline = 3,prj_name = "",prj_id = "",start_time = "",end_time = "",icdp_projManager = "" , icdp_agileCoach= "", icdp_devTeam = "" , icdp_testTeam = ""){
            let starttimeFromet = start_time ? start_time.Format("yyyy-MM-dd") : "";
            let endtimeFromet = end_time ? end_time.Format("yyyy-MM-dd") : "";
            defaultAXIOS(URL,{page,pageline,prj_name,prj_id,start_time:starttimeFromet,end_time:endtimeFromet,icdp_projManager,icdp_agileCoach,icdp_devTeam,icdp_testTeam,username:Common.getCookie("username")},{timeout:20000,method:'get'}).then((response) => {
                //alert(JSON.stringify(response))
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
        editItemFn(){
            this.$Message.config({
                top: 250,
                duration: 3
            });
            if(this.actionArr.length >1){
                this.error("只能选择一项，进行编辑！")
                return
            }else if(!this.actionArr.length){
                this.error("请选择一项，进行编辑！")
                return
            }
            this.$router.push({path: '/agile/edit', query: {id:this.actionArr[0].id,prj_id:this.actionArr[0].prj_id}})
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

            /*
            setTimeout(() => {
                for(let i=0;i<this.tableData.length;i++){
                    for(let j=0;j<this.actionArr.length;j++){
                        if(JSON.stringify(this.tableData[i]).indexOf(JSON.stringify(this.actionArr[j])) != -1){
                            console.log(i)
                            this.tableData.splice(i, 1);//删除
                        }
                    }
                }
                this.actionArr = [];
                this.modal_loading = false;
                this.modaDelete = false;
                this.$Message.config({
                    top: 250,
                    duration: 3
                });
                this.$Message.success('删除完成');
            }, 1000);
            */
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
        goAgileDetailFn (I,P) {

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

            this.$router.push({path: '/agile/detail', query: {id: this.tableData[I].id,prj_id:this.tableData[I].prj_id}})
        },
        goDemandFn (index) {

            this.$router.push('/demand')
        },
        goDevelopmentFn (I) {
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

            
            this.$router.push({path: '/development', query: {board: true,id: this.tableData[I].id}})
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



            this.$router.push({path: '/product', query: {board: true,id: this.tableData[I].id,prj_id: this.tableData[I].prj_id,prod_id: this.tableData[I].prod_id}})
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



