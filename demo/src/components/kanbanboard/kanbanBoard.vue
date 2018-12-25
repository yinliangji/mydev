<template>
  <Layout >
    <content>
      <p span="4" v-if="groupList.length > 0" class="left_border"></p>
      <div class="row-wrapper">
        <Row :gutter="16" type="flex" justify="start" align="middle">
          <Col span="3" style="padding-left:12px;padding-right:10px;" v-if="groupList.length > 0">
            <div class="centerHeaderTitle">
              {{groupList[0].text}}
            </div>
          </Col>
          <Col :span="statusSize" style="padding-right:4px;padding-left:4px;" v-for="(item, index) in statusList" :key="index">
            <kanbanContentHeader :text="item.stateStr" :taskNumber="item.taskNumber"></kanbanContentHeader>
          </Col>
        </Row>
      </div>
      <!--有分组-->
      <div class="row-wrapper" v-for="(itemGroup, index) in groupLists" v-if="groupList.length > 0">
        <Row :gutter="16" type="flex" justify="start" align="middle">
          <Col span="3" v-if="groupLists.length > 0">
            <div class="centerHeader" v-if="sortdisabled">
              {{itemGroup.text}}
            </div>
            <div class="centerHeader pointer" @click="toStory(itemGroup.groupId)" v-else>
              {{itemGroup.text}}
            </div>
            <div>
              <Button v-if="sortdisabled" :disabled="isDisabled" type="success" @click="addItem(itemGroup.groupId)" style="margin:6px auto 0;display:block;" >添加用户故事</Button>
              <Button v-else  type="success" @click="addNewTask(itemGroup.groupId)" style="margin:6px auto 0;display:block;" >添加工作项</Button>
            </div>
          </Col>
          <Col :span="statusSize" style="padding-right:4px;padding-left:4px;" v-for="(items, index) in statusList"  :key="index">
            <div :id="'kb'+itemGroup.groupId+'_'+items.state" :state="items.state" :groupid="itemGroup.groupId" style="border:1px dashed #ddd;min-height:64px;border-radius:4px;">

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
          <Col :span="statusSize" v-for="(items, index) in statusList"  :key="index" >
            <div :id="'stateId_'+items.state" :state="items.state" style="border:1px dashed #ccc;min-height:100px;">
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
        return false;
      }
    },
  },
  data() {
    return {
      sortId:[],
      storySortId:[],
    };
  },
  watch:{
    cardList(data){
      console.error("cardList=",data)
    },
    groupList(data){
      console.error("groupList=",data)
    },
    statusList(data){
      console.error("statusList=",data)
    },

    
  },
  mounted(){
    document.body.ondrop = function(event){
      event.preventDefault();
      event.stopPropagation();
    };
    EventBus.$on("bindSort",this.bindSortId);
    EventBus.$on("storyBindSort",this.bindStorySortId);

  },
  methods:{
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
          }else{
            console.log('story moveEnd 》》》》》》',ent);
            EventBus.$emit("storyMoveEnd",{evt});
          }

        },
      });
    },
    beforeDestroy(){
      console.log('开发看板 》》》》》》')
      EventBus.$off("bindSort",this.bindSortId);
      EventBus.$off("storyBindSort",this.bindSortId);
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
