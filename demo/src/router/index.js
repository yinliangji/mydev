import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/home'
import Store from '@/vuex/store'
// import iterationTo from '@/pages/iteration/iteration'
Vue.use(Router)


const router = new Router({
    mode: 'hash', //'history',
    routes: [{
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'Home',
            components: {
                Cont: Home
            }
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
            name: 'agile',
            components: {
                Cont: resolve => {
                    require(["../pages/agile/"], resolve)
                }
            },
        },
        {
            path: '/demand',
            name: 'demand',
            components: {
                Cont: resolve => {
                    require(["../pages/demand/"], resolve)
                }
            },
        },
        {
            path: '/product',
            name: 'product',
            components: {
                Cont: resolve => {
                    require(["../pages/product/"], resolve)
                }

            },
        },
        {
            path: '/iteration',
            name: 'iteration',
            components: {
                Cont: resolve => {
                    require(["../pages/iteration/"], resolve)
                }

            },
        },
        {
            path: '/development',
            name: 'development',
            components: {
                Cont: resolve => {
                    require(["../pages/development/"], resolve)
                }

            },
        },
        {
            path: '/defect',
            name: 'defect',
            components: {
                Cont: resolve => {
                    require(["../pages/defect/"], resolve)
                }

            },
        },
        {
            path: '/overView',
            name: 'overView',
            components: {
                Cont: resolve => {
                    require(["../pages/overView/"], resolve)
                }

            },
        },
        {
            path: '/baseinfo',
            name: 'baseinfo',
            components: {
                Cont: resolve => {
                    require(["../pages/baseinfo/"], resolve)
                }
            },
        },
        {
            path: '/iteration/iteration',
            name: 'iterationTo',
            components: {
                Cont: resolve => {
                    require(["../pages/iteration/iteration"], resolve)
                }
            },
        },
        {
            path: '/iteration/iteration2',
            name: 'iterationTo',
            components: {
                Cont: resolve => {
                    require(["../pages/iteration/iteration2"], resolve)
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
            name: 'agile',
            components: {
                Cont: resolve => {
                    require(["../pages/agile/"], resolve)
                }
            },
        },
        {
            path: '/demand',
            name: 'demand',
            components: {
                Cont: resolve => {
                    require(["../pages/demand/"], resolve)
                }
            },
        },
        {
            path: '/demand/list',
            name: 'demand_list',
            components: {
                Cont: resolve => {
                    require(["../pages/demand/list/"], resolve)
                }
            },
        },
        {
            path: '/product',
            name: 'product',
            components: {
                Cont: resolve => {
                    require(["../pages/product/"], resolve)
                }

            },
        },
        {
            path: '/iteration',
            name: 'iteration',
            components: {
                Cont: resolve => {
                    require(["../pages/iteration/"], resolve)
                }

            },
        },
        {
            path: '/development',
            name: 'development',
            components: {
                Cont: resolve => {
                    require(["../pages/development/"], resolve)
                }

            },
        },
        {
            path: '/defect',
            name: 'defect',
            components: {
                Cont: resolve => {
                    require(["../pages/defect/"], resolve)
                }

            },
        },
        {
            path: '/overView',
            name: 'overView',
            components: {
                Cont: resolve => {
                    require(["../pages/overView/"], resolve)
                }

            },
        },
        {
            path: '/baseinfo',
            name: 'baseinfo',
            components: {
                Cont: resolve => {
                    require(["../pages/baseinfo/"], resolve)
                }
            },
        },
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