<template>
	<div class="pageContent">
        <!-- <selectMenu></selectMenu> -->
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
			            <Row class="serchInputBox">
                            <Col span="15">
                                <Row class="SerchBox">
                                    <Col span="3" style="text-align: center">项目名称</Col>
                                    <Col span="5">
                                        <FormItem >
                                            <Input  placeholder="输入项目名称"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="3" style="text-align: center">项目编号</Col>
                                    <Col span="5">
                                        <FormItem >
                                            <Input  placeholder="输入项目编号"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="3" style="text-align: center">开始时间</Col>
                                    <Col span="5">
                                        <FormItem >
                                            <DatePicker placement="bottom-start" type="date" format="yyyy-MM-dd"  placeholder="选择开始日期"></DatePicker>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row class="SerchBox" v-if="isShowMoreShow">
                                    <Col span="3" style="text-align: center">项目经理</Col>
                                    <Col span="5">
                                        <FormItem >
                                            <Select  placeholder="请选择项目经理">
                                                <Option value="经理1">经理1</Option>
                                                <Option value="经理2">经理2</Option>
                                                <Option value="经理3">经理3</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="3" style="text-align: center">项目状态</Col>
                                    <Col span="5">
                                        <FormItem >
                                            <Select  placeholder="请选项目状态">
                                                <Option value="1">已提出</Option>
                                                <Option value="2">开发中</Option>
                                                <Option value="3">测试</Option>
                                                <Option value="4">上线</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="3" style="text-align: center">开发人员</Col>
                                    <Col span="5">
                                        <FormItem >
                                            <Select  placeholder="请选择开发人员">
                                                <Option value="开发人员1">开发人员1</Option>
                                                <Option value="开发人员2">开发人员2</Option>
                                                <Option value="开发人员3">开发人员3</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row class="SerchBox" v-if="isShowMoreShow">
                                    <Col span="3" style="text-align: center">测试人员</Col>
                                    <Col span="5">
                                        <FormItem >
                                            <Select  placeholder="请选择测试人员">
                                                <Option value="测试人员1">测试人员1</Option>
                                                <Option value="测试人员2">测试人员2</Option>
                                                <Option value="测试人员3">测试人员3</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="3" style="text-align: center">教练</Col>
                                    <Col span="5">
                                        <FormItem >
                                            <Select  placeholder="请选教练">
                                                <Option value="1">教练1</Option>
                                                <Option value="2">教练2</Option>
                                                <Option value="3">教练3</Option>
                                                <Option value="4">教练4</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="3" style="text-align: center">&nbsp;</Col>
                                    <Col span="5">
                                        &nbsp;
                                    </Col>
                                </Row>
                            </Col>
                            <Col span="9" style="text-align: left" class="serchBtnBox">
                                <Button type="primary" icon="ios-search" class="serchBtn">查询</Button>
                            </Col>
                        </Row>
                        <div class="formValidateMoreBtnBox" @click="isShowMoreShow = !isShowMoreShow">
                            <Icon type="chevron-down" color="#ed3f14"></Icon>
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

                    <!-- <Button @click="handleSelectAll(true)" v-if="!allSelectTableRome">设置全选</Button>
                    <Button @click="handleSelectAll(false)" v-else>全部取消</Button> -->

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

        <!-- <AddItemPop :isShow="isShowAddPop" :isAdd="isAdd" :addLoading="true" @popClose="popCloseFn"  @tableDataAdd="tableDataAddFn" :tabDataRow="tableDataRow" /> -->

	</div>
</template>
<script>
import AddItemPop from "./additempop";
import Store from '@/vuex/store'
export default {
	name: 'aglie',
    mounted(){

    },
    components: {
        AddItemPop,
    },
    computed: {
        addtest() {
            return this.$store.state["ADD_DATA_TEST"].data
        },
    },
    beforecreated(){
        console.log("agile--beforecreated-------",this.addtest)
    },
    created(){
        console.log("agile--created-------",this.addtest)
        if(this.addtest){
            this.tabRowAddFn()
        }
    },
    beforeUpdate(){
        console.log("agile--beforeUpdate-------",this.addtest)
    },
    updated(){
        console.log("agile--updated-------",this.addtest)
        if(this.addtest){
            this.tabRowAddFn()
        }
        
        
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
                                        this.goAgileDetailFn(params.index,params)
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
                    title: '所属产品',
                    key: 'product'
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
                    width: 125,
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
                            }, '故事'),
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
                {
                    name: '项目名称1',
                    num: 18,
                    describe: '项目描述1',
                    manager:"项目经理1",
                    startTime:"2012-10-10",
                    endTime:"2012-10-10",
                    product:"产品1",
                },
                {
                    name: 'Jim Green',
                    num: 24,
                    describe: 'London No. 1 Lake Park',
                    manager:"项目经理2",
                    startTime:"2012-10-10",
                    endTime:"2012-10-10",
                    product:"产品2",
                },
                {
                    name: 'Joe Black',
                    num: 30,
                    describe: 'Sydney No. 1 Lake Park',
                    manager:"项目经理3",
                    startTime:"2012-10-10",
                    endTime:"2012-10-10",
                    product:"产品3",
                },
            ],
            actionArr:[],
        }
    },
    methods: {
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
            this.isShowAddPop = true;
            this.isAdd = false;
            this.tableDataRow = this.actionArr;
        },
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
        goAgileDetailFn (index) {
            this.$router.push('/agile/detail')
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
        goProductFn (index){
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
.serchInputBox{
    display: flex;
}
.serchBtnBox{
    position: relative;
}
.SerchBox{
    padding-bottom:10px;
}
.serchBtn{
    position: absolute;
    left:0;
    top:50%;
    transform: translate(50%, -65%);
}
.formValidate {
	margin:0 auto;
	width: 100%;
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



