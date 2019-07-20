<!--  -->
<template>
<div class='other'>
  <Tabs value="name1">
      <TabPane label="测试管理" name="name1">
        <testMgn></testMgn>
      </TabPane>
      <TabPane label="变更记录" name="name2">
        <changeLog></changeLog>
      </TabPane>
      <TabPane label="评论" name="name3">
        <commentMgn></commentMgn>
      </TabPane>
  </Tabs>
</div>
</template>

<script>
import testMgn from './testMgn'
import changeLog from './changeLog'
import commentMgn from './commentMgn'
export default {
  components: { testMgn, changeLog, commentMgn },
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {
    name: {
      handler (val, oldVal) { /* ... */ },
      deep: true,
      immediate: true
    }
  },
  methods: {

  },
  created () {

  },
  mounted () {

  },
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.other{
  border-top:8px solid #f7f7f7;
  padding-right: 16px;
}
</style>
