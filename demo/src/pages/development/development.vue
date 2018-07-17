<template>
 <div class="w90">
    <Table :columns="columns1" :data="defaultList"></Table>
    <Page :total="200" show-sizer show-total  @on-change="changeCurrentPage"
        @on-page-size-change="changePageSize"></Page>
      <Modal
        v-model="addTaskOnoff"
        title="编辑任务"
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
              <div class="addTaskTableTitle">所属待办事项</div>
              <div class="addTaskTableCon">
                <Select v-model="curNeed" style="width:200px">
                    <Option v-for="item in ownNeed" :value="item.value" :key="item.value">
                      {{ item.label }}</Option>
                </Select>
              </div>
            </div>

        </div>
      </Modal>
 </div>
</template>
<script>
export default {
  name: "development",
  props: {
    cardList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    groupList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    statusList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      columns1: [
        {
          title: "任务编号",
          key: "taskNum"
        },
        {
          title: "任务名称",
          key: "taskName"
        },

        {
          title: "责任人",
          key: "personLiable"
        },
        {
          title: "状态",
          key: "status"
        },
        {
          title: "所属待办事项",
          key: "need"
        },
        {
          title: "所属迭代",
          key: "iterations"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.fillEdit(params.index);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.fillDel(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      defaultList: [
        {
          taskNum: "us0001",
          taskName: "设计登录界面",
          personLiable: "谢蓓",
          status: "未开始",
          need: "用户界面设计",
          iterations: "基础界面设计阶段"
        }

      ],
      addTaskOnoff: false,
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
      taskName: "",
      personLiable: "",
      describe:""
    };
  },
  methods: {
    //分页
    changeCurrentPage(i) {
      alert(i);
    },
    changePageSize(i) {
      alert(i);
    },
    fillEdit(i) {
      this.addTaskOnoff = true;
    },
    fillDel(i) {
      alert(i);
      this.defaultList.splice(i, 1);
    },
    ok() {
      alert("添加成功");
    },
    cancel() {
      alert("取消添加");
    }
  },
  computed: {
    groupLists() {
      return this.groupList.slice(1, this.groupList.length);
    }
  },
  mounted(){}
};
</script>
<style scoped>
.ivu-page {
  margin: 10px 0;
  text-align: right;
  overflow: hidden;
}
</style>

