<template>
  <div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
      <tbody>
        <tr>
          <th width="11%">需求项编号</th>
          <td width="20%">{{ formValidate.req_id | FALSEINFO}}</td>
          <th width="11%">需求项名称</th>
          <td  width="20%">{{ formValidate.req_name | FALSEINFO}}</td>
          <th width="11%">需求项类型</th>
          <td >{{ formValidate.prj_type_name | FALSEINFO}}</td>
        </tr>
        <tr>
          <th >创建时间</th>
          <td >{{ formValidate.settle_time | FALSEINFO}}</td>
          <th >开始时间</th>
          <td >{{ formValidate.start_time | FALSEINFO}}</td>
          <th >结束时间</th>
          <td >{{ formValidate.end_time | FALSEINFO}}</td>
        </tr>

        <tr>
          <th >提出部门</th>
          <td>{{ formValidate.req_submitter | FALSEINFO}}</td>
          <th >需求项状态</th>
          <td >{{ formValidate.status_name | FALSEINFO}}</td>
          <th >创建人</th>
          <td>{{ formValidate.create_user | FALSEINFO}}</td>
        </tr>
        <tr>
          <th >需求提出人</th>
          <td>{{ formValidate.intro | FALSEINFO}}</td>
          <th >需求来源</th>
          <td >{{ formValidate.req_source_name | FALSEINFO}}</td>
          <th >需求项备注</th>
          <td v-html="formValidate.remark?'<pre>'+formValidate.remark+'</pre>':''">&nbsp;</td>
        </tr>
        <tr>
          <th>依赖项</th>
          <td colspan="5">
            <span v-for="(item,index) in formValidate.depd_list" :key="index" class="depdTxt">
              【<a @click="depdPop(item,index)">{{item.depd_name}}</a>】<em v-if="index != formValidate.depd_list.length-1">、</em>
            </span>
          </td>
        </tr>
        
        <tr>
          <th>需求项描述</th>
          <td colspan="5" v-html="formValidate.comment?'<pre>'+formValidate.comment+'</pre>':''"></td>
        </tr>
        
        
      </tbody>
    </table>
    <Depdepd 
        @buspopClose = "depdpopCloseFn"
        :data="depdpopData"
        :isShow = "depdpopIsShow"
        :isLoading = "depdpopIsLoading"
    />
  </div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {} = Common.restUrl;
import Depdepd from '@/pages/product/detail/depdpop'
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
                id: "",
                userstory_id: "",
                userstory_name: "",
                userstory_type: "",
                charger: "",
                userstory_status: "",
                proi: "",
                manHours: "",
                mission: "",
                complete_mission: "",
                phycics_sys_id:"",
                actual_online_time:"",
                charger:"",
                nick_name:"",
                created_time:"",
                last_chg_time:"",
                last_chgr:"",
                learn_concern:"",
                plan_online_time:"",
                proposer:"",
                proposer_department:"",
                req_id:"",
                req_name:"",
                sprint: "",
                sprint_name:"",
                userstory_desc:"",
                prj_id:"",
                prj_name:"",
                prod_id:"",
                product_name:"",
                depd_list:[],    
                AddGroupList:[],//搜索查询
                bfunc:[],//弹出业务窗口
                intro:"",  
                req_source:"",
                req_source_name:"",         
            },
            //业务弹出--start
            depdpopIsShow:false,
            depdpopIsLoading:false,
            depdpopData:false,
            //业务弹出--end
            
        }
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
    watch: {
        Data(){
            if(this.Data){
                this.formValidate = this.Data;
            }
            
        },
    },
    created() {
      console.log("项目需求项detail--详情--created-------",this.formValidate)
    },
    beforeUpdate(){
      console.log("项目需求项detail--详情--beforeUpdate-------",this.formValidate)
        
    },
    updated(){
      console.log("项目需求项detail--详情--updated-------",this.formValidate)
    },
    mounted(){
        this.formValidate = this.Data;
    },
    components: {
      Depdepd,
    },
}
</script>
<style lang="less" scoped>
</style>

