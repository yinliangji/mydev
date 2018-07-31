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
export default {
	components:{
		abc,
	}
}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';

</style>