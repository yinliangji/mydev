<template>
  <div class="container-transfer">
    <div class="clearfix">
      <div class="infoGroup">
        <h3 class="Title">任务基本信息</h3>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <div class="addTaskTable">
            <dl class="showInfo">
              <dt class="showTitle">任务所属产品</dt>
              <dd class="showCon">私有云项目</dd>
            </dl>
            <dl class="showInfo">
              <dt class="showTitle">任务所属项目</dt>
              <dd class="showCon">敏捷项目二期开发</dd>
            </dl>
            <FormItem label="任务名称" prop="taskName">
              <Input v-model="formValidate.taskName" style="width:706px"></Input>
            </FormItem>
            <Row>
              <Col span="6">
              <FormItem label="责任人" prop="person">
                <Select v-model="formValidate.person"  style="width:150px">
                  <Option v-for="item in personList" :value="item.label" :key="item.value">
                    {{ item.label }}
                  </Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="类型">
                <Select v-model="formValidate.type"  style="width:150px">
                   <Option v-for="item in typeList" :value="item.label" :key="item.value">
                    {{ item.label }}
                  </Option>
                </Select>
              </FormItem>
              </Col>

              <Col span="8">
              <FormItem label="所属用户故事" style="padding-left: 62px;">
                <Select v-model="formValidate.story" style="width:150px">
                  <Option v-for="item in storyList" :value="item.label" :key="item.value">
                    {{ item.label }}
                  </Option>
                </Select>
              </FormItem>
              </Col>
            </Row>
            <FormItem label="描述">
              <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="写点什么..." style="width:706px"></Input>
            </FormItem>

          </div>
        </Form>
      </div>
      <div class="infoGroup">
        <h3 class="Title">任务开发相关</h3>
        <div class="addTaskTable">
          <Form :label-width="100">
            <FormItem label="设计说明">
              <Input v-model="formValidate.designDescription" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="写点什么..." style="width:706px"></Input>
            </FormItem>
            <FormItem label="测试需求">
              <Input v-model="formValidate.testRequirements" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="写点什么..." style="width:706px"></Input>
            </FormItem>
            <FormItem label="依赖模块">
              <Input v-model="formValidate.dependencyModule" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="写点什么..." style="width:706px"></Input>
            </FormItem>
            <FormItem label="上线需求">
              <Input v-model="formValidate.onlineDemand" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="写点什么..." style="width:706px"></Input>
            </FormItem>
          </Form>
        </div>
      </div>

      <div class="infoGroup">
        <h3 class="Title">备注</h3>
        <Form :label-width="100">
          <FormItem label="备注">
            <Input v-model="formValidate.remarks" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="写点什么..." style="width:720px"></Input>
          </FormItem>

        </Form>

      </div>
    </div>
    <div style="text-align:right; width:810px">
      <Button type="primary" @click="addIterationOk('formValidate')">确定</Button>
      <Button @click="closeSelf">关闭</Button>
    </div>

  </div>
</template>
<script>
export default {
    data() {
        return {
            sureInfo: "添加成功",
            personList: [
                {
                    value: "1",
                    label: "user1"
                },
                {
                    value: "2",
                    label: "user2"
                },
                {
                    value: "3",
                    label: "user3"
                }
            ],
            typeList:[
               {
                    value: "1",
                    label: "类型1"
                },
                {
                    value: "2",
                    label: "类型2"
                }
            ],

            storyList:[
               {
                    value: "1",
                    label: "用户界面设计"
                },
                {
                    value: "2",
                    label: "所属用户故事2"
                }
            ],
            formValidate: {
                taskName: "",
                person: "",
                type: "",
                desc: "",
                story: "",
                designDescription: "",
                testRequirements: "",
                dependencyModule: "",
                onlineDemand: "",
                remarks: ""
            },
            ruleValidate: {
                taskName: [
                    {
                        required: true,
                        message: "任务名称不能为空",
                        trigger: "blur"
                    }
                ],
                person: [
                    {
                        required: true,
                        message: "输入责任人",
                        trigger: "change"
                    }
                ]
            }
        };
    },

    methods: {
        closeSelf() {
            this.$router.push({
                path: "/development"
            });
        },
        //添加任务确认按钮
        addIterationOk(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.$Message.success(this.sureInfo);
                    // this.$refs[name].resetFields();
                    //点击跳转页面
                    this.$router.push({
                        path: "/development"
                    });
                } else {
                    this.$Message.error("请填写好必填内容!");
                }
            });
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
        this.formValidate.taskName = this.$route.query.iterationName;
        // alert(this.$route.query.personLiable)
        this.formValidate.person = this.$route.query.personLiable;
        //alert(this.$route.query.userNeed)
        this.formValidate.story = this.$route.query.userNeed;
        // iterationName:params.row.taskName,
        // personLiable:params.row.personLiable,
        // status:params.row.status,
        // userNeed:params.row.userNeed
        this.$Message.config({
            top: 100,
            duration: 2
        });
    }
};
</script>

<style scoped>
h3.Title {
    margin-top: 30px;
    margin-bottom: 10px;
}
.container-transfer {
    width: 100%;
    margin: 0 auto;
    font-size: 14px;
}

.infoGroup {
}
.addTaskTable {
    width: 90%;
    padding: 10px;
    border: 1px solid #d8d8d8;
    border-radius: 4px;
}
.showInfo {
    font-size: 12px;
    margin-bottom: 10px;
}
.showInfo:nth-child(2) {
    margin-bottom: 20px;
}
.showTitle {
    width: 100px;
    padding-right: 10px;
}
</style>
