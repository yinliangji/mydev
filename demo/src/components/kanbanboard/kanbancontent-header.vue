<template>
  <div class="content-header">
     <span class="title">
        {{text}}
        <span class="number" v-show="myAside == 'product' || myAside == 'demand'? true:false">
         {{taskNumber}}
        </span>
     </span>
     <span v-show="myAside == 'product' || myAside == 'demand'? false:true">数量{{taskNumber}}</span>
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
      },
      //
      myAside: {//判断栏目
        type: [Boolean,String,Number],
        default: function() {
          return false;
        }
      },
      //
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
  position: relative;

}
.number{
  position: absolute;
  right: 0;
  top: 0;
  font-size: 12px;
  height: 1.2em;
  line-height: 1.2em;
  padding-right: 3px;
  padding-left: 3px;
  background: red;
  color: white;
  border-radius: 4px;
  transform:translate(100%,-80%);
}
</style>