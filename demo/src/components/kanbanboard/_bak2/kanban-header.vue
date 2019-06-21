<template>
    <Header>
        <Row :gutter="10">
          <Col span="2">
            <Button :style="{border: '1px dashed #ccc'}" @click="addNewTask">添加任务</Button>
          </Col>
          <Col span="1">
            <img src="@/assets/images/product-list.png" @click="showList">
          </Col>
          <Col span="1">
            <img src="@/assets/images/product-kanban.png" @click="showTask">
        </Col>
          <Col span="1" >
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


      </Header>
</template>
<script>
  import { EventBus } from '@/tools';
  export default{
    data(){
      return {}
    },
    methods: {
      addNewTask(info){
        EventBus.$emit('addTask', info);
      },
      showList(){

      }
    }
  }
</script>

<style scoped>
  span.high{
    background:  #f8d6af;
    width: 100%;
    height: 25px;
    display: inline-block;
    line-height: 25px;
    text-align: center
  }
  span.middle{
    background:  #b3ecec;
    width: 100%;
    height: 25px;
    display: inline-block;
    line-height: 25px;
     text-align: center
  }
  span.low{
    background:  #f2e1f0;
    width: 100%;
    height: 25px;
    display: inline-block;
    line-height: 25px;
     text-align: center
  }
</style>
