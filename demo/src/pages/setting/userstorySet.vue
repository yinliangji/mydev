<template>
  <div>
    用户故事设置
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
    watch: {
      Data(d){
        console.log(d);
      },
    },
    methods: {
      
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
@import './style.less';
@import './style.css';
</style>


