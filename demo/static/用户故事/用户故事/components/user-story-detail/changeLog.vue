<!-- 附件列表  -->
<template>
<div class=''>
    <Table :columns="columns" :data="data" :loading="loading" size="small" class="attachment-table" :show-header='false'>
        <template slot-scope="{ row, index }" slot="action">
        </template>
    </Table>
    <div style="text-align: right;margin: 16px 0">
        <Page
            :total="total"
            :current.sync="current"
            show-sizer></Page>
    </div>
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
