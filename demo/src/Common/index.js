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
}
