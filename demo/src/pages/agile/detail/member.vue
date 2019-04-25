<template>
  <div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
        <tbody v-html="HTML">
          <!-- <tr v-for="(item,index) in formValidate.person" :key="index">
            <th width="11%">{{item.title}}</th>
            <td>
              <span v-for="(item2,index2) in item.member" :key="index2">
                {{item2.nick_name}}
              </span>
            </td>
          </tr> --> 
          
          <!-- <tr>
            <th width="11%">项目经理</th>
            <td>{{formValidate.managerGroup | FALSEINFO}}</td>
            <th width="11%">开发人员</th>
            <td>{{formValidate.developerGroup | FALSEINFO}}</td>
            <th width="11%">测试人员</th>
            <td>{{formValidate.testerGroup | FALSEINFO}}</td>

          </tr>
          <tr>
            <th>总体组</th>
            <td>{{formValidate.allgroup | FALSEINFO}}</td>
            <th>&nbsp;</th>
            <td>&nbsp;</td>
            <th>&nbsp;</th>
            <td>&nbsp;</td>
          </tr> -->
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
        Data(){
            if(this.Data){
                this.HTML = this.Data;
            }
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
      this.HTML = this.Data;
    },
    components: {
      
    },
}


</script>

<style lang="less" scoped>


</style>

