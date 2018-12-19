<template>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
      <tbody>
        <tr>
          <th width="11%">用户故事名称</th>
          <td width="20%">{{ formValidate.userstory_name | FALSEINFO}}</td>
          <th width="11%">所属项目</th>
          <td  width="20%"><router-link to="/agile/detail">{{ formValidate.prj_name | FALSEINFO}}</router-link></td>
          <th width="11%">所属产品</th>
          <td >{{ formValidate.product_name | FALSEINFO}}</td>
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
          <th width="11%">工时<br />(实际/预计)</th>
          <td>0 / {{ formValidate.manHours | FALSEINFO}}</td>
        </tr>

        <tr>
          <th>故事编号</th>
          <td>{{ formValidate.userstory_id | FALSEINFO}}</td>
          <th>关联事项<br />(已完成/全部)</th>
          <td>{{ formValidate.complete_mission | FALSEINFO}} / {{ formValidate.mission | FALSEINFO}}</td>
          <th width="11%">创建时间</th>
          <td>{{ formValidate.created_time | FALSEINFO}}</td>
        </tr>
       
       
          
          <th>故事描述</th>
          <td colspan="5" v-html="formValidate.userstory_desc?'<pre>'+formValidate.userstory_desc+'</pre>':''"></td>
          
        </tr>
        
      </tbody>
    </table>
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
                AddGroupList:[],//搜索查询
                bfunc:[],//弹出业务窗口           
            },
            
        }
    },
    methods: {
    },
    watch: {
        Data(){
            if(this.Data){
                this.formValidate = this.Data;
            }
            
        },
    },
    created() {
    },
    beforeUpdate(){
        
    },
    updated(){
        
    },
    mounted(){
        this.formValidate = this.Data;
    },
}


</script>

<style lang="less" scoped>


</style>

