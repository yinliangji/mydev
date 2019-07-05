<template>
  <div>
    项目方案
    
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
            formValidate: {
                
            },
            
            
        }
    },
    watch: {
        Data(){
            
        },
    },
    methods: {
  
       
     
    },
    created() {
      //console.log("项目detail--详情--created-------",this.formValidate)
    },
    beforeUpdate(){
      //console.log("项目detail--详情--beforeUpdate-------",this.formValidate)
        
    },
    updated(){
      //console.log("项目detail--详情--updated-------",this.formValidate)
    },
    mounted(){
     
    },
    components: {
      
    },
}


</script>

<style lang="less" scoped>


</style>

