<template>
  <div class="content-header">
     <span class="title">
        {{text}}
     </span>
     <span>
        数量 {{taskNumber}}
     </span>
                
  </div>
</template>
<script>
  export default{
    props:{
      text: {
        type: String
      },
      taskNumber: {
        type: [String,Number]
      }
    },
    data(){
      return {}
    }
  }
</script>

<style scoped>
.content-header{
  background: #f0d0a2;
  height: 30px;
  border-radius: 4px;
  line-height: 30px;
  text-align: center;
  /*
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: #33cccc;
  height: 32px;
  line-height: 32px;
  text-align: center;
  text-indent: 10px;
  */
}

.content-header .title{
  font-weight: 600;
  font-size: 14px;

}
</style>