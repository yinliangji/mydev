<template>
	<div class="pageContent">
		<goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :top="'7'" />
		<selectMenu></selectMenu>
       
        <Card>
        	<Tabs value="name1">
		        <TabPane label="项目基本信息" name="name1">
		        	<div class="baseInfoBox">
		            	<h3 class="Title">项目基本信息</h3>
		            	<div class="tableBox">
		            		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
							  <tbody>
								<tr>
								  <th width="11%">项目编号</th>
								  <td>{{ formValidate.prj_id | FALSEINFO}}</td>
								  <th width="11%">项目名称</th>
								  <td>{{formValidate.prj_name | FALSEINFO}}</td>
								  <th width="11%">所属产品</th>
								  <td>{{formValidate.prod_name | FALSEINFO}}</td>
								</tr>
								<tr>
								  <th>项目创建时间</th>
								  <td>{{formValidate.settle_time | FALSEINFO}}</td>
								  <th>开始时间</th>
								  <td>{{formValidate.start_time | FALSEINFO}}</td>
								  <th>结束时间</th>
								  <td>{{formValidate.end_time | FALSEINFO}}</td>
								</tr>

								<tr>
								  <th>所属模块</th>
								  <td colspan="5">{{formValidate.modules | FALSEINFO}}</td>
								</tr>
								
								<tr>
								  <th>项目描述</th>
								  <td colspan="5">{{formValidate.prj_desc | FALSEINFO}}</td>
								</tr>
								<tr>
								  <th>项目目标</th>
								  <td colspan="5">{{formValidate.prj_goal | FALSEINFO}}</td>
								</tr>
							  </tbody>
							</table>
		            	</div>
		            </div>
		        </TabPane>
		        <TabPane label="成员信息" name="name2">
		        	<div class="baseInfoBox">
		            	<h3 class="Title">成员信息</h3>
		            	<div class="tableBox">
		            		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
								<tbody >
									<tr v-for="(item,index) in formValidate.person" :key="index">
										<th width="11%">{{item.title}}</th>
										<td>
											<span v-for="(item2,index2) in item.member" :key="index2">
												{{item2.nick_name}}
											</span>
										</td>
									</tr> 
									
									<!-- <tr>
										<th width="11%">项目经理</th>
										<td>{{formValidate.managerGroup | FALSEINFO}}</td>
										<th width="11%">开发人员</th>
										<td>{{formValidate.developerGroup | FALSEINFO}}</td>
										<th width="11%">测试人员</th>
										<td>{{formValidate.testerGroup | FALSEINFO}}</td>

									</tr>
									<tr>
										<th>总体组</th>
										<td>{{formValidate.allgroup | FALSEINFO}}</td>
										<th>&nbsp;</th>
										<td>&nbsp;</td>
										<th>&nbsp;</th>
										<td>&nbsp;</td>
									</tr> -->
								</tbody>
							</table>
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
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {projectDetail} = Common.restUrl;
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
        		prj_id:"",
                prj_name:"",
                settle_time:"",
                start_time: "",
                end_time: "",
                prj_desc: "",
                prj_goal:"",
                modules:"",
                prod_name:"",
                person:[],
                // allgroup:"",
                // managerGroup:"",
                // developerGroup:"",
                // testerGroup:"",
            },
            table:[],
            HTML:"<div>aaaa</div>"
        }
    },
    mounted(){
    	if(this.$router.history.current.query.id){
    		localStorage.setItem('id', this.$router.history.current.query.id);
    		this.tableDataAjaxFn(projectDetail,this.$router.history.current.query.id);
    	}else{
    		if(localStorage.getItem('id')){
    			this.tableDataAjaxFn(projectDetail,localStorage.getItem('id'))
    		}else{
    			this.tableDataAjaxFn(projectDetail,0)
    		}
    		
    	}
    	
    },
    
    methods: {
    	showError(ERR){
    		//alert(ERR)
    		this.$Notice.config({
                top:100,
                duration: 60
            });

            let MET = false;
            let URL = false;
            if(ERR && ERR.config){
                MET = ERR.config.method ? ERR.config.method : "无method";
                URL = ERR.config.url ? ERR.config.url : "无url";
            }else if(ERR){
                MET = ERR;
                URL = ERR;
            }else{
                MET = "无";
                URL = "无";
            }
            this.$Notice.open({
                title: MET+" | "+URL,
                desc: JSON.stringify(ERR),
                duration: 60
            });
    	},
     	tableDataAjaxFn(URL = "",ID = 0){
            defaultAXIOS(URL+ID,{},{timeout:2000,method:'get'}).then((response) => {
                //alert(JSON.stringify(response))
                let myData = response.data;
                console.log("<======detail***response+++",response,myData,"+++detail***response======>");
                let _temp = false;
                if(myData.data && myData.data.id){
                	for(var I in this.formValidate){
                		//_temp = myData.data[I]+"";
                		this.formValidate[I] = myData.data[I];
                		console.log(this.formValidate[I])

                	// if(_temp.indexOf("|") != -1){
	                //    	this.formValidate[I] = myData.data[I].replace("|","、").replace("|","").replace(/、?$/g,"");
	                //    }else{
	                //        this.formValidate[I] = myData.data[I];
	                //    }
                	}
                }


                if(myData.person && myData.person.length){
                	
                	this.formValidate.person = myData.person;
                	for(var J=0;J<this.formValidate.person.length;J++){
                		for(var K=0;K<this.formValidate.person[J].member.length-1;K++){
                			this.formValidate.person[J].member[K].nick_name = this.formValidate.person[J].member[K].nick_name+"、";
                			
                		}
                	}


                	let _tempArr = [];
                	let rows = 3;
                	let _SH = parseInt(this.formValidate.person.length/rows);
                	for(var i=0;i<this.formValidate.person.length;i++){
                		if(i/rows && Number.isInteger(i/rows)){
                			this.table.push(_tempArr);
                			_tempArr = []
                			console.log("=-=-=-=-=-",i , _SH*rows,i >= _SH*rows,this.formValidate.person.length-i)
                			if( i >= _SH*rows){
                				let _jn = this.formValidate.person.length -(this.formValidate.person.length-i);
                				let _sn = rows - (this.formValidate.person.length-i);
                				let _demo = {
					                "title":"&nbsp;",
					                "member":[
					                    {
					                        "nick_name":"&nbsp;",
					                        "prj_id":"",
					                        "role_name":"",
					                        "user_name":"",
					                        "id":4,
					                    },
					                ],
					            }
                				for(var j=_jn;j<this.formValidate.person.length;j++){
                					_tempArr.push(this.formValidate.person[j]);
                				}
                				for(var k=0;k<_sn;k++){
                					_tempArr.push(_demo);
                				}
                				this.table.push(_tempArr);
                				_tempArr = []
                			}else{
                				_tempArr.push(this.formValidate.person[i]);
                			}
                		}else{
                			_tempArr.push(this.formValidate.person[i])
                		}
                	}
                	console.log("this.table",this.table);
                	let TR = "";
                	let TH = "";
                	let TD = "";
                	for(var tr =0;tr<this.table.length;tr++){
                		TR += "<tr>";
                		for(var th = 0; th<this.table[tr].length;th++){
                			TH += "<th>"
                			TH += "<==="+JSON.stringify(this.table[tr])+"====>"
                			// for(var th1 = 0;th1<this.table[tr].length;th1++){

                			// }
                			TH += "</th>"
                			TH += "<td>"
                			TH += "this.table[td]"
                			TH += "</td>"
                		}
                		TR += TH; 
                		
                		
                		TR += "</tr>"; 
                	}
                	console.log(TR)





                }





            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
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