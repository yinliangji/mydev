"use strict"
import CommonRestinfReq from './CommonRestinfReq';
export default class CommonRestqhc {
    constructor() {}
}
CommonRestqhc.restUrl = {

    "projectListDataNew": process.env.BASE_URL + "/project/queryPrj_fromUser/", //下拉菜单列表get
    // qhc迭代
    "iterationList": process.env.BASE_URL + "/sprint/listSprint", //迭代列表get
    "iterationAdd": process.env.BASE_URL + "/sprint/addSprint", //添加迭代post
    "iterationEdit": process.env.BASE_URL + "/sprint/editSprint", //编辑迭代post
    "iterationDel": process.env.BASE_URL + "/sprint/delSprint", //编辑迭代post
    "iterationDetail": process.env.BASE_URL + "/sprint/detailSprint", //get 没用
    "projectListData": process.env.BASE_URL + "/get_prj", //get
    "downFile":process.env.BASE_URL,
    "selbusinessList": process.env.BASE_URL + "/agile/selectBusFuncStatus", //get 
    //开发任务
    //qhc end

}
Object.setPrototypeOf(CommonRestqhc.restUrl,CommonRestinfReq.restUrl);
