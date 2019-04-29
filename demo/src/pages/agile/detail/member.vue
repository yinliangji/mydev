<template>
	<div >
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" >
            
            <h3 class="Title" ><span>核心成员</span></h3>
            <div class="fromBox fromBox2" >
                <div class="newAddGroup">
                    <Row v-for="(myItem,index) in formValidate.AddGroupList" :key="index" v-if="index<3">
                        <Col span="20">
                            <FormItem 
                                :label="myItem.myLabel" 
                                :prop="'AddGroupList.'+index+'.group'"
                                :rules="{required: myItem.required, type: 'array', message: '请选择或者填写'+myItem.myLabel+'，不能为空！', trigger: 'change'}" 
                                 
                                :ref="myItem.myRef+index" 
                                :class="myItem.myRef+index"
                                >
                                <div :id="'roleBox_'+index">
                                    <Tag 
                                        v-for="(item,index2) in myItem.groupList" 
                                        :value="item.value" 
                                        :key="index2" 
                                        :name="((O)=>{O.I = index;O.I2 = index2;return JSON.stringify(item);})(item)" 
                                        closable 
                                        @on-close="roleClose"
                                        :class="myItem.groupList.length == 1 ? 'donot':''"
                                        >
                                        {{ item.label}}
                                    </Tag>
                                    <Button 
                                        icon="ios-plus-empty" 
                                        type="dashed" 
                                        size="small" 
                                        @click="addRole(index)"
                                        >
                                        添加系统
                                    </Button>
                                    <Modal 
                                        :ref="myItem.myReftemp+index" 
                                        :class="myItem.myReftemp+index" 
                                        v-model="formValidate.AddGroupList[index].modaAdd" 
                                        :title="'添加'+formValidate.AddGroupList[index].myLabel+''" 
                                        @on-ok="submitRole(index)"  
                                        ok-text="添加"
                                        @on-cancel="cancelRole(index)"
                                        >
                                        <Select v-model="myItem.grouptemp" :id="'sel'+index" filterable :loading="inputLoad"  multiple :placeholder="'请输入用户ID或者中文名进行搜索添加'">
                                            <!-- 【'+myItem.myLabel+'】 -->
                                            <Option v-for="(item,index2) in myItem.groupListtemp" :value="item.value" :key="index2">
                                                {{ item.label }}
                                            </Option>
                                        </Select>
                                    </Modal>
                                </div>
                            </FormItem>

                          

                        </Col>
                        <Col span="1">&nbsp;</Col>
                        <Col span="3">
                            <Button v-if="myItem.delBtn"  type="error" long  @click="groupDel(index)">删除角色</Button>
                        </Col>
                    </Row>
                </div>
            </div>

			<h3 class="Title" ><span>其他成员</span></h3>

			
            <div class="fromBox fromBox2" >
                <div class="addpartBox">
                    <Button type="success" @click="addpart">添加角色</Button>
                </div>
                <div class="newAddGroup">
                    <Row v-for="(myItem,index) in formValidate.AddGroupList" :key="index" v-if="index>2">
                        <Col span="20">
                            <FormItem 
                                :label="myItem.myLabel" 
                                :prop="'AddGroupList.'+index+'.group'"
                                :ref="myItem.myRef+index" 
                                :class="myItem.myRef+index"
                                >
                                <div :id="'roleBox_'+index">
                                    <Tag 
                                        v-for="(item,index2) in myItem.groupList" 
                                        :value="item.value" 
                                        :key="index2" 
                                        :name="((O)=>{O.I = index;O.I2 = index2;return JSON.stringify(item);})(item)" 
                                        closable 
                                        @on-close="roleClose"
                                        >
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
                                        <Select v-model="myItem.grouptemp" :id="'sel'+index" filterable :loading="inputLoad"  multiple :placeholder="'请输入用户ID或者中文名进行搜索添加'">
                                            <!-- 【'+myItem.myLabel+'】 -->
                                            <Option v-for="(item,index2) in myItem.groupListtemp" :value="item.value" :key="index2">
                                                {{ item.label }}
                                            </Option>
                                        </Select>
                                    </Modal>
                                </div>
                            </FormItem>
                           
                        </Col>
                        <Col span="1">&nbsp;</Col>
                        <Col span="3">
                            <Button v-if="myItem.delBtn" type="error" long @click="groupDel(index)">删除</Button>
                        </Col>
                    </Row>
                </div>
                
                            

            </div>
            
            
        </Form>
       
        <AddPartPop :isShow="partAdd" :data="formPartValidate.addGroupList" :items="formValidate.AddGroupList" @closeAddPartPop="partCancel3" @sendAddPartPop="submitPart3" />

        <Modal v-model="modaDelete" width="300">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>删除，是否继续？</p>
            </div>
            <div slot="footer">
                <Button color="#1c2438" @click="delEnter">删除</Button>
                <Button type="primary" @click="delCancel">取消</Button>
            </div>
        </Modal>

        


    </div>
