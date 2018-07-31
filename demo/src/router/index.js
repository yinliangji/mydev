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

        //以后删除开始

        {
            path: '/test',
            name: 'test',
            components: {
                Cont: resolve => {
                    require(["../pages/test/test"], resolve)
                },
                Aside: resolve => {
                    require(["../layout/sider/sider_all"], resolve)
                }
            },
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