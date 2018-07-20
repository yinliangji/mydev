<template>
	<div class="pageContent">
		<Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>敏捷项目管理</BreadcrumbItem>
            <BreadcrumbItem>敏捷项目列表</BreadcrumbItem>
        </Breadcrumb>
        <Card>
            <div class="aglieBox">
            	<h3 class="Title">敏捷项目列表</h3>
            	<Form ref="formValidate" class="formValidate">
			       
			        <FormItem >
			            <Row>
			            	
			            	<Col span="2" style="text-align: center">项目名称</Col>
			                <Col span="4">
			                    <FormItem >
			                        <Input  placeholder="输入项目名称"></Input>
			                    </FormItem>
			                </Col>
			                <Col span="2" style="text-align: center">项目编号</Col>
			                <Col span="4">
			                    <FormItem >
			                        <Input  placeholder="输入项目编号"></Input>
			                    </FormItem>
			                </Col>
			                <Col span="2" style="text-align: center">产品经理</Col>
			                <Col span="4">
			                    <FormItem >
			                        <Input  placeholder="输入产品经理"></Input>
			                    </FormItem>
			                </Col>
			                <Col span="3" style="text-align: center">
			                	<Button type="primary" icon="ios-search">查询</Button>
			            	</Col>
			            	<Col span="3" style="text-align:left"></Col>
			            </Row>
			        </FormItem>
			       
			    </Form>

				<div class="tableBox">
					<div class="tableBtnBox">
						<Button type="success" @click="addItem">添加</Button>
					    <Button type="warning" @click="editItem">编辑</Button>
					    <Button type="error" @click="deleteTableItem">删除</Button>
					</div>
			    	<Table border  ref="selection" :columns="columns" :data="itemData" class="myTable" @on-select="onSelectFn" @on-select-all="onSelectAllFn" @on-selection-change="onSelectionChangeFn"></Table>

                    <Button @click="handleSelectAll(true)">设置全选</Button>
                    <Button @click="handleSelectAll(false)">全部取消</Button>
			    	
			    	<div class="pageBox">
			    		<Page :total="100" show-elevator></Page>
			    		<p>显示第1到第5条记录，总共90条记录</p>
			    	</div>
			    </div>
            </div>
        </Card>
        <Modal v-model="modaDelete" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>确认删除？请点击删除按钮</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
            </div>
        </Modal>
        <Modal ref="addPop" v-model="modaAdd" :title="ADDorEDIT?'添加':'编辑'" @on-ok="submitAdd" @on-cancel="cancel" ok-text="提交" :loading="modal_add_loading" visible="true">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="项目名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="请填写项目名称"></Input>
                </FormItem>
                <FormItem label="设置时间" prop="date">
                    <DatePicker :value="formValidate.date" format="yyyy-MM-dd" type="daterange" placement="bottom-end" placeholder="选择开始和结束日期" v-model="formValidate.date" split-panels  style="width: 300px"></DatePicker>
                </FormItem>
                <FormItem label="项目描述" prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写项目描述"></Input>
                </FormItem>
            </Form>
        </Modal>
	</div>
</template>
<script>


Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
}

const validateDate = (rule, value, callback) => {
   
   
    if (!value || !value[0] || !value[1]) {
        console.log("value 错误",)  
        return callback(new Error('请选择日期'));
    }else{
        let nowTime = new Date().getTime();
        let valueTime = new Date(value[1]).getTime()
        if(nowTime > valueTime){
            return callback(new Error('结束日期小于现在，请从新选择结束日期'));
        }
        callback()   
    }
};

