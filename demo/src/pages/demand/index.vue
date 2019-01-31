<template>
    <div class="pageContent">
        <goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :TOP="'10'" />
        <selectMenu @changeSelect="selectMenuFn"></selectMenu>
        <Card id="BoxPT">
            <div class="demandBox">
                <h3 class="Title"><span>需求项管理</span></h3>
                <Form ref="formValidate" class="formValidate">
                    <FormItem >
                        <Row class="serchInputBox">
                            <Col span="20">
                                <Row class="SerchBox">
                                    <Col span="3" style="text-align: center">需求项名称</Col>
                                    <Col span="9">
                                        <FormItem >
                                            <Input clearable v-model="formValidate.req_name" placeholder="输入需求项名称"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="3" style="text-align: center">需求项编号</Col>
                                    <Col span="9">
                                        <FormItem >
                                            <Input clearable v-model="formValidate.req_id" placeholder="输入需求项编号"></Input>
                                        </FormItem>
                                    </Col>
                                   <!--  <Col span="3" style="text-align: left" class="serchBtnBox">
                                        <Button type="primary" icon="ios-search" class="serchBtn" @click="serchAll">查询</Button>
                                        <Button class="cancelSerchBtn" @click="cancelSerchAll">重填</Button>
                                    </Col> -->
                                    <!-- <Col span="3" style="text-align: center">提出人 </Col>
                                    <Col span="4">
                                       <FormItem >
                                            <Input clearable v-model="formValidate.req_submitter" placeholder="输入提出人"></Input>
                                        </FormItem>
                                    </Col> -->


                                    
                                </Row>
                            </Col>
                            <Col span="4" style="text-align: left" class="serchBtnBox">
                                <Button type="primary" icon="ios-search" class="_serchBtn" @click="serchAll">
                                    查询
                                </Button>
                                <Button class="_cancelSerchBtn" @click="cancelSerchAll">
                                    重置
                                </Button>
                            </Col>
                            
                        </Row>
                        <!--
                        <div class="formValidateMoreBtnBox">
                            <Icon type="chevron-down" color="#ed3f14"></Icon>
                        </div>
                        -->
                    </FormItem>
                </Form>

                <div class="tableBox">
                    
                    <div class="tableBtnBox">
                        <Row>
                            <Col span="4">
                                <Button 
                                    type="success" 
                                    @click="addItem2"
                                    :disabled="authIs(['icdp_prjrequirement_mng','icdp_prjrequirement_view'])" 
                                >添加
                                </Button>
                                <Button 
                                    type="warning" 
                                    @click="editItemFn2"
                                    :disabled="authIs(['icdp_prjrequirement_mng','icdp_prjrequirement_edit','icdp_prjrequirement_view'])"
                                >编辑
                                </Button>
                                <Button 
                                    type="error" 
                                    @click="deleteTableItem"
                                    :disabled="authIs(['icdp_prjrequirement_mng','icdp_prjrequirement_view'])" 
                                >删除
                                </Button>
                                
                            </Col>
                            <Col span="2" >
                                <img :src="currentView == 'developList' ? developListImgCur : developListImg" 
                                @click="showList" class="cursor" title="用户故事列表">
                            </Col>
                            <Col span="2" >
                                <img :src="currentView == 'kanbanboard' ? kanbanboardImgCur : kanbanboardImg" 
                                @click="showTask" class="cursor" title="用户故事看板">
                            </Col>
                            
                            <Col span="16">
                                <Button 
                                    type="primary"
                                    @click="toBusiness"
                                    size="small"
                                    style="float: right;margin-left:5px"
                                    >
                                    业务功能总览
                                </Button>
                                <Button 
                                    type="info" 
                                    :disabled="authIsAdmin(['SuperAdmin','PlainAdmin'])"
                                    @click="outinITM"
                                    size="small"
                                    style="float: right"
                                    >
                                    从ITM同步同步需求项
                                </Button>
                            </Col>
                        </Row>
                        
                    </div>

                    <div class="tableContBox" v-show="currentView == 'developList'">
                    
                        <Table border ref="selection" :columns="columns" :data="tableData" @on-select="onSelectFn" @on-select-all="onSelectAllFn" @on-selection-change="onSelectionChangeFn"></Table>

                        <div class="pageBox" v-if="tableData.length">
                            <Page :current="tableDAtaPageCurrent" :total="tableDAtaTatol/tableDAtaPageLine > 1 ? (tableDAtaTatol%tableDAtaPageLine ? parseInt(tableDAtaTatol/tableDAtaPageLine)+1 : tableDAtaTatol/tableDAtaPageLine)*10 : 1" show-elevator @on-change="changeCurrentPage" @on-page-size-change="changePageSize" show-elevator></Page>
                            <p>总共{{tableDAtaTatol}}条记录</p>
                        </div>
                    </div>

                    <div class="listBox" id="kanbanboard_demand" v-show="currentView == 'kanbanboard'">
                        <!-- :groupList="[]" :groupList="groupList" :sortdisabled="true"  -->
                        <kanbanboard
                            :isDisabled="authIs(['icdp_userStory_mng','icdp_userStory_view'])"
                            :sortdisabled="false" 
                            :cardList="cardLists" 
                            :statusList="statusLists" 
                            :groupList="[]" 
                            :Group="true"
                            :aside="'demand'"
                            :boardName="'demandBoard'" 
                            id="demandBoardBox"
                            v-if="kanbanboardIsShow"
                        />
                    </div>


                    



                </div>

            </div>
        </Card>

        
        <Modal v-model="modaDelete" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>确认删除？请点击删除按钮</p>
            </div>
            <div slot="footer">
                <Button type="error"   :loading="modal_loading" @click="del">删除</Button>
                <Button type="primary" @click="cancel">取消</Button>

            </div>
        </Modal>

        <ITMpop :isShow="isShowITMPop" @popClose3="itmPopClose" />
        
        <ADDorEDITpop :isShow="isShowAddPop" :isAdd="isAdd" :addLoading="true" @popClose="popCloseFn"  @tableDataAdd="tableDataAddFn" :tabDataRow="tableDataRow"  />

        <Addtablepop :isShow="isShowAddPop2" :isAdd="isAdd2" :addLoading="true" @popClose2="popCloseFn2" @tableDataAdd2="tableDataAddFn2" :tabDataRow="tableDataRow2" />
        

    </div>
