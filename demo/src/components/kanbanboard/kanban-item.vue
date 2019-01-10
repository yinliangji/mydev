<template>
  <div 
    :id="item.userId" 
    @click="itemClick(item)" 
    class="card-wrapper"
    
    :state="item.taskStatus"
    :taskid="item.taskId"
    :detailid="item.detail_id"
    :groupId="item.groupId"
    :nickname="item.nickName"
    :class="isDraggable(myRole,myAside,item.nickName,item.taskStatus)"
    >
      <div class="card-wrap">

        <p class="item-content" :title="item.taskName">
          <span class="levelText" :style="{'background':item.bgcolor}">
            {{levelText(item.bgcolor)}}
          </span>
          {{item.taskName}}
        </p>
        <p class="item-name">
          <span class="user_name">
              <!-- {{item.userName}} -->
              {{item.nickName}}
          </span>
          <!-- <img :src="item.headPortrait" width="21" height="21" /> -->
          <img v-show="myAside == 'product' || myAside == 'demand'? false:true" :src="headPortrait" width="21" height="21" />
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
    isDraggable(r,a,n,s){//myRole,myAside,item.nickName,item.taskStatus
      if(a == "product"){
        if(r == "icdp_projManager"){
          return "isDraggable"
        }else{
          return n.indexOf(Common.getCookie("username")) != -1 ? "isDraggable" : "isOpacity";
        }
      }else if(a == "demand"){
        return s == "07" || s == "08" ? "isDraggable" : "";
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
.isOpacity{
  position: relative;
}
.isOpacity:after{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: black;
  content: "";
  opacity:0.4;
  border-radius:4px;
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
