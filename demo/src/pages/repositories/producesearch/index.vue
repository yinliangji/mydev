<template>
    <div class="pageContent">
        <Card>
            <div class="repositoriesBox">
                <h3 class="Title"><span>制品搜索</span></h3>
            </div>
         	<Form ref="formValidate" class="formValidate" :model="formValidate" :rules="ruleValidate">
                <FormItem >
                        <Row class="serchInputBox">
                            <Col span="20">
                                <Row class="SerchBox">
                                    <Col span="2" style="text-align: center">选择仓库</Col>
                                    <Col span="6">
                                        <FormItem >
                                            <Select ref="Sprint" clearable filterable v-model="formValidate.repId"  placeholder="请选择仓库" >
                                                <Option v-for="(item,index) in repIdList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="2" style="text-align: center">关键字/GAV</Col>
                                    <Col span="6">
                                        <FormItem >
                                            <Select  v-model="formValidate.keyWordGAV"  placeholder="选择关键字/GAV" @on-change="onChange">
                                                <Option v-for="(item,index) in keyWordGAVList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>

                                    <Col span="2" style="text-align: center">&nbsp;</Col>
                                    <Col span="6">
                                        &nbsp;
                                    </Col>


                                    
                                </Row>
                                <Row class="SerchBox" v-if="formValidate.keyWordGAV=='keyword'" >
                                    <Col span="2" style="text-align: center">关键字</Col>
                                    <Col span="6">
                                        <FormItem prop="keyword">
                                            <Input v-model="formValidate.keyword" placeholder="请填关键字"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="2" style="text-align: center">&nbsp;</Col>
                                    <Col span="6">
                                        &nbsp;
                                    </Col>
                                    <Col span="2" style="text-align: center">&nbsp;</Col>
                                    <Col span="6">
                                        &nbsp;
                                    </Col>
                                </Row>
                                <Row class="SerchBox" v-else>
                                    <Col span="2" style="text-align: center">group</Col>
                                    <Col span="6">
                                        <FormItem prop="groupId">
                                            <Input v-model="formValidate.groupId" placeholder="请填写group"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="2" style="text-align: center">artifact</Col>
                                    <Col span="6">
                                        <FormItem prop="artifactId">
                                            <Input v-model="formValidate.artifactId" placeholder="请填写artifact"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="2" style="text-align: center">version</Col>
                                    <Col span="6">
                                        <FormItem prop="version">
                                            <Input v-model="formValidate.version" placeholder="请填写version"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                                
                            </Col>
                            <Col span="4" style="text-align: left" class="serchBtnBox">
                                <Button type="primary" icon="ios-search" class="serchBtn" @click="serchAll(formValidate.keyWordGAV)">查询</Button>
                                <Button class="cancelSerchBtn" @click="cancelSerchAll">重置</Button>
                            </Col>
                        </Row>
                        
                    </FormItem>
            </Form>
            <div class="producesearchBox">
                <!--  -->
                <Table border stripe  ref="selection" :columns="columns" :data="tableData" class="myTable" @on-select="onSelectFn" @on-select-all="onSelectAllFn" @on-selection-change="onSelectionChangeFn"></Table>
                <!-- <div class="pageBox" v-if="tableData.length">
                    <Page :current="tableDAtaPageCurrent" :total="tableDAtaTatol/tableDAtaPageLine > 1 ? (tableDAtaTatol%tableDAtaPageLine ? parseInt(tableDAtaTatol/tableDAtaPageLine)+1 : tableDAtaTatol/tableDAtaPageLine)*10 : 1" show-elevator @on-change="changeCurrentPage" @on-page-size-change="changePageSize"></Page>
                    <p>总共{{tableDAtaTatol}}条记录</p>
                </div> -->
                <!--  -->
            </div>
        </Card>
        <DetailPop 
            @buspopClose = "depdpopCloseFn"
            :Data="depdpopData"
            :isShow = "depdpopIsShow"
            :isLoading = "depdpopIsLoading"
        />
    </div>
