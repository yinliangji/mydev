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
                                            <Select ref="Sprint" clearable filterable v-model="formValidate.reqId"  placeholder="请选择仓库">
                                                <Option v-for="(item,index) in reqIdList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="2" style="text-align: center">关键字/GAV</Col>
                                    <Col span="6">
                                        <FormItem prop="end_time">
                                            <Select ref="Sprint" v-model="formValidate.keyWordGAV"  placeholder="选择关键字/GAV">
                                                <Option v-for="(item,index) in keyWordGAVList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>

                                    <Col span="2" style="text-align: center">所属迭代</Col>
                                    <Col span="6">
                                        <FormItem >
                                            <Select ref="Sprint" clearable filterable v-model="formValidate.sprint"  placeholder="请选择迭代">
                                                <Option v-for="(item,index) in sprintList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>


                                    
                                </Row>
                                <Row class="SerchBox" >
                                    <Col span="2" style="text-align: center">故事状态</Col>
                                    <Col span="6">
                                        <FormItem >
                                            <Select clearable v-model="formValidate.userstory_status" placeholder="请选择故事状态">
                                                
                                                <Option v-for="(item,index) in userstory_statusList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="2" style="text-align: center">所属需求项</Col>
                                    <Col span="6">
                                        <FormItem >
                                            <Select ref="ReqId" clearable filterable v-model="formValidate.req_id" placeholder="请选择所属需求项">
                                                <Option v-for="(item,index) in req_idList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="2" style="text-align: center">优先级</Col>
                                    <Col span="6">
                                        <FormItem >
                                            <Select clearable v-model="formValidate.proi"  placeholder="请选择优先级">
                                                
                                                <Option v-for="(item,index) in proiList" :value="item.value" :key="index">{{ item.label }}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                
                            </Col>
                            <Col span="4" style="text-align: left" class="serchBtnBox">
                                <Button type="primary" icon="ios-search" class="serchBtn" @click="serchAll">查询</Button>
                                <Button class="cancelSerchBtn" @click="cancelSerchAll">重置</Button>
                            </Col>
                        </Row>
                        
                    </FormItem>
            </Form>
        </Card>
    </div>
</template>
<script>
import Store from '@/vuex/store'
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {} = Common.restUrl;

export default {
	name: 'producesearch',
	components: {

	},
	data() {
		return {
			formValidate: {
                reqId:"",
                groupId:"",
                artifactId:"",
                version:"",
                keyWordGAV:"keyword",
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
            reqIdList:[],
            ruleValidate: {
                
            },
		}
	},
	mounted() {

    },
	methods: {
        serchAll(){

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