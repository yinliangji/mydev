<template>
	<div class="pageContent">
        <selectMenu></selectMenu>
		<!-- <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>敏捷项目管理</BreadcrumbItem>
            <BreadcrumbItem>敏捷项目列表</BreadcrumbItem>
        </Breadcrumb> -->
        <Card>
            <div class="aglieBox">
            	<h3 class="Title">敏捷项目列表</h3>
            	<Form ref="formValidate" class="formValidate">

			        <FormItem >
			            <Row>

			            	<Col span="2" style="text-align: center">项目名称</Col>
			                <Col span="4">
			                    <FormItem >
			                        <Input  placeholder="输入项目名称"></Input>
			                    </FormItem>
			                </Col>
			                <Col span="2" style="text-align: center">项目编号</Col>
			                <Col span="4">
			                    <FormItem >
			                        <Input  placeholder="输入项目编号"></Input>
			                    </FormItem>
			                </Col>
			                <Col span="2" style="text-align: center">产品经理</Col>
			                <Col span="4">
			                    <FormItem >
			                        <Input  placeholder="输入产品经理"></Input>
			                    </FormItem>
			                </Col>
			                <Col span="3" style="text-align: center">
			                	<Button type="primary" icon="ios-search">查询</Button>
			            	</Col>
			            	<Col span="3" style="text-align:left"></Col>
			            </Row>
                        <div class="formValidateMoreBtnBox">
                            <Icon type="chevron-down" color="#ed3f14"></Icon>
                        </div>
			        </FormItem>

			    </Form>

				<div class="tableBox">
					<div class="tableBtnBox">
						<Button type="success" @click="addItemFn">添加</Button>
					    <Button type="warning" @click="editItemFn">编辑</Button>
					    <Button type="error" @click="deleteTableItem">删除</Button>
					</div>
			    	<Table border  ref="selection" :columns="columns" :data="tableData" class="myTable" @on-select="onSelectFn" @on-select-all="onSelectAllFn" @on-selection-change="onSelectionChangeFn"></Table>

                    <Button @click="handleSelectAll(true)" v-if="!allSelectTableRome">设置全选</Button>
                    <Button @click="handleSelectAll(false)" v-else>全部取消</Button>

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

        <AddItemPop :isShow="isShowAddPop" :isAdd="isAdd" :addLoading="true" @popClose="popCloseFn"  @tableDataAdd="tableDataAddFn" :tabDataRow="tableDataRow" />

	</div>
</template>
<script>
import AddItemPop from "./additempop";

export default {
	name: 'aglie',
    mounted(){

    },
    components: {
        AddItemPop,

    },
    data () {
        return {
            allSelectTableRome:false,
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
                    key: 'num',
                    width: 85,
                    align: 'center',
                },
                {
                    title: '项目名称',
                    key: 'name',
                    //
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
                    //


                },

                {
                    title: '项目描述',
                    key: 'describe'
                },
                {
                    title: '项目经理',
                    key: 'manager'
                },
                {
                    title: '开始时间',
                    key: 'startTime',
                    width: 100,
                    align: 'center',
                },
                {
                    title: '结束时间',
                    key: 'endTime',
                    width: 100,
                    align: 'center',
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 180,
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
                                        this.goDemandFn(params.index)
                                    }
                                }
                            }, '需求项'),
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
                                        this.goDevelopmentFn(params.index)
                                    }
                                }
                            }, '任务'),
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.goOverViewFn(params.index)
                                    }
                                }
                            }, '概览')
                        ]);
                    }
                }
            ],
            tableData: [
                {
                    name: '项目名称1',
                    num: 18,
                    describe: '项目描述1',
                    manager:"项目经理1",
                    startTime:"2012-10-10",
                    endTime:"2012-10-10",
                },
                {
                    name: 'Jim Green',
                    num: 24,
                    describe: 'London No. 1 Lake Park',
                    manager:"项目经理2",
                    startTime:"2012-10-10",
                    endTime:"2012-10-10",
                },
                {
                    name: 'Joe Black',
                    num: 30,
                    describe: 'Sydney No. 1 Lake Park',
                    manager:"项目经理3",
                    startTime:"2012-10-10",
                    endTime:"2012-10-10",
                },

            ],
            actionArr:[],
        }
    },
    methods: {
        popCloseFn(){
            this.isShowAddPop = false;
            this.isAdd = true;
            this.tableDataRow = false;
            this.actionArr = [];
            this.$refs.selection.selectAll(false);
        },
        tableDataAddFn(Data){
            this.tableData.push(Data);
            this.$Message.info('成功');
        },
        addItemFn(){
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
            this.isShowAddPop = true;
            this.isAdd = false;
        },
        del () {
            this.modal_loading = true;
            setTimeout(() => {
                for(let i=0;i<this.itemData.length;i++){
                    for(let j=0;j<this.actionArr.length;j++){
                        if(JSON.stringify(this.itemData[i]).indexOf(JSON.stringify(this.actionArr[j])) != -1){
                            console.log(i)
                            this.itemData.splice(i, 1);//删除
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
            if(!S.length){
                this.allSelectTableRome = false;
            }else{
                this.allSelectTableRome = true;
            }

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
        linkFn (index) {
            this.$router.push('/baseinfo')
        },
        goDemandFn (index) {
            this.$router.push('/demand')
        },
        goDevelopmentFn (index) {
            this.$router.push('/development')
        },
        goOverViewFn (index){
            this.$router.push('/overView')
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
.formValidate {
	margin:0 auto;
	width: 80%;
	margin-left: 0;

}


.aglieBox{

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
