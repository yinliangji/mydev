<template>
    <div class="guideBox">
       私有仓库使用指南
       <div class="codeBox">
           code
       </div>
    </div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {} = Common.restUrl;
export default {
    props: {
        Data: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
    },
    data () {
        return {
        }
    },
    methods: {
    },
    watch: {
        Data(){
        },
    },
    created() {
    },
    beforeUpdate(){
        
    },
    updated(){
        
    },
    mounted(){
        
    },
}


</script>

<style lang="less" scoped>
@import './style.less';
@import './style.css';

</style>

