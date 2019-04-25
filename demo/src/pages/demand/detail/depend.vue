<template>
  <div>
    依赖项
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
    components: {
    },
}
</script>
<style lang="less" scoped>
</style>

