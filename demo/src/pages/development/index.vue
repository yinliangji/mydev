<template>
	<div class="pageContent">
		<Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem>当前位置</BreadcrumbItem>
        <BreadcrumbItem>开发任务管理</BreadcrumbItem>
    </Breadcrumb>
    <div class="pageCon">
      <h3 class="pageConTitle">开发任务管理</h3>
      <kanbanSearch :searchParams="searchParams"></kanbanSearch>
      <div class="w80">

        <Page :total="200" show-sizer show-total  @on-change="changeCurrentPage"
        @on-page-size-change="changePageSize" style="margin:6px 0; text-align:right"></Page>
      </div>
       <kanbanboard
          :cardList="cardList"
          :groupList="groupList"
          :statusList="statusList"
        ></kanbanboard>


    </div>

	</div>
</template>

<script>
import { EventBus } from "@/tools";
import kanbanSearch from "@/components/kanbanSearch";
import kanbanboard from '@/components/kanbanboard';
export default {
  data() {
    return {
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
      console.log("  添加任务  :::", info);
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
    cardList: function() {
      let _cardList = [
        {
          taskId: "#US0001",
          description:
            "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
          userName: "user1",
          userId: "userId_01",
          groupId: "group_01",
          bgColor: { background: "#f8d6af" },
          taskStateStr: "未开始",
          taskState: "01",
          headPortrait: require("@/assets/images/user_02.png")
        },
        {
          taskId: "#US0002",
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
    },
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
    }
  },

  components: {
    kanbanSearch,
    kanbanboard
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
</style>
