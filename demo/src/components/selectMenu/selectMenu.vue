<template>
  <div class="curPosition">
    <Icon type="navicon-round"></Icon>

    <span>选择项目{{curProject}}</span>
    <Select v-model="curProject" style="width:140px" @on-change="changep">
      <Option v-for="item in projectList" :value="item.id" :key="item.id">{{ item.prj_name }}</Option>
    </Select>
  </div>
</template>

<script>
export default {
    data() {
        return {
            projectList: [
                {
                    id: "1",
                    prj_name: "敏捷项目管理系统"
                },
                {
                    id: "2",
                    prj_name: "党群系统"
                },
                {
                    id: "3",
                    prj_name: "高校行政平台"
                },
                {
                    id: "4",
                    prj_name: "一体化研发平台"
                }
            ],
            curProject: ""
        };
    },
    methods:{
      changep(data){
        //alert(data)
        sessionStorage.setItem('prj_id', data);
      }
    },
    mounted() {
      this.curProject = "3";
     	sessionStorage.setItem('prj_id', this.curProject);
    }
};
</script>
