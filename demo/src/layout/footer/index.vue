<template>
	<Footer>
        
        <MyFooterCont />
    </Footer>
</template>
<script>
import MyFooterCont from 'foot'
export default {
    components: {
        MyFooterCont,
    }
}
</script>
<style lang="less" scoped>
.ivu-layout-header {
    //background: red;
    padding: 0;
    height: 64px;
    line-height: normal;
}
.ivu-layout-footer {
    //background: yellow;
    padding: 0;
    //color: #495060;
    //font-size: 14px;
    height:50px;
}
</style>