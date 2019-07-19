<template>
    <div>
        <Upload
            multiple
            :action="actionUrl"
            name="file"
            :on-success="handleSuccess"
            :on-error="handleError"
            :show-upload-list="false"
            :class="CLASS"
            :data="params"
            :on-before-upload="handleBeforeUpload"
            :on-progress="handleBeforeUpload"
            >
            <!-- :shape="SHAPE" -->
            <Button  :icon="ICON" :type="TYPE" :size="SIZE" :disabled="IsDisabled">
                <slot>导入</slot>
            </Button>
        </Upload>
        <Modal 
            id="uploadPop"
            ref="uploadPop" 
            v-model="modaUpload" 
            title="导入结果" 
            @on-ok="ok" 
            @on-cancel="cancel" 
            ok-text="关闭"  
            width="500px"
            >
                <p>导入总计：{{modaUploadData ? modaUploadData.data.total : ""}}条数据</p>
                <p>导入成功：{{modaUploadData ? modaUploadData.data.success_total : ""}}条数据</p>
                <p>导入失败：{{modaUploadData ? modaUploadData.data.fail_total:""}}条数据</p>
                <p>详细结果已通过邮件发送，请查收</p>
        </Modal>
    </div>
</template>
<script>

import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const { fileDownList,fileUpload,downFile,fileDelete,fileView} = Common.restUrl;
import Delpop from '@/components/delectAlert'
export default {
    props: {
        Data: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        SHAPE: {
            type: [String],
            default: function() {
                return "";
            }
        },
        ICON: {
            type: [String],
            default: function() {
                return "ios-cloud-upload-outline";
            }
        },
        TYPE: {
            type: [String],
            default: function() {
                return "info";
            }
        },
        SIZE: {
            type: [String],
            default: function() {
                return "small";
            }
        },
        CLASS: {
            type: [String],
            default: function() {
                return "UploadBtn";
            }
        },
        IsDisabled: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },

        
    },
    watch:{
        Data(data){
            this.init(data);
        },
    },
    beforecreated(){
        //console.log("beforecreated----用户故事附件---",this.formValidate)
    },
    created(){
        //console.log("created----用户故事附件---",this.formValidate)
    },
    beforeUpdate(){
        //console.log("beforeUpdate---用户故事附件----",this.formValidate)
    },
    updated(){
        //console.log("updated----用户故事附件---",this.formValidate)
    },
    mounted(){
        this.init(this.Data);
    },
    data() {
        return {
            delPath_file:"",
            tableDataCur:false,
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
                                style: {
                                    
                                },
                                on: {
                                    click: () => {
                                        this.tableDel(params.index,params.row.file_path)
                                    }
                                }
                            }, '删除'),

                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginLeft: '5px',
                                    visibility:((R)=>{
                                        if(R && R.file_path && Common.IsOffice(R.file_path)){
                                            return "visible"
                                        }else{
                                            return "hidden"
                                        }
                                    })(params.row)
                                },
                                on: {
                                    click: () => {
                                        Common.OnlineView(params.row,fileView)
                                    }
                                }
                            }, '在线预览'),
                            
                            
                            
                        ]);
                    }
                },
            ],
            tableData: [],
            actionUrl:"//jsonplaceholder.typicode.com/posts/",
            formValidate:{
                userstory_id:"",
            },
            //删除弹出--start
            delpopIsShow:false,
            delpopIsLoading:false,
            //删除弹出--end
            params:{
                username:Common.getStorageAndCookie(this,Common,'username'),
                prjId:Common.GETID(this,Common),
                prjSn:Common.GETprjid(this,Common),
            },
            //窗口
            modaUpload:false,
            modaUploadData:"",
            
        }
    },
    methods:{
        //窗口开始
        ok(){
            this.$emit("sendImport",this.modaUploadData);
            this.modaUploadData = "";
            this.modaUpload = false;
            
        },
        cancel(){
            this.$emit("sendImport",this.modaUploadData);
            this.modaUploadData = "";
            this.modaUpload = false;
        },
        //窗口结束
        //删除文件开始
        tableDel(i,path){
            this.delPath_file = path;
            this.delpopOpenFn(true);
            this.tableDataCur = i;
        },

        //删除文件结束
        //删除窗口 -start
        delpopCloseFn(B){
            this.delpopIsShow = B;
            this.delPath_file = "";
            this.tableDataCur = false;
        },
        delpopEnterFn(B){
            defaultAXIOS(fileDelete,{file_path:this.delPath_file,fileId:this.tableData[this.tableDataCur].fileId,id:Common.GETID(this,Common),taskId:this.formValidate.userstory_id},{timeout:2000,method:'get'}).then((response) => {
                let myData = response.data;
                console.log("<======用户故事***文件删除+++",response,myData,"======>");
                let STAUUS = myData.status ? myData.status : myData.message
                if(STAUUS.indexOf("success") != -1){
                    this.delpopIsLoading = B;
                    this.delpopIsShow = B;
                    this.Message("删除完成");
                    this.fileDownFn(fileDownList,1,this.tableDAtaPageLine,Common.GETID(this,Common),this.formValidate.userstory_id)
                    this.tableDAtaPageCurrent = 1;
                    return Promise.resolve(STAUUS)

                }else{
                    this.delpopIsLoading = B;
                    this.delpopIsShow = B;
                    this.error('删除失败');
                    return Promise.reject(STAUUS);
                }
            }).catch( (error) => {
                this.showError(error);
                return Promise.reject(error);
            });
            /* ============== */
            return

            let URL = userstorydelete;
            let params = {
                us_id:this.tableData3[this.tableDataCur].us_id || this.formValidate.userstory_id,
                bfunc_id:this.tableData3[this.tableDataCur].bfunc_id,
                version:this.tableData3[this.tableDataCur].version,
            }
            return defaultAXIOS(URL,params,{timeout:20000,method:'post'}).then((response) => {
                let myData = response.data;
                console.log("<======product 业务列表删除***response+++",response,myData,"======>");
                if(myData.status == "success"){
                    this.delpopIsLoading = B;
                    this.delpopIsShow = B;
                    this.deleteBus(this.tableDataCur)
                    this.Message("删除完成")
                    return Promise.resolve(myData.status)                    
                }else{
                    this.delpopIsLoading = B;
                    this.delpopIsShow = B;
                    this.error(myData.message)
                    return Promise.reject(myData.status);
                }
            }).catch( (error) => {
                console.log(error);
                this.delpopIsLoading = B;
                this.delpopIsShow = B;
                return Promise.reject(error);
                
            });
            
            
        },
        delpopOpenFn(B){
            this.delpopIsShow = B;
        },
        //删除窗口 -end
    	//下载文件 start
        listFileDown(params){
            let URL = downFile + params.row.url;
            let fileName = params.row.fileName;
            let param = {
                key:params.row.fileId,
                filename:fileName,
            }
            return Common.DownFile(defaultAXIOS,this,URL,param,fileName)
        },
        //下载文件 end
        init(URL = ""){
            this.actionUrl = URL+"?import=true&username="+Common.getStorageAndCookie(this,Common,"username")+"&prjId="+Common.GETID(this,Common)+"&prjSn="+Common.GETprjid(this,Common);

            //this.fileDownFn(fileDownList,1,this.tableDAtaPageLine,Common.GETID(this,Common),usID)
            //this.tableDAtaPageCurrent = 1;
        },
        handleError(res,file,list){
            this.$emit("sendUploadIng",false);
            this.modaUploadData = "";
            this.error(res.message || "导入失败");
            console.log("导入失败");
            this.showError("导入失败");
            return Promise.reject("导入失败");
        },
        Message(MSG = "保存完成"){
            Common.CommonMessage(this,MSG)
        },
        error(MSG = "错误") {
            Common.CommonError(this,MSG)
        },
        handleSuccess(res,file,list){
            this.$emit("sendUploadIng",false);
            if(res.status === "success"){
                if(res && res.data && res.data.total){
                    this.modaUploadData = res;
                    this.modaUpload = true;    
                }else{
                    this.Message(res.message || "导入成功");
                    this.$emit("sendImport",res);    
                }
                return Promise.resolve("导入成功");    
            }else{
                this.modaUploadData = "";
                this.error(res.message || "导入失败");
                this.$emit("sendImport",false);
                return Promise.reject(false);
            }

            /*
            this.listUpFile(fileUpload,Common.GETID(this,Common),this.formValidate.userstory_id).then(()=>{
                
                //this.fileDownFn(fileDownList,1,this.tableDAtaPageLine,Common.GETID(this,Common),this.formValidate.userstory_id)
                //this.tableDAtaPageCurrent = 1;

            },(error)=>{
                console.log(error);
                this.error(JSON.stringify(error))
                //this.showError(error);
                return Promise.reject(false);
            })
            */
            
            
        },
        handleBeforeUpload(){
            this.$emit("sendUploadIng",true);
        },
        listUpFile(URL,id="",userstory_id = ""){
            return Promise.resolve("添加成功");

            return defaultAXIOS(URL,{id,taskId:userstory_id},{timeout:20000,method:'get'}).then((response) => {
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
            this.fileDownFn(fileDownList,i,this.tableDAtaPageLine,Common.GETID(this,Common),this.formValidate.userstory_id)
            this.tableDAtaPageCurrent = i;
        },
        fileDownFn(URL = "",page = 1,pageline = 3,id = "",userstory_id = ""){
            defaultAXIOS(URL,{page,pageline,id,taskId:userstory_id},{timeout:20000,method:'get'}).then((response) => {
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
    components: {
        Delpop,
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
    
}

</style>
<style>
#uploadPop .ivu-btn-text {
    display:none;
}
#uploadPop p {
    font-size: 14px;
    line-height: 1.5em;
}
</style>