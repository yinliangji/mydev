<template>
  <div class="curPosition">
    <Icon type="navicon-round"></Icon>

    <span>选择项目1111</span>
    <Select v-model="curProject" style="width:140px" @on-change="changeCurProject">
      <Option v-for="item in projectList" :value="item.id" :key="item.id">{{ item.prj_name }}</Option>
    </Select>
  </div>
</template>

<script>
export default {
    data() {
        return {
            projectList: [
                // {
                //     id: 1,
                //     prj_name: "敏捷项目管理系统"
                // },
                // {
                //     id: 2,
                //     prj_name: "党群系统"
                // },
                // {
                //     id: 3,
                //     prj_name: "高校行政平台"
                // },
                // {
                //     id: 4,
                //     prj_name: "一体化研发平台"
                // }
            ],
            curProject: ""
        };
    },
    methods: {
        changeCurProject(data){
            alert(data)
            //this.$emit("changeSelect",this.curProject);
            //this.setCookie("prj_id",data)

        },
    }
};
</script>
