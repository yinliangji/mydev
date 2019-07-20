<!-- 附件列表  -->
<template>
<div class=''>
    <Table :columns="columns" :data="data" :loading="loading" size="small" class="attachment-table" :show-header='false'>
        <template slot-scope="{ row, index }" slot="action">
            <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
            <Button type="error" size="small" @click="remove(index)">Delete</Button> -->
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
    <Form :model="formItem" :label-width="0" style="margin-top:20px">
        <FormItem>
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary">提交</Button>
            <Button style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
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
          title: "姓名",
          key: "name"
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
      size: 10,
      formItem: {
        textarea: ""
      }
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
