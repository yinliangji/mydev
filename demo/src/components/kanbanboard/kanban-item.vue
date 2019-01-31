<template>
  <div 
    :id="item.userId" 
    @click="itemClick(item)" 
    class="card-wrapper"
    :dependId="item.id"
    :state="item.taskStatus"
    :taskid="item.taskId"
    :detailid="item.detail_id"
    :groupId="item.groupId"
    :nickname="item.nickName"
    :class="isDraggable(myRole,myAside,item.nickName,item.taskStatus,item.isTaskPerson)"
    >
      <div class="card-wrap">

        <p class="item-content" :title="item.taskName">
          <span class="levelText" :style="{'background':item.bgcolor}" v-show="item.bgcolor.indexOf('ffffff') == -1">
            {{levelText(item.bgcolor)}}
          </span>
          {{item.taskName}}
        </p>
        <!-- 顺序1:e0592b 2：7d2f74 3:00a6b6 4状态1:199c40 4状态2:db0102   -->
        <!-- 工作项状态识别 -->
        <p v-if="item.source=='task'" class="kananstatus">
          <span class="iconBg" style="color:#7d2f74;font-size:22px;transform:rotate(35deg);font-weight:bold" v-if="item.isFile=='yes'">
            <Icon type="paperclip"></Icon>
          </span>

          <span class="iconBg" style="font-size:20px" v-if="item.isDepend=='yes'" title="依赖项状态">
            <Icon type="ios-color-filter" color="#199c40" v-if="item.isFinish=='finish'"></Icon>
            <Icon type="ios-color-filter" color="#db0102" v-if="item.isFinish=='unfinish'"></Icon>
          </span>
        </p>
        <!-- 用户故事标识状态 -->
        <p v-if="item.source=='userstory'" class="kananstatus floatClear">
          <span class="iconBg" style="background:#e0592b" title="工作项个数" >
            {{item.task_count}}
          </span>
          <span class="iconBg" style="color:#7d2f74;font-size:22px;transform:rotate(35deg);font-weight:bold" v-if="item.isFile=='yes'">
            <Icon type="paperclip"></Icon>
          </span>
          <span class="iconBg" style="background:#00a6b6" title="测试案例个数" >
            {{item.testCase}}
          </span>
          <span class="iconBg" style="font-size:20px" v-if="item.isDepd=='yes'" title="依赖项状态">
            <Icon type="ios-color-filter" color="#199c40" v-if="item.isFinish=='finish'"></Icon>
            <Icon type="ios-color-filter" color="#db0102" v-if="item.isFinish=='unfinish'"></Icon>
          </span>
        </p>
        <!-- 需求项标识状态 -->
        <p v-if="item.source=='demand'" class="kananstatus floatClear">
          <span class="iconBg" style="background:#e0592b" title="用户故事个数" >
            {{item.us_counts}}
          </span>
          <span class="iconBg" style="font-size:20px" v-if="item.isDepd=='yes'" title="依赖项状态">
            <Icon type="ios-color-filter" color="#199c40" v-if="item.isFinish=='finish'"></Icon>
            <Icon type="ios-color-filter" color="#db0102" v-if="item.isFinish=='unfinish'"></Icon>
          </span>
        </p>



        <p class="item-name">
          <span class="user_name" v-if="nicknameFormat(myAside == 'product' || myAside == 'demand')" v-html="chackSymbol(item.nickName)">
          </span>
          <span class="user_name" v-else>
              {{item.nickName}}
          </span>
          <!-- <img :src="item.headPortrait" width="21" height="21" /> -->
          <!-- <img v-show="myAside == 'product' || myAside == 'demand'? false:true" :src="headPortrait" width="21" height="21" /> -->
        </p>
      </div>
  </div>
</template>

