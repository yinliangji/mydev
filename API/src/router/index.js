import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/home'
import Store from '@/vuex/store'

Vue.use(Router)


const router =   new Router({
  mode:'hash',//'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name:'Home',
      components:{
        Cont:Home
      },
      

        // redirect: '/item1/firstcontent',
        // components: {
        // 	content: FirstContent,
        // 	aside: First
        // },
        // children: [{
        //     path: '/firstcontent',
        //     // redirect: '/first/yingyong'
        //     component: FirstContent
        //   },
        //   {
        //   	path: '/firstcontent2',
        //   	component: FirstContentSec
        //   }
        // ]
    },
    {
      path: '/home/list',
      name:'List',
      components: {
        Cont:resolve => {require(["../pages/home/list/"], resolve)}
      },
    },
    {
      path: '/page1',
      name:'Page1',
      components: {
      	Cont:resolve => {require(["../pages/page1/"], resolve)}
      },
    },
    {
      path: '/page2',
      name:'Page2',
      components: {
        Cont:resolve => {require(["../pages/page2/"], resolve)}
      
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  Store.dispatch('IS_PAGELOADING/incrementAsync',{isShow:true,msg:"正在加载中……"})     
  // console.log('beforeEach__to',to)
  // console.log('beforeEach__from',from);
  next();
})  

router.afterEach((to, from) => {  
  // console.log('aftereach__to',to)
  // console.log('aftereach__from',from);
  Store.dispatch('IS_PAGELOADING/incrementAsync',{isShow:false,msg:"正在加载中……"})
})  


export default router