export default {
	name: 'aglie',
    mounted(){
        this.resetData()
    },
    data () {
        return {
            nowDate:"",
            defDate:"",
            formValidate: {
                name: '',
                date:[],
                startDate: '',
                startTime: '',
                desc: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请填写内容，不能为空！', trigger: 'blur' }
                ],
                date: [
                    { required: true, type: 'array', validator: validateDate, trigger: ['blur','change'], }
                ],
                startDate: [
                    { required: true, type: 'date', message: 'Please select the date', trigger: ['blur','change'] }
                ],
                startTime: [
                    { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                ],
                desc: [
                    { required: false, message: 'Please enter a personal introduction', trigger: 'blur' },
                    //{ type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                ]
            },
            modaAdd: false,
            ADDorEDIT:true,
            modaDelete: false,
            modal_loading: false,
            modal_add_loading: true,
            columns: [
            	{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                 {
                    title: '项目编号',
                    key: 'num',
                    width: 85,
                    align: 'center',
                },
                {
                    title: '项目名称',
                    key: 'name',
                    //
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                style:{color:'#2d8cf0'},
                                //domProps:{href:"###"},
                                on: {
                                    click: () => {
                                        this.linkFn(params.index)
                                    }
                                }
                            },
                            params.row.name
                        );
                    }
                    //


                },
               
                {
                    title: '项目描述',
                    key: 'describe'
                },
                {
                    title: '开始时间',
                    key: 'startTime',
                    width: 100,
                    align: 'center',
                },
                {
                    title: '结束时间',
                    key: 'endTime',
                    width: 100,
                    align: 'center',
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 180,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.goDemandFn(params.index)
                                    }
                                }
                            }, '需求项'),
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.goDevelopmentFn(params.index)
                                    }
                                }
                            }, '任务'),
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.goOverViewFn(params.index)
                                    }
                                }
                            }, '概览')
                        ]);
                    }
                }
            ],
            itemData: [
                {
                    name: '项目名称1',
                    num: 18,
                    describe: '项目描述1',
                    startTime:"2012-10-10",
                    endTime:"2012-10-10",
                },
                {
                    name: 'Jim Green',
                    num: 24,
                    describe: 'London No. 1 Lake Park',
                    startTime:"2012-10-10",
                    endTime:"2012-10-10",
                },
                {
                    name: 'Joe Black',
                    num: 30,
                    describe: 'Sydney No. 1 Lake Park',
                    startTime:"2012-10-10",
                    endTime:"2012-10-10",
                },
                
            ],
            actionArr:[],
        }
    },
    methods: {
        resetData(){
            //new Date().Format("yyyy-MM-dd HH:mm:ss");
            let minute = 60*1000;
            let hour = minute *60;
            let day = 24*hour;
            let setDay = new Date().getTime()+day*2;
            var nowDay = new Date().Format("yyyy-MM-dd");
            var defDay = new Date(setDay).Format("yyyy-MM-dd");
            this.formValidate.date[0] = nowDay;
            this.formValidate.date[1] = defDay;
        },
        addItem(){
            this.modaAdd = true;
            this.ADDorEDIT = true;
        },
        editItem(){
            if(this.actionArr.length >1){
                this.error("只能选择一项，进行编辑！")
                return
            }else if(!this.actionArr.length){
                this.error("请选择一项，进行编辑！")
                return
            }
            this.modaAdd = true;
            this.ADDorEDIT = false;
        },
        formItemReset(){
            this.formValidate.name = "";
            this.resetData(); //this.formValidate.date = [];
            this.formValidate.desc = "";
        },
        submitAdd () {
            let IsStop = false;
            this.$refs.formValidate.validate((valid)=>{//验证
                this.modal_add_loading = false;
                this.$nextTick(() => {
                  this.modal_add_loading = true;
                });
                IsStop = !valid;
            })

            if(IsStop){
                return;
            }else{
                this.modal_add_loading = true;
                this.$nextTick(() => {
                  this.modal_add_loading = true;
                });
            }



            let tempData = {
                name: this.formValidate.name,
                num: parseInt(Math.random()*100),
                describe: this.formValidate.desc,
                startTime:new Date(this.formValidate.date[0]).Format("yyyy-MM-dd"),
                endTime:new Date(this.formValidate.date[1]).Format("yyyy-MM-dd"),
            }
            // let tempData = {
            //     name: this.formValidate.name,
            //     num: parseInt(Math.random()*100),
            //     describe: this.formValidate.desc,
            //     startTime:JSON.stringify(this.formValidate.date[0]).split("T")[0].substring(1),
            //     endTime:JSON.stringify(this.formValidate.date[1]).split("T")[0].substring(1),
            // }
            setTimeout(() => {
                if(this.ADDorEDIT){
                    this.itemData.push(tempData);
                }
                this.modaAdd = false;
                this.$Message.info('成功');
                this.formItemReset();
            },1000)
            
        },
        cancel () {
            this.$Message.info('取消');
        },
        del () {
            this.modal_loading = true;
            setTimeout(() => {
                for(let i=0;i<this.itemData.length;i++){
                    for(let j=0;j<this.actionArr.length;j++){
                        if(JSON.stringify(this.itemData[i]).indexOf(JSON.stringify(this.actionArr[j])) != -1){
                            console.log(i)
                            this.itemData.splice(i, 1);//删除
                        }
                    }
                }
                this.actionArr = [];
                //
                this.modal_loading = false;
                this.modaDelete = false;
                this.$Message.config({
                    top: 250,
                    duration: 3
                });
                this.$Message.success('删除完成');
            }, 1000);
        },
       
        error (MSG) {
            this.$Message.config({
                top: 250,
                duration: 3
            });
            this.$Message.error(MSG);
        },
        deleteTableItem(){
            if(this.actionArr.length){
                this.modaDelete = true;
            }else {
               this.error('请选择一行数据');
            }
        },
        onSelectionChangeFn(S){
            console.log("<===*onSelectionChangeFn*===Sel->",S,"<-Sel===*onSelectionChangeFn*===>")
            this.actionArr = S;
            
        },
        onSelectAllFn(S){
            console.log("<===*onSelectAllFn*===Sel->",S,"<-Sel===*onSelectAllFn*===>")
        },
        onSelectFn(S,R){
            console.log("<===*onSelectFn*===Sel->",S,"<-Sel======ROW->",R,"<-ROW===*onSelectFn*===>")
        },
    	handleSelectAll (status) {
            this.$refs.selection.selectAll(status);
        },
        linkFn (index) {
            this.$router.push('/baseinfo')
        },
        goDemandFn (index) {
            this.$router.push('/demand')
        },
        goDevelopmentFn (index) {
            this.$router.push('/development')
        },
        goOverViewFn (index){
            this.$router.push('/overView')
        },
        show (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
            })
        },
        remove (index) {
            this.data6.splice(index, 1);
        }
    }
}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';
.myTable {
    margin-bottom: 15px;
}
.crumbsBox{
    
}
.formValidate {
	margin:0 auto;
	width: 80%;
	margin-left: 0;

}


.aglieBox{
	
}
.tableBox{
	padding-top: 20px;
}
.tableBtnBox{
	padding-top:0;
	padding-bottom:10px;
}
.pageBox {
	padding-bottom:20px;
	padding-top:20px;
	overflow: hidden;
}
.pageBox ul{
	float: right;
}
.pageBox p{
	float:left;
	line-height: 32px;
	font-size:12px;
}
</style>


