<template>
  <Layout id="boardWrapper">
    <content id="board">
      <p span="4" v-if="groupList.length > 0" class="left_border"></p>
      <div class="row-wrapper">
        <Row :gutter="16" type="flex" justify="start" align="middle">
          <Col span="3" class="topColumnFirst" v-if="groupList.length > 0">
            <div class="centerHeaderTitle">
              {{groupList[0].text}}
            </div>
          </Col>
          <Col :span="statusSize" class="topColumn"  v-for="(item, index) in statusList" :key="index">
            <kanbanContentHeader :text="item.stateStr" :taskNumber="item.taskNumber"></kanbanContentHeader>
          </Col>
        </Row>
      </div>
      <!--有分组-->
      <div class="row-wrapper" v-for="(itemGroup, index) in groupLists" v-if="groupList.length > 0">
        <Row :gutter="16" type="flex" justify="start" align="top">
          <Col span="3" v-if="groupLists.length > 0">
            <div class="centerHeader" v-if="sortdisabled">
              {{itemGroup.text}}
            </div>
            <div class="centerHeader pointer" @click="toStory(itemGroup.groupId)" v-else>
              {{itemGroup.text}}
            </div>
            <div>
              <Button v-if="sortdisabled" :disabled="isDisabled" type="success" @click="addItem(itemGroup.groupId)"  class="addUsBtn" >添加用户故事</Button>
              <Button v-else  type="success" @click="addNewTask(itemGroup.groupId)" class="addMissionBtn" >添加工作项</Button>
            </div>
          </Col>
          <Col :span="statusSize" v-for="(items, index) in statusList"  :key="index" class="Column" >
            <div :id="'kb'+itemGroup.groupId+'_'+items.state" :state="items.state" :groupid="itemGroup.groupId" class="rowBox">
              <kanbanItem
                :key="cardIndex"
                :item = "value"
                :Group = true
                v-for="(value, keys,cardIndex) in cardList"
                v-if="itemGroup.groupId == value.groupId && value.taskStatus == items.state"
                >
               </kanbanItem>
             </div>
          </Col>
        </Row>
      </div>
      <!--无分组-->
      <div class="row-wrapper" v-if="groupList.length == 0">
        <Row :gutter="16" type="flex" justify="start" align="top">
          <Col :span="statusSize" v-for="(items, index) in statusList"  :key="index" class="Column" >
            <div :id="'stateId_'+items.state" :state="items.state" class="rowBox rowBox2">
              <kanbanItem
                  :key="keys"
                  :item = "value"
                  :Group = false
                  v-for="(value, keys) in cardList"
                  v-if=" value.taskStatus == items.state">
              </kanbanItem>
            </div>
          </Col>
        </Row>
      </div>
    </content>
  </Layout>
</template>

<script>
import {EventBus} from "@/tools";
import kanbanHeader from "./kanban-header";
import kanbanContentHeader from "./kanbancontent-header";
import kanbanItem from "./kanban-item";
import Sortable from "sortablejs";

