<template>
	<div class="pageContent">
		<Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem>当前位置</BreadcrumbItem>
        <BreadcrumbItem>迭代管理</BreadcrumbItem>
    </Breadcrumb>
    <div class="pageCon">
      <h3 class="pageConTitle">迭代管理</h3>
      <kanbanSearch :searchParams="searchParams"></kanbanSearch>
      <div class="w80">
        <Button type="primary" icon="ios-cloud-upload-outline"
        style="margin:6px 0" @click="addIteration">添加</Button>
        <Button type="primary"  @click="showModalList">归档</Button>
        <div class="orange">
          <div class="un-plan">
            <Table border @on-selection-change="handleRowChange" ref="Selection"
                :columns="column1"
                :data="Table1.list">
            </Table>

             <Page :total="200" show-sizer show-total  @on-change="changeCurrentPage"
        @on-page-size-change="changePageSize" style="margin:6px 0; text-align:right"></Page>

            <Button @click="handleSelectAll(true)">全选</Button>
            <Button @click="handleSelectAll(false)">取消全选</Button>

          </div>
          <!-- 迭代归档 -->
          <Modal
              v-model="ismodalShow"
              title="迭代归档"
              @on-ok="ok()">
            <Radio-Group v-model="radioType">
              <Radio label="选择已有归档"></Radio>
              <Radio label="新建"></Radio>
            </Radio-Group>
            <br>
            <Select v-model="choseType" style="width:250px;margin:20px auto" v-if="radioType=='选择已有归档'">
              <Option v-for="item in obj" :value="item.type" :key="item.type">{{item.name}}
              </Option>
            </Select>
            <div v-if="radioType=='新建'">
              <Input v-model="newName" placeholder="请输入项目名称" clearable style="width: 250px;margin:10px auto"></Input>
              <br>
              <Input v-model="newStart" placeholder="请输入开始时间" clearable style="width: 250px;margin:10px auto"
                      type="date"></Input>
              <br>
              <Input v-model="newEnd" placeholder="请输入结束时间" clearable style="width: 250px;margin:10px auto"
                      type="date"></Input>
              <br>
            </div>
          </Modal>
          <!-- 添加迭代面板 -->
          <Modal
            v-model="addTaskOnoff"
            title="添加迭代"
            width="500"
            @on-ok="addIterationOk">
            <div class="addTaskTable">
                <div class="taskrow clearfix">
                  <div class="addTaskTableTitle">迭代名称：</div>
                  <div class="addTaskTableCon">
                    <Input v-model="taskName" style="width:200px"></Input>
                  </div>
                </div>
                <div class="taskrow clearfix">
                  <div class="addTaskTableTitle">开始时间：</div>
                  <div class="addTaskTableCon">
                    <DatePicker type="date" placeholder="开始时间" style="width: 200px"
                    v-model="startTime" @on-change="TimeAction"></DatePicker>
                  </div>
                </div>
                <div class="taskrow clearfix" style="height:70px;">
                  <div class="addTaskTableTitle">结束时间：</div>
                  <div class="addTaskTableCon">
                    <DatePicker type="date" placeholder="结束时间" style="width: 200px"
                    v-model="endTime" @on-change="TimeAction"></DatePicker>
                  </div>
                </div>


            </div>
          </Modal>
          <!--取消归档弹出框 -->
          <Modal class-name="confirm"
              v-model="cancelIteration"
              width="300">

              <p slot="header" style="color:#f60;text-align:center">
                  <Icon type="information-circled"></Icon>
                  <span>提示</span>
              </p>
              <div style="text-align:center">
                  <p>确定取消归档吗?</p>
              </div>
              <div slot="footer">
                  <Button type="error" size="large" long  @click="delSure">删除</Button>

              </div>
          </Modal>
          <div class="paln1 paln" v-for="item in obj" :key="item.name">
            <div class="plan-title">
               <span>{{item.name}}
              {{item.startTime}}--{{item.startTime}}</span>
              <span class="plan-title-btn" @click="item.isShow = false" v-show="item.isShow">隐藏</span>
              <span class="plan-title-btn" @click="item.isShow = true" v-show="!item.isShow">显示</span>
            </div>
            <Table border :columns="column2" :data="item.list" v-if="item.isShow"></Table>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import { EventBus } from "@/tools";
