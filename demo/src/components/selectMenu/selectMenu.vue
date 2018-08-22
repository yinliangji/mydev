<template>
  <div class="curPosition">
    <Icon type="navicon-round"></Icon>

    <span>选择项目</span>
    <Select v-model="curProject" style="width:140px" @on-change="changeCurProject">
      <Option v-for="item in projectList" :value="item.id" :key="item.id">{{ item.prj_name }}</Option>
    </Select>
  </div>
</template>

<script>
import Common from "@/Common";
const { projectListData } = Common.restUrl;
export default {
    data() {
        return {
            projectList: [
                // {
                //     id: "1",
                //     prj_name: "敏捷项目管理系统"
                // },
                // {
                //     id: "2",
                //     prj_name: "党群系统"
                // },
                // {
                //     id: "3",
                //     prj_name: "高校行政平台"
                // },
                // {
                //     id: "4",
                //     prj_name: "一体化研发平台"
                // }
            ],
            curProject: ""
        };
    },
    methods: {
        showProjectList(){
          this.$axios({
                method: "get",
                url: projectListData,
            }).then(res => {
                this.projectList = res.data;
                this.curProject = res.data[0].id;
                document.cookie = "prj_id" + "=" + res.data[0].id + "; ";
            });
        },
        changeCurProject(data) {
            //alert(data)
            //sessionStorage.setItem("prj_id", data);
            this.$emit("changeSelect",this.curProject);
            this.setCookie("prj_id", data)
        },

    },
    created(){
      this.showProjectList();
    },
    mounted() {
        //sessionStorage.setItem("prj_id", this.curProject);
        //document.cookie = "prj_id" + "=" + this.curProject + "; ";

    }
};
</script>
