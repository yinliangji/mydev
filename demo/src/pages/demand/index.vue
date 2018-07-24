<template>
    <div class="pageContent">
        <selectMenu></selectMenu>
        <!-- <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>敏捷项目管理</BreadcrumbItem>
            <BreadcrumbItem>敏捷项目列表</BreadcrumbItem>
        </Breadcrumb> -->
        <Card>
            <div class="demandBox">
                <h3 class="Title">需求项管理</h3>
                <Form ref="formValidate" class="formValidate">
                    <FormItem >
                        <Row>
                            <Col span="3" style="text-align: center">需求项名称</Col>
                            <Col span="4">
                                <FormItem >
                                    <Input  placeholder="输入项目名称"></Input>
                                </FormItem>
                            </Col>
                            <Col span="3" style="text-align: center">需求项编号</Col>
                            <Col span="4">
                                <FormItem >
                                    <Input  placeholder="输入项目编号"></Input>
                                </FormItem>
                            </Col>
                            <Col span="3" style="text-align: center">需求项状态</Col>
                            <Col span="4">
                                <FormItem >
                                    <Input  placeholder="输入产品经理"></Input>
                                </FormItem>
                            </Col>
                            <Col span="3" style="text-align: center">
                                <Button type="primary" icon="ios-search">查询</Button>
                            </Col>
                        </Row>
                        <div class="formValidateMoreBtnBox">
                            <Icon type="chevron-down" color="#ed3f14"></Icon>
                        </div>
                    </FormItem>
                </Form>

                <div class="tableBox">
                    <div class="tableBtnBox">
                        <Button type="success" @click="addItem2">添加</Button>
                        <Button type="warning" @click="editItemFn2">编辑</Button>
                        <Button type="error" @click="deleteTableItem">删除</Button>

                    </div>
                    <Table border ref="selection" :columns="columns" :data="tableData" @on-select="onSelectFn" @on-select-all="onSelectAllFn" @on-selection-change="onSelectionChangeFn"></Table>

                    <div class="pageBox">
                        <Page :total="100" show-elevator></Page>
                        <p>显示第1到第5条记录，总共90条记录</p>
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
                <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
            </div>
        </Modal>

        <ADDorEDITpop :isShow="isShowAddPop" :isAdd="isAdd" :addLoading="true" @popClose="popCloseFn"  @tableDataAdd="tableDataAddFn" :tabDataRow="tableDataRow"  />

        <Addtablepop :isShow="isShowAddPop2" :isAdd="isAdd2" :addLoading="true" @popClose2="popCloseFn2" @tableDataAdd2="tableDataAddFn2" :tabDataRow="tableDataRow2" />

    </div>
</template>
<script>
import ADDorEDITpop from "@/pages/product/add_or_edit_pop";

import Addtablepop from "./addtablepop";

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
                    key: 'num',
                    width: 100,
                    align: 'center',
                },
                {
                    title: '需求项名称',
                    key: 'name',
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
                    title: '需求项完成进度',
                    key: 'percent',
                    align: 'center',
                    width: 140,
                },

                {
                    title: '操作产品待办事项',
                    key: 'action',
                    width: 140,
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
                                        this.addItem(params.index)
                                    }
                                }
                            }, '添加 '),
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
                                        this.toLIstFn(params.index)
                                    }
                                }
                            }, '查看'),

                        ]);
                    }
                }
            ],
            tableData: [
                {
                    name: '项目名称1',
                    num: 18,
                    percent: '10%',

                },
                {
                    name: 'Jim Green',
                    num: 24,
                    percent: '10%',

                },
                {
                    name: 'Joe Black',
                    num: 30,
                    percent: '10%',

                },
            ],
            actionArr:[],
        }
    },
    methods: {
        del () {
            this.modal_loading = true;
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
        //
        
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
    },
}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';

.formValidate {
    margin:0 auto;
    width: 80%;
    margin-left: 0;

}


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
.pageBox ul{
    float: right;
}
.pageBox p{
    float:left;
    line-height: 32px;
    font-size:12px;
}
</style>


>>>>>>> 3a9c8b48b77372d601a379367a1f5d8b2575e4a2
