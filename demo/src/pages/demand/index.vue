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
                    </FormItem>
                   
                </Form>

                <div class="tableBox">
                    <div class="tableBtnBox">
                        <Button type="success" @click="addItem2">添加需求项</Button>
                     
                    </div>
                    <Table border :columns="columns" :data="itemData"></Table>
                    
                    <div class="pageBox">
                        <Page :total="100" show-elevator></Page>
                        <p>显示第1到第5条记录，总共90条记录</p>
                    </div>
                </div>
                
            </div>
        </Card>
       <Modal ref="addPop" v-model="modaAdd2" title="添加需求" @on-ok="submitAdd2"  ok-text="提交" :loading="modal_add_loading2" visible="true">
            <Form :model="formItem" :label-width="80" >
                <FormItem label="项目名称" >
                    <Input v-model="formItem.name" placeholder="请输入项目名称"></Input>
                </FormItem>
               
            </Form>
        </Modal> 


      <ADDorEDITpop :isShow="isShowAddPop" :isAdd="isAdd" :addLoading="true" @popClose="popCloseFn"  @tableDataAdd="tableDataAddFn" :tabDataRow="tableDataRow"  />




    </div>
</template>
<script>
import ADDorEDITpop from "@/pages/product/add_or_edit_pop";
import selectMenu from "@/components/selectMenu/selectMenu";
export default {
    name: 'demand',
    data () {
        return {
            isShowAddPop:false,
            isAdd:true,
            tableDataRow:false,
            //
            modaAdd2: false,
            modal_add_loading2: true,
            formItem: {
                name:"",
            },
            columns: [
                {
                    title: '需求项编号',
                    key: 'num',
                    width: 100,
                    align: 'center',
                },
                {
                    title: '需求项名称',
                    key: 'name',
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                style:{color:'#2d8cf0'},
                                //domProps:{href:"###"},
                                on: {
                                    click: () => {
                                        this.linkFn(params.index)
                                    }
                                }
                            },
                            params.row.name
                        );
                    }
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
            itemData: [
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
               
            ]
        }
    },
    methods: {
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
        addItem2(){
            this.modaAdd2 = true;
        },
        formItemReset2(){
            this.$nextTick(() => {
                this.formItem.name = "";
            });
        },
        submitAdd2 () {
            let tempData = {
                name: this.formItem.name,
                num: parseInt(Math.random()*100),
                percent:"0%",
            }
            setTimeout(() => {
               this.itemData.push(tempData);
                this.modaAdd2 = false;
                this.$Message.info('成功');
                this.formItemReset2();
            },1000)
            
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
        }
    },
    components: {
        ADDorEDITpop,
        selectMenu,
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


