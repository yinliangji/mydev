<template>
  <div>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
        <tbody>
        <tr>
          <th width="12%">项目编号</th>
          <td width="21%">{{ formValidate.prj_id | FALSEINFO}}</td>
          <th width="12%">项目名称</th>
          <td width="21%">{{formValidate.prj_name | FALSEINFO}}</td>
          <th width="12%"><!-- 所属产品 -->项目类型</th>
          <td>
            {{formValidate.prj_type == "1" ? "立项" : "自研" | FALSEINFO}}
            <!-- {{formValidate.prod_name | FALSEINFO}} -->
          </td>
        </tr>
        <tr>
          <th>创建时间</th>
          <td>{{formValidate.settle_time | FALSEINFO}}</td>
          <th>项目启动时间</th>
          <td>{{formValidate.start_time | FALSEINFO}}</td>
          <th>项目结束时间</th>
          <td>{{formValidate.end_time | FALSEINFO}}</td>
        </tr>

        <tr>
          
          <th>提出部门</th>
          <td>{{formValidate.dept_nm_id | FALSEINFO}}</td>
          <th>实施部门</th>
          <td>{{formValidate.stff_nm_id | FALSEINFO}}</td>
          <th>项目状态</th>
          <td>{{formValidate.itm_status | FALSEINFO}}</td>
        </tr>


        <tr>
          <th>研发模式</th>
          <td>{{formValidate.subject | FALSEINFO}}</td>
          
          <th>逻辑子系统</th>
          <td>{{formValidate.logic_sys_name | FALSEINFO}}</td>
          <th>物理子系统</th>
          <td>{{formValidate.physics_sys_name | FALSEINFO}}</td>
          
        </tr>

        <tr>
          <th>创建人</th>
          <td>{{formValidate.create_person | FALSEINFO}}</td>
          <th><!-- 逻辑子系统 --></th>
          <td><!-- {{formValidate.logic_sys_name | FALSEINFO}} --></td>
          <th><!-- 物理子系统 --></th>
          <td><!-- {{formValidate.physics_sys_name | FALSEINFO}} --></td>
          
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
          <th>业务目标</th>
          <td colspan="5" v-html="formValidate.prj_goal?'<pre>'+formValidate.prj_goal+'</pre>':''"></td>
        </tr>
        </tbody>
    </table>
    <h3 class="Title" v-show="formValidate.prj_type == '1'"><span>其他基本信息</span></h3>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable" v-show="formValidate.prj_type == '1'">
        <tbody>
        <tr>
          <th width="12%">项目英文名称</th>
          <td width="21%">{{ formValidate.itm_prj_eng_nm | FALSEINFO}}</td>
          <th width="12%">项目英文简称</th>
          <td width="21%">{{formValidate.itm_prj_eng_short_num | FALSEINFO}}</td>
          <th width="12%">立项类型</th>
          <td>{{formValidate.itm_type  | FALSEINFO}}</td>
        </tr>
        <tr>
          <th>下达任务书时间</th>
          <td>{{formValidate.itm_assignment_date | FALSEINFO}}</td>
          <th>技术目标</th>
          <td>{{formValidate.itm_tech_target | FALSEINFO}}</td>
          <th>项目任务书编号</th>
          <td>{{formValidate.itm_prj_tsk_id | FALSEINFO}}</td>
        </tr>

        <tr>
          
          <th>业务条线</th>
          <td>{{formValidate.itm_lob | FALSEINFO}}</td>
          <th>是否发送通知书</th>
          <td>{{formValidate.itm_wthr_snd_ntc | FALSEINFO}}</td>
          <th><!-- 项目状态 --></th>
          <td><!-- {{formValidate.itm_status | FALSEINFO}} --></td>
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
                prj_type:"",
                dept_nm_id:"",
                stff_nm_id:"",
                itm_status:"",
                subject:"",


                itm_prj_eng_nm:"",
                itm_prj_eng_short_num:"",
                itm_type:"",
                itm_assignment_date:"",
                itm_tech_target:"",
                itm_prj_tsk_id:"",
                itm_lob:"",
                itm_wthr_snd_ntc:"",
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

