"use strict"
export default class CommonRest {
    constructor() {}
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
    /****express 敏捷项目添加角色 get****/

    "addTeam": process.env.SUB_BASE_URL + "/agile/getRoles/",
    /****express 敏捷项目获取角色 get****/

    "byRole": process.env.SUB_BASE_URL + "/agile/getUsersByRole/",
    /****express 敏捷项目获取角色 get****/


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

    



    



    // qhc迭代
    "iterationList": process.env.BASE_URL + "/sprint/listSprint", //迭代列表get
    "iterationAdd": process.env.BASE_URL + "/sprint/addSprint", //添加迭代post
    "iterationEdit": process.env.BASE_URL + "/sprint/editSprint", //编辑迭代post
    "iterationDel": process.env.BASE_URL + "/sprint/delSprint", //编辑迭代post
    "iterationDetail": process.env.BASE_URL + "/sprint/detailSprint", //get 没用
    "projectListData": process.env.BASE_URL + "/get_prj", //get
    //开发任务
    //qhc end

}
CommonRest.UA = navigator.userAgent.toLowerCase();

CommonRest.browser = {
    "isWeixin": /micromessenger/ig.test(CommonRest.UA),
    "isIOS": !!CommonRest.UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/ig),
    "isAndroid": /Android/ig.test(CommonRest.UA) || /linux/ig.test(CommonRest.UA),
    "isQQ": /\sQQ/ig.test(CommonRest.UA),
}