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
        <Form ref="formValidate" class="formValidate">
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
      <!-- <Modal v-model="addTaskOnoff" title="添加任务" width="500" @on-ok="ok">
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
              <Input v-model="describe" type="textarea" style="width:200px" placeholder="描述..."></Input>
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
      </Modal> -->
      <!-- 添加迭代面板 -->
      <Modal v-model="addTaskOnoff" :title="formValidate.title" width="500" @on-ok="addTaskOk('formValidate')">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
          <div class="addTaskTable">

            <FormItem label="任务名称：" prop="taskName">
              <Input v-model="formValidate.taskName" style="width: 200px"></Input>
            </FormItem>

            <FormItem label="责任人：" prop="personLiable">
              <Input v-model="formValidate.personLiable" style="width:200px"></Input>
            </FormItem>

            <FormItem label="任务描述：" prop="describe">
              <Input v-model="formValidate.describe" type="textarea" style="width:200px" placeholder="描述..."></Input>
            </FormItem>
            <FormItem label="所属待办事项：" prop="curNeed">
              <Select v-model="formValidate.curNeed" style="width:200px">
                <Option v-for="item in formValidate.ownNeed" :value="item.value" :key="item.value">
                  {{ item.label }}</Option>
              </Select>
            </FormItem>

          </div>
        </Form>
      </Modal>
      <component :is="currentView" :cardList="cardList" :groupList="groupList" :statusList="statusList">
      </component>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/tools";
import selectMenu from "@/components/selectMenu/selectMenu";
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
            addTaskOnoff: false,
            currentView: "developList",
            formValidate: {
                title: "添加任务",
                taskName: "",
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
                personLiable: "",
                describe: ""
            },
            ruleValidate: {
                taskName: [
                    {
                        required: true,
                        message: "任务名称不能为空",
                        trigger: "blur"
                    }
                ],
                personLiable: [
                    {
                        required: true,
                        message: "责任人不能为空",
                        trigger: "blur"
                    }
                ],
                describe: [
                     {
                        required: true,
                        message: "任务描述不能为空",
                        trigger: "blur"
                    }
                ],
                curNeed: [
                     {
                        required: true,
                        message: "所属待办事项不能为空",
                        trigger: "change"
                    }
                ],

            }
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

        //添加任务确认按钮
        addTaskOk(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.$Message.success(this.alertInfo);
                    this.$refs[name].resetFields();
                } else {
                    this.$Message.error("请填写好必填内容!");
                    // this.$refs[name].resetFields();
                }
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
        developList,
         selectMenu:selectMenu
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
