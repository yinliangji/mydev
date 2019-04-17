<template>
   <div>评论</div>
</template>
<script>
export default {
    props: {
        index: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
    },
    watch:{
        index() {
        },
    },
    beforeUpdate(){
        console.log("评论---beforeUpdate-------")
    },
    updated(){
        console.log("评论---updated-------")
    },
    data () {
        return {
           
        }
    },
    mounted(){
        
    },
    methods: {
       
    }

}
</script>
<style lang="less" scoped>

</style>