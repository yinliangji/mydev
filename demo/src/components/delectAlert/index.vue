<template>
    <Modal v-model="modaDelete" width="300">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p>是否继续？</p>
        </div>
        <div slot="footer">
          <Button color="#1c2438"  :loading="modal_loading"  @click="del">删除</Button>
          <Button type="primary" @click="cancel">取消</Button>
        </div>
    </Modal>
</template>
<script>



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
        
    },
    watch:{
        isShow() {
            this.modaDelete = this.isShow;
            this.modal_loading = false;
        },
        isLoading(){
            this.modal_loading = this.isLoading;
        }
    },

    beforeUpdate(){
        console.log("删除弹出---beforeUpdate-------")
    },
    updated(){
        console.log("删除弹出---updated-------")
    },



    data () {
        return {
            modaDelete: false,
            modal_loading: false,
        }
    },
    mounted(){
        
    },
    methods: {
        cancel(){
            this.$emit("delpopClose",false);

        },
        del () {
            this.modal_loading = true;
            this.$emit("delpopEnter",false);
        },
    }

}
</script>
<style lang="less" scoped>

</style>