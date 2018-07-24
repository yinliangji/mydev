import selectMenu from './selectMenu.vue'

const selectmenu = {
    install: function(Vue) {
            Vue.component('selectMenu', selectMenu)
        } //'Loading'这就是后面可以使用的组件的名字，install是默认的一个方法
};
export default selectmenu;