</template>
<script>
import Store from '@/vuex/store'
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {searchJarByKey,searchJarByGav,getAllRepId} = Common.restUrl;
import DetailPop from './detailpop'
export default {
	name: 'producesearch',
	components: {
        DetailPop,
	},
	data() {
        const valueCheck = (rule, value, callback) => {
            let IS = this.formValidate.groupId || this.formValidate.artifactId || this.formValidate.version || "";
            if(IS) {
                callback();
            }else{
                return callback(new Error('group、artifact、version至少填一个！'));
            }
        };
		return {
			formValidate: {
                repId:"",
                groupId:"",
                artifactId:"",
                version:"",
                keyWordGAV:"keyword",
                keyword:"",
            },
            keyWordGAVList:[
                {
                    value:"keyword",
                    label:"关键字搜索",
                },
                {
                    value:"GAV",
                    label:"GAV搜索",
                },
            ],
            repIdList:[],
            ruleValidate: {
                keyword: [
                    { required: true, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
                groupId: [
                    { required: true, validator: valueCheck, trigger: 'blur' }
                ],
                artifactId: [
                    { required: true, validator: valueCheck, trigger: 'blur' }
                ],
                version: [
                    { required: true, validator: valueCheck, trigger: 'blur' }
                ],
            },
            //列表开始
            columns: [
                {
                    title: '仓库',
                    key: 'repId',
                    align: 'center',
                    
                },
                {
                    title: 'groupId',
                    key: 'groupId',
                    align: 'center',
                },
                {
                    title: 'artifactId',
                    key: 'artifactId',
                    align: 'center',
                },
                {
                    title: 'version',
                    key: 'version',
                    align: 'center',
                },
                {
                    title: 'packaging',
                    key: 'type',
                    align: 'center',
                },
                {   title: '操作',
                    key: 'action',
                    width: 170,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                },
                                on: {
                                    click: () => {
                                        this.goProducesearchDetailDFn(params.index,params.row)
                                    }
                                }
                            }, '查看'),
                            
                            
                        ]);
                    }
                }
            ],
            tableData: [],
            tableDAtaTatol:0,
            tableDAtaPageLine:10,
            tableDAtaPageCurrent:1,
            actionArr:[],
            //列表结束
            //业务弹出--start
            depdpopIsShow:false,
            depdpopIsLoading:false,
            depdpopData:false,
            //业务弹出--end
		}
	},
	mounted() {
        this.getRepId(getAllRepId);
    },
	methods: {
        //业务窗口 -start
        depdpopCloseFn(B){
          this.depdpopIsShow = B;
        },
        depdpopOpenFn(B,i,d){
          this.depdpopData = d;
          this.depdpopIsShow = B;
        },
        //业务窗口 -end
        onChange(val){
            this.$refs.formValidate.resetFields();
        },
        //列表开始
        goProducesearchDetailDFn(i,obj){
            this.depdpopOpenFn(true,i,obj);
        },
        getRepId(URL,params = {}){
            this.repIdList = [];
            defaultAXIOS(URL,params,{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======maven 制品搜索获取仓库repid***response+++",response,myData.data,"======>");
                if(myData.status == "success"){
                    if(myData.data && Array.isArray(myData.data)){
                        let obj = {}
                        myData.data.forEach((item)=>{
                            obj.value = item+"";
                            obj.label = item+"";
                            this.repIdList.push(obj);
                            obj = {};        
                        });
                        this.formValidate.repId = this.repIdList[0].value;
                    }else{
                        this.showError(URL+"_myData_错误");    
                    }
                }else{
                    this.showError(URL+"_错误");
                }
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });

        },
        tableDataAjaxFn(URL = "",params = {}){
            defaultAXIOS(URL,params,{timeout:20000,method:'post'}).then((response) => {
                let myData = response.data;
                console.log("<======maven 制品搜索***response+++",response,myData.data,"======>");
                if(myData.status == "success"){
                    this.tableData = myData.data;
                    this.tableDAtaTatol = myData.count || myData.total;
                }else{
                    this.showError(URL+"_错误");
                }
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
            });
        },
        submitDate(val){
            let tempData = val == "keyword" ? {
                repId:this.formValidate.repId,
                keyword:this.formValidate.keyword,
            }:{
                repId:this.formValidate.repId,
                groupId:this.formValidate.groupId,
                artifactId:this.formValidate.artifactId,
                version:this.formValidate.version,
            }
            let URL = val == "keyword" ? searchJarByKey : searchJarByGav;
            this.tableDataAjaxFn(URL,tempData);
        },
        changeCurrentPage(i) {
        },
        changePageSize(i) {

        },
        onSelectionChangeFn(S){
            console.log("<===*onSelectionChangeFn*===Sel->",S,"<-Sel===*onSelectionChangeFn*===>")
            this.actionArr = S;
        },
        onSelectAllFn(S){
            console.log("<===*onSelectAllFn*===Sel 全选->",S,"<-Sel===*onSelectAllFn*===>")
        },
        onSelectFn(S,R){
            console.log("<===*onSelectFn*===Sel->",S,"<-Sel======ROW->",R,"<-ROW===*onSelectFn*===>")
        },
        //列表结束
        serchAll(val){
            //this.submitDate(val);
            //return
            this.$refs.formValidate.validate((valid)=>{//验证

                if(valid){
                    this.submitDate(val);                    
                }else{
                    console.log(valid)
                }
            })

        },
        cancelSerchAll(){
            this.formValidate.keyword = "";
            this.formValidate.groupId = "";
            this.formValidate.artifactId = "";
            this.formValidate.version = "";
            this.formValidate.repId = this.repIdList.length && this.repIdList[0].value ? this.repIdList[0].value : "";
            this.$refs.formValidate.resetFields();
        },
	}
}
</script>

<style  lang="less" scoped>
@import './style.less';
@import './style.css';
.SerchBox{
    padding-bottom:10px;
}
.serchInputBox{
    display: flex;
}
.serchBtnBox{
    position: relative;
}
.SerchBox{
    padding-bottom:10px;
}
.serchBtn{
    position: absolute;
    left:0;
    top:50%;
    transform: translate(50%, -65%);
}
.cancelSerchBtn{
    position: absolute;
    left:0;
    top:50%;
    transform: translate(200%, -65%);
}

</style>