"use strict"
import Utils from './utils';
export default class Common extends Utils {
	constructor() {
        super()
    }
    static CommonFn(P = "====CommonFn===="){
    	console.log("<====",P,"====>")
    }

    //数组里对象甄别拷贝--不通用不能随便调用！！！！！
    static objInArr (Arr1 = []){

      let _proj_role = [];
      if(Array.isArray(Arr1) && Arr1.length){
          let _tempObj = {};
          let _tempTitle = {};
          let _tempArr = [];
          for(var i=0;i<Arr1.length;i++){
              _tempTitle.value = Arr1[i].myValue;
              _tempTitle.label = Arr1[i].myLabel;

              if(Array.isArray(Arr1[i].group) && Arr1[i].group.length){
                  for(var j=0;j<Arr1[i].groupList.length;j++){
                      for(var k=0;k<Arr1[i].group.length;k++){
                          let _Vobj = Arr1[i].groupList[j];
                          if( _Vobj.value == Arr1[i].group[k]){
                              _tempArr.push(_Vobj);
                          }
                      }
                  }
              }else{
                  _tempArr = Arr1[i].group;
              }

              _tempObj.title = _tempTitle;
              _tempObj.member = _tempArr;
              _proj_role.push(_tempObj);
              _tempObj = {};
              _tempTitle = {};
              _tempArr = [];
          }
          return _proj_role;
      }else{
          _proj_role.push(Arr1);
          return _proj_role;
      }

    }

    //数组变表格--不通用
    static toTable(OBJ,TAB,ROWS = 3,thW = 11,Col = false){
      let _tempArr = [];
      let rows = ROWS;
      let _SH = parseInt(OBJ.length/rows);
      let _sn = false;
      let Colspan = Col;
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

      if(OBJ.length <= rows){
        if(OBJ.length){
          for(var A=0;A<OBJ.length;A++){
            _tempArr.push(OBJ[A]);
          }
          if(OBJ.length < rows){

            _sn = rows - OBJ.length;
            for(var B = 0;B < _sn; B++){
              _tempArr.push(_demo);
            }

          }
        }
        TAB.push(_tempArr)
      }else{
        //
        for(var i=0;i<OBJ.length;i++){
          if(i/rows && Number.isInteger(i/rows)){
            TAB.push(_tempArr);
            _tempArr = []
            if( i >= _SH*rows){
              let _jn = OBJ.length -(OBJ.length-i);
              _sn = rows - (OBJ.length-i);
              
              for(var j=_jn;j<OBJ.length;j++){
                _tempArr.push(OBJ[j]);
              }
              for(var k=0;k<_sn;k++){
                _tempArr.push(_demo);
              }
              TAB.push(_tempArr);
              _tempArr = []
            }else{
              _tempArr.push(OBJ[i]);
            }
          }else{
            _tempArr.push(OBJ[i])
          }
        }
        //

      }
      
      let Element = "";
      let thWidth = thW;
      let _cols2 = false;
      let _cols = false;
      
      for(var tr =0;tr<TAB.length;tr++){
         Element += '<tr>';
         for(var thtd = 0;thtd<TAB[tr].length;thtd++){
          if( rows-_sn ==1 && Colspan){

            if(!_cols){

              Element += '<th width="'+thWidth+'%">'
              Element += TAB[tr][thtd].title
              Element += '</th>'
              Element += '<td>'
              for(var td =0;td<TAB[tr][thtd].member.length;td++){
                  Element += '<em>'+TAB[tr][thtd].member[td].nick_name+'</em>';
              }
              Element += '</td>'


            }

              _cols = true;

          }else

          if(TAB.length == 1 && _sn && Colspan ){

        

            if( thtd>= rows-_sn ){
              if(!_cols){
                Element += '<td colspan="'+_sn*2+'">&nbsp;</td>'
              }
              _cols = true;
            }else{
              Element += '<th width="'+thWidth+'%">'
              Element += TAB[tr][thtd].title
              Element += '</th>'
              Element += thtd+1 == rows ? '<td>' : '<td width="'+(100-(thWidth*rows))/rows+'%">'
              for(var td =0;td<TAB[tr][thtd].member.length;td++){
                  Element += '<em>'+TAB[tr][thtd].member[td].nick_name+'</em>';
              }
              Element += '</td>'
            }


          }else if(tr == TAB.length-1 && _sn && Colspan){
            if(thtd>= rows-_sn){//thtd >_sn
              if(!_cols2){
                Element += '<td colspan="'+_sn*2+'">&nbsp;</td>'
              }
              _cols2 = true;
              //Element += '<td colspan="'+_sn*2+'">&nbsp;</td>'
            }else{
              Element += '<th>'
              Element += TAB[tr][thtd].title
              Element += '</th>'
              Element += '<td>'
              for(var td =0;td<TAB[tr][thtd].member.length;td++){
                  Element += '<em>'+TAB[tr][thtd].member[td].nick_name+'</em>';
              }
              Element += '</td>'
            }

          }else{
            Element += tr == 0 ? '<th width="'+thWidth+'%">' : '<th>'
            Element += TAB[tr][thtd].title
            Element += '</th>'
            Element += tr == 0 ? thtd == rows-1 ? '<td>' : '<td width="'+(100-(thWidth*rows))/rows+'%">' : '<td>'
            for(var td =0;td<TAB[tr][thtd].member.length;td++){
                Element += TAB[tr][thtd].member[td].nick_name == "&nbsp;" ? TAB[tr][thtd].member[td].nick_name : '<em>'+TAB[tr][thtd].member[td].nick_name+'</em>';
            }
            Element += '</td>'
          }

                
          }  
         Element += '</tr>'; 
      }
      return Element;   
    }

