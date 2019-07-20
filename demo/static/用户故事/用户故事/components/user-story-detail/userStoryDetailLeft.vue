<!-- 用户故事详情左侧 -->
<template>
<div class='user-story-detail-left'>
    <Form :model="userStoryFormLeft" label-position="left" :label-width="85">
        <FormItem label="故事名称">
            <Input v-model="userStoryFormLeft.userstory_name" v-if="!isDetail"/>
            <span v-else>
              {{ userStoryFormLeft.userstory_name }}
            </span>
        </FormItem>
        <FormItem label="故事描述">
            <Input v-model="userStoryFormLeft.userstory_desc" v-if="!isDetail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
            <span v-else>
              {{ userStoryFormLeft.userstory_desc }}
            </span>
        </FormItem>
        <FormItem label="验收标准">
            <Input v-model="userStoryFormLeft.us_accept" v-if="!isDetail" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
            <span v-else>
              {{ userStoryFormLeft.us_accept }}
            </span>
        </FormItem>
        <FormItem label="附件信息">          
        </FormItem>
    </Form>
</div>
</template>

<script>
export default {
  name: 'userStoryDetailLeft',
  props: {
    isDetail: Boolean
  },
  components: {},
  data () {
    return {
      userStoryFormLeft: {
        userstory_name: '',
        userstory_desc: '',
        us_accept: ''
      }
    }
  },
  computed: {},
  watch: {
    name: {
      handler (val, oldVal) {
        /* ... */
      },
      deep: true,
      immediate: true
    }
  },
  methods: {},
  created () {},
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.user-story-detail-left {
  background-color: #fff;
  word-break: break-all;
  padding-right: 16px;
  .ivu-form-item{
    margin-bottom: 10px;
  }
}
</style>
