<template>
  <div class="footer">
    Footer <slot>Footer slot</slot>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
.footer {
	background: gray;
	height:100%;
	text-align: center;
	color:white;
	overflow:hidden;
	line-height: 64px;
}
</style>
