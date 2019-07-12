<template>
	<div>
		<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" >
    		<div class="fromBox fromBox2">
    			<div class="addpartBox">
                    <Button type="success" @click="addpart('addPartPopBox')" :disabled="isModify" icon="md-add">添加小组</Button>
                </div>
                <!--  -->
                <div class="newAddGroup" id="settingAddBox">
                    <Row v-for="(myItem,index) in formValidate.AddGroupList" :key="index" >
                        <Col span="20">
                            <FormItem 
                                :label="myItem.myLabel" 
                                :prop="'AddGroupList.'+index+'.group'"
                                :rules="{required: myItem.required, type: 'array', message: '请选择或者填写'+myItem.myLabel+'，不能为空！', trigger: 'change'}" 
                                :ref="myItem.myRef+index" 
                                :class="myItem.myRef+index"
                                >
                                <div :id="'@roleBox_'+index">
                                	<div class="ivu-tag" style="cursor:default;">小组长：</div>
                                	<Tag v-for="(item,index3) in myItem.groupLeader" :value="item.value" :key="index3" :name="index3" :id="'@'+myItem.myValue+'_'+item.value+'_'+index+'_'+index3" :closable="!isModify" @on-close="roleCloseGL">
                                        {{ item.label}}
                                    </Tag>
                                    <Button 
										v-show="myItem.groupLeader.length==0"
                                        icon="ios-plus-empty" 
                                        type="success" 
                                        size="small" 
                                        @click="addRoleGL(index)"
                                        :disabled="isModify"

                                        >
                                        添加{{formValidate.AddGroupList[index].myLabel}}小组长
                                    </Button>

                            	</div>
                                <div :id="'roleBox_'+index">
                                	<div class="ivu-tag" style="cursor:default;">小组员：</div>
                                    <Tag v-for="(item,index2) in myItem.groupList" :value="item.value" :key="index2" :name="index2" :id="myItem.myValue+'_'+item.value+'_'+index+'_'+index2" :closable="myItem.isEdit" @on-close="roleClose">
                                        <!-- :closable="!isModifyMember" -->
                                        {{ item.label}}
                                    </Tag>

                                    <Button 
                                        icon="ios-plus-empty" 
                                        type="success" 
                                        size="small" 
                                        @click="addRole(index)"
                                        :disabled="!myItem.isEdit"
                                        shape="circle"
                                        >
                                        添加{{myItem.myLabel}}人员
                                        <!-- :disabled="isModifyMember" -->
                                    </Button>
                                </div>
                                <Modal 
                                    :ref="myItem.myReftemp+index" 
                                    :class="myItem.myReftemp+index" 
                                    v-model="formValidate.AddGroupList[index].modaAdd" 
                                    :title="'添加'+formValidate.AddGroupList[index].myLabel+''" 
                                    @on-ok="submitFn(index)"  
                                    ok-text="添加"
                                    @on-cancel="cancelRole(index)"
                                    >
                                    <Select 
                                    	@on-change="onChange" 
                                    	@on-clear="onClear" 
                                    	@on-query-change="onQueryChange" 
                                    	@on-open-change="onOpenChange" 
                                    	v-model="myItem.grouptemp" 
                                    	:id="'sel'+index" 
                                    	:filterable="false"
                                    	:loading="inputLoad"  
                                    	:multiple="!myItem.groupLeaderAddBtnClick" 
                                    	:placeholder="'请输入内容并选择【'+myItem.myLabel+'】'"
                                    	>
                                        <Option v-for="(item,index2) in myItem.groupListtemp" :value="item.value" :key="index2">
                                            {{ item.label }}
                                        </Option>
                                    </Select>
                                </Modal>

                            </FormItem>
                            

                        </Col>
                        <Col span="1">&nbsp;</Col>
                        <Col span="3">
                            <Button v-if="myItem.delBtn" :disabled="isModify"  type="error" long  @click="groupDel(index)">
                            	删除小组
                        	</Button>
                        </Col>
                    </Row>
                </div>
                <!--  -->
    		</div>
		</Form>

		<Modal ref="addPartPop" v-model="partAdd" title="添加小组" @on-ok="submitPart('addPartPopBox')" on-cancel="partCancel('addPartPopBox')"  ok-text="确定"  visible="true" :loading="formPartValidate.loading">
            <Form  :label-width="100" ref="addPartPopBox" :model="formPartValidate" :rules="rulePartValidate">
                <FormItem label="小组名称" prop="partName">
                    <Input v-model="formPartValidate.partName" placeholder="请输入小组名称" :maxlength="100"></Input>
                </FormItem>

				<FormItem label="选择小组长" prop="groupLeaderList">
                	<Select v-model="formPartValidate.groupLeaderList" placeholder="请选择小组长" >
                        <Option v-for="(item,index) in formPartValidate.memberList" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select>
                </FormItem>
				<FormItem label="选择人员" prop="partNameList">
                	<Select v-model="formPartValidate.partNameList" multiple placeholder="请选择人员" >
                        <Option v-for="(item,index) in formPartValidate.memberList" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="modaDelete" width="300">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>删除无法恢复，是否继续？</p>
            </div>
            <div slot="footer">
                <Button color="#1c2438" @click="delEnter">删除</Button>
                <Button type="primary" @click="delCancel">取消</Button>
            </div>
        </Modal>
	</div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {getUserByProjId,addGroupUsers,addUsers,deleteMember,deleteGroup,listGroup,getPermission,deleteGroupLeader,addGroupLeader} = Common.restUrl;
