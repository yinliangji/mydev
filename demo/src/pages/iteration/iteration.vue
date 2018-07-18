<template>
  <div class="container-transfer" :style="{minHeight: '100vh'}">
    <div class="trans-top">
      <span>迭代</span>
      <Select v-model="model1" style="width:100px">
        <Option v-for="item in optionList" :value="item.label" :key="item.value">
          {{ item.label }}
        </Option>
      </Select>
    </div>
    <Transfer
      :data="data4"
      :titles="titles"
      :target-keys="targetKeys4"
      :render-format="render4"
      filterable
      @on-selected-change="handleItem"
      @on-change="handleChange4">
    </Transfer>

    <div class="interation-tip">
      <span>
        说明：归档后的产品待办事项不能修改所属迭代。需求不与模块关联，任务与模块关联但是不是必须可删除任务，在任务详情里加删除按钮
        删除迭代后，相关待办事项和任务不会删除，只是迭代未设置产品上线时需选择完成的待办事项或需求项，自动改变其任务、事项、需求项状态为完成
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data4: [],
      targetKeys4: [],
      titles: [],
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
      model1: ""
    };
  },
  watch: {
    model1(val) {
      this.titles = this.getTitle();
    }
  },
  created() {
    this.data4 = this.getMockData();
    this.targetKeys4 = this.getTargetKeys();
    this.titles = this.getTitle();
  },
  mounted(){
    console.log(this.data4)
  },
  methods: {
    handleItem(event) {
      console.log(event);
      // console.log(targetSelectedKeys)
    },
    getMockData() {
      let mockData = [];
      for (let i = 1; i <= 10; i++) {
        mockData.push({
          key: i.toString(),
          label: "代办产品 " + i,
          isShow: true,
          description: "The desc of content  " + i,
          lists: [
            { title: "姓名", sex: "女" },
            { title: "姓名", sex: "女" },
            { title: "姓名", sex: "女" },
            { title: "姓名", sex: "女" }
          ]
        });
      }
      return mockData;
    },
    getTargetKeys() {
      return this.getMockData()
        .filter(() => Math.random() * 2 > 1)
        .map(item => item.key);
    },
    handleChange4(newTargetKeys) {
      this.targetKeys4 = newTargetKeys;
    },
    render4(item) {
      // return item.label;
      let key = item.key,
      html = '<div class="transtion-items">';
      html +=
        '<i class="ivu-icon ivu-icon-navicon-round transtion-items-btn" click="isShowList(item)"></i>';
      html += `<div class="transtion-box${item.key}">`;
      for (var i = 0; i < item.lists.length; i++) {
        html += `<span>${
          item.lists[i].title
        }</span> <span style="padding-left:30px;">${
          item.lists[i].sex
        }</span></br>`;
      }
      html += "</div></div>";
      return `${item.label}<br /> ${html}`;
    },
    isShowList(item) {
      console.log(item);
    },
    getTitle() {
      return ["迭代 (20160520)", this.model1];
    }
  }
};
</script>

<style scoped>
.container-transfer {
  width: 80%;
  margin: 0 auto;
  font-size: 14px;
}

.trans-top {
  margin: 30px 0;
  text-align: center;
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


</style>
