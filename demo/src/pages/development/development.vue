<template>
  <div class="w80">
    <Table :columns="columns1" :data="defaultList"></Table>
    <Page :total="200" show-sizer show-total @on-change="changeCurrentPage" @on-page-size-change="changePageSize"></Page>
    <!-- <Modal v-model="addTaskOnoff" title="编辑任务" width="500" @on-ok="ok">
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
          <div class="addTaskTableTitle">所属待办事项</div>
          <div class="addTaskTableCon">
            <Select v-model="curNeed" style="width:200px">
              <Option v-for="item in ownNeed" :value="item.value" :key="item.value">
                {{ item.label }}</Option>
            </Select>
          </div>
        </div>

      </div>
    </Modal> -->
    <!-- 添加+编辑任务面板 -->
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
                    key: "taskName",
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                style:{color:'#2d8cf0'},
                                //domProps:{href:"###"},
                                on: {
                                    click: () => {
                                        this.linkFn(params.row.taskName)
                                    }
                                }
                            },
                            params.row.taskName
                        );
                    }
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
                    key: "userNeed"
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
                                        type: "warning",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            this.fillEdit(params.row);
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
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
            defaultList: [],
            addTaskOnoff: false,
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
                ]
            }
        };
    },
    methods: {
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
        //分页
        changeCurrentPage(i) {
            alert(i);
        },
        changePageSize(i) {
            alert(i);
        },
        fillEdit(data) {
            this.addTaskOnoff = true;
           // console.log(data)
            this.formValidate.title = "编辑任务";

            this.alertInfo="修改成功！"


        },
        fillDel(i) {
            //alert(i);
            this.defaultList.splice(i, 1);
        },
        linkFn (name) {
            //alert(name)
            this.$router.push({
              path:"/development/detail",
              query:{
                titleName:name
              }
            })
        },

    },
    computed: {
        // groupLists() {
        //   return this.groupList.slice(1, this.groupList.length);
        // }
    },
    mounted() {
        //alert(this.cardList.length);
        this.cardList.forEach(element => {
            this.defaultList.push({
                taskNum: element.taskId,
                taskName: element.taskName,
                personLiable: element.userName,
                status: element.taskStateStr,
                userNeed: element.userNeed,
                iterations: element.iterations
            });
            //卡片数据需要添加两个内容：所属待办事项+所属迭代
        });
    }
};
</script>
<style scoped>
.ivu-page {
    margin: 10px 0;
    text-align: right;
    overflow: hidden;
}
</style>

