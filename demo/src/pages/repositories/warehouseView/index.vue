<template>
	<div class="pageContent">
        <Card>
        	<div class="repositoriesBox">
                <h3 class="Title"><span>Maven仓库概览</span></h3>
            </div>
            <Tabs :value="TabsCur" type="card" :capture-focus="false" @on-click="tabsHandle"  >
                <TabPane label="每日下载量" name="name1">
                    <div class="baseInfoBox">
                        <!-- <h3 class="Title"><span>用户故事基本信息</span></h3> -->
                        <div class="tableBox">
                            <Downvalue v-if="TabsCur == 'name1'" />
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

export default {
	name: 'warehouseView',
	components: {
		Downvalue,
	},
	data() {
		return {
			//tag开始
            TabsCur:"name1",
            //tag结束
		}
	},
	mounted() {


	},
	methods: {
		//tag开始
        tabsHandle(name){
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