<template>
  <div class="kanbanSearch-wrapper">
    <span class="search-title">查询</span>
    <div class="kanbanSearch-wrap">
      <Row :gutter="10">
        <Col span="2">
          &nbsp;
        </Col>
        <Col span="17">
          <div  class="search-item-wrapper"
                v-for="(item, index) in searchParams"
                :key="index"
                >
                <Input :type="item.text"
                    v-model="params[index][params[index].params]"
                    v-if="item.type == 'input'"
                    >
                    <span slot="prepend">{{item.label}}</span>
                </Input>

                <div class="select-wrapper" v-if="item.type == 'select'" :style="{position: 'relative',width: '100%'}">
                    <span class="select-label"
                        >{{item.label}}</span>
                    <Select
                    v-model="params[index][params[index].params]"
                    :style="{width: 'auto','min-width': '60%',position: 'relative',left: '-3px',display:'inline-block', float: 'left'}"
                    >
                    <Option v-for="(value, index) in item.options"
                            :value="value.value"
                            :key="index">{{ value.label }}</Option>
                </Select>
                </div>


          </div>

        </Col>
        <Col span="4">
          <div class="button-wrapper">
            <Button @click="search" :style="{border: '1px dashed #ccc'}">查询</Button>
          </div>

        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import { EventBus } from '@/tools';
  export default{
    props: {
      searchParams: {
        type: Array,
        default: function(){
          return []
        }
      }
    },
    data(){
      return {
        params: '',

      }
    },
    beforeCreate(){

    },
    created(){
      let _arr = [];
      this.searchParams.forEach(function(item,index){

        _arr.push( Object.assign({[item.params]: ''}, item) );
      });
      this.params = _arr;

    },
    methods: {
      search(){
        EventBus.$emit('search', this.params);
      }
    },
   mounted(){

     this.params.forEach(function(item, index){

     });
     console.log('mounted  ::: ', this.params)
   }

  }
</script>

<style scoped>
.kanbanSearch-wrapper{
  width: 100%;
  background: white;
  position: relative;
  margin-top: 20px;
}
.search-title{
 background: url(../../assets/images/chaxun_bg.png)  no-repeat;
  width: 100px;
  height: 25px;
  line-height: 25px;
  position: absolute;
  left: 172px;
  top: -12px;
  text-align: center;
  font-size: 16px;

}
.kanbanSearch-wrap{
  width: 80%;
  margin: auto;
  border: 1px dashed #ccc;
  border-radius: 6px;
  padding-top: 22px;

}
.search-item-wrapper{
  float: left;
  margin-right:  10px;
  margin-bottom: 10px;
  width: 230px;


}
.select-label{
  padding: 4px 7px;
    font-size: inherit;
    font-weight: 400;
    line-height: 1.6;
    color: #495060;
    text-align: center;
    background-color: #eee;
    border: 1px solid #dddee1;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    display: inline-block;
    float: left;
    position: relative;

    z-index: 5;
}
.select-wrapper{
  float: left;

}

.button-wrapper{
  position: absolute;
}

</style>
