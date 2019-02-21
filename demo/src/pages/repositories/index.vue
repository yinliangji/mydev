<template>
	<div class="pageContent">
        <Card id="repositoriesWapper">
            <div class="repositoriesBox">
                <h3 class="Title"><span>Maven公共仓库浏览</span></h3>
                <p>ICDP 公共仓库 public 能够连接外网，下载官方 maven 仓库（repo1.maven.org）资源，使用它能够降低下载最新依赖成本！</p>
                <div class="tableBox">
                    <Table border stripe  ref="repositoriesTable" :columns="columns" :data="tableData" class="myTable" ></Table>
                    <div class="pageBox" >
                        <Page :current="tableDAtaPageCurrent" :total="tableDAtaTatol/tableDAtaPageLine > 1 ? (tableDAtaTatol%tableDAtaPageLine ? parseInt(tableDAtaTatol/tableDAtaPageLine)+1 : tableDAtaTatol/tableDAtaPageLine)*10 : 1" show-elevator @on-change="changeCurrentPage" @on-page-size-change="changePageSize"></Page>
                        <p>总共{{tableDAtaTatol}}条记录</p>
                    </div>
                </div>
            </div>
            <Tabs :value="TabsCur" type="card" :capture-focus="false" @on-click="tabsHandle"  >
                <TabPane label="公共仓库使用指南" name="name1">
                    <div class="baseInfoBox">
                        <!-- <h3 class="Title"><span>用户故事基本信息</span></h3> -->
                        <div class="tableBox">
                            <GuidePublic v-if="TabsCur == 'name1'" />
                        </div>
                    </div>
                </TabPane>
                <TabPane label="私有仓库使用指南" name="name2">
                    <div class="baseInfoBox">
                        <!-- <h3 class="Title"><span>项目基本信息</span></h3> -->
                        <div class="tableBox">
                           <GuidePrivate v-if="TabsCur == 'name2'" />
                        </div>
                    </div>
                </TabPane>
                <TabPane label="本地仓库迁移指南" name="name3">
                    <div class="baseInfoBox">
                        <!-- <h3 class="Title"><span>项目基本信息</span></h3> -->
                        <div class="tableBox">
                           <GuideLocal v-if="TabsCur == 'name3'" />
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </Card>
        

    </div>
</template>
<script>
import Store from '@/vuex/store'
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {queryPublicRep} = Common.restUrl;
import GuidePublic from './guidepublic'
import GuidePrivate from './guideprivate'
import GuideLocal from './guidelocal'
export default {
    name: 'Maven',
    components: {
        GuidePublic,
        GuidePrivate,
        GuideLocal,
    },
    data() {
        return {
            //表格开始
            columns: [
               
                {
                    title: 'Repository',
                    key: 'repId',
                    width: 300,
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'em',
                            {
                                //style:{color:'#2d8cf0'},
                                //attrs:{title:"xxxxx",href:"###"},
                                //domProps:{innerHTML:"内容",},
                                "class":{txtBlock:true,txtBlockNone:false},
                                attrs:{title:params.row.repId},
                                on: {
                                    click:()=>{
                                    }
                                }
                            },
                            params.row.repId
                        );
                    }
                },
                {
                    title: 'Type',
                    width: 100,
                    key: 'type',
                    align: 'center',
                },
                {
                    title: 'Policy',
                    key: 'policy',
                    width: 130,
                    align: 'center',
                },
                {
                    title: 'Path',
                    key: 'path',
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                //style:{color:'#2d8cf0'},
                                //attrs:{title:"xxxxx",href:"###"},
                                //domProps:{innerHTML:"内容",},
                                "class":{txtBlock:true,txtBlockNone:false},
                                attrs:{title:params.row.path,target:"_blank",href:params.row.path},
                                on: {
                                    click:()=>{
                                    }
                                }
                            },
                            params.row.path
                        );
                    }
                    
                },
            ],
            tableData: [
            ],
            tableDAtaTatol:0,
            tableDAtaPageLine:20,
            tableDAtaPageCurrent:1,
            actionArr:[],
            //表格结束
            //tag开始
            TabsCur:"name1",
            //tag结束
          
        }
    },
    mounted() {
        this.tableDataAjaxFn(queryPublicRep,1,this.tableDAtaPageLine);
    },
    methods: {
        //表格开始
        changeCurrentPage(i) {
            this.tableDataAjaxFn(queryPublicRep,i,this.tableDAtaPageLine);
            this.tableDAtaPageCurrent = i;
        },
        changePageSize(i) {

        },
        tableDataAjaxFn(URL = "",page = 1,pageline = 3){
            
            defaultAXIOS(URL,{page,pageline},{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======Maven公共仓库浏览***response+++",response,myData.data,"======>");
                if(myData.status == "success"){
                    this.tableData = myData.data;
                    this.tableDAtaTatol = myData.total;
                }else{
                    this.showError(URL+"_错误");
                }
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
        //表格结束
        //tag开始
        tabsHandle(name){
            this.TabsCur = name;
        },
        //tag结束
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
    }

}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';
.pageBox {
    padding-bottom:20px;
    padding-top:20px;
    overflow: hidden;
}
.tableBox{
    padding-top: 20px;
}
</style>
<style>
#repositoriesWapper .ivu-tabs-bar{
    margin-bottom: 0;
}
#repositoriesWapper h3.Title{
    margin-top: 10px;
}
</style>