</template>
<script>
//getProjectMember

import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {getProjectMember,projectAddGroup,addTeam,addProjectRole,delProjectRole} = Common.restUrl;
import Store from '@/vuex/store'
import AddPartPop from '@/pages/agile/add/addpartpop';
const validateDate = (rule, value, callback) => {
    if (!value || !value[0] || !value[1]) {
        console.log("value 错误",)  
        return callback(new Error('请选择日期'));
    }else{
        let nowTime = new Date().getTime();
        let valueTime = new Date(value[1]).getTime()
        if(nowTime > valueTime){
            return callback(new Error('结束日期小于现在，请从新选择结束日期'));
        }
        callback()   
    }
};

export default {
    props: {
        
    },
    watch:{
        "formValidate.start_time":function(curVal,oldVal){

        },
         "formValidate.AddGroupList"(curVal,oldVal){
            let _this = this;
            if(curVal){
                Common.changeArr2(this,curVal,Common,projectAddGroup,this.projectGroupFn2)//修改添加角色
            }
        },
        formValidate: {
            handler(val, oldVal) {
                if(val){
                    Common.inputArr2(this,val)//修改添加角色
                }
            },
            deep: true
        }
    },
    beforecreated(){
        console.log("详情成员--beforecreated-------",this.formValidate)
    },
    created(){
        console.log("详情成员--created-------",this.formValidate);
    },
    beforeUpdate(){
        console.log("详情成员--beforeUpdate-------",this.formValidate)
    },
    updated(){
        console.log("详情成员--updated-------",this.formValidate)
    },
	computed: {
    },

    data () {
        let _this = this;
        const validateDateEnd = Common.checkEndDate(this);
        const validatePart = Common.checkPart(this);
       
        return {
            options3: {
                disabledDate (date) {
                    if(_this.formValidate.start_time){
                        return date && date.valueOf() < _this.formValidate.start_time.getTime() + 86400000;//24*60*1000*60
                    }else{
                        //return date && date.valueOf() < Date.now() - 86400000;//24*60*1000*60
                    }
                    
                }
            },
            nowDate:"",
            defDate:"",
            formValidate: {
                prod_id:"",
                pid:"",
                prj_type:"",
                prj_name:'',
                start_time: '',
                end_time: '',
                prj_desc: '',
                prj_goal:"",
                createModule:[],
                modules:[],
                AddGroupList:[],


                allgroup:[],
                managerGroup:[],
                developerGroup:[],
                testerGroup:[],
                prj_id:'',

            },
            prod_idList: [],
            AddGroupList:[],
 
     
            ruleValidate: {
                prod_id: [
                    { required: false,type: 'string',  message: 'Please select gender', trigger: 'change' }
                ],
                pid: [
                    { required: false,type: 'string',  message: 'Please select gender', trigger: 'change' }
                ],
                prj_type: [
                    { required: false, message: 'Please select gender', trigger: 'change' }
                ],
                
                prj_name: [
                    { required: true, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
                start_time: [
                    { required: true, type: 'date', message: '请选择日期！', trigger: 'change' }
                ],
                end_time: [
                    { required: true, type: 'date', validator: validateDateEnd, trigger: 'change' }
                    
                ],
                prj_desc: [
                    { required: false, message: 'Please enter a personal introduction', trigger: 'blur' },
                   
                ],
                prj_goal: [
                    { required: false, message: 'Please enter a personal introduction', trigger: 'blur' }
                ],
                
                createModule: [
                    { required: false, type: 'array', message: '请填写内容，不能为空！', trigger: 'change' }
                ],
                allgroup: [
                    { required: true, type: 'array',  message: '请选择内容，不能为空！', trigger: 'change' }
                ],
                managerGroup: [
                    { required: false, type: 'array', message: '请选择', trigger: 'change' }
                ],
                developerGroup: [
                    { required: false, type: 'array', message: '请选择', trigger: 'change' }
                ],
                testerGroup: [
                    { required: false, type: 'array', message: '请选择', trigger: 'change' }
                ],

                prj_id: [
                    { required: false, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
                date: [
                    { required: true, type: 'array', validator: validateDate, trigger: ['blur','change'], }
                ],
               
                startTime: [
                    { required: false, type: 'string', message: 'Please select time', trigger: 'change' }
                ],
                
                endTime: [
                    { required: false, type: 'string', message: 'Please select time', trigger: 'change' }
                ],

                group: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                maintainer: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
            },
            editTableData:false,
            modal_add_loading:false,
            formItem: {
                technologyName:"",
                businessName:"",
            },
            modaAdd: false,



            partAdd: false,
            modaDelete: false,
            thisIndex:null,
            myGroupName:"",
            formPartValidate: {
                loading:true,
                partName: '',
                addGroupList: [
                ],
            },
            rulePartValidate: {
                partName: [
                    { required: true, validator: validatePart,  trigger: 'blur' }
                ],
            },
            inputLoad:false,
            
        }
    },
    mounted(){
        
        let ID = Common.GETID(this,Common,"inUrl") ? Common.GETID(this,Common,"inUrl") : "";
        let PRJ_ID = Common.GETprjid(this,Common,"inUrl") ? Common.GETprjid(this,Common,"inUrl") : "";
        if(ID && PRJ_ID){
            this.addTeamFn(addTeam);
            this.getMemberInfo(getProjectMember,{id:ID,prjId:ID,prjSn:PRJ_ID,prj_id:PRJ_ID});
        }else{
            Common.CommonError(this,"没有获取到prjId或id 和 prjSn或prj_id")
        }
        
    },
    
    methods: {

        /* 修改添加角色 */
        cancelRole(i){
            Common.CancelRole(this,i)
        },
        roleClose (event, name) {
            let N = !isNaN(name) ? (name - 0) : (JSON.parse(name).I2 - 0);
            Common.RoleClose(this,event, N).complete(()=>{
                alert(this.formValidate.AddGroupList[JSON.parse(name).I-0].group)
            })
            
        },
        addRole(i){
            Common.AddRole(this,i)
        },
        submitRole(i){
            let addMember = this.formValidate.AddGroupList[i].grouptemp;
            Common.SubmitRole(this,i,Common).complete(()=>{
                console.error(this.formValidate.AddGroupList[i])
                this.submitData();
            });
        },
        
        projectGroupFn2(URL,params = {},ARR,thatEle){
            Common.ProjectGroup2(defaultAXIOS,this,URL,params,ARR,thatEle);
        },
        addSelectEleList(ARR,thatEle,dataList){
            if(typeof(ARR)  == "number"){
                if(thatEle && thatEle.temp && thatEle.temp.length){
                    let _tempArr = Common.returnDelArr(this.formValidate.AddGroupList[ARR].grouptemp,dataList);

                    let _tempArr2 = [];
                    _tempArr2.push(...thatEle.temp,..._tempArr);
                    let _tempArr3 = Common.returnDelArr(this.formValidate.AddGroupList[ARR].group,_tempArr2);
                    this.formValidate.AddGroupList[ARR].groupListtemp.push(..._tempArr3);
                }else{
                    let _tempArr4 = Common.returnDelArr(this.formValidate.AddGroupList[ARR].group,dataList);
                    this.formValidate.AddGroupList[ARR].groupListtemp.push(..._tempArr4);
                }
            }else{
                this.showError("addSelectEleList的参数ARR不是数字");
            }

        },
        /* 修改添加角色 */
        

        addTeamFn(URL,params = {}){
            Common.AddTeam(defaultAXIOS,this,URL,params);
             
        },
        groupDel(I){
            this.thisIndex = I;
            this.modaDelete = true;
            
        },
        
        addpart(){
            this.partAdd = true;
        },
        partCancel(){
            this.partAdd = false;
            this.formPartValidate.partName = "";
            this.$refs.addPartPopBox.resetFields();
        },
        
        partCancel3(isClose){
            this.partAdd = isClose;
            this.formPartValidate.partName = "";
        },
        submitPart3(name,partName){
            let fn = (val)=>{
                let obj = this.formPartValidate.addGroupList.find(item=>item.value == val);
                return obj ? obj.label : "";
            }
            this.formPartValidate.partName = partName;
            Common.addPartPopBox3(name,this,partName).complete(()=>{
                let params = {
                    id:Common.GETID(this,Common),
                    prjId:Common.GETID(this,Common),
                    prj_id:Common.GETprjid(this,Common),
                    prjSn: Common.GETprjid(this,Common),
                    username:Common.getStorageAndCookie(this,Common,"username"),
                    role_name:partName,
                    nick_name:fn(partName),
                }
                this.submitData(addProjectRole,params);
            }); //添加角色
        },
        delCancel(){
          this.modaDelete = false;
        },
        delEnter(){
            let deleteObj = JSON.parse(JSON.stringify(this.formValidate.AddGroupList[this.thisIndex]));
            this.formValidate.AddGroupList.splice(this.thisIndex, 1);
            this.thisIndex = null;
            this.modaDelete = false;

            alert(JSON.stringify(deleteObj))

        },

        projectGroupFn(URL,params = {},ARR,thatEle){
            defaultAXIOS(URL,params,{timeout:60000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======【agile Allgroup get】***response+++",response,myData,"====>");
                this.inputLoad = false;
                this.formValidate.AddGroupList[ARR].groupList = [];
                this[ARR] = [];

                if(typeof(ARR)  == "number"){
                    if(thatEle && thatEle.temp && thatEle.temp.length){
                        let _tempArr = Common.returnDelArr(this.formValidate.AddGroupList[ARR].group,myData.data.list);
                        this.formValidate.AddGroupList[ARR].groupList.push(...thatEle.temp,..._tempArr);

                    }else{
                        this.formValidate.AddGroupList[ARR].groupList.push(...myData.data.list);
                    }
                }else{
                    if(thatEle && thatEle.temp && thatEle.temp.length){
                        let _tempArr = Common.returnDelArr(this.formValidate.AddGroupList[ARR].group,myData.data.list);
                        this[ARR].groupList.push(...thatEle.temp,..._tempArr);

                    }else{
                        this[ARR].groupList.push(...myData.data.list);
                    }
                }
                
            }).catch( (error) => {
                console.log(error);
                this.inputLoad = false;
                this.showError(error);
            });   
        },
        
        getMemberInfo(URL = "",IDPRJID = {}){

            defaultAXIOS(URL,IDPRJID,{timeout:5000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======【agile edit get】***response+++",response,myData,"====>");
                let _temp = false;
                let pm = {
                    myRef:"selfRef",
                    group:[],
                    groupList:[],
                    myLabel:"项目经理new",
                    myValue:"pm",
                    delBtn:false,
                    groupName:"",
                    required:true,
                    modaAdd:false,//修改添加角色
                    grouptemp:[],//修改添加角色
                    groupListtemp: [],//修改添加角色
                    myReftemp: "selfRefRole",//修改添加角色
                }
                let tm = {
                    myRef:"selfRef",
                    group:[],
                    groupList:[],
                    myLabel:"技术经理new",
                    myValue:"tm",
                    delBtn:false,
                    groupName:"",
                    required:true,
                    modaAdd:false,//修改添加角色
                    grouptemp:[],//修改添加角色
                    groupListtemp: [],//修改添加角色
                    myReftemp: "selfRefRole",//修改添加角色
                }
                let bm = {
                    myRef:"selfRef",
                    group:[],
                    groupList:[],
                    myLabel:"业务经理new",
                    myValue:"bm",
                    delBtn:false,
                    groupName:"",
                    required:true,
                    modaAdd:false,//修改添加角色
                    grouptemp:[],//修改添加角色
                    groupListtemp: [],//修改添加角色
                    myReftemp: "selfRefRole",//修改添加角色
                }
                for(var I in this.formValidate){
                    _temp = myData.data[I]+"";
                    if(I == "AddGroupList"){

                    }else if(_temp.indexOf("|") != -1){
                        this.formValidate[I] = myData.data[I].split("|").filter(item=>item)
                    }else{
                        if(myData.data[I]){
                            this.formValidate[I] = myData.data[I];    
                        }
                        
                    }
                }
                let addsystem = (_obj,_myData)=>{
                    if(_myData && Array.isArray(_myData)){
                        _obj.groupList = _myData;
                        if(_myData.length){
                            _obj.group = _myData.map((item)=>{
                                return item.value
                            })
                        }
                        
                        this.formValidate.AddGroupList.unshift(_obj)
                    }
                }
                addsystem(pm,myData.pm)
                addsystem(tm,myData.tm)
                addsystem(bm,myData.bm)
                
                let checkSystem = (arr,lab)=>{
                    let check = arr.findIndex(
                        (item)=>item.myLabel === lab
                    )
                    if(check != -1){
                        return true;
                    }else{
                        return false;
                    }
                    
                }
                
                /*
                setTimeout(()=>{
                    !checkSystem(this.formValidate.AddGroupList,"项目经理") && this.formValidate.AddGroupList.unshift(pm);
                    !checkSystem(this.formValidate.AddGroupList,"技术经理") && this.formValidate.AddGroupList.unshift(tm);
                    !checkSystem(this.formValidate.AddGroupList,"业务经理") && this.formValidate.AddGroupList.unshift(bm);
                },1)
                */

                this.formValidate.prj_type = this.formValidate.prj_type+"";

                this.formValidate.pid = this.formValidate.pid ? this.formValidate.pid+"" : "";

                let objVal = (Arr,Lab) => {
                    for(var O = 0;O< Arr.length;O++ ){
                        if(Arr[O].label ==Lab){
                            return Arr[O].value
                        }
                    }
                }

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

                if(myData.role_user_info && myData.role_user_info.length){
                    
                    let _tempObj = false;
                    for(var J=0;J< myData.role_user_info.length;J++){

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
                        }

                        _tempObj.myLabel = myData.role_user_info[J].title;
                        _tempObj.myValue = objVal(this.formPartValidate.addGroupList,myData.role_user_info[J].title)
                        _tempObj.groupList = groupList(myData.role_user_info[J].member);
                        _tempObj.group = group(myData.role_user_info[J].member); 
                        //_tempObj.groupList = [{"value":"lizhuo.zh","label":"李卓"}]; 
                        
                        this.formValidate.AddGroupList.push(_tempObj);
                        _tempObj = false;
                    }
                    //
                }

            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
        
       
        
        /* 存储 */
        submitData(URL,params = {}){
            console.error(URL,params)

            return

            let tempData = {
                id:Common.GETID(this,Common),
                prjId:Common.GETID(this,Common),
                prj_id:Common.GETprjid(this,Common),
                prjSn: Common.GETprjid(this,Common),
                username:Common.getStorageAndCookie(this,Common,"username"),
            }

            this.getMemberInfo(getProjectMember,tempData);

           
        },
        
       
        handleClose (event, name) {
            let getStr = (string,str_after,str_before)=>{
                return string.substring(string.indexOf(str_after)+1,string.lastIndexOf(str_before))
            }
            if(name.toString().indexOf("【") != -1 && name.toString().indexOf("】") != -1){
                let _arr = _.cloneDeep(this.formValidate.modules)
                _arr.splice(_arr.indexOf(getStr(name,"【","】")),1);
                this.formValidate.modules = [];
                this.formValidate.modules = _arr;
            }
            const index = this.formValidate.createModule.indexOf(name);
            this.formValidate.createModule.splice(index, 1);
        },

        submitModule () {
            if(!this.formValidate.createModule){
                this.formValidate.createModule = [];
            }
            this.formValidate.createModule.push(this.formItem.businessName)
            this.modaAdd = false;
            this.$Message.info('成功');
            this.ModuleformItemReset();
        },
        addItem(){
            this.modaAdd = true;
        },
        ModuleformItemReset(){
            this.$nextTick(() => {
                this.formItem.technologyName = "";
                this.formItem.businessName = "";
            });
        },
    },
    components: {
        AddPartPop,
    },

}
</script>
<style lang="less" scoped>
.aglieAddBox {

}
.fromBox {
	width: 80%;
}
.fromBox2 {
    //width: 70%;
}
.addpartBox{
    padding-bottom: 20px;
    text-align: left;
}
</style>

<style >
.ivu-tag.donot .ivu-icon-ios-close-empty{
    visibility: hidden;
}
</style>