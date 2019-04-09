import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../pages/home'
import Store from '@/vuex/store'
import Common from '@/Common';
Vue.use(Router)
const router = new Router({
    mode: 'hash', //'history',
    routes: [{
            path: '/',
            redirect: '/agile',
        },
        // {
        //     path: '/home',
        //     name: 'Home',
        //     components: {
        //         Cont: resolve => {
        //             require(["../pages/home"], resolve)
        //         }
        //     },
        // },
        // {
        //     path: '/home/list',
        //     name: 'List',
        //     components: {
        //         Cont: resolve => {
        //             require(["../pages/home/list/"], resolve)
        //         }
        //     },
        // },
        {
            path: '/agile',
            name: 'Agile',
            components: {
                Cont: resolve => {
                    require(["../pages/agile/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_1"], resolve)
                }
            },
        },
        {
            path: '/agile/add',
            name: 'AgileAdd',
            components: {
                Cont: resolve => {
                    require(["../pages/agile/add/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_1"], resolve)
                }
            },
        },
        {
            path: '/agile/edit',
            name: 'AgileEdit',
            components: {
                Cont: resolve => {
                    require(["../pages/agile/edit/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_1"], resolve)
                }
            },
        },
        {
            path: '/userAdvice',
            name: 'userAdvice',
            components: {
                Cont: resolve => {
                    require(["../pages/userAdvice/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_1"], resolve)
                }
            },
        },
        {
            path: '/dependManage',
            name: 'dependManage',
            components: {
                Cont: resolve => {
                    require(["../pages/dependManage/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }
            },
        },
        //
        {
            path: '/agile/detail',
            name: 'AgileDetail',
            components: {
                Cont: resolve => {
                    require(["../pages/agile/detail/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }
            },
        },
        {
            path: '/agile/baseinfo',
            name: 'Agilebaseinfo',
            components: {
                Cont: resolve => {
                    require(["../pages/agile/baseinfo/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }
            },
        },
        //
        {
            path: '/demand',
            name: 'Demand',
            components: {
                Cont: resolve => {
                    require(["../pages/demand/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }
            },
        },
        {
            path: '/demand/detail',
            name: 'demandDetail',
            components: {
                Cont: resolve => {
                    require(["../pages/demand/detail/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }
            },
        },

        //
        {
            path: '/demand/business',
            name: 'DemandBusiness',
            components: {
                Cont: resolve => {
                    require(["../pages/demand/business"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }
            },
        },
        //
        {
            path: '/product/business/add',
            name: 'ProductBusinessAdd',
            components: {
                Cont: resolve => {
                    require(["../pages/demand/business/add/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }
            },
        },
        {
            path: '/product/business/edit',
            name: 'ProductBusinessEdit',
            components: {
                Cont: resolve => {
                    require(["../pages/demand/business/edit/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }
            },
        },
        {
            path: '/product/business/view',
            name: 'ProductBusinessView',
            components: {
                Cont: resolve => {
                    require(["../pages/demand/business/view/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }
            },
        },
        //

        {
            path: '/demand/list',
            name: 'Demand_list',
            components: {
                Cont: resolve => {
                    require(["../pages/demand/list/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }
            },
        },
        {
            path: '/product',
            name: 'Product',
            components: {
                Cont: resolve => {
                    require(["../pages/product/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }

            },
        },
        {
            path: '/product/add',
            name: 'ProductAdd',
            components: {
                Cont: resolve => {
                    require(["../pages/product/add/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }

            },
        },
        {
            path: '/product/edit',
            name: 'ProductEdit',
            components: {
                Cont: resolve => {
                    require(["../pages/product/edit/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }

            },
        },
        {
            path: '/product/detail',
            name: 'ProductDetail',
            components: {
                Cont: resolve => {
                    require(["../pages/product/detail/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }
            },
        },
        {
            path: '/product/baseinfo',
            name: 'Productbaseinfo',
            components: {
                Cont: resolve => {
                    require(["../pages/product/baseinfo/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }
            },
        },
        {
            path: '/iteration',
            name: 'Iteration',
            components: {
                Cont: resolve => {
                    require(["../pages/iteration/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }

            },
        },
        {
            path: '/development',
            components: {
                Cont: resolve => {
                    require(["../pages/development/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }

            },
        },
        {
            path: '/development/detail',
            components: {
                Cont: resolve => {
                    require(["../pages/development/detail"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }

            }
        },
        {
            path: '/development/add',
            components: {
                Cont: resolve => {
                    require(["../pages/development/add"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }

            }
        },
        {
            path: '/defect',
            name: 'Defect',
            components: {
                Cont: resolve => {
                    require(["../pages/defect/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }

            },
        },
        {
            path: '/overView',
            name: 'OverView',
            components: {
                Cont: resolve => {
                    require(["../pages/overView/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }

            },
        },

        {
            path: '/iteration/iteration',
            name: 'IterationTo',
            components: {
                Cont: resolve => {
                    require(["../pages/iteration/iteration"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }
            },
        },
        {
            path: '/setting',
            name: 'setting',
            components: {
                Cont: resolve => {
                    require(["../pages/setting/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }
            },
        },
        {
            path: '/dataSynchro',
            name: 'dataSynchro',
            components: {
                Cont: resolve => {
                    require(["../pages/dataSynchro/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_1"], resolve)
                }
            },
        },
        
        {
            path: '/testCaseUrl',
            name: 'testCaseUrl',
            components: {
                Cont: resolve => {
                    require(["../pages/testCaseUrl/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }
            },
        },
        {
            path: '/bugUrl',
            name: 'bugUrl',
            components: {
                Cont: resolve => {
                    require(["../pages/bugUrl/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }
            },
        },
        {
            path: '/documents',
            name: 'documents',
            components: {
                Cont: resolve => {
                    require(["../pages/documents/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }
            },
        },
        {
            path: '/demand/addEdit',
            name: 'demandAddEdit',
            components: {
                Cont: resolve => {
                    require(["../pages/demand/add_edit"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }
            },
        },


        {
            path: '/maven',
            name: 'maven',
            components: {
                Cont: resolve => {
                    require(["../pages/repositories"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_repositories"], resolve)
                }
            },
        },
        {
            path: '/maven/produceSearch',
            name: 'produceSearch',
            components: {
                Cont: resolve => {
                    require(["../pages/repositories/producesearch"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_repositories"], resolve)
                }
            },
        },
        {
            path: '/maven/warehouseView',
            name: 'warehouseView',
            components: {
                Cont: resolve => {
                    require(["../pages/repositories/warehouseView"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_repositories"], resolve)
                }
            },
        },
        {
            path: '/milestone',
            name: 'milestone',
            components: {
                Cont: resolve => {
                    require(["../pages/milestone/milestone"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_2"], resolve)
                }
            },
        },

        //以后删除开始

        {
            path: '/test',
            name: 'test',
            components: {
                Cont: resolve => {
                    require(["../pages/test/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_all"], resolve)
                }
            },
        },
        {
            path: '/test2',
            name: 'test2',
            components: {
                Cont: resolve => {
                    require(["../pages/test2/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_all"], resolve)
                }
            },
        },
        {
          path: '/page1',
          name:'Page1',
          components: {
                Cont:resolve => {require(["../pages/page1/"], resolve)},
                Aside: resolve => {require(["../layout/sider/sider_all"], resolve)},
            }
        },
        {
            path: '/page2',
            name: 'page2',
            components: {
                Cont: resolve => {
                    require(["../pages/page2/"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_all"], resolve)
                }
            },
        },
        //以后删除结束
    ]
})

router.beforeEach((to, from, next) => {

    Store.dispatch('IS_PAGELOADING/incrementAsync', {
        isShow: true,
        msg: "正在加载中……"
    })

    console.log("to=",to ,"from=", from );

    if(from.path == "/" || from.path == ""){
        
        if(to.path != "/agile/detail" && to.path != "/agile" && to.path != "/" && to.path != "/agile/add" && to.path != "/agile/edit"){
            console.log("新开窗口 和 /agile 不相关");
            
            let newToQuery = JSON.parse(JSON.stringify(to.query));

            let isNewToPrjId = newToQuery.prjId;
            let isNewToID = newToQuery.id;

            let isNewToPrjSn = newToQuery.prjSn;
            let isNewToPrj_id = newToQuery.prj_id;

            let newToID = isNewToPrjId || isNewToID;
            let newToPrjSn = isNewToPrjSn || isNewToPrj_id;

            if(isNewToPrjId && isNewToID && isNewToPrjSn && isNewToPrj_id){
                console.log("isNewToPrjId  isNewToID  isNewToPrjSn  isNewToPrj_id",isNewToPrjId , isNewToID , isNewToPrjSn , isNewToPrj_id);
                next();
                return;
            }else{
                let inCookieID =  Common.GETID(this,Common,"inCookie") || "";
                let inCookiePrjSn = Common.GETprjid(this,Common,"inCookie") || "";
                if(!inCookieID){
                    console.log("cookie没有id",isNewToPrjId , isNewToID , isNewToPrjSn , isNewToPrj_id);
                    next();
                    return;
                }

                if(!newToID){
                    newToQuery.prjId = inCookieID;
                    newToQuery.id = inCookieID;
                }else{
                    newToQuery.prjId = isNewToPrjId ? isNewToPrjId : isNewToID;
                    newToQuery.id = isNewToPrjId ? isNewToPrjId : isNewToID;
                }

                if(!newToPrjSn){
                    newToQuery.prjSn = inCookiePrjSn;
                    newToQuery.prj_id = inCookiePrjSn;
                }else{
                    newToQuery.prjSn = isNewToPrjSn ? isNewToPrjSn : isNewToPrj_id;
                    newToQuery.prj_id = isNewToPrjSn ? isNewToPrjSn : isNewToPrj_id;
                }
                console.log("设置 id prj—id 执行",to.path , newToQuery);
                next({
                    path: to.path,
                    query: newToQuery
                })
                setTimeout(()=>{
                    next();
                    console.log("next()",newToQuery,to.query)
                },500)
                

            }

        }

     }

    if(to.path == "/agile/detail" || to.path == "/agile" || to.path == "/agile/add" || to.path == "/agile/edit" || to.path == "/" || from.path == "/" ){
        console.log("不是点击进来 或者 /agile/detail 或者列表进来");
        next()
        return;
    }
    let isFromPrjId = from.query.hasOwnProperty('prjId');
    let isFromId = from.query.hasOwnProperty('id');
    let isFromPrj_id = from.query.hasOwnProperty('prj_id');
    let isFromPrjSn = from.query.hasOwnProperty('prjSn');

    let isToPrjId = to.query.hasOwnProperty('prjId');
    let isToId = to.query.hasOwnProperty('id');
    let isToPrj_id = to.query.hasOwnProperty('prj_id');
    let isToPrjSn = to.query.hasOwnProperty('prjSn');
    if(isToPrjId && isToId && isToPrj_id && isToPrjSn){
        console.log("已经有参数to")
        next()
        return;
    }

    let toQuery = JSON.parse(JSON.stringify(to.query));

    let fromID = from.query.prjId || from.query.id ||  Common.GETID(this,Common,"inCookie");
    let fromPrjSn = from.query.prjSn || from.query.prj_id || Common.GETprjid(this,Common,"inCookie");

    if(!fromID || !fromPrjSn){
        console.log("执行 没有获取到参数",to.query)
        next()
        return;
    }

    let toID = toQuery.prjId || toQuery.id;
    let toPrjSn = toQuery.prjSn || toQuery.prj_id;


    if(fromID && !toID){
        toQuery.prjId = fromID;
        toQuery.id = fromID;
    }else if(toQuery.id && !toQuery.prjId){
        toQuery.prjId = toQuery.id;
    }else if(!toQuery.id && toQuery.prjId){
        toQuery.id = toQuery.prjId;
    }

    if(fromPrjSn && !toPrjSn){
        toQuery.prjSn = fromPrjSn;
        toQuery.prj_id = fromPrjSn;
    }else if(toQuery.prj_id && !toQuery.prjSn){
        toQuery.prjSn = toQuery.prj_id;
    }else if(!toQuery.prj_id && toQuery.prjSn){
        toQuery.prj_id = toQuery.prjSn;
    }

    console.log("next(参数)",toQuery,to.query)

    next({
        path: to.path,
        query: toQuery
    })
    setTimeout(()=>{
        next();
        console.log("next()",toQuery,to.query)
    },500)
    

})

router.afterEach((to, from) => {
    Store.dispatch('IS_PAGELOADING/incrementAsync', {
        isShow: false,
        msg: "正在加载中……"
    })
})


export default router