<template>
  <div class="col-wrapper">
    
      <div>
          <kanbanItem v-for="(item, index) in itemLists"
              :key="index"
              :moveId="item.userId"
              :groupId = "item.groupId"
              :content="item.description"
              :name="item.names"
              :bgColor="item.bgColor"
              :userImg="item.userImg"
              :taskId = "item.taskId"
              :Group="group"
              
              v-if="ItemGroupId == item.groupId"></kanbanItem> <!--有分组-->

          <kanbanItem v-for="(item, index) in itemLists"
              :key="index"
              :moveId="item.userId"
              :groupId = "item.groupId"
              :content="item.description"
              :name="item.names"
              :bgColor="item.bgColor"
              :userImg="item.userImg"
              :taskId = "item.taskId"
              v-if="!ItemGroupId"
              :Group="group">
              {{item.groupId}}
            </kanbanItem> <!--没分组-->

      </div>
     
      
    
  </div>
</template>
<script>
  import kanbanItem from './kanban-item';
  
  export default {
    props: {
      itemLists: {
        type: Array
      },
      ItemGroupId: {
        type: String
      },
      group: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {}
    },
    mounted: function(){
    
    },
    components: {
      kanbanItem
    }
  }
</script>

<style scoped>


</style>