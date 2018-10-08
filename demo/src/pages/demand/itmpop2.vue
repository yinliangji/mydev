<template>
   <Modal v-model="modaDelete3" width="360" @on-ok="importFn"  ok-text="导入" :loading="modal_loading3" @on-cancel="cancel">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>xxxxx确认</span>
        </p>
        <div style="text-align:center">
            <p>xxxxxxxxxx</p>
        </div>
        
    </Modal>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {reqAdd,reqGet,projectListDataNew} = Common.restUrl;

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
            this.$emit("popClose3",false);
        },
        importFn(){
            /*
            this.modal_loading3 = false;
            this.$nextTick(() => {
              this.modal_loading3 = true;
            });
            */
            /*
            this.modal_add_loading = true;
            this.$nextTick(() => {
              this.modal_add_loading = true;
            });
            */
             
        }
    },
    mounted(){

    },
}
</script>
<style lang="less" scoped>

</style>