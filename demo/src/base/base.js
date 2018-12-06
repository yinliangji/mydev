export function getUrlParam(key){
	let query = window.location.href.split("?");
	if(!query[1]){return null};
	let reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)","i");
	let r = query[1].match(reg);
	if(r != null){
		return unescape(r[2])
	}else{
		return null;
	}
}
export function _findItem(list,key,value){
	return list.find(item => item[key] == value);
}
export function _findIndex(list,key,value){
	return list.findIndex(item => item[key] == value);
}