</template>
<script>

import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {reqAll,getPermission,projectDetail,reqDelect,reqSetChange,getRequirementKanBan} = Common.restUrl;

import ADDorEDITpop from "@/pages/product/add_or_edit_pop";
import Addtablepop from "./addtablepop";
import ITMpop from "./itmpop2";
import kanbanboard from "@/components/kanbanboard";
import { EventBus } from "@/tools";
export default {
    name: 'demand',
    data () {
        return {
            isShowAddPop:false,
            isAdd:true,
            tableDataRow:false,
            //
            isShowAddPop2:false,
            isAdd2:true,
            tableDataRow2:false,
            //
            modaDelete: false,
            modal_loading: false,

            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '需求项编号',
                    key: 'req_id',
                    width: 150,
                    align: 'center',
                },
                {
                    title: '需求项名称',
                    key: 'req_name',
                    // render: (h, params) => {
                    //     return h(
                    //         'a',
                    //         {
                    //             style:{color:'#2d8cf0'},
                    //             //domProps:{href:"###"},
                    //             on: {
                    //                 click: () => {
                    //                     this.linkFn(params.index)
                    //                 }
                    //             }
                    //         },
                    //         params.row.name
                    //     );
                    // }
                },
                {
                    title: '需求项类型',
                    key: 'prj_type',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'span',
                            Common.PrjTypeFn(params.row.prj_type)
                        );
                    }
                },
                {
                    title: '需求项状态',
                    key: 'status',
                    width: 100,
                    align: 'center',
                    // render: (h, params) => {
                    //     return h(
                    //         'span',
                    //         Common.PrjTypeFn(params.row.status)
                    //     );
                    // }
                },
                {
                    title: '提出部门',
                    key: 'req_submitter',
                    align: 'center',
                    width: 140,
                },
                {
                    title: '用户故事情况(上线 / 未上线)',
                    width: 120,
                    key: 'on_line',
                    align: 'center',
                    type: 'html',
                    renderHeader: (h, params) => {
                        return h('div', {
                            style: {position:'relative',},
                        }, [
                            h('span', {}, '用户故事情况 '),
                            h('Icon', {
                                props:{type: 'ios-help-outline',size:"16",color:"#80848f"},
                                style: {position:'absolute',right:'-15px',top:'10%'},
                                attrs:{title:"根据需求项分解为更细粒度的用户故事的完成情况"},
                            }, ''),
                            /*
                            h('Tooltip', {props:{content: '根据需求项分解为更细粒度的用户故事的完成情况',placement:"right"},}, [
                                h('Icon', {props:{type: 'ios-help-outline',size:"16",color:"#80848f"},}, ''),
                                ]),
                            */
                            h('br'),
                            h('span', {}, '(上线 / 未上线)')
                        ]);
                    }

                },

                {
                    title: ' 需求项分析',
                    key: 'action',
                    width: 230,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.goUserStory(params.index)
                                    }
                                }
                            }, '查看用户故事 '),
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.toBusiness(params.index,"fromlist")
                                    }
                                }
                            }, '查看业务功能'),

                        ]);
                    }
                }
            ],
            tableData: [
                // {
                //     req_name: '项目名称1',
                //     req_id: 18,
                //     req_submitter: '10%',

                // },
                // {
                //     req_name: 'Jim Green',
                //     req_id: 24,
                //     req_submitter: '102%',

                // },
                // {
                //     req_name: 'Joe Black',
                //     req_id: 30,
                //     req_submitter: '12%',

                // },
            ],
            tableDAtaTatol:0,
            tableDAtaPageLine:10,
            tableDAtaPageCurrent:1,
            actionArr:[],
            formValidate: {
                req_name:"",
                req_id:"",
                req_submitter:"",
            },

            prj_permission:[],
            identity:"",

            isShowITMPop:false,

            //看板start
            currentView: "developList",//developList//kanbanboard
            developListImg:require("../../assets/images/product-list.png"),
            developListImgCur:require("../../assets/images/product-listCur.png"),
            kanbanboardImg:require("../../assets/images/product-kanban.png"),
            kanbanboardImgCur:require("../../assets/images/product-kanbanCur.png"),
            groupList:[
                { text: "所属需求项" },
            ],
            statusList:[
            ],
            cardList:[
            ],
            cardListBase:[],
            statusListBase:[],
            kanbanboardIsShow:true,
            //看板end



        }
    },
    beforeDestroy(){
      EventBus.$off("moveEnd", this.moveEnd);
      EventBus.$off("clickItem", this.clicked);
      EventBus.$off("search", this.searchHandle);
      EventBus.$off("addTask", this.addNewTask);
      EventBus.$off("bindSort", this.bindSortId);
      EventBus.$off("storyBindSort", this.bindSortId);
    },
    mounted(){
        this.getPermissionFn(getPermission);
        let ID = Common.GETID(this,Common) ? Common.GETID(this,Common) : this.$router.push('/agile');

        //this.getPermissionFn(getPermission);

        /*
        this.tableDataAjaxFn(reqAll,1,this.tableDAtaPageLine,"",ID);
        this.tableDAtaPageCurrent = 1;
        */
        this.checkUrlBoard();
        this.EventBusRegister();
        this.getInfoFn(ID);
    },
    beforecreated(){
        console.log("项目需求项--beforecreated-------",this.formValidate)
    },
    created(){
        console.log("项目需求项--created-------",this.formValidate);
        this.checkUrlBoard();
    },
    beforeUpdate(){
        console.log("项目需求项--beforeUpdate--","this.isShowITMPop==>",this.isShowITMPop)
    },
    updated(){
        console.log("项目需求项--updated--","this.isShowITMPop==>",this.isShowITMPop)
    },
    methods: {
        checkUrlBoard(){
            if(this.$router.history.current.query.board){
                this.currentView = "kanbanboard";
            }else{
                if(Common.GetSession("CurView_demand") && Common.GetSession("CurView_demand") == "kanbanboard"){
                    this.currentView = "kanbanboard";
                }else{
                    this.currentView = "developList";    
                }
            }
        },
        getInfoFn(ID,isShowList){
            if(this.currentView == "kanbanboard"){
                this.storyGetKanBanFn(getRequirementKanBan,ID,this.formValidate.req_id,this.formValidate.req_name,this.formValidate.req_submitter);
            }else{
                this.tableDataAjaxFn(reqAll,this.tableDAtaPageCurrent,this.tableDAtaPageLine,"",ID,this.formValidate.req_id,this.formValidate.req_name,this.formValidate.req_submitter);
            }
        },
        //看板开始
        EventBusDispatch(){
            if(!EventBus.productDispatch){
                //EventBus.$emit('storyBindSort');
                EventBus.$emit('bindSort');
                EventBus.productDispatch = false;
            }
        },
        EventBusRegister(){
            if(!EventBus.demandRegister){
                EventBus.$on("moveEnd", this.moveEnd);
                EventBus.$on("clickItem", this.clicked);
                EventBus.$on("search", this.searchHandle);
                EventBus.$on("addTask", this.addNewTask);
                //EventBus.$on("storyMoveEnd", this.moveEnd);
                EventBus.$on("storyMoveEnd", ()=>{});
                EventBus.demandRegister = false;

            }
        },
        showList() {
            let CurView = "developList";
            this.currentView = CurView;
            Common.SetSession("CurView_demand",CurView);
            setTimeout(()=>{
                this.getInfoFn(this.getID(),"showList")
            },350)
        },
        showTask(){
            let CurView = "kanbanboard"
            this.currentView = CurView;
            Common.SetSession("CurView_demand",CurView);
            setTimeout(()=>{
                this.getInfoFn(this.getID(),"showTask")
            },350)
        },
        storyGetKanBanFn(URL = "",id="",req_id = "",req_name = "",req_submitter = ""){
            this.cardList = [];
            this.statusList = [];
            this.cardListBase=[],
            this.statusListBase=[],
            defaultAXIOS(URL,{id:id,prj_id:id,req_id,req_name,req_submitter},{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                let statusData = myData.status_data ? myData.status_data : false;
                console.log("<======用户故事 看板 ***response+++",response,myData,"======>");
                myData = myData.data ? myData.data : myData;

                let fn =(arr,val)=>{
                    if(arr && Array.isArray(arr) && arr.length){
                        let obj = arr.find((item)=>{
                            return item.value == val;
                        })
                        return obj.key;
                    }else{
                        return false
                    }
                }

                

                if(myData && myData.length){
                    
                    let _temp = {};
                    let reqArr = [];
                    for(let i=0;i<myData.length;i++){
                        if(myData[i].list && myData[i].list.length){
                            for(let j=0;j<myData[i].list.length;j++){
                                reqArr.push(myData[i].list[j].req_id)
                            }
                        }
                        //
                        _temp.stateStr = myData[i].req_status;
                        _temp.taskNumber = Number(myData[i].count);
                        //_temp.state = "0"+(i+1);
                        _temp.state = fn(statusData,myData[i].req_status) ? "0"+fn(statusData,myData[i].req_status) : "0"+(i+1);
                        this.statusList.push(_temp);
                        this.statusListBase.push(_temp);
                        _temp = {};
                    }

                    let reqArr2 = Array.from(new Set(reqArr));
                    let checkreqName = (val)=>{
                        let _temp
                        if(this.req_idList){
                            _temp = this.req_idList.find((item)=>{
                                return val == item.value
                            })
                            if(_temp && _temp.label){
                                return {text:_temp.label,groupId:val+""}
                            }else{
                                return false;
                            }
                        }else{
                            return false;
                        }
                    }
                    this.groupList = [];
                    this.groupList.push({text:"所属需求项"});
                    for(let k=0;k<reqArr2.length;k++){
                        let _CN = checkreqName(reqArr2[k]);
                        if(_CN){this.groupList.push(_CN)}
                    }

                    let _arr = [];
                    let _Obj = {};

                    
                    
                    for(let i=0;i<myData.length;i++){

                    
                        for(let j=0;j<myData[i].list.length;j++){
                            //_Obj.taskStatus = "0"+(i+1);
                            _Obj.taskStatus = fn(statusData,myData[i].req_status) ? "0"+fn(statusData,myData[i].req_status) : "0"+(i+1)
                            _Obj.taskId = ""+myData[i].list[j].req_id;
                            //_Obj.description = "description_"+ i +"_"+j;
                            _Obj.description = myData[i].list[j].comment;
                            _Obj.userName = myData[i].list[j].charger;
                            _Obj.userId = "userId_"+ i +"_"+j;
                            _Obj.groupId = myData[i].list[j].req_id+"";
                            //_Obj.groupId = 10000+"";
                            _Obj.bgcolor = ((C)=>{if(C==1){return '#FE4515'}else if(C==2){return '#12C37A'}else if(C==3){return '#FEB159'}else{return '#ffffff'}})(myData[i].list[j].proi);
                            _Obj.taskStateStr = myData[i].req_status;
                            _Obj.headPortrait =   require("@/assets/images/user_02.png");
                            _Obj.taskName = myData[i].list[j].req_name;
                            _Obj.nickName = myData[i].list[j].charger
                            _Obj.detail_id = myData[i].list[j].id


                            _Obj.source = "demand";
                            _Obj.isDepd = myData[i].list[j].isDepd;
                            _Obj.isFinish = myData[i].list[j].isFinish;
                            _Obj.us_counts = myData[i].list[j].us_counts;
                            

                            _arr.push(_Obj);
                            _Obj = {}
                        }
                        this.cardList.push(..._arr);
                        this.cardListBase.push(..._arr);
                        _arr = []
                    }
                    this.EventBusDispatch();
                    //EventBus.$emit('storyBindSort');
                    //EventBus.$emit('bindSort');

                }else{
                    this.showError(URL+"_没有数据");
                }
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });

        },
        changeStateNumber(info){
            Common.ChangeStateNumber(this,"statusListBase",info);
            /*
            //let _statusBase = this.statusListBase;
            let _statusBase = _.cloneDeep(this.statusListBase);
            let toState = info.evt.to.getAttribute('state');
            let fromState = info.evt.from.getAttribute('state');

            if(toState == fromState){
                return;
            }else{
                this.statusListBase = [];
                _statusBase.forEach((item,index)=>{
                    //if(info.item.askStatus == item.state){
                    //if(info.evt.item.getAttribute('state') == item.state){
                    if(fromState == item.state){
                        item.taskNumber = parseFloat(item.taskNumber) - 1
                    }
                    if(item.state == toState){
                        item.taskNumber = parseFloat(item.taskNumber) + 1
                    }
                });
                this.statusListBase.push(..._statusBase)
            }
            */
        },
        changeMovedStatus(info){
            let _params = {};
            _params.taskId = info.evt.item.getAttribute('taskid');
            //_params.ID = info.item.detail_id;
            _params.ID = info.evt.item.getAttribute('detailid');
            _params.nickname = info.evt.item.getAttribute('nickname');
            _params.taskStatus = info.evt.to.getAttribute('state');
            _params.taskStatusFrom = info.evt.from.getAttribute('state');
            if(_params.taskStatus == _params.taskStatusFrom){
                return
            }

            defaultAXIOS(reqSetChange,{id:_params.ID,status:_params.taskStatus.substring(1),charger:_params.nickname},{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======用户故事 状态改变***response+++",response,myData,"======>");
                if(myData.status.indexOf("success") == -1){
                    this.showError(reqSetChange+"|返回结果错误");
                }else{
                    
                }
                
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
        moveEnd(info) {
            if(window.location.hash.indexOf("/demand") == -1){
                return
            }
            // 移动卡片结束后
            //console.log("需求项-移动卡片结束后 :::", info);
            //this.changeStateNumber(info);
            //this.changeMovedStatus(info);

            console.log("需求项-移动卡片结束后 :::", info);
            this.changeStateNumber(info);
            if(!EventBus.demandMoveEnd){
                this.changeMovedStatus(info);
                console.log("需求项-移动卡片结束后 ::: changeMovedStatus", info);
                EventBus.demandMoveEnd = true;
                setTimeout(()=>{
                    EventBus.demandMoveEnd = false;
                },500)  
            }


        },
        clicked(info) {
            if(window.location.hash.indexOf("/demand") == -1){
                return
            }
            // 点击卡片方法
            console.log("需求项-点击卡片方法 ::: ", info);
            //this.$router.push({path: '/product/detail', query: {detail_id: info.detail_id }})
            /*
            if(!EventBus.demandClicked){
                console.log("需求项-点击卡片方法 ::: this.$router.push", info);
                this.$router.push({path: '/product/detail', query: {detail_id: info.detail_id }})
                EventBus.demandClicked = true;
                setTimeout(()=>{
                    EventBus.demandClicked = false;
                },500)  
            }
            */

        },
        searchHandle(info) {
            // 查询方法
            console.log("查询  ::: ", info);
        },
        addNewTask() {
            //点击跳转页面
            // this.$router.push({
            //   path: "/development/add"
            // });
        },
        //看板结束
        tableDataAjaxFn(URL = "",page = 1,limit = 3,data = "",id = "",req_name = "",req_id = "",req_submitter = ""){

            
            this.getPrjidFn(projectDetail,id).then((prj_id)=>{

                this.reqAllFn(URL,page,limit,data,id,prj_id,req_name,req_id,req_submitter)
                .then(()=>{})
                .catch((error)=>{
                    console.log(error);
                    this.showError(error);
                })

            }).catch((error)=>{
                console.log(error);
                this.showError(error);
            })
            
        },
        getID(){
            return Common.GETID(this,Common);
        },
        goUserStory(i){
            Common.SetSession("REQ_ID",this.tableData[i].id)
            this.$router.push({path: '/product', query: {board: true}})
        },
        toBusiness(i,From){
        	if(From && From == "fromlist"){
        		this.$router.push({path: '/demand/business/', query: {req_id:this.tableData[i].req_id}})
        	}else{
        		this.$router.push({path: '/demand/business/', query: {}})
        	}
        },
        itmPopClose(is,isCancel){
            this.isShowITMPop = is;
            if(!isCancel){
                let ID = Common.GETID(this,Common)
                //this.tableDataAjaxFn(reqAll,1,this.tableDAtaPageLine,"",ID);
                this.tableDAtaPageCurrent = 1;
                this.getInfoFn(ID);
            }
        },
        outinITM(){
            
            this.isShowITMPop = true;
        },
        authIs(KEY){
            return Common.auth(this,KEY)
        },
        authIsAdmin(KEY){
            return Common.AdminAuth(this,KEY)
        },

        getPermissionFn(URL){
            Common.GetPermission(defaultAXIOS,this,URL);
        },
        selectMenuFn(N){
            this.kanbanboardIsShow = false;
            let ID = N;
            Common.setStorageAndCookie(Common,"id",ID);
            this.tableDAtaPageCurrent = 1;

            setTimeout(()=>{
                this.kanbanboardIsShow = true;
                this.getInfoFn(ID);
            },400)
            //this.tableDataAjaxFn(reqAll,1,this.tableDAtaPageLine,"",ID);
            
        },
        cancelSerchAll(){
            for(let i in this.formValidate){
                this.formValidate[i] = "";
            }
            this.$refs.formValidate.resetFields();
            this.serchAll();
        },
        serchAll(){
            let ID = Common.GETID(this,Common)
            //this.tableDataAjaxFn(reqAll,1,this.tableDAtaPageLine,"",ID,this.formValidate.req_name,this.formValidate.req_id,this.formValidate.req_submitter);
            

            if(this.currentView == "kanbanboard"){
                this.kanbanboardIsShow = false;
                setTimeout(()=>{
                    this.kanbanboardIsShow = true;
                    this.tableDAtaPageCurrent = 1;
                    this.getInfoFn(ID);
                },10)
            }else{
                this.tableDAtaPageCurrent = 1;
                this.getInfoFn(ID);
            }
            //this.tableDAtaPageCurrent = 1;
            //this.getInfoFn(ID);
            
        },
        changeCurrentPage(i) {
            let ID = Common.GETID(this,Common);
            this.tableDAtaPageCurrent = i;
            this.tableDataAjaxFn(reqAll,i,this.tableDAtaPageLine,"",ID,this.formValidate.req_name,this.formValidate.req_id,this.formValidate.req_submitter);
            
        },
        changePageSize(i) {
        },
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
        cancel(){
            this.modaDelete = false;
        },
        getPrjidFn(URL,ID){
            if(Common.getStorageAndCookie(this,Common,"prjId")){
                return Promise.resolve(Common.getStorageAndCookie(this,Common,"prjId"));
            }
            return defaultAXIOS(URL+ID,{},{timeout:2000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======demand**projectDetail*response+++",response,myData,"======>");
                let DATA = myData.data ? myData.data : myData
                let prodId = DATA.prod_id?DATA.prod_id : DATA.prod 
                Common.setStorageAndCookie(Common,'prod_id',prodId);
                let prjId = DATA.prj_id 
                if(prjId){
                    Common.setStorageAndCookie(Common,'prj_id',prjId);
                    return Promise.resolve(DATA.prj_id);
                }else{
                    return Promise.reject("获取prj_id失败");
                }
            }).catch( (error) => {
                console.log(error);
                return Promise.reject("获取prj_id失败");
            });
        },

        reqAllFn(URL,page,limit,data,id,prj_id,req_name,req_id,req_submitter){
            return defaultAXIOS(URL,{page,limit,data,id,prj_id:id,req_name,req_id,req_submitter},{timeout:20000,method:'get'})
            .then((response) => {
                let myData = response.data;
                console.log("<======demand**reqAll*response+++",response,myData.data,"======>");
                if(myData.status == "success"){
                    this.tableData = myData.data;
                    this.tableDAtaTatol = myData.total;
                }else{
                    return Promise.reject(URL+"_错误");
                }
            })
            .catch( (error) => {
                console.log(error);
                return Promise.reject(URL+"_错误");
            });
        },
        getPermissionFn(URL){
            Common.GetPermission(defaultAXIOS,this,URL);
        },
        
        //*********
        del () {
            this.modal_loading = true;
            let _arr = [];
            console.log("")
            for(let I=0;I<this.actionArr.length;I++){
                _arr.push(this.actionArr[I].req_id)
            }

            defaultAXIOS(reqDelect,{idArray:_arr},{timeout:2000,method:'post'}).then((response) => {
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
                    //this.tableDataAjaxFn(projectAll,1,this.tableDAtaPageLine);
                    this.tableDAtaPageCurrent = 1;
                    this.tableDataAjaxFn(reqAll,1,this.tableDAtaPageLine,"",Common.GETID(this,Common));
                    
                }else{
                    this.actionArr = [];
                    this.modal_loading = false;
                    this.modaDelete = false;

                    Common.CommonError(this,myData.message)
                    //this.$Message.success(myData.message);
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
        deleteTableItem(){
            if(this.actionArr.length){
                this.modaDelete = true;
            }else {
               this.error('请选择一行数据');
            }
        },
        error (MSG) {
            this.$Message.config({
                top: 250,
                duration: 3
            });
            this.$Message.error(MSG);
        },
        editItemFn2(){
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


            this.$router.push({path: '/demand/addEdit/', query: {DATA:JSON.stringify(this.actionArr)}})
            return


            this.isShowAddPop2 = true;
            this.isAdd2 = false;
            this.tableDataRow2 = this.actionArr;
        },
        popCloseFn2(){

            this.isShowAddPop2 = false;
            this.isAdd2 = true;
            this.tableDataRow2 = false;
            this.actionArr = [];
            this.$refs.selection.selectAll(false);
            this.tableDAtaPageCurrent = 1;
            

            this.getInfoFn(Common.GETID(this,Common));
            //this.tableDataAjaxFn(reqAll,1,this.tableDAtaPageLine,"",Common.GETID(this,Common));
            

        },
        tableDataAddFn2(Data){
            if(this.isAdd2){
                this.tableData.push(Data);
                this.$Message.info('成功');
            }else{
                alert(JSON.stringify(Data))
            }
        },
        addItem2(){
            this.$router.push({path: '/demand/addEdit/', query: {}})
            return
            this.isShowAddPop2 = true;
            this.isAdd2 = true;
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
        //
        tableDataAddFn(Data){
            this.$Message.info('成功');
        },
        addItem(){
            this.isShowAddPop = true;
            this.isAdd = true;
        },
        popCloseFn(){
            this.isShowAddPop = false;
            this.isAdd = true;
            this.tableDataRow = false;
        },
        linkFn (index) {
            this.$router.push('/baseinfo')
        },
        toLIstFn (index) {
            this.$router.push('/product')
        },
        show (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
            })
        },
        remove (index) {
            this.data6.splice(index, 1);
        },
        
    },
    components: {
        ADDorEDITpop,
        Addtablepop,
        ITMpop,
        kanbanboard,
    },
    computed: {
        cardLists(){
            this.cardListBase.forEach((item)=>{item.source = "demand"})
            return this.cardListBase;
        },
        statusLists(){
            return this.statusListBase;
        },
    },
    watch: {
        // '$route' (to, from) {
            
        //     if(to.query.board && to.query.board == "true"){
        //         this.currentView = "kanbanboard";
        //     }else{
        //         this.currentView = "developList";
        //     }
        // },
    },
}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';




.tableBox{
    padding-top: 20px;
}
.tableBtnBox{
    padding-top:0;
    padding-bottom:10px;
}
.pageBox {
    padding-bottom:20px;
    padding-top:20px;
    overflow: hidden;
}
</style>
<style>
#kanbanboard_demand .row-wrapper:first-of-type{
    min-height: 32px;
}
#kanbanboard_demand .row-wrapper:nth-of-type(2){
    min-height: 300px;
}
#kanbanboard_demand .row-wrapper {
    
}
</style>


