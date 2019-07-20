<template>
  <div class="hello">
    <Button type="primary" @click="userStoryDetail.show=true">抽屉按钮</Button>
    <Drawer
            :title="userStoryDetail.title"
            v-model="userStoryDetail.show"
            width="980"
            :mask-closable="true"
            :styles="userStoryDetail.styles"
    >
    <div slot="header">
      {{userStoryDetail.title}}
      <Button type="primary" class="edit-btn" size='small' v-if="userStoryDetail.isDetail" @click="editUserStory">编辑</Button>
      <Button type="primary" class="edit-btn" size='small' v-else @click="submitUserStory">提交</Button>
    </div>
    <Row :gutter="0">
        <Col span="18" style="border-right:8px solid #f7f7f7;">
          <userStoryDetailLeft :isDetail='userStoryDetail.isDetail'></userStoryDetailLeft>
          <attachmentTable></attachmentTable>
          <otherIfo></otherIfo>
        </Col>
        <Col span="6">
          <userStoryDetailRight :isDetail='userStoryDetail.isDetail'></userStoryDetailRight>
        </Col>
    </Row>
  </Drawer>
  </div>
</template>

<script>
import userStoryDetailLeft from './user-story-detail/userStoryDetailLeft'
import userStoryDetailRight from './user-story-detail/userStoryDetailRight'
import attachmentTable from './user-story-detail/attachmentTable'
import otherIfo from './user-story-detail/otherIfo'

export default {
  name: 'HelloWorld',
  components: { userStoryDetailLeft, userStoryDetailRight, attachmentTable, otherIfo },
  data () {
    return {
      userStoryDetail: {
        title: '用户故事详情',
        show: false,
        // 详情还是编辑
        isDetail: true,
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '0px',
          position: 'static',
          // backgroundColor: '#f7f7f7'
          backgroundColor: '#fff'
        }
      }
    }
  },
  methods: {
    editUserStory () {
      this.userStoryDetail.isDetail = false
    },
    submitUserStory () {
      this.userStoryDetail.isDetail = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.edit-btn {
  float: right;
  margin-right: 30px;
}
</style>
