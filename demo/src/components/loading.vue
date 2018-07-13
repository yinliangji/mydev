<template>
    <div class="loading">
        <Row>
            <Col class="demo-spin-col" span="8">
                <Spin fix>
                    <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                    <div>{{loadMsg}}</div>
                </Spin>
            </Col>

        </Row>
    </div>
</template>
<script>
export default {
    name: 'isloading',
    computed: {
        loadMsg() {
            return this.$store.state["IS_LOADING"].message
        },
    },

}
</script>
<style lang="less" scoped>
.loading {
  position:fixed;
  left:0;
  top:0;
  width: 100%;
  height:100%;
  background:rgba(0,0,0,0.5);
  z-index: 1000;
}
.ivu-row {
  width: 100%;
  height:100%;
}
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100%;
    width: 100%;
    position: relative;
    border: none;
}
.ivu-spin-fix {
  background:none;
}
</style>