<template>
  <Layout>
    <content>
      <p span="4" v-if="groupList.length > 0" class="left_border"></p>
      <div class="row-wrapper">
        <Row :gutter="16" type="flex" justify="start" align="middle">
          <Col span="4" v-if="groupList.length > 0">
          <div class="leftHeader">
            {{groupList[0].text}}
          </div>
          </Col>
          <Col span="4" v-for="(item, index) in statusList" :key="index">
          <kanbanContentHeader :text="item.stateStr" :taskNumber="item.taskNumber"></kanbanContentHeader>
          </Col>

        </Row>
      </div>
      <div class="row-wrapper" v-for="(itemGroup, index) in groupLists" v-if="groupList.length > 0">
        <Row :gutter="16" type="flex" justify="start" align="middle">
          <Col span="4" v-if="groupLists.length > 0">
          <div class="leftHeader">
            {{itemGroup.text}}
          </div>
          </Col>
          <Col span="4"
              v-for="(items, index) in statusList"
              :key="index"
             >

          <kanbanItem
              :key="keys"
              :item = "value"
              :Group = true
              v-for="(value, keys) in cardList"
             v-if="itemGroup.groupId == value.groupId && value.taskState == items.state"
              >
             </kanbanItem>
          <!--有分组-->
          </Col>
        </Row>
      </div>
      <div class="row-wrapper" v-if="groupList.length == 0">

        <Row :gutter="16" type="flex" justify="start" align="middle">
          <Col span="4"
          v-for="(items, index) in statusList"
          :key="index"
         >
         <kanbanItem
            :key="keys"
            :item = "value"
            :Group = true
            v-for="(value, keys) in cardList"
            v-if=" value.taskState == items.state">
        </kanbanItem>

      <!--无分组-->
      </Col>
        </Row>
      </div>


    </content>

  </Layout>

</template>

<script>

  import kanbanHeader from "./kanban-header";
  import kanbanContentHeader from './kanbancontent-header';

  import kanbanItem from './kanban-item';

  export default {
    // props: {

    //   cardList: {
    //     type: Array,
    //     default: function () {
    //       return []
    //     }
    //   },
    //   groupList: {
    //     type: Array,
    //     default: function () {
    //       return []
    //     }
    //   },
    //   statusList: {
    //     type: Array,
    //     default: function () {
    //       return []
    //     }
    //   }
    // },
    data() {
      return {
          currentView: "AlreadyBucket",

      };
    },

    computed: {
      groupLists() {

        return this.groupList.slice(1, this.groupList.length);
      },
       cardList: function() {

      let _cardList = [
        {
          taskId: "#US0001",
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
      kanbanHeader,

      kanbanContentHeader,
      kanbanItem
    }
  };
</script>

<style scoped>
  .ivu-layout-header {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .row-wrapper {
    margin-top: 10px;
    border-bottom: 4px solid #ccc;
    padding-bottom: 10px;
  }

  .left_border {
    position: absolute;
    left: 15%;
    border-right: 4px solid #ccc;
    height: 100%;

  }

  .leftHeader {
    width: 100px;
    background: #33cccc;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    font-weight: 600;
    margin: auto;
    height: 32px;
    line-height: 32px;
  }
</style>
