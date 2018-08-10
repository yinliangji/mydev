<template>
  <div class="pageContent">
    <!-- <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>当前位置</BreadcrumbItem>
      <BreadcrumbItem>迭代管理</BreadcrumbItem>
    </Breadcrumb> -->
    <goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :Top="'10'" />
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
            <Row v-if="isShowMoreShow">
              <Col span="4">
              <div class="searchName">开始时间</div>
              </Col>
              <Col span="8">
              <FormItem>
                <DatePicker type="date" v-model="start_time" style="width: 180px"></DatePicker>
              </FormItem>
              </Col>
              <Col span="4">
              <div class="searchName">结束时间</div>
              </Col>
              <Col span="8">
              <FormItem>
                <DatePicker type="date" v-model="end_time" style="width: 180px"></DatePicker>
              </FormItem>
              </Col>
            </Row>
            </Col>
            <Col span="4" class="serchBtnBox">
            <Button type="primary" icon="ios-search" class="serchBtn" @click="searchFn">查询</Button>
            </Col>
          </Row>
          <div class="formValidateMoreBtnBox" @click="isShowMoreShow = !isShowMoreShow">
            <Icon type="chevron-down" color="#ed3f14"></Icon>
            <Icon type="chevron-down" color="#ed3f14"></Icon>
          </div>
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

          <div class="paln1 paln">
            <div class="plan-title">
              <span>历史迭代列表</span>
              <span class="plan-title-btn" @click="obj.isShow = false" v-show="obj.isShow">隐藏</span>
              <span class="plan-title-btn" @click="obj.isShow = true" v-show="!obj.isShow">显示</span>
            </div>
            <div class="tableToggle" v-if="obj.isShow">
              <Table border :columns="column2" :data="obj.list"></Table>
              <Page :total="totalPage" show-sizer show-total @on-change="changeCurrentPage" @on-page-size-change="changePageSize" style="margin:6px 0; text-align:right">
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
          <Button @click="delSure">删除</Button>
          <Button type="info" @click="cancel">取消</Button>
        </div>
      </Modal>

      <!-- 确认修改弹出框 -->
      <Modal v-model="modifyOnoff" width="300">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>修改确认</span>
        </p>
        <div style="text-align:center">
          <p>确定需要修改此迭代吗？</p>
        </div>
        <div slot="footer">
          <Button @click="modifySure">确认</Button>
          <Button type="info" @click="cancel">取消</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/tools";
import Common from "@/Common";
const { iterationList } = Common.restUrl;
export default {
    data() {
        return {
            totalPage: 100,
            currentPage: 1,
            pageSize: 10,
            totalId: "",
            isShowMoreShow: false,
            delOnoff: false,
            modifyOnoff: false,
            modifyName: "",
            status: false,
            start_time: "",
            end_time: "",
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
                    key: "sprint_id"
                },

                {
                    title: "迭代名称",
                    key: "sprint_name",

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
                                                        params.row.sprint_name,
                                                    startTime:
                                                        params.row.start_time,
                                                    endTime: params.row.end_time
                                                }
                                            });
                                        }
                                    }
                                },
                                params.row.sprint_name
                            )
                        ]);
                    }
                },
                {
                    title: "开始时间",
                    key: "start_time"
                },
                {
                    title: "结束时间",
                    key: "end_time"
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
                                                        params.row.sprint_name,
                                                    watchKanban: true
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
                                            //alert(params.row.sprint_name);
                                            this.$router.push({
                                                path: "/iteration/iteration",
                                                query: {
                                                    iterationName:
                                                        params.row.sprint_name,
                                                    startTime:
                                                        params.row.start_time,
                                                    endTime: params.row.end_time,
                                                    addOrModifyStatus:true
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
                    key: "sprint_id"
                },
                {
                    title: "迭代名称",
                    key: "sprint_name"
                },
                {
                    title: "开始时间",
                    key: "start_time"
                },
                {
                    title: "结束时间",
                    key: "end_time"
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
                                                        params.row.sprint_name,
                                                    watchKanban: true
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
                                            //alert(params.row.sprint_name);此编辑要弹出询问是否编辑
                                            this.modifyOnoff = true;
                                            this.modifyName =
                                                params.row.sprint_name;
                                            this.startTime =
                                                params.row.start_time;
                                            this.endTime = params.row.end_time;
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
                list: [
                    // {
                    //     id: 1,
                    //     sprint_id: "001",
                    //     sprint_name: "prj001",
                    //     dec: "TPM敏捷管理系统",
                    //     start_time: "2017-08-01",
                    //     end_time: "2017-08-01"
                    // },
                    // {
                    //     id: 2,
                    //     number: "001",
                    //     name: "prj002",
                    //     dec: "TPM敏捷管理系统",
                    //     startTime: "2017-08-01",
                    //     endTime: "2017-08-02"
                    // }
                ]
            },
            obj: {
                isShow: false,
                list: [
                    // {
                    //     id: 1,
                    //     sprint_id: "001",
                    //     sprint_name: "prj001",
                    //     dec: "TPM敏捷管理系统",
                    //     start_time: "2017-08-01",
                    //     end_time: "2017-08-01"
                    // },
                    // {
                    //     type: 1,
                    //     id: 5,
                    //     number: "002",
                    //     name: "2222",
                    //     dec: "TPM敏捷管理系统1",
                    //     startTime: "2017-08-01",
                    //     endTime: "2018-05-01"
                    // }
                ]
            }
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
                            this.Table1.list[i].sprint_id ==
                            this.curSelelectList[j].sprint_id
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
        //编辑
        modifySure() {
            this.$router.push({
                path: "/iteration/iteration",
                query: {
                    iterationName: this.modifyName,
                    startTime: this.start_time,
                    endTime: this.end_time
                }
            });
        },
        //取消
        cancel() {
            this.delOnoff = false;
            this.modifyOnoff = false;
        },
        //添加按钮
        addIteration() {
            //点击跳转页面
            this.$router.push({
                path: "/iteration/iteration"
            });
        },

        //分页
        //当前页数 page
        changeCurrentPage(i) {
            //alert(i);
            this.currentPage = i;
            this.IterationList();
        },
        //每页显示多少条limit
        changePageSize(i) {
            // alert(i);
            this.pageSize = i;
            this.IterationList();
        },
        IterationList() {
            this.$axios({
                method: "get",
                url: iterationList,
                data: {
                    data: "",
                    page: this.currentPage,
                    limit: this.pageSize
                }
            }).then(res => {
                console.log(res.data.data.rows);
                this.Table1.list = res.data.data.rows;
                this.obj.list = res.data.data.rows;
            });
        },
        searchFn() {
            alert(sessionStorage.getItem("id"));
            // this.totalId = this.$route.query.id;
        }
    },
    computed: {},
    created() {
        this.IterationList();
    },

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
