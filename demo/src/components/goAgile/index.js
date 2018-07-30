import goAgileComponent from './index.vue'

const goAgile = {
    install:function (Vue) {
        Vue.component('goAgile',goAgileComponent)
    }
}
export default goAgile