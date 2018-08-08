<template>
  <div :id="item.userId" @click="itemClick(item)" class="card-wrapper"
        :groupId="item.groupId">
      <div class="card-wrap">
          <Card :style="item.bgColor">
            <div class="circle-wrapper">
                <p class="circle">
                    <Icon type="record" :size="12"></Icon>
                </p>
                <span class="taskId">{{item.taskId}}</span>
            </div>

              <p class="item-content">{{item.taskName}}</p>
              <!-- <p class="item-content">{{item.description}}</p> -->
              <p class="item-name">
                <span class="user_name">
                    {{item.userName}}
                </span>
                <img :src="item.headPortrait" class="user_nameImg"/>

              </p>

            </Card>
      </div>

  </div>


</template>

<script>
  import { EventBus } from '@/tools';

  import Sortable from 'sortablejs';

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
      document.body.ondrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
      };
     this.bindSortable(this.item.userId, this.groupId);

    },
    methods: {
      itemClick(info){
        EventBus.$emit('clickItem', info);
      },
      bindSortable(moveId, groupId) {
        let vm = this;
        let todoList = document.getElementById(moveId);

        Sortable.create(todoList, {
          group: {
            name: 'list',
            pull: true
          },
          animation: 120,
          ghostClass: 'placeholder-style',
          fallbackClass: 'iview-admin-cloned-item',
          onMove: function(evt, originalEvent){

            if(vm.Group){ // 分组时移动
              if(evt.from.getAttribute('groupId') == evt.to.getAttribute('groupId')){
                return;
              }else{
                return false;
              }
            }else{
              if(evt.from.getAttribute('groupId') !== evt.to.getAttribute('groupId')){
                return;
              }else{
                return;
              }
            }

          },
          onEnd: function(evt){
          console.log(evt);
            EventBus.$emit('moveEnd', {evt,item: vm.item});
          }
        });

      }
    },

  }
</script>

<style scoped>
  .card-wrapper {

    min-height: 10px;

  }
.card-wrap{
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;
}
  .kanban-item {
    width: 100px;
    height: auto;
  }
  .circle-wrapper{
    text-align: left;
     color: rgb(43, 174, 233);
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
  }

  .item-name {
    text-align: right;
  }
  span.user_name{
    position: relative;
    top:8px;
  }
  .user_nameImg{ position: relative;top:6px;}
  span.taskId{
    display: inline;

  }
</style>
