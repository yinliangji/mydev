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
    /**** demo json****/

    "projectAll": process.env.BASE_URL + "/project/all",
    /**** 敏捷项目列表 get****/

    "projectAdd": process.env.BASE_URL + "/project/add",
    /**** 敏捷项目添加 post****/

    "projectDetail": process.env.BASE_URL + "/project/detail/",
    /**** 敏捷项目详情获取 get****/

    "projectOtherDetail": process.env.BASE_URL + "/project/getOtherDetail/",
    /**** 敏捷项目其他信息详情获取 get****/

    "proByUser": process.env.BASE_URL + "/project/proByUser/",
    /**** 敏捷项目详情获取主键ID数组 get****/


    "projectAllgroup": process.env.BASE_URL + "/project/allgroup/",
    /**** 敏捷项目添加总体组 get****/

    "projectManagerGroup": process.env.BASE_URL + "/project/managerGroup/",
    /**** 敏捷项目添加项目经理 get****/

    "projectDeveloperGroup": process.env.BASE_URL + "/project/developerGroup/",
    /**** 敏捷项目添加开发组 get****/

    "projectTesterGroup": process.env.BASE_URL + "/project/testerGroup/",
    /**** 敏捷项目添加测试组 get****/

    "projectDelete": process.env.BASE_URL + "/project/delete/",
    /**** 敏捷项目添加测试组 post****/

    "projectEdit": process.env.BASE_URL + "/project/edit/",
    /**** 敏捷项目编辑 post****/

    "projectGetProd": process.env.BASE_URL + "/get_prod/",
    /**** 敏捷项目获取所属产品 get****/

    "projectAddGroup": process.env.BASE_URL + "/agile/getUsers/",
    /**** 敏捷项目添加角色人员 get SUB_BASE_URL****/

    "addTeam": process.env.BASE_URL + "/agile/getRoles/",
    /**** 敏捷项目获取角色 get SUB_BASE_URL****/

    "byRole": process.env.BASE_URL + "/agile/getUsersByRole/",
    /**** 敏捷项目搜索获取角色 get****/

    "listModule": process.env.BASE_URL + "/module/listModule/",
    /**** 敏捷项目获取模块 get****/

    "publishUser": process.env.BASE_URL + "/auth/publishUser/",
    /**** 敏捷项目添加获取默认角色 get****/

    "fileDownList": process.env.BASE_URL + "/uploadfiles/getuploadedfiles/",
    /**** 敏捷项目详情文件下载列表 get****/

    //"fileUpload":process.env.BASE_URL + "/uploadfiles/upload_file/",
    //"fileUpload":process.env.BASE_ZUUL_URL + "/uploadfiles/upload_file/",
    //"fileUpload":addZUUL(process.env.BASE_ZUUL_URL + "/uploadfiles/upload_file/") ,
    "fileUpload":addZUUL(process.env.BASE_URL + "/uploadfiles/upload_file/"),
    /**** 敏捷项目详情文件上传 get****/

    "fileDelete": process.env.BASE_URL + "/uploadfiles/delete_file/",
    /**** 敏捷项目详情文件删除 get****/

    "logicSystem": process.env.BASE_URL + "/system/loglist/",
    /**** 敏捷项目逻辑子系统 get****/

    "phySystem": process.env.BASE_URL + "/system/phylist/",
    /**** 敏捷项目物理子系统 get****/

    "importITMyes": process.env.BASE_URL + "/prj/update_submit/",
    /**** 敏捷项目列表ITM post****/
    "importITMno": process.env.BASE_URL + "/prj/sync_submit/",
    /**** 敏捷项目列表ITM post****/

    "getITMtable": process.env.BASE_URL + "/prj/sync_check/",
    /**** 敏捷项目列表ITM get****/

    "syncSearch": process.env.BASE_URL + "/prj/sync_search/",
    /**** 敏捷项目添加ITM get ****/

    "projectOutputExecl": process.env.BASE_URL + "/designer/application_erro/",
    /**** 敏捷项目导出Execl get ****/

    "projectOutputWord": process.env.BASE_URL + "/designer/project_id/",
    /**** 敏捷项目导出word get ****/

    "projectCondition": process.env.BASE_URL + "/project/condition/",
    /**** 敏捷项目获取部门、项目类型 get****/

    "getProjectMember": process.env.BASE_URL + "/project/list_role_user/",
    /**** 敏捷项目角色获取 get****/

    "addProjectRole": process.env.BASE_URL + "/project/add_role/",
    /**** 敏捷项目角色添加 post****/

    "delProjectRole": process.env.BASE_URL + "/project/del_role/",
    /**** 敏捷项目角色删除 post****/

    "delProjectUser": process.env.BASE_URL + "/project/del_user/",
    /**** 敏捷项目角色人员删除 post****/

    "addProjectUser": process.env.BASE_URL + "/project/add_user/",
    /**** 敏捷项目角色人员删除 post****/

    "Switch": process.env.BASE_URL + "/project/switch/",
    /**** 敏捷项目转立项 post****/

    "findItm": process.env.BASE_URL + "/findItm/",
    /**** 敏捷项目转立项搜索 post****/

    "projectOutExcel": process.env.BASE_URL + "/agile/prj/export/",
    /**** 敏捷项目列表查询结果导出excel get****/



    /*****************************************/

    "storyAll": process.env.BASE_URL + "/userstory/listUserstory/",
    /**** 用户故事列表 get****/

    "storyAdd": process.env.BASE_URL + "/userstory/addUserstory/",
    /**** 用户故事列表 post****/
    "storyAddGet": process.env.BASE_URL + "/userstory/get_select_info/",
    /**** 添加用户故事获取下拉菜单 get****/
    

    "storyEdit": process.env.BASE_URL + "/userstory/modifyUserstory/",
    /**** 用户故事列表 post****/

    "storyGetSprint": process.env.BASE_URL + "/sprint/getSprintsByPrj/",
    /**** 用户故事获取迭代列表 get****/

    "storyGetKanBan": process.env.BASE_URL + "/userstory/getUserStoryKanBan/",
    /**** 用户故事获取迭代列表 get****/

    "storyGetDetail": process.env.BASE_URL + "/userstory/getUserStoryDetail/",
    /**** 用户故事获取详情列表 get****/

    "storyGetReq": process.env.BASE_URL + "/getReq_fromPrj/",
    /**** 用户故事获取需求列表 get****/

    "storyGetCondition": process.env.BASE_URL + "/userstory/getUserstoryCondition/",
    /**** 用户故事查询下拉获取 get****/

    "modifyCondition": process.env.BASE_URL + "/userstory/modifyCondition/",
    /**** 用户故事添加编辑下拉获取 get****/

    "storySetChange": process.env.BASE_URL + "/userstory/changeUserstoryStatus/",
    /**** 用户故事看板拖动 get****/

    "getDefSpring": process.env.BASE_URL + "/userstory/getDefaultSpringIdByPrj/",
    /**** 用户故事当前迭代 get****/

    //"getMissionChange": process.env.BASE_URL + "/userstoryEvo/list/",
    /**** 用户故事当前迭代 get****/

    "getMissionChange": process.env.BASE_URL + "/userstoryEvo/Newlist/",
    /**** 用户故事当前迭代 get****/

    "userstoryAddGroup": process.env.BASE_URL + "/agile/search_busfunc/",
    /**** 添加用户故事添加已有业务功能 get****/

    "userstoryGetDetail": process.env.BASE_URL + "/agile/detail/",
    /**** 用户故事获取已有业务功能详情 get****/

    "userstoryGetBfunc_type": process.env.BASE_URL + "/userstoryGetBfunc_type/xxxxxxxxxx/",
    /**** 用户故事获取业务类型类型 get****/

    "userstoryGetLogic_sys_no": process.env.BASE_URL + "/userstoryGetLogic_sys_no/xxxxxxxxxx/",
    /**** 用户故事获取业务类型 get****/

    "userstoryGetReturnbfunc": process.env.BASE_URL + "/userstory/returnbfunc/",
    /**** 用户故事获取业务类型-编辑用 get****/

    "userstoryGetBus": process.env.BASE_URL + "/agile/get_bfunc_by_prj_req/",
    /**** 用户故事详情获取业务 get****/

    "userstoryAddBus": process.env.BASE_URL + "/agile/search_busfunc2/",
    /**** 添加用户故事添加已有业务功能2 get****/

    "userstoryRelative": process.env.BASE_URL + "/agile/relative_userstory/",
    /**** 添加用户故事详情已有业务功能保存 post****/

    "userstoryListBusfunc": process.env.BASE_URL + "/agile/list_busfunc2/",
    /**** 添加用户故事详情已有业务功能获取 get****/

    "userstoryedit_bfunc2": process.env.BASE_URL + "/agile/edit_bfunc2/",
    /**** 添加用户故事详情编辑页业务功能获取 get****/

    "userstoryadd_bfunc1": process.env.BASE_URL + "/agile/add_bfunc1/",
    /**** 添加用户业务功能新建第一步获取 post****/

    "userstoryadd_bfunc2": process.env.BASE_URL + "/agile/add_bfunc2/",
    /**** 添加用户业务功能新建第二步获取 post****/

    //"userstoryUploadFile":process.env.BASE_URL + "/agile/uploadFile",
    //"userstoryUploadFile":process.env.BASE_ZUUL_URL + "/agile/uploadFile",
    //"userstoryUploadFile":addZUUL(process.env.BASE_ZUUL_URL + "/agile/uploadFile") ,
    "userstoryUploadFile":addZUUL(process.env.BASE_URL + "/agile/uploadFile"),
    /**** 添加用户业务功能上传文件 get****/

    "userstorydelete": process.env.BASE_URL + "/agile/delete_bfunc3/",
    /**** 用户业务功能删除文件 post****/

    "userstoryFilesList": process.env.BASE_URL + "/agile/getuploadedfiles/",
    /**** 用户业务功能附件文件列表 get****/

    "userstoryDeleteFile": process.env.BASE_URL + "/agile/deleteFile/",
    /**** 用户业务功能删除文件列表 post****/

    "userstoryDeleteList": process.env.BASE_URL + "/userstory/deleteUserstory/",
    /**** 用户故事列表删除 get****/

    "userstoryOutExcel": process.env.BASE_URL + "/agile/us/export/",
    //"userstoryOutExcel": process.env.BASE_URL + "/exportExcelFile/usDetailExp/",
    /**** 用户故事导出excel get****/

    "userstoryOutWord": process.env.BASE_URL + "/exportExcelFile/usBfuncExp/",
    /**** 用户故事导出word get****/

    "importUs": process.env.BASE_URL + "/agile/import_us/",
    /**** 用户故事批量导入 post****/

    "downloadTemplate": process.env.BASE_URL + "/agile/download_template/",
    /**** 用户故事模板 get****/




    /*****************************************/

    "getPermission": process.env.BASE_URL + "/auth/getPermissionfromUser/",
    /**** 权限获取 get****/

    "quillEditorAdd": process.env.BASE_URL + "/uploadfiles/add/",
    /**** 富文本编辑框添加 post****/

    "quillEditorGet": process.env.BASE_URL + "/uploadfiles/detail/",
    /**** 富文本编辑框获取 get****/

    /*****************************************/


    "reqAll": process.env.BASE_URL + "/req/queryReq/",
    /**** 需求项目列表 get****/

    "reqAdd": process.env.BASE_URL + "/req/addReq/",
    /**** 需求项目列表 get****/

    "reqEdit": process.env.BASE_URL + "/req/updateReq/",
    /**** 需求项目列表 get****/

    "reqGet": process.env.BASE_URL + "/req/getReq/",
    /**** 需求项目列表 get****/

    "reqDelect": process.env.BASE_URL + "/req/deleteReq/",
    /**** 需求项目列表 get****/

    "importITM2": process.env.BASE_URL + "/req/save_req_list/",
    /**** 需求项目列表ITM post****/

    "getCountITM": process.env.BASE_URL + "/req/get_count/",
    /**** 需求项目列表 get****/

    "addBusfuncQueryCombox": process.env.BASE_URL + "/agile/addBusfuncQueryCombox/",
    /**** 需求项目添加--所属逻辑子系统 get****/

    "getRequirementKanBan": process.env.BASE_URL + "/req/getRequirementKanBan/",
    /**** 需求项目添加--所属逻辑子系统 get****/

    "reqSetChange": process.env.BASE_URL + "/req/setRequirementFinish/",
    /**** 需求项目看板拖动 get****/

    "getReqDepd": process.env.BASE_URL + "/req/getReqDepd/",
    /**** 需求项目获取依赖项 get****/

    "DetailReq": process.env.BASE_URL + "/req/DetailReq/",
    /**** 需求项目详情 get****/

    "getPrjTime": process.env.BASE_URL + "/req/prj_time/",
    /**** 需求项目详情 get****/

    "getRequirementStatList": process.env.BASE_URL + "/req/getRequirementStatList/",
    /**** 需求项目获取状态 get****/

    "reqOutExcel": process.env.BASE_URL + "/agile/req/export/",
    /**** 需求项导出excel get****/

    "importReq": process.env.BASE_URL + "/agile/import_req/",
    /**** 需求项批量导入 post****/

    /*****************************************/

    "getUserByProjId": process.env.BASE_URL + "/agile/getUserByProjId/",
    /**** 项目设置获取人员 get****/
    
    "addGroupUsers": process.env.BASE_URL + "/agile/groupmemagement/add_group_users/",
    /**** 项目设置添加分组 post****/

    "addUsers": process.env.BASE_URL + "/agile/groupmemagement/add_user/",
    /**** 项目设置添加人员 post****/

    "deleteMember": process.env.BASE_URL + "/agile/groupmemagement/delete_member/",
    /**** 项目设置删除人员 get****/

    "deleteGroup": process.env.BASE_URL + "/agile/groupmemagement/delete_group/",
    /**** 项目设置删除人员 get****/

    "listGroup": process.env.BASE_URL + "/agile/groupmemagement/list/",
    /**** 项目设置删除人员 post****/

    "deleteGroupLeader": process.env.BASE_URL + "/agile/groupmemagement/delete_group_leader/",
    /**** 项目设置删除组长 get****/

    "addGroupLeader": process.env.BASE_URL + "/agile/groupmemagement/add_leader/",
    /**** 项目设置添加分组 post****/


    /*****************************************/

    "queryPublicRep": process.env.BASE_URL + "/maven/queryPublicRep/",
    /**** Maven公共仓库 get****/

    "getDayDownCount": process.env.BASE_URL + "/maven/getDayDownCount/",
    /**** Maven仓库概览每日下载量 get****/

    "getDayActiveUserDownCount": process.env.BASE_URL + "/maven/getDayActiveUserCount/",
    /**** Maven仓库概览每日活跃用户下载量 get****/

    "getDayActiveUserList": process.env.BASE_URL + "/maven/getDayActiveUserList/",
    /**** Maven仓库概览活跃用户列表 get****/

    "queryUserRecordsByIp": process.env.BASE_URL + "/maven/queryUserRecordsByIp/",
    /**** Maven仓库概览根据ip搜索使用记录 get****/

    "getDownTopGroupByIp": process.env.BASE_URL + "/maven/getDownTopGroupByIp/",
    /**** Maven仓库概览下载排行榜 get****/

    "searchJarByKey": process.env.BASE_URL + "/maven/searchJarByKey/",
    /**** Maven制品搜索 post****/

    "searchJarByGav": process.env.BASE_URL + "/maven/searchJarByGav/",
    /**** Maven制品搜索 post****/

    "getAllRepId": process.env.BASE_URL + "/maven/getAllRepId/",
    /**** Maven制品搜索获取仓库repid get****/
    "queryJarDetailByGav": process.env.BASE_URL + "/maven/queryJarDetailByGav/",
    /**** Maven制品搜索获取详情 post****/

    /*****************************************/

    "getLMenu":rep_mp_e(process.env.BASE_URL + "/menu/getLeftMenu/"),
    /**** 获取左侧菜单列表 post****/
    "fileView":"http://128.196.0.124:8080/office/preview2?objNm=",
    /**** 文件预览****/
}

