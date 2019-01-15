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
      console.log("《=======【OBJ】",OBJ,"OBJ=======》")
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
                "id":"",
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
        for(var i=0;i<OBJ.length;i++){
          if(i/rows && Number.isInteger(i/rows)){
            _tempArr.length && TAB.push(_tempArr);_tempArr = [];
            
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
            if(i+1 == rows*_SH){
              TAB.push(_tempArr);
              _tempArr = []
            }else{

            }
          }
        }
      }
      
      let Element = "";
      let thWidth = thW;
      let _cols2 = false;
      let _cols = false;

      if(TAB && Array.isArray(TAB) && TAB.length){
        for(let i=0;i<TAB.length;i++){
          if(TAB[i] && Array.isArray(TAB[i]) && TAB[i].length){
            for(let j=0;j<TAB[i].length;j++){
              if(TAB[i][j].member && Array.isArray(TAB[i][j].member) && TAB[i][j].member.length){
                for(let k=0;k<TAB[i][j].member.length;k++){
                  if(TAB[i][j].member[k].nick_name.indexOf("-") != -1){
                    TAB[i][j].member[k].nick_name = TAB[i][j].member[k].nick_name.split("-")[0];
                    TAB[i][j].member[k].nick_name = TAB[i][j].member[k].nick_name.indexOf("(") != -1 ? TAB[i][j].member[k].nick_name+")" : TAB[i][j].member[k].nick_name+"";
                  }
                  if(TAB[i][j].member[k].nick_name.indexOf("、") == -1){
                    TAB[i][j].member[k].nick_name = TAB[i][j].member[k].nick_name+"、";
                  }
                  if(k== TAB[i][j].member.length-1 && TAB[i][j].member[k].nick_name.indexOf("、") != -1){
                    TAB[i][j].member[k].nick_name = TAB[i][j].member[k].nick_name.replace("、","");
                  }
                }
              }
            }
          }
        }
      }

      console.log("《=======【TAB】",TAB,"TAB=======》")
      
      for(var tr =0;tr<TAB.length;tr++){
         Element += '<tr>';
         for(var thtd = 0;thtd<TAB[tr].length;thtd++){

          if(false){
            Element += '<th>'
            Element += TAB[tr][thtd].title;
            Element += '</th>'
            Element += '<td>'
              for(var td =0;td<TAB[tr][thtd].member.length;td++){
                  Element += TAB[tr][thtd].member[td].nick_name == "&nbsp;" ? TAB[tr][thtd].member[td].nick_name : '<em>'+TAB[tr][thtd].member[td].nick_name+'</em>';
              }
            Element += '</td>'
          }else

          if(TAB.length == 1 && _sn && Colspan ){
            if(rows-_sn ==1){
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
            }else{
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
            }
          }else if(tr == TAB.length-1 && _sn && Colspan){
            if(thtd>= rows-_sn){//thtd >_sn
              if(!_cols2){
                Element += '<td colspan="'+_sn*2+'">&nbsp;</td>'
              }
              _cols2 = true;
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

      let isShowOpen;
      if(window.location.href.indexOf("consoleLog=true") != -1 || super.getCookie("consoleLog")){
        isShowOpen = false;
      }else{
        isShowOpen = true;
      }

      if (process.env.NODE_ENV === 'production' && isShowOpen) {
        console.log(MET+" | "+URL);
        console.log(JSON.stringify(ERR));
      }else{
        THIS.$Notice.open({
            title: MET+" | "+URL,
            desc: JSON.stringify(ERR),
            duration: 10
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
          if(KEY && Array.isArray(KEY) && KEY.length){
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

    static AdminAuth(THIS,KEY){
      let OBJ = THIS.prj_permission;
      if(KEY && Array.isArray(KEY) && KEY.length){
        let _temp = true;
        for(let i =0;i<KEY.length;i++){
          if(THIS.identity && THIS.identity.indexOf(KEY[i]) != -1){
              _temp = false;
          }
        }
        return _temp
      }else{
        return false;
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
    static changeArr(_this, curVal, _Common, _projectAddGroup,_params = {}) {
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
                _this.projectGroupFn(_URL, Object.assign(_params,{userName: value,}), _num, THIS);
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

    //给输入框本身加已选择的数组temp2 --不通用
    static inputArr2(_this,val){

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
            for(let j=0;j<val.AddGroupList[i].groupListtemp.length;j++){
                if(ArrFn(val.AddGroupList[i].groupListtemp[j],val.AddGroupList[i].grouptemp)){
                    _tempArr.push(ArrFn(val.AddGroupList[i].groupListtemp[j],val.AddGroupList[i].grouptemp))
                }
            }
            document.getElementById("sel"+i).getElementsByClassName("ivu-select-input")[0].temp = _tempArr;
            _tempArr = [];  
            
        }

      })
    }

    //给输入框加函数节流2--不通用
    static changeArr2(_this, curVal, _Common, _projectAddGroup,FUN) {
      _this.$nextTick(() => {
        for (var i = 0; i < curVal.length; i++) {
          let _DOM = _this.$refs[curVal[i].myReftemp + i][0].$el.getElementsByClassName("ivu-select-input")[0];
          _DOM.addEventListener("keyup", function(event) {
            let _num = Number(this.parentNode.parentNode.parentNode.id.replace("sel", ""));
            let exec = _Common.throttle(
              (value, THIS) => {
                let _URL;
                let _param = {};

                if(curVal[_num].groupName){
                  _URL = curVal[_num].groupName;
                  _param = {name: value,}
                }else {
                  _URL = _projectAddGroup;
                  _param = {userName: value,}
                }
                _this.inputLoad = true;
                FUN ? FUN(_URL,_param, _num,THIS) : _this.projectGroupFn2(_URL,_param, _num,THIS);
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


    //添加角色2--不通用
    static  addPartPopBox2(name,that){
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
            modaAdd:false,//添加角色修改
            grouptemp:[],//修改添加角色
            groupListtemp: [],//修改添加角色
            myReftemp: "selfRefRole",//修改添加角色
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
    //添加角色2--不通用
    static  addPartPopBox3(name,that,partName){
      let _tempObj = {
        myRef: "selfRef",
        group: [],
        groupList: [],
        myLabel: "",
        myValue: "",
        delBtn: true,
        groupName: that.popIsInput?that.popIsInput:"",
        required: true,
        modaAdd:false,//添加角色修改
        grouptemp:[],//修改添加角色
        groupListtemp: [],//修改添加角色
        myReftemp: "selfRefRole",//修改添加角色
      }
      //that.formPartValidate.addGroupList.length
      _tempObj.myLabel = !that.popIsInput ? that.formPartValidate.addGroupList.filter((item) => {
        return item.value == that.formPartValidate.partName
      })[0].label : that.formPartValidate.partName;
      _tempObj.myValue = that.formPartValidate.partName;
      that.formValidate.AddGroupList.push(_tempObj);
      that.formPartValidate.partName = "";
      _tempObj = null;
      that.partAdd = false;
    }

    //搜索--修改标签
    static ModifyTagData(D,that){
      let Root = that.formValidate.AddGroupList[0];
            
      let _ArrL = Root.groupList;
      let Index = _ArrL.findIndex((item)=>{
          return D.bfunc_id == item.value 
      })
      if(Index >=0){
          that.$set(_ArrL[Index],"label", D.bfunc_name);
      }
      
      
      let _ArrG = Root.group;
      let IndexG = _ArrG.findIndex((item)=>{
          return D.bfunc_id == item 
      })
      if(IndexG>=0){
          let Temp_IndexG = _ArrG[IndexG];
          _ArrG.splice(IndexG,1,Temp_IndexG)
      }

      let _ArrGT = Root.grouptemp;
      let IndexGT = _ArrGT.findIndex((item)=>{
          return D.bfunc_id == item 
      })
      if(IndexGT>=0){
          let Temp_IndexGT = _ArrGT[IndexGT];
          _ArrGT.splice(IndexGT,1,Temp_IndexGT)
      }
    }
    //搜索--添加菜单
    static ProjectGroupFN(FUN, that, URL, params,ARR,thatEle,actionObj){
      FUN(URL,params,{timeout:60000,method:'get'}).then((response) => {
          let myData = response.data;
          console.log("<======【checkSearch Allgroup】***response+++",response,myData,"====>");
          that.inputLoad = false;
          that.formValidate.AddGroupList[ARR].groupList = [];
          let _List = myData.data ? myData.data.list : myData.list;

          let actionList = (arr1,arr2)=>{
            if(actionObj && actionObj.busTable){
              let L = [];
              arr2 ? L.push(...arr1,...arr2) : L.push(...arr1);
              let T = actionObj.busTable;
              let N = super.Unique(L,T);
              for(let i=0;i<N.length;i++){
                super.DelArrN(L,N[i],"value")
              }
              return L
            }else{
              return false
            }
          }
          if(typeof(ARR)  == "number"){
            let AddGroupList_ARR = that.formValidate.AddGroupList[ARR];
            if(thatEle && thatEle.temp && thatEle.temp.length){
              let _tempArr = Common.returnDelArr(AddGroupList_ARR.group,_List);
              let _tempList = actionList(_tempArr);
              if(_tempList){
                AddGroupList_ARR.groupList.push(...thatEle.temp,..._tempList);
              }else{
                AddGroupList_ARR.groupList.push(...thatEle.temp,..._tempArr);  
              }
            }else{
              let _tempList = actionList(_List);
              if(_tempList){
                AddGroupList_ARR.groupList.push(..._tempList);
              }else{
                AddGroupList_ARR.groupList.push(..._List);  
              }
            }
          }
      }).catch( (error) => {
          console.log(error);
          that.inputLoad = false;
          that.showError(error);
      });   
    }
    //搜索--添加搜索项
    static AddCheckSerch(that,myLabel,myValue,required,delBtn,modaAdd,groupName){
      let _tempObj = {
          myRef: "selfRef",
          group: [],
          groupList: [],
          myLabel: myLabel,
          myValue: myValue,
          delBtn: delBtn,
          groupName: groupName,
          required: required,
          modaAdd:modaAdd,//修改添加角色
          grouptemp:[],//修改添加角色
          groupListtemp: [],//修改添加角色
          myReftemp: "selfRefRole",//修改添加角色
      }
      that.formValidate.AddGroupList.push(_tempObj);
      return Promise.resolve(that.formValidate);

    }
    //搜搜--向穿梭增加删除项
    static SelectChange(that){
      let _G = that.formValidate.AddGroupList[0].group;
      let _GT = that.formValidate.AddGroupList[0].grouptemp;
      let fn = (val,arr)=>{
          return arr.findIndex((item)=>{
              return val == item
          })
      }
      let FN = (arr,arr2)=>{
          for(let i=0;i<arr.length;i++){
              if(fn(arr[i],arr2) == -1){
                  return arr[i];
              }
          }
      }
      that.isPopsAdd = _G.length > _GT.length ? "+" : "-";
      that.popsItem = _G.length > _GT.length ? FN(_G,_GT) : FN(_GT,_G);

      ///////====>
      let changeTag = ()=>{
          let _GL = this.formValidate.AddGroupList[0].groupList;
          let IndexGL = _GL.findIndex((item)=>{
              return this.popsItem == item.value 
          })
          let IndexG = _G.findIndex((item)=>{
              return this.popsItem == item 
          })
          setTimeout(()=>{
              if(IndexG>=0){
                  let _tagText = document.getElementById("sel0").getElementsByClassName("ivu-tag")[IndexG].getElementsByClassName("ivu-tag-text")[0];
                  if(_tagText.innerHTML != _GL[IndexGL].label){
                      _tagText.innerHTML = _GL[IndexGL].label;
                  }
              }
          },0)
      }
      //changeTag();
      ///////<====
      that.formValidate.AddGroupList[0].grouptemp = that.formValidate.AddGroupList[0].group;

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
    //获取Storage和Cookie--不通用
    static getStorageAndCookie(that,_Common,name){
      let value = getSCFn(that,_Common,name);
      return value;
    }

    //获取id--不通用
    static GETID(that,_Common,From){
      let ID = false;
      let key = "id";
      if(From == "inCookie"){
        ID = getCookieFn(that,_Common,key);
      }else if(From == "inLocalStorage"){
        ID = getLocalStorageFn(that,_Common,key);
      }else{
        ID = getSCFn(that,_Common,key);
      }
      return ID;
    }

    //获取detail_id--不通用
    static GETdetail_id(that,_Common,From){
      let detailID = false;
      let key = "detail_id";
      if(From == "inCookie"){
        detailID = getCookieFn(that,_Common,key);
      }else if(From == "inLocalStorage"){
        detailID = getLocalStorageFn(that,_Common,key);
      }else{
        detailID = getSCFn(that,_Common,key);
      }
      return detailID;
    }

    //获取prj_id--不通用
    static GETprjid(that,_Common,From){
      let prj_ID = false;
      let key = "prj_id";
      if(From == "inCookie"){
        prj_ID = getCookieFn(that,_Common,key);
      }else if(From == "inLocalStorage"){
        prj_ID = getLocalStorageFn(that,_Common,key);
      }else{
        prj_ID = getSCFn(that,_Common,key);
      }
      return prj_ID;
    }

    //获取prod_id--不通用
    static GETprodid(that,_Common,From){
      let prod_ID = false;
      let key = "prod_id";

      if(From == "inCookie"){
        prod_ID = getCookieFn(that,_Common,key);
      }else if(From == "inLocalStorage"){
        prod_ID = getLocalStorageFn(that,_Common,key);
      }else{
        prod_ID = getSCFn(that,_Common,key);
      }
      return prod_ID;
    }

    //获取模块--不通用
    static Modulelist(FUN, that, URL, params) {
      return FUN(URL, params, {
        timeout: 5000,
        method: 'get'
      }).then((response) => {
        let myData = response.data;
        console.log("<======【agile 获取模块 get】***response+++", response, myData, "====>");
        if(myData.status == "success"){
          let MYDATA = myData.data ? myData.data : myData;
          if (MYDATA.res && Array.isArray(MYDATA.res) && MYDATA.res.length) {
            let _temp = {};
            for (let i = 0; i < MYDATA.res.length; i++) {
              _temp.label = MYDATA.res[i].module_name;
              _temp.value = MYDATA.res[i].module_id + "";
              that.moduleList.push(_temp);
              _temp = {};
            }
          }
          return Promise.resolve(that.moduleList)
        }else{
          if(myData.res && Array.isArray(myData.res) && myData.res.length){
            let _temp = {};
            for (let i = 0; i < myData.res.length; i++) {
              _temp.label = myData.res[i].module_name;
              _temp.value = myData.res[i].module_id + "";
              that.moduleList.push(_temp);
              _temp = {};
            }
            return Promise.resolve(that.moduleList)
          }else{
            that.showError(URL + "|status=" +myData.status +"_错误");
            return Promise.reject(false);  
          }
        }

        /*
        if (myData && myData.res && myData.res.length) {
          let _temp = {};
          for (let i = 0; i < myData.res.length; i++) {
            _temp.label = myData.res[i].module_name;
            _temp.value = myData.res[i].module_id + "";
            that.moduleList.push(_temp);
            _temp = {};
          }
          return Promise.resolve(that.moduleList)
        } else {
          that.showError(URL + "_没有数据");
          return Promise.reject(false);
        }
        */

      }).catch((error) => {
        console.log(error);
        that.showError(error);
        return Promise.reject(error);
      });
    }
    //获取逻辑子系统和业务类型 下拉列表
    static SelbusinessList(that,FUN,URL,params){
      //
      return FUN(URL,params,{timeout:20000,method:'get'}).then((response) => {
          let myData = response.data;
          console.log("<======新增业务功能  userstoryGetLogic_sys_no***+++",response,myData,"======>");
          if(myData.typeList && myData.logicList){
              if(that.typeList && that.logicList){
                that.typeList = myData.typeList;
                that.logicList = myData.logicList
                return Promise.resolve(myData)
              }else{
                that.showError("没有typeList或logicList");
                return Promise.reject(false);
              }
              
          }else{
              that.showError(URL+"错误");
              return Promise.reject(false);
          }
          
      }).catch( (error) => {
          console.log(error);
          that.showError(error);
          return Promise.reject(false);
      });
      //
    }
    static FromBusGoBack(that){
      let business = that.$router.history.current.query.business;
      let detail_id = that.$router.history.current.query.detail_id;
      if(business){
        that.$router.push({path:'/demand/business/',query:{}});
      }else{
        that.$router.push({path:'/product/detail/',query:{detail_id,TabsCur:"name2"}});
      }
      
    }
    static BusResetFields(that){
      that.formValidate.bfunc_id="";
      that.formValidate.bfunc_name="";
      that.formValidate.logic_sys_no="";
      that.formValidate.bfunc_status="";
      that.formValidate.who="";
      that.formValidate.bfunc_type="";
      that.formValidate.businessDes="";
      that.formValidate.synergetic_relation = "";
      that.formValidate.stepview = "";
      that.$refs.formValidate.resetFields();
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
              that[condition+"List"] = [];
              if(that[condition+"List"]){
                for(let i=0;i<myData.length;i++){
                    _OBJ.label = (myData[i].value || myData[i].sprint_name)+""
                    _OBJ.value = (myData[i].key || myData[i].sprint)+""
                    that[condition+"List"].push(_OBJ)
                    _OBJ = {};
                }

                return Promise.resolve(that[condition+"List"])
                
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

    //获取搜索下拉菜单全部--不通用
    static GetConditionAll(FUN,that,URL, condition,prj_id,all){
      //
      return FUN(URL,{condition,prj_id},{timeout:20000,method:'get'})
      .then((response) => {
          let myData = response.data;
          console.log("<======product condition***response+++",condition,response,myData,"======>");
          if(myData){
            let objFn = (arr)=>{
              let _OBJ = {};
              let _arr = [];
              for(let i=0;i<arr.length;i++){
                _OBJ.label = (arr[i].value || arr[i].sprint_name || arr[i].nick_name || arr[i].key || "")+"";
                _OBJ.value = (arr[i].key || arr[i].sprint || arr[i].user_name || 0)+"";
                _arr.push(_OBJ);
                _OBJ = {};
              }
              return _arr;
            }
            for(let i=0;i<all.length;i++){
              if(that[all[i]+"List"]){
                that[all[i]+"List"] = [];
                that[all[i]+"List"] = objFn(myData[all[i]]);
              }else{
                return Promise.reject("没有"+all[i]+"List");
              }
              
            }
            return Promise.resolve(myData)
            
          }else{
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
    //添加责任人下拉菜单
    static AddChargerMenu(THIS,List,chargerObj){
      
      let _temp={label:chargerObj.charger,value:chargerObj.nick_name};
      if(THIS[List+"List"].length){
          let checkVal = THIS[List+"List"].findIndex((item)=>{
              return item.value == _temp.value
          })
          if(checkVal == -1){THIS[List+"List"].push(_temp);} 
      }else{
          THIS[List+"List"].push(_temp)
      }
    }

    //添加默认负责人--不通用
    static PublishUser(FUN,that,URL,params = {}){
      //
      return FUN(URL,params,{timeout:5000,method:'get'}).then((response) => {
          let myData = response.data;
          console.log("<======【product publishUser get】***response+++",response,myData,"====>");
          if(myData && myData.user_name){
              that.formValidate.charger = myData.nick_name
              that.formValidate.nick_name = myData.user_name
              return Promise.resolve({charger:myData.nick_name,nick_name:myData.user_name})
          }else{
              that.formValidate.charger = super.getCookie("nickname") || "";
              that.formValidate.nick_name = super.getCookie("username") || "";
              return Promise.resolve({charger:super.getCookie("nickname") || "",nick_name:super.getCookie("username") || ""})

              that.showError(URL+"_没有数据");
              return Promise.reject(URL+"_没有数据");
          }
      }).catch( (error) => {
          console.log(error);
          that.showError(error);
          return Promise.reject(error);
      });   
      //
    }

    //获取权限--不通用
    static GetPermission(FUN,that,URL,params){
      let _params = params ? params : {username:super.getCookie("username")}
    	return FUN(URL,_params,{timeout:20000,method:'get'}).then((response) => {
			let myData = response.data;
			console.log("<======agile getPermission***response+++",response,myData,"======>");
			if(myData.status =="success"){
				if(myData.prj_permission && Array.isArray(myData.prj_permission) && myData.prj_permission.length){
					that.prj_permission = myData.prj_permission;
					that.identity = myData.identity
          
				}else if(myData.permission && Array.isArray(myData.permission) && myData.permission.length){
					that.prj_permission = myData.permission;
					that.identity = myData.identity
          
				}

				return Promise.resolve(myData)
			}else if(myData.status =="redirect"){
				toLoginPage(that,myData.status);
				return Promise.reject(myData.status);
			}else{
				toLoginPage(that,myData.status);
				that.showError("权限不足，不能有任何动作");
				return Promise.reject("权限不足，不能有任何动作");
			}
          
  		}).catch( (error) => {
  			console.log(error);
  			toLoginPage(that,"获取权限出错！");
  			that.showError(error);
  			return Promise.reject(error);
  		});

  		if(timer){clearInterval(timer)}
  		let time = 0;
  		let timer = setInterval(()=>{
  			if(super.getCookie("username")){
  				clearInterval(timer);
  				//
  				//
  			}else if(time > 60){
  				toLoginPage(that);
  			}
  			time ++
  		},500)
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
    //翻译优先级颜色--不通用
    static ProiColorFn(N,STR=""){
      let Lable = "#dddee1"
      if(this[STR+"List"] && this[STR+"List"].length){
        for(let j=0;j<this[STR+"List"].length;j++){
          if(this[STR+"List"][j].value == N){
            Lable = this[STR+"List"][j].label
          }
        }
      }else{
        if(N == 1){
          Lable = "#ed3f14"//高
        }else if(N ==2){
          Lable = "#19be6b"//中
        }else if(N ==3){
          Lable = "#2d8cf0"//低
        }else{
          Lable = "#dddee1"//无
        }
      }
      return Lable;
    }
    //翻译优先级--不通用
    static ProiFn(N,STR=""){
      let Lable = "无"
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
          Lable = "无"
        }
      }
      return Lable;
    }
    //翻译故事类型--不通用
    static TypeFn(N,STR=""){
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
    
    
    //翻译故事状态--不通用
    static StatusFn(N,STR="",that){

      let Lable = "未知"
      if(that[STR+"List"] && that[STR+"List"].length){
        for(let j=0;j<that[STR+"List"].length;j++){
          if(that[STR+"List"][j].value == N){
            Lable = that[STR+"List"][j].label
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
          Lable =   "发　布"//"上　线"
        }else if(N ==5){
          Lable =   "上　线"
        }else{
          Lable =   "未　知"
        }
      }
      return Lable;
    }
    //翻译状态颜色--不通用
    static StatusColorFn(N,STR=""){
      let Lable = "#1c2438"
      if(this[STR+"List"] && this[STR+"List"].length){
        for(let j=0;j<this[STR+"List"].length;j++){
          if(this[STR+"List"][j].value == N){
            Lable = this[STR+"List"][j].label
          }
        }
      }else{
        if(N == 1){
          Lable = "#2b8cf0";//提　出
        }else if(N ==2){
          Lable = "#ed3f14";//开发中
        }else if(N ==3){
          Lable = "#ff9900"//测　试
        }else if(N ==4){
          Lable = "#bbbec4"//发　布
        }else if(N ==5){
          Lable = "#19be6b"//上　线
        }else{
          Lable = "#1c2438"//未　知
        }
      }
      return Lable;
    }
    //翻译需求类型--不通用
    static PrjTypeFn(STR=""){
      let Lable = "未知"
      if(STR){
        if(STR == 1){
          Lable = "立研"
        }else if(STR == 2){
          Lable = "自研"
        }
      }else{
        return Lable;
      }
      return Lable;
      
    }

    //角色添加弹出--不通用
    static CancelRole(that,i){
      let List = that.formValidate.AddGroupList;
      List[i].grouptemp = [];
      List[i].groupListtemp = [];
    }
    //角色取消--不通用
    static RoleClose(that,event, name){
      let I = Number(event.path[2].getAttribute("id").split("_")[1])
      that.formValidate.AddGroupList[I].group.splice(name, 1);
      that.formValidate.AddGroupList[I].groupList.splice(name, 1);
    }
    //弹出添加角色--不通用
    static AddRole(that,i){
      that.formValidate.AddGroupList[i].modaAdd = true;
    }


    //从数组里拷贝数值一样的对象--不通用
    static objCopyArr (Arr1 = [],Arr2 = []){
      let _arr = [];
      let arrFn = (val,arr)=>{
        for(let i=0;i<arr.length;i++){
          if(val &&  Array.isArray(arr) && arr.length){
             if(val == arr[i].value){
              return arr[i];
            }
          }else{
            return false;
          }
        }
        
      }
      if(Array.isArray(Arr1) && Array.isArray(Arr2)){
        if(Arr1.length){
          for(let j=0;j<Arr1.length;j++){
            arrFn(Arr1[j],Arr2) && _arr.push(arrFn(Arr1[j],Arr2))
          }
        }
      }else{
        return false;
      }
      return _arr;
    }
    //提交添加角色--不通用
    static SubmitRole(that,i,_Common){
      let List = that.formValidate.AddGroupList;
      let List2 = _Common.objCopyArr(List[i].grouptemp,List[i].groupListtemp)

      if(List[i].grouptemp && Array.isArray(List[i].grouptemp) && List[i].grouptemp.length && List2 && Array.isArray(List2) && List2.length){
          List[i].group.push(...List[i].grouptemp)
          List[i].groupList.push(...List2)
      }

      List[i].grouptemp = [];
      List[i].groupListtemp = [];
    }
    //角色添加下拉菜单人员--不通用
    static ProjectGroup2(FUN,that,URL,params = {},ARR,thatEle,OBJECT,selElemFUN){
      FUN(URL,params,{timeout:60000,method:'get'}).then((response) => {
          let myData = response.data;
          console.log("<======【agile Allgroup get】***response+++",response,myData,"====>");
          that.inputLoad = false;

          let OBJ = OBJECT ? OBJECT : that.formValidate
          OBJ.AddGroupList[ARR].groupListtemp = [];
          selElemFUN?selElemFUN(ARR,thatEle,myData.data.list) : that.addSelectEleList(ARR,thatEle,myData.data.list);
          
          
      }).catch( (error) => {
          console.log(error);
          that.inputLoad = false;
          that.showError(error);
      });  
    }

    //检查角色缺少 [value]--不通用
    static CheeckRoleVal(that,Arr){
      let List = that.formPartValidate.addGroupList;
      if(Array.isArray(Arr) && Arr.length){
          for(let i=0;i<Arr.length;i++){
              if(Arr[i].title && !Arr[i].title.value){
                  for(let j=0;j<List.length;j++){
                      if(List[j].label.indexOf(Arr[i].title.label) != -1){
                          Arr[i].title.value = List[j].value
                      }
                  }

              }
          }
      }
      return Arr
    }

    //
    static FileterStr(STR = ""){
      return fileterStr(STR)
    }
    //
    static FileterStr2(STR = ""){
      return fileterStr2(STR)
    }

    static SetSession(Key,Value){
      return sessionStorage.setItem(Key,Value);
    }
    static GetSession(Key){
      return sessionStorage.getItem(Key);
    }
    static RemoveSession(Key){
      sessionStorage.removeItem(Key);
    }
    static ClearSession(Key){
      sessionStorage.clear();
    }
    static LengthSession(){
      return sessionStorage.length;
    }
    //设置用户故事分页和搜索还原--不通用
    static UserstorySession(_Common,that = false){
      if(that && that.$router.history.current.path.indexOf("detail") != -1){
        if(_Common.GetSession("allSession")){
          return;
        } 
      }
      let allSession = _Common.GetSession("userstorySerch") ? JSON.parse(_Common.GetSession("userstorySerch")) : {};
      allSession.tableDAtaPageCurrent = _Common.GetSession("tableDAtaPageCurrent") ? _Common.GetSession("tableDAtaPageCurrent") : 1;
      _Common.SetSession("allSession",JSON.stringify(allSession));
      _Common.RemoveSession("tableDAtaPageCurrent");
      _Common.RemoveSession("userstorySerch");
      _Common.RemoveSession("oldAllSession");
      _Common.RemoveSession("userstorySerchTemp");
        
    }
    //删除用户故事分页和搜索还原--不通用
    static DelectUserstorySession(_Common){
      _Common.RemoveSession("userstorySerchTemp");
      _Common.RemoveSession("allSession");
      _Common.RemoveSession("userstorySerch");
      _Common.RemoveSession("tableDAtaPageCurrent");
      _Common.RemoveSession("oldAllSession");
    }
    //用户故事分页和搜索跳转还原--不通用
    static GoUserstorySession(_Common,that){
      if(_Common.GetSession("userstorySerch")){

      }else if(_Common.GetSession("allSession")){
        _Common.SetSession("userstorySerch",_Common.GetSession("allSession"));
        _Common.RemoveSession("allSession");
      }else{
        let _temp = {
                  userstory_name:"",//用户故事名称
                  userstory_id:"",//故事编号
                  userstory_type:"",//故事类型
                  userstory_status:"",//故事状态
                  req_id:"",//所属需求
                  proi:"",//优先级
                  charger:"",//负责人
                  learn_concern:"",//是否领导关心
                  sprint:"",//所属迭代
              }
              _temp.sprint = that.formValidate.sprint;
              _Common.SetSession("userstorySerch",JSON.stringify(_temp));
              _Common.RemoveSession("allSession");

              
      }
    }
    //瞬间弹出信息
    static CommonMessage(that,Msg="！！！"){
      that.$Message.config({
          top: 250,
          duration: 3
      });
      that.$Message.success(Msg);
    }
    //瞬间弹出错误
    static CommonError(that,Msg="错误"){
      that.$Message.config({
          top: 250,
          duration: 3
      });
      that.$Message.error(Msg);
    }
    //瞬间弹出提示
    static CommonWarning(that,Msg="错误"){
      that.$Message.config({
          top: 250,
          duration: 3,
          closable:true,
      });
      that.$Message.warning(Msg);
    }
    //获取业务功能附件列表
    static GetFilesList(that,FUN,URL,_params = {}){
      return FUN(URL,_params,{timeout:60000,method:'get'})
      .then((response) => {
          let myData = response.data;
          console.log("<======【 附件列表获取 get】***response+++",response,myData,"====>");
          if(myData.status == "success" && myData.files && Array.isArray(myData.files)){
              that.tableData = myData.files;
              return Promise.resolve(true);
          }else{
              that.showError(URL+"错误");
              return Promise.reject(myData.status);
          }
      })
      .catch( (error) => {
          console.log(error);
          that.showError(error);
          return Promise.reject(error);
      }); 
    }
    //去null
    static replaceNullFn(val){
      if(val === null || val === "null" || val === undefined ||  val === "undefined" ||  val === false ||  val === "false" || val === NaN || val === "NaN" || val === "NaN-aN-aN"){
        return "";
      }else if(val == 0 || val == "0"){
        return val
      }else{
        return val || "";
      }
    }
    //判断是否时间 时间格式化
    static DateFormat(_Common,date){
      return _Common.replaceNullFn(date) ? new Date(_Common.replaceNullFn(date)).Format("yyyy-MM-dd") : "";
    }
    //下载文件和导出文件
    static DownFile(FN,that,URL,params={},fileName=""){
      return FN(URL,params,{timeout:60000,method:'get',responseType:"blob"}).then((response) => {
          let myData = response.data;
          console.log("<======***文件下载+++",response,myData,"======>");
          let blob = new Blob([myData],{type:"application/vnd.ms-excel"});
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          return Promise.resolve(link);
      }).catch( (error) => {
          that.showError(error);
          return Promise.reject(error);
      });
    }
    //检查结束日期
    static checkEndDate(that){
      return (rule, value, callback)=>{
        if (value) {
            let Timer = new Date(value).getTime() - new Date(that.formValidate.start_time).getTime();
            if(Timer >= 0){
                callback()
            }else{
                return callback(new Error('结束日期早于开始日期！'));
            }
        }else if(!value){
            return callback(new Error('请选择日期！'));
        }else{
            callback()  
        }
      };
    }
    //检查添加角色是否重复
    static checkPart(that){
      return (rule, value, callback) => {
          if(!value){
              return callback(new Error('内容不能为空！'));    
          }else{
              if(that.formValidate.AddGroupList.length){
                  for(var i=0;i<that.formValidate.AddGroupList.length;i++){
                      if(that.formValidate.AddGroupList[i].myValue == (value+"")){
                          return callback(new Error('内容重复！')); 
                      }
                  }
                  callback()
              }else{
                  callback()
              }
          }
      };
    }
    //过滤项目列表（）里银行名称的内容
    static ReplaceAgileListStr(_Common,str){
      let txt = str.indexOf("、") != -1 ? "、" : "|";
      let _str = str.split("、");
      for(let i=0;i<_str.length;i++){
        _str[i] = filterParentheses(_str[i]);
        _str[i] = _str[i].replace(/\(/g,"（").replace(/\)/g,"）");
      }
      return _str.join("、")
    }
    //替换|的内容为、
    static ReplaceAgileListTitleStr(str){
      return str.replace(/\|/g," 、 ")
    }

}
function filterParentheses(str){
  let check = (STR = "")=>{
          return str.indexOf(STR) != -1 ? true : false;
      }
      let isTrue = (fn)=>{
       let IS1  = fn("(") && fn(")") ? /\((\S*)\)/ : false;
       let IS2  = fn("（") && fn("）") ? /（(\S*)）/ : false;
       let IS3  = fn("(") && fn("）") ? /\((\S*)）/ : false;
       let IS4  = fn("（") && fn(")") ? /（(\S*)\)/ : false;
       if(IS1){
        return IS1;
       }else if(IS2){
        return IS2;
       }else if(IS3){
        return IS3;
       }else if(IS4){
        return IS4;
       }else{
        return false;
       }
      }
      let myCheck = isTrue(check);
      if(myCheck){
        let _str = str.match(myCheck)[1];
        let replaceTxt = _str.indexOf("-") != -1 ? _str.match(/(\S*)\-/)[1] : _str;
        return str.replace(_str,replaceTxt)
      }else{
        return str
      }
}
function fileterStr(STR){
  let strArr = "";
  if(STR){
    strArr = STR.indexOf("|") != -1 ? STR.split("|") : STR;
    if(strArr && Array.isArray(strArr) && strArr.length){
      for(let i=0;i<strArr.length;i++){
        if(strArr[i].indexOf("-") != -1){
          strArr[i] = strArr[i].split("-")[0];
          strArr[i] = strArr[i].indexOf("(") != -1 ? strArr[i] + ")" : strArr[i] + "";
        }
      }
      strArr = strArr.join("、")
    }

  }else{
    return STR  
  }
  return strArr
}
function fileterStr2(STR){
  let strArr = "";
  if(STR){
    if(STR.indexOf("-") != -1){
      strArr = STR.split("-")[0].indexOf("(") != -1 ? STR.split("-")[0]+")" : STR.split("-")[0]+"";
    }else{
      return STR  
    }
  }else{
    return STR  
  }
  return strArr
}
function getSCFn(that,_Common,name){
  let result = false;
  if(that.$router.history.current.query[name]){
     result = that.$router.history.current.query[name] 
  }else if(_Common.getCookie(name)){
      result = _Common.getCookie(name)
  }else if(localStorage.getItem(name)){
     result = localStorage.getItem(name)
  }
  return result

}
function getCookieFn(that,_Common,name){
  return _Common.getCookie(name) ? _Common.getCookie(name) : false;
}
function getLocalStorageFn(that,_Common,name){
  return localStorage.getItem(name) ? localStorage.getItem(name) : false;
}

function toLoginPage(THAT = false){
	let error =	(MSG = "错误",CallBack = ()=>{},Fn = ()=>{})=>{
		if(THAT){
			THAT.$Message.config({
			top: 250,
			duration: 3,
			closable:true,
			onClose:CallBack(),
			});
			THAT.$Message.error(MSG);
			return true ;
		}else{
			setTimeout(()=>{
				Fn();
			},2000)
			
			return false;
		}
	}

	let HostName = document.location.hostname;
	if(HostName == "127.0.0.1"){
		if(THAT){
		  THAT.showError('重定向 window.location.href="http://127.0.0.1:1000/"');
		}else{
		  alert('window.location.href="http://127.0.0.1:1000/"')
		}
	}else if(HostName == "128.196.63.30"){
		error("错误！到【http://128.192.184.4:8020/icdp?apptype=app03】登录",()=>{
			//window.location.href="http://128.192.184.4:8020/icdp?apptype=app03";
		},()=>{
			window.location.href="http://128.192.184.4:8020/icdp?apptype=app03";
		})

	}else if(HostName == "128.196.0.127"){
		error("错误！到【http://128.194.224.146:8000/icdp?apptype=app03】登录",()=>{
			//window.location.href="http://128.194.224.146:8000/icdp?apptype=app03"
		},()=>{
			window.location.href="http://128.194.224.146:8000/icdp?apptype=app03"
		})
	}else{
		error("错误！到【http://128.192.184.4:8020/icdp?apptype=app03】登录",()=>{
			//window.location.href="http://128.192.184.4:8020/icdp?apptype=app03"
		},()=>{
			window.location.href="http://128.192.184.4:8020/icdp?apptype=app03"
		})
	}
}
window.toLoginPage = toLoginPage;

