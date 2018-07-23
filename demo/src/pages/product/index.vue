<template>
	<div class="pageContent">
		<Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>首页</BreadcrumbItem>
            <BreadcrumbItem>敏捷项目管理</BreadcrumbItem>
            <BreadcrumbItem>产品代办列表</BreadcrumbItem>
        </Breadcrumb>
		<Card>
			<div class="productBox">
				<h3 class="Title">产品代办列表</h3>
				<Form ref="formValidate" class="formValidate">
			        <FormItem >
						<Row>
							<Col span="15">
								<Row class="SerchBox">
						        	<Col span="3" style="text-align: center">需求名称</Col>
						            <Col span="5">
						                <FormItem >
						                    <Input  placeholder="输入需求名称"></Input>
						                </FormItem>
						            </Col>
						            <Col span="3" style="text-align: center">需求编号</Col>
						            <Col span="5">
						                <FormItem >
						                    <Input  placeholder="输入需求编号"></Input>
						                </FormItem>
						            </Col>
						            <Col span="3" style="text-align: center">需求类型</Col>
						            <Col span="5">
						                <FormItem >
						                    <Input  placeholder="输入需求类型"></Input>
						                </FormItem>
						            </Col>
						        </Row>
						        <Row class="SerchBox">
						        	<Col span="3" style="text-align: center">需求状态</Col>
						            <Col span="5">
						                <FormItem >
						                    <Input  placeholder="输入需求状态"></Input>
						                </FormItem>
						            </Col>
						            <Col span="3" style="text-align: center">所属需求项</Col>
						            <Col span="5">
						                <FormItem >
						                    <Input  placeholder="输入所属需求项"></Input>
						                </FormItem>
						            </Col>
						            <Col span="3" style="text-align: center">优先级</Col>
						            <Col span="5">
						                <FormItem >
						                    <Input  placeholder="输入优先级"></Input>
						                </FormItem>
						            </Col>
						        </Row>
							</Col>
							<Col span="9" style="text-align: left" class="serchBtnBox">
								<Button type="primary" icon="ios-search" class="serchBtn">查询</Button>
							</Col>
						</Row>
			        </FormItem>
			    </Form>
			    <div class="tableBox">
					<div class="tagBox">
						<Row :gutter="10" align="middle">
							<Col span="3" class="addBtnBox">
								<Button type="success" @click="addItem">添加待办事项</Button>
							</Col>
							<Col span="1" >
								<img src="@/assets/images/product-list.png" @click="showList" class="cursor">
							</Col>
							<Col span="1" >
								<img src="@/assets/images/product-kanban.png" @click="showTask" class="cursor">
							</Col>
							<Col span="1" v-if="currentView == 'kanbanboard'">
								<span class="high">高</span>
							</Col>
							<Col span="1" v-if="currentView == 'kanbanboard'">
								<span class="middle">中</span>
							</Col>
							<Col span="1" v-if="currentView == 'kanbanboard'">
								<span class="low">低</span>
							</Col>
						</Row>
					</div>


					<div class="tableContBox" v-if="currentView == 'developList'">
						<Table border :columns="columns" :data="tableData"  />
						<div class="pageBox">
				    		<Page :total="100" show-elevator></Page>
				    		<p>显示第1到第5条记录，总共90条记录</p>
				    	</div>
					</div>
					<div class="listBox" v-else>
						<kanbanboard :cardList="cardList" :statusList="statusList" :groupList="groupList" />
						<!-- <component :is="currentView" :myCardList="cardList" :myProduct="MyProduct" :myStatusList="statusList" :myGroupList="groupList"></component>-->
					</div> 
					

			    </div>
			</div>
		</Card>


