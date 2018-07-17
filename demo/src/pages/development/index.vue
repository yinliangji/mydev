<template>
	<div class="pageContent">
		<Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem>当前位置</BreadcrumbItem>
        <BreadcrumbItem>开发任务管理</BreadcrumbItem>
    </Breadcrumb>
    <div class="pageCon">
      <h3 class="pageConTitle">开发任务管理</h3>
      <kanbanSearch :searchParams="searchParams"></kanbanSearch>

      <Header>
        <Row :gutter="10">
          <Col span="2" style="margin-right:10px">
            <Button style="border: 1px dashed #ccc;"
            @click="addNewTask">添加任务</Button>
          </Col>
          <Col span="1">
            <img src="@/assets/images/product-list.png" @click="showList" class="cursor">
          </Col>
          <Col span="1">
            <img src="@/assets/images/product-kanban.png" @click="showTask" class="cursor">
          </Col>
          <Col span="1" >
            <span class="high">
                高
            </span>
          </Col>
          <Col span="1">
            <span class="middle">
                中
            </span>
          </Col>
          <Col span="1">
            <span class="low">
                低
            </span>
          </Col>
        </Row>
      </Header>
      <Modal
        v-model="addTaskOnoff"
        title="添加任务"
        width="500"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="addTaskTable">
            <div class="taskrow clearfix">
              <div class="addTaskTableTitle">任务名称：</div>
              <div class="addTaskTableCon">
                <Input v-model="taskName" style="width:200px"></Input>
              </div>
            </div>
            <div class="taskrow clearfix">
              <div class="addTaskTableTitle">责任人：</div>
              <div class="addTaskTableCon">
                <Input v-model="personLiable" style="width:200px"></Input>
              </div>
            </div>
            <div class="taskrow clearfix" style="height:70px;">
              <div class="addTaskTableTitle">任务描述：</div>
              <div class="addTaskTableCon">
                <Input v-model="describe" type="textarea"
                style="width:200px" placeholder="描述..."></Input>
              </div>
            </div>
            <div class="taskrow clearfix">
              <div class="addTaskTableTitle">所属待办事项：</div>
              <div class="addTaskTableCon">
                <Select v-model="curNeed" style="width:200px">
                    <Option v-for="item in ownNeed" :value="item.value" :key="item.value">
                      {{ item.label }}</Option>
                </Select>
              </div>
            </div>

        </div>
      </Modal>
      <component :is="currentView"
        :cardList="cardList"
        :groupList="groupList"
        :statusList="statusList">
      </component>
    </div>
	</div>
</template>

