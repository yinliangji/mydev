<template>
	<div>
		page2
	    <abc :level="1">
		  <I> Hello world!</I>
		</abc>
	</div>
</template>
<script>
import abc from "./abc";
import API from '@/api'
const {demo2AXIOS} = API;
import Promise from 'thenfail'
export default {
	components:{
		abc,
	},
	mounted(){
		// demo2AXIOS("",{x:5,y:6},{timeout:3000,method:'get'}).then((response) => {
		// 	console.log("page1+++++++++++++++++++++",response)
		// }).catch( (error) => {
		// 	console.log(error)
		// });


		this.runAsync1()
		.then(
			(data)=>{
				console.log("data1",data);
				return this.runAsync2()
			}
			,
			(err)=>{
				console.log("err1",err);
				Promise.break
			}
		)
		.then(
			(data)=>{
				console.log("data2",data);
				return this.runAsync3()
			}
			,
			(err)=>{
				console.log("err2",err);
				Promise.break
			}
		)
		.then(
			(data)=>{
				console.log("data3",data);
			}
			,
			(err)=>{
				console.log("err3",err);
			}
		)

		



	},
	methods:{
		runAsync1(){
		    return new Promise((resolve, reject)=>{
		        //return reject('错误数据1');
		        //做一些异步操作
		        setTimeout(function(){
		        	console.log('===================');
		            console.log('异步任务1执行完成');
		            resolve('随便什么数据1');
		            //reject('错误数据1');
		        }, 2000);
		    });
		  },
		  runAsync2(){
		    return new Promise((resolve, reject)=>{
		        //做一些异步操作
		        setTimeout(function(){
		        	console.log('===================');
		            console.log('异步任务2执行完成');
		            //resolve('随便什么数据2');
		            reject('错误数据2');
		        }, 2000);
		    });
		  },
		  runAsync3(){
		    return new Promise((resolve, reject)=>{
		        //做一些异步操作
		        setTimeout(function(){
		        	console.log('===================');
		            console.log('异步任务3执行完成');
		            resolve('随便什么数据3');
		            //reject('错误数据3');
		        }, 2000);
		    });
		  },


		},
}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';

</style>