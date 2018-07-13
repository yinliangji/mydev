<template>
	<Footer>Footer <slot>Footer slot</slot></Footer>
</template>
<script>
	export default {

	}
</script>
<style lang="less" scoped>
.ivu-layout-header {
    background: red;
    padding: 0;
    height: 64px;
    line-height: normal;
}
.ivu-layout-footer {
    background: yellow;
    padding: 0;
    color: #495060;
    font-size: 14px;
    height:64px;
}
</style>