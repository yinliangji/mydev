<template>
	<div class="pageContent">
        <Card>
        	<div class="repositoriesBox">
                <h3 class="Title"><span>Maven仓库概览</span></h3>
            </div>
            <Tabs :value="TabsCur" type="card" :capture-focus="false" @on-click="tabsHandle"  >
                <TabPane label="日下载量" name="name1">
                    <div class="baseInfoBox">
                        <!-- <h3 class="Title"><span>用户故事基本信息</span></h3> -->
                        <div class="tableBox">
                            <Downvalue v-if="TabsCur == 'name1'" />
                        </div>
                    </div>
                </TabPane>
                <TabPane label="日活跃用户量" name="name2">
                    <div class="baseInfoBox">
                        <!-- <h3 class="Title"><span>用户故事基本信息</span></h3> -->
                        <div class="tableBox">
                            <Activevalue @sendDate="receiveDate" v-if="TabsCur == 'name2'" />
                        </div>
                    </div>
                </TabPane>
                <TabPane label="活跃用户列表" name="name3">
                    <div class="baseInfoBox">
                        <!-- <h3 class="Title"><span>用户故事基本信息</span></h3> -->
                        <div class="tableBox">
                            <Userlist @sendIP="receiveIP" :Data="searchDate" v-if="TabsCur == 'name3'" />
                        </div>
                    </div>
                </TabPane><TabPane label="用户使用记录" name="name4">
                    <div class="baseInfoBox">
                        <!-- <h3 class="Title"><span>用户故事基本信息</span></h3> -->
                        <div class="tableBox">
                            <Ipsearch :Data="searchIP" v-if="TabsCur == 'name4'" />
                        </div>
                    </div>
                </TabPane>
            </TabPane><TabPane label="下载排行榜" name="name5">
                    <div class="baseInfoBox">
                        <!-- <h3 class="Title"><span>用户故事基本信息</span></h3> -->
                        <div class="tableBox">
                            <Rankinglist :Data="searchIP" v-if="TabsCur == 'name5'" />
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </Card>
    </div>
</template>
<script>
import Store from '@/vuex/store'
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {queryPublicRep} = Common.restUrl;
import Downvalue from './downvalue'
import Activevalue from './activevalue'
import Userlist from './userlist'
import Ipsearch from './ipsearch'
import Rankinglist from './rankinglist'

export default {
	name: 'warehouseView',
	components: {
		Downvalue,
        Activevalue,
        Userlist,
        Ipsearch,
        Rankinglist,
	},
	data() {
		return {
			//tag开始
            TabsCur:"name1",
            //tag结束
            searchIP:"",
            searchDate:"",
		}
	},
    created() {
        console.log("每日下载量--created-------");
        let _TabsCur = this.$router.history.current.query.TabsCur
        if(_TabsCur){
            this.TabsCur = _TabsCur;
        }
    },
    beforeUpdate(){
        console.log("每日下载量--beforeUpdate-------")
    },
    updated(){
        console.log("每日下载量--updated-------")
    },
	mounted() {


	},
	methods: {
        receiveDate(val){
            this.searchDate = val;
            this.TabsCur = "name3";
        },
        receiveIP(val){
            this.searchIP = val;
            this.TabsCur = "name4";
        },
		//tag开始
        tabsHandle(name){
            this.searchIP = "";
            this.searchDate = "";
            this.TabsCur = name;
        },
        //tag结束
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
	}
}
</script>

<style  lang="less" scoped>
@import './style.less';
@import './style.css';
</style>
<style>

</style>