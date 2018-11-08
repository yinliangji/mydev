"use strict"
import CommonRestqhc from './CommonRestqhc';
//export default class CommonRest extends CommonRestqhc
export default class CommonRest {
    constructor() {
    	//super()
    }
}

CommonRest.restUrl = {
    "DemoURL_1": process.env.BASE_URL + "/json.action",
    /****express demo json****/

    "projectAll": process.env.BASE_URL + "/project/all",
    /****express 敏捷项目列表 get****/

    "projectAdd": process.env.BASE_URL + "/project/add",
    /****express 敏捷项目添加 post****/

    "projectDetail": process.env.BASE_URL + "/project/detail/",
    /****express 敏捷项目添加 post****/

    "projectAllgroup": process.env.BASE_URL + "/project/allgroup/",
    /****express 敏捷项目添加总体组 get****/

    "projectManagerGroup": process.env.BASE_URL + "/project/managerGroup/",
    /****express 敏捷项目添加项目经理 get****/

    "projectDeveloperGroup": process.env.BASE_URL + "/project/developerGroup/",
    /****express 敏捷项目添加开发组 get****/

    "projectTesterGroup": process.env.BASE_URL + "/project/testerGroup/",
    /****express 敏捷项目添加测试组 get****/

    "projectDelete": process.env.BASE_URL + "/project/delete/",
    /****express 敏捷项目添加测试组 post****/

    "projectEdit": process.env.BASE_URL + "/project/edit/",
    /****express 敏捷项目编辑 post****/

    "projectGetProd": process.env.BASE_URL + "/get_prod/",
    /****express 敏捷项目获取所属产品 get****/

    "projectAddGroup": process.env.SUB_BASE_URL + "/agile/getUsers/",
    /****express 敏捷项目添加角色人员 get****/

    "addTeam": process.env.SUB_BASE_URL + "/agile/getRoles/",
    /****express 敏捷项目获取角色 get****/

    "byRole": process.env.BASE_URL + "/agile/getUsersByRole/",
    /****express 敏捷项目搜索获取角色 get****/

    "listModule": process.env.BASE_URL + "/module/listModule/",
    /****express 敏捷项目获取模块 get****/

    "publishUser": process.env.BASE_URL + "/auth/publishUser/",
    /****express 敏捷项目添加获取默认角色 get****/

    "fileDownList": process.env.BASE_URL + "/uploadfiles/getuploadedfiles/",
    /****express 敏捷项目详情文件下载列表 get****/

    "fileUpload": process.env.BASE_URL + "/uploadfiles/upload_file/",
    /****express 敏捷项目详情文件上传 get****/

    "fileDelete": process.env.BASE_URL + "/uploadfiles/delete_file/",
    /****express 敏捷项目详情文件删除 get****/

    "logicSystem": process.env.BASE_URL + "/system/loglist/",
    /****express 敏捷项目逻辑子系统 get****/

    "phySystem": process.env.BASE_URL + "/system/phylist/",
    /****express 敏捷项目物理子系统 get****/

    "importITM": process.env.BASE_URL + "/importITM/xxxxx/",
    /****express 敏捷项目列表ITM post****/

    "getITMtable": process.env.BASE_URL + "/getITMtable/xxxxx/",
    /****express 敏捷项目列表ITM post****/

    "importITM2": process.env.BASE_URL + "/importITM/xxxxx/",
    /****express 敏捷项目列表ITM post****/



    /*****************************************/

    "storyAll": process.env.BASE_URL + "/userstory/listUserstory/",
    /****express 用户故事列表 get****/

    "storyAdd": process.env.BASE_URL + "/userstory/addUserstory/",
    /****express 用户故事列表 post****/

    "storyEdit": process.env.BASE_URL + "/userstory/modifyUserstory/",
    /****express 用户故事列表 post****/

    "storyGetSprint": process.env.BASE_URL + "/sprint/getSprintsByPrj/",
    /****express 用户故事获取迭代列表 get****/

    "storyGetKanBan": process.env.BASE_URL + "/userstory/getUserStoryKanBan/",
    /****express 用户故事获取迭代列表 get****/

    "storyGetDetail": process.env.BASE_URL + "/userstory/getUserStoryDetail/",
    /****express 用户故事获取详情列表 get****/

    "storyGetReq": process.env.BASE_URL + "/getReq_fromPrj/",
    /****express 用户故事获取需求列表 get****/

    "storyGetCondition": process.env.BASE_URL + "/userstory/getUserstoryCondition/",
    /****express 用户故事查询获取 get****/

    "storySetChange": process.env.BASE_URL + "/userstory/changeUserstoryStatus/",
    /****express 用户故事看板拖动 get****/

    "getDefSpring": process.env.BASE_URL + "/userstory/getDefaultSpringIdByPrj/",
    /****express 用户故事当前迭代 get****/

    "getMissionChange": process.env.BASE_URL + "/userstoryEvo/list/",
    /****express 用户故事当前迭代 get****/

    "userstoryAddGroup": process.env.BASE_URL + "/agile/search_busfunc/",
    /****express 添加用户故事添加已有业务功能 get****/

    "userstoryGetDetail": process.env.BASE_URL + "/agile/detail/",
    /****express 用户故事获取已有业务功能详情 get****/

    "userstoryGetBfunc_type": process.env.BASE_URL + "/userstoryGetBfunc_type/xxxxxxxxxx/",
    /****express 用户故事获取业务类型类型 get****/

    "userstoryGetLogic_sys_no": process.env.BASE_URL + "/userstoryGetLogic_sys_no/xxxxxxxxxx/",
    /****express 用户故事获取业务类型 get****/

    "userstoryGetReturnbfunc": process.env.BASE_URL + "/userstory/returnbfunc/",
    /****express 用户故事获取业务类型-编辑用 get****/

    "userstoryGetBus": process.env.BASE_URL + "/agile/get_bfunc_by_prj_req/",
    /****express 用户故事详情获取业务 get****/

    "userstoryAddBus": process.env.BASE_URL + "/agile/search_busfunc2/",
    /****express 添加用户故事添加已有业务功能2 get****/

    "userstoryRelative": process.env.BASE_URL + "/agile/relative_userstory/",
    /****express 添加用户故事详情已有业务功能保存 post****/

    "userstoryListBusfunc": process.env.BASE_URL + "/agile/list_busfunc2/",
    /****express 添加用户故事详情已有业务功能获取 get****/

    "userstoryedit_bfunc2": process.env.BASE_URL + "/agile/edit_bfunc2/",
    /****express 添加用户故事详情编辑页业务功能获取 get****/

    "userstoryadd_bfunc1": process.env.BASE_URL + "/agile/add_bfunc1/",
    /****express 添加用户业务功能新建第一步获取 post****/

    "userstoryadd_bfunc2": process.env.BASE_URL + "/agile/add_bfunc2/",
    /****express 添加用户业务功能新建第二步获取 post****/


    



    /*****************************************/

    "getPermission": process.env.BASE_URL + "/auth/getPermissionfromUser/",
    /****express 权限获取 get****/

    "quillEditorAdd": process.env.BASE_URL + "/uploadfiles/add/",
    /****express 富文本编辑框添加 post****/

    "quillEditorGet": process.env.BASE_URL + "/uploadfiles/detail/",
    /****express 富文本编辑框获取 get****/

    /*****************************************/


    "reqAll": process.env.BASE_URL + "/req/queryReq/",
    /****express 需求项目列表 get****/

    "reqAdd": process.env.BASE_URL + "/req/addReq/",
    /****express 需求项目列表 get****/

    "reqGet": process.env.BASE_URL + "/req/getReq/",
    /****express 需求项目列表 get****/

    "reqDelect": process.env.BASE_URL + "/req/deleteReq/",
    /****express 需求项目列表 get****/




}
Object.setPrototypeOf(CommonRest.restUrl,CommonRestqhc.restUrl);

CommonRest.UA = navigator.userAgent.toLowerCase();
CommonRest.browser = {
    "isWeixin": /micromessenger/ig.test(CommonRest.UA),
    "isIOS": !!CommonRest.UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/ig),
    "isAndroid": /Android/ig.test(CommonRest.UA) || /linux/ig.test(CommonRest.UA),
    "isQQ": /\sQQ/ig.test(CommonRest.UA),
}