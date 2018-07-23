<template>
  <div class="container-transfer" :style="{minHeight: '100vh'}">
    <div class="transBody">
      <div class="transBodyL">
        <h3>迭代名称-{{titleName}}
          <span class="totalNum">
            <i>{{nowlNum}}/</i>{{totalNum}}</span>
        </h3>
        <Checkbox :value="checkAll" @click.prevent.native="handleCheckAll" v-if="dataL.length>0">全选</Checkbox>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
          <!-- checkAllGroup:{{checkAllGroup}}+checkAllGroupOnoff:{{checkAllGroupOnoff}} -->
          <ul>
            <li v-for="item in dataL" :key="item.type">
              <div class="tranHeader">
                <Checkbox :label="item.type">{{item.bigName}}</Checkbox>
                <Icon type="navicon-round" @click="item.isShow=!item.isShow"></Icon>
              </div>
              <div class="tranpanel" v-show="item.isShow">
                <!-- <div class="addTaskTable">
                  <div class="taskrow clearfix">
                    <div class="addTaskTableTitle">任务名称：</div>
                    <div class="addTaskTableCon">{{item.name}}</div>
                  </div>
                  <div class="taskrow clearfix">
                    <div class="addTaskTableTitle">开始时间：</div>
                    <div class="addTaskTableCon">{{item.startTime}}</div>
                  </div>
                  <div class="taskrow clearfix">
                    <div class="addTaskTableTitle">结束时间：</div>
                    <div class="addTaskTableCon">2018-8-19</div>
                  </div>
                </div> -->
                <Table :columns="columns1" :data="dataL" size="small"></Table>
              </div>
            </li>
          </ul>
        </CheckboxGroup>

      </div>
      <div class="transBodyC">
        <Button :type="bgcolorL" long icon="chevron-left" @click="toLeft">To left</Button>
        <Button :type="bgcolorR" long icon="chevron-right" @click="toRight">To right</Button>
      </div>
      <div class="transBodyR">
        <div class="trans-top">
          <span>迭代</span>
          <Select v-model="model1" style="width:100px">
            <Option v-for="item in optionList" :value="item.label" :key="item.value">
              {{ item.label }}
            </Option>
          </Select>
          <Input v-model="search" placeholder="search" style="width:180px" icon="android-search">
          </Input>
        </div>
        <div class="transBodyRcon">
          <h3>{{model1}}</h3>
          <Checkbox :value="checkAllR" @click.prevent.native="handleCheckAllR" v-if="dataR.length>0">全选</Checkbox>
          <CheckboxGroup v-model="checkAllGroupR" @on-change="checkAllGroupChangeR">
            <!-- checkAllGroupR:{{checkAllGroupR}}+checkAllGroupOnoffR:{{checkAllGroupOnoffR}} -->
            <ul>
              <li v-for="item in dataR" :key="item.type">
                <div class="tranHeader">
                  <Checkbox :label="item.type">{{item.bigName}}</Checkbox>
                  <Icon type="navicon-round" @click="item.isShow=!item.isShow"></Icon>
                </div>
                <div class="tranpanel" v-show="item.isShow">
                  <!-- <div class="addTaskTable">
                    <div class="taskrow clearfix">
                      <div class="addTaskTableTitle">任务名称：</div>
                      <div class="addTaskTableCon">{{item.name}}</div>
                    </div>
                    <div class="taskrow clearfix">
                      <div class="addTaskTableTitle">开始时间：</div>
                      <div class="addTaskTableCon">{{item.startTime}}</div>
                    </div>
                    <div class="taskrow clearfix">
                      <div class="addTaskTableTitle">结束时间：</div>
                      <div class="addTaskTableCon">2018-8-19</div>
                    </div>
                  </div> -->
                  <Table :columns="columns1" :data="dataR"></Table>
                </div>
              </li>

            </ul>
          </CheckboxGroup>
        </div>

      </div>
    </div>

    <div class="interation-tip">
      <span>
        说明：归档后的产品待办事项不能修改所属迭代。需求不与模块关联，任务与模块关联但是不是必须可删除任务，在任务详情里加删除按钮 删除迭代后，相关待办事项和任务不会删除，只是迭代未设置产品上线时需选择完成的待办事项或需求项，自动改变其任务、事项、需求项状态为完成
      </span>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            bgcolorL:"ghost",
            bgcolorR:"ghost",
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
            // dataL: [
            //     {
            //         type: 1,
            //         name: "事项1",
            //         startTime: "2017-08-01",
            //         endTime: "2017-08-01",
            //         isShow: true
            //     },
            //     {
            //         type: 2,
            //         name: "事项2",
            //         startTime: "2017-08-01",
            //         endTime: "2017-08-01",
            //         isShow: false
            //     }
            // ],
            // dataR: [
            //     {
            //         type: 3,
            //         name: "事项3",
            //         startTime: "2017-08-01",
            //         endTime: "2017-08-01",
            //         isShow: false
            //     },
            //     {
            //         type: 4,
            //         name: "事项4",
            //         startTime: "2017-08-01",
            //         endTime: "2017-08-01",
            //         isShow: false
            //     }
            // ],
            columns1: [
                {
                    title: "任务名称",
                    key: "smallName"
                },
                {
                    title: "状态",
                    key: "status"
                }
            ],
            dataL: [
                {
                    type: 1,
                    bigName: "事项1",
                    smallName: "全流程敏捷开发全流程敏捷开发",
                    status: "进行中",
                    isShow: false
                },
                {
                    type: 2,
                    bigName: "事项2",
                    smallName: "web组件开发",
                    status: "已完成",
                    isShow: false
                }
            ],
            dataR: [
                {
                    type: 3,
                    bigName: "事项3",
                    smallName: "全流程敏捷开发",
                    status: "进行中",
                    isShow: false
                },
                {
                    type: 4,
                    bigName: "事项4",
                    smallName: "web组件开发",
                    status: "已完成",
                    isShow: false
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
        }
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
        checkAllGroup(val){
          console.log(val);
          if(val.length>0){
            this.bgcolorL="info"
          }else{
            this.bgcolorL="ghost"
          }
        },
        checkAllGroupR(val){
          console.log(val);
          if(val.length>0){
            this.bgcolorR="info"
          }else{
            this.bgcolorR="ghost"
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
        this.titleName = this.$route.query.iterationName;
    }
};
</script>

<style scoped>
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
    min-height: 80vh;
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
    line-height: 40px;
    text-indent: 10px;
    background: #f9fafc;
    margin-bottom: 10px;
}
.transBodyL li {
    margin-top: 20px;
}

.transBodyC {
    width: 140px;
  float: left;
    overflow: hidden;
    margin: 0 10px;
    margin-top: 30vh;
    line-height: 40px;
}
.transBodyR {
    width: 454px;
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
    background: #d8d8d8;
    margin-top: 10px;
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
    float: right;
    margin-right: 10px;
    color: #ff9900;
    font-weight: normal;
    font-size: 16px;
}
</style>
