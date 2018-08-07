
<template>
  <div class="pageContent">
    <!-- <Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem>当前位置</BreadcrumbItem>
        <BreadcrumbItem>项目概览</BreadcrumbItem>
    </Breadcrumb> -->
    <goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :Top="'10'" />
    <selectMenu></selectMenu>
    <div class="pageCon">
      <Tabs value="name1">
      <TabPane label="项目基本情况" name="name1">

        <!-- <Form :model="formItem" :label-width="100" style="margin-top:16px">
          <Row>
            <Col span="6">
            <FormItem label="选择产品">
              <Select v-model="formItem.product">
                <Option value="1">产品1</Option>
                <Option value="2">产品2</Option>
                <Option value="3">产品3</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="6">
            <FormItem label="选择项目">
              <Select v-model="formItem.project">
                <Option value="1">项目1</Option>
                <Option value="2">项目2</Option>
                <Option value="3">项目3</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>
        </Form> -->

        <div class="pageCon">
          <Row>
            <Col span="12">
            <cyclic :titleName="part1.title1" :data="part1.data1" :name="part1.name1"></cyclic>
            </Col>
            <Col span="12">
            <cyclic :titleName="part1.title2" :data="part1.data2" :name="part1.name2"></cyclic>
            </Col>
          </Row>
          <Row>
            <Col span="12">
            <bar
            :titleName="part1.title4"
            :dataX="part1.data4X"
            :dataY="part1.data4Y"
            :name="part1.name4"
            :barColor="part1.barColor4"
            :xyAxisColor="part1.xyAxisColor4"
            :xAxisName="part1.xAxisName4"
            :yAxisName="part1.yAxisName4"
            :labelOnoff="part1.labelOnoff4"
            :labelColor="part1.labelColor4"
            ></bar>
            </Col>
            <Col span="12">
            <pie :titleName="part1.title3" :data="part1.data3" :name="part1.name3"></pie>
            </Col>
          </Row>

        </div>
      </TabPane>
      <TabPane label="项目开发情况" name="name2">
        <div class="pageCon">
          <Row>
            <Col span="12">
            <lineChart
            :titleName="part1.title5"
            :dataX="part1.data5X"
            :dataY="part1.data5Y"
            :xyAxisColor="part1.xyAxisColor5"
            :xAxisName="part1.xAxisName5"
            :yAxisName="part1.yAxisName5">
            </lineChart>
            </Col>
            <Col span="12">
            <barSection></barSection>
            </Col>
          </Row>


        </div>
        <div style="margin:28px;">
           <h3 class="Title">项目开发情况汇总表</h3>
          <Table stripe  height="300" :columns="tableColumns" :data="tableData"></Table>
        </div>

      </TabPane>
    </Tabs>
    </div>


  </div>
</template>

<script>
import lineChart from "./myChart/line";
import pie from "./myChart/pie";
import cyclic from "./myChart/cyclic";
import bar from "./myChart/bar";
import barSection from "./myChart/barSection";
export default {
    data() {
        return {
          // table表单数据
            tableColumns: [
                {
                    title: "任务总数",
                    key: "taskNum"
                },
                {
                    title: "已完成任务总数",
                    key: "doneTaskNum"
                },
                {
                    title: "构建通过率",
                    key: "passRate"
                },
                {
                    title: "提交次数",
                    key: "subNum"
                },
                {
                    title: "提交代码行数",
                    key: "subCodeLine"
                },
                {
                    title: "缺陷总数",
                    key: "defectNum"
                },
                {
                    title: "已解决缺陷总数",
                    key: "doneDefectNum"
                }
            ],
            tableData: [
                {
                    taskNum: "11",
                    doneTaskNum: "123",
                    passRate: "43%",
                    subNum: "344",
                    subCodeLine: "363",
                    defectNum: "293",
                    doneDefectNum: "33"
                },
                {
                    taskNum: "11",
                    doneTaskNum: "123",
                    passRate: "43%",
                    subNum: "344",
                    subCodeLine: "363",
                    defectNum: "293",
                    doneDefectNum: "33"
                },
                {
                    taskNum: "11",
                    doneTaskNum: "123",
                    passRate: "43%",
                    subNum: "344",
                    subCodeLine: "363",
                    defectNum: "293",
                    doneDefectNum: "33"
                },
                {
                    taskNum: "11",
                    doneTaskNum: "123",
                    passRate: "43%",
                    subNum: "344",
                    subCodeLine: "363",
                    defectNum: "293",
                    doneDefectNum: "33"
                },
                {
                    taskNum: "11",
                    doneTaskNum: "123",
                    passRate: "43%",
                    subNum: "344",
                    subCodeLine: "363",
                    defectNum: "293",
                    doneDefectNum: "33"
                },
                {
                    taskNum: "11",
                    doneTaskNum: "123",
                    passRate: "43%",
                    subNum: "344",
                    subCodeLine: "363",
                    defectNum: "293",
                    doneDefectNum: "33"
                },
                {
                    taskNum: "11",
                    doneTaskNum: "123",
                    passRate: "43%",
                    subNum: "344",
                    subCodeLine: "363",
                    defectNum: "293",
                    doneDefectNum: "33"
                },
                {
                    taskNum: "11",
                    doneTaskNum: "123",
                    passRate: "43%",
                    subNum: "344",
                    subCodeLine: "363",
                    defectNum: "293",
                    doneDefectNum: "33"
                }
            ],
            formItem: {
                product: "",
                project: ""
            },
           // table表单数据
            part1: {
                title1: "人员构成图",
                data1: [
                    { value: 3, name: "总体组" },
                    { value: 10, name: "开发组" },
                    { value: 6, name: "测试组" }
                ],
                name1: "人员占比",
                title2: "用户故事完成情况",
                data2: [
                    { value: 3, name: "未开始" },
                    { value: 10, name: "开发中" },
                    { value: 10, name: "测试中" },
                    { value: 10, name: "已上线" }
                ],
                name2: "故事状态",
                title3: "任务健康状态",
                data3: [
                    { value: 30, name: "快到期" },
                    { value: 30, name: "已完成" },
                    { value: 10, name: "其他" }
                ],
                name3: "健康状态",
                title4:"迭代上线情况",
                data4X:["5.1", "6.1", "7.1", "8.1", "9.1", "10.1"],
                data4Y:[5, 20, 36, 10, 10, 20],
                barColor4:"#66CCFF",
                xyAxisColor4:"#ffcb5b",
                xAxisName4:"时间",
                yAxisName4:"上线情况",
                name4: "迭代",
                labelOnoff4:true,
                labelColor4:"#fff",
                title5:"燃尽图",
                data5X:["5.1", "6.1", "7.1", "8.1", "9.1", "10.1"],
                data5Y:[750, 650, 500, 300, 200, 100, 10],
                xyAxisColor5:"#ffcb5b",
                xAxisName5:"时间",
                yAxisName5:"完成情况",
            }
        };
    },
    mounted() {},
    methods: {},
    computed: {},
    components: {
        lineChart,
        pie,
        cyclic,
        barSection,
        bar
    }
};
</script>
<style lang="less" scoped>
.pageContent {
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
.showTop {
    margin-bottom: 20px;
}
h3.Title{margin-bottom: 15px;}
</style>
