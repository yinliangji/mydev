<template>
    <Modal 
        :mask-closable="false"
        v-model="dependonoff" 
        title="添加依赖项"
        ok-text="添加" 
        @on-ok="submitDepend"  
        @on-cancel="cancelDepend"
        :loading="dependLoading"
        >
        <Form 
            ref="dependFormValidate" 
            :model="dependFormValidate" 
            :rules="dependruleValidate" 
            :label-width="120" >
            <div>
                <FormItem label="所属项目">
                    {{prjName}}
                </FormItem>
                <FormItem label="依赖名称" prop="depd_name">
                    <Input v-model="dependFormValidate.depd_name"  placeholder="请填写依赖名称"></Input>
                </FormItem>
                <FormItem label="依赖描述" prop="depd_desc">
                    <Input v-model="dependFormValidate.depd_desc" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请填写依赖描述"></Input>
                </FormItem>
            </div>
        </Form>
    </Modal>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {} = Common.restUrl;
export default {
    props: {
        DependOnOff: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        prjName: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return "";
            }
        },
        
    },
    data () {
        return {
            dependonoff:false,
            dependLoading:true,
            dependFormValidate:{
                depd_name:"",
                depd_desc:"",
            },
            dependruleValidate:{
                depd_name:[{ required: true, message: '依赖项名称不能为空', trigger: 'blur' }],
                depd_desc:[{ required: true, message: '依赖项描述不能为空', trigger: 'blur' }],
            },
        }
    },
    methods: {
        submitDepend(){
            let obj = false;
            this.$refs['dependFormValidate'].validate((valid) => {
                this.dependLoading = false;
                this.$nextTick(() => {
                  this.dependLoading = true;
                });
                if (valid) {
                    this.dependLoading = true;
                    this.$nextTick(() => {
                        this.dependLoading = true;
                    });
                    obj = {
                        depd_name:this.dependFormValidate.depd_name,
                        depd_desc:this.dependFormValidate.depd_desc,
                        depd_status:"1",
                    }
                    this.$emit("sendDepend",obj);
                    this.cancelDepend();
                }
            })
            
        },
        cancelDepend(){
            this.dependFormValidate.depd_name = "";
            this.dependFormValidate.depd_desc = "";
            this.dependLoading = true;
            this.$emit("sendCloseDepend",false);
        },
    },
    watch: {
        DependOnOff(data){
            this.dependonoff = data;
        },
    },
    created() {
       
    },
    beforeUpdate(){
        console.log("用户故事依赖--beforeUpdate-------",this.myFormData)
    },
    updated(){
        console.log("用户故事依赖--updated-------",this.myFormData)
    },
    mounted(){
        this.dependonoff = this.DependOnOff;
    },
}


</script>

<style lang="less" scoped>


</style>

