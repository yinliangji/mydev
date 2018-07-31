<template>
  <!-- 此页面为table列表页 看板页面在公共组件中-->
  <div class="w80">
    <Table :columns="columns1" :data="defaultList"></Table>
    <Page :total="200" show-sizer show-total @on-change="changeCurrentPage" @on-page-size-change="changePageSize"></Page>

    <!-- 确认删除弹出框 -->
    <Modal v-model="delOnoff" width="300">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>删除此任务后将不能恢复。是否继续删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="delSure">删除</Button>
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
            delOnoff: false,
            delIndex: 0,
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
                            "a",
                            {
                                style: { color: "#2d8cf0" },
                                //domProps:{href:"###"},
                                on: {
                                    click: () => {
                                        // this.linkFn(params.row.taskName);
                                        this.$router.push({
                                            path: "/development/detail",
                                            query: {
                                                titleName: params.row.taskName
                                            }
                                        });
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
                                            //点击跳转页面
                                            alert(params.row.taskName)
                                            this.$router.push({
                                                path: "/development/add",
                                                query: {
                                                    iterationName:
                                                        params.row.taskName
                                                }
                                            });
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
            defaultList: []
        };
    },
    methods: {
        //删除
        delSure() {
            //走接口
            this.delOnoff = false;
            this.defaultList.splice(this.delIndex, 1);
            this.$Message.success("删除成功");
        },
        fillDel(i) {
            this.delOnoff = true;
            this.delIndex = i;
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