<script>
import { EventBus } from '@/tools';
import Common from '@/Common';
export default {
  props: {
    item: {
      type: Object,
      default: function(){
        return {}
      }
    },
    Group: {
      type: Boolean,
    },
    myAside: {//判断栏目
      type: [Boolean,String,Number],
      default: function() {
        return false;
      }
    },
    myRole: {//判断权限
      type: [Boolean,String,Number],
      default: function() {
        return false;
      }
    },
  },
  watch:{
    myRole(data){
      
    },
    myAside(data){
      
    },
  },
  mounted() {
    
  },
  methods: {
    chackSymbol(str){
      if(Common.ChackSymbol(str,"()")){
          let strArr = str.split("(")
          return strArr[0]+"<br />("+strArr[1]
        }else{
          return ""+"<br />"+str
        }
    },
    nicknameFormat(is){
      if(is){
        return true;
      }else{
        return false;
      }

    },
    isDraggable(r,a,n,s,tp){//myRole,myAside,item.nickName,item.taskStatus,item.isTaskPerson
      if(a == "product"){
        if(r == "icdp_projManager"){
          return "isDraggable"
        }else{
          return n.indexOf(Common.getCookie("username")) != -1 ? "isDraggable" : "isOpacity";
        }
      }else if(a == "demand"){
        return s == "07" || s == "08" ? "isDraggable" : "isOpacity";
      }else if(a == "development"){
        return tp ? "isDraggable" : "isOpacity";
      }else{
        return "isDraggable"
      }
    },
    levelText(color){
      if(color=="#FE4514" || color=="#FE4515"){
        return "高"
      }else if(color=="#12C37A"){
        return "中"
      }else if(color=="#FEB159"){
        return "低"
      }else{
        return "低"
      }
    },
    itemClick(info){
      EventBus.$emit('clickItem', info);
    },

  },
  data () {
    return {
      my_role:false,
      headPortrait:require("../../assets/images/tx.png"),
    }
  },

}
</script>

<style scoped>
.kananstatus{
  overflow: hidden;
  height: 20px;
  float: left;
}
.floatClear{
  clear: both;
  float: none;
}
.iconBg{
  display: block;
  float: left;
  font-size: 12px;
  color: #fff;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin-right:4px;
  text-align: center;
  line-height: 18px;
  vertical-align: top;
}
.isOpacity{
  position: relative;
}
.isOpacity:after{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 95%;
  height: 90%;
  transform:translate(-50%,-50%);
  background: black;
  content: "";
  opacity:0.15;
  border-radius:4px;
  pointer-events: none;
  
}
.levelText{
  padding: 4px 4px;
  float: left;
  color: #fff;
  border-radius: 50%;
  margin-right: 4px;
}
.card-wrapper {
  padding: 4px;
  margin-bottom: 4px;
  border-radius: 4px;
  border: 1px solid #ddd;
  /*min-height: 10px;*/
}
.card-wrap{
  cursor: pointer;
  /*
  margin-right: 10px;
  margin-bottom: 10px;
  */
 font-size: 12px;
}
.kanban-item {
  width: 100px;
  height: auto;
}
.circle-wrapper{
  text-align: left;
  /*color: rgb(43, 174, 233);*/
}
.ivu-card:hover{
  box-shadow: 0px 0px 0px;
}

.circle{
    width: 16px;
    height: 16px;
    text-align: center;
    border-radius: 18px;
    position: relative;
    line-height: 15px;
    border: 1px solid;
    display: inline-block;
}
  .item-content {
    word-wrap: break-word;
    word-break: normal;
    /* text-align: center; */
    padding-top: 4px;
    overflow: hidden;
    height: 30px;
    margin-bottom: 6px;
    line-height: 13px;
  }

  .item-name {
    text-align: right;
    line-height: 20px;
    padding-right: 4px;
  }
  span.user_name{
    /*
    position: relative;
    top:8px;
    */
  }
  .user_nameImg{ 
    position: relative;
    top:6px;
  }
  span.taskId{
    display: inline-block;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

  }
</style>
