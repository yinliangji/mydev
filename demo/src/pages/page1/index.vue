<template>
	<div class="pageContent">
		<a @click="myClick">page1</a>
		<Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px">
	        <FormItem
	                v-for="(item, index2) in formDynamic.items"
	                v-if="item.status"
	                :key="index2"
	                :label="'Item ' + item.index"


	                :prop="'items.' + index2 + '.value'"


	                :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
	            <Row>
	                <Col span="18">
	                    <Input type="text" v-model="item.value" placeholder="Enter something..."></Input>
	                </Col>
	                <Col span="4" offset="1">
	                    <Button type="ghost" @click="handleRemove(index2)">Delete</Button>
	                </Col>
	            </Row>
	        </FormItem>
	        <FormItem>
	            <Row>
	                <Col span="12">
	                    <Button type="dashed" long @click="handleAdd" icon="plus-round">Add item</Button>
	                </Col>
	            </Row>
	        </FormItem>
	        <FormItem>
	            <Button type="primary" @click="handleSubmit('formDynamic')">Submit</Button>
	            <Button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">Reset</Button>
	        </FormItem>
	    </Form>
	    <Transfer
        :data="data3"
        :target-keys="targetKeys3"
        :list-style="listStyle"
        :render-format="render3"
        :operations="['To left','To right']"
        filterable
        @on-change="handleChange3">
        <div :style="{float: 'right', margin: '5px'}">
            <Button type="ghost" size="small" @click="reloadMockData">Refresh</Button>
        </div>
    </Transfer>
	</div>
</template>
<script>
import Store from '@/vuex/store'
import API from '@/api'
import Promise from 'thenfail'
const {demoPostAXIOS} = API;

export default {
	name: 'page1',
	data(){
		return{
			//
            index: 1,
            formDynamic: {
                items: [
                    {
                        value: '',
                        index: 1,
                        status: 1
                    }
                ]
            }
			//
		}
	},
	methods:{
		myClick(){
			Store.dispatch('IS_LOADING/incrementAsync',{isShow:true,msg:"正在加载中……"})     
		},
		//
		handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        handleAdd () {
            this.index++;
            this.formDynamic.items.push({
                value: '',
                index: this.index,
                status: 1
            });
        },
        handleRemove (index) {
            this.formDynamic.items[index].status = 0;
        }
		//
	},
	mounted(){
		//
		demoPostAXIOS("",{x:1,y:2},{timeout:2000,method:'get'}).then((response) => {
			console.log("page1+++++++++++++++++++++",response)
		}).catch( (error) => {
			console.log(error)
		});
		//
	},

}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';
</style>


