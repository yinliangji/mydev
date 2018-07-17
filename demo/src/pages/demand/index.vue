<template>
    <div class="pageContent">
        <Breadcrumb :style="{margin: '16px 0'}" >
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>敏捷项目管理</BreadcrumbItem>
            <BreadcrumbItem>需求项管理</BreadcrumbItem>
        </Breadcrumb>
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
                        <Button type="success">添加需求项</Button>
                     
                    </div>
                    <Table border :columns="columns7" :data="data6"></Table>
                    
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
    name: 'demand',
    data () {
        return {
            columns7: [
               
              
                {
                    title: '需求项编号',
                    key: 'age',
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
                    key: 'address',
                    align: 'center',
                    width: 140,
                },
               
                {
                    title: '操作',
                    key: 'action',
                    width: 300,
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
                            }, '添加产品待办事项 '),
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
                            }, '查看产品代办列表'),
                           
                        ]);
                    }
                }
            ],
            data6: [
                {
                    name: '项目名称1',
                    age: 18,
                    address: '10%',
                   
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: '10%',
                   
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: '10%',
                   
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: '10%',
                   
                }
            ]
        }
    },
    methods: {
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
    }
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


