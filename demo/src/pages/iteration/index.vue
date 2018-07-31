<template>
  <div class="pageContent">
    <!-- <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>当前位置</BreadcrumbItem>
      <BreadcrumbItem>迭代管理</BreadcrumbItem>
    </Breadcrumb> -->
    <selectMenu></selectMenu>
    <div class="pageCon">
      <!-- <h3 class="pageConTitle">迭代管理</h3> -->
      <div class="newTop">
        <h3 class="Title">迭代管理</h3>
        <Form>
          <Row>
            <Col span="12">
            <Row>
              <Col span="4">
              <div class="searchName">迭代名称</div>
              </Col>
              <Col span="8">
              <FormItem>
                <Input placeholder="输入迭代名称" v-model="iterationName"></Input>
              </FormItem>
              </Col>
              <Col span="4">
              <div class="searchName">迭代编号</div>
              </Col>
              <Col span="8">
              <FormItem>
                <Input placeholder="输入迭代编号" v-model="iterationNumber"></Input>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="4">
              <div class="searchName">开始时间</div>
              </Col>
              <Col span="8">
              <FormItem>
                <DatePicker type="date" v-model="startTime" style="width: 180px"></DatePicker>
              </FormItem>
              </Col>
              <Col span="4">
              <div class="searchName">结束时间</div>
              </Col>
              <Col span="8">
              <FormItem>
                <DatePicker type="date" v-model="endTime" style="width: 180px"></DatePicker>
              </FormItem>
              </Col>
            </Row>
            </Col>
            <Col span="4" class="serchBtnBox">
            <Button type="primary" icon="ios-search" class="serchBtn">查询</Button>
            </Col>
          </Row>

        </Form>
      </div>

      <div class="w80">
        <Button type="success" @click="addIteration">添加迭代</Button>
        <Button type="error" @click="delList">删除</Button>
        <div class="orange">
          <div class="un-plan">
            <Table border @on-selection-change="handleRowChange" ref="Selection" :columns="column1" :data="Table1.list">
            </Table>
          </div>

          <div class="paln1 paln" v-for="item in obj" :key="item.name">
            <div class="plan-title">
              <span>{{item.name}} {{item.startTime}}--{{item.startTime}}
              </span>
              <span class="plan-title-btn" @click="item.isShow = false" v-show="item.isShow">隐藏</span>
              <span class="plan-title-btn" @click="item.isShow = true" v-show="!item.isShow">显示</span>
            </div>
            <div class="tableToggle" v-if="item.isShow">
              <Table border :columns="column2" :data="item.list"></Table>
              <Page :total="200" show-sizer show-total @on-change="changeCurrentPage" @on-page-size-change="changePageSize" style="margin:6px 0; text-align:right">
              </Page>
            </div>

          </div>
        </div>
      </div>

      <!-- 确认删除弹出框 -->
      <Modal v-model="delOnoff" width="300">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p>删除此迭代无法恢复，但是迭代中的用户故事和开发任务不会被删除。是否继续？</p>
        </div>
        <div slot="footer">
          <Button type="error"  @click="delSure">删除</Button>
          <Button @click="cancel">取消</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/tools";

export default {
    data() {
        return {
            delOnoff: false,
            status: false,
            startTime: "",
            endTime: "",
            iterationName: "",
            iterationNumber: "",
            curSelelectList: [], // 当前选择得要规划得list
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
                                            //点击跳转页面
                                            this.$router.push({
                                                path: "/iteration/iteration",
                                                query: {
                                                    iterationName:
                                                        params.row.name
                                                }
                                            });
                                        }
                                    }
                                },
                                params.row.name
                            )
                        ]);
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
                                "Button",
                                {
                                    props: {
                                        type: "info",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            // this.showModal(params);
                                            //点击跳转页面
                                            this.$router.push({
                                                path: "/development",
                                                query: {
                                                    iterationName:
                                                        params.row.name
                                                }
                                            });
                                        }
                                    }
                                },
                                "查看任务"
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
                                            //点击跳转页面
                                            alert(params.row.name)
                                            this.$router.push({
                                                path: "/iteration/iteration",
                                                query: {
                                                    iterationName:
                                                        params.row.name
                                                }
                                            });
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
                                "Button",
                                {
                                    props: {
                                        type: "warning",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            //点击跳转页面
                                            this.$router.push({
                                                path: "/iteration/iteration",
                                                query: {
                                                    iterationName:
                                                        params.row.name
                                                }
                                            });
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
                        endTime: "2017-08-01"
                    },
                    {
                        id: 2,
                        number: "001",
                        name: "prj002",
                        dec: "TPM敏捷管理系统",
                        startTime: "2017-08-01",
                        endTime: "2017-08-02"
                    },
                    {
                        id: 3,
                        number: "001",
                        name: "prj003",
                        dec: "TPM敏捷管理系统",
                        startTime: "2017-08-01",
                        endTime: "2017-08-03"
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
        this.$Message.config({
            top: 150,
            duration: 2
        });
    },
    methods: {
        handleRowChange(Selection) {
            console.log(Selection);
            this.curSelelectList = Selection;
        },
        //删除
        delList() {
            if (!this.curSelelectList.length) {
                this.$Message.warning("请选择要删除的内容");
            } else {
                this.delOnoff = true;
            }
        },

        delSure() {
            let Table1Leg = this.Table1.list.length;
            let selectLeg = this.curSelelectList.length;
            if (Table1Leg == selectLeg) {
                this.Table1.list = [];
            } else {
                for (let i = Table1Leg - 1; i >= 0; i--) {
                    for (let j = 0; j < selectLeg; j++) {
                        if (
                            this.Table1.list[i].id == this.curSelelectList[j].id
                        ) {
                            this.Table1.list.splice(i, 1);
                            continue; //结束当前本轮循环，开始新的一轮循环
                        }
                    }
                }
            }
            this.delOnoff = false;
            this.$Message.success("删除成功");
        },
        //取消
        cancel(){
          this.delOnoff = false;
        },
        //添加按钮
        addIteration() {
            //点击跳转页面
            this.$router.push({
                path: "/iteration/iteration"
            });
        },

        //分页
        changeCurrentPage(i) {
            alert(i);
        },
        changePageSize(i) {
            alert(i);
        }
    },
    computed: {},
    created() {},

    components: {}
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

.ivu-breadcrumb {
    padding-left: 10px;
}

//orange
.orange {
    margin-top: 10px;
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
