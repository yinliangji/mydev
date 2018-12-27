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
                            <Col span="14">
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
                            <Col span="10">
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
                    
                    <Table border ref="selection" :columns="columns" :data="tableData" @on-select="onSelectFn" @on-select-all="onSelectAllFn" @on-selection-change="onSelectionChangeFn"></Table>

                    <div class="pageBox" v-if="tableData.length">
                        <Page :current="tableDAtaPageCurrent" :total="tableDAtaTatol/tableDAtaPageLine > 1 ? (tableDAtaTatol%tableDAtaPageLine ? parseInt(tableDAtaTatol/tableDAtaPageLine)+1 : tableDAtaTatol/tableDAtaPageLine)*10 : 1" show-elevator @on-change="changeCurrentPage" @on-page-size-change="changePageSize" show-elevator></Page>
                        <p>总共{{tableDAtaTatol}}条记录</p>
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
const {reqAll,getPermission,projectDetail,reqDelect} = Common.restUrl;

import ADDorEDITpop from "@/pages/product/add_or_edit_pop";
import Addtablepop from "./addtablepop";
import ITMpop from "./itmpop2";
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



        }
    },
    mounted(){
        this.getPermissionFn(getPermission);
        let ID = Common.GETID(this,Common) ? Common.GETID(this,Common) : this.$router.push('/agile');
        
        //this.getPermissionFn(getPermission);
        this.tableDataAjaxFn(reqAll,1,this.tableDAtaPageLine,"",ID);
        this.tableDAtaPageCurrent = 1;

    },
    beforeUpdate(){
        console.log("demand--beforeUpdate--","this.isShowITMPop==>",this.isShowITMPop)
    },
    updated(){
        console.log("demand--updated--","this.isShowITMPop==>",this.isShowITMPop)
    },
    methods: {
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
                this.tableDataAjaxFn(reqAll,1,this.tableDAtaPageLine,"",ID);
                this.tableDAtaPageCurrent = 1;
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
            let ID = N;
            Common.setStorageAndCookie(Common,"id",ID)
            this.tableDataAjaxFn(reqAll,1,this.tableDAtaPageLine,"",ID);
            this.tableDAtaPageCurrent = 1;
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
            this.tableDataAjaxFn(reqAll,1,this.tableDAtaPageLine,"",ID,this.formValidate.req_name,this.formValidate.req_id,this.formValidate.req_submitter);
            this.tableDAtaPageCurrent = 1;
        },
        changeCurrentPage(i) {
            let ID = Common.GETID(this,Common)
            this.tableDataAjaxFn(reqAll,i,this.tableDAtaPageLine,"",ID,this.formValidate.req_name,this.formValidate.req_id,this.formValidate.req_submitter);
            this.tableDAtaPageCurrent = i;
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
                    this.tableDataAjaxFn(reqAll,1,this.tableDAtaPageLine,"",Common.GETID(this,Common));
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
            this.tableDataAjaxFn(reqAll,1,this.tableDAtaPageLine,"",Common.GETID(this,Common));
            this.tableDAtaPageCurrent = 1;

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


