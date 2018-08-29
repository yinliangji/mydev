<template>
	<div class="pageContent">
		<goAgile :go="'/product'" :text="'返回用户故事列表'" :top="'7'" />
		<Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>用户故事</BreadcrumbItem>
            <BreadcrumbItem>用户故事基本信息</BreadcrumbItem>
        </Breadcrumb>
        <Card>
        	<Tabs value="name1">
		        <TabPane label="用户故事基本信息" name="name1">
					<div class="baseInfoBox">
		            	<h3 class="Title">用户故事基本信息</h3>
		            	<div class="tableBox">
		            		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
							  <tbody>
							  	<tr>
								  <th width="13%">所属产品</th>
								  <td width="20%">{{ formValidate.product_name | FALSEINFO}}</td>
								  <th width="13%">所属项目</th>
								  <td width="20%" >{{ formValidate.prj_name | FALSEINFO}}</td>
								  <th width="13%">用户故事名称</th>
								  <td>{{ formValidate.userstory_name | FALSEINFO}}</td>
								</tr>
								<tr>
								  <th width="13%">故事类型</th>
								  <td width="20%">{{ formValidate.userstory_type | FALSEINFO}}</td>
								  <th width="13%">故事状态</th>
								  <td width="20%" >{{ formValidate.userstory_status | FALSEINFO}}</td>
								  <th width="13%">优先级</th>
								  <td>{{ formValidate.proi | FALSEINFO}}</td>
								</tr>
								<tr>
								  <th>故事描述</th>
								  <td colspan="5">{{ formValidate.userstory_desc | FALSEINFO}}</td>
								</tr>
								
							  </tbody>
							</table>
		            	</div>
		            </div>
		        </TabPane>
		        <TabPane label="计划效率相关" name="name2">
		        	<div class="baseInfoBox">
		            	<h3 class="Title">计划故事相关</h3>
		            	<div class="tableBox">
		            		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
							  <tbody>
								<tr>
								  <th width="13%">所属迭代</th>
								  <td width="20%">{{ formValidate.sprint_name | FALSEINFO}}</td>
								  <th width="13%">工时(预计)</th>
								  <td width="20%" >{{ formValidate.manHours | FALSEINFO}}</td>
								  <th width="13%">工时(实际)</th>
								  <td>0</td>
								</tr>

								<!-- <tr>
								  <th>关联任务(已完成)</th>
								  <td>无数据</td>
								  <th>关联任务(全部)</th>
								  <td>无数据</td>
								  <th>&nbsp;</th>
								  <td>&nbsp;</td>
								</tr> -->
								
							  </tbody>
							</table>
		            	</div>
		            </div>
		        </TabPane>
		        <TabPane label="需求相关" name="name3">
		        	<div class="baseInfoBox">
		            	<h3 class="Title">需求相关</h3>
		            	<div class="tableBox">
		            		<!-- -->
		            		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
							  <tbody>
								<tr>
								  <th width="13%">所属需求</th>
								  <td width="20%">{{ formValidate.req_name | FALSEINFO}}</td>
								  <th width="13%">需求提出人</th>
								  <td width="20%" >{{ formValidate.proposer | FALSEINFO}}</td>
								  <th width="13%">提出人部门</th>
								  <td>{{ formValidate.proposer_department | FALSEINFO}}</td>
								</tr>
							  </tbody>
							</table>
		            		<!-- -->
		            	</div>
		            </div>
		        </TabPane>
		    </Tabs>
		  
            <!-- <div class="addModule">
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
        	</div> -->
        	
		</Card>


		


	</div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {storyGetDetail} = Common.restUrl;
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
        	formValidate: {
				id: "",
				userstory_id: "",
				userstory_name: "",
				userstory_type: "",
				charger: "",
				userstory_status: "",
				proi: "",
				manHours: "",
				mission: "",
				phycics_sys_id:"",
				actual_online_time:"",
				charger:"",
				created_time:"",
				last_chg_time:"",
				last_chgr:"",
				learn_concern:"",
				plan_online_time:"",
				proposer:"",
				proposer_department:"",
				req_id:"",
				req_name:"",
				sprint: "",
				sprint_name:"",
				userstory_desc:"",
				prj_id:"",
				prj_name:"",
				prod_id:"",
				product_name:"",        		
            },
        }
    },
    mounted(){
    	if(this.$router.history.current.query.detail_id){
    		this.storyGetDetailFn(storyGetDetail,this.$router.history.current.query.detail_id)
    	}else{
    		this.$router.push('/product')
    	}
    	
    },
    methods: {
		showError(ERR){
    		//alert(ERR)
    		Common.ErrorShow(ERR,this);
    	},
     	storyGetDetailFn(URL = "",detail_id){
            defaultAXIOS(URL,{detail_id},{timeout:5000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======product detail***response+++",response,myData,"======>");
                if(Object.getOwnPropertyNames(myData).length >2){
                	for(let i in myData){
                		if(i == "proi"){
                			this.formValidate[i] = ((N)=>{if(N == 1){return "高"}else if(N ==2){return "中"}else{return "低"}})(myData[i])
                		}else if(i == "userstory_type"){
                			this.formValidate[i] = ((N)=>{if(N == 1){return "用户需求"}else if(N ==2){return "生产问题"}else if(N ==3){return "自主创新"}else{return "未知"}})(myData[i])
                		}else if(i == "userstory_status"){
                			this.formValidate[i] = ((N)=>{if(N == 1){return "提出"}else if(N ==2){return "开发中"}else if(N ==3){return "测试"}else if(N ==4){return "上线"}else{return "未知"}})(myData[i])
                		}
                		else{
                			this.formValidate[i] = myData[i]
                		}
                		
                	}
                	console.log("this.formValidate",this.formValidate)

                }else{
                	this.showError("没有数据");
                }
                
                


                





            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },        
       
       
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