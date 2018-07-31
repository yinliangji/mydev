<template>
	<div class="pageContent">
		<Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem>当前位置</BreadcrumbItem>
        <BreadcrumbItem>项目概览</BreadcrumbItem>
    </Breadcrumb>
    <div class="pageCon">


    </div>
	</div>
</template>

<script>

export default {
  data() {
    return {

    };
  },
  mounted() {},
  methods: {

  },
  computed: {},

  components: {}
};
</script>
<style lang="less" scoped>
.pageContent {
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #d7dde4;
  margin-top: 10px;
}
.pageCon {
  background: #fff;
}
.pageConTitle {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 16px;
}
.w80 {
  width: 80%;
  margin: 0 auto;
}
.showTop{margin-bottom: 20px;}
</style>
