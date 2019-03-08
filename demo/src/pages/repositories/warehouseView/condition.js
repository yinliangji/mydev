module.exports =  {
  getSerachCondition(_Common,that,name,val){
    if(_Common.GetSession(name)){
        let _Session = JSON.parse(_Common.GetSession(name));
        if(name == "downvalueSerch" || name == "activevalueSerch"){
          let {start_time,end_time} = _Session;
          that.formValidate.start_time = start_time ? new Date(start_time) : "";
          that.formValidate.end_time = end_time ? new Date(end_time) : "";
        }else if(name == "userlistSerch"){
          let {start_time,tableDAtaPageCurrent} = _Session;
          that.formValidate.start_time = val ? new Date(val) : (start_time ? new Date(start_time) : "");
          that.tableDAtaPageCurrent = !val ? tableDAtaPageCurrent : 1;
        }else if(name == "iplistSearch"){
          let {ipaddress,tableDAtaPageCurrent} = _Session;
          that.formValidate.ipaddress = val ? val :(ipaddress ? ipaddress : "");
          that.tableDAtaPageCurrent = !val ? tableDAtaPageCurrent : 1;
        }else{}
        _Common.RemoveSession(name);
    }else{
      if(name == "userlistSerch"){
          that.formValidate.start_time = val ? new Date(val) : "";
        }else if(name == "iplistSearch"){
          that.formValidate.ipaddress = val ? val :"";
        }else{}
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
    _Common.RemoveSession("iplistSearch");

  },
  

}


