<template>
  <div class="pageContent">
    <!-- <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>当前位置</BreadcrumbItem>
      <BreadcrumbItem>开发任务管理</BreadcrumbItem>
    </Breadcrumb> -->
    <selectMenu></selectMenu>
    <div class="pageCon">

      <div class="newTop">
        <h3 class="Title">开发任务管理</h3>
        <Form>
          <Row>
            <Col span="15">
            <Row>
              <Col span="3" style="text-align: center">
              <div class="searchName">迭代名称</div>
              </Col>
              <Col span="5">
              <FormItem>
                <Input placeholder="输入迭代名称" v-model="iterationName"></Input>
              </FormItem>
              </Col>
              <Col span="3" style="text-align: center">
              <div class="searchName">迭代编号</div>
              </Col>
              <Col span="5">
              <FormItem>
                <Input placeholder="输入迭代编号" v-model="iterationNumber"></Input>
              </FormItem>
              </Col>
              <Col span="3" style="text-align: center">
              <div class="searchName">需求名称</div>
              </Col>
              <Col span="5">
              <FormItem>
                <Input placeholder="输入迭代编号" v-model="needName"></Input>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="3" style="text-align: center">
              <div class="searchName">任务状态</div>
              </Col>
              <Col span="5">
              <FormItem>
                <Input placeholder="输入迭代名称" v-model="taskStatus"></Input>
              </FormItem>
              </Col>
              <Col span="3" style="text-align: center">
              <div class="searchName">所属迭代</div>
              </Col>
              <Col span="5">
              <FormItem>
                <Input placeholder="输入迭代编号" v-model="belongIteration"></Input>
              </FormItem>
              </Col>
              <Col span="3" style="text-align: center">
              <div class="searchName">责任人</div>
              </Col>
              <Col span="5">
              <FormItem>
                <Input placeholder="输入迭代编号" v-model="personLiable"></Input>
              </FormItem>
              </Col>
            </Row>
            </Col>
            <Col span="4" style="text-align: left" class="serchBtnBox">
            <Button type="primary" icon="ios-search" class="serchBtn">查询</Button>
            </Col>
          </Row>

        </Form>
      </div>
      <div class="w80">
        <Row :gutter="16" style="margin-bottom:10px">
          <Col span="2" style="margin-right:10px;margin-top: -2px;">
          <Button type="success" @click="addNewTask">添加任务</Button>
          </Col>
          <Col span="1">
          <img src="@/assets/images/product-list.png" @click="showList" class="cursor">
          </Col>
          <Col span="1">
          <img src="@/assets/images/product-kanban.png" @click="showTask" class="cursor">
          </Col>
          <Col span="1">
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
      </div>

      <component :is="currentView" :cardList="cardList" :groupList="groupList" :statusList="statusList">
      </component>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/tools";

import kanbanboard from "@/components/kanbanboard";
import developList from "@/pages/development/development";
export default {
    data() {
        return {
            //search
            iterationName: "",
            iterationNumber: "",
            needName: "",
            taskStatus: "",
            belongIteration: "",
            personLiable: "",
            currentView: "developList"
        };
    },
    created(){
        if(this.$route.query.board){
           this.currentView = kanbanboard
        }
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
        addNewTask() {
            //点击跳转页面
            this.$router.push({
              path: "/development/add"
            });
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
        //所有卡片数据
        cardList: function() {
            let _cardList = [
                {
                    taskId: "#US0001",
                    taskName: "任务名1",
                    description:
                        "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
                    userName: "user1",
                    userId: "userId_01",
                    groupId: "group_01",
                    bgColor: { background: "#b3ecec" },
                    taskStateStr: "未开始",
                    taskState: "01",
                    headPortrait: require("@/assets/images/user_02.png"),
                    userNeed: "用户界面设计",
                    iterations: "基础界面设计阶段"
                },
                {
                    taskId: "#US0002",
                    taskName: "任务名2",
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
                    taskName: "任务名3",
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
                    taskName: "任务名4",
                    description:
                        "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
                    userName: "user1",
                    userId: "userId_04",
                    groupId: "group_03",
                    bgColor: { background: "#f8d6af" },
                    taskStateStr: "发布",
                    taskState: "01",
                    headPortrait: require("@/assets/images/user_02.png")
                },
                {
                    taskId: "#US0005",
                    taskName: "任务名5",
                    description:
                        "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
                    userName: "user1",
                    userId: "userId_05",
                    groupId: "group_01",
                    bgColor: { background: "#f8d6af" },
                    taskStateStr: "发布",
                    taskState: "04",
                    headPortrait: require("@/assets/images/user_02.png")
                },
                {
                    taskId: "#US0006",
                    taskName: "任务名6",
                    description:
                        "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
                    userName: "user1",
                    userId: "userId_06",
                    groupId: "group_01",
                    bgColor: { background: "#f8d6af" },
                    taskStateStr: "上线",
                    taskState: "01",
                    headPortrait: require("@/assets/images/user_02.png")
                },
                {
                    taskId: "#US0007",
                    taskName: "任务名7",
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
                    taskName: "任务名8",
                    description:
                        "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
                    userName: "user1",
                    userId: "userId_08",
                    groupId: "group_01",
                    bgColor: { background: "#f8d6af" },
                    taskStateStr: "测试",
                    taskState: "05",
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
