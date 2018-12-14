<template>
    <div class="tableContBox">
        
        <Upload
            multiple
            :action="actionUrl"
            name="file"
            :on-success="handleSuccess"
            :on-error="handleError"
            :show-upload-list="false"
            class="UploadBtn"
            >
            <Button type="ghost" icon="ios-cloud-upload-outline">文件上传</Button>
        </Upload>
        <Table border :columns="columns" :data="tableData"  />
        <div class="pageBox" v-if="false">
            <Page 
                :current="tableDAtaPageCurrent" 
                :total="tableDAtaTatol/tableDAtaPageLine > 1 ? (tableDAtaTatol%tableDAtaPageLine ? parseInt(tableDAtaTatol/tableDAtaPageLine)+1 : tableDAtaTatol/tableDAtaPageLine)*10 : 1" 
                show-elevator 
                @on-change="changeCurrentPage" 
                @on-page-size-change="changePageSize">
            </Page>
            <p>总共{{tableDAtaTatol}}条记录</p>
        </div>
    </div>
</template>
<script>

import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const { fileDownList,fileUpload} = Common.restUrl;

export default {
    props: {
        PRJID: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        
    },
    watch:{
        PRJID(){
            this.formValidate.prj_id = this.PRJID;
            if(this.PRJID){
                this.init(this.PRJID);
            }
        },
    },
    beforecreated(){
        console.log("beforecreated----用户故事附件---")
    },
    created(){
        console.log("created----用户故事附件---")
    },
    beforeUpdate(){
        console.log("beforeUpdate---用户故事附件----")
    },
    updated(){
        console.log("updated----用户故事附件---")
    },
    mounted(){
        
    },
    data() {
        return {
            tableDAtaTatol:0,
            tableDAtaPageLine:5,
            tableDAtaPageCurrent:1,
            actionArr:[],
            columns: [
                {
                    title: '文件名',
                    key: 'fileName',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'a',
                            {
                                style:{color:'#2d8cf0'},
                                attrs:{
                                    id:"id"+params.row.fileId,
                                },
                                key:"key"+params.row.fileId,
                                ref:"ref"+params.row.fileId,
                                //domProps:{href:downFile+params.row.url},
                                on: {
                                    click: () => {
                                        this.listFileDown(params)
                                    }
                                }
                            },
                            params.row.fileName
                        );
                    },
                },
                {
                    title: '文件大小',
                    key: 'filesize',
                    align: 'center',
                    
                },
                {
                    title: '创建者',
                    key: 'creater',
                    align: 'center',
                },
                {
                    title: '创建时间',
                    key: 'created_time',
                    align: 'center',
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {},
                                on: {
                                    click: () => {
                                        this.tableDel(params.index,params.row.file_path)
                                    }
                                }
                            }, '删除'),
                            
                            
                            
                        ]);
                    }
                },
            ],
            tableData: [],
            actionUrl:"//jsonplaceholder.typicode.com/posts/",
            formValidate:{
                prj_id:"",
            },
            
        }
    },
    methods:{
        init(PrjID){
            //Common.GETprjid(this,Common)
            let Prj_ID = PrjID? PrjID : this.formValidate.prj_id;
            this.actionUrl = fileUpload+"?taskId="+Prj_ID+"&type=2&id="+Common.GETID(this,Common)+"&username="+Common.getStorageAndCookie(this,Common,"username")+"&nickname="+Common.getStorageAndCookie(this,Common,"nickname");

            this.fileDownFn(fileDownList,1,this.tableDAtaPageLine,Common.GETID(this,Common),PrjID)
            this.tableDAtaPageCurrent = 1;
        },
        handleError(res,file,list){
            console.log("添加失败");
            this.showError("添加失败");
            return Promise.reject("添加失败");
        },
        handleSuccess(res,file,list){

            this.listUpFile(fileUpload,Common.GETID(this,Common),this.formValidate.prj_id).then(()=>{
                this.$Notice.config({
                      top:100,
                      duration: 2
                  });

                this.$Notice.success({title:"添加成功"})
                this.fileDownFn(fileDownList,1,this.tableDAtaPageLine,Common.GETID(this,Common),this.formValidate.prj_id)
                this.tableDAtaPageCurrent = 1;


            },(error)=>{
                console.log(error);
                this.showError(error);
            })
            
            
        },
        listUpFile(URL,id="",prj_id = ""){
            return Promise.resolve("添加成功");

            return defaultAXIOS(URL,{id,taskId:prj_id},{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======detail***yong+++",response,myData,"======>");

                let STAUUS = myData.status ? myData.status : myData.message

                if(STAUUS.indexOf("success") != -1){
                    return Promise.resolve(true)
                }else{
                    return Promise.reject(false);
                }
            }).catch( (error) => {
                console.log(error);
                return Promise.reject(false);
                
            });
        },
        changePageSize(i) {

        },
        changeCurrentPage(i) {
            this.fileDownFn(fileDownList,i,this.tableDAtaPageLine,Common.GETID(this,Common),this.formValidate.prj_id)
            this.tableDAtaPageCurrent = i;
        },
        fileDownFn(URL = "",page = 1,pageline = 3,id = "",prj_id = ""){
            defaultAXIOS(URL,{page,pageline,id,taskId:prj_id},{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======detail***用户故事附件列表+++",response,myData,"======>");
                
                if(myData && myData.files && Array.isArray(myData.files)){
                    this.tableData = myData.files
                    this.tableDAtaTatol = myData.total;
                }else{
                    this.showError(URL+"_错误或者没有数据");
                }

              
            }).catch( (error) => {
                console.log(error);
                this.showError(error);
                
            });
        },
        showError(ERR){
            Common.CommonError(this,ERR);
        },
    },
}
</script>
<style lang="less" scoped>
@import './style.less';
@import './style.css';

.pageBox {
    padding-bottom:20px;
    padding-top:20px;
    overflow: hidden;
}
.UploadBtn{
    margin-bottom:10px;
}
</style>
<style>

</style>