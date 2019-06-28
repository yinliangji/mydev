<template>
  <div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
      <tbody>
        <tr>
          <th width="11%">用户故事名称</th>
          <td width="20%">{{ formValidate.userstory_name | FALSEINFO}}</td>
          <th width="11%">所属项目</th>
          <td  width="20%"><router-link to="/agile/detail">{{ formValidate.prj_name | FALSEINFO}}</router-link></td>
          <th width="11%"><!-- 所属产品 -->创建时间</th>
          <td ><!-- {{ formValidate.product_name | FALSEINFO}} -->{{ formValidate.created_time | FALSEINFO}}</td>
        </tr>
        <tr>
          <th >责任人</th>
          <td >{{ formValidate.nick_name | FALSEINFO}}</td>
          <th >故事状态</th>
          <td >{{ formValidate.userstory_status | FALSEINFO}}</td>
          <th >故事类型</th>
          <td >{{ formValidate.userstory_type | FALSEINFO}}</td>
        </tr>

        <tr>
          <th >优先级</th>
          <td>{{ formValidate.proi | FALSEINFO}}</td>
          <th width="11%">所属迭代</th>
          <td width="20%">{{ formValidate.sprint_name | FALSEINFO}}</td>
          <th width="11%">用户故事点数</th>
          <td>{{ formValidate.manHours | FALSEINFO}}</td>
        </tr>

        <tr>
          <th>故事编号</th>
          <td>{{ formValidate.userstory_id | FALSEINFO}}</td>
          <th>关联工作项<br />(已完成/全部)</th>
          <td>{{ formValidate.complete_mission | FALSEINFO}} / {{ formValidate.mission | FALSEINFO}}</td>
          <th width="11%">所属需求项</th>
          <td>{{ formValidate.req_name | FALSEINFO}}</td>
        </tr>
        <tr>
          <th>责任协助人</th>
          <td colspan="5">
            <span v-for="(item,index) in formValidate.assist_list" :key="index" class="depdTxt">
              <font>{{item.nick_name}}</font><em v-if="index != formValidate.assist_list.length-1"> 、</em>
            </span>
          </td>
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
          <th>故事描述</th>
          <td colspan="5" v-html="formValidate.userstory_desc?'<pre>'+formValidate.userstory_desc+'</pre>':''"></td>
        </tr>
        <tr>
          <th>验收标准</th>
          <td colspan="5" v-html="formValidate.us_accept?'<pre>'+formValidate.us_accept+'</pre>':''"></td>
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
import Depdepd from './depdpop'
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
                us_accept:"",        
            },
            //业务弹出--start
            depdpopIsShow:false,
            depdpopIsLoading:false,
            depdpopData:false,
            //业务弹出--end
            
        }
    },
    watch: {
        Data(data){
          if(data){
            this.formValidate = data;
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
      //console.log("用户故事detail--详情--created-------",this.formValidate)
    },
    beforeUpdate(){
      //console.log("用户故事detail--详情--beforeUpdate-------",this.formValidate)
        
    },
    updated(){
      //console.log("用户故事detail--详情--updated-------",this.formValidate)
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

