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
}


