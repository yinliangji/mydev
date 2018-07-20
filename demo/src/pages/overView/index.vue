<template>
	<div class="pageContent">
		<Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem>当前位置</BreadcrumbItem>
        <BreadcrumbItem>项目概览</BreadcrumbItem>
    </Breadcrumb>
    <div class="pageCon">
      <h3 class="pageConTitle">项目概览</h3>
      <div class="w80">
        <div class="showTop">
          <Row>
            <Col span="2" style="text-align: center">迭代</Col>
            <Col span="6">
              <Select v-model="iterationM" style="width:200px">
                <Option v-for="item in iterationData" :value="item.value" :key="item.value">
                  {{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="2" style="text-align: center">模块</Col>
            <Col span="6">
              <Select v-model="modelM" style="width:200px">
                <Option v-for="item in modelData" :value="item.value" :key="item.value">
                  {{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="2" style="text-align: center">状态</Col>
            <Col span="6">
              <Select v-model="statusM" style="width:200px">
                <Option v-for="item in statusData" :value="item.value" :key="item.value">
                  {{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div class="showCount">
            <div class="showCountL">
              <Button type="info" @click="gotoForm">未开始</Button><br><br>
              <Button type="success">进行中</Button><br><br>
              <Button >已完成</Button>
            </div>
            <div class="showCountR"></div>
        </div>
      </div>
      <div>

      </div>

    </div>
	</div>
</template>

<script>
import { EventBus } from "@/tools";
export default {
  data() {
    return {
      iterationData: [
        {
          value: "iterationAll",
          label: "全部"
        },
        {
          value: "iterationOne",
          label: "迭代一"
        },
        {
          value: "iterationTwo",
          label: "迭代二"
        }
      ],
      iterationM: "",
      modelData: [
        {
          value: "modelAll",
          label: "全部"
        },
        {
          value: "modelOne",
          label: "模块一"
        },
        {
          value: "modelTwo",
          label: "模块二"
        }

      ],
      modelM: "",
      statusData: [
        {
          value: "statusAll",
          label: "全部"
        },
        {
          value: "statusOne",
          label: "未开始"
        },
        {
          value: "statusTwo",
          label: "进行中"
        },
        {
          value: "statusThree",
          label: "已结束"
        }

      ],
      statusM: ""
    };
  },
  mounted() {},
  methods: {
    //分页
    changeCurrentPage(i) {
      alert(i);
    },
    changePageSize(i) {
      alert(i);
    },
    gotoForm(){
      this.$router.push({
        path:"test"
      })
    }
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
