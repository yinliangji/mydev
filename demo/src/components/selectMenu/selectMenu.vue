<template>
  <div class="curPosition">
    <Icon type="navicon-round"></Icon>

    <span>选择项目</span>
    <Select v-model="model1" style="width:140px">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
  </div>
</template>

<script>
export default {
    data() {
        return {
            cityList: [
                {
                    value: "1",
                    label: "敏捷项目管理系统"
                },
                {
                    value: "2",
                    label: "党群系统"
                },
                {
                    value: "3",
                    label: "高校行政平台"
                },
                {
                    value: "4",
                    label: "一体化研发平台"
                }
            ],
            model1: ""
        };
    }
};
</script>