import kanbanSearch from "@/components/kanbanSearch";
export default {
  data() {
    return {
      iterationIndex: 0,
      delIndex: 0,
      cancelDom: {},
      cancelIteration: false,
      taskName: "",
      startTime: "",
      endTime: "",
      addTaskOnoff: false,
      ismodalShow: false,
      radioType: "选择已有归档",
      index: 2,
      choseType: "", // 选择迭代到的类型
      newName: "",
      newStart: "",
      newEnd: "",
      curSelectSingleId: 0, // 当前选择的要规划的项
      curSelelectList: [], // 当前选择得要规划得list
      isHandleMore: false, // 是否点击了多列按钮 规划
      column1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "迭代编号",
          key: "number"
        },
        {
          title: "迭代名称",
          key: "name"
        },
        {
          title: "开始时间",
          key: "startTime"
        },
        {
          title: "结束时间",
          key: "endTime"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "20px",
                    color: "#2baee9",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      // this.showModal(params);
                      //点击跳转页面
                      this.$router.push({
                        path: "/iteration/iteration",
                        query: {
                          iterationName: params.row.name
                        }
                      });
                    }
                  }
                },
                "规划迭代"
              ),
              h(
                "span",
                {
                  style: {
                    color: "#f90",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.fillEdit(params.index);
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      column2: [
        {
          title: "迭代编号",
          key: "number"
        },
        {
          title: "迭代名称",
          key: "name"
        },
        {
          title: "开始时间",
          key: "startTime"
        },
        {
          title: "结束时间",
          key: "endTime"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    marginRight: "20px",
                    color: "#2baee9",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.cancelModal(params.row.id, params.row.type);
                    }
                  }
                },
                "取消归档"
              )
            ]);
          }
        }
      ],
      Table1: {
        type: 0, // 未规划
        name: "未规划迭代",
        list: [
          {
            id: 1,
            number: "001",
            name: "prj001",
            dec: "TPM敏捷管理系统",
            startTime: "2017-08-01",
            endTime: "2018-05-01"
          },
          {
            id: 2,
            number: "001",
            name: "prj002",
            dec: "TPM敏捷管理系统",
            startTime: "2017-08-01",
            endTime: "2018-05-01"
          },
          {
            id: 3,
            number: "001",
            name: "prj003",
            dec: "TPM敏捷管理系统",
            startTime: "2017-08-01",
            endTime: "2018-05-01"
          }
        ]
      },
      obj: [
        {
          type: 1,
          name: "TPM产品第一阶段1",
          startTime: "2017-08-01",
          endTime: "2017-08-01",
          isShow: false,
          list: [
            {
              type: 1,
              id: 4,
              number: "002",
              name: "prj001",
              dec: "TPM敏捷管理系统1",
              startTime: "2017-08-01",
              endTime: "2018-05-01"
            },
            {
              type: 1,
              id: 5,
              number: "002",
              name: "prj001",
              dec: "TPM敏捷管理系统1",
              startTime: "2017-08-01",
              endTime: "2018-05-01"
            },
            {
              type: 1,
              id: 6,
              number: "002",
              name: "prj001",
              dec: "TPM敏捷管理系统1",
              startTime: "2017-08-01",
              endTime: "2018-05-01"
            }
          ]
        },
        {
          type: 2,
          name: "TPM产品第二阶段",
          startTime: "2017-08-01",
          endTime: "2017-08-01",
          isShow: false,
          list: [
            {
              type: 2,
              id: 7,
              number: "003",
              name: "prj001",
              dec: "TPM敏捷管理系统2",
              startTime: "2017-08-01",
              endTime: "2018-05-01"
            },
            {
              type: 2,
              id: 8,
              number: "003",
              name: "prj001",
              dec: "TPM敏捷管理系统2",
              startTime: "2017-08-01",
              endTime: "2018-05-01"
            },
            {
              type: 2,
              id: 9,
              number: "003",
              name: "prj001",
              dec: "TPM敏捷管理系统2",
              startTime: "2017-08-01",
              endTime: "2018-05-01"
            }
          ]
        }
      ]
    };
  },
  mounted() {
    EventBus.$on("moveEnd", this.moveEnd);
    EventBus.$on("clickItem", this.clicked);
    EventBus.$on("search", this.searchHandle);
    EventBus.$on("addTask", this.addNewTask);
  },
  methods: {
    delSure() {
      this.obj[this.iterationIndex].list.splice(this.delIndex, 1);
      this.Table1.list.push(this.cancelDom);
      this.cancelIteration = false;
    },
    //添加按钮
    addIteration() {
      this.addTaskOnoff = true;
      this.startTime = "";
      this.endTime = "";
    },
    //添加迭代确认按钮
    addIterationOk() {
      alert("sfjef");
    },
    TimeAction() {},

    // 归档按钮
    showModalList() {
      this.ismodalShow = true;
      this.isHandleMore = true;
      this.newName = "";
      this.newStart = "";
      this.newEnd = "";
    },
    // 显示规划迭代面板
    // showModal(params) {
    //   this.curSelectSingleId = params.row.id;
    //   this.ismodalShow = true;
    //   this.isHandleMore = false;
    //   this.newName = "";
    //   this.newStart = "";
    //   this.newEnd = "";
    // },
    //分页
    changeCurrentPage(i) {
      alert(i);
    },
    changePageSize(i) {
      alert(i);
    },
    //迭代规划+编辑
    fillEdit() {
      alert("编辑");
    },
    handleRowChange(Selection) {
      this.curSelelectList = Selection;
    },
    //取消归档
    cancelModal(id, type) {
      this.cancelIteration = true;
      console.log(id, type);
      this.iterationIndex = this.obj.findIndex(n => n.type === type);
      this.delIndex = this.obj[this.iterationIndex].list.findIndex(
        n => n.id === id
      );
      this.cancelDom = this.obj[this.iterationIndex].list.find(
        n => n.id === id
      );
      // if (!item.length) {
      //   list.list.push(item);
      // } else {
      //   let iterationList = list.list;
      //   list.list = [...iterationList, ...item];
      // }
    },

    // 全选按钮
    handleSelectAll(status) {
      this.$refs.Selection.selectAll(status);
    },

    //点击归档面板确认按钮
    ok() {
      let item = this._setIterativeItem();
      if (typeof item === "undefined") {
        return;
      }
      if (this.radioType === "新建") {
        if (!this.newName) {
          this.$Message.info("请输入名称");
          return;
        }
        if (!this.newStart) {
          this.$Message.info("请输入开始时间");
          return;
        }
        if (!this.newEnd) {
          this.$Message.info("请输入结束时间");
          return;
        }
        this._createNewIteration(item);
      } else {
        let list = this.obj.find(n => n.type === this.choseType);
        if (!item.length) {
          list.list.push(item);
        } else {
          let iterationList = list.list;
          list.list = [...iterationList, ...item];
        }
      }
      this._deleteIterationItem(item);
    },
    // 需要进行归档的迭代
    _setIterativeItem() {
      let item = [];
      if (this.isHandleMore && this.curSelelectList.length) {
        item = this.curSelelectList;
      } else if (this.isHandleMore && !this.curSelelectList.length) {
        this.$Message.info("请选择要归档的内容");
        return;
      } else {
        item = this.Table1.list.find(n => n.id === this.curSelectSingleId);
      }
      return item;
    },
    // 创建一个新得迭代类目 数据
    _createNewIteration(items) {
      let data = {
        type: this.index + 1,
        name: this.newName,
        startTime: this.newStart,
        endTime: this.newEnd,
        isShow: false,
        list: []
      };
      data.list.push(items);
      this.obj.push(data);
    },
    _deleteIterationItem(items) {
      var self = this;
      let delItem = [];
      if (!items.length) {
        delItem = self.Table1.list.splice(
          self.Table1.list.findIndex(item => item.id === items.id),
          1
        );
      } else {
        for (let a of items.valueOf()) {
          delItem = self.Table1.list.splice(
            self.Table1.list.findIndex(item => item.id === a.id),
            1
          );
        }
      }
    }
  },
  computed: {
    searchParams: function() {
      return [
        {
          type: "input",
          label: "迭代名称",
          params: "iterationName"
        },
        {
          type: "input",
          label: "迭代编号",
          params: "iterationNumber"
        }
      ];
    }
  },
  created() {},

  components: {
    kanbanSearch
  }
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
.ivu-breadcrumb {
  padding-left: 10px;
}

//orange
.orange {
  padding: 20px;
}
.iterative-container {
  font-size: 14px;
  width: 80%;
  margin: 0 auto;
  padding-top: 30px;
}

.paln {
  margin: 30px auto;
}

.plan-title {
  margin-bottom: 10px;
}

.plan-title > i {
  margin-left: 30px;
}

.plan-title-btn {
  color: #2b81af;
  cursor: pointer;
  padding-left: 20px;
}
</style>
