<!-- 用户故事详情左侧 -->
<template>
<div class='user-story-detail-right'>
    <Form :model="userStoryFormRight" label-position="left" :label-width="85">
        <FormItem label="故事类型">
            <Select v-model="userStoryFormRight.userstory_type" v-if="!isDetail">
              <!-- <Option>11</Option> -->
            </Select>
            <span v-else>
              {{ userStoryFormRight.userstory_type }}
            </span>
        </FormItem>
        <FormItem label="所属迭代">
            <Select v-model="userStoryFormRight.sprint_name" v-if="!isDetail">
              <!-- <Option>11</Option> -->
            </Select>
            <span v-else>
              {{ userStoryFormRight.sprint_name }}
            </span>
        </FormItem>
        <FormItem label="所属需求项">
            <Select v-model="userStoryFormRight.req_name" v-if="!isDetail">
              <!-- <Option>11</Option> -->
            </Select>
            <span v-else>
             {{ userStoryFormRight.req_name }}
            </span>
        </FormItem>
        <FormItem label="优先级">
            <RadioGroup v-model="userStoryFormRight.proi" v-if="!isDetail">
                <Radio label="高"></Radio>
                <Radio label="中"></Radio>
                <Radio label="低"></Radio>
            </RadioGroup>
            <span v-else>
              {{ userStoryFormRight.proi }}
            </span>
        </FormItem>
        <FormItem label="责任人">
            <Select v-model="userStoryFormRight.nick_name" v-if="!isDetail">
              <!-- <Option>11</Option> -->
            </Select>
            <span v-else>
              {{ userStoryFormRight.nick_name }}
            </span>
        </FormItem>
        <FormItem label="协助人">
            <Button type="primary" v-if="!isDetail" size='small'>添加责任人</Button>
            <span v-else>
              <span v-for="item in userStoryFormRight.assist_list" :key="item">
                {{ item.nick_name }}
              </span>
            </span>
        </FormItem>
        <FormItem label="所属项目">
            <span>
              {{ userStoryFormRight.prj_name }}
            </span>
        </FormItem>
        <FormItem label="创建时间">
            <span>
             {{ userStoryFormRight.created_time }}
            </span>
        </FormItem>
        <FormItem label="故事状态">
             <RadioGroup v-model="userStoryFormRight.userstory_state" v-if="!isDetail">
                <Radio label="提出"></Radio>
                <Radio label="分析设计"></Radio>
                <Radio label="用户验收测试"></Radio>
                <Radio label="待投产"></Radio>
                <Radio label="已投产"></Radio>
                <Radio label="开发测试"></Radio>
                <Radio label="停滞"></Radio>
                <Radio label="废弃"></Radio>
            </RadioGroup>
            <span v-else>
              {{ userStoryFormRight.userstory_state }}
            </span>
        </FormItem>
        <FormItem label="用户故事点数">
            <InputNumber :min="0" v-model="userStoryFormRight.manHours" v-if="!isDetail"></InputNumber>
            <span v-else>
             {{ userStoryFormRight.manHours }}
            </span>
        </FormItem>
        <FormItem label="故事编号">
            <span>
              {{ userStoryFormRight.userstory_id }}
            </span>
        </FormItem>
        <FormItem label="关联工作项">
            <span>
              {{ userStoryFormRight.complete_mission}} / {{userStoryFormRight.mission}}
            </span>
        </FormItem>
        <FormItem label="依赖项">
            <Button type="primary" v-if="!isDetail" size='small'>添加依赖项</Button>
            <span v-else>
              <span v-for="(item, index) in userStoryFormRight.depd_list" :key='item'>
                [<a @click="depdPop(item,index)">{{item.depd_name}}</a>]
              </span>
            </span>
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
      userStoryFormRight: {
        userstory_type: '',
        sprint_name: '',
        req_name: '',
        proi: '',
        nick_name: '',
        assist_list: [],
        prj_name: '',
        created_time: '',
        userstory_state: '',
        manHours: 0,
        userstory_id: '',
        depd_list: []
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
.user-story-detail-right {
  background-color: #fff;
  word-break: break-all;
  padding-left: 16px;
  .ivu-form-item {
    margin-bottom: 10px;
  }
}
</style>
