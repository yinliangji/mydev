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
    >
      <div class="card-wrap">

        <p class="item-content">
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
          <img :src="headPortrait" width="21" height="21" />
        </p>
      </div>
  </div>
</template>

<script>
import { EventBus } from '@/tools';
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
  },
  mounted() {
  },
  methods: {
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
      headPortrait:require("../../assets/images/tx.png"),
    }
  },

}
</script>

<style scoped>
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