Object.setPrototypeOf(CommonRest.restUrl,CommonRestqhc.restUrl);

CommonRest.UA = navigator.userAgent.toLowerCase();
CommonRest.browser = {
    "isWeixin": /micromessenger/ig.test(CommonRest.UA),
    "isIOS": !!CommonRest.UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/ig),
    "isAndroid": /Android/ig.test(CommonRest.UA) || /linux/ig.test(CommonRest.UA),
    "isQQ": /\sQQ/ig.test(CommonRest.UA),
}

function addZUUL(val){
    if(val.indexOf("127.0.0.1:9090") != -1 || val.indexOf("127.0.0.1:8000") != -1){
        return val
    }else if(val.indexOf("/zuul/") != -1){
        return val
    }else if(val.indexOf("/ag_e") != -1){
        return val.replace("/ag_e",process.env.BASE_ZUUL_URL)
    }else{
       return val 
    }
}

function rep_mp_e(val){
    let _hostname = window.location.hostname;
    let _port = window.location.port;
    let _href = window.location.href;
    if(_href.indexOf("127.0.0.1") != -1){
        return "//128.196.96.210:8000"+"/mp_e/menu/getLeftMenu/"
    }else if(_href.indexOf("128.196.0.127") != -1){
        return "//128.196.0.127:8000"+"/mp_e/menu/getLeftMenu/"
    }else{
        return "//"+_hostname+":"+_port+"/mp_e/menu/getLeftMenu/"
    }
}
/*
if(_href.indexOf("128.196.0.127") != -1){
        return "//128.196.0.127:8000"+"/mp_e/menu/getLeftMenu/"
    }else 
 */

