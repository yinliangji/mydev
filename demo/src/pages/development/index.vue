<template>
  <div class="pageContent">
    <!-- <Breadcrumb :style="{margin: '16px 0'}">
      <BreadcrumbItem>当前位置</BreadcrumbItem>
      <BreadcrumbItem>开发任务管理</BreadcrumbItem>
    </Breadcrumb> -->
    <goAgile :go="'/agile'" :text="'返回敏捷项目列表'" :Top="'10'" />
    <selectMenu></selectMenu>
    <div class="pageCon">

      <div class="newTop">
        <h3 class="Title"><span>开发任务管理</span></h3>
        <Form>
          <Row>
            <Col span="20">
            <Row>
              <Col span="3" style="text-align: center">
                <div class="searchName">所属迭代</div>
              </Col>
              <Col span="5">
              <FormItem>
                <Select ref="belongIteration" v-model="belongIteration" clearable @on-change="changStory"   placeholder="请选择迭代">
                    <Option v-for="(item,index) in belongIterationList" :value="item.sp_id" :key="index">{{ item.sp_name }}</Option>
                </Select>
                <!-- <Input placeholder="输入迭代名称" v-model="iterationName"></Input> -->
              </FormItem>
              </Col>
              <Col span="3" style="text-align: center">
              <div class="searchName">用户故事</div>
              </Col>
              <Col span="5">
              <FormItem>
                <!-- <Input placeholder="输入迭代编号" v-model="iterationNumber"></Input> -->
                <Select ref="storyName" v-model="storyName" clearable filterable  placeholder="请选择用户故事">
                    <Option v-for="(item,index) in storyNameList" :value="item.id" :key="index">{{ item.userstory_name }}</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="3" style="text-align: center">
              <div class="searchName">责任人</div>
              </Col>
              <Col span="5">
              <FormItem>
                <Select ref="personLiable" v-model="personLiable" clearable filterable  placeholder="请选择责任人">
                    <Option v-for="(item,index) in personLiableList" :value="item.user_name" :key="index">{{ item.nick_name }}</Option>
                </Select>
                <!-- <Input placeholder="输入迭代编号" v-model="needName"></Input> -->
              </FormItem>
              </Col>
            </Row>
            <Row v-show="isShowMoreShow">
              <Col span="3" style="text-align: center">
              <div class="searchName">工作项状态</div>
              </Col>
              <Col span="5">
              <FormItem>
                <Select ref="taskStatus" v-model="taskStatus" clearable   placeholder="请选择工作项状态">
                    <Option v-for="(item,index) in taskStatusList" :value="item.id" :key="index">{{ item.name }}</Option>
                </Select>
                <!-- <Input placeholder="输入迭代名称" v-model="taskStatus"></Input> -->
              </FormItem>
              </Col>
              <Col span="3" style="text-align: center">
              <div class="searchName">工作项编号</div>
              </Col>
              <Col span="5">
              <FormItem>
                <Input placeholder="输入工作项编号编号" v-model="taskNumber" clearable ></Input>
              </FormItem>
              </Col>
              <Col span="3" style="text-align: center">
              <div class="searchName">工作项名称</div>
              </Col>
              <Col span="5">
              <FormItem>
                <Input placeholder="输入工作项名称" v-model="taskName" clearable></Input>
              </FormItem>
              </Col>
            </Row>



            <!--  -->
            <Row v-show="isShowMoreShow">
              <Col span="3" style="text-align: center">
              <div class="searchName">工作项类型</div>
              </Col>
              <Col span="5">
              <FormItem>
                <Select ref="taskStyle" v-model="taskStyle" clearable   placeholder="请选择工作项类型">
                    <Option v-for="(item,index) in taskStyleList" :value="item.id" :key="index">{{ item.name }}</Option>
                </Select>
                <!-- <Input placeholder="输入迭代名称" v-model="taskStatus"></Input> -->
              </FormItem>
              </Col>
              <Col span="3" style="text-align: center">
              <div class="searchName">小组名称</div>
              </Col>
              <Col span="5">
              <FormItem>
                <Select ref="taskGroupName" v-model="taskGroupName" clearable   placeholder="请选择小组名称">
                    <Option v-for="(item,index) in taskGroupList" :value="item.group_sn" :key="index">{{ item.gropu_name }}</Option>
                </Select>
              </FormItem>
              </Col>
              <Col span="3" style="text-align: center">
                &nbsp;
              </Col>
              <Col span="5">
                &nbsp;
              </Col>
            </Row>
            <!--  -->


            </Col>
            <Col span="4" style="text-align: right" class="serchBtnBox">
              <Button type="primary" icon="ios-search" class="serchBtn" @click="searchHandle">查询</Button>
              <Button  class="serchBtn" @click="resetHandle">重置</Button>
            </Col>
          </Row>
          <div class="formValidateMoreBtnBox" @click="isShowMoreShow = !isShowMoreShow">
              <Icon type="chevron-down" color="#ed3f14"></Icon>
              <Icon type="chevron-down" color="#ed3f14"></Icon>
          </div>
        </Form>
      </div>
      <div class="w80">
        <Row :gutter="16" style="margin-bottom:10px">
          <Col span="2" style="margin-right:10px;margin-top: -2px;">
          <Button type="success" :disabled="isShowMngAllBtn" @click="addNewTask">添加工作项</Button>
          </Col>
          <Col span="1">
          <img src="@/assets/images/product-list.png" @click="showList" class="cursor">
          </Col>
          <Col span="1">
          <img src="@/assets/images/product-kanban.png" @click="showTask" class="cursor">
          </Col>
          <Col span="1">
          <span class="high">
            高
          </span>
          </Col>
          <Col span="1">
          <span class="middle">
            中
          </span>
          </Col>
          <Col span="1">
          <span class="low">
            低
          </span>
          </Col>
        </Row>
      </div>

      <component 
        :is="currentView" 
        :cardList="cardList" 
        :groupList="groupList" 
        :statusList="statusList"
        :tableList="currentPage"
        :totalPage="totalPage"
        :getPermission="isShowMngAllBtn"
        :mytaskOnoff="mytaskOnoff"
        @refreshListCurPage="onrefreshListCurPage"
        @refreshListPageSize="onrefreshListPageSize"
        :aside="'development'"
        :boardName="'developmentBoard'" 
        id="developmentBoardBox"
        v-if="magicKanban"
        >
      </component>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/tools";