<Modal ref="addPop" v-model="modaAdd" :title="ADDorEDIT?'添加':'编辑'" @on-ok="submitAdd" @on-cancel="cancel" ok-text="提交" :loading="modal_add_loading" >
	<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140">
        <FormItem label="产品待办事项名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请填写产品待办事项名称"></Input>
        </FormItem>
      
        <FormItem label="事项类型" prop="style">
            <Select v-model="formValidate.style" placeholder="请选择事项类型">
                <Option value="产品需求">产品需求</Option>
                <Option value="事项类型1">事项类型1</Option>
                <Option value="事项类型2">事项类型2</Option>
            </Select>
        </FormItem>

        <FormItem label="负责人" prop="person">
            <Select v-model="formValidate.person" placeholder="请选择负责人">
                <Option value="谢呗5">谢呗5</Option>
                <Option value="谢呗6">谢呗6</Option>
                <Option value="谢呗7">谢呗7</Option>
            </Select>
        </FormItem>


        
       
       
        <FormItem label="状态" prop="status">
            <RadioGroup v-model="formValidate.status">
                <Radio label="未开始">未开始</Radio>
                <Radio label="处理中">处理中</Radio>
                <Radio label="已完成">已完成 </Radio>
                <Radio label="废弃">废弃</Radio>
            </RadioGroup>
        </FormItem>


        <FormItem label="所属迭代" prop="iteration">
            <Select v-model="formValidate.iteration" placeholder="请选所属迭代">
                <Option value="迭代1">迭代1</Option>
                <Option value="迭代2">迭代2</Option>
                <Option value="迭代3">迭代3</Option>
            </Select>
        </FormItem>



        <FormItem label="优先级" prop="grade">
            <RadioGroup v-model="formValidate.grade">
                <Radio label="1">1</Radio>
                <Radio label="2">2</Radio>
                <Radio label="3">3</Radio>
                <Radio label="4">4</Radio>
            </RadioGroup>
        </FormItem>

		
		<FormItem label="工时(预计)" prop="manhour">
            <Input v-model="formValidate.manhour" placeholder="请填写工时(预计)" number></Input>
        </FormItem>


		<FormItem label="关联任务(全部)" prop="mission">
            <Input v-model="formValidate.mission" placeholder="请填写关联任务(全部)" number></Input>
        </FormItem>


    </Form>
</Modal>


	</div>
