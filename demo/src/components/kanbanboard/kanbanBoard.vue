<template>
  <Layout id="boardWrapper">
    <content id="board">
      <p span="4" v-if="groupList.length > 0" class="left_border"></p>
      <div class="row-wrapper" id="kanbanHeader">
        <Row :gutter="16" type="flex" justify="start" align="middle">
          <Col span="3" class="topColumnFirst" v-if="groupList.length > 0">
            <div class="centerHeaderTitle">
              {{groupList[0].text}}
            </div>
          </Col>
          <Col :span="statusSize" class="topColumn"  v-for="(item, index) in statusList" :key="index">
            <kanbanContentHeader :myAside="aside" :text="item.stateStr" :taskNumber="item.taskNumber"></kanbanContentHeader>
          </Col>
        </Row>
      </div>
      <!--有分组-->
      <div class="row-wrapper" v-for="(itemGroup, index) in groupLists" v-if="groupList.length > 0">
        <Row :gutter="16" type="flex" justify="start" align="top">
          <Col span="3" v-if="groupLists.length > 0">
            <div class="centerHeader" @click="toStory(itemGroup,'us')" v-if="aside=='product'">
              <a>{{itemGroup.text}}</a>
            </div>
            <div class="centerHeader" @click="toStory(itemGroup)" v-else>
              <a>{{itemGroup.text}}</a>
            </div>
            <div>
              <Button v-if="aside == 'product'" v-show="btnIsShow(itemGroup.text)" :disabled="isDisabled" type="success" @click="addItem(itemGroup.groupId)"  class="addUsBtn" >添加用户故事</Button>
              <Button v-if="aside == 'development'"  type="success" @click="addNewTask(itemGroup.groupId)" class="addMissionBtn" >添加工作项</Button>
            </div>
          </Col>
          <Col :span="statusSize" v-for="(items, index) in statusList"  :key="index" class="Column" >
            <div :id="'kb'+itemGroup.groupId+'_'+items.state" :state="items.state" :groupid="itemGroup.groupId" class="rowBox" :class="addSpace?'addSpaceBox':''">
              <kanbanItem
                :myIsOperation = "isOperation"
                :myAside = "aside"
                :myRole="role"
                :key="cardIndex"
                :item = "value"
                :Group = "true"
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
            <div :id="'stateId_'+items.state" :state="items.state"  class="rowBox rowBox2"  :class="isPutFn(aside,isPut,items.state)">
              <kanbanItem
                  :myIsOperation = "isOperation"
                  :myAside = "aside"
                  :myRole="role"
                  :key="keys"
                  :item = "value"
                  :Group = "false"
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
import Common from '@/Common';
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
    isOperation: {
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
    aside: {//判断栏目
      type: [Boolean,String,Number],
      default: function() {
        return false;
      }
    },
    role: {//判断权限
      type: [Boolean,String,Number],
      default: function() {
        return false;
      }
    },
    boardName: {//判断权限
      type: [Boolean,String,Number],
      default: function() {
        return "list";
      }
    },
  },
  data() {
    return {
      sortId:[],
      storySortId:[],
      cssText:"",
      IS:false,
      addSpace:0,
      isPut:["07","08"],

    };
  },
  created(){
    console.log("看板 kanbanboard--created-------","this.sortId=",this.sortId,"this.storySortId=",this.storySortId)
  },
  beforecreated(){
    console.log("看板 kanbanboard--beforecreated-------","this.sortId=",this.sortId,"this.storySortId=",this.storySortId)
  },
  beforeUpdate(){
    console.log("看板 kanbanboard--beforeUpdate-------","this.sortId=",this.sortId,"this.storySortId=",this.storySortId)
  },
  updated(){
    console.log("看板 kanbanboard--updated-------","this.sortId=",this.sortId,"this.storySortId=",this.storySortId)
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
    role(data){
      
    },

    
  },
  mounted(){
    //this.beforeDestroy();
    document.body.ondrop = function(event){
      event.preventDefault();
      event.stopPropagation();
    };
    EventBus.$on("bindSort",this.bindSortId);
    //EventBus.$on("storyBindSort",this.bindStorySortId);
    setTimeout(()=>{
      this.autoHeight();
      this.kanbanScrollFn();//以后加上
    },1000);
  },
  methods:{
    isPutFn(a,p,s){//this.aside,this.isPut,items.state
      if(a == "demand"){
        return p.indexOf(s) == -1?'noPutBg':''
      }else{
        return "";
      }
      
    },
    btnIsShow(txt = ""){
      let str = "@需求完成";
      return txt.indexOf(str) != -1 ? false  : true;
    },
    autoHeight(){
      setTimeout(()=>{
        this.delHeight();
      },1)
      setTimeout(()=>{
        this.setHeight();
      },2)      
    },
    kanbanScrollFn(){

      

      if(this.$route.path == "/demand" || this.$route.path ==  "/product" || this.$route.path ==  "/development" || this.$route.path ==  "/dependManage"){}else{return};
      let that = this;
      let gap = that.$route.path == "/demand" || that.$route.path ==  "/product" ? 0 : 0;
      
      let headerBoxH = document.getElementsByClassName("headerBox")[0] ? document.getElementsByClassName("headerBox")[0].offsetHeight : false;//
      let mainDom = document.getElementById("main");
      let ivuRowFlexDomW;
      let kanbanHeaderDomH;
      if(!headerBoxH && !mainDom){return}

      let kanbanHeaderDom = document.getElementById("kanbanHeader")?document.getElementById("kanbanHeader"):false;

      let ivuRowFlexDom = kanbanHeaderDom && kanbanHeaderDom.getElementsByClassName("ivu-row-flex")[0] ?kanbanHeaderDom.getElementsByClassName("ivu-row-flex")[0] : false;
      let boardDom = document.getElementById("board") ? document.getElementById("board") : false;

      if(!ivuRowFlexDomW){ivuRowFlexDomW = ivuRowFlexDom.offsetWidth;}
      if(!kanbanHeaderDomH){kanbanHeaderDomH = kanbanHeaderDom.offsetHeight;}  

      mainDom.onscroll= function(){
        if(that.$route.path == "/demand" || that.$route.path ==  "/product" || that.$route.path ==  "/development" || that.$route.path ==  "/dependManage"){}else{return};

        kanbanHeaderDom = kanbanHeaderDom ? kanbanHeaderDom : document.getElementById("kanbanHeader");
        ivuRowFlexDom = ivuRowFlexDom ? ivuRowFlexDom : kanbanHeaderDom.getElementsByClassName("ivu-row-flex")[0];

        let boardDom = boardDom ? boardDom : document.getElementById("board");
        if(!kanbanHeaderDom && !boardDom && !ivuRowFlexDom){return}
        if(!ivuRowFlexDomW){ivuRowFlexDomW = ivuRowFlexDom.offsetWidth;}
        if(!kanbanHeaderDomH){kanbanHeaderDomH = kanbanHeaderDom.offsetHeight;}

        boardDom.style.position = "relative";
        let rectObject = boardDom.getBoundingClientRect();
        let num = rectObject.top - headerBoxH; 
        let numberBox = that.$route.path == "/demand" || that.$route.path ==  "/product" ? kanbanHeaderDom.getElementsByClassName("number") : false;
        if(num + 10 < 0){
          kanbanHeaderDom.style.height = kanbanHeaderDomH+"px";
          ivuRowFlexDom.style.top = Math.abs(num-gap) + "px";
          ivuRowFlexDom.style.position = "absolute";
          ivuRowFlexDom.style.width = ivuRowFlexDomW ? ivuRowFlexDomW+"px" : "100%";
          ivuRowFlexDom.style.left = "0";
          ivuRowFlexDom.style.zIndex = "100";

          

          if(numberBox && numberBox.length){
            for(let i=0;i<numberBox.length;i++){
              numberBox[i].style.top = "5px";
            }
          }
          

          //number

        }else{
          kanbanHeaderDom.removeAttribute('style');
          ivuRowFlexDom.removeAttribute('style');
          ivuRowFlexDom.style.marginLeft = "-8px";
          ivuRowFlexDom.style.marginRight = "-8px";
          if(numberBox && numberBox.length){
            for(let i=0;i<numberBox.length;i++){
              numberBox[i].removeAttribute('style');
            }
          }
        }
      }
    },
    setHeight(){
      this.addSpace = this.aside == "product" && this.role != "icdp_projManager" ? 50 : 0;
      let DOM = document.getElementById("board");
      let Doms = DOM ? DOM.getElementsByClassName("row-wrapper") : false;
      let inArr = [];
      let Max = "";
      if(Doms && Doms.length > 1){
        for(let i=1;i<Doms.length;i++){
          let Col = Doms[i].getElementsByClassName("ivu-col");
          for(let j=0;j<Col.length;j++){
            inArr.push(Col[j].offsetHeight)
          }
          Max = Math.max.apply(null,inArr);
          for(let k=0;k<Col.length;k++){
            Col[k].style.height = Max+this.addSpace+"px";
          }
          inArr = [];
          Max = "";
        }
      }
    },
    delHeight(){
      let DOM = document.getElementById("board");
      let Doms = DOM ? DOM.getElementsByClassName("row-wrapper") : false;
      if(Doms && Doms.length > 1){
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
    toStory(IG,column){
      let obj =  column && column == 'us' ? 
      {
        path:"demand/detail",
        query:{
          reqList_id:IG.groupId,
          req_id:IG.reqID,
        }
      }
      :
      {
        path:"product/detail",
        query:{
          detail_id:IG.groupId,
        }
      }
      const {href}=this.$router.resolve(obj);
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
      if(this.IS){
        return
      }
      this.IS = true;
      this.$nextTick(()=>{
        this.sortId = [];
        if(this.groupLists.length){
          this.sortId.push(...this.getSortId());
        }else{
          this.sortId.push(...this.getStorySortId());
        }
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
      let that = vm;
      let todoList = document.getElementById(moveId);
      if(!todoList){
        return;
      }

      Sortable.create(todoList,{
        draggable: ".isDraggable",
        group:{
          name:that.boardName,
          
          pull:function(Old,New,Ele,Evt){
            if(that.aside && that.aside == "product"){
              return true
            }else{
              return true
            }
            //console.error("**pull old Sortable==>",Old,"**pull new Sortable==>",New,"***pull HTML元素==>",Ele,"**pull DragEvent==>",Evt);
            // if(New.el.id == "kb6_01" || New.el.id == "kb6_02"){
            //   return false
            // }else {
            //   return true
            // }
            
          },
          put:function(Old,New,Ele,Evt){
            if(that.aside && that.aside == "product"){
              return true
            }if(that.aside && that.aside == "demand"){
              let fn = (arr,val)=>{
                return arr.find((item)=>{
                  return "stateId_"+item == val;
                })
              }
              if(fn(that.isPut,Old.el.id)){//Old.el.id == "stateId_07" || Old.el.id == "stateId_08"
                return true
              }else {
                return false
              }
            }else{
              return true
            }
            //console.error("**put old Sortable==>",Old,"**put new Sortable==>",New,"***put HTML元素==>",Ele,"**put DragEvent==>",Evt);
            // if(Old.el.id == "kb6_01" || Old.el.id == "kb6_02" || Old.el.id == "kb6_03"){
            //   return false
            // }else {
            //   return true
            // }
          },
          //revertClone:true,
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
      console.log('beforeDestroy开发看板 》》》》》》');
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



let kanbanScrollFn = ()=>{
  

}
//kanbanScrollFn();

</script>
<style scoped>
.noPutBg{
  background: #f8f8f9;
}
.addSpaceBox{
  position: relative;
}
.addSpaceBox:before{
  position: absolute;
  bottom: 5px;
  left:50%;
  content: "向空白拖动";
  font-size: 12px;
  color:#bbbec4;
  transform:translate(-50%,0);
  white-space: nowrap;
}
#boardWrapper,#productBoardBox,#demandBoardBox,#developmentBoardBox,#dependManageBoardBox{
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
#productBoardBox .ivu-col-span-2{
  width: 10.8%;
}
#demandBoardBox .ivu-col-span-2{
  width: 12.4%;
}
#developmentBoardBox .ivu-col-span-4{
  width: 21.4%;
}
#dependManageBoardBox .ivu-col-span-4{
  width: 19.7%;
}



</style>
