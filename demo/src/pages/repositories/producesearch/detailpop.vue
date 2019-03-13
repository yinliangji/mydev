<template>
    <Modal ref="busPop" v-model="modaAdd" title="浏览" @on-ok="ok" @on-cancel="cancel" ok-text="关闭" :loading="modal_add_loading" width="800px">
        <div class="productAddBox" id="depdPopBox">
            <div class="tableBox">
                <p>ICDP中央仓库可能需要从远程仓库缓存一下资源，如超时，稍后再次下载即可！</p>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="baseInfoTable">
                  <tbody>
                    <tr>
                        <td style="text-align:right; padding-right:1em;" width="20%">文件名</td>
                        <th style="color:#495060;text-align:left;padding-left:1em;background: #fff;">xml代码</th>
                        <td style="text-align:center;" width="13%">操作</td>
                    </tr>
                    <tr v-for="(item,index) in detailTable" :key="index">
                        <td style="text-align:right;padding-right:1em;">
                            <a 
                                target="_blank" 
                                :href="item.url" 
                                download="item.fileName"
                                >{{item.fileName}}
                            </a>
                        </td>
                        <th style="color:white;text-align:left;padding-left:1em;background: #999;position:relative;">
                            <pre>{{item.xml}}</pre>
                            <input 
                                :id="'copy_'+index" 
                                :value="item.xml"
                                class="copyinput" 
                            /> 
                        </th>
                        <td style="text-align:center;">
                            <Button @click="copyToClipboard('copy_'+index)" :id="'copy_'+index+'_btn'">
                                复制xml
                            </Button>
                        </td>
                        <!-- <td v-html="item.xml?'<pre>'+item.xml+'</pre>':''"></td> -->
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
    </Modal>
</template>
<script>

import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {queryJarDetailByGav} = Common.restUrl;



export default {
    props: {
        isShow: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        isLoading: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        Data: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        
    },
    watch:{
        isShow(D) {
            this.modaAdd = D;
        },
        Data(D){
            this.getJarDetail(queryJarDetailByGav,D);
        },
    },
    beforecreated(){
        console.log("beforecreated----制品搜索弹出---")
    },
    created(){
        console.log("created----制品搜索弹出---")
    },
    beforeUpdate(){
        console.log("beforeUpdate---制品搜索弹出----")
    },
    updated(){
        console.log("updated----制品搜索弹出---")
    },
    mounted(){
        
    },
    data() {
        return {
            modaAdd: false,
            modal_add_loading: this.isLoading,
            detailTable:[],
        }
    },
    methods:{
        copyToClipboard(id) {
            let obj = document.getElementById(id);
            obj.select(); // 选择对象
            document.execCommand("Copy");
            let btn = document.getElementById(id+"_btn");
            btn.innerHTML = "已复制";
            setTimeout(()=>{
                btn.innerHTML = "复制xml";    
            },1500)
        },
        getJarDetail(URL,params = {}){
            defaultAXIOS(URL,params,{timeout:20000,method:'post'}).then((response) => {
                let myData = response.data;
                console.log("<======maven 制品搜索获取详情***response+++",response,myData.data,"======>");
                if(myData.status == "success"){
                    if(myData.data && Array.isArray(myData.data)){
                        this.detailTable = myData.data;
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
        showError(ERR){
            Common.ErrorShow(ERR,this);
        },
        ok(){
            this.modal_add_loading = false;
            this.$nextTick(() => {
              this.modal_add_loading = true;
            });
                
            this.modal_add_loading = true;
            this.$nextTick(() => {
              this.modal_add_loading = true;
            });
            this.$emit("buspopClose",false)
        },
        cancel(){
            this.$emit("buspopClose",false)
        },
    },
}


</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';
.pageBox {
    padding-bottom:0px;
    padding-top:10px;
    overflow: hidden;
}

</style>
<style>
.copyinput{
    border:none;
    opacity:0;
    pointer-events: none;
    position: absolute;
    left:0;
    top: 0;
}
.stepBox img {
    max-width: 100%;
    display: block;
}
#depdPopBox .ivu-form-item {
    margin-bottom: 10px;
}
</style>