<template>
  <div class="container-transfer">
    <div class="clearfix">
      <div class="infoGroup">
        <h3 class="Title">项目名称：敏捷项目二期开发</h3>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
          <div class="addTaskTable">
            <Row>
              <Col span="8">

              </Col>
              <Col span="8" >

              </Col>
	          </Row>
            <FormItem label="迭代名称：" prop="taskName">
              <Input v-model="formValidate.taskName" style="width: 200px"></Input>
            </FormItem>

            <FormItem label="开始时间：" prop="startTime">
              <DatePicker type="date" style="width: 200px" v-model="formValidate.startTime"></DatePicker>
            </FormItem>

            <FormItem label="结束时间：" prop="endTime">
              <DatePicker type="date" style="width: 200px" v-model="formValidate.endTime"></DatePicker>
            </FormItem>

          </div>
        </Form>
      </div>

    </div>

    <h3 class="Title">规划当前迭代：
      <span style="color:red">{{formValidate.taskName}}</span>
    </h3>
    <div class="transBody">

      <div class="transBodyL">

        <div class="trans-top">

          <span style="margin:0 4px">故事名称：</span>
          <Input v-model="storySearch" placeholder="搜索" style="width:130px" icon="android-search"></Input>

          <span style="margin:0 4px">故事类型：</span>
          <Select v-model="storyType" style="width:130px">
            <Option v-for="item in storyTypeArr" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>

        </div>
        <Checkbox :value="checkAll" @click.prevent.native="handleCheckAll" v-if="dataL.length>0">全选</Checkbox>
        <span class="totalNum">
          (
          <i>{{nowlNum}}/</i>{{totalNum}})
        </span>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
          <!-- checkAllGroup:{{checkAllGroup}}+checkAllGroupOnoff:{{checkAllGroupOnoff}} -->
          <ul>
            <li v-for="item in dataL" :key="item.type">
              <div class="tranHeader">
                <Checkbox :label="item.type">{{item.bigName}}</Checkbox>
                <span style="margin:0 80px">{{item.stoyrType}} </span>
                <span>{{item.stoyrStatus}}</span>

                <Icon type="navicon-round" @click="item.isShow=!item.isShow"></Icon>
              </div>
              <div class="tranpanel" v-show="item.isShow">

                <Table :columns="columns1" :data="item.list" size="small"></Table>
              </div>
            </li>
          </ul>
        </CheckboxGroup>

      </div>
      <div class="transBodyC">
        <Button :type="bgcolorL" long icon="chevron-left" @click="toLeft">向左移动</Button>
        <Button :type="bgcolorR" long icon="chevron-right" @click="toRight">向右移动</Button>
      </div>
      <div class="transBodyR">
        <div class="trans-top">
          <span>迭代</span>
          <Select v-model="model1" style="width:100px">
            <Option v-for="item in optionList" :value="item.label" :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
          <span>故事类型</span>
          <Select v-model="model1" style="width:100px">
            <Option v-for="item in optionList" :value="item.label" :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
          <span>故事状态</span>
          <Select v-model="model1" style="width:100px">
            <Option v-for="item in optionList" :value="item.label" :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </div>
        <div class="transBodyRcon">

          <Checkbox :value="checkAllR" @click.prevent.native="handleCheckAllR" v-if="dataR.length>0">全选</Checkbox>
          <CheckboxGroup v-model="checkAllGroupR" @on-change="checkAllGroupChangeR">
            <!-- checkAllGroupR:{{checkAllGroupR}}+checkAllGroupOnoffR:{{checkAllGroupOnoffR}} -->
            <ul>
              <li v-for="item in dataR" :key="item.type">
                <div class="tranHeader">
                  <Checkbox :label="item.type">{{item.bigName}}</Checkbox>
                  <span style="margin:0 20px">{{item.stoyrType}} </span>
                  <span>{{item.stoyrStatus}}</span>
                  <Icon type="navicon-round" @click="item.isShow=!item.isShow"></Icon>
                </div>
                <div class="tranpanel" v-show="item.isShow">
                  <Table :columns="columns1" :data="item.list" size="small"></Table>
                </div>
              </li>

            </ul>
          </CheckboxGroup>
        </div>

      </div>
    </div>
    <div style="text-align:right;margin-right:12px;margin-top:10px">
        <Button type="primary" @click="addIterationOk('formValidate')">确定</Button>
        <Button @click="closeSelf">关闭</Button>
    </div>

    <!-- <div class="interation-tip">
      <span>
        说明：归档后的产品待办事项不能修改所属迭代。需求不与模块关联，任务与模块关联但是不是必须可删除任务，在任务详情里加删除按钮 删除迭代后，相关待办事项和任务不会删除，只是迭代未设置产品上线时需选择完成的待办事项或需求项，自动改变其任务、事项、需求项状态为完成
      </span>
    </div> -->
  </div>
