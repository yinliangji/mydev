<template>
	<div>
		page2
	    <abc :level="1">
		  <I> Hello world!</I>
		</abc>
	</div>
</template>
<script>
import abc from "./abc";
import API from '@/api'
const {demo2AXIOS} = API;
export default {
	components:{
		abc,
	},
	mounted(){
		demo2AXIOS("",{x:5,y:6},{timeout:3000,method:'get'}).then((response) => {
			console.log("page1+++++++++++++++++++++",response)
		}).catch( (error) => {
			console.log(error)
		});
	},
}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';

</style>