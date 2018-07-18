"use strict"
export default  class  CommonRest{
	constructor() {
    }
}
CommonRest.restUrl={
	"DemoURL_1":process.env.BASE_URL+"json.action",/****express demo json****/

}
CommonRest.UA = navigator.userAgent.toLowerCase();

CommonRest.browser = {
	"isWeixin":/micromessenger/ig.test(CommonRest.UA) ,
	"isIOS":!!CommonRest.UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/ig) ,
	"isAndroid":/Android/ig.test(CommonRest.UA) || /linux/ig.test(CommonRest.UA) ,
	"isQQ":/\sQQ/ig.test(CommonRest.UA) ,
}








