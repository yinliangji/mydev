<template>
	<div class="pageContent">
		<Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>产品待办列表</BreadcrumbItem>
            <BreadcrumbItem>产品待办基本信息</BreadcrumbItem>
        </Breadcrumb>
        <Card>
        	<div class="baseInfoBox">
            	<h3 class="Title">产品待办基本信息</h3>
            	<div class="tableBox">
            		<!-- -->
            		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
					  <tbody>
						<tr>
						  <th width="13%">事项编号</th>
						  <td width="20%">159678</td>
						  <th width="13%">产品待办事项名称</th>
						  <td width="20%" >TPM敏捷项目管理系统</td>
						  <th width="13%">事项类型</th>
						  <td>产品需求</td>
						</tr>

						<tr>
						  <th>负责人</th>
						  <td>谢呗</td>
						  <th>状态</th>
						  <td>已完成</td>
						  <th>所属迭代</th>
						  <td>迭代1</td>
						</tr>


						<tr>
						  <th>优先级</th>
						  <td>高</td>
						  <th>工时<br />(实际|预计)</th>
						  <td>20 | 10	</td>
						  <th>关联任务<br />(已完成|全部)</th>
						  <td>5 | 10</td>
						</tr>
						
						
						<tr>
						  <th>详情</th>
						  <td colspan="5">TPM敏捷项目管理系统</td>
						</tr>
						
					  </tbody>
					</table>
            		<!-- -->
            	</div>
            	<div class="addModule">
	            	<Row class="tagBox">
		                <Col span="2">
		                    <h4>技术模块</h4>
		                </Col>
		                <Col span="22" >
		                    <Tag v-for="item in count" :key="item" :name="item" closable @on-close="handleClose">{{ item}}</Tag>
		                    <Button icon="ios-plus-empty" type="dashed" size="small" @click="addItem">添加技术模块</Button>
		                </Col>
		            </Row>
		            <Row class="tagBox">
		                <Col span="2">
		                    <h4>业务模块</h4>
		                </Col>
		                <Col span="22" >
		                    <Tag v-for="item in count2" :key="item" :name="item" closable @on-close="handleClose2">{{ item}}</Tag>
		                    <Button icon="ios-plus-empty" type="dashed" size="small" @click="addItem2">添加业务模块</Button>
		                </Col>
		            </Row>
               
            	</div>

				

            </div>
		</Card>


		<Modal ref="addPop" v-model="modaAdd" title="添加模块" @on-ok="submitAdd"  ok-text="提交" :loading="modal_add_loading" visible="true">
            <Form :model="formItem" :label-width="80" >
                <FormItem label="模块名称" v-if="technologyORbusiness">
                    <Input v-model="formItem.technologyName" placeholder="请输入项目名称"></Input>
                </FormItem>
                <FormItem label="模块名称" v-else>
                    <Input v-model="formItem.businessName" placeholder="请输入项目名称"></Input>
                </FormItem>
               
            </Form>
        </Modal> 


	</div>
</template>
<script>
export default {
	data () {
        return {
        	modaAdd: false,
            modal_add_loading: true,

            technologyORbusiness:true,
            formItem: {
                technologyName:"",
                businessName:"",
            },
        	count: ["技术模块1", "技术模块2", "技术模块3"],
        	count2: ["业务模块1", "业务模块2", "业务模块3"],
        }
    },
     methods: {
     	addItem(){
            this.modaAdd = true;
            this.technologyORbusiness = true;
        },
        addItem2(){
            this.modaAdd = true;
            this.technologyORbusiness = false;
        },
        formItemReset(){
            this.$nextTick(() => {
                this.formItem.name = "";
                this.formItem.technologyName = "";
                
            });
        },
        submitAdd () {
            setTimeout(() => {
            	this.technologyORbusiness ? this.count.push(this.formItem.technologyName) : this.count2.push(this.formItem.businessName)
                this.modaAdd = false;
                this.$Message.info('成功');
                this.formItemReset();
            },1000)
            
        },
        handleAdd () {
            if (this.count.length) {
                this.count.push(this.count[this.count.length - 1] + 1);
            } else {
                this.count.push(0);
            }
        },
        handleClose (event, name) {
            const index = this.count.indexOf(name);
            this.count.splice(index, 1);
        },
        handleClose2 (event, name) {
            const index = this.count2.indexOf(name);
            this.count2.splice(index, 1);
        }
    }
}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';
.tableBox{
    padding-top: 0;
}
.baseInfoTable{
	td,th{
	box-sizing: border-box;
    border: 1px solid #e9eaec;
    height: 48px;
    vertical-align:middle;
	}
	td{
		padding-left:0.5em;
		color:#495060;
		font-size:12px;
	}
	th{
		
		font-size:14px;
		font-weight: normal;
		background-color: #2db7f5;
    	color: #fff;
	}

}
.addModule{
	padding-top:30px;
	padding-bottom:30px;
}
.tagBox {
	padding-bottom:30px;

}
h4{
	font-size:14px;
	color:#495060;
	font-weight: normal;
	height:26px;
	line-height: 26px;
}
</style>