<script>
import { EventBus } from "@/tools";
import kanbanSearch from "@/components/kanbanSearch";
import kanbanboard from "@/components/kanbanboard";
import developList from "@/pages/development/development";
export default {
  data() {
    return {
      addTaskOnoff: false,
      currentView: "developList",
      ismodalShow: false,
      radioType: "选择文件",
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
          key: "name",
          render: (h, params) => {
            return h(
              "a",
              {
                domProps: {
                  href: "#"
                }
              },
              params.row.name
            );
          }
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
                      this.showModal(params);
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
            name: "prj001",
            dec: "TPM敏捷管理系统",
            startTime: "2017-08-01",
            endTime: "2018-05-01"
          },
          {
            id: 3,
            number: "001",
            name: "prj001",
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
              id: 4,
              number: "002",
              name: "prj001",
              dec: "TPM敏捷管理系统1",
              startTime: "2017-08-01",
              endTime: "2018-05-01"
            },
            {
              id: 5,
              number: "002",
              name: "prj001",
              dec: "TPM敏捷管理系统1",
              startTime: "2017-08-01",
              endTime: "2018-05-01"
            },
            {
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
              id: 7,
              number: "003",
              name: "prj001",
              dec: "TPM敏捷管理系统2",
              startTime: "2017-08-01",
              endTime: "2018-05-01"
            },
            {
              id: 8,
              number: "003",
              name: "prj001",
              dec: "TPM敏捷管理系统2",
              startTime: "2017-08-01",
              endTime: "2018-05-01"
            },
            {
              id: 9,
              number: "003",
              name: "prj001",
              dec: "TPM敏捷管理系统2",
              startTime: "2017-08-01",
              endTime: "2018-05-01"
            }
          ]
        }
      ],
      ownNeed: [
        {
          value: "taskvalue1",
          label: "用户界面设计1"
        },
        {
          value: "taskvalue2",
          label: "用户界面设计2"
        },
        {
          value: "taskvalue3",
          label: "用户界面设计3"
        },
        {
          value: "taskvalue4",
          label: "用户界面设计4"
        }
      ],
      curNeed: "",
      taskName:"",
      personLiable:"",
      describe:""

    };
  },
  mounted() {
    EventBus.$on("moveEnd", this.moveEnd);
    EventBus.$on("clickItem", this.clicked);
    EventBus.$on("search", this.searchHandle);
    EventBus.$on("addTask", this.addNewTask);
  },
  methods: {
    moveEnd(info) {
      // 移动卡片结束后
      console.log(" 移动卡片结束后 :::", info);
    },
    clicked(info) {
      // 点击卡片方法
      console.log(" 点击卡片方法 ::: ", info);
    },
    searchHandle(info) {
      // 查询方法
      console.log("查询  ::: ", info);
    },
    addNewTask(info) {
      this.addTaskOnoff = true;
    },
    ok() {
      alert("添加成功");
    },
    cancel() {
      alert("取消添加");
    },
    // addNewTask(info) {
    //   EventBus.$emit("addTask", info);
    // },
    showList() {
      this.currentView = "developList";
    },
    showTask() {
      this.currentView = "kanbanboard";
    },
    //分页
    changeCurrentPage(i) {
      alert(i);
    },
    changePageSize(i) {
      alert(i);
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
        },
        {
          type: "input",
          label: "需求名称",
          params: "needName"
        },
        {
          type: "input",
          label: "任务状态",
          params: "taskStatus"
        },
        {
          type: "input",
          label: "所属迭代",
          params: "belongIteration"
        },
        {
          type: "input",
          label: "责任人",
          params: "personLiable"
        }
      ];
    },
    //所有卡片数据
    cardList: function() {
      let _cardList = [
        {
          taskId: "#US0001",
          taskName:"任务名1",
          description:
            "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
          userName: "user1",
          userId: "userId_01",
          groupId: "group_01",
          bgColor: { background: "#b3ecec" },
          taskStateStr: "未开始",
          taskState: "01",
          headPortrait: require("@/assets/images/user_02.png")
        },
        {
          taskId: "#US0002",
          taskName:"任务名2",
          description:
            "设计开发-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
          userName: "user1",
          userId: "userId_02",
          groupId: "group_02",
          bgColor: { background: "#f8d6af" },
          taskStateStr: "设计开发",
          taskState: "02",
          headPortrait: require("@/assets/images/user_02.png")
        },
        {
          taskId: "#US0003",
          description:
            "设计开发-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
          userName: "user1",
          userId: "userId_03",
          groupId: "group_01",
          bgColor: { background: "#f8d6af" },
          taskStateStr: "测试",
          taskState: "02",
          headPortrait: require("@/assets/images/user_02.png")
        },
        {
          taskId: "#US0004",
          description:
            "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
          userName: "user1",
          userId: "userId_04",
          groupId: "group_03",
          bgColor: { background: "#f8d6af" },
          taskStateStr: "测试",
          taskState: "01",
          headPortrait: require("@/assets/images/user_02.png")
        },
        {
          taskId: "#US0005",
          description:
            "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
          userName: "user1",
          userId: "userId_05",
          groupId: "group_01",
          bgColor: { background: "#f8d6af" },
          taskStateStr: "测试",
          taskState: "04",
          headPortrait: require("@/assets/images/user_02.png")
        },
        {
          taskId: "#US0006",
          description:
            "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
          userName: "user1",
          userId: "userId_06",
          groupId: "group_01",
          bgColor: { background: "#f8d6af" },
          taskStateStr: "测试",
          taskState: "01",
          headPortrait: require("@/assets/images/user_02.png")
        },
        {
          taskId: "#US0007",
          description:
            "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
          userName: "user1",
          userId: "userId_07",
          groupId: "group_01",
          bgColor: { background: "#f8d6af" },
          taskStateStr: "测试",
          taskState: "01",
          headPortrait: require("@/assets/images/user_02.png")
        },
        {
          taskId: "#US0008",
          description:
            "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
          userName: "user1",
          userId: "userId_08",
          groupId: "group_01",
          bgColor: { background: "#f8d6af" },
          taskStateStr: "测试",
          taskState: "03",
          headPortrait: require("@/assets/images/user_02.png")
        }
      ];
      return _cardList;
    },
    //左侧分组数据
    groupList: function() {
      let _groupList = [
        { text: "产品待办事项" },
        {
          text: "用户登录",
          groupId: "group_01"
        },
        {
          text: "创建代码仓库",
          groupId: "group_02"
        },
        {
          text: "未知项",
          groupId: "group_03"
        }
      ];
      return _groupList;
    },
    //水平显示任务数
    statusList: function() {
      let _statusList = [
        {
          stateStr: "未开始",
          state: "01",
          taskNumber: "3"
        },
        {
          stateStr: "设计开发",
          state: "02",
          taskNumber: "4"
        },
        {
          stateStr: "测试",
          state: "03",
          taskNumber: "5"
        },
        {
          stateStr: "发布",
          state: "04",
          taskNumber: "6"
        },
        {
          stateStr: "上线",
          state: "05",
          taskNumber: "3"
        }
      ];
      return _statusList;
    }
  },

  components: {
    kanbanSearch,
    kanbanboard,
    developList
  }
};
</script>
<style lang="less" scoped>
//头部
.ivu-layout-header {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
span.high {
  background: #f8d6af;
  width: 100%;
  height: 25px;
  display: inline-block;
  line-height: 25px;
  text-align: center;
}
span.middle {
  background: #b3ecec;
  width: 100%;
  height: 25px;
  display: inline-block;
  line-height: 25px;
  text-align: center;
}
span.low {
  background: #f2e1f0;
  width: 100%;
  height: 25px;
  display: inline-block;
  line-height: 25px;
  text-align: center;
}
</style>
