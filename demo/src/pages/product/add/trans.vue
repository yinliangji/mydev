<template>
    <div class="transBody">
        <Row style="padding-bottom:10px;">
            <Col span="3">
                已有业务功能
            </Col>
            <Col span="17">
                <!-- <Input placeholder="输入【已有业务功能】查询" ></Input> -->
                <Select v-modle="reqserch" filterable multiple placeholder="输入【已有业务功能】查询">
                    <Option v-for="(item ,index) in reqserchList" :value="item.value" :key="index">
                        {{item.label}}
                    </Option>
                </Select>
            </Col>
            <Col span="1">
                &nbsp;
            </Col>
            <Col span="2">
                <Button type="primary"  icon="ios-search">查询</Button>
            </Col>
            <Col span="1">
                &nbsp;
            </Col>
        </Row>
        <div class="transBodyLK" style="float:left;width:44%;">
            <!-- <div style="margin-bottom:10px;">&nbsp;</div> -->
            <div class="transBodyL">

                <div style="padding:6px;">
                    <Checkbox :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
                </div>

                <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                    <div class="userStoryTitle">
                      <div class="userStoryStatus" >
                          操作
                      </div>
                      <div class="userStoryName" >
                          名称
                      </div>
                    </div>
                    <ul>
                        <li v-for="item in dataL" :key="item.id" class="storyBottom">
                            <div class="tranHeader">
                                <span class="userStoryStatus" >编辑</span>
                                <Checkbox :label="item.id" style="width:70%;">{{item.userstory_name}}</Checkbox>
                            </div>
                        </li>
                    </ul>
                </CheckboxGroup>
            </div>
        </div>
        <div class="transBodyC">
            <Button :type="bgcolorL" long icon="chevron-left" @click="toLeft" :disabled="toLeftOnoff" >
                <Icon type="chevron-left"></Icon>
            </Button>
            <Button :type="bgcolorR" long icon="chevron-right" @click="toRight" :disabled="toRightOnoff">
                <Icon type="chevron-right"></Icon>
            </Button>
        </div>
        <div class="transBodyRK" style="float:left;width:43%;">
            <!-- <div style="margin-bottom:10px;">
                <Row>
                    <Col span="7">
                        已有业务功能
                    </Col>
                    <Col span="13">
                        
                        <Select v-modle="reqserch" filterable multiple>
                            <Option v-for="(item ,index) in reqserchList" :value="item.value" :key="index">
                                {{item.label}}
                            </Option>
                        </Select>
                    </Col>
                    <Col span="1">
                        &nbsp;
                    </Col>
                    <Col span="3">
                        <Button type="primary" shape="circle" icon="ios-search"></Button>
                    </Col>
                </Row>
            </div>     -->
            <div class="transBodyR">
                <div class="transBodyRcon">
                    <div style="padding:8px 0;">
                        <Checkbox :value="checkAllR" @click.prevent.native="handleCheckAllR" style="margin-left:10px;">
                            全选
                        </Checkbox>
                    </div>
                    <CheckboxGroup v-model="checkAllGroupR" @on-change="checkAllGroupChangeR">
                        <div class="userStoryTitle">
                            <div class="userStoryStatus" >
                                操作
                            </div>
                            <div class="userStoryName" >
                                名称
                            </div>
                        </div>
                        <ul>
                            <li v-for="item in dataR" :key="item.id" class="storyBottom">
                                <div class="tranHeader">
                                    <span class="userStoryStatus">查看</span>
                                    <Checkbox :label="item.id" style="width:70%;">{{item.userstory_name}}</Checkbox>
                                </div>
                            </li>
                        </ul>
                    </CheckboxGroup>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                reqserch:"",
                reqserchList:[
                    {
                        value:"x1",
                        label:"x1"
                    }
                ],
                proproName:"",
                isShowMngAllBtn:false,
                toLeftOnoff:true,
                toRightOnoff:true,
                addOrModifyStatus:false,//默认为false是添加，当修改时改为true
                sureInfo: "添加成功",
                storySearch: "",
                //
                curStoryType: "",
                curStoryTypeL:"",
                storyTypeList: [],

                curIteration: "",
                iterationList: [],
                curStoryStatus:"",
                curStoryStatusL:"",
                storyStatusList: [],
                curreqName:"",
                reqList:[],

                bgcolorL: "ghost",
                bgcolorR: "ghost",
                nowNum: 0,
                search: "",
                titleName: "",

                indeterminate: true,
                checkAll: false,
                checkAllR: false,
                checkAllGroup: [], //v-model的控制多选框组是否打钩的
                checkAllGroupR: [],
                checkAllGroupOnoff: [], //全选按钮
                checkAllGroupOnoffR: [],
                //
                dataL: [
                    {
                        id:1,
                        userstory_name:"故事1",
                        isShow:false,
                        list:[],
                    },
                    {
                        id:2,
                        userstory_name:"故事2",
                        isShow:false,
                        list:[],
                    },
                ],
                dataR: [
                    {
                        id:3,
                        userstory_name:"故事3",
                        isShow:false,
                        list:[],
                    },
                    {
                        id:4,
                        userstory_name:"故事4",
                        isShow:false,
                        list:[],
                    },
                ],
            }
        },
        methods: {
            toLeft() {
                
                this.checkAllGroupR.forEach(element => {
                    this.dataL.push(this.dataR.find(n => n.id == element));
                    this.dataR.splice(this.dataR.findIndex(n => n.id == element),1);
                });
                this.checkAll = false;
                this.checkAllR = false;
            
            },
            toRight() {
                this.checkAllGroup.forEach(element => {
                    this.dataR.push(this.dataL.find(n => n.id == element));
                    this.dataL.splice(this.dataL.findIndex(n => n.id == element),1);
                });
                this.checkAll = false;
                this.checkAllR = false;
            },
            handleCheckAll() {
                if (this.checkAll) {
                    this.checkAllGroup = [];
                } else {
                    this.checkAllGroup = this.checkAllGroupOnoff;
                }
                this.checkAll = !this.checkAll;
            },
            handleCheckAllR() {
                if (this.checkAllR) {
                    this.checkAllGroupR = [];
                } else {
                    this.checkAllGroupR = this.checkAllGroupOnoffR;
                }
                this.checkAllR = !this.checkAllR;
            },
            checkAllGroupChange(data) {
                if (data.length < this.dataL.length) {
                    this.checkAll = false;
                } else {
                    this.checkAll = true;
                }
            },
            checkAllGroupChangeR(data) {
                if (data.length < this.dataR.length) {
                    this.checkAllR = false;
                } else {
                    this.checkAllR = true;
                }
            },
        },
        watch: {
            checkAllGroup(val) {
                console.log(val);
                if (val.length > 0) {
                    this.bgcolorR = "info";
                    this.toRightOnoff = false;
                } else {
                    this.bgcolorR = "ghost";
                    this.toRightOnoff = true;
                }
            },
            checkAllGroupR(val) {
                console.log(val);
                if (val.length > 0) {
                    this.bgcolorL = "info";
                    this.toLeftOnoff = false;
                } else {
                    this.bgcolorL = "ghost";
                    this.toLeftOnoff = true;
                }
            },
            dataL(val) {
                this.checkAllGroupOnoff = [];
                val.forEach(element => {
                    this.checkAllGroupOnoff.push(element.id);
                });
                this.checkAllGroup = [];
            },
            dataR(val) {
                this.checkAllGroupOnoffR = [];
                val.forEach(element => {
                    this.checkAllGroupOnoffR.push(element.id);
                });
                this.checkAllGroupR = [];
            },
        },
        created() {
            this.dataL.forEach(element => {
                this.checkAllGroupOnoff.push(element.id);
            });
            this.dataR.forEach(element => {
                this.checkAllGroupOnoffR.push(element.id);
            });
            
        },
        mounted(){

        },
    }


