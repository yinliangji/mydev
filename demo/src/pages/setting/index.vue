<template>
	<div class="pageContent">
		<goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :TOP="'7'" />
		<selectMenu @changeSelect="selectMenuFn" @sendData="getSendData"></selectMenu>
		<Card class="detailContBox">
			<Tabs value="name1" type="card" >
				<TabPane label="设置分组" name="name1">
		        	<div class="baseInfoBox">
		        		<!-- 分组开始 -->
		        		setting
		        		<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" >
			        		<div class="fromBox fromBox2">
			        			<div class="addpartBox">
		                            <Button type="success" @click="addpart">添加分组</Button>
		                        </div>
		                        <!--  -->
		                        <div class="newAddGroup">
		                            <Row v-for="(myItem,index) in formValidate.AddGroupList" :key="index" >
		                                <Col span="20">
		                                    <!-- <FormItem 
		                                        :label="myItem.myLabel" 
		                                        :prop="'AddGroupList.'+index+'.group'"
		                                        :rules="{required: myItem.required, type: 'array', message: '请选择或者填写'+myItem.myLabel+'，不能为空！', trigger: 'change'}" 
		                                         
		                                        :ref="myItem.myRef+index" 
		                                        :class="myItem.myRef+index"
		                                        >
		                                        <Select v-model="myItem.group" :id="'sel'+index" filterable :loading="inputLoad"  multiple :placeholder="'请输入内容并选择【'+myItem.myLabel+'】'">
		                                            <Option v-for="(item,index2) in myItem.groupList" :value="item.value" :key="index2">
		                                                {{ item.label }}
		                                            </Option>
		                                        </Select>
		                                    </FormItem> -->
		                                    <FormItem 
                                        :label="myItem.myLabel" 
                                        :prop="'AddGroupList.'+index+'.group'"
                                        :rules="{required: myItem.required, type: 'array', message: '请选择或者填写'+myItem.myLabel+'，不能为空！', trigger: 'change'}" 
                                         
                                        :ref="myItem.myRef+index" 
                                        :class="myItem.myRef+index"
                                        >
                                        <div :id="'roleBox_'+index">
                                            <Tag v-for="(item,index2) in myItem.groupList" :value="item.value" :key="index2" :name="index2" closable @on-close="roleClose">
                                                {{ item.label}}
                                            </Tag>
                                            <Button 
                                                icon="ios-plus-empty" 
                                                type="dashed" 
                                                size="small" 
                                                @click="addRole(index)"
                                                >
                                                添加人员
                                            </Button>
                                            <Modal 
                                                :ref="myItem.myReftemp+index" 
                                                :class="myItem.myReftemp+index" 
                                                v-model="formValidate.AddGroupList[index].modaAdd" 
                                                :title="'添加'+formValidate.AddGroupList[index].myLabel+'人员'" 
                                                @on-ok="submitRole(index)"  
                                                ok-text="添加"
                                                @on-cancel="cancelRole(index)"
                                                >
                                                <Select v-model="myItem.grouptemp" :id="'sel'+index" filterable :loading="inputLoad"  multiple :placeholder="'请输入内容并选择【'+myItem.myLabel+'】'">
                                                    <Option v-for="(item,index2) in myItem.groupListtemp" :value="item.value" :key="index2">
                                                        {{ item.label }}
                                                    </Option>
                                                </Select>
                                            </Modal>
                                        </div>
                                    </FormItem>
                                    <!--  -->
		                                </Col>
		                                <Col span="1">&nbsp;</Col>
		                                <Col span="3">
		                                    <Button v-if="myItem.delBtn"  type="error" long  @click="groupDel(index)">删除角色</Button>
		                                </Col>
		                            </Row>
		                        </div>
		                        <!--  -->
			        		</div>
		        		</Form>

		        		<Modal ref="addPartPop" v-model="partAdd" title="添加分组" @on-ok="submitPart('addPartPopBox')" on-cancel="partCancel"  ok-text="确定"  visible="true" :loading="formPartValidate.loading">
				            <Form  :label-width="80" ref="addPartPopBox" :model="formPartValidate" :rules="rulePartValidate">
				                <FormItem label="分组名称" prop="partName">
				                    <Input v-model="formPartValidate.partName" placeholder="请输入角色名称（最多四个字）" :maxlength="8"></Input>
				                </FormItem>

								<FormItem label="选择人员" prop="partNameList">
				                	<Select v-model="formPartValidate.partNameList" multiple placeholder="请选择人员" >
				                        <Option v-for="(item,index) in formPartValidate.memberList" :value="item.value" :key="index">{{ item.label }}</Option>
				                    </Select>
				                </FormItem>
				            </Form>
				        </Modal>
		        		<!-- 分组结束 -->
		        	</div>
		        </TabPane>
			</Tabs>
				
		</Card>
	</div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {getUserByProjId} = Common.restUrl;
