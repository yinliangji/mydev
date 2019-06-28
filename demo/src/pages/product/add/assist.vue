<template>
    <Modal 
        :mask-closable="false"
        v-model="assistonoff" 
        title="添加责任协助人"
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
                <FormItem label="责任协助人" prop="list">
                    <Select v-model="dependFormValidate.list" multiple clearable filterable >
                        <Option v-for="item in MyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
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
        AssistOnOff: {
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
        Data: {
            type: [Array,String,Boolean],
            default: function() {
                return [];
            }
        },
        List: {
            type: [Array,String,Boolean],
            default: function() {
                return [];
            }
        },

        
        
    },
    data () {
        return {
            assistonoff:false,
            dependLoading:true,
            dependFormValidate:{
                list:[],
            },
            dependruleValidate:{
                list:[{ required: true, type: 'array',message: '不能为空', trigger: 'change' }],
                
            },
            MyList:[],
        }
    },
    methods: {
        checkoutList(D,L){
            let arr = [];
            let arr2 = [];
            let arr3 = [];
            let arr4 = [];
            let arr5 = [];
            this.MyList = [];

            if(L && Array.isArray(L) && L.length){
                if(D && Array.isArray(D) && D.length){
                    D.forEach((item)=>{
                        arr.push(item.value);    
                    })
                    L.forEach((item)=>{
                        arr2.push(item.value);    
                    })
                    arr3 = new Set(arr);
                    arr4 = new Set(arr2);
                    arr5 = Array.from(new Set([...arr4].filter(x => !arr3.has(x))));
                    arr5.forEach((item)=>{
                        for(let i=0;i<L.length;i++){
                            if(item == L[i].value){
                                this.MyList.push(L[i]);        
                            }
                        }
                        
                    })

                }else{
                    this.MyList = L;
                }
                
            }else{
                this.MyList = [];
            }


        },
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
                    this.$emit("sendAssist",this.dependFormValidate.list);
                    this.cancelDepend();
                }
            })
            
        },
        cancelDepend(){
            this.dependFormValidate.list = [];
            this.dependLoading = true;
            this.$emit("sendCloseAssist",false);
        },
    },
    watch: {
        AssistOnOff(data){
            this.assistonoff = data;
        },
        Data(data){
            
            this.checkoutList(data,this.List);
        },
        List(data){
            this.checkoutList(this.Data,data);
            
        }
    },
    created() {
       
    },
    beforeUpdate(){
        //console.log("用户故事依赖--beforeUpdate-------",this.myFormData)
    },
    updated(){
        //console.log("用户故事依赖--updated-------",this.myFormData)
    },
    mounted(){
        this.assistonoff = this.AssistOnOff;
    },
}


</script>

<style lang="less" scoped>


</style>

