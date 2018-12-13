import toolTipComponent from './index.vue'

const ToolTip = {
    install:function (Vue) {
        Vue.component('ToolTip',toolTipComponent)
    }
}
export default ToolTip