export default {
	components:{
		
	},
	data () {
		const validatePart = (rule, value, callback) => {
            console.log(value)
            if(!value){
                return callback(new Error('内容不能为空！'));    
            }else{
                if(this.formValidate.AddGroupList.length){
                    for(var i=0;i<this.formValidate.AddGroupList.length;i++){
                        if(this.formValidate.AddGroupList[i].myValue == (value+"")){
                            return callback(new Error('内容重复！')); 
                        }
                    }
                    callback()
                }else{
                    callback()
                }
            }
        };
		return {
			
			partAdd: false,
			formValidate: {
                AddGroupList:[],
            },
            formPartValidate: {
                loading:true,
                partName: '',
                addGroupList: [
                ],
                partNameList:[],
                memberList:[],
                //formPartValidate.partName
            },
            rulePartValidate: {
            	partName: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                ],
                partNameList: [
                    { required: true, validator: validatePart,  trigger: 'blur' }
                ],
            },
             ruleValidate: {

            },
            inputLoad:false,
            
		}	
	},
	watch:{
		
	},
	mounted(){
		let ID = this.getID() ? this.getID() : this.$router.push('/agile');
		this.addTeam(getUserByProjId,{projectId:ID});

	},
	methods:{
		getID(){
			return Common.GETID(this,Common);
		},
		//设置分组start
		
		roleClose (event, name) {
            Common.RoleClose(this,event, name)
        },
		addRole(i){
            Common.AddRole(this,i)
        },
        cancelRole(i){
            Common.CancelRole(this,i)
        },
        submitRole(i){
            Common.SubmitRole(this,i,Common);
        },
		addTeam(URL, params){
     
			defaultAXIOS(URL,params,{timeout:5000,method:'get'})
			.then((response) => {
				let myData = response.data;
				console.log("<======【设置分组 获取人员】***response+++",response,myData,"====>");
				let _tempObj = {};

				if(myData && Array.isArray(myData) && myData.length){
					for(var i=0;i<myData.length;i++){
						_tempObj.value = myData[i].user_name;
						_tempObj.label = myData[i].nick_name;
						this.formPartValidate.memberList.push(_tempObj);
						_tempObj = {};
					}
				}else{
					console.log(URL+"没有信息");
			  		this.showError(URL+"没有信息");
				}
			  
			})
			.catch( (error) => {
			  console.log(error);
			  this.showError(error);
			});   
    	},
		//
		publishUserFn(URL,params = {},Arr=[]){
            defaultAXIOS(URL,params,{timeout:5000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======设置分组 获取人员】***response+++",response,myData,"====>");
                
               
                let _tempObj = {
                    myRef: "selfRef",
                    group: [],
                    groupList: [],
                    myLabel: "",
                    myValue: "",
                    delBtn: true,
                    groupName: "",
                    required: true,
                    modaAdd:false,//修改添加角色
                    grouptemp:[],//修改添加角色
                    groupListtemp: [],//修改添加角色
                    myReftemp: "selfRefRole",//修改添加角色
                }
                
                

                let _ARRobj = {}
                if(myData.nick_name && myData.user_name){
                    _ARRobj.label = myData.nick_name
                    _ARRobj.value = myData.user_name
                    _tempObj.group.push(myData.user_name)
                    _tempObj.groupList.push(_ARRobj)
                }else{
                    _ARRobj.label = Common.getCookie("username") 
                    _ARRobj.value = Common.getCookie("nickname")
                    _tempObj.group.push(Common.getCookie("nickname"))
                    _tempObj.groupList.push(_ARRobj)

                }
                

                
                this.formValidate.AddGroupList.push(_tempObj);
            }).catch( (error) => {
                console.log(error);
               
                this.showError(error);
            });   
        },
		partCancel(){
            this.partAdd = false;
            this.formPartValidate.partName = "";
            this.$refs.addPartPopBox.resetFields();
            
        },
        submitPart(name){
            //
            let that = this;
			that.$refs[name].validate((valid) => {
				that.formPartValidate.loading = false;
				that.$nextTick(() => {
				  that.formPartValidate.loading = true;
				});
				if (valid) {
					that.formPartValidate.loading = true;
					that.$nextTick(() => {
						that.formPartValidate.loading = true;
					});
					let _tempObj = {
						myRef: "selfRef",
						group: [],
						groupList: [],
						myLabel: "",
						myValue: "",
						delBtn: false,
						groupName: "",
						required: true,
						modaAdd:false,//修改添加角色
						grouptemp:[],//修改添加角色
						groupListtemp: [],//修改添加角色
						myReftemp: "selfRefRole",//修改添加角色
					}
					_tempObj.myLabel = that.formPartValidate.addGroupList.length ? that.formPartValidate.addGroupList.filter((item) => {
						return item.value == that.formPartValidate.partName
					})[0].label : that.formPartValidate.partName;
					_tempObj.myValue = that.formPartValidate.partName;
					_tempObj.groupListtemp.push(...this.formPartValidate.memberList);
					_tempObj.groupListtemp.forEach((item,index)=>{
						if(item.value == this.formPartValidate.partNameList[index]){
							_tempObj.groupList.push(item);		
						}
					});


					that.formValidate.AddGroupList.push(_tempObj);
					that.formPartValidate.partName = "";
					_tempObj = null;
					that.partAdd = false;
				}
			})
            //
            
        },
		addpart(){
            this.partAdd = true;
        },
        //设置分组end
		getSendData(data){
            console.log(data,"<==========getSendData");
        },
        selectMenuFn(N){
            console.log(N,"<==========selectMenuFn");
        },
	},

}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';
.detailContBox{
    position:relative;
}

.fromBox {
    width: 80%;
}

.addpartBox{
    padding-bottom: 20px;
    text-align: left;
}
</style>