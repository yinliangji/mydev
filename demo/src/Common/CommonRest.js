"use strict"
export default  class  CommonRest{
	constructor() {
    }
}
CommonRest.restUrl={
	"DemoURL_1":process.env.BASE_URL+"/json.action",/****express demo json****/
	"projectAll":process.env.BASE_URL+"/project/all",/****express 敏捷项目列表 get****/
	"projectAdd":process.env.BASE_URL+"/project/add",/****express 敏捷项目添加 post****/
	"projectDetail":process.env.BASE_URL+"/project/detail/",/****express 敏捷项目添加 post****/
	"projectAllgroup":process.env.BASE_URL+"/project/allgroup/",/****express 敏捷项目添加总体组 get****/
	"projectManagerGroup":process.env.BASE_URL+"/project/managerGroup/",/****express 敏捷项目添加项目经理 get****/
	"projectDeveloperGroup":process.env.BASE_URL+"/project/developerGroup/",/****express 敏捷项目添加开发组 get****/
	"projectTesterGroup":process.env.BASE_URL+"/project/testerGroup/",/****express 敏捷项目添加测试组 get****/
	"projectDelete":process.env.BASE_URL+"/project/delete/",/****express 敏捷项目添加测试组 post****/
}
CommonRest.UA = navigator.userAgent.toLowerCase();

CommonRest.browser = {
	"isWeixin":/micromessenger/ig.test(CommonRest.UA) ,
	"isIOS":!!CommonRest.UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/ig) ,
	"isAndroid":/Android/ig.test(CommonRest.UA) || /linux/ig.test(CommonRest.UA) ,
	"isQQ":/\sQQ/ig.test(CommonRest.UA) ,
}








