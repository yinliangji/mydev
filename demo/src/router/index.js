import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home'
import Store from '@/vuex/store'
Vue.use(Router)
const router = new Router({
    mode: 'hash', //'history',
    routes: [{
            path: '/',
            redirect: '/agile',
        },
        {
            path: '/home',
            name: 'Home',
            components: {
                Cont: resolve => {
                    require(["../pages/home"], resolve)
                }
            },
        },
        {
            path: '/home/list',
            name: 'List',
            components: {
                Cont: resolve => {
                    require(["../pages/home/list/"], resolve)
                }
            },
        },
        {
            path: '/agile',
            name: 'Agile',
            components: {
                Cont: resolve => {
                    require(["../pages/agile/"], resolve)
                }
            },
        },
        {
            path: '/demand',
            name: 'Demand',
            components: {
                Cont: resolve => {
                    require(["../pages/demand/"], resolve)
                }
            },
        },
        {
            path: '/demand/list',
            name: 'Demand_list',
            components: {
                Cont: resolve => {
                    require(["../pages/demand/list/"], resolve)
                }
            },
        },
        {
            path: '/product',
            name: 'Product',
            components: {
                Cont: resolve => {
                    require(["../pages/product/"], resolve)
                }

            },
        },
        {
            path: '/product/baseinfo',
            name: 'Productbaseinfo',
            components: {
                Cont: resolve => {
                    require(["../pages/product/baseinfo/"], resolve)
                }
            },
        },
        {
            path: '/iteration',
            name: 'Iteration',
            components: {
                Cont: resolve => {
                    require(["../pages/iteration/"], resolve)
                }

            },
        },
        {
            path: '/development',
            name: 'Development',
            components: {
                Cont: resolve => {
                    require(["../pages/development/"], resolve)
                }

            },
        },
        {
            path: '/defect',
            name: 'Defect',
            components: {
                Cont: resolve => {
                    require(["../pages/defect/"], resolve)
                }

            },
        },
        {
            path: '/overView',
            name: 'OverView',
            components: {
                Cont: resolve => {
                    require(["../pages/overView/"], resolve)
                }

            },
        },
        {
            path: '/agile/baseinfo',
            name: 'Agilebaseinfo',
            components: {
                Cont: resolve => {
                    require(["../pages/agile/baseinfo/"], resolve)
                }
            },
        },
        {
            path: '/iteration/iteration',
            name: 'IterationTo',
            components: {
                Cont: resolve => {
                    require(["../pages/iteration/iteration"], resolve)
                }
            },
        },

        //以后删除开始

        {
            path: '/test',
            name: 'test',
            components: {
                Cont: resolve => {
                    require(["../pages/test/test"], resolve)
                }
            },
        },
        {
            path: '/page2',
            name: 'page2',
            components: {
                Cont: resolve => {
                    require(["../pages/page2/"], resolve)
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
        // console.log('beforeEach__to',to)
        // console.log('beforeEach__from',from);
    next();
})

router.afterEach((to, from) => {
    // console.log('aftereach__to',to)
    // console.log('aftereach__from',from);
    Store.dispatch('IS_PAGELOADING/incrementAsync', {
        isShow: false,
        msg: "正在加载中……"
    })
})


export default router