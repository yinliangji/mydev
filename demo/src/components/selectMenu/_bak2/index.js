import myselectMenu from './selectMenu.vue'

const selectMenu = {
    install: function(Vue) {
        Vue.component('selectMenu', myselectMenu)
    }
};
export default selectMenu;