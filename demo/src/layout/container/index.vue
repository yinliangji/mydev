<template>
	<Layout class="main" id="main">
		<PageLoading v-if="ispageLoading" />
		<Content class="container">
			<router-view class="ContView" name="Cont" />
		</Content>
	</Layout>
</template>
<script>
import PageLoading from '@/components/pageLoading'
export default {
	components: {
		PageLoading,
	},
	computed: {
		ispageLoading() {
			return this.$store.state["IS_PAGELOADING"].loading
		}
	},
}
</script>
<style lang="less" scoped>
.container {
   padding: 0 16px 16px;
   background: #fff;
}
.main{
	height:100%;
	overflow: auto;
	position:relative;

}

</style>