    //错误提示
    static ErrorShow(ERR,THIS){
      THIS.$Notice.config({
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


      if (process.env.NODE_ENV === 'production') {
        console.log(MET+" | "+URL);
        console.log(JSON.stringify(ERR));
      }else{
        THIS.$Notice.open({
            title: MET+" | "+URL,
            desc: JSON.stringify(ERR),
            duration: 60
        });
      }
    }
    //权限判断--不通用
    static auth(THIS,KEY){
        let OBJ = THIS.prj_permission
        if(THIS.identity == "SuperAdmin"){
            return false
        }else if(THIS.identity == "PlainAdmin"){
            return false
        }else{
            if(KEY && KEY.length){
                let _temp = true;
                for(let i =0;i<KEY.length;i++){
                    if(!(KEY[i].indexOf("_view") != -1)){
                        if(OBJ.findIndex((item)=>{return item == KEY[i]}) != -1){
                            _temp = false
                        }
                    }
                }
                return _temp

            }else{
                return true
            }
        }
        
    }

    //给输入框本身加已选择的数组temp --不通用
    static inputArr(_this,val){
      //
      let ArrFn = (obj,arr)=>{
        let _OBJ = {}
        for(let k=0;k<arr.length;k++){
            if(arr[k] == obj.value){
               _OBJ.label = obj.label;
               _OBJ.value = obj.value;
            }
        }
        if(_OBJ.label && _OBJ.value){
            return _OBJ;    
        }else{
            return false;
        }
      }

      _this.$nextTick(()=>{
      let _tempArr = []
        for(let i=0;i<val.AddGroupList.length;i++){
            for(let j=0;j<val.AddGroupList[i].groupList.length;j++){
                if(ArrFn(val.AddGroupList[i].groupList[j],val.AddGroupList[i].group)){
                    _tempArr.push(ArrFn(val.AddGroupList[i].groupList[j],val.AddGroupList[i].group))
                }
            }
            document.getElementById("sel"+i).getElementsByClassName("ivu-select-input")[0].temp = _tempArr;
            _tempArr = [];  
            
        }

      })
    }

    //给输入框加函数节流--不通用
    static changeArr(_this, curVal, _Common, _projectAddGroup) {
      _this.$nextTick(() => {

        for (var i = 0; i < curVal.length; i++) {
          let _DOM = _this.$refs[curVal[i].myRef + i][0].$el.getElementsByClassName("ivu-select-input")[0];
          _DOM.addEventListener("keyup", function(event) {
            let _num = Number(this.parentNode.parentNode.parentNode.id.replace("sel", ""));
            let exec = _Common.throttle(
              (value, THIS) => {
                let _URL = _projectAddGroup;
                // if(curVal[_num].groupName == "allgroupList"){
                //     _URL = projectAllgroup;
                // }else if(curVal[_num].groupName == "managerGroupList"){
                //     _URL = projectManagerGroup;
                // }else if(curVal[_num].groupName == "developerGroupList"){
                //     _URL = projectDeveloperGroup;
                // }else if(curVal[_num].groupName == "testerGroupList"){
                //     _URL = projectTesterGroup;
                // }else{
                //     _URL = _projectAddGroup;
                // }
                _this.inputLoad = true;
                _this.projectGroupFn(_URL, {
                  userName: value,
                }, _num, THIS);
              },
              this,
              1500,
              this.value,
              2000
            );
            exec();
          })
        }
      })
    }

    //添加角色--不通用
    static  addPartPopBox(name,that){
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
            required: true,
          }
          _tempObj.myLabel = that.formPartValidate.addGroupList.length ? that.formPartValidate.addGroupList.filter((item) => {
            return item.value == that.formPartValidate.partName
          })[0].label : that.formPartValidate.partName;
          _tempObj.myValue = that.formPartValidate.partName;

          that.formValidate.AddGroupList.push(_tempObj);

          that.formPartValidate.partName = "";
          _tempObj = null;
          that.partAdd = false;
        }
      })
    }

    //删除Storage和Cookie--不通用
    static delStorageAndCookie(_Common,name){
      let SC = false;
      if(localStorage.getItem(name)){
         SC = localStorage.removeItem(name)
      }
      if(_Common.getCookie(name)){
         SC = _Common.getCookie(name)
      }

      if(!localStorage.getItem(name) && _Common.getCookie(name)){
        SC = true;
      }
      return SC;
    }

    //设置Storage和Cookie--不通用
    static setStorageAndCookie(_Common,name,value){
      _Common.setCookie(name,value);
      localStorage.setItem(name,value);
    }

    //获取id--不通用
    static GETID(that,_Common){
      let ID = getSCFn(that,_Common,"id");
      return ID;
    }

    


    //获取detail_id--不通用
    static GETdetail_id(that,_Common){
      let detailID = getSCFn(that,_Common,"detail_id");
      return detailID;
    }



    //获取prj_id--不通用
    static GETprjid(that,_Common){
      let prj_ID = getSCFn(that,_Common,"prj_id");
      return prj_ID;
    }

    //获取prod_id--不通用
    static GETprodid(that,_Common){
      let prod_ID = getSCFn(that,_Common,"prod_id");
      return prod_ID;
    }

    //获取模块--不通用
    static Modulelist(FUN, that, URL, params) {
      FUN(URL, params, {
        timeout: 5000,
        method: 'get'
      }).then((response) => {
        let myData = response.data;
        console.log("<======【agile listModule get】***response+++", response, myData, "====>");

        if (myData && myData.res && myData.res.length) {
          let _temp = {};
          for (let i = 0; i < myData.res.length; i++) {
            _temp.label = myData.res[i].module_name;
            _temp.value = myData.res[i].module_id + "";
            that.moduleList.push(_temp);
            _temp = {};
          }
        } else {
          that.showError(URL + "_没有数据");
        }

      }).catch((error) => {
        console.log(error);
        that.showError(error);
      });
    }

    //获取角色标题--不通用
    static AddTeam(FUN, that, URL, params){
      //
      let _tempArr =[
          {
              cn_name:"ICDP超级管理员",
              create_tiem:"2018-08-13 11:05:01",
              description:"平台级别角色",
              domain:"",
              id:1,
              name:"icdp_superAdmin",
              order:0,
              reserve:false,
              sub_name:"",
          },
          {
              cn_name:"ICDP管理员",
              create_tiem:"2018-08-13 11:05:01",
              description:"平台级别角色",
              domain:"",
              id:2,
              name:"icdp_adminTeam",
              order:0,
              reserve:false,
              sub_name:"",
          },
          {
              cn_name:"ICDP配置管理员",
              create_tiem:"2018-08-13 11:05:01",
              description:"项目级别角色",
              domain:"",
              id:3,
              name:"icdp_confAdmin",
              order:0,
              reserve:false,
              sub_name:"",
          },
          {
              cn_name:"ICDP项目经理",
              create_tiem:"2018-08-13 11:05:01",
              description:"项目级别角色",
              domain:"",
              id:4,
              name:"icdp_projManager",
              order:0,
              reserve:false,
              sub_name:"",
          },
          {
              cn_name:"ICDP产品经理",
              create_tiem:"2018-08-13 11:05:01",
              description:"项目级别角色",
              domain:"",
              id:5,
              name:"icdp_prodManager",
              order:0,
              reserve:false,
              sub_name:"",
          },
          {
              cn_name:"ICDP小组长",
              create_tiem:"2018-08-13 11:05:01",
              description:"项目级别角色",
              domain:"",
              id:6,
              name:"icdp_teamLeader",
              order:0,
              reserve:false,
              sub_name:"",
          },
          {
              cn_name:"ICDP敏捷教练",
              create_tiem:"2018-08-13 11:05:01",
              description:"项目级别角色",
              domain:"",
              id:7,
              name:"icdp_agileCoach",
              order:0,
              reserve:false,
              sub_name:"",
          },
          {
              cn_name:"ICDP总体组",
              create_tiem:"2018-08-13 11:05:01",
              description:"项目级别角色",
              domain:"",
              id:8,
              name:"icdp_generalTeam",
              order:0,
              reserve:false,
              sub_name:"",
          },
          {
              cn_name:"ICDP测试组",
              create_tiem:"2018-08-13 11:05:01",
              description:"项目级别角色",
              domain:"",
              id:9,
              name:"icdp_testTeam",
              order:0,
              reserve:false,
              sub_name:"",
          },
          {
              cn_name:"ICDP开发组",
              create_tiem:"2018-08-13 11:05:01",
              description:"项目级别角色",
              domain:"",
              id:10,
              name:"icdp_devTeam",
              order:0,
              reserve:false,
              sub_name:"",
          },
      ]
      FUN(URL,params,{timeout:5000,method:'get'})
      .then((response) => {
          let myData = response.data;
          console.log("<======【agile addTeam get】***response+++",response,myData,"====>");
          let _tempObj = {};
          
          let _myDataArr = false;
          if(Array.isArray(myData) && myData.length){
              _myDataArr = myData;
          }else if(Array.isArray(myData.data) && myData.data.length){
              _myDataArr = myData.data;
          }else{
              _myDataArr = _tempArr;
          }
          for(var i=0;i<_myDataArr.length;i++){
              _tempObj.value = _myDataArr[i].name;
              _tempObj.label = _myDataArr[i].cn_name;
              that.formPartValidate.addGroupList.push(_tempObj);
              _tempObj = {};
          }
      })
      .catch( (error) => {
          console.log(error);
          that.showError(error);
          
          let _tempObj = {};
          for(var i=0;i<_tempArr.length;i++){
              _tempObj.value = _tempArr[i].name;
              _tempObj.label = _tempArr[i].cn_name;
              that.formPartValidate.addGroupList.push(_tempObj);
              _tempObj = {};
          }
          
      });   
      //
    }

    //获取搜索下拉菜单--不通用
    static GetCondition(FUN,that,URL, condition,prj_id){
      //
      return FUN(URL,{condition,prj_id},{timeout:20000,method:'get'})
      .then((response) => {
          let myData = response.data;
          console.log("<======product condition***response+++",condition,response,myData,"======>");
          if(myData){
            //myData.length
            if(Array.isArray(myData) && myData.length){
              //
              let _OBJ = {};
              if(that[condition+"List"]){
                for(let i=0;i<myData.length;i++){
                    _OBJ.label = (myData[i].value || myData[i].sprint_name)+""
                    _OBJ.value = (myData[i].key || myData[i].sprint)+""
                    that[condition+"List"].push(_OBJ)
                    _OBJ = {};
                }

                return Promise.resolve("true")
                
              }else{
                that.showError(URL+"****"+condition+"_没有this."+condition+"List");
                
                return Promise.reject("false");
              }
              //
            }else if(myData.status && myData.status == "success"){
              return Promise.resolve("true")
            }else{
              that.showError(URL+"****"+condition+JSON.stringify(myData));
              return Promise.reject("false");
            }
              
          }else{
              that.showError(URL+"****"+condition+"_错误");
              return Promise.reject("false");
          }


          
      })
      .catch( (error) => {
          console.log(error);
          that.showError(error);
          return Promise.reject("false");
      });
      //
    }

    //添加默认负责人--不通用
    static PublishUser(FUN,that,URL,params = {}){
      //
      FUN(URL,params,{timeout:5000,method:'get'}).then((response) => {
          let myData = response.data;
          console.log("<======【product publishUser get】***response+++",response,myData,"====>");
          if(myData && myData.user_name){
              that.formValidate.charger = myData.nick_name
              that.formValidate.nick_name = myData.user_name
          }else{
              that.showError(URL+"_没有数据");
          }
      }).catch( (error) => {
          console.log(error);
          that.showError(error);
      });   
      //
    }

    //获取权限--不通用
    static GetPermission(FUN,that,URL,params = {}){
      //
      FUN(URL,{},{timeout:20000,method:'get'}).then((response) => {
          let myData = response.data;
          console.log("<======agile getPermission***response+++",response,myData,"======>");
          if(myData.prj_permission && myData.prj_permission.length){
              that.prj_permission = myData.prj_permission;
              that.identity = myData.identity
          }else if(myData.permission && myData.permission.length){
              that.prj_permission = myData.permission;
              that.identity = myData.identity
          }
          else{
              that.showError("权限不足，不能有任何动作");
          }
          
          
      }).catch( (error) => {
          console.log(error);
          that.showError(error);
      });
      //
    }

    static returnDelArr(arr,arrList){
        for(let i= 0;i<arr.length;i++){
            let INDEX = arrList.findIndex((item)=>{return item.value == arr[i] })
            if(INDEX != -1){
                arrList.splice(INDEX,1)
            }
        }
        return arrList
    }

    static ProiFn = (N,STR="")=>{
      let Lable = "未知"
      if(this[STR+"List"] && this[STR+"List"].length){
        for(let j=0;j<this[STR+"List"].length;j++){
          if(this[STR+"List"][j].value == N){
            Lable = this[STR+"List"][j].label
          }
        }
      }else{
        if(N == 1){
          Lable = "高"
        }else if(N ==2){
          Lable = "中"
        }else if(N ==3){
          Lable = "低"
        }else{
          Lable = "未知"
        }
      }
      return Lable;
    }

    static ProiColorFn = (N,STR="")=>{
      let Lable = "#dddee1"
      if(this[STR+"List"] && this[STR+"List"].length){
        for(let j=0;j<this[STR+"List"].length;j++){
          if(this[STR+"List"][j].value == N){
            Lable = this[STR+"List"][j].label
          }
        }
      }else{
        if(N == 1){
          Lable = "#ed3f14"
        }else if(N ==2){
          Lable = "#19be6b"
        }else if(N ==3){
          Lable = "#2d8cf0"
        }else{
          Lable = "#dddee1"
        }
      }
      return Lable;
    }

    static TypeFn = (N,STR="")=>{
      let Lable = "未知"
      if(this[STR+"List"] && this[STR+"List"].length){
        for(let j=0;j<this[STR+"List"].length;j++){
          if(this[STR+"List"][j].value == N){
            Lable = this[STR+"List"][j].label
          }
        }
      }else{
        if(N == 1){
          Lable =  "用户需求"
        }else if(N ==2){
          Lable =  "生产问题"
        }else if(N ==3){
          Lable =  "自主创新"
        }else{
          Lable =  "未知"
        }
      }
      return Lable;
    }

    static StatusFn = (N,STR="")=>{

      let Lable = "未知"
      if(this[STR+"List"] && this[STR+"List"].length){
        for(let j=0;j<this[STR+"List"].length;j++){
          if(this[STR+"List"][j].value == N){
            Lable = this[STR+"List"][j].label
          }
        }
      }else{
        if(N == 1){
          Lable =   "提　出"
        }else if(N ==2){
          Lable =   "开发中"
        }else if(N ==3){
          Lable =   "测　试"
        }else if(N ==4){
          Lable =   "上　线"
        }else{
          Lable =   "未　知"
        }
      }
      return Lable;
    }



    static StatusColorFn = (N,STR="")=>{
      let Lable = "#1c2438"
      if(this[STR+"List"] && this[STR+"List"].length){
        for(let j=0;j<this[STR+"List"].length;j++){
          if(this[STR+"List"][j].value == N){
            Lable = this[STR+"List"][j].label
          }
        }
      }else{
        if(N == 1){
          Lable =   "#2b8cf0"
        }else if(N ==2){
          Lable =   "#ed3f14"
        }else if(N ==3){
          Lable =   "#ff9900"
        }else if(N ==4){
          Lable =   "#19be6b"
        }else{
          Lable =   "#1c2438"
        }
      }
      return Lable;
    }



}
function getSCFn(that,_Common,name){
  let result = false;
  if(that.$router.history.current.query[name]){
     result = that.$router.history.current.query[name] 
  }else if(localStorage.getItem(name)){
     result = localStorage.getItem(name)
  }else if(_Common.getCookie(name)){
      result = _Common.getCookie(name)
  }
  return result

}
  