import kanbanboard from "@/components/kanbanboard";
import developList from "@/pages/development/development";
import Common from '@/Common';
const {getSprintsByPrj,getUserstoryByPrjId,getTaskStatusSettings,getTaskTypeSettings,getUserByProjId,developListAxiosData,changeTaskStatus,getPermission,projectListDataNew,getDefaultSpringIdByPrj,queryCondition,getUserStoryBySprintMId,developkanbanAxiosData} = Common.restUrl;
export default {
    data() {
        return {
            magicKanban:true,
            sprints_story:[],
            storyNameListClone:[],
            picOnoff:true,
            proName:"",
            isShowMngAllBtn:false,
            currentPage:1,
            pageSize:10,
            devListOrKanbanOnoff:true,
            totalPage:0,
            tableList:[],
            isShowMoreShow:false,
            //search
            taskName:"",
            taskNumber:"",
            storyName:"",
            taskStatus: "",
            belongIteration: "",
            personLiable: "",
            currentView: "kanbanboard",
            taskStyle:"",
            taskGroupName:"",
            storyNameList:[],
            taskStatusList:[],
            belongIterationList:[],
            personLiableList:[],
            taskStyleList:[],
            taskGroupList:[],
            //
            cardListBase:[],
            groupListBase:[],
            statusListBase:[],
            groupList:[],//替换
            mytaskOnoff:false,
            //
            iterationName: "",
            iterationNumber: "",
            needName: "",
        };
    },
    created() {
      if(this.$route.query.devListOrKanbanOnoff){
        this.currentView = "developList";
        this.devListOrKanbanOnoff = false;
        this.picOnoff = false;
      }
      if (this.$route.query.board) {
          this.currentView = kanbanboard;
      }
      if (this.$route.query.watchKanban) {
          this.currentView = kanbanboard;
      }
      let timer = setInterval(()=>{
        if(this.getCookie("username")){
          this.getPermission();
          clearInterval(timer)
        }
      },1000);
      this.queryConditionAxios();
    },
    mounted() {
        EventBus.$on("moveEnd", this.moveEnd);
        EventBus.$on("clickItem", this.clicked);
        EventBus.$on("search", this.searchHandle);
        EventBus.$on("addTask", this.addNewTask);
    },
    beforeDestroy(){
      EventBus.$off("moveEnd", this.moveEnd);
      EventBus.$off("clickItem", this.clicked);
      EventBus.$off("search", this.searchHandle);
      EventBus.$off("addTask", this.addNewTask);
      EventBus.$off("bindSort", this.bindSortId);
      EventBus.$off("storyBindSort", this.bindSortId);
    },
    methods: {
      myTask(){
        this.mytaskOnoff=!this.mytaskOnoff;
        if(this.mytaskOnoff){
          this.personLiable = this.getCookie("username");
          if(!this.devListOrKanbanOnoff){
            this.currentPage = 1;
            this.MydevelopListAxios()
          }else{
            this.magicKanban = false;
            setTimeout(()=>{
              this.magicKanban = true;
              this.MydevelopKanbanAxios();
            },500)
          }

        }else{
          this.personLiable = "";
          this.$refs.personLiable.clearSingleSelect();
          if(!this.devListOrKanbanOnoff){
            this.currentPage = 1;
            this.developListAxios()
          }else{
            this.magicKanban = false;
            setTimeout(()=>{
              this.magicKanban = true;
              this.developKanbanAxios();
            },500)
          }

        }
      },
      onrefreshListCurPage(i){
        this.currentPage = i;
        var devlopChooseObj = JSON.stringify(sessionStorage.getItem("developChoose"));
        developChooseObj.currentPage = i;
        sessionStorage.setItem("developChoose",JSON.stringify(developChooseObj));
      },
      onrefreshListPageSize(i){
        this.pageSize = i;

      },
      changStory(data){
        if(data){
          for(let k in this.sprints_story){
            if(k== data){
              this.storyNameList = this.sprints_story[k]
            }
          }
        }else{
          this.storyNameList = this.storyNameListClone;
        }
      },
      moveEnd(info) {
          // 移动卡片结束后
          console.log(" 移动卡片结束后 :::", info);
          this.changeStateNumber(info);
          this.changeMovedStatus(info);
      },
      clicked(info) {
        // if(window.location.hash.indexOf("/development") == -1){
        //   return
        // }
         
        // 点击卡片方法
        console.log(" 点击卡片方法 ::: ", info);
        /*
        this.$router.push({
            path: "/development/detail",
            // query: {
            //     iterationName: params.row.name
            // }
        });
        */
        const {href} = this.$router.resolve({
          path:"/development/detail",
          query:{
            taskId:info.taskId,
            devlopId:info.id,
          }
        })
        window.open(href,"_blank")
      },
      searchHandle(info) {
          // 查询方法
          console.log("查询  ::: ", info);
          if(this.personLiable = this.getCookie("username")){
            this.mytaskOnoff = true;
          }else{
            this.mytaskOnoff = false;
          }
          let developChoose = {
            group_sn:this.taskGroupName,
            task_name:this.taskName,
            task_style:this.taskStyle,
            task_id:this.taskNumber,
            charger:this.personLiable,
            task_status:this.taskStatus,
            sprint_id:this.belongIteration,
            us_id:this.storyName,
            currentPage:1,
          };
          sessionStorage.setItem("developChoose",JSON.stringify(developChoose));
          if(!this.devListOrKanbanOnoff){
            this.currentPage = 1;
            this.developListAxios();
          }else{
            this.developKanbanAxios();
          }
      },
      resetHandle(){
        this.magicKanban = false;
        this.taskName = "";
        this.taskNumber = "";
        this.storyName = "";
        this.taskStatus = "";
        this.belongIteration = "";
        this.personLiable = "";
        this.taskStyle = "";
        this.taskGroupName = "";

        this.$refs.belongIteration.clearSingleSelect();
        this.$refs.storyName.clearSingleSelect();
        this.$refs.personLiable.clearSingleSelect();
        this.$refs.taskStatus.clearSingleSelect();
        this.$refs.taskStyle.clearSingleSelect();
        this.$refs.taskGroupName.clearSingleSelect();

        sessionStorage.removeItem("developChoose");
        this.mytaskOnoff = false;
        setTimeout(()=>{
          this.magicKanban = true;
          if(!this.devListOrKanbanOnoff){
            this.currentPage = 1;
            this.developListAxios();
          }else{
            this.developKanbanAxios();
          }
        },500)
      },
      queryConditionReset(){
        this.taskName = "";
        this.taskNumber = "";
        this.storyName = "";
        this.taskStatus = "";
        this.belongIteration = "";
        this.personLiable = "";
        this.taskStyle = "";
        this.taskGroupName = "";

        this.$refs.belongIteration.clearSingleSelect();
        this.$refs.storyName.clearSingleSelect();
        this.$refs.personLiable.clearSingleSelect();
        this.$refs.taskStatus.clearSingleSelect();
        this.$refs.taskStyle.clearSingleSelect();
        this.$refs.taskGroupName.clearSingleSelect();

        sessionStorage.removeItem("developChoose");
        this.mytaskOnoff = false;

      },
      getPermission(){
        this.$axios({
          method:"get",
          url:getPermission,
          params:{
            username:this.getCookie("username"),
          },
        })
        .then((res)=>{
          if(res.data.status == "success"){
            let _permission = res.data.permission ? res.data.permission : res.data.prj_permission;
            let devlopIndex = _permission.findIndex(n=>n == "icdp_devTask_mng");
            if(devlopIndex > -1){
              this.isShowMngAllBtn = false;
            }else{
              this.isShowMngAllBtn = true;
            }
          }else if(res.data.status == "redirect"){
            toLoginPage(this)
          }
        })
      },
      selectMenuFn(data){
        Common.setStorageAndCookie(Common,"id",data);
        this.setCookie("prjId",data);
        sessionStorage.removeItem("developChoose");
        this.$router.push({
          path:"/development",
        });
        this.queryConditionAxios();
      },
      queryConditionAxios(){
        //return
        this.$axios({
          methon:"get",
          url:queryCondition,
          params:{
            prj_id:this.getCookie("prjId"),
          },
        })
        .then((res)=>{
          this.queryConditionReset();
          this.taskGroupList = res.data.prjGroup;
          this.personLiableList = res.data.prjUser;
          this.belongIterationList = res.data.sprintlist;
          this.belongIterationList.unshift({
            sp_id:0,
            sp_name:"未规划迭代",
          });
          this.taskStyleList = res.data.typelist;
          this.taskStatusList = res.data.statuslist;
          this.storyNameList = res.data.userstory;
          this.storyNameListClone = res.data.userstory;
          this.sprints_story = res.data.sprints_story;
          var developChooseObj = JSON.stringify(sessionStorage.getItem("developChoose"));
          if(developChooseObj){
            this.taskName = developChooseObj.task_name;
            this.taskStyle = developChooseObj.task_type;
            this.taskNumber = developChooseObj.task_id;
            this.personLiable = developChooseObj.charger;
            this.taskStatus = developChooseObj.task_status;
            this.belongIteration = developChooseObj.sprint_id;
            this.storyName = developChooseObj.us_id;
            this.currentPage = developChooseObj.currentPage;
            this.$nextTick(()=>{
              this.developListAxios();
              this.developKanbanAxios();
              if(this.belongIteration){
                for(let k in this.sprints_story){
                  if(k == this.belongIteration){
                    this.storyNameList = this.sprints_story[k]
                  }
                }
              }else{
                this.storyNameList = this.storyNameListClone;
              }
            });
          }else{
            this.$axios({
              method:"get",
              url:getDefaultSpringIdByPrj,
              params:{
                prj_id:this.getCookie("prjId"),
              }
            })
            .then((res)=>{
              this.belongIteration = res.data.data;
              if(this.$route.query.us_name){
                this.belongIteration = "";
                this.storyName = this.$route.query.us_name + "";
              }
              if(this.$route.query.iterationId){
                this.belongIteration = Number(this.$route.query.iterationId);
              }
              this.$nextTick(()=>{
                this.developListAxios();
                this.developKanbanAxios();
                if(this.belongIteration){
                  for(let k in this.sprints_story){
                    if(k == this.belongIteration){
                      this.storyNameList = this.sprints_story[k];
                    }
                  }
                }else{
                  this.storyNameList = this.storyNameListClone;
                }
              });
            });
          }
        });
      },
      changeStateNumber(info){
        let _statusBase = _.cloneDeep(this.statusListBase);
        let toState = info.evt.to.getAttribute('state');
        let fromState = info.evt.from.getAttribute('state');

        if(toState == fromState){
          return;
        }else{
          this.statusListBase = [];
          _statusBase.forEach((item,index)=>{
            if(fromState == item.state){
              item.taskNumber = parseFloat(item.taskNumber) - 1
            }
            if(item.state == toState){
              item.taskNumber = parseFloat(item.taskNumber) + 1
            }
          });
          this.statusListBase.push(..._statusBase);
        }
      },
      changeMovedStatus(info){
        let _params = {};
        _params.taskId = info.evt.item.getAttribute('taskid');
        //_params.ID = info.item.detail_id;
        _params.ID = info.evt.item.getAttribute('detailid');
        _params.taskStatus = info.evt.to.getAttribute('state');
        _params.taskStatusFrom = info.evt.from.getAttribute('state');
        if(_params.taskStatus == _params.taskStatusFrom){
          return
        }
        this.$axios({
          method:"get",
          url:changeTaskStatus,
          params:_params,
        })
        .then(()=>{

        })

      },
      addNewTask() {
          //点击跳转页面
          this.$router.push({
              path: "/development/add"
          });
      },

      // addNewTask(info) {
      //   EventBus.$emit("addTask", info);
      // },
      showList() {
        this.picOnoff = false;
        this.currentView = "developList";
        this.devListOrKanbanOnoff = false;
        if(this.mytaskOnoff){
          this.MydevelopListAxios();
        }else{
          this.developListAxios();
        }
      },
      showTask() {
        this.picOnoff = true;
        this.currentView = "kanbanboard";
        this.devListOrKanbanOnoff = true;
        if(this.mytaskOnoff){
          this.MydevelopKanbanAxios();
        }else{
          this.developKanbanAxios();
        }
      },
      //分页
      changeCurrentPage(i) {
          alert(i);
      },
      changePageSize(i) {
          alert(i);
      },
      MydevelopListAxios(){
        this.$axios({
          method:"get",
          url:developListAxiosData,
          params:{
            data:"",
            page:this.currentPage,
            limit:this.pageSize,
            prj_id:this.getCookie("prjId"),
            task_name:this.taskName,
            task_type:this.taskStyle,
            task_id:this.taskNumber,
            charger:this.getCookie("username"),
            task_status:this.taskStatus,
            sprint_id:this.belongIteration,
            us_id:this.storyName,
            group_sn:this.taskGroupName,
          }
        })
        .then((res)=>{
          let tableListArr = [];
          res.data.rows.forEach((item,index)=>{
            item.nick_name = item.naic_name.split("_")[0]+")";
          })
          this.tableList = res.data.rows;
          this.totalPage = parseInt(res.data.total);
        })
      },
      MydevelopKanbanAxios(){
        this.$axios({
          method:"get",
          url:developkanbanAxiosData,
          params:{
            prj_id:this.getCookie("prjId"),
            task_name:this.taskName,
            task_type:this.taskStyle,
            task_id:this.taskNumber,
            task_status:this.taskStatus,
            sprint_id:this.belongIteration,
            us_id:this.storyName,
            cookieName:this.getCookie("username"),
            group_sn:this.taskGroupName,
          }
        })
        .then((res)=>{
          if(res.data.role == "icdp_projManager"){
            res.data.cardList.forEach((item)=>{
              item.isTaskPerson = true;
            })
          };
          this.cardListBase = res.data.cardList;
          this.groupList = res.data.groupList;
          this.statusListBase = res.data.statusList;
          EventBus.$emit("bindSort");
        })
      },
      developListAxios(){
        this.$axios({
          method:"get",
          url:developListAxiosData,
          params:{
            data:"",
            page:this.currentPage,
            limit:this.pageSize,
            prj_id:this.getCookie("prjId"),
            task_name:this.taskName,
            task_type:this.taskStyle,
            task_id:this.taskNumber,
            charger:this.personLiable,
            task_status:this.taskStatus,
            sprint_id:this.belongIteration,
            us_id:this.storyName,
            group_sn:this.taskGroupName,
          }
        })
        .then((res)=>{
          let tableListArr = [];
          res.data.rows.forEach((item,index)=>{
            item.nick_name = item.naic_name.split("_")[0]+")";
          })
          this.tableList = res.data.rows;
          this.totalPage = parseInt(res.data.total);
        })
      },
      developKanbanAxios(){
        this.$axios({
          method:"get",
          url:developkanbanAxiosData,
          params:{
            prj_id:this.getCookie("prjId"),
            task_name:this.taskName,
            task_type:this.taskStyle,
            task_id:this.taskNumber,
            charger:this.personLiable,
            task_status:this.taskStatus,
            sprint_id:this.belongIteration,
            us_id:this.storyName,
            cookieName:this.getCookie("username"),
            group_sn:this.taskGroupName,
          }
        })
        .then((res)=>{
          if(res.data.role == "icdp_projManager"){
            res.data.cardList.forEach((item)=>{
              item.isTaskPerson = true;
            })
          };
          this.cardListBase = res.data.cardList;
          this.groupList = res.data.groupList;
          this.statusListBase = res.data.statusList;
          EventBus.$emit("bindSort");
        })
      },
    },
    computed: {
        //所有卡片数据
        cardList: function() {
          
          let __cardList = [
              {
                groupId:12799,
                isTaskPerson:true,
                taskId: "TS-PJ1800150-US0001",
                nickName: "xiebei.zh(谢蓓)",
                taskName:"任务名1XXX",
                userId: "xiebei.zh",
                id:1,
                taskStatus: 1,
                bgcolor:"#FE4514",
                headPortrait:"xxx/xx.jpg",
              },
              {
                groupId:12800,
                isTaskPerson:true,
                taskId: "TS-PJ1800150-US0002",
                nickName: "xiebei.zh(谢蓓)",
                taskName:"任务名2XXX",
                userId: "xiebei.zh",
                id:2,
                taskStatus: 2,
                bgcolor:"#FEB159",
                headPortrait:"xxx/xx.jpg",
              },
              {
                groupId:12799,
                isTaskPerson:true,
                taskId: "TS-PJ1800150-US0003",
                nickName: "xiebei.zh(谢蓓)",
                taskName:"任务名3XXX",
                userId: "xiebei.zh",
                id:3,
                taskStatus: 4,
                bgcolor:"#FE4514",
                headPortrait:"xxx/xx.jpg",
              },
              {
                groupId:12605,
                isTaskPerson:false,
                taskId: "TS-PJ1800150-US0004",
                nickName: "xiebei.zh(谢蓓)",
                taskName:"任务名4XXX",
                userId: "xiebei.zh",
                id:4,
                taskStatus: 3,
                bgcolor:"#FEB159",
                headPortrait:"xxx/xx.jpg",
              },
              {
                groupId:12605,
                isTaskPerson:false,
                taskId: "TS-PJ1800150-US0005",
                nickName: "lizhuo.zh(李卓)",
                taskName:"任务名5XXX",
                userId: "lizhuo.zh",
                id:5,
                taskStatus: 2,
                bgcolor:"#FEB159",
                headPortrait:"xxx/xx.jpg",
              },
              /*
              {
                  taskId: "#US0001",
                  taskName: "任务名1XXX",
                  description:
                      "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
                  userName: "user1",
                  userId: "userId_01",
                  groupId: "group_01",
                  bgColor: { background: "#b3ecec" },
                  taskStateStr: "未开始",
                  taskState: "01",
                  headPortrait: require("@/assets/images/user_02.png"),
                  userNeed: "用户界面设计",
                  iterations: "基础界面设计阶段"
              },
              {
                  taskId: "#US0002",
                  taskName: "任务名2XXX",
                  description:
                      "设计开发-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
                  userName: "user1",
                  userId: "userId_02",
                  groupId: "group_02",
                  bgColor: { background: "#f8d6af" },
                  taskStateStr: "设计开发",
                  taskState: "02",
                  headPortrait: require("@/assets/images/user_02.png")
              },
              {
                  taskId: "#US0003",
                  taskName: "任务名3XXX",
                  description:
                      "设计开发-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
                  userName: "user1",
                  userId: "userId_03",
                  groupId: "group_01",
                  bgColor: { background: "#f8d6af" },
                  taskStateStr: "设计开发",
                  taskState: "02",
                  headPortrait: require("@/assets/images/user_02.png")
              },
              {
                  taskId: "#US0004",
                  taskName: "任务名4XXX",
                  description:
                      "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
                  userName: "user1",
                  userId: "userId_04",
                  groupId: "group_03",
                  bgColor: { background: "#f8d6af" },
                  taskStateStr: "未开始",
                  taskState: "01",
                  headPortrait: require("@/assets/images/user_02.png")
              },
              {
                  taskId: "#US0005",
                  taskName: "任务名5XXX",
                  description:
                      "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
                  userName: "user1",
                  userId: "userId_05",
                  groupId: "group_01",
                  bgColor: { background: "#f8d6af" },
                  taskStateStr: "发布",
                  taskState: "04",
                  headPortrait: require("@/assets/images/user_02.png")
              },
              {
                  taskId: "#US0006",
                  taskName: "任务名6XXX",
                  description:
                      "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
                  userName: "user1",
                  userId: "userId_06",
                  groupId: "group_01",
                  bgColor: { background: "#f8d6af" },
                  taskStateStr: "上线",
                  taskState: "01",
                  headPortrait: require("@/assets/images/user_02.png")
              },
              {
                  taskId: "#US0007",
                  taskName: "任务名7XXX",
                  description:
                      "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
                  userName: "user1",
                  userId: "userId_07",
                  groupId: "group_01",
                  bgColor: { background: "#f8d6af" },
                  taskStateStr: "测试",
                  taskState: "05",
                  headPortrait: require("@/assets/images/user_02.png")
              },
              {
                  taskId: "",
                  taskName: "",
                  description:
                      "未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
                  userName: "",
                  userId: "userId_08",
                  groupId: "group_01",
                  bgColor: { background: "#fff" },
                  taskStateStr: "测试",
                  taskState: "03",
                  headPortrait: ""
              }
              */
          ];
          /* 以后加上 */
          let _cardList = this.cardListBase;
          let _groups = this.groupList;
          _cardList.forEach((cardItem,index)=>{
            _groups.forEach((groupItem,index)=>{
              if(cardItem.groupId == groupItem.groupId){
                Object.assign(cardItem,{bgcolor:groupItem.bgcolor});
                Object.assign(cardItem,{source:"task"});
                if(groupItem.isStoryPerson){
                  Object.assign(cardItem,{isTaskPerson:true});
                }
              }
            })
          });
          _cardList.forEach((item)=>{
            item.headPortrait = require("@/assets/images/user_02.png");
          })
          

          return _cardList;
        },
        //左侧分组数据
        __groupList: function() {
            let _groupList = [
                { text: "用户故事" },
                {
                    text: "用户登录",
                    groupId: 12799
                },
                {
                    text: "创建代码仓库",
                    groupId: 12800
                },
                {
                    text: "未知项",
                    groupId: 12605
                }
            ];
            return _groupList;
        },
        //水平显示任务数
        statusList: function() {
            let __statusList = [
                {
                    stateStr: "未开始",
                    state: 1,
                    taskNumber: 3
                },
                {
                    stateStr: "设计开发",
                    state: 2,
                    taskNumber: 4
                },
                {
                    stateStr: "测试",
                    state: 3,
                    taskNumber: 5
                },
                {
                    stateStr: "发布",
                    state: 4,
                    taskNumber: 6
                },
                
                /*
                {
                    stateStr: "未开始",
                    state: "01",
                    taskNumber: "3"
                },
                {
                    stateStr: "设计开发",
                    state: "02",
                    taskNumber: "4"
                },
                {
                    stateStr: "测试",
                    state: "03",
                    taskNumber: "5"
                },
                {
                    stateStr: "发布",
                    state: "04",
                    taskNumber: "6"
                },
                {
                    stateStr: "上线",
                    state: "05",
                    taskNumber: "3"
                }
                */
            ];
            /* 以后加上 */
            let _statusList = this.statusListBase;
            return _statusList;
        }
    },

    components: {
        kanbanboard,
        developList
    }
};
</script>
<style lang="less" scoped>
.pageContent{
  overflow:hidden;
}
.taskBtnAll{
  width:92px;
  height:32px;
  text-align:center;
  line-height:32px;
  border-radius:4px;
  color:#fff;
  background-color: #18b566;
  cursor:pointer;
  font-size: 12px;
}
.mytaskBtn{
  width:92px;
  height: 32px;
  text-align:center;
  line-height:32px;
  border-radius:4px;
  color:#b2b2b2;
  background-color: #fff;
  cursor:pointer;
  font-size: 12px;
  border:1px solid #b2b2b2;
}
.w80{
  overflow:hidden;
  margin-bottom: 8px;
}
.fl10{
  float: left;
  margin-right: 6px;
}
.product-list{
  background: url(../../assets/images/product-list.png) no-repeat;
  width:80px;
  height:30px;
  cursor:pointer;
  margin-top: 2px;
}
.product-kanban{
  background: url(../../assets/images/product-kanban.png) no-repeat;
  width:80px;
  height:30px;
  cursor:pointer;
  margin-top: 2px;
}
.product-list.product-listCur{
  background: url(../../assets/images/product-listCur.png) no-repeat;
}
.product-list.product-kanbanCur{
  background: url(../../assets/images/product-kanbanCur.png) no-repeat;
}
//头部
.ivu-layout-header {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
span.high,span.middle,span.low {color:#fff;border-radius:2px;}
span.high {
    background: #FE4514;
    width: 100%;
    height: 25px;
    display: inline-block;
    line-height: 25px;
    text-align: center;
}
span.middle {
    background: #12C37A;
    width: 100%;
    height: 25px;
    display: inline-block;
    line-height: 25px;
    text-align: center;
}
span.low {
    background: #FEB159;
    width: 100%;
    height: 25px;
    display: inline-block;
    line-height: 25px;
    text-align: center;
}
</style>