export default {
  props: {
    cardList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    groupList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    statusList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    sortdisabled: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    isDisabled: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    Group: {
      type: Boolean,
      default: function() {
        return true;
      }
    },
  },
  data() {
    return {
      sortId:[],
      storySortId:[],
      cssText:"",
    };
  },
  watch:{
    cardList(data){
      setTimeout(()=>{
        this.autoHeight();  
      },10)
      
    },
    groupList(data){
      
    },
    statusList(data){
      
    },

    
  },
  mounted(){
    document.body.ondrop = function(event){
      event.preventDefault();
      event.stopPropagation();
    };
    EventBus.$on("bindSort",this.bindSortId);
    EventBus.$on("storyBindSort",this.bindStorySortId);
    setTimeout(()=>{
      this.autoHeight();  
    },1000)
           
  },
  methods:{
    autoHeight(){
      setTimeout(()=>{
        this.delHeight();
      },1)
      setTimeout(()=>{
        this.setHeight();
      },2)      
    },
    setHeight(){
      let Doms = document.getElementById("board").getElementsByClassName("row-wrapper");
      let inArr = [];
      let Max = "";
      if(Doms.length > 1){
        for(let i=1;i<Doms.length;i++){
          let Col = Doms[i].getElementsByClassName("ivu-col");
          for(let j=0;j<Col.length;j++){
            inArr.push(Col[j].offsetHeight)
            //console.error(Col[j],Col[j].offsetHeight+"-----"+i+"------"+j)
          }
          Max = Math.max.apply(null,inArr);
          for(let k=0;k<Col.length;k++){
            Col[k].style.height = Max+"px";
          }
          inArr = [];
          Max = "";
        }
      }
    },
    delHeight(){
      let Doms = document.getElementById("board").getElementsByClassName("row-wrapper");
      if(Doms.length > 1){
        for(let i=1;i<Doms.length;i++){
          let Col = Doms[i].getElementsByClassName("ivu-col");
          for(let k=0;k<Col.length;k++){
            // if(!this.cssText){
            //   this.cssText = Col[k].getAttribute("style");  
            // }
            //Col[k].setAttribute("style",this.cssText);
            Col[k].style.height = "auto";
          }
        }
      }
    },
    addItem(req_id){
      this.$router.push({path:'/product/add',query:{req_id}})
    },
    addNewTask(id){
      this.$router.push({
        path:'/development/add',
        query:{
          addOrModifyStatus:true,
          userStoryId:id,
        }
      })
    },
    toStory(id){
      const {href}=this.$router.resolve({
        path:"product/detail",
        query:{
          detail_id:id,
        }
      });
      window.open(href,"_blank")
    },
    bindStorySortId(){
      this.$nextTick(()=>{
        this.storySortId = [];
        this.storySortId.push(...this.getStorySortId());
        if(this.storySortId.length > 0){
          this.storySortId.forEach((sortIdItem,index)=>{
            this.bindSortable(sortIdItem)
          })
        }
      });
    },
    bindSortId(){
      this.$nextTick(()=>{
        this.sortId = [];
        this.sortId.push(...this.getSortId());
        if(this.sortId.length >0){
          this.sortId.forEach((sortIdItem,index)=>{
            this.bindSortable(sortIdItem)
          });  
        }
      });
    },
    getSortId(){
      let _sortId = [];
      this.groupLists.forEach((groupIdItem,index)=>{
        this.statusList.forEach((statusItem,index)=>{
          _sortId.push("kb"+groupIdItem.groupId+"_"+statusItem.state)
        })
      })
      return _sortId;
    },
    getStorySortId(){
      let _sortId = [];
      this.statusList.forEach((statusItem,index)=>{
        _sortId.push("stateId"+"_"+statusItem.state)
      });
      return _sortId;
    },
    bindSortable(moveId){

      let vm = this;
      let todoList = document.getElementById(moveId);
      if(!todoList){
        return;
      }
      Sortable.create(todoList,{
        group:{
          name:"list",
          pull:true,
        },
        animation:120,
        ghostClass:"placeholder-style",
        fallbackClass:"iview-admin-cloned-item",
        disabled:vm.sortdisabled,
        onMove:function(evt,originalEvent){
          if(vm.Group){
            if(evt.from.getAttribute("groupid") == evt.to.getAttribute("groupid")){
              return
            }else {
              return false;
            }
          }else{
            if(evt.from.getAttribute("groupid") != evt.to.getAttribute("groupid")){
              return
            }else {
              return ;
            }
          }
        },
        onEnd:function(evt){
          if(vm.Group){
            console.log('moveEnd 》》》》》》')
            EventBus.$emit("moveEnd",{evt});
            vm.autoHeight();
          }else{
            console.log('story moveEnd 》》》》》》',evt);
            EventBus.$emit("storyMoveEnd",{evt});
            vm.autoHeight();
          }

        },
      });
    },
    beforeDestroy(){
      console.log('开发看板 》》》》》》')
      EventBus.$off("bindSort",this.bindSortId);
      EventBus.$off("storyBindSort",this.bindStorySortId);
    },
  },
  computed: {
    groupLists() {
      return this.groupList.slice(1, this.groupList.length);
    },
    statusSize(){
      return Math.floor(24/(this.statusList.length + 1));
    },
  },
  components: {
    kanbanHeader,
    kanbanContentHeader,
    kanbanItem,
  },
  
};
</script>

<style scoped>
#boardWrapper{
  background: #fff;
}
.topColumn{
  padding-right:4px;
  padding-left:4px;
}
.topColumnFirst{
  padding-left:12px;
  padding-right:10px;
}
.addMissionBtn{
  margin:6px auto 0;
  display:block;
}
.addUsBtn{
  margin:6px auto 0;display:block;
}

.rowBox{
  border:1px dashed #ddd;
  min-height:64px;
  border-radius:4px;
  height: 100%;
}
.rowBox2{
  border:1px dashed #ccc;
  min-height:100px;
}
.Column{
  padding-right:4px;
  padding-left:4px;
  transition: all 1s;
}
.ivu-layout-header {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.row-wrapper {
  margin-top: 10px;
  border-bottom: 1px dashed #ddd;
  padding-bottom: 10px;
}

.left_border {
  position: absolute;
  left: 11.5%;
  border-right: 1px dashed #ddd;
  height: 100%;
}

.leftHeader {
  width: 100px;
  background: #33cccc;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-weight: 600;
  margin: auto;
  height: 32px;
  line-height: 32px;

}
.centerHeaderTitle{
  background: #f0d0a2;
  height: 30px;
  border-radius: 4px;
  line-height: 30px;
  text-align: center;
  font-weight: 600;
}
.centerHeader {
  width: 110px;
  margin: 0 auto;
  text-align: center;
  font-size: 12px;
  height: 36px;
  overflow: hidden;
  line-height: 18px;
  /*
  width: 100px;
  background: #33cccc;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-weight: 600;
  margin: auto;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 14px;
  */
}
.pointer{
  cursor: pointer;
}
.iview-admin-draggable-list{
  height: 100%;
}
.iview-admin-draggable-list li {
  padding: 9px;
  border: 1px solid #e7ebee;
  border-radius: 3px;
  margin-bottom: 5px;
  cursor: pointer;
  position: relative;
  transition: all .2s;
}
.iview-admin-draggable-list li:hover {
  color: #87b4ee;
  border-color: #87b4ee;
  transition: all .2s;
}
.iview-admin-draggable-delete{
  height: 100%;
  position: absolute;
  right: -8px;
  top: 0;
  display: none;
}
.iview-admin-draggable-list li:hover .iview-admin-draggable-delete {
  display: block;
}
.placeholder-style{
  display: block !important;
  color: transparent;
  border-style: dashed !important;
}
.delte-item-animation{
  opacity: 0;
  transition: all .2s;
}
.iview-admin-draggable-list{
  overflow: auto;
}
.kanbanItemBox{
  
}
</style>
