<template>
  <div class="pageContent" style="min-height:85vh">
    <Tabs value="name1">
      <TabPane label="任务基本信息" name="name1">
        <div class="part part1">
          <!-- <div class="title">任务基本信息
            <Icon type="navicon-round" class="toggle" @click="toggleOnoff.part1=!toggleOnoff.part1"></Icon>
          </div> -->
          <div class="con" v-show="toggleOnoff.part1">
            <Row>
              <Col span="8">
              <div class="taskrow clearfix">
                <div class="addTaskTableTitle">任务编号：</div>
                <div class="addTaskTableCon">U26263632</div>
              </div>
              </Col>
              <Col span="8">
              <div class="taskrow clearfix">
                <div class="addTaskTableTitle">任务名称：</div>
                <div class="addTaskTableCon">热点讨论</div>
              </div>
              </Col>
              <Col span="8">
              <div class="taskrow clearfix">
                <div class="addTaskTableTitle">任务状态：</div>
                <div class="addTaskTableCon">进行中</div>
              </div>
              </Col>

            </Row>
            <Row>
              <Col span="8">
              <div class="taskrow clearfix">
                <div class="addTaskTableTitle">任务编号：</div>
                <div class="addTaskTableCon">U26263632</div>
              </div>
              </Col>
              <Col span="8">
              <div class="taskrow clearfix">
                <div class="addTaskTableTitle">任务名称：</div>
                <div class="addTaskTableCon">热点讨论</div>
              </div>
              </Col>
              <Col span="8">
              <div class="taskrow clearfix">
                <div class="addTaskTableTitle">任务状态：</div>
                <div class="addTaskTableCon">进行中</div>
              </div>
              </Col>

            </Row>
            <Row>
              <Col span="24">
              <div class="taskrow clearfix">
                <div class="addTaskTableTitle">任务描述：</div>
                <div class="addTaskTableConThrough">我们采用了24栅格系统，将区域进行24等分， 这样可以轻松应对大部分布局问题。 使用栅格系统进行网页布局，可以。我们采用了24栅格系统，将区域进行24等分， 这样可以轻松应对大部分布局问题。
                </div>
              </div>
              </Col>

            </Row>
            <Row>
              <Col span="24">
              <div class="taskrow clearfix">
                <div class="addTaskTableTitle">设计说明：</div>
                <div class="addTaskTableConThrough">我们采用了24栅格系统，将区域进行24等分， 这样可以轻松应对大部分布局问题。 使用栅格系统进行网页布局，可以。我们采用了24栅格系统，将区域进行24等分， 这样可以轻松应对大部分布局问题。
                </div>
              </div>
              </Col>

            </Row>
            <Row>
              <Col span="24">
              <div class="taskrow clearfix">
                <div class="addTaskTableTitle">测试要求：</div>
                <div class="addTaskTableConThrough">我们采用了24栅格系统，将区域进行24等分， 这样可以轻松应对大部分布局问题。 使用栅格系统进行网页布局，可以。我们采用了24栅格系统，将区域进行24等分， 这样可以轻松应对大部分布局问题。
                </div>
              </div>
              </Col>

            </Row>
            <Row>
              <Col span="24">
              <div class="taskrow clearfix">
                <div class="addTaskTableTitle">备注：</div>
                <div class="addTaskTableConThrough">
                </div>
              </div>
              </Col>

            </Row>
          </div>
        </div>
      </TabPane>
      <TabPane label="任务附件" name="name2">
        <div class="part part2">
          <!-- <div class="title">任务附件
            <Icon type="navicon-round" class="toggle" @click="toggleOnoff.part2=!toggleOnoff.part2"></Icon>
          </div> -->
          <div class="con" v-show="toggleOnoff.part2">
            <Upload action="http://localhost/" :on-success="handleSuccess" :show-upload-list="false">
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload>
            <Table :columns="columns2" :data="data2" style="margin-top:6px"></Table>
          </div>
        </div>
      </TabPane>
      <TabPane label="任务状态变更信息" name="name3">
        <div class="part part3">
          <!-- <div class="title">任务状态变更信息
            <Icon type="navicon-round" class="toggle" @click="toggleOnoff.part3=!toggleOnoff.part3"></Icon>
          </div> -->
          <div class="con" v-show="toggleOnoff.part3">
            <Button type="success" @click="defectOnoff=true">添加缺陷</Button>
            <Table :columns="columns3" :data="data3" style="margin-top:6px"></Table>
          </div>
        </div>
      </TabPane>
      <TabPane label="任务测试情况" name="nam4">
        <div class="part part4">
          <!-- <div class="title">任务测试情况
            <Icon type="navicon-round" class="toggle" @click="toggleOnoff.part4=!toggleOnoff.part4"></Icon>
          </div> -->
          <div class="con" v-show="toggleOnoff.part4">
            <Table :columns="columns4" :data="data4"></Table>
          </div>
        </div>
      </TabPane>
      <TabPane label="任务代码提交情况" name="name5">
        <div class="part part5">
          <!-- <div class="title">任务代码提交情况
            <Icon type="navicon-round" class="toggle" @click="toggleOnoff.part5=!toggleOnoff.part5"></Icon>
          </div> -->
          <div class="con" v-show="toggleOnoff.part5">
            <Table :columns="columns5" :data="data5" ></Table>
          </div>
        </div>
      </TabPane>
    </Tabs>

    <!-- 添加+编辑任务面板 -->
    <!-- <Modal v-model="defectOnoff" :title="formValidate.title" width="500" @on-ok="adddefectOk('formValidate')">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <div class="addTaskTable">

          <FormItem label="缺陷名称：" prop="defectName">
            <Input v-model="formValidate.taskName" style="width: 200px"></Input>
          </FormItem>

          <FormItem label="缺陷类型：" prop="defectType">
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
    </Modal> -->
  </div>
