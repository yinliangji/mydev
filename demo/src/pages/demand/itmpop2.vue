<template>
   <Modal v-model="modaDelete3" width="360" @on-ok="importFn"  ok-text="导入" :loading="modal_loading3" @on-cancel="cancel">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>从ITM同步同步需求项确认</span>
        </p>
        <div style="text-align:left;text-indent: 2em;">
            <p>
                此操作会清除现已导入的立项需求项，并重新从ITM导入 <span style="color:red;">xxxx</span> 个项目 <span style="color:red;">xxxx</span> 的需求项，
            </p>
            <p>
                此操作不会删除已关联的用户故事，但会取消与用户故事的关联，
            </p>
            <p>
                导入完成后，您需要重新关联需求项与用户故事。
            </p>
        </div>
        
    </Modal>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {importITM2} = Common.restUrl;

export default {
    props: {
        isShow: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        
    },
    watch:{
        isShow() {
            this.modaDelete3 = this.isShow;
        },
    },
    beforecreated(){
        //console.log("demand--beforecreated--",)
    },
    created(){
        //console.log("demand--created--",);
        
    },
    beforeUpdate(){
        //console.log("demand--beforeUpdate--",)
    },
    updated(){
        //console.log("demand--updated--",)
    },
    data () {
        return {
            modaDelete3:false,
            modal_loading3:true,
        }
    },
    methods: {
        cancel(){
            this.$emit("popClose3",false,"cancel");
        },
        importFn(){
            // setTimeout(()=>{
            //     this.importITM2Fn(importITM2)
            // },2000)
           this.importITM2Fn(importITM2)
        },
        importBtnStatus(){
            this.modal_loading3 = false;
            this.$nextTick(() => {
              this.modal_loading3 = true;
            });

            this.modal_add_loading = true;
            this.$nextTick(() => {
              this.modal_add_loading = true;
            });
        },
        importITM2Fn(URL,params = {}){
            defaultAXIOS(URL,params,{timeout:2000,method:'post'}).then((response) => {
                let myData = response.data;
                console.log("<======importITM2***response+++",response,myData,"======>");

                this.importBtnStatus();
                if(myData.status == "success"){
                    this.$emit("popClose3",false);
                    
                }else{
                    this.showError(URL+"错误");
                }

            }).catch( (error) => {
                this.showError(error);
                this.importBtnStatus();
            });
        },
    },
    mounted(){

    },
}
</script>
<style lang="less" scoped>

</style>