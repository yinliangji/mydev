<!--  -->
<template>
<div class=''>
    <div>
        <Button type="info">添加</Button>
        <Button type="warning" style="margin-left:10px;">修改</Button>
        <Button type="error" style="margin-left:10px;">删除</Button>
    </div>
    <Table :columns="columns" :data="data" :loading="loading" size="small" class="attachment-table" :show-header='false' style="margin-top:20px;">
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px">查看</Button>
        </template>
    </Table>
    <div style="text-align: right;margin: 16px 0">
        <Page
            :total="total"
            :current.sync="current"
            show-sizer
            ></Page>
    </div>

</div>
</template>

<script>
/* eslint-disable */
import $ from "./table-data.js";
export default {
  components: {},
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "案例编号",
          key: "testcase_id"
        },
        {
          title: "案例名称",
          key: "testcase_name"
        },
        {
          title: "关联用户故事ID",
          key: "relateduserstory"
        },
        {
          title: "关联用户故事",
          key: "relateduserstory"
        },
        {
          title: "案例设计者",
          key: "testdesigner"
        },
        {
          title: "执行结果",
          key: "execresult"
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
</style>
