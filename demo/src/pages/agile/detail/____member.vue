<template>
  <div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
      <tbody v-html="HTML">
      </tbody>
    </table>
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
        Html: {
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
            HTML:"",
            //业务弹出--start
            depdpopIsShow:false,
            depdpopIsLoading:false,
            depdpopData:false,
            //业务弹出--end
            
        }
    },
    watch: {
        Html(data){
          this.HTML = data;
        },
        Data(data){
          this.formValidate = data;
        },
    },
    methods: {
      //业务窗口 -start
      depdpopCloseFn(B){
          this.depdpopIsShow = B;
      },
      depdpopOpenFn(B,i,d){
          this.depdpopData = d;
          this.depdpopIsShow = B;
      },
      //业务窗口 -end
      depdPop(d,i){
        this.depdpopOpenFn(true,i,d)
      },
    },
    created() {
      console.log("项目成员detail--详情--created-------",this.formValidate)
    },
    beforeUpdate(){
      console.log("项目成员detail--详情--beforeUpdate-------",this.formValidate)
        
    },
    updated(){
      console.log("项目成员detail--详情--updated-------",this.formValidate)
    },
    mounted(){
      this.HTML = this.Html;
      this.formValidate = this.Data;
    },
    components: {
      
    },
}


</script>

<style lang="less" scoped>


</style>

