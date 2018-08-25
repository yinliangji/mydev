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

          console.log(TAB.length,TAB[tr].length)

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
              console.log("thtd,rows",thtd,rows)
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
              
              console.log("_cols2_cols2_cols2",_cols2)
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

    //
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
      THIS.$Notice.open({
          title: MET+" | "+URL,
          desc: JSON.stringify(ERR),
          duration: 60
      });
    }

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
      let _tempArr = []

      for(let i=0;i<val.AddGroupList.length;i++){
          for(let j=0;j<val.AddGroupList[i].groupList.length;j++){
              if(ArrFn(val.AddGroupList[i].groupList[j],val.AddGroupList[i].group)){
                  _tempArr.push(ArrFn(val.AddGroupList[i].groupList[j],val.AddGroupList[i].group))
              }
          }
          console.log("-=-=-=-=-=-=-=-==-",i,_tempArr)
          _this.$nextTick(()=>{
              document.getElementById("sel"+i).getElementsByClassName("ivu-select-input")[0].temp = _tempArr;
              _tempArr = [];  
          })
      }
      //

    }


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



}