export default {
	components:{
		
	},
	props: {
      Data: {
          type: [String,Number,Boolean,Function,Object,Array,Symbol],
          default: function() {
              return false;
          }
      },
    },
	data () {
		return {
			modaDelete: false,
            thisIndex:null,
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
                groupLeaderList:"",
                //formPartValidate.partName formPartValidate.memberList
            },
            rulePartValidate: {
            	partName: [
                    { required: true, message: '请填写', trigger: 'blur' }
                ],
                partNameList: [
                    { required: false, type: 'array', message: '请选择',  trigger: 'change' }
                ],
                groupLeaderList: [
                    { required: false, message: '请选择', trigger: 'change' }
                ],
                /*
                groupLeaderList: [
                    { required: true, type: 'array', message: '请选择',  trigger: 'change' }
                ],
                */
            },
            ruleValidate: {
            },
            inputLoad:false,
            onChangeData:false,

            prj_permission:false,
			identity:false,
			isModify:true,
            isModifyMember:true,
			
		}	
	},
	watch:{
        Data(D){
            this.get_permission(D);
            this.get_permissionMember(D);
        },
        formValidate: {
            handler(val, oldVal) {
                if(val){
                }
            },
            deep: true
        },
    },
    beforecreated(){
        console.log("分组设置--beforecreated-------",this.formPartValidate,this.formValidate);
    },
    created(){
        console.log("分组设置--created-------",this.formPartValidate,this.formValidate);
    },
    beforeUpdate(){
        console.log("分组设置--beforeUpdate-------",this.formPartValidate,this.formValidate)
    },
    updated(){
        console.log("分组设置--updated-------",this.formPartValidate,this.formValidate)
    },
	mounted(){

        let ID = this.getID() ? this.getID() : this.$router.push('/agile');
        if(this.Data){
            this.get_permission(this.Data);
            this.get_permissionMember(this.Data);
        }
		this.addTeam(getUserByProjId,{projectId:ID}).then(()=>{
			this.getGroupList(listGroup,{prjSn:Common.GETprjid(this,Common),id:ID,username:Common.getStorageAndCookie(this,Common,"username"),});
		},()=>{})
	},
	methods:{
		get_permission(D){
            let Ide = D.identity;
            let Per = D.prj_permission || D.permission;
            if(Per && Array.isArray(Per) && Per.length){
                this.isModify = (Per.findIndex(item=>item == "icdp_proj_group_mng") != -1) ? false : true;
            }else{
                this.isModify = true;
            }
            // else if(Ide && (Ide == "SuperAdmin" || Ide == "PlainAdmin" || Ide == "PrjManager")){
            //     this.isModify = false;
            // }

        },
        get_permissionMember(D){
            let Ide = D.identity;
            let Per = D.prj_permission || D.permission;
            if(Ide && (Ide == "SuperAdmin" || Ide == "PlainAdmin" || Ide == "PrjManager")){
                this.isModifyMember =  false;
            }else if(Per && Array.isArray(Per) && Per.length){
                this.isModifyMember = (Per.findIndex(item=>item == "icdp_proj_group_mng") != -1 || Per.findIndex(item=>item == "icdp_proj_group_menber_edit") != -1) ? false : true;
            }else{
                this.isModifyMember = true;
            }

        },



        
		
		getID(){
			return Common.GETID(this,Common);
		},
		//设置小组start
		
		getGroupList(URL, params){
			return defaultAXIOS(URL,params,{timeout:5000,method:'get'})
			.then((response) => {
				let myData = response.data;
				console.log("<======【设置小组 获取小组】***response+++",response,myData,"====>");
				let groupList = (Arr)=>{
                    let _demoObj = {};
                    let _demoArr = [];
                    if(Arr.length){
                        for(var A=0;A<Arr.length;A++){
                            _demoObj.value = Arr[A].user_name;
                            _demoObj.label = Arr[A].nick_name;
                            _demoArr.push(_demoObj);
                            _demoObj = {};
                        }
                        return _demoArr;
                    }else{
                        return  [];
                    }
                }
                let group = (Arr)=>{
                    let _demoArr = [];
                    if(Arr.length){
                        for(var A=0;A<Arr.length;A++){
                            _demoArr.push(Arr[A].user_name);
                        }
                        return _demoArr;
                    }else{
                        return  [];
                    }
                }
                let groupLeader = (obj)=>{
                    if(obj && Common.IsObject(obj)){
                    	if(obj.user_name && obj.nick_name){
                    		obj.value = obj.user_name;
                    		obj.label = obj.nick_name;
                    		return [obj];
                    	}else{
                    		return  [];
                    	}
                    }else{
                        return  [];
                    }
                }

				if(myData && myData.status == "success"){
					this.formValidate.AddGroupList = [];
					let _tempObj
                    if(myData.data && Array.isArray(myData.data) && myData.data.length){
                    	//
	                    for(var J=0;J<myData.data.length;J++){
	                        _tempObj = {
	                            myRef:"selfRef",
	                            group:[],
	                            groupList:[],
	                            myLabel:"",
	                            myValue:"",
	                            delBtn:true,
	                            groupName:"",
	                            required:false,
	                            modaAdd:false,//修改添加角色
	                            grouptemp:[],//修改添加角色
	                            groupListtemp: [],//修改添加角色
	                            myReftemp: "selfRefRole",//修改添加角色
	                            groupLeader:[],//小组长
	                            groupLeaderAddBtnClick:false,//小组长添加按钮
                                isEdit:"",
	                        }

	                        _tempObj.isEdit = myData.data[J].isEdit;
                            _tempObj.myLabel = myData.data[J].groupName;
	                        _tempObj.myValue = myData.data[J].group_sn;
	                        _tempObj.groupList = groupList(myData.data[J].member);
	                        _tempObj.group = group(myData.data[J].member); 
	                        _tempObj.groupLeader = groupLeader(myData.data[J].group_leader);
	                        this.formValidate.AddGroupList.push(_tempObj);
	                        _tempObj = false;
	                    }
                    	//
                    }
					return Promise.resolve(myData)
				}else{
					this.showError(URL+"_错误");
					return Promise.reject(myData);
				}
			})
			.catch( (error) => {
			  console.log(error);
			  this.showError(error);
			  return Promise.reject(error);
			});
		},
		delCancel(){
          this.modaDelete = false;
        },
        deleteGroup(URL, params){
			return defaultAXIOS(URL,params,{timeout:5000,method:'get'})
			.then((response) => {
				let myData = response.data;
				console.log("<======【设置小组 删除人员】***response+++",response,myData,"====>");
				if(myData.status == "success"){
					return Promise.resolve(myData)
				}else{
					this.showError(URL+"_错误");
					return Promise.reject(myData);
				}
			})
			.catch( (error) => {
			  console.log(error);
			  this.showError(error);
			  return Promise.reject(error);
			});   
    	},

        delEnter(){
        	let _groupSn = this.formValidate.AddGroupList[this.thisIndex].myValue;
            this.formValidate.AddGroupList.splice(this.thisIndex, 1);
            this.thisIndex = null;
            this.modaDelete = false;

            let _params = {
				groupSn:_groupSn,
			}

			this.deleteMember(deleteGroup,_params).then(()=>{
            	if(window.location.port == "9000"){
            		return
            	}
            	this.getGroupList(listGroup,{prjSn:Common.GETprjid(this,Common),id:this.getID(),username:Common.getStorageAndCookie(this,Common,"username"),});
            }, ()=>{
            	this.getGroupList(listGroup,{prjSn:Common.GETprjid(this,Common),id:this.getID(),username:Common.getStorageAndCookie(this,Common,"username"),});
            })



        },
		
		groupDel(I){
            this.thisIndex = I;
            this.modaDelete = true;
            
        },
		deleteMember(URL, params){
			return defaultAXIOS(URL,params,{timeout:5000,method:'get'})
			.then((response) => {
				let myData = response.data;
				console.log("<======【设置小组 删除人员】***response+++",response,myData,"====>");
				if(myData.status == "success"){
					return Promise.resolve(myData)
				}else{
					this.showError(URL+"_错误");
					return Promise.reject(myData);
				}
			})
			.catch( (error) => {
			  console.log(error);
			  this.showError(error);
			  return Promise.reject(error);
			});   
    	},
    	deleteGLeader(URL, params){
			return defaultAXIOS(URL,params,{timeout:5000,method:'get'})
			.then((response) => {
				let myData = response.data;
				console.log("<======【设置小组 删除小组长】***response+++",response,myData,"====>");
				if(myData.status == "success"){
					return Promise.resolve(myData)
				}else{
					this.showError(URL+"_错误");
					return Promise.reject(myData);
				}
			})
			.catch( (error) => {
			  console.log(error);
			  this.showError(error);
			  return Promise.reject(error);
			});   
    	},
		roleClose (event, name) {
			Common.RoleClose(this,event, name);
            let el = event.path[1].getAttribute("id").split("_");
            let _params = {
				groupSn:el[0],
				user_name:el[1],
			}
            this.deleteMember(deleteMember,_params).then(()=>{
            	if(window.location.port == "9000"){
            		return
            	}
            	this.getGroupList(listGroup,{prjSn:Common.GETprjid(this,Common),id:this.getID(),username:Common.getStorageAndCookie(this,Common,"username"),});
            }, ()=>{
                this.getGroupList(listGroup,{prjSn:Common.GETprjid(this,Common),id:this.getID(),username:Common.getStorageAndCookie(this,Common,"username"),});
            	
            })
        },
        roleCloseGL (event, name) {
			//
			let I = Number(event.path[2].getAttribute("id").split("_")[1])
		    this.formValidate.AddGroupList[I].groupLeader.splice(name, 1);
            let el = event.path[1].getAttribute("id").split("_");
            
            let _group_leader_nickname = (()=>{
            	let obj = this.formPartValidate.memberList.find((item)=>{
	            	return item.value == el[1]
	            });
	            return obj ? obj.label : "";
	        })()
            let _params = {
            	group_leader_username:el[1],
            	group_leader_nickname:_group_leader_nickname,
				groupSn:el[0].substring(1),
				prjSn:Common.GETprjid(this,Common),
				//user_name:el[1],
			}
            this.deleteGLeader(deleteGroupLeader,_params).then(()=>{
            	if(window.location.port == "9000"){
            		return
            	}
            	this.getGroupList(listGroup,{prjSn:Common.GETprjid(this,Common),id:this.getID(),username:Common.getStorageAndCookie(this,Common,"username"),});
            }, ()=>{
                this.getGroupList(listGroup,{prjSn:Common.GETprjid(this,Common),id:this.getID(),username:Common.getStorageAndCookie(this,Common,"username"),});
            	
            })
        },
		addRole(i){
            Common.AddRole(this,i);
            this.menuCheck(i)
        },
        menuCheck(i){
        	this.formValidate.AddGroupList[i].groupListtemp = [];
        	let _memberList = _.cloneDeep(this.formPartValidate.memberList);
			this.formValidate.AddGroupList[i].groupList.forEach((item)=>{
				Common.DelArrN(_memberList,item.value,"value")	
			})
			this.formValidate.AddGroupList[i].groupListtemp = _memberList;
        },
        addRoleGL(i){
            Common.AddRole(this,i,true);
            this.menuCheckGL(i);
        },
        menuCheckGL(i){
        	this.formValidate.AddGroupList[i].groupListtemp = [];
        	let _memberList = _.cloneDeep(this.formPartValidate.memberList);
			this.formValidate.AddGroupList[i].groupListtemp = _memberList;
        },
        cancelRole(i){
            Common.CancelRole(this,i);
            this.onChangeData = false;
        },
        
        onClear(){
        	console.log("onClear")
        },
        onQueryChange(){
        	console.log("onQueryChange")
        },
        onOpenChange(){
        	console.log("onOpenChange")
        },
        onChange(val){
        	console.log(val)
        	this.onChangeData = val;

        },
        submitFn(i){
        	this.formValidate.AddGroupList[i].groupLeaderAddBtnClick ? this.submitRoleGL(i) : this.submitRole(i);
        },
        submitRoleGL(i){
        	let List = this.formValidate.AddGroupList;
			if(List[i].grouptemp && List[i].groupListtemp && Array.isArray(List[i].groupListtemp) && List[i].groupListtemp.length){
				let obj = List[i].groupListtemp.find((item)=>{
					return item.value ? item.value == List[i].grouptemp : item.user_name == List[i].grouptemp
				})
				if(obj){
					if(!obj.user_name && obj.value){
						obj.user_name = obj.value;
					}
					if(!obj.nick_name && obj.label){
						obj.nick_name = obj.label;
					}
					List[i].groupLeader.push(obj)
				}
			}

			List[i].grouptemp = [];
			List[i].groupListtemp = [];

        	let _params = {
				groupSn:this.formValidate.AddGroupList[i].myValue,
				group_leader:JSON.stringify(List[i].groupLeader[0]),
				prjSn:Common.GETprjid(this,Common),
			}
			this.onChangeData = false;
            this.saveGroupLeader(addGroupLeader,_params).then(()=>{
            	if(window.location.port == "9000"){
            		return
            	}
            	this.getGroupList(listGroup,{prjSn:Common.GETprjid(this,Common),id:this.getID(),username:Common.getStorageAndCookie(this,Common,"username"),});

            },()=>{
                this.getGroupList(listGroup,{prjSn:Common.GETprjid(this,Common),id:this.getID(),username:Common.getStorageAndCookie(this,Common,"username"),});
            	
            });

        },
        submitRole(i){
            Common.SubmitRole(this,i,Common);

            let _member = [];
            let __member = [];
            this.formValidate.AddGroupList[i].group.forEach((itme)=>{
            	let Item = itme
            	let obj = this.formValidate.AddGroupList[i].groupList.find((ITEM)=>{
            		if(Item == ITEM.value){
            			return ITEM	
            		}
            		 
            	})
            	_member.push(obj)
            })
            _member.forEach((item)=>{
            	item.user_name = item.value;
				item.nick_name = item.label;
            })

            if(this.onChangeData && Array.isArray(this.onChangeData) && this.onChangeData.length){
            	this.onChangeData.forEach((item)=>{
            		let obj = _member.find((ITEM)=>{
            			if(item == ITEM.value){
            				return ITEM;	
            			}
            		})
            		__member.push(obj)
            	})
            	_member = __member;
            }else{
            	_member = [];
            }
            
            let _params = {
				groupSn:this.formValidate.AddGroupList[i].myValue,
				member:JSON.stringify(_member),
			}
            
			this.onChangeData = false;
            this.saveMember(addUsers,_params).then(()=>{
            	if(window.location.port == "9000"){
            		return
            	}
            	this.getGroupList(listGroup,{prjSn:Common.GETprjid(this,Common),id:this.getID(),username:Common.getStorageAndCookie(this,Common,"username"),});

            },()=>{
                this.getGroupList(listGroup,{prjSn:Common.GETprjid(this,Common),id:this.getID(),username:Common.getStorageAndCookie(this,Common,"username"),});
            	
            });
        },
        saveMember(URL, params){
			return defaultAXIOS(URL,params,{timeout:5000,method:'post'})
			.then((response) => {
				let myData = response.data;
				console.log("<======【设置小组 保存人员】***response+++",response,myData,"====>");
				if(myData.status == "success"){
					return Promise.resolve(myData)
				}else{
					this.showError(URL+"_错误");
					return Promise.reject(myData);
				}
			})
			.catch( (error) => {
			  console.log(error);
			  this.showError(error);
			  return Promise.reject(error);
			});   
    	},
    	saveGroupLeader(URL, params){
			return defaultAXIOS(URL,params,{timeout:5000,method:'post'})
			.then((response) => {
				let myData = response.data;
				console.log("<======【设置小组 保存小组长】***response+++",response,myData,"====>");
				if(myData.status == "success"){
					return Promise.resolve(myData)
				}else{
					this.showError(URL+"_错误");
					return Promise.reject(myData);
				}
			})
			.catch( (error) => {
			  console.log(error);
			  this.showError(error);
			  return Promise.reject(error);
			});   
    	},
		addTeam(URL, params){
     
			return defaultAXIOS(URL,params,{timeout:5000,method:'get'})
			.then((response) => {
				let myData = response.data;
				console.log("<======【设置小组 获取人员】***response+++",response,myData,"====>");
				let _tempObj = {};
				this.formPartValidate.memberList = [];

				if(myData && Array.isArray(myData) && myData.length){
					for(var i=0;i<myData.length;i++){
						_tempObj.value = myData[i].user_name;
						_tempObj.label = myData[i].nick_name;
						this.formPartValidate.memberList.push(_tempObj);
						_tempObj = {};
					}
					return Promise.resolve(myData)
				}else{
					console.log(URL+"没有信息");
			  		//this.showError(URL+"没有信息");
			  		return Promise.reject(myData);
				}
			})
			.catch( (error) => {
			  console.log(error);
			  //this.showError(error);
			  return Promise.reject(error);
			});   
    	},
		//
		
		partCancel(name = "addPartPopBox"){
            this.partAdd = false;
            this.formPartValidate.partName = "";
            this.formPartValidate.partNameList = [];
            this.$refs[name].resetFields();
            
        },
        saveTeam(URL, params){
			return defaultAXIOS(URL,params,{timeout:5000,method:'post'})
			.then((response) => {
				let myData = response.data;
				console.log("<======【设置小组 保存小组】***response+++",response,myData,"====>");
				if(myData.status == "success" && myData.data){
					return Promise.resolve(myData.data)
				}else{
					this.showError(URL+"_错误");
					return Promise.reject(myData);
				}
			})
			.catch( (error) => {
			  console.log(error);
			  this.showError(error);
			  return Promise.reject(error);
			});   
    	},
        submitPart(name){
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
						delBtn: true,
						groupName: "",
						required: false,
						modaAdd:false,//修改添加角色
						grouptemp:[],//修改添加角色
						groupListtemp: [],//修改添加角色
						myReftemp: "selfRefRole",//修改添加角色
						groupLeader:[],//小组长
						groupLeaderAddBtnClick:false,//小组长添加按钮
                        isEdit:"",
					}

					_tempObj.myLabel = that.formPartValidate.addGroupList.length ? that.formPartValidate.addGroupList.filter((item) => {
						return item.value == that.formPartValidate.partName
					})[0].label : that.formPartValidate.partName;
					_tempObj.myValue = that.formPartValidate.partName;

					that.formPartValidate.partNameList.forEach((item,index)=>{
						_tempObj.groupList.push(that.formPartValidate.memberList.find(ITEM=>item == ITEM.value))
					});

					_tempObj.groupList.forEach((item)=>{
						item.user_name = item.value;
						item.nick_name = item.label;
					})

					_tempObj.groupLeader = ((val)=>{
						let obj = that.formPartValidate.memberList.find((item)=>{
							return item.value == val;
						}) || "";
						return obj ? [
							(()=>{
								if(!obj.user_name && obj.value){
									obj.user_name = obj.value;
								}
								if(!obj.nick_name && obj.label){
									obj.nick_name = obj.label;
								}
								return obj;
							})()
						] : [];
					})(that.formPartValidate.groupLeaderList)
					let _group_leader = _tempObj.groupLeader.length ? JSON.stringify(_tempObj.groupLeader[0]) : "";
					let _prjSn = Common.GETprjid(that,Common);
					let _member = JSON.stringify(_tempObj.groupList);
					let _id = that.getID();
					let _group_name = _tempObj.myLabel;

					let _params = {
						id:_id,
						group_name:_group_name,
						prjSn:_prjSn,
						member:_member,
						group_leader:_group_leader,
					}

					that.saveTeam(addGroupUsers,_params).then((res)=>{
						_tempObj.myValue = res;
						that.formValidate.AddGroupList.push(_tempObj);
						that.formPartValidate.partName = "";
						_tempObj = null;
						that.partAdd = false;
						that.formPartValidate.partNameList = [];

                        // -->
                        if(window.location.port == "9000"){
                            return
                        }
                        this.getGroupList(listGroup,{prjSn:Common.GETprjid(this,Common),id:this.getID(),username:Common.getStorageAndCookie(this,Common,"username"),});
                        // <--
					},(error)=>{
						_tempObj = null;
						that.partCancel();
                        this.getGroupList(listGroup,{prjSn:Common.GETprjid(this,Common),id:this.getID(),username:Common.getStorageAndCookie(this,Common,"username"),});

					})
				}
			})
            
        },
		addpart(name){
			this.$refs[name].resetFields();
            this.partAdd = true;
        },
        showError(ERR){
            Common.ErrorShow(ERR,this);

        },
        //设置小组end
		getSendData(data){
            console.log(data,"<==========getSendData");
        },
        selectMenuFn(N){
            console.log(N,"<==========selectMenuFn");
            let ID = N;
			//this.getGroupList(listGroup,{prjSn:Common.GETprjid(this,Common),id:this.getID()});
			this.addTeam(getUserByProjId,{projectId:ID}).then(()=>{
				this.getGroupList(listGroup,{prjSn:Common.GETprjid(this,Common),id:ID,username:Common.getStorageAndCookie(this,Common,"username"),});
			},()=>{})

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
<style lang="less">
#settingPage .ivu-form-item-label{
	overflow:hidden;
	text-overflow: ellipsis;
}
#settingAddBox > div {
	border-bottom: 1px dashed #ccc;
	margin-bottom: 5px;
}
#settingAddBox > div .ivu-form-item {
	margin-bottom: 10px;
}
#settingAddBox > div:last-of-type{
	border:none;
	margin-bottom: 0;
}
#settingAddBox > div:first-of-type{
	border-top:1px dashed #ccc;
	padding-top: 5px;
}	
</style>