</template>
<script>
export default {
    name: "detail",

    data() {
        return {
            defectOnoff: false,
            toggleOnoff: {
                part1: true,
                part2: true,
                part3: true,
                part4: true,
                part5: true
            },

            titleName: "",
            columns2: [
                {
                    title: "序号",
                    key: "taskNum"
                },
                {
                    title: "文件名",
                    key: "taskName",
                    render: (h, params) => {
                        return h(
                            "a",
                            {
                                style: { color: "#2d8cf0" },
                                //domProps:{href:"###"},
                                on: {
                                    click: () => {
                                        this.linkFn(params.row.taskName);
                                    }
                                }
                            },
                            params.row.taskName
                        );
                    }
                },

                {
                    title: "文件大小",
                    key: "fillSize"
                },
                {
                    title: "创建者",
                    key: "author"
                },
                {
                    title: "创建时间",
                    key: "createTime"
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
            data2: [
                {
                    taskNum: "1",
                    taskName: "文件名",
                    fillSize: "20kb",
                    author: "张三",
                    createTime: "2018-2-10"
                }
            ],
            columns3: [
                {
                    title: "状态",
                    key: "status"
                },
                {
                    title: "变更时间",
                    key: "time"
                },
                {
                    title: "操作者",
                    key: "handlers"
                },
                {
                    title: "Sprint编号",
                    key: "number"
                }
            ],
            data3: [
                {
                    status: "未开始",
                    time: "2017-10-10",
                    handlers: "谢蓓",
                    number: "sp1009"
                },
                {
                    status: "未开始",
                    time: "2017-10-10",
                    handlers: "谢蓓",
                    number: "sp1009"
                }
            ],
            columns4: [
                {
                    title: "Bug编号",
                    key: "bugNum"
                },
                {
                    title: "Bug名称",
                    key: "bugName"
                },
                {
                    title: "责任人",
                    key: "person"
                },
                {
                    title: "缺陷状态",
                    key: "status"
                },
                {
                    title: "缺陷创建时间",
                    key: "time"
                }
            ],
            data4: [
                {
                    bugNum: "u2737343",
                    bugName: "bugNamebugName",
                    person: "谢蓓",
                    status: "缺陷状态",
                    time: "2015-3-10"
                }
            ],
            columns5: [
                {
                    title: "项目名称",
                    key: "projectName"
                },
                {
                    title: "changeId",
                    key: "changeId"
                },
                {
                    title: "代码行数",
                    key: "codeNum"
                },
                {
                    title: "提交人",
                    key: "person"
                },
                {
                    title: "提交时间",
                    key: "time"
                },
                {
                    title: "构建号",
                    key: "order"
                },
                {
                    title: "构建结果",
                    key: "result"
                }
            ],
            data5: [
                {
                    projectName: "projectName",
                    changeId: "1236237",
                    codeNum: "12",
                    person: "Lily",
                    time: "2015-3-10",
                    order: "347374",
                    result: "success"
                }
            ]
        };
    },
    methods: {
        defectTodo() {},
        handleSuccess(res, file) {
            // console.log(res)
            // console.log(file.url, file.name);
            this.data2.push({
                taskNum: "1",
                taskName: file.name,
                fillSize: "20kb",
                author: "张三",
                createTime: "2018-2-10"
            });
            //this.$Message.success("添加成功！");
            this.$Notice.success({
                title: "添加成功！"
            });
        },
        linkFn(data) {
            alert(data);
        },
        fillDel(i) {
            // alert(i)
            this.data2.splice(i, 1);
        }
    },
    computed: {},
    mounted() {
        this.titleName = this.$route.query.titleName;
        this.$Message.config({
            top: 100,
            duration: 2
        });
        this.$Notice.config({
            top: 100,
            duration: 2
        });
    }
};
</script>
<style scoped>
h3 {
    height: 40px;
    line-height: 40px;
    text-indent: 20px;
    font-size: 16px;
}
.part {
    padding: 10px;
    margin: 10px;
    background: #ffffff;
}
.title {
    line-height: 40px;
    border: 1px solid #d8d8d8;
    border-top: 3px solid #3c8dbc;
    font-size: 14px;
    text-indent: 10px;
    position: relative;
}
.toggle {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}
/* .con {
    border: 1px solid #d8d8d8;
    padding-top: 14px;
    padding-bottom: 14px;
    border-radius: 0 0 4px 4px;
} */
.addTaskTableConThrough {
    float: left;
    padding-left: 6px;
    border-bottom: 1px solid #ccc;
    width: 890px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 30px;
}

.pageContent {
    background: #fff;
}
</style>

