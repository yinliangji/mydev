<template>
  <div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
        <tbody>
        <tr>
          <th width="11%">项目编号</th>
          <td width="22%">{{ formValidate.prj_id | FALSEINFO}}</td>
          <th width="11%">项目名称</th>
          <td width="22%">{{formValidate.prj_name | FALSEINFO}}</td>
          <th width="11%"><!-- 所属产品 -->创建人</th>
          <td>
            {{formValidate.create_person | FALSEINFO}}
            <!-- {{formValidate.prod_name | FALSEINFO}} -->
          </td>
        </tr>
        <tr>
          <th>项目创建时间</th>
          <td>{{formValidate.settle_time | FALSEINFO}}</td>
          <th>开始时间</th>
          <td>{{formValidate.start_time | FALSEINFO}}</td>
          <th>结束时间</th>
          <td>{{formValidate.end_time | FALSEINFO}}</td>
        </tr>

        <tr>
          
          <th>逻辑子系统</th>
          <td>{{formValidate.logic_sys_name | FALSEINFO}}</td>
          <th>物理子系统</th>
          <td>{{formValidate.physics_sys_name | FALSEINFO}}</td>
          <th><!-- 创建人 --></th>
          <td><!-- {{formValidate.create_person | FALSEINFO}} --></td>
        </tr>

        
        <tr>
          <th>所属模块</th>
          <td colspan="5">{{formValidate.modules | FALSEINFO}}</td>
        </tr>

        <tr>
          <th>项目描述</th>
          <td colspan="5" v-html="formValidate.prj_desc?'<pre>'+formValidate.prj_desc+'</pre>':''"></td>
        </tr>
        <tr>
          <th>项目目标</th>
          <td colspan="5" v-html="formValidate.prj_goal?'<pre>'+formValidate.prj_goal+'</pre>':''"></td>
        </tr>
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
                prj_id:"",
                prj_name:"",
                settle_time:"",
                start_time: "",
                end_time: "",
                prj_desc: "",
                prj_goal:"",
                modules:"",
                prod_name:"",
                person:[],
                logic_sys_id:"",
                logic_sys_name:"",
                physics_sys_id:"",
                physics_sys_name:"",
                create_person:"",
                // allgroup:"",
                // managerGroup:"",
                // developerGroup:"",
                // testerGroup:"",
            },
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
                this.formValidate = this.Data;
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
      console.log("项目detail--详情--created-------",this.formValidate)
    },
    beforeUpdate(){
      console.log("项目detail--详情--beforeUpdate-------",this.formValidate)
        
    },
    updated(){
      console.log("项目detail--详情--updated-------",this.formValidate)
    },
    mounted(){
      this.formValidate = this.Data;
    },
    components: {
      
    },
}


</script>

<style lang="less" scoped>


</style>