</template>
<script>
import kanbanboard from "@/components/kanbanboard";
const validateNumber = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请填写内容，不能为空'));
    }
    // 模拟异步验证效果
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error('请填写数字'));
        } else {
        	callback();
            // if (value < 18) {
            //     callback(new Error('Must be over 18 years of age'));
            // } else {
            //     callback();
            // }
        }
    }, 1000);
};
export default {
	data() {
		return {
			
			modaAdd: false,
			ADDorEDIT:true,
			modal_add_loading: true,
			formValidate: {
                name: '',
                style:"",
                person:"",
                status:"",
                iteration:"",
                grade:"",
                manhour:"",
                mission:"",


                mail: '',
                city: '',
                gender: '',
                interest: [],
                date: '',
                time: '',
                desc: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                ],

                style: [
                    { required: true, message: 'Please select the city', trigger: 'change' }
                ],

                person: [
                    { required: true, message: 'Please select the city', trigger: 'change' }
                ],
                status: [
                    { required: true, message: 'Please select gender', trigger: 'change' }
                ],
                
                iteration: [
                    { required: true, message: 'Please select the city', trigger: 'change' }
                ],

                grade: [
                    { required: true, message: 'Please select gender', trigger: 'change' }
                ],
                manhour: [
                	{ required: true,validator: validateNumber, trigger: 'blur' }
                
                    // { required: true, message: 'The name cannot be empty', trigger: 'blur' },
                    // { type: 'number', message: 'Incorrect email format', trigger: 'blur' }
                ],
                mission: [
                	{required: true, validator: validateNumber, trigger: 'blur' }
                ],


                
                


                // mail: [
                //     { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                //     { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                // ],
               
                // gender: [
                //     { required: true, message: 'Please select gender', trigger: 'change' }
                // ],
                // interest: [
                //     { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                //     { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                // ],
                // date: [
                //     { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                // ],
                // time: [
                //     { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                // ],
                // desc: [
                //     { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                //     { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                // ]
            },
			currentView: "developList",//developList//kanbanboard
			groupList:[
		        // { text: "产品待办事项" },
		        // {
		        //   text: "用户登录1",
		        //   groupId: "group_01"
		        // },
		        // {
		        //   text: "创建代码仓库",
		        //   groupId: "group_02"
		        // },
		        // {
		        //   text: "未知项",
		        //   groupId: "group_03"
		        // },
			],
			statusList:[
				{
				  stateStr: "未开始",
				  state: "01",
				  taskNumber: "3"
				},
				{
				  stateStr: "处理中",
				  state: "02",
				  taskNumber: "4"
				},
				{
				  stateStr: "已完成",
				  state: "03",
				  taskNumber: "5"
				},
				{
				  stateStr: "废弃",
				  state: "04",
				  taskNumber: "6"
				},
				// {
				//   stateStr: "上线",
				//   state: "05",
				//   taskNumber: "3"
				// }
			],
			cardList:[
	            {
	              taskId: "#US0001",
	              description:"未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	              userName: "user1",
	              userId: "userId_01",
	              groupId: "group_01",
	              bgColor: { background: "#b3ecec" },
	              taskStateStr: "未开始",
	              taskState: "01",
	              headPortrait: require("@/assets/images/user_02.png")
	            },
	            {
	              taskId: "#US0002",
	              description:"设计开发-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	              userName: "user1",
	              userId: "userId_02",
	              groupId: "group_02",
	              bgColor: { background: "#f8d6af" },
	              taskStateStr: "设计开发",
	              taskState: "02",
	              headPortrait: require("@/assets/images/user_02.png")
	            },
	            {
	              taskId: "#US0003",
	              description:"设计开发-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	              userName: "user1",
	              userId: "userId_03",
	              groupId: "group_01",
	              bgColor: { background: "#f8d6af" },
	              taskStateStr: "测试",
	              taskState: "02",
	              headPortrait: require("@/assets/images/user_02.png")
	            },
	            // {
	            //   taskId: "#US0004",
	            //   description:"未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	            //   userName: "user1",
	            //   userId: "userId_04",
	            //   groupId: "group_03",
	            //   bgColor: { background: "#f8d6af" },
	            //   taskStateStr: "测试",
	            //   taskState: "01",
	            //   headPortrait: require("@/assets/images/user_02.png")
	            // },
	            // {
	            //   taskId: "#US0005",
	            //   description:"未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	            //   userName: "user1",
	            //   userId: "userId_05",
	            //   groupId: "group_01",
	            //   bgColor: { background: "#f8d6af" },
	            //   taskStateStr: "测试",
	            //   taskState: "04",
	            //   headPortrait: require("@/assets/images/user_02.png")
	            // },
	            // {
	            //   taskId: "#US0006",
	            //   description:"未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	            //   userName: "user1",
	            //   userId: "userId_06",
	            //   groupId: "group_01",
	            //   bgColor: { background: "#f8d6af" },
	            //   taskStateStr: "测试",
	            //   taskState: "01",
	            //   headPortrait: require("@/assets/images/user_02.png")
	            // },
	            // {
	            //   taskId: "#US0007",
	            //   description:"未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	            //   userName: "user1",
	            //   userId: "userId_07",
	            //   groupId: "group_01",
	            //   bgColor: { background: "#f8d6af" },
	            //   taskStateStr: "测试",
	            //   taskState: "01",
	            //   headPortrait: require("@/assets/images/user_02.png")
	            // },
	            // {
	            //   taskId: "#US0008",
	            //   description:"未开始-提供用户登录功能1,IMG提供用户登录功能1,提供用户登录功能1,提供用户登录功能1,提供用户登录功能1",
	            //   userName: "user1",
	            //   userId: "userId_08",
	            //   groupId: "group_01",
	            //   bgColor: { background: "#f8d6af" },
	            //   taskStateStr: "测试",
	            //   taskState: "03",
	            //   headPortrait: require("@/assets/images/user_02.png")
	            // }
	        ],
	        //
	        columns: [
	        	{
                    title: '事项编号',
                    key: 'num',
                    width: 85,
                    align: 'center'
                },
            	
                {
                    title: '产品待办事项名称',
                    key: 'name',
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
                },
               
                {
                    title: '事项类型',
                    key: 'describe',
                    width: 85,
                    align: 'center',
                },
                {
                    title: '负责人',
                    key: 'person',
                    width: 80,
                    align: 'center',
                    // render: (h, params) => {
                    //     return h(
                    //         'a',
                    //         {
                    //             style:{color:'#2d8cf0'},
                    //             //domProps:{href:"###"},
                    //             on: {
                    //                 click: () => {
                    //                     this.linkFn(params.index)
                    //                 }
                    //             }
                    //         },
                    //         params.row.person
                    //     );
                    // }
                },
                {
                    title: '状态',
                    key: 'status',
                    width: 85,
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'span',
                            {
                                style:{
                                	color:"white",
                                	background:(function(S){if(S == "未开始"){return "#5cadff"}else if(S == "处理中"){return "#ff9900"}else if(S == "已完成"){return "#19be6b"}else{return "#1c2438"} })(params.row.status),
                                	padding:'0.5em',
                                	display:"inline-block",
                                	borderRadius:"3px",

                                },

                                //domProps:{href:"###"},
                            },
                            params.row.status
                        )
                    }
                },
                {
                    title: '所属迭代',
                    key: 'Iteration',
                    width: 90,
                    align: 'center',
                },
                {
                    title: '优先级',
                    key: 'priority',
                    width: 80,
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'span',
                            {
                                style:{
                                	color:"white",
                                	background:(function(S){if(S == "1"){return "#ed3f14"}else if(S == "2"){return "#19be6b"}else{return "#2d8cf0"} })(params.row.priority),
                                	display:"inline-block",
                                	borderRadius:"50%",
                                	height:"1.5em",
                                	width:"1.5em",
                                	lineHeight:"1.5em",
                                },

                                //domProps:{href:"###"},
                            },
                            params.row.priority
                        )
                    }

                },
                {
                    title: '工时|实际|预计',
                    key: 'manHours',
                    type: 'html',
                    align: 'center',
                    width: 90,
                    renderHeader: (h, params) => {
				        return h('div', {}, [
				            h('span', {}, '工时'),
				            h('br'),
				            h('span', {}, '实际|预计')
				        ]);
				    }
                },
                {
                    title: '关联任务|已完成|全部',
                    key: 'correlation',
                    width: 105,
                    align: 'center',
                    renderHeader: (h, params) => {
				        return h('div', {}, [
				            h('span', {}, '关联任务'),
				            h('br'),
				            h('span', {}, '已完成|全部')
				        ]);
				    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 220,
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
                                        //this.show(params.index)
                                        this.editItem(params.index)
                                    }
                                }
                            }, '编辑'),
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
                                        this.show(params.index)
                                    }
                                }
                            }, '添加任务'),
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        //this.show(params.index)
                                        this.goDevelopmentFn();
                                    }
                                }
                            }, '任务看板')
                        ]);
                    }
                }
            ],
	        tableData: [
                {
					name: '项目名称1',
					num: 18,
					describe: '产品需求',
					person:"谢呗",
					status:"已完成",
					Iteration:"迭代1",
					priority:"1",
					manHours:"20 | 10",
					correlation:"5 | 10",
					icon: require("@/assets/images/user_02.png")
                },
                {
					name: '项目名称2',
					num: 24,
					describe: '产品需求',
					person:"谢呗2",
					status:"处理中",
					Iteration:"迭代2",
					priority:"2",
					manHours:"20 | 10",
					correlation:"5 | 10",
					icon: require("@/assets/images/user_02.png")
                },
                {
					name: '项目名称3',
					num: 24,
					describe: '产品需求',
					person:"谢呗3",
					status:"未开始",
					Iteration:"迭代3",
					priority:"3",
					manHours:"20 | 10",
					correlation:"5 | 10",
					icon: require("@/assets/images/user_02.png")
                },
               
            ],
            tableDataIndex:NaN,
	        //
		}
	},
	components: {
		kanbanboard,
	},
	computed: {

	},
	mounted(){
		for(let i=0;i<this.tableData.length;i++){
			let statusNum = false;
			let statusData = this.tableData[i].status;
			if(statusData == "未开始"){
				statusNum = "01";
			}else if(statusData == "处理中"){
				statusNum = "02";
			}else if(statusData == "已完成"){
				statusNum = "03";
			}else{
				statusNum = "04";
			}
			this.cardList[i].description = this.tableData[i].name
			this.cardList[i].userName = this.tableData[i].person;
			this.cardList[i].taskState = statusNum;
			this.cardList[i].headPortrait = this.tableData[i].icon;
			
			
		}
	},
	methods:{
		addItem(){
            this.modaAdd = true;
            this.ADDorEDIT = true;
        },
        editItem(I){
        	this.tableDataIndex = I;
        	this.modaAdd = true;
            this.ADDorEDIT = false;



			console.log(this.tableData[I])


			// name: '项目名称3',
			// num: 24,
			// describe: '产品需求',
			// person:"谢呗3",
			// status:"未开始",
			// Iteration:"迭代3",
			// priority:"3",
			// manHours:"20 | 10",
			// correlation:"5 | 10",
			// icon: require("@/assets/images/user_02.png")

			// name: this.formValidate.name,
			// age: parseInt(Math.random()*100),
			// describe: '产品需求',
			// person:this.formValidate.person,
			// status:this.formValidate.status,
			// Iteration:this.formValidate.iteration,
			// priority:this.formValidate.grade,
			// manHours:"0 | "+this.formValidate.manhour,
			// correlation:"0 | 0",
			// icon: require("@/assets/images/user_02.png"),





        },
        formItemReset(){
			this.formValidate.name= ''
			this.formValidate.style=""
			this.formValidate.person=""
			this.formValidate.status=""
			this.formValidate.iteration=""
			this.formValidate.grade=""
			this.formValidate.manhour=""
        },
        submitAddData(){
        	let tempData = {
                name: this.formValidate.name,
				num: parseInt(Math.random()*100),
				describe: '产品需求',
				person:this.formValidate.person,
				status:this.formValidate.status,
				Iteration:this.formValidate.iteration,
				priority:this.formValidate.grade,
				manHours:"0 | "+this.formValidate.manhour,
				correlation:"0 | 0",
				icon: require("@/assets/images/user_02.png"),
            }
            setTimeout(() => {
                this.tableData.push(tempData);
                this.modaAdd = false;
                this.$Message.info('成功');
                this.formItemReset();
                this.$refs.formValidate.resetFields();
            },1000)
        },
		submitAdd(){
			let IsStop = false;
            this.$refs.formValidate.validate((valid)=>{//验证
                this.modal_add_loading = false;
                this.$nextTick(() => {
                  this.modal_add_loading = true;
                });
                console.log(valid)
				if(valid){
				    this.modal_add_loading = true;
				    this.$nextTick(() => {
				      this.modal_add_loading = true;
				    });
				    this.submitAddData();
				}
            })
		},
		cancel(){
			this.formItemReset();
            this.$refs.formValidate.resetFields();
		},
		goDevelopmentFn (index) {
            this.$router.push('/development')
        },
		linkFn (index) {
            //alert(index)
            this.$router.push('/baseinfo')
        },
        show (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
            })
        },
		showList() {
			this.currentView = "developList";
		},
		showTask(){
			this.currentView = "kanbanboard";
		},
	}
}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';
.SerchBox{
	padding-bottom:10px;
}
.serchBtn{
	transform: translate(50%, 60%);
}
.tableBox{
	padding-top: 20px;

}
.tagBox{
	background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    margin-bottom: 20px;
    padding-left:5px;
}
.addBtnBox {
	transform: translate(0, -15%);
}
.listBox {
	overflow: hidden;
	position:relative;
}
span.high {
  background: #f8d6af;
  width: 100%;
  height: 25px;
  display: inline-block;
  line-height: 25px;
  text-align: center;
}
span.middle {
  background: #b3ecec;
  width: 100%;
  height: 25px;
  display: inline-block;
  line-height: 25px;
  text-align: center;
}
span.low {
  background: #f2e1f0;
  width: 100%;
  height: 25px;
  display: inline-block;
  line-height: 25px;
  text-align: center;
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
.cursor {
	cursor: pointer;
}
</style>