"use strict"
export default class CommonRest {
    constructor() {
    }
    static Multiple(arr,list) {
    	//console.log("====Multiple====");
    	let _arr = [];
		let _obj = {};
		for(let i=0;i<arr.length;i++){
		    list.forEach((item=>{
		        if(arr[i] == item.value){
		            _obj.org_id = item.org_id;
		            _obj.org_name = item.org_name;
		            //_obj.org_sn = item.org_sn;
		            _arr.push(_obj);
		            _obj = {};   
		        }
		    }))
		}
		return JSON.stringify(_arr);
    }
    static single(val,list){
    	//console.log("====single====");
    	let _arr = [];
        let _obj = {};
        list.forEach((item=>{
            if(val == item.value){
                _obj.org_id = item.org_id;
                _obj.org_name = item.org_name;
                //_obj.org_sn = item.org_sn;
                _arr.push(_obj);
                _obj = {};   
            }
        }))
        return JSON.stringify(_arr);  
	}
}