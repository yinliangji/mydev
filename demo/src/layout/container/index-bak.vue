<template>
	<Layout class="container">
		<PageLoading v-if="ispageLoading" />
		<router-view class="ContView" name="Cont" />
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
  left:200px;
  right:0;
  position: absolute;
  height:100%;
  overflow: auto;
}
</style>