</script>

<style lang="less" scoped>

.userStoryTitle{
    height:40px;
    line-height:40px;
    border:1px solid #d8d8d8;
    border-right:none; 
    border-left:0;
}
.transBodyL .userStoryTitle .userStoryName{
    float:left;
    width:58%;
    padding-left:10px;
}
.userStoryName{
    float:left;
    width:68%;
    padding-left:10px;
}
 .userStoryType{
    float:left;
    width:84px;
    text-align: center;
}
 .userStoryStatus{
    float:right;
    width:80px;
    text-align: center;
}

.container-transfer {
    width: 100%;
    margin: 0 auto;
    font-size: 14px;
}
.interation-tip {
    font-size: 12px;
    color: #909090;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #e0e0e0;
    margin-top: 30px;
    line-height: 20px;
}


.transBody {
    overflow: hidden;
   
    margin-top: 0px;
   
    padding: 10px 0 10px 10px;
    border:1px solid #dddee1;
    border-radius:2px;
    background:none;
    
   

}
.transBodyL {
    /* flex-grow:1; */
    width: 100%;
    float: left;
    overflow: hidden;
    border: 1px solid #d8d8d8;
    border-radius: 2px;

    min-height:40vh;
    background:#fff;
    padding-top:6px;
}
.transBody h3 {
    height: 40px;
    line-height: 40px;
    text-indent: 10px;
    background: #f9fafc;
    margin-bottom: 10px;
}
.transBodyL li {
    /* margin-top: 20px; */
}

.transBodyC {
    width: 60px;
    float: left;
    overflow: hidden;
    margin: 0 10px;
    margin-top: 6vh;
    line-height: 40px;
}
.transBodyR {
    /* flex-grow:1; */
    width: 100%;
    float: left;
    overflow: hidden;
    border: 1px solid #d8d8d8;
    border-radius: 2px;

    min-height:40vh;
    background:#fff;
   
}
.trans-top {
    margin-top: 10px;
    padding-left: 8px;
    background:#f9f9f9;
    margin-bottom: 4px;
    margin-top: 4px;
}


.addTaskTable {
    padding:20px 10px 0;
    border: 1px solid #aae5d1;
    border-radius: 2px;
    background: #edf6fb;

}
.taskrow {
    height: 30px;
}
.tranHeader {
    padding: 10px;
    background: #dddee1;
    border-bottom:none;
    font-size:12px;
    padding-right:0;
    padding-top:3px;
    padding-bottom: 3px;
}
/*
.tranHeader .more{
   padding:4px 8px; background:#f9f9f9;
   position: relative;
   top: -4px
}
.tranHeader:hover {
    background:#f9f9f9
}
*/
.tranHeader .ivu-icon {
    float: right;
    cursor: pointer;
    padding:0px 8px;
}
.totalNum {
    margin-right: 10px;
    color: #00bcd5;
    font-weight: normal;
    font-size: 14px;
}
.infoGroup {
}
.ivu-checkbox{margin-right:6px;}
.storyBottom{
    border-top:2px white solid;
}
</style>
