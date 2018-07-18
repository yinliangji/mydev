<template>
	<div class="pageContent">
		<Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>敏捷项目管理</BreadcrumbItem>
            <BreadcrumbItem>敏捷项目列表</BreadcrumbItem>
        </Breadcrumb>
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
			        </FormItem>
			       
			    </Form>

				<div class="tableBox">
					<div class="tableBtnBox">
						<Button type="success">添加</Button>
					    <Button type="warning">编辑</Button>
					    <Button type="error">删除</Button>
					</div>
			    	<Table border ref="selection" :columns="columns7" :data="data6" class="myTable"></Table>

                    <Button @click="handleSelectAll(true)">设置全选</Button>
                    <Button @click="handleSelectAll(false)">全部取消</Button>
			    	
			    	<div class="pageBox">
			    		<Page :total="100" show-elevator></Page>
			    		<p>显示第1到第5条记录，总共90条记录</p>
			    	</div>
			    </div>
            	
            </div>
        </Card>
		
	</div>
</template>
<script>


export default {
	name: 'aglie',
    data () {
        return {
            columns7: [
            	{
                    type: 'selection',
                    width: 60,
                    align: 'center'
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
                    title: '项目编号',
                    key: 'age',
                    width: 85,
                    align: 'center',
                },
                {
                    title: '项目描述',
                    key: 'address'
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
                    width: 170,
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
                                        this.show(params.index)
                                    }
                                }
                            }, '需求'),
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
                                        this.show(params.index)
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
                                        this.show(params.index)
                                    }
                                }
                            }, '概览')
                        ]);
                    }
                }
            ],
            data6: [
                {
                    name: '项目名称1',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    startTime:"2012-10-10",
                    endTime:"2012-10-10",
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    startTime:"2012-10-10",
                    endTime:"2012-10-10",
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    startTime:"2012-10-10",
                    endTime:"2012-10-10",
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    startTime:"2012-10-10",
                    endTime:"2012-10-10",
                }
            ]
        }
    },
    methods: {
    	handleSelectAll (status) {
            this.$refs.selection.selectAll(status);
        },
        linkFn (index) {
            //alert(index)
            this.$router.push('/baseinfo')
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


