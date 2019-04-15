<template>
  <div 
    :id="item.userId" 
    class="card-wrapper"
    :dependId="item.id"
    :state="item.taskStatus"
    :taskid="item.taskId"
    :detailid="item.detail_id"
    :groupId="item.groupId"
    :nickname="item.nickName"
    :class="isDraggable(myRole,myAside,item.nickName,item.taskStatus,item.isTaskPerson,item.myUserName)"
    :data-taskcount="item.task_count"
    >
      <div class="DragCursor" :class="(()=>{return isDraggable(myRole,myAside,item.nickName,item.taskStatus,item.isTaskPerson,item.myUserName)+'Show'})()">拖拽</div>
      
      <div class="card-wrap noCursor" v-if="myAside == 'product'" >

        <p class="item-content" :title="'名称：'+item.taskName+'\n描述：'+item.userstory_desc"  style="cursor:pointer" @click="itemClick(item)">
          <span class="levelText" :style="{'background':item.bgcolor}" v-show="item.bgcolor.indexOf('ffffff') == -1">
            {{levelText(item.bgcolor)}}
          </span>
          {{item.taskName}}
        </p>
        <!-- 用户故事标识状态 显示包括工作项个数、附件、测试案例个数、依赖项状态 -->
        <p  class="kananstatus floatClear">
          <span class="iconBg" style="background:#e0592b;" title="工作项个数" v-if="item.task_count == 0 || item.task_count == '0'" >
            {{item.task_count}}
          </span>
          <span class="iconBg" style="background:#e0592b;cursor:pointer" :title="item.taskDesc ? item.taskDesc : '工作项个数'"  @click="itemClick(item,'工作项')" v-else>
            {{item.task_count}}
          </span>
          
          <span class="iconBg" :class="'isFile'" v-if="item.isFile=='yes'" title="有附件" style="cursor:pointer" @click="itemClick(item,'附件')">
            <Icon type="paperclip"></Icon>
          </span>
          <span class="iconBg" style="background:#00a6b6;cursor:pointer" title="测试案例个数"  @click="itemClick(item,'测试案例')">
            {{item.testCase}}
          </span>
          <span class="iconBg" style="font-size:20px;cursor:pointer;" v-if="item.isDepd=='yes'" :title="item.depdDesc ? item.depdDesc : '依赖项状态'" @click="itemClick(item,'依赖项')">
            <Icon type="ios-color-filter" color="#199c40" v-if="item.isFinish=='finish'"></Icon>
            <Icon type="ios-color-filter" color="#db0102" v-if="item.isFinish=='unfinish'"></Icon>
          </span>
        </p>
        <p class="item-name">
          <span class="user_name" v-html="chackSymbol(item.nickName)">
          </span>
        </p>
      </div>
      <div class="card-wrap" v-if="myAside == 'demand'" @click="itemClick(item)" >
        <p class="item-content" :title="item.taskName">
          {{item.taskName}}
        </p>
        <!-- 需求项标识状态 -->
        <p  class="kananstatus floatClear">
          <span class="iconBg" style="background:#e0592b" :title="item.usDesc ? item.usDesc : '用户故事个数'" >
            {{item.us_counts}}
          </span>
          <span class="iconBg" :class="'isFile'"  v-if="item.isFile=='yes'" title="有附件">
            <Icon type="paperclip"></Icon>
          </span>
          <span class="iconBg" style="font-size:20px" v-if="item.isDepd=='yes'" :title="item.depdDesc ? item.depdDesc : '依赖项状态'">
            <Icon type="ios-color-filter" color="#199c40" v-if="item.isFinish=='finish'"></Icon>
            <Icon type="ios-color-filter" color="#db0102" v-if="item.isFinish=='unfinish'"></Icon>
          </span>
        </p>

        <p class="item-name">
          <span class="user_name" v-html="chackSymbol(item.nickName)">
          </span>
        </p>
      </div>

      <div class="card-wrap" v-if="item.source=='task'" @click="itemClick(item)" >
        <p class="item-content" :title="item.taskName">
          <span class="levelText" :style="{'background':item.bgcolor}" v-show="item.bgcolor.indexOf('ffffff') == -1">
            {{levelText(item.bgcolor)}}
          </span>
          {{item.taskName}}
        </p>
        <!-- 顺序1工作项颜色#e0592b 2附件颜色#7d2f74 3测试案例颜色#00a6b6 4依赖项状态完成颜色#199c40，未完成颜色#db0102   -->
        <!-- 工作项状态识别 显示包括附件、依赖项状态 -->
        <p v-if="item.source=='task'" class="kananstatus">
          <span class="iconBg" :class="'isFile'" v-if="item.isFile=='yes'" title="有附件">
            <Icon type="paperclip"></Icon>
          </span>
          <span class="iconBg" style="font-size:20px" v-if="item.isDepend=='yes'" :title="item.depdDesc ? item.depdDesc : '依赖项状态'">
            <Icon type="ios-color-filter" color="#199c40" v-if="item.isFinish=='finish'"></Icon>
            <Icon type="ios-color-filter" color="#db0102" v-if="item.isFinish=='unfinish'"></Icon>
          </span>
        </p>
        <p class="item-name">
          <span class="user_name">
              {{item.nickName}}
          </span>
        </p>
      </div>

      <div class="card-wrap" v-if="item.source=='dependManage'" @click="itemClick(item)" >
        <p  class="DMTitle" :title="item.depd_main_type_name+'：'+item.depdName">
          <span>
            <em>{{item.depd_main_type_name}}：{{item.depdName}}</em>
          </span>
        </p>
        <p class="item-content" :title="item.taskName">
          {{item.taskName}}
        </p>
        <p class="item-name">
          <span class="user_name" >
              {{item.nickName}}
          </span>
        </p>
      </div>

      <div class="card-wrap" v-if="(myAside != 'product' && myAside != 'demand' && myAside!='development' && myAside!='dependManage')" @click="itemClick(item)" >
        <p class="item-content" :title="item.taskName">
          {{item.taskName}}
        </p>
        <p class="item-name">
          <span class="user_name">
              {{item.nickName}}
          </span>
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
    myIsOperation: {//判断项目需求项权限
      type: Boolean,
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
          return str+"<br />"+""
        }
    },
    nicknameFormat(is){
      if(is){
        return true;
      }else{
        return false;
      }

    },
    isDraggable(r,a,n,s,tp,mus){
      //myRole,myAside,item.nickName,item.taskStatus,item.isTaskPerson,item.myUserName
      if(a == "product"){
        if(r == "icdp_projManager"){
          return "isDraggable"
        }else{
          return mus.indexOf(Common.getCookie("username")) != -1 ? "isDraggable" : "isOpacity";
        }
      }else if(a == "demand"){
        if(s == "07" || s == "08"){
          return !this.myIsOperation ? "isDraggable" : "isOpacity";
        }else{
          return "isOpacity"
        }
        
        // if(!this.myIsOperation){
        //   return "isDraggable"
        // }else{
        //   return s == "07" || s == "08" ? "isDraggable" : "isOpacity";
        // }
        
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
    itemClick(info,type){
      EventBus.$emit('clickItem', info,type);
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
.DMTitle {
  overflow: hidden;
  padding-top:  2px;
}
.DMTitle > span {
  position:relative;
  height: 1.5em;
  max-width: 95%;
  display: inline-block;
  color: #999;
}
.DMTitle > span em {
  display: inline-block;
  max-width: 100%;
  line-height: 1.5em;
  color: #999;
  white-space:nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  word-wrap: break-word;
  overflow-wrap: break-word;
  overflow: hidden;
  padding-left: 1.1em;
}
.DMTitle > span:after{
  content: "】";
  position: absolute;
  right: -1.1em;
  top: 0;
  height: 1.5em;
  line-height: 1.5em;
  color: #999;
}
.DMTitle > span:before{
  content: "【";
  position: absolute;
  left: 0;
  top: 0;
  height: 1.5em;
  line-height: 1.5em;
  color: #999;
}

.DragCursor {
  position: absolute;
  left: 0;
  bottom: 0;
  background: red;
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 1px solid #ddd;
  z-index: 2;

  border-left: none;
  border-bottom: none;
  color: transparent;
  cursor: move;
  opacity: 0;
  display: none;

}
.isDraggableShow {
  display: block;
}
.kananstatus{
  overflow: hidden;
  height: 20px;
  margin-left: 4px;

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
.isFile{
  color:#7d2f74;
  font-size:22px;
  transform:rotate(35deg);
  font-weight:bold
}
.isOpacity{
  position: relative;
}
.isOpacity:after{
  position: absolute;
  /* left: 50%;
  top: 50%;
  width: 95%;
  height: 90%;
  transform:translate(-50%,-50%); */
  left: 3px;
  top: 3px;
  right: 1px;
  bottom: 0px;


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
  box-sizing: border-box;
  
  margin-bottom: 0px;
  position: relative;
  padding-bottom: px;
  padding-top:2px; 
}
.card-wrap{
  cursor: pointer;

  box-sizing: border-box;
  position: relative;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-left: 2px;
  margin-right: 2px;
  min-height: 30px;
  overflow: hidden;
  background: white;

  /*
  margin-right: 10px;
  margin-bottom: 10px;
  */
 font-size: 12px;
}
.card-wrap.noCursor {
  cursor: default;
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
    margin-bottom: 8px;
    line-height: 13px;

    margin-left: 4px;
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
