<template>
  <Layout class="boardWrapper">
    <div class="tool" id="tool" ref="tool" v-show="aside == 'product'">
      <span class="funnelBox">
        <!-- <Icon type="funnel" size="18" class="funnelIcon"></Icon> -->
        <div class="ivu-poptip funnelIcon">
          <div class="ivu-poptip-rel">
            <span class="ivu-table-filter">
              <i class="ivu-icon ivu-icon-funnel" style="color:#495060;font-weight:900;"></i>
            </span> 
          </div> 
          <!---->
        </div>
        <div class="funnelOption">
          <div class="funnelAllBox">
            <Checkbox
                id="allSelectBtn"
                ref="allSelectBtn"
                :indeterminate="indeterminate"
                :value="checkAll"
                @click.prevent.native="funnelCheckAll">全选
            </Checkbox>
          </div>
          <CheckboxGroup v-model="checkAllGroup" @on-change="funnelAllChange"  class="funnelGroupBox">
            <Checkbox :label="item.value" v-for="(item,index) in userstoryStatusList" :key="index">
              <span>{{item.label}}</span>
            </Checkbox>
          </CheckboxGroup>
          <div class="funnelBtnBox">
            <Button type="primary" size="small" :loading="funnelLoading" @click="funnelFn">
                <span v-if="!funnelLoading">筛选</span>
                <span v-else>等待</span>
            </Button>
          </div>
        </div>
      </span>
      <Icon type="android-settings" size="18" class="settingIcon" @click="goSetting"></Icon>
    </div>
    <content id="board">
      <p v-if="groupList.length > 0" class="left_border" :style="'left:'+ (firstColumn - 0) +'px;'"></p>
      <div class="row-wrapper" id="kanbanHeader">
        <Row :gutter="0" class="kanbanHeaderBox" id="kanbanHeaderBox"  align="middle">

          <Col :style="'width:'+((firstColumn - 0) + 1)+'px;'"  class="topColumnFirst" v-if="groupList.length > 0">
            <div class="centerHeaderTitle">
              {{groupList[0].text}}
            </div>
          </Col>
          <Col class="topColumn" :id="'TC-'+item.state"  v-for="(item, index) in myStatusList" :key="index">
            <kanbanContentHeader :myAside="aside" :wip="((n)=>{return n==0 || n=='0' ? '∞':n})(item.wip)" :myClass="item.myClass" :text="item.stateStr" :taskNumber="item.taskNumber" />
          </Col>
        </Row>
      </div>
      <!--有分组-->
      <div class="row-wrapper"  v-for="(itemGroup, index) in groupLists" v-if="groupList.length > 0">
        <Row :gutter="0" class="kanbanBox" align="top">
          <Col :style="'width:'+((firstColumn - 0) + 1)+'px;'" class="ColumnFirst" v-if="groupLists.length > 0">
            <div class="centerHeader" v-if="aside=='product'">
              <a class="txtBlock" @click="toStory(itemGroup,'us')" :title="itemGroup.text">{{itemGroup.text}}</a>
            </div>
            <div class="centerHeader" v-else>
              <a class="txtBlock" @click="toStory(itemGroup)" :title="itemGroup.text">{{itemGroup.text}}</a>
              <div style="overflow:hidden;height:5px;">&nbsp;</div>
              <span class="imgStatus">{{itemGroup.us_status}}</span>
            </div>
            <div>
              <Button v-if="aside == 'product'" v-show="btnIsShow(itemGroup.text)" :disabled="isDisabled" type="success" @click="addItem(itemGroup.groupId)"  class="addUsBtn" title="快速添加用户故事" >快捷添加</Button>
              <Button v-if="aside == 'development'"  type="success" @click="addNewTask(itemGroup.groupId)" class="addMissionBtn" title="快速添加工作项">快捷添加</Button>
            </div>
          </Col>
          <Col class="Column" v-for="(items, index) in myStatusList" :key="index" :id="'C-'+itemGroup.groupId+'_'+items.state" :data-G="itemGroup.groupId" :data-S="items.state" >
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
      <div class="row-wrapper"   v-if="groupList.length == 0">
        <Row :gutter="0" class="kanbanBox" align="top">
          <Col class="Column" v-for="(items, index) in myStatusList"  :key="index" :id="'C-'+items.groupId+'_'+items.state" :data-G="items.groupId" :data-S="items.state" >
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
    boardName: {//
      type: [Boolean,String,Number],
      default: function() {
        return "list";
      }
    },
    firstColumn: {//左侧宽度
      type: [Boolean,String,Number],
      default: function() {
        return 120;
      }
    },
    MenuStatusList: {//菜单状态
      type: [Boolean,String,Number,Array],
      default: function() {
        return [];
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
      isUsPut:[],
      imgStatus:require("@/assets/images/user_02.png"),
      Warning:"",
      noPut:[],

      noPutWip:[],

      //筛选开始
      funnelLoading:false,
      indeterminate: false,
      checkAll: false,
      checkAllGroup: [],
      userstoryStatusList:[],
      myStatusList:[],
      //筛选结束
    };
  },
  created(){
    console.log("看板 kanbanboard--created-------","this.sortId=",this.sortId,"this.storySortId=",this.storySortId);
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
        this.kanbanScrollFn("collapsedSider");
      },10)
      
    },
    groupList(data){
    },
    statusList(data){
      this.myStatusList = [];
      this.myStatusList = data;
      if(!this.checkAllGroup.length){
        this.checkAllGroup = this.funnelAllSelect();  
      }

      
      this.noPutWipFn(data);
    },
    MenuStatusList(data){
      this.userstoryStatusList = this.statusListFn(data);
      this.checkAll = this.checkAllGroup.length == this.userstoryStatusList.length ? true : false;
    },
    role(data){
      
    },

    
  },
  mounted(){
    
    document.body.ondrop = function(event){
      event.preventDefault();
      event.stopPropagation();
    };
    EventBus.$on("bindSort",this.bindSortId);
    //EventBus.$on("storyBindSort",this.bindStorySortId);
    setTimeout(()=>{
      this.autoHeight();
      this.kanbanScrollFn("collapsedSider");
    },1000);
    
    EventBus.$on("KBScroll",this.kanbanScrollFn);
  },
  methods:{
    noPutWipFn(data){//
      if("product" == "product"){
        //
        this.noPutWip = [];
        data.forEach((item)=>{
          if(((item.taskNumber-0) >= (item.wip)) && (item.wip != 0 || item.wip != "0")){
            this.noPutWip.push(item.state);
          }
        })
        
        setTimeout(()=>{
          //
          if(this.myStatusList.length && this.groupLists.length){
            for(let i=0;i<this.groupLists.length;i++){
              this.myStatusList.forEach((item)=>{
                if(document.getElementById('kb'+this.groupLists[i].groupId+'_'+item.state)){
                  document.getElementById('kb'+this.groupLists[i].groupId+'_'+item.state).removeAttribute("title");
                }
              })
            }
          }
          //
          if(this.noPutWip.length && this.groupLists.length){

            for(let i=0;i<this.groupLists.length;i++){
              this.noPutWip.forEach((item)=>{
                if(document.getElementById('kb'+this.groupLists[i].groupId+'_'+item)){
                  document.getElementById('kb'+this.groupLists[i].groupId+'_'+item).setAttribute("title","用户故事超过WIP数量，不能在拖入")

                }
              })
            }
          }
          //
        },350)
        //
        //return p.indexOf(s) == -1?'noPutBg':''
      }else{
        return "";
      }
      
    },
    //筛选开始
    goSetting(evt){
      this.$router.push({path: '/setting', query: {TabsCur:"name2",}})
    },
    statusListFn(data){
      let obj = {};
      let arr = [];
      if(data && Array.isArray(data) && data.length){
        //this.userstoryStatusList = [];
        data.forEach((item)=>{
          if((item.value - 0) < 10){
            obj.value = "0"+item.value;
          }else{
            obj.value = item.value + "";
          }
          obj.label = item.label;
          arr.push(obj);
          obj = {};

        })
      }
      return arr
    },
    funnelAllSelect(arr){
      let temp = [];
      if(this.statusList && Array.isArray(this.statusList) && this.statusList.length){
        this.statusList.forEach((item)=>{
          temp.push(item.state); 
        })
      }
      return temp;
    },
    funnelFn () {
        let newArr = [];
        if(this.checkAllGroup.length < 1){
          Common.CommonWarning(this,"至少选择一项");
          return;
        }
        if(!this.statusList.length || !this.checkAllGroup.length){
          console.log(this.statusList,this.checkAllGroup);
          return
        }
        
        this.funnelLoading = true;
        for(let i=0;i<this.checkAllGroup.length;i++){
          this.statusList.forEach((item)=>{
            if(item.state == this.checkAllGroup[i]){
              newArr.push(item);
            }
          })
        }
        this.$emit("sendCheckbox",newArr,this.checkAllGroup,this.checkAll);
        this.funnelLoading = false;

        let all = [];
        this.myStatusList.forEach((item)=>{
          all.push(item.state);
        })
        let gId = [];
        this.groupLists.forEach((item)=>{
          gId.push(item.groupId);
        })
        let C = new Set(this.checkAllGroup);
        let A = new Set(all);
        let dif = new Set([...A].filter(x => !C.has(x)));
        dif = Array.from(dif);
        
        let allId = [];

        if(gId.length){
          for(let j=0;j<gId.length;j++){
            all.forEach((item)=>{
              document.getElementById("C-"+gId[j]+"_"+item).removeAttribute('title');
              document.getElementById("TC-"+item).removeAttribute('title');
            })
          }
          for(let j=0;j<gId.length;j++){
            dif.forEach((item)=>{
              //allId.push("C-"+gId[j]+"_"+item);
              document.getElementById("C-"+gId[j]+"_"+item).setAttribute("title","hidden");
              document.getElementById("TC-"+item).setAttribute("title","hidden");
            })
          }
        }else{
          all.forEach((item)=>{
            document.getElementById("TC-"+item).removeAttribute('title');
          })
          dif.forEach((item)=>{
            document.getElementById("TC-"+item).setAttribute("title","hidden");
          })
        }
        
        setTimeout(()=>{
          this.kanbanScrollFn("collapsedSider");
        },500)

        



    },
    funnelCheckAll () {
      this.checkAll = !this.checkAll;
        /*
        if (this.indeterminate) {
            this.checkAll = false;
        } else {
            this.checkAll = !this.checkAll;
        }
        */
        this.indeterminate = false;
        let fn = (arr)=>{
          let myArr = [];
          if(arr && Array.isArray(arr) && arr.length){
            arr.forEach((item)=>{
              myArr.push(item.value) 
            })
          }
          return myArr;
        }

        if (this.checkAll) {
          this.checkAllGroup = fn(this.userstoryStatusList);
            //this.checkAllGroup = this.funnelAllSelect();
        } else {
            this.checkAllGroup = [];
        }
    },
    funnelAllChange (data) {
      console.log(data.length,this.statusList.length,data)
        if (data.length == this.userstoryStatusList.length) {
            //this.indeterminate = false;
            this.checkAll = true;
        } else if (data.length > 0) {
            //this.indeterminate = true;
            this.checkAll = false;
        } else {
            //this.indeterminate = false;
            this.checkAll = false;
        }
    },
    //筛选结束
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
    kanbanScrollFn(val){
      if(val == "collapsedSider"){
        document.getElementById("main").scrollTop = document.getElementById("main").scrollTop + 1;
        setTimeout(()=>{
          //document.getElementById("main").scrollTop = document.getElementById("main").scrollTop - 1;
        },500)  
      }
      

      let columnW = (kbdom,rwdom,topcol,col)=>{
        let everyWArr = [];

        let kbHeaderBoxDom = document.getElementById(kbdom);;
        if(!kbHeaderBoxDom){
          console.log("没有 "+kbdom)
          return;
        }
        let topColumnDom = kbHeaderBoxDom.getElementsByClassName(topcol);
        if(!topColumnDom.length){
          console.log(kbdom+" 的 "+topcol+" 是0")
          return;
        }

        for(let i = 0;i < topColumnDom.length;i++){
          everyWArr.push(topColumnDom[i].offsetWidth);
        }

        let rowWrapperDoms = document.getElementsByClassName("row-wrapper");
        if(rowWrapperDoms <= 1){
          console.log("没有 "+rwdom+"或者只有一个"+rwdom)
          return;
        }
        for(let j = 1;j<rowWrapperDoms.length;j++){
          for(let k = 0;k < topColumnDom.length;k++){
            if(rowWrapperDoms[j].getElementsByClassName(col).length){
              //flex-basis:auto; -ms-flex-preferred-size:auto;
              //rowWrapperDoms[j].getElementsByClassName(col)[k].style.width = everyWArr[k]+"px"
              rowWrapperDoms[j].getElementsByClassName(col)[k].setAttribute("style","width:"+ everyWArr[k]+"px;flex-basis:auto; -ms-flex-preferred-size:auto;")
            }else{
              console.log(rwdom+"dom-->"+j+" 没有 "+col)
              return
            }
            
          }
        }
      }


      if(this.$route.path == "/demand" || this.$route.path ==  "/product" || this.$route.path ==  "/development" || this.$route.path ==  "/dependManage"){}else{return};
      let that = this;
      let gap = that.$route.path == "/demand" || that.$route.path ==  "/product" ? 0 : 0;
      
      let headerBoxH = document.getElementsByClassName("headerBox")[0] ? document.getElementsByClassName("headerBox")[0].offsetHeight : false;//
      let mainDom = document.getElementById("main");
      let ivuRowFlexDomW;
      let kanbanHeaderDomH;
      if(!headerBoxH || !mainDom){
        console.log("没有 headerBoxH mainDom");
        return;
      }

      let kanbanHeaderDom = document.getElementById("kanbanHeader")?document.getElementById("kanbanHeader"):false;

      let ivuRowFlexDom = kanbanHeaderDom && document.getElementById("kanbanHeaderBox") ? document.getElementById("kanbanHeaderBox") : false;
      let boardDom = document.getElementById("board") ? document.getElementById("board") : false;

      columnW("kanbanHeaderBox","row-wrapper","topColumn","Column");

      //ivuRowFlexDomW = ivuRowFlexDom.offsetWidth ? ivuRowFlexDom.offsetWidth : 1131;
      ivuRowFlexDomW = kanbanHeaderDom && kanbanHeaderDom.offsetWidth ? kanbanHeaderDom.offsetWidth : 1131;

      kanbanHeaderDomH = kanbanHeaderDom.offsetHeight ? kanbanHeaderDom.offsetHeight : 41;

      let myscroll = ()=>{
        if(that.$route.path == "/demand" || that.$route.path ==  "/product" || that.$route.path ==  "/development" || that.$route.path ==  "/dependManage"){}else{return};
        kanbanHeaderDom = kanbanHeaderDom ? kanbanHeaderDom : document.getElementById("kanbanHeader");

        ivuRowFlexDom = ivuRowFlexDom ? ivuRowFlexDom : document.getElementById("kanbanHeaderBox");
        let boardDom = boardDom ? boardDom : document.getElementById("board");
        if(!kanbanHeaderDom || !boardDom || !ivuRowFlexDom){
          console.log("没有 kanbanHeaderDom boardDom ivuRowFlexDom");
          return;
        }

        columnW("kanbanHeaderBox","rowWrapper","topColumn","Column");

        //ivuRowFlexDomW = ivuRowFlexDom.offsetWidth ? ivuRowFlexDom.offsetWidth : 1131;
        ivuRowFlexDomW = kanbanHeaderDom && kanbanHeaderDom.offsetWidth ? kanbanHeaderDom.offsetWidth : 1131;
        kanbanHeaderDomH = kanbanHeaderDom.offsetHeight ? kanbanHeaderDom.offsetHeight : 41;

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

        }else{
          kanbanHeaderDom.removeAttribute('style');
          ivuRowFlexDom.removeAttribute('style');
          //ivuRowFlexDom.style.marginLeft = "-8px";
          //ivuRowFlexDom.style.marginRight = "-8px";
          if(numberBox && numberBox.length){
            for(let i=0;i<numberBox.length;i++){
              numberBox[i].removeAttribute('style');
            }
          }
        }
      }
      myscroll();

      mainDom.onscroll= myscroll
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
      this.$emit("addUS",{},req_id)
      //this.$router.push({path:'/product/add',query:{req_id}})
    },
    addNewTask(id){
      // this.$router.push({
      //   path:'/development/add',
      //   query:{
      //     addOrModifyStatus:true,
      //     userStoryId:id,
      //   }
      // })
      this.$emit("userStoryIdFn",id);
    },
    toStory(IG,column){
      let ID = this.$router.history.current.query.prjId || this.$router.history.current.query.id || "";
      let PrjSn = this.$router.history.current.query.prjSn || this.$router.history.current.query.prj_id || "";
      let obj =  column && column == 'us' ? 
      {
        path:"demand/detail",
        query:{
          reqList_id:IG.groupId,
          req_id:IG.reqID,
          prj_id:PrjSn,
          prjSn:PrjSn,
          id:ID,
          prjId:ID,
        }
      }
      :
      {
        path:"product/detail",
        query:{
          detail_id:IG.groupId,
          prj_id:PrjSn,
          prjSn:PrjSn,
          id:ID,
          prjId:ID,
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

            let fn = (arr,val)=>{
              return arr.find((item)=>{
                return "stateId_"+item == val;
              })
            }
            let fnUs = (arr,val,gId)=>{
              return arr.find((item)=>{
                return "kb"+gId+"_"+item == val;
              })
            }

            let fnWip = (arr,El)=>{
              return arr.indexOf(El.getAttribute("state")) != -1 ? El.getAttribute("title") : false; 
            }

            if(that.aside && that.aside == "product"){

              if(fnUs(that.isUsPut,Old.el.id,Ele.getAttribute("groupid"))){
                that.Warning = "有工作项，不能废弃"
                return false
              }else if(fnWip(that.noPutWip,Old.el)){
                that.Warning = fnWip(that.noPutWip,Old.el);
                return false

              }else{
                that.Warning = "";
                return true                
              }
              
            }if(that.aside && that.aside == "demand"){

              if(fn(that.isPut,Old.el.id)){
                that.Warning = "";
                return true
              }else {
                that.Warning = "不能向此处拖动！"
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
          
          if(that.myStatusList.length && that.groupLists.length && that.aside == "product"){
            for(let i=0;i<that.groupLists.length;i++){
              that.myStatusList.forEach((item)=>{
                
                if(document.getElementById('C-'+that.groupLists[i].groupId+'_'+item.state)){
                  document.getElementById('C-'+that.groupLists[i].groupId+'_'+item.state).removeAttribute("title");
                }
              })
            }

          }
          
          if(that.noPut.length && that.aside && that.aside == "product"){
            let DOM = document.getElementById(that.noPut[0]);
            if(DOM){
              DOM.removeAttribute('style');  
            }
          }
          if(vm.Group){
            console.log('moveEnd 》》》》》》')
            EventBus.$emit("moveEnd",{evt},that.Warning);
            vm.autoHeight();
          }else{
            console.log('story moveEnd 》》》》》》',evt);
            EventBus.$emit("storyMoveEnd",{evt},that.Warning);
            vm.autoHeight();
          }
          that.Warning = "";

        },
        onStart: function (evt) {
          if(that.aside && that.aside == "product"){
            that.Warning = "";
            that.isUsPut = [];
            let N = evt.item.getAttribute("data-taskcount") - 0;
            let gId = evt.item.getAttribute("groupid");
            if(N == 0 || N == "0"){
            }else{
              /*
              let obj = that.statusList.find((item)=>{
                return item.stateStr == "废弃";
              })
              */
              let filterObj = that.statusList.filter((item)=>{
                return item.stateStr == "废弃";
              })
              let obj = filterObj && filterObj.length ? filterObj[filterObj.length - 1] : false;

              if(obj){
                that.isUsPut.push(obj.state);
                that.noPut = [];
                that.noPut.push("kb"+gId+"_"+obj.state)
                let Dom = document.getElementById(that.noPut[0]);
                if(Dom){
                  let cssText = "background:#e4e4e4;webkit-transform: rotateY(-180deg);-moz-transform: rotateY(-180deg);-o-transform: rotateY(-180deg);-ms-transform: rotateY(-180deg);transform: rotateY(-180deg);"
                  Dom.setAttribute("style",cssText)
                }
                 
              }
            }



            //----
          
          //
          if(that.noPutWip.length && that.groupLists.length){

            for(let i=0;i<that.groupLists.length;i++){
              that.noPutWip.forEach((item)=>{

                if(document.getElementById('C-'+that.groupLists[i].groupId+'_'+item) && item != evt.item.getAttribute("state")){
                  document.getElementById('C-'+that.groupLists[i].groupId+'_'+item).setAttribute("title","用户故事超过WIP数量，不能在拖入")
                   
                }
              })
            }
          }
            //----


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

</script>
<style scoped>
/* 筛选开始 */
.settingIcon {
  cursor: pointer;
}
.boardWrapper {
  position: relative;
  min-height: 300px;
}
.tool {
  text-align: right;
  border-bottom: 1px dashed #ddd;
  padding-bottom: 5px;
  padding-top: 5px;
}
.funnelAllBox {
  border-bottom: 1px solid #e9e9e9;
  padding-bottom:6px;
  margin-bottom:6px;
  overflow: hidden;
  padding-top: 10px; 
}
.funnelGroupBox{
  max-height: 200px;
  overflow: auto;
  overflow-x:hidden; 

}
.funnelGroupBox > label {
  display: block;
  text-align: left;
  padding-bottom: 5px;
  overflow: hidden;
}
.funnelAllBox , .funnelGroupBox > label {
  padding-left:18px;
}


.funnelGroupBox > label .ivu-checkbox + span {
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  display: block;
  margin-left: 20px;
  padding-top: 2px;
}

.funnelAllBox > label {
  float: left;
}
.funnelBtnBox{
  text-align: center;
  padding-bottom: 10px;
}
.funnelIcon {
  position: relative;
  z-index: 260;
  transform:translate(0%,-12%);
}
.funnelOption{
  position: absolute;
  background: white;
  width: 160px;
  right: -2px;
  top: -5px;
  border: 1px solid #ddd;
  z-index: 250;
  padding-top:0px;

  background-color: #fff;
  background-clip: padding-box;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0,0,0,.2); 
  
  opacity: 0;
  transition: all 1s;
  pointer-events: none;
  
}
.funnelBox:hover .funnelOption {
  opacity: 1;
  pointer-events:auto;
}
.funnelBox {
  position: relative;
  margin-right: 5px;
  z-index: 200;
}

.funnelBox:before{
  position: absolute;
  content: "";
  width: 200%;
  height: 320%;
  right: 0;
  top: -20px;
  background: red;
  z-index: 210;
  opacity: 0.0;

}

.funnelBox:hover:before{
  width: 160px;
  height: 250px;
  background: red;
  opacity: 0.0;
  z-index: 202;
  /*pointer-events: none;*/
}

/* 筛选结束 */

.imgStatus{
  background: #f0d0a2; 
  border-radius:4px; 
  padding: 4px;
}
.noPutBg{
  background:#e4e4e4 /*#f8f8f9*/;
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

  left: 4px;
  right: 4px;
  bottom: 4px;
  transform:translate(0,0);
  height: 45px;
  text-align: center;
  line-height: 45px;
  border-radius: 4px;
  border: 1px dotted transparent; 
  color: transparent;
  background: transparent;
}
#boardWrapper,#productBoardBox,#demandBoardBox,#developmentBoardBox,#dependManageBoardBox{
  background: #fff;
}
.kanbanHeaderBox {
  display: flex;
  flex-flow:row  nowrap;/* flex-direction: row;flex-wrap: nowrap; */
  justify-content: flex-start;
  align-items:stretch;
  align-content:stretch;
}
.topColumnFirst{
  padding-left:0px;
  padding-right:4px;
  background:rgba(255,0,0,0.0); 
}
.topColumn{
  flex: 1 1 1px;/* flex-grow:1; flex-shrink:1; flex-basis:1px; */
  padding-right:2px;
  padding-left:2px;
}
.kanbanHeaderBox > div.topColumn:last-of-type{
  padding-right: 0;
}



.kanbanBox {
  display: flex;
  flex-flow:row  nowrap;/* flex-direction: row;flex-wrap: nowrap; */
  justify-content: flex-start;
  align-items:stretch;
  align-content:stretch;
}

.ColumnFirst{
  padding-left:0px;
  padding-right:4px;
  background:rgba(255,0,0,0.0); 
}

.Column{
  flex: 1 1 1px;/* flex-grow:1; flex-shrink:1; flex-basis:auto; */
  padding-right:2px;
  padding-left:2px;
  
  
  /* flex-basis:auto; */

  -webkit-perspective: 500;
    -moz-perspective: 500;
    -ms-perspective: 500;
    perspective: 500;
    -ms-transform: perspective(500px);
    -moz-transform: perspective(500px);
    -moz-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;


    

}
.Column[title][id^="C-"]{
  /*
  outline: red solid 1px;
  pointer-events: none;
  */

  
  

}


[id^="C-"]{
  transition: all 0.5s ease-out 0s;
}
[id^="TC-"]{
  transition: all 0.5s ease-out 0s;
}
[title=hidden]{
  width: 0 !important;
  overflow: hidden !important;
  flex: 0 0 auto !important;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;

  /*transition: all 0.5s ease-out 0s;*/

  /*display: none;*/
}

.rowBox[title][id^="kb"]{
  background:#e4e4e4;
  overflow: hidden;
  
  /*pointer-events: none;*/
}
.rowBox[title][id^="kb"]:before{
   position: absolute;
  content: "";
  left: -110%;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  z-index: 50; 
  transition: all 0.5s ease-out 0s;
  opacity: 0;
}
.Column[title][id^="C-"] .rowBox[title][id^="kb"]:before{
  left: 0;
  opacity: 1;
}
.Column[title][id^="C-"] .rowBox[title][id^="kb"]{
  pointer-events: none;
}

.rowBox{
  padding-top: 0px;
  border:1px dashed #ddd;
  min-height:64px;
  border-radius:4px;
  height: 100%;
  

  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
  -o-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  transform: rotateY(0deg);

  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;

 
  -webkit-transform-origin:right center;
  -moz-transform-origin:right center;
  -ms-transform-origin:right center;
  transform-origin:right center;   
  
  /*
  -webkit-transition: 2s;
  -moz-transition: 2s;
  -o-transition: 2s;
  -ms-transition: 2s;
  transition: 2s;
  */
    /* transition: all 1s; */
  transition:all 1.5s;


}
.rowBox2{
  border:1px dashed #ccc;
  min-height:100px;
}

.kanbanBox > div.Column:last-of-type{
  padding-right: 0;
}

.addMissionBtn{
  margin:6px auto 0;
  display:block;
}
.addUsBtn{
  margin:6px auto 0;display:block;
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
  /*left: 11.5%;*/
  border-right: 1px dashed #ddd;
  height: 100%;
  left: 120px;

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
  min-height: 36px;
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
<style>
.funnelGroupBox > label .ivu-checkbox {
  float: left;
}
</style>
