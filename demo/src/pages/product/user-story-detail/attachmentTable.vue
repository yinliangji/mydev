<template>
    <div class="tableContBox" style="padding-left:1px;">
    	<h3 class="Title"><span>附件信息</span></h3>
    	<Form 
	    	id="rightform2"
	    	ref="formValidate" 
	    	:label-width="100" 
	    	class="rightform2" 
	    	>
	    	<FormItem label="附件信息" >
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
		        <Upload
		            multiple
		            :action="actionUrl"
		            name="file"
		            :on-success="handleSuccess"
		            :on-error="handleError"
		            :show-upload-list="false"
		            class="UploadBtn"
		            >
		            <Button  icon="ios-cloud-upload-outline">文件上传</Button>
		        </Upload>
	    	</FormItem>
	    </Form>
    	
        
        
        

        <Delpop
            @delpopClose = "delpopCloseFn"
            @delpopEnter = "delpopEnterFn" 
            :isShow = "delpopIsShow"
            :isLoading = "delpopIsLoading"
        />
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
        IsEditDetail: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
        USID: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
    },
    watch:{
        IsEditDetail(data){
        },
        USID(){
            if(this.USID){
                this.formValidate.userstory_id = this.USID;
                this.init(this.USID);
            }
        },
    },
    data () {
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
                    align: 'left',
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
                    width:'90',
                    
                },
                {
                    title: '创建者',
                    key: 'creater',
                    align: 'center',
                    width:'100',
                },
                {
                    title: '创建时间',
                    key: 'created_time',
                    align: 'center',
                    width:'120',
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:'150',
                    render: (h, params) => {
                        return h('div', [

                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    visibility:((is)=>{
                                        return is ? "visible" : "hidden";

                                    })(this.IsEditDetail),
                                    
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
            
        }
    },
    mounted(){
        this.formValidate.userstory_id = this.USID;
        this.init(this.USID);
    },
    methods:{
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
        init(usID){
            //Common.GETprjid(this,Common)
            let us_ID = usID? usID : this.formValidate.userstory_id;
            this.actionUrl = fileUpload+"?taskId="+us_ID+"&type=2&id="+Common.GETID(this,Common)+"&username="+Common.getStorageAndCookie(this,Common,"username")+"&nickname="+Common.getStorageAndCookie(this,Common,"nickname");

            this.fileDownFn(fileDownList,1,this.tableDAtaPageLine,Common.GETID(this,Common),usID)
            this.tableDAtaPageCurrent = 1;
        },
        handleError(res,file,list){
            console.log("添加失败");
            this.showError("添加失败");
            return Promise.reject("添加失败");
        },
        Message(MSG = "保存完成"){
            Common.CommonMessage(this,MSG)
        },
        error(MSG = "错误") {
            Common.CommonError(this,MSG)
        },
        handleSuccess(res,file,list){

            this.listUpFile(fileUpload,Common.GETID(this,Common),this.formValidate.userstory_id).then(()=>{
                this.Message("添加成功")
                this.fileDownFn(fileDownList,1,this.tableDAtaPageLine,Common.GETID(this,Common),this.formValidate.userstory_id)
                this.tableDAtaPageCurrent = 1;

            },(error)=>{
                console.log(error);
                this.error(JSON.stringify(error))
                //this.showError(error);
            })
            
            
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
<style>
.leftform2 {
	padding-right: 30px;
}
#leftform2 .ivu-form-item{

}
</style>
