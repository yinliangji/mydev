<template>
	<div class="pageContent" id="settingPage">
		<goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :TOP="'7'" />
		<selectMenu @changeSelect="selectMenuFn" @sendData="getSendData"></selectMenu>
		<Card class="detailContBox">
			<Tabs :value="TabsCur" type="card" :capture-focus="false" @on-click="tabsHandle">
				<TabPane label="设置小组" name="name1">
		        	<div class="baseInfoBox">
		        		<!-- 小组开始 -->
		        		<Group :Data="false" v-if="TabsCur == 'name1'" ref="Group" />
		        		<!-- 小组结束 -->
		        	</div>
		        </TabPane>
		        <TabPane label="用户故事状态设置" name="name2">
		        	<div class="baseInfoBox">
		        		<!-- 用户故事设置开始 -->
				       <UserstorySet :Data="false" v-if="TabsCur == 'name2'" ref="UserstorySet" />
		        		<!-- 用户故事设置结束 -->
		        	</div>
		        </TabPane>
			</Tabs>
		</Card>
	</div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {} = Common.restUrl;
import UserstorySet from './userstorySet'
import Group from './group'
export default {
	components:{
		UserstorySet,
		Group,
	},
	data () {
		return {
			//-- tabs start
            TabsCur:"name1",
            //-- tabs end
		}	
	},
	watch:{
    },
    beforecreated(){
    },
    created(){
        let _TabsCur = this.$router.history.current.query.TabsCur
        if(_TabsCur){
            this.TabsCur = _TabsCur;
        }
    },
    beforeUpdate(){
    },
    updated(){
    },
	mounted(){
		let ID = this.getID() ? this.getID() : this.$router.push('/agile');
	},
	methods:{
		//tabs - start
        tabsHandle(name){
            this.TabsCur = name;
            this.$router.push({path: '/setting', query: {TabsCur:name,}})
        },
        //tabs -end
		getPermissionFn(URL){
            return Common.GetPermission(defaultAXIOS,this,URL);
        },
		getID(){
			return Common.GETID(this,Common);
		},
		
		getSendData(data){
            console.log(data,"<==========getSendData");
        },
        selectMenuFn(N){
            console.log(N,"<==========selectMenuFn");
			if(this.$refs.UserstorySet){
				this.$refs.UserstorySet.showkanban();	
			}
			if(this.$refs.Group){
				this.$refs.Group.selectMenuFn(N);	
			}
        },

	},

}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';

</style>
<style lang="less">

</style>