</template>
<script>
export default {
    data() {
        return {
            sureInfo: "添加成功",
            storySearch: "",
            storyType: "",
            storyTypeArr: [
                {
                    value: "New York",
                    label: "故事类型1"
                },
                {
                    value: "London",
                    label: "故事类型2"
                },
                {
                    value: "Sydney",
                    label: "故事类型3"
                },
                {
                    value: "Ottawa",
                    label: "故事类型4"
                }
            ],
            formValidate: {
                title: "添加迭代",
                taskName: "",
                startTime: "",
                endTime: ""
            },
            ruleValidate: {
                taskName: [
                    {
                        required: true,
                        message: "迭代名称不能为空",
                        trigger: "blur"
                    }
                ],
                startTime: [
                    {
                        required: true,
                        type: "date",
                        message: "请选择开始时间",
                        trigger: "change"
                    }
                ],
                endTime: [
                    {
                        required: true,
                        type: "date",
                        message: "请选择结束时间",
                        trigger: "change"
                        // validator: validateEndTime
                    }
                ]
            },
            bgcolorL: "ghost",
            bgcolorR: "ghost",
            nowNum: 0,
            search: "",
            titleName: "",
            optionList: [
                {
                    value: "1",
                    label: "迭代1"
                },
                {
                    value: "2",
                    label: "迭代2"
                },
                {
                    value: "3",
                    label: "迭代3"
                },
                {
                    value: "",
                    label: "未规划"
                }
            ],
            model1: "",

            indeterminate: true,
            checkAll: false,
            checkAllR: false,
            checkAllGroup: [], //v-model的控制多选框组是否打钩的
            checkAllGroupR: [],
            checkAllGroupOnoff: [], //全选按钮
            checkAllGroupOnoffR: [],

            columns1: [
                {
                    title: "任务名称",
                    width:260,
                    key: "smallName"
                },
                {
                    title: "责任人",
                    width:100,
                    key: "personLiable"
                },
                {
                    title: "状态",

                    key: "status"
                }
            ],
            dataL: [
                {
                    type: 1,
                    bigName: "故事1",
                    stoyrType: "类型1",
                    stoyrStatus: "stoyrStatus1",
                    isShow: true,
                    list: [
                        {
                            smallName: "全流程敏捷开发全流程敏捷开发",
                            status: "进行中",
                            personLiable: "李卓"
                        },
                        {
                            smallName: "web组件开发",
                            status: "已完成",
                            personLiable: "李卓"
                        }
                    ]
                },
                {
                    type: 2,
                    bigName: "故事2",
                    stoyrType: "类型2",
                    stoyrStatus: "stoyrStatus2",
                    isShow: false,
                    list: [
                        {
                            smallName: "全流程敏捷开发全流程敏捷开发2",
                            status: "进行中",
                            personLiable: "李卓"
                        },
                        {
                            smallName: "web组件开发2",
                            status: "已完成",
                            personLiable: "李卓"
                        }
                    ]
                }
            ],
            dataR: [
                {
                    type: 3,
                    bigName: "故事3",
                    stoyrType: "类型3",
                    stoyrStatus: "stoyrStatus3",
                    isShow: true,
                    list: [
                        {
                            smallName: "全流程敏捷开发全流程敏捷开发3",
                            status: "进行中",
                            personLiable: "李卓"
                        },
                        {
                            smallName: "web组件开发3",
                            status: "已完成",
                            personLiable: "李卓"
                        }
                    ]
                },
                {
                    type: 4,
                    bigName: "故事4",
                    stoyrType: "类型4",
                    stoyrStatus: "stoyrStatus4",
                    isShow: false,
                    list: [
                        {
                            smallName: "全流程敏捷开发全流程敏捷开发4",
                            status: "进行中",
                            personLiable: "李卓"
                        },
                        {
                            smallName: "web组件开发4",
                            status: "已完成",
                            personLiable: "李卓"
                        }
                    ]
                }
            ]
        };
    },

    methods: {
        //移动操作
        toLeft() {
            if (this.checkAllGroupR.length < 1) {
                //alert("请选择事项");
                this.$Modal.error({
                    title: "提示",
                    content: "请选择事项"
                });
            } else {
                this.checkAllGroupR.forEach(element => {
                    // alert(this.dataR.find(n => n.type == element))
                    this.dataL.push(this.dataR.find(n => n.type == element));
                    this.dataR.splice(
                        this.dataR.findIndex(n => n.type == element),
                        1
                    );
                });
                this.checkAll = false;
                this.checkAllR = false;
            }
        },
        toRight() {
            if (this.checkAllGroup.length < 1) {
                //alert("请选择事项");
                this.$Modal.error({
                    title: "提示",
                    content: "请选择事项"
                });
            } else {
                this.checkAllGroup.forEach(element => {
                    // alert(this.dataR.find(n => n.type == element))
                    this.dataR.push(this.dataL.find(n => n.type == element));
                    this.dataL.splice(
                        this.dataL.findIndex(n => n.type == element),
                        1
                    );
                });
                this.checkAll = false;
                this.checkAllR = false;
            }
        },
        //多选操作
        handleCheckAll() {
            if (this.checkAll) {
                this.checkAllGroup = [];
            } else {
                this.checkAllGroup = this.checkAllGroupOnoff;
            }
            this.checkAll = !this.checkAll;
        },
        handleCheckAllR() {
            if (this.checkAllR) {
                this.checkAllGroupR = [];
            } else {
                this.checkAllGroupR = this.checkAllGroupOnoffR;
            }
            this.checkAllR = !this.checkAllR;
        },
        checkAllGroupChange(data) {
            if (data.length < this.dataL.length) {
                this.checkAll = false;
            } else {
                this.checkAll = true;
            }
        },
        checkAllGroupChangeR(data) {
            if (data.length < this.dataR.length) {
                this.checkAllR = false;
            } else {
                this.checkAllR = true;
            }
        },
        //开始时间与结束时间判断
        timeJudge(date1, date2) {
            let oDate1 = new Date(date1);
            let oDate2 = new Date(date2);
            if (oDate1.getTime() > oDate2.getTime()) {
                return false;
            } else {
                return true;
            }
        },
        //添加迭代确认按钮
        addIterationOk(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    let onoff = this.timeJudge(
                        this.formValidate.startTime,
                        this.formValidate.endTime
                    );
                    if (!onoff) {
                        this.$Message.error("开始时间不能大于结束时间!");
                    } else {
                        this.$Message.success(this.sureInfo);
                        // this.$refs[name].resetFields();
                         //点击跳转页面
                          this.$router.push({
                              path: "/iteration"
                          });
                    }
                } else {
                    this.$Message.error("请填写好必填内容!");
                }
            });
        },
        closeSelf() {
          this.$router.push({
              path: "/iteration"
          });
        },
    },
    computed: {
        totalNum: function() {
            return this.dataL.length;
        },
        nowlNum: function() {
            return this.checkAllGroup.length;
        }
        // newValue() {
        //   return this.dataL
        // }
    },
    watch: {
        // newValue(val, oldVal){
        //   oldVal.forEach(element => {
        //     this.checkAllGroupOnoff.push(element.type)
        //   });
        // },
        // dataL: {
        //   //深度监听，可监听到对象、数组的变化
        //   handler(val) {
        //     alert("监控到了obj变化");
        //     val.forEach(element => {
        //       this.checkAllGroupOnoff.push(element.type);
        //     });
        //   },
        //   deep: true
        // }
        checkAllGroup(val) {
            console.log(val);
            if (val.length > 0) {
                this.bgcolorR = "info";
            } else {
                this.bgcolorR = "ghost";
            }
        },
        checkAllGroupR(val) {
            console.log(val);
            if (val.length > 0) {
                this.bgcolorL = "info";
            } else {
                this.bgcolorL = "ghost";
            }
        },
        dataL(val) {
            alert("监控到了obj变化");
            this.checkAllGroupOnoff = [];
            val.forEach(element => {
                this.checkAllGroupOnoff.push(element.type);
            });
            this.checkAllGroup = [];
        },
        dataR(val) {
            alert("监控到了obj2变化");
            this.checkAllGroupOnoffR = [];
            val.forEach(element => {
                this.checkAllGroupOnoffR.push(element.type);
            });
            this.checkAllGroupR = [];
        }
    },
    created() {
        this.dataL.forEach(element => {
            this.checkAllGroupOnoff.push(element.type);
        });
        this.dataR.forEach(element => {
            this.checkAllGroupOnoffR.push(element.type);
        });
    },
    mounted() {
        this.formValidate.taskName = this.$route.query.iterationName;
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

.interation-tip {
    font-size: 12px;
    color: #909090;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #e0e0e0;
    margin-top: 30px;
    line-height: 20px;
}
.transBody {
    overflow: hidden;
    /* min-height: 50vh; */
    margin-top: 20px;
    /* display: flex; */
}
.transBodyL {
    /* flex-grow:1; */
    width: 454px;
    float: left;
    overflow: hidden;
    border: 1px solid #d8d8d8;
    border-radius: 4px;
}
.transBody h3 {
    height: 40px;
    line-height: 40px;
    text-indent: 10px;
    background: #f9fafc;
    margin-bottom: 10px;
}
.transBodyL li {
    /* margin-top: 20px; */
}

.transBodyC {
    width: 140px;
    float: left;
    overflow: hidden;
    margin: 0 10px;
    margin-top:6vh;
    line-height: 40px;
}
.transBodyR {
    width: 490px;
    float: left;
    overflow: hidden;
    border: 1px solid #d8d8d8;
    border-radius: 4px;
}
.trans-top {
    margin-top: 6px;
    padding-left: 8px;
    margin-bottom: 6px;
}
.addTaskTable {
    height: 192px;
    padding: 10px;
    border: 1px solid #d8d8d8;
    border-radius: 4px;
}
.taskrow {
    height: 30px;
}
.tranHeader {
    margin: 10px;
}
.tranHeader .ivu-icon {
    float: right;
    cursor: pointer;
}
.totalNum {
    margin-right: 10px;
    color: #ff9900;
    font-weight: normal;
    font-size: 16px;
}
.infoGroup {

}

</style>
