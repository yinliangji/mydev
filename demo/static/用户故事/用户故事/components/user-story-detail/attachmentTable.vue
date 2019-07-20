<!-- 附件列表  -->
<template>
<div class='attachment-list'>
  <Upload action="//jsonplaceholder.typicode.com/posts/" style="margin-left:85px;">
      <Button icon="ios-cloud-upload-outline" size='small'>文件上传</Button>
  </Upload>
    <Table :columns="columns" :data="data" :loading="loading" size="small" class="attachment-table" :show-header='false'>
        <template slot-scope="{ row }" slot="filename">
          <a @click="listFileDown">{{row.filename}}</a>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">在线预览</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
    </Table>
    <!-- <div style="text-align: right;margin: 16px 0">
        <Page
            :total="total"
            :current.sync="current"
            show-sizer
            @on-change="getData"
            @on-page-size-change="handleChangeSize"></Page>
    </div> -->
</div>
</template>

<script>
/* eslint-disable */
export default {
  components: {},
  data() {
    return {
      columns: [
        {
          title: "文件名",
          key: "filename"
        },
        {
          title: "文件大小",
          key: "filesize"
        },
        {
          title: "创建者",
          key: "creater"
        },
        {
          title: "创建时间",
          key: "created_time"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      data: [],
      loading: false,
      total: 0,
      current: 1,
      size: 10
    };
  },
  computed: {},
  watch: {
    name: {
      handler(val, oldVal) {
        /* ... */
      },
      deep: true,
      immediate: true
    }
  },
  methods: {    
  },
  created() {},
  mounted() {
  },
  beforeDestroy() {}
};
</script>
<style lang='less' scoped>
.attachment-list{
  padding-right: 16px;
  position: relative;
  margin-top: -35px;
}
.attachment-table {
  margin-left: 85px;
  padding-right: 16px;
  margin-bottom: 10px;
}
</style>
