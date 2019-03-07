module.exports =  {
  getSerachCondition(_Common,that,name){
    if(_Common.GetSession(name)){
        let _Session = JSON.parse(_Common.GetSession(name));
        if(name == "downvalueSerch" || name == "activevalueSerch"){
          let {start_time,end_time} = _Session;
          that.formValidate.start_time = start_time ? new Date(start_time) : "";
          that.formValidate.end_time = end_time ? new Date(end_time) : "";
        }else if(name == "userlistSerch"){
          let {start_time,tableDAtaPageCurrent} = _Session;
          that.formValidate.start_time = start_time ? new Date(start_time) : "";
          that.tableDAtaPageCurrent = tableDAtaPageCurrent;
        }else{
          
          
        }
        _Common.RemoveSession(name);
    }
  },
  serachCondition(_Common,that,jsonObj,val,name){
    let _val = jsonObj.parse(jsonObj.stringify(val));
    if(that.tableDAtaPageCurrent){
      _val.tableDAtaPageCurrent = that.tableDAtaPageCurrent;
    }
    _Common.RemoveSession(name);
    _Common.SetSession(name,jsonObj.stringify(_val));
    
  },
  optionSession(_Common){
    _Common.RemoveSession("downvalueSerch");
    _Common.RemoveSession("activevalueSerch");
    _Common.RemoveSession("userlistSerch");

  },
  

}


