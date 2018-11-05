<template>
	<quill-editor
		v-model="value"
		:options="editorOption" 
		@blur="onEditorBlur($event)" 
		@focus="onEditorFocus($event)"
		@change="onEditorChange($event)"
		@text-change="textChangeHandler"
		@selection-change="selectionChangeHandler"
		@editor-change="editorChangeHandler"
		>
	</quill-editor>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {quillEditorAdd,quillEditorGet } = Common.restUrl;
export default {
	name: 'quill',
	data(){
		return{
			value:'',
            editorOption:{},
		}
	},
	
	methods:{
		textChangeHandler(delta,oldDelta,source){

		},
		selectionChangeHandler(range,oldRange,source){

		},
		editorChangeHandler(eventName,...args){
			console.log('eventName',eventName)
		},
		submit(){
			let url = quillEditorAdd;
			let param = {
				html:this.value
			}
			this.$axios({
				method:"post",
				url:url,
				data:param,
			})
			.then(ret => {
				this.value = "";
				console.log(ret)
			})

		},
		getEdit(){
			let url = quillEditorGet;
			this.$axios.get(url)
			.then(ret => {
				this.value = ret.data.html;
				console.log("this.value",this.value)
			})

		},
		onEditorBlur(editor){//失去焦点事件    
 	    },
        onEditorFocus(editor){//获得焦点事件
        },
        onEditorChange({editor,html,text}){//编辑器文本发生变化
            //this.content可以实时获取到当前编辑器内的文本内容
            console.log(this.value);
        },
		
	},
	mounted(){
		this.getEdit()
	},
	watch:{
		value(val){
			console.log("value",val)
		}
	},

}
</script>
<style lang="less" >

.ql-container {
	min-height: 200px;
    
}

</style>


