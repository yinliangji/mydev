<template>
    <Modal v-model="isShow" width="360" :closable="isCancel()" :mask-closable="false" @on-cancel="cancel" id="goAgilePop">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span @click="cancelTime">提示！</span>
        </p>
        <div style="text-align:center">
            <p>{{Text}}</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long  @click="go">还有 {{time}}秒 跳到列表页,或点击</Button>
        </div>
    </Modal>
</template>
<script>
export default {
	data() {
		return {
            time:30,
            T:"",
            isShow:false,
		}
	},
	props: {
        Data: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        Text: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return "没有找到相关项目，跳转到项目列表页";
            }
        },
    },
    watch:{
        Data(data){
            this.isShow = data;
            this.Timer(data)
        },
    },
    methods:{
        isCancel(){
            return true;
            var GetCookie = function (name) {
                var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                if(arr = document.cookie.match(reg)){
                    return unescape(arr[2]); 
                }else{ 
                    return null; 
                }
            }
            var isLog = window.location.href.indexOf("consoleLog=true") != -1 || GetCookie("consoleLog") ? true: false ;
            var isLogError = window.location.href.indexOf("consoleError=true") != -1 || GetCookie("consoleError") ? true :false ;
            return isLog || isLogError || false;
        },
        Timer(val){
            if(val){
                this.T = setInterval(()=>{
                    if(this.time <= 1){
                        clearInterval(this.T);
                        this.go()
                    }
                    this.time--;
                    console.log(this.time) 
                },1000)
            }
        },
        cancelTime(){
            clearInterval(this.T);
        },
        go(){
            this.$router.push({path: '/agile'})
        },
        cancel(){
            console.log("cancel");
            clearInterval(this.T);
        },

    },
    mounted(){
        this.Timer(this.Data)
	},
}
	

</script>
<style lang="less" scoped>

</style>
<style>
#goAgilePop .ivu-modal-close{
    opacity: 0;
}    
</style>