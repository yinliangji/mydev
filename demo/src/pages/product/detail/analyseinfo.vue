<template>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
      <tbody>
        <tr>
            <th width="11%" style="background:none; color:#495060;">所属需求项</th>
            <td >{{ formValidate.req_name | FALSEINFO}}</td>
            <!--
            <th width="11%" style="background:none; color:#495060;">需求项提出人</th>
            <td width="20%" >{{ formValidate.proposer | FALSEINFO}}</td>
            <th width="11%" style="background:none; color:#495060;">提出人部门</th>
            <td>{{ formValidate.proposer_department | FALSEINFO}}</td>
            -->
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
        "Data.req_name"(){
            if(this.Data){
                this.formValidate = this.Data;    
            }
        },
        
    },
    created() {
       
    },
    beforeUpdate(){
        console.log("trans--beforeUpdate-------")
    },
    updated(){
        console.log("trans--updated-------")
    },
    mounted(){
        this.formValidate = this.Data;
    },
}


</script>

<style lang="less" scoped>

</style>

