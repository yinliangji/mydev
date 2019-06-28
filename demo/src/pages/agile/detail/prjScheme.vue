<template>
  <div>
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
    <Modal v-model="modaDelete" width="300">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
            <p>删除无法恢复，是否继续？</p>
            </div>
                <div slot="footer">
                <Button color="#1c2438"  :loading="modal_loading"  @click="del">删除</Button>
                <Button type="primary" @click="cancel">取消</Button>
            </div>
        </Modal>
  </div>
</template>
<script>
import API from '@/api'
const {defaultAXIOS} = API;
import Common from '@/Common';
const {projectDetail,fileDownList,fileUpload,fileDelete,downFile} = Common.restUrl;

export default {
    props: {
        Data: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
    },
    data () {
        return {
            formValidate: {
                prj_id:"",
                prj_name:"",
                settle_time:"",
                start_time: "",
                end_time: "",
                prj_desc: "",
                prj_goal:"",
                modules:"",
                prod_name:"",
                person:[],
                logic_sys_id:"",
                logic_sys_name:"",
                physics_sys_id:"",
                physics_sys_name:"",
                create_person:"",
                prj_type:"",
                propose_depart:"",
                aply_id:"",
                itm_status:"",
                subject:"",
                itm_status_name:"",
                subject_name:"",


                itm_prj_eng_nm:"",
                itm_prj_eng_short_num:"",
                itm_type:"",
                itm_assignment_date:"",
                itm_tech_target:"",
                itm_prj_tsk_id:"",
                itm_lob:"",
                itm_wthr_snd_ntc:"",
                itm_id_sn:"",
                // allgroup:"",
                // managerGroup:"",
                // developerGroup:"",
                // testerGroup:"",
            },
            //业务弹出--start
            depdpopIsShow:false,
            depdpopIsLoading:false,
            depdpopData:false,
            //业务弹出--end
            
            table:[],
            HTML:"",

            prj_permission:[],
            identity:"",
            myPermission:"",

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
            modaDelete: false,
            modal_loading: false,
            delIndex:false,
            delPath_file:"",
            
        }
    },
    watch: {
        Data(){
            if(this.Data){
                this.formValidate = this.Data;
            }
        },
    },
    methods: {
        projectDetail(){

        },
      showError(ERR){
        Common.ErrorShow(ERR,this);
      },
      tableDataAjaxFn(URL = "",ID = ""){

            return defaultAXIOS(URL+ID,{},{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                //console.log("<======detail***response+++",response,myData,"+++detail***response======>");
                let _temp = false;
                this.table=[];
                this.HTML = "";

                if(myData.data && myData.data.id){
                  for(var I in this.formValidate){
                        if(I == "logic_sys_id" || I == "logic_sys_name" || I == "physics_sys_id" || I == "physics_sys_name"){
                            if(myData.data[I] && myData.data[I].indexOf("|") != -1){
                                this.formValidate[I] = myData.data[I].replace(/\|/g,"、");
                            }else if(myData.data[I] && myData.data[I].indexOf(",") != -1){
                                this.formValidate[I] = myData.data[I].replace(/\,/g,"、");
                            }else{
                                this.formValidate[I] = myData.data[I]
                            }
                        }else{
                            this.formValidate[I] = myData.data[I]
                        }
                  }
                }

                if(myData.person && myData.person.length){
                  
                  this.formValidate.person = myData.person;
                  for(var J=0;J<this.formValidate.person.length;J++){
                    for(var K=0;K<this.formValidate.person[J].member.length-1;K++){
                      this.formValidate.person[J].member[K].nick_name = this.formValidate.person[J].member[K].nick_name+"、";
                      
                    }
                  }
                    this.HTML = Common.toTable(this.formValidate.person,this.table,3,11,true);
                    let _arr = this.formValidate.modules.split("|");
                    Common.ArrDelVal(_arr);

                    if(_arr.length){
                        //this.listModuleFn(listModule,{},_arr); //不要删
                    }else{
                        
                    }
                }
                if(myData.data && myData.data.prj_type){
                    if(myData.data.prj_type == "2"){
                        this.isShowEdit = true;
                    }else{
                        this.isShowEdit = true;
                    }

                }
                if(myData.data && myData.data.id){
                    
                    Common.setStorageAndCookie(Common,"prj_id",myData.data.prj_id);
                    Common.setStorageAndCookie(Common,"prjSn",myData.data.prj_id);

                    let queryObj = {id: ID,prjId:ID,prj_id:myData.data.prj_id,prjSn:myData.data.prj_id};

                    let _menuType = this.$router.history.current.query.menuType;
                    let _curOpenName = this.$router.history.current.query.curOpenName;
                    let _TabsCur = this.$router.history.current.query.TabsCur;
                    if(_menuType){
                        queryObj.menuType = _menuType;
                    }
                    if(_curOpenName){
                        queryObj.curOpenName = _curOpenName;
                    }
                    if(_TabsCur){
                        queryObj.TabsCur = _TabsCur;
                    }
                    
                    this.$router.push({path: '/agile/detail', query:queryObj });

                    this.actionUrl = fileUpload+"?taskId="+this.formValidate.prj_id+"&type=1&id="+Common.GETID(this,Common)+"&username="+Common.getStorageAndCookie(this,Common,"username")+"&nickname="+Common.getStorageAndCookie(this,Common,"nickname");

                    return Promise.resolve(this.formValidate.prj_id)

                }else{
                    return Promise.reject(false);
                }

            }).catch( (error) => {
                //console.log(error);
                this.showError(error);
                return Promise.reject(false);
                
            });
      },
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
      del () {
            this.modal_loading = true;
            
            defaultAXIOS(fileDelete,{file_path:this.delPath_file,fileId:this.tableData[this.delIndex].fileId,id:Common.GETID(this,Common),taskId:this.formValidate.prj_id},{timeout:2000,method:'get'}).then((response) => {
                let myData = response.data;
                //console.log("<======agile***fileDelete+++",response,myData,"======>");

                let STAUUS = myData.status ? myData.status : myData.message
                
                if(STAUUS.indexOf("success") != -1){
                   
                    this.modal_loading = false;
                    this.modaDelete = false;
                    this.$Message.config({
                        top: 250,
                        duration: 3
                    });
                    this.$Message.success('删除完成');
                    this.fileDownFn(fileDownList,1,this.tableDAtaPageLine,Common.GETID(this,Common),this.formValidate.prj_id)
                    this.tableDAtaPageCurrent = 1;
                }else{
                    
                    this.modal_loading = false;
                    this.modaDelete = false;
                    this.showError('删除失败');
                }
                
                

            }).catch( (error) => {
                this.showError(error);
            });
            

           
        },
        cancel(){
            this.modaDelete = false;
            this.delIndex = "";
            this.delPath_file = "";
        },
        handleError(res,file,list){
            //console.log("添加失败");
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
                //console.log(error);
                this.showError(error);
            })
            
            
        },
        listUpFile(URL,id="",prj_id = ""){
            return Promise.resolve("添加成功");

            return defaultAXIOS(URL,{id,taskId:prj_id},{timeout:20000,method:'get'}).then((response) => {
                let myData = response.data;
                //console.log("<======detail***fileUpload+++",response,myData,"======>");

                let STAUUS = myData.status ? myData.status : myData.message

                if(STAUUS.indexOf("success") != -1){
                    return Promise.resolve(true)
                }else{
                    return Promise.reject(false);
                }
            }).catch( (error) => {
                //console.log(error);
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
                //console.log("<======detail***fileDown+++",response,myData,"======>");
                
                if(myData && myData.files && Array.isArray(myData.files)){
                    this.tableData = myData.files
                    this.tableDAtaTatol = myData.total;
                }else{
                    this.showError(URL+"_错误或者没有数据");
                }

              
            }).catch( (error) => {
                //console.log(error);
                this.showError(error);
                
            });
        },
        tableDel(i,path){
            this.modaDelete = true;
            this.delIndex = i;
            this.delPath_file = path;
        },
        authIs(KEY){
            return Common.auth(this,KEY)
        },
        getPermissionFn(URL,params){
            return Common.GetPermission(defaultAXIOS,this,URL,params);
        },
      transform(val){
        if(val){
          if(val == "1"){
            return "项目"
          }else if(val == "2"){
            return "开发任务"
          }else{
            return false;
          }
        }else{
          return false;
        }

      },
      //业务窗口 -start
      depdpopCloseFn(B){
          this.depdpopIsShow = B;
      },
      depdpopOpenFn(B,i,d){
          this.depdpopData = d;
          this.depdpopIsShow = B;
      },
      //业务窗口 -end
      depdPop(d,i){
        this.depdpopOpenFn(true,i,d)
      },
    },
    created() {
      //console.log("项目detail--详情--created-------",this.formValidate)
    },
    beforeUpdate(){
      //console.log("项目detail--详情--beforeUpdate-------",this.formValidate)
        
    },
    updated(){
      //console.log("项目detail--详情--updated-------",this.formValidate)
    },
    mounted(){
      this.formValidate = this.Data;
      let myID = Common.GETID(this,Common);
      this.tableDataAjaxFn(projectDetail,myID).then((prj_id)=>{
            this.fileDownFn(fileDownList,1,this.tableDAtaPageLine,myID,prj_id)
            this.tableDAtaPageCurrent = 1;
        },(error)=>{
            //console.log(error);
            this.showError(error);
        })
    },
    components: {
      
    },
}


</script>

<style lang="less" scoped>

.pageBox {
    padding-bottom:20px;
    padding-top:20px;
    overflow: hidden;
}
.UploadBtn{
    margin-bottom:10px;
}
</style>

