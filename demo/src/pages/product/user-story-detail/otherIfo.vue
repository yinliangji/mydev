<template>
    <div class="otherifoBox">
    	<Tabs :value="TabsCur"  :capture-focus="false" @on-click="tabsHandle" >
                <TabPane :label="us_change" name="name5">
                    <div class="baseInfoBox">
                        <div class="tableBox">
                            <!-- 变更记录 start -->
                            <UsChange :TASKID="TASKID" v-if="TabsCur == 'name5'" />
                            <!-- 变更记录 end -->
                        </div>
                    </div>
                </TabPane>
                <TabPane :label="comment" name="name7">
                    <div class="baseInfoBox" >
                        <div class="tableBox">
                        	<!-- 评论 start -->
                            <Comment :index="1" v-if="TabsCur == 'name7'" />
                            <!-- 评论 end -->
                        </div>
                    </div>
                </TabPane>
               
                <TabPane :label="story_test_case" name="name4">
                    <div class="baseInfoBox">
                        <div class="tableBox">
                            <!-- 相关测试案例 start -->
                            <storyTestCase :storyInfo="storyTestCaseData" v-if="TabsCur == 'name4' && formValidate.id" />
                            <!-- 相关测试案例 end -->
                        </div>
                    </div>
                </TabPane>
            </Tabs>
    </div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
import Store from '@/vuex/store'
const {} = Common.restUrl;
import UsChange from './change'
import storyTestCase from './storyTestCase'
import Comment from "@/components/commentStory/Comment";
    export default {
    	props: {
	        Data: {
	            type: [String,Number,Boolean,Function,Object,Array,Symbol],
	            default: function() {
	                return false;
	            }
	        },
	        PrjPermission:{
	            type: [String,Number,Boolean,Function,Object,Array,Symbol],
	            default: function() {
	                return [];
	            }
	        },
	        Identity:{
	            type: [String,Number,Boolean,Function,Object,Array,Symbol],
	            default: function() {
	                return "";
	            }
	        },
	    },
	    watch:{
	        Data(data){
	        	if(data){
	        		this.init(data)
	        	}
	        },
	        PrjPermission(data){
	            this.prj_permission = data;
	        },
	        Identity(data){
	            this.identity = data;
	        },
	    },
        data () {
            return {
            	us_change: (h) => {
                    return h('div', [
                        h('span', '变更记录'),
                        h('Badge', {
                            props: {
                                count: 3
                            }
                        })
                    ])
                },
                comment: (h) => {
                    return h('div', [
                        h('span', '评论'),
                        h('Badge', {
                            props: {
                                count: 330
                            }
                        })
                    ])
                },
                story_test_case: (h) => {
                    return h('div', [
                        h('span', '相关测试案例'),
                        h('Badge', {
                            props: {
                                count: 33
                            }
                        })
                    ])
                },

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
	                editStatus:"", 
	                us_accept:"",  
	                assist_list:[],       
	            },
	            userstory_typeList:[],
	            userstory_statusList:[],
	            req_idList:[],
	            proiList:[],
	            GetDetail:"",

	            prj_permission:[],
	            identity:"",
	            TASKID:"",
	           
	            //--业务功能列表开始
	            
	            //--业务功能列表结束
	            //-- tabs start
	            TabsCur:"name5",
	            //-- tabs end
	            //查询搜索开始
	           
	            //查询搜索结束
	            //关联业务开始
	            
	            //关联业务结束
	            ruleValidate: {
	            },
	            
	            
	            
	            // wy start
	            storyTestCaseData:{},
	            // wy end
	            //juzi start
	            userStoryId:"",
	            //juzi end
	            //检测id是否在projectListDataNew列表里
	            GO:false,
	            GOText:"",
	        }
        },
        mounted(){
	        if(this.Data){
	            this.init(data)
	        }
	    },
        methods: {
        	init(data){
	    		console.error("下部 init",data);
	    		let ID = Common.GETID(this,Common)
	    		for (let i in this.formValidate){
	                if(i == "manhour" || i == "manhour" || i == "manHour" || i == "manHours"){
	                }else if(i == "AddGroupList" || i == "bfunc"){
	                }else if(i == "depd_list"){
	                }else if(i == "assist_list"){
	                }else{
	                    this.formValidate[i] = (data[i] || "")+"";
	                }
	            }

                this.copydata(this.storyTestCaseData,this.formValidate);
                
                this.userStoryId = this.formValidate.userstory_id;
               
                this.TASKID = this.formValidate.id;
	            
	    	},
        	//wy start
	        copydata(to,from){
	            Object.assign(to,from)
	        },
	        //wy end
	        //业务窗口 -start
	        
	        //业务窗口 -end
	        //删除窗口 -start
	        
	        //删除窗口 -end
	        //查询搜索开始
	        
	        //查询搜索结束
	        //相关业务功能列表--start
	        
	        //相关业务功能列表--end
	        //tabs - start
	        tabsHandle(name){
	            this.TabsCur = name;
	            let Query = {
	                TabsCur:name,
	                detail_id:Common.GETdetail_id(this,Common),
	            }
	        },
	        //tabs -end
	        showError(ERR){
	            Common.ErrorShow(ERR,this);
	        },
        },
        components: {
	        storyTestCase,
	        UsChange,
	        Comment,
	    },
    }
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';
.otherifoBox {
	min-height: 500px;
	border-top: #edf2f5 solid 12px;
}
</style>
