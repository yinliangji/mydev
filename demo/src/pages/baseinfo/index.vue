<template>
	<div class="pageContent">
		<Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>敏捷项目管理</BreadcrumbItem>
            <BreadcrumbItem>项目基本信息</BreadcrumbItem>
        </Breadcrumb>
        <Card>
        	<div class="baseInfoBox">
            	<h3 class="Title">项目基本信息</h3>
            	<div class="tableBox">
            		<!-- -->
            		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
					  <tbody>
					    <tr>
					      <th>项目编号</th>
					      <td>prj0001</td>
					      <th>项目名称</th>
					      <td>TPM敏捷项目管理系统</td>
					      <th>项目经理</th>
					      <td>李卓</td>
					    </tr>
					    <tr>
					      <th>项目创建时间</th>
					      <td>2017-08-01</td>
					      <th>开始时间</th>
					      <td>2017-08-01</td>
					      <th>结束时间</th>
					      <td>2017-12-31</td>
					    </tr>
					    <tr>
					      <th>开发人员</th>
					      <td>李卓、谢蓓、王昕亮</td>
					      <th>测试人员</th>
					      <td>李卓  谢蓓 王昕亮</td>
					      <th>维护人员</th>
					      <td>李卓、赵筝、谢蓓、王昕亮、邢磊</td>
					    </tr>
					    <tr>
					      <th>项目描述</th>
					      <td>TPM敏捷项目管理系统</td>
					      <th>项目目标</th>
					      <td>支持备课敏捷开发模块的落地</td>
					      <th>&nbsp;</th>
					      <td>&nbsp;</td>
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
		                    <Tag v-for="item in count" :key="item" :name="item" closable @on-close="handleClose2">技术模块{{ item + 1 }}</Tag>
		                    <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAdd">添加</Button>
		                </Col>
		            </Row>
                  <!--   <Select v-model="model1" style="width:200px">
				        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
				    </Select>
				    <Button type="ghost">添加模块</Button> -->
            	</div>

				

            </div>
		</Card>
	</div>
</template>
<script>
export default {
	data () {
        return {
        	count: [0, 1, 2],
            cityList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
                {
                    value: 'Paris',
                    label: 'Paris'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }
            ],
            model1: ''
        }
    },
     methods: {
        handleAdd () {
            if (this.count.length) {
                this.count.push(this.count[this.count.length - 1] + 1);
            } else {
                this.count.push(0);
            }
        },
        handleClose2 (event, name) {
            const index = this.count.indexOf(name);
            this.count.splice(index, 1);
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