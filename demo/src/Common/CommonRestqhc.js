"use strict"
export default class CommonRestqhc {
    constructor() {}
}
CommonRestqhc.restUrl = {

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
