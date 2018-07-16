<template>
    <Layout class="wrap">
      <MyLoading v-if="isLoading" />
      <MyHeader>====MyHeader</MyHeader>
      <Content class="Content">
        <!-- 开始 -->
        <Layout  class="contentBox">
          <Mysider></Mysider>
          <MyContainer></MyContainer>
        </Layout>
        <!-- 结束 -->
      </Content>
      <!-- <MyFooter>===MyFooter</MyFooter> -->
    </Layout>
</template>
<script>

import MyHeader from '@/layout/header'
import Mysider from '@/layout/sider'
import MyFooter from '@/layout/footer'
import MyContainer from '@/layout/container'
import MyLoading from '@/components/loading'

import Store from '@/vuex/store'

export default {
  name: 'App',
  data() {
    return {

    }
  },
  computed: {
    isLoading() {
      return this.$store.state["IS_LOADING"].loading
    }
  },
  mounted: function(){
    let path = this.$router;
    console.log(process.env.NODE_ENV,process.env.BASE_URL,path)
  },
  watch: {
  },
  methods: {
  },
  components: {
    MyHeader,
    Mysider,
    MyFooter,
    MyContainer,
    MyLoading,
  }
}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';
.wrap {
  height:100%;
}
.Content {
  position:relative;
}
.contentBox {
  position:absolute;
  left:0;
  top:0;
  width: 100%;
  height:100%;
  overflow:hidden;

  flex-direction: row !important;
}
</style>
