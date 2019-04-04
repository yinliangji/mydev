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

/*
import Quill from 'quill';
import quillEditor from 'vue-quill-editor'
import ImagePaste from 'quill-yang-image-paste';
Quill.register('modules/imagePaste', ImagePaste);
//VueQuillEditor.register('modules/imagePaste', ImagePaste);
//一定要引入这三个css，不然文本编辑器会出现不规则黑白几何图形
//这三个css可以在main.js中引入，也可以在具体使用的.vue文件中引入
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
*/

import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {quillEditorAdd,quillEditorGet } = Common.restUrl;
export default {
	name: 'quill',
	data(){
		return{
			value:'',
            editorOption:{
            	modules: {
                    imagePaste: true
                },
            },
		}
	},
	props: {
        data: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        
    },
    watch:{
    	data(){
    		this.value = this.data;
    	},
		value(val){
			console.log("value",val)
		}
	},
	methods:{
		textChangeHandler(delta,oldDelta,source){
			console.log('textChangeHandler',delta,oldDelta,source)
		},
		selectionChangeHandler(range,oldRange,source){
			console.log('selectionChangeHandler',range,oldRange,source)
		},
		editorChangeHandler(eventName,...args){
			console.log('editorChangeHandler',eventName,...args)
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
			console.log("onEditorBlur",editor);
 	    },
        onEditorFocus(editor){//获得焦点事件
        	console.log("onEditorFocus",editor);
        },
        onEditorChange(EditorChangeObj = {editor,html,text}){//编辑器文本发生变化
            //this.content可以实时获取到当前编辑器内的文本内容
            console.log("onEditorChange",this.value,EditorChangeObj);
            this.$emit("quillOutput",EditorChangeObj.html,EditorChangeObj.text)
        },
		
	},
	mounted(){
		//this.getEdit()
	},
	components: {
        //quillEditor
    },
	

}
</script>
<style lang="less" >

.ql-container {
	min-height: 200px;
    
}

</style>


