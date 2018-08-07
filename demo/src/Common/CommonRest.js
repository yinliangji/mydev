"use strict"
export default  class  CommonRest{
	constructor() {
    }
}
CommonRest.restUrl={
	"DemoURL_1":process.env.BASE_URL+"/json.action",/****express demo json****/
	"projectAll":process.env.BASE_URL+"/project/all",/****express 敏捷项目列表 get****/
	"projectAdd":process.env.BASE_URL+"/project/add",/****express 敏捷项目添加 post****/


}
CommonRest.UA = navigator.userAgent.toLowerCase();

CommonRest.browser = {
	"isWeixin":/micromessenger/ig.test(CommonRest.UA) ,
	"isIOS":!!CommonRest.UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/ig) ,
	"isAndroid":/Android/ig.test(CommonRest.UA) || /linux/ig.test(CommonRest.UA) ,
	"isQQ":/\sQQ/ig.test(CommonRest.UA) ,
}








