<template>
  <div class="curPosition">
    <Icon type="navicon-round"></Icon>

    <span>选择项目</span>
    <Select v-model="curProject" style="width:140px" @on-change="changeCurProject">
      <Option v-for="item in projectList" :value="item.id" :key="item.id">{{ item.prj_name }}</Option>
    </Select>
  </div>
</template>

<script>
import {getUrlParam,_findIndex,_findItem} from "@/base/base"
import Common from "@/Common";
const { projectListDataNew } = Common.restUrl;
export default {
    data() {
        return {
            projectList: [],
            curProject: ""
        };
    },
    methods: {
        showProjectList(){
            var self = this;
            let username = this.getCookieId("username");
            if(!username){
                if(document.location.hostname === "128.192.63.30"){
                    console.error("http://128.192.184.4:8020/icdp?apptype=app03");

                }else if(document.location.hostname === "128.196.0.127"){
                    console.error("http://128.194.224.146:8000/icdp?apptype=app03");
                }
                return;
            }
            this.$axios({
                method: "get",
                url: projectListDataNew,
                params:{
                    username:username,
                },
            }).then(res => {
                
                if(res.status != 200){
                    self.$router.push({path:"/agile"});
                    return;
                }
                this.projectList = res.data.data;
                
                this.$nextTick(function(){

                    let prjIdUrl = this._getUrlParam();
                    let prjIdCookie = this._getCookie();

                    if(prjIdUrl || prjIdUrl === 0){
                        if(prjIdUrl === 0){
                            this.setCookie("prjId","");
                            this.$router.push({path:"/agile"});
                        }else{
                            this.curProject = parseInt(prjIdUrl);
                            this.setCookie("prjId",prjIdUrl)
                        }
                    }else if(!prjIdUrl && prjIdCookie){
                        this.curProject = parseInt(prjIdCookie);
                        this.setCookie("prjId",prjIdCookie)
                    }else if(!prjIdUrl && !prjIdCookie){
                        this.curProject = self.projectList[0].id;
                        this.setCookie("prjId",self.projectList[0].id);
                        this.setCookie("prjId",self.projectList[0].prj_name);
                    }else{
                        this.curProject = "";
                        this.setCookie("prjId","");
                        this.$router.push({path:"/agile"});
                    }

                    let prjSn = this._getPrjSn(this.curProject);
                    this.setCookie("prjSn",prjSn);
                    this.setCookie("prj_id",prjSn);


                    let prjNumArr = this.projectList;

                    for(var i=0;i<prjNumArr.length;i++){
                        if(this.getCookie("prjId") == prjNumArr[i].id){
                            sessionStorage.setItem("QprjNumber",prjNumArr[i].prj_id);
                            sessionStorage.setItem("QprjName",prjNumArr[i].prj_name);
                            break
                        }
                    }

                    this.$emit("sendData",this.checkGet(this.curProject || "",this.projectList));

                })
                

                //this.curProject = res.data.data[0].id;
                //document.cookie = "prj_id" + "=" + res.data.data[0].id + "; ";
            });
        },
        checkGet(val,arr){
            return arr.find(item=>item.id == val);
        },
        changeCurProject(data) {
            
            this.$emit("changeSelect",this.curProject);
            this.setCookie("prj_id", data)//临时
            this.setCookie("prjId", data);
            let prjSn = this._getPrjSn(data);
            this.setCookie("prjSn",prjSn);
            this.setCookie("prj_id",prjSn);
            let prjNumArr = this.projectList;
            for(var i=0;i<prjNumArr.length;i++){
                if(this.getCookie("prjId") == prjNumArr[i].id){
                    sessionStorage.setItem("QprjNumber",prjNumArr[i].prj_id);
                    sessionStorage.setItem("QprjName",prjNumArr[i].prj_name);
                    break
                }
            }
            this.$emit("sendData",this.checkGet(this.curProject || "",this.projectList));
        },
        _getPrjSn(prjId){
            let curPrj = _findItem(this.projectList,"id",prjId);
            return curPrj.prj_id;

        },
        _getUrlParam(){
            let prjId = getUrlParam("id");
            let hasIdIndex;
            if(prjId){
                hasIdIndex = _findIndex(this.projectList,"id",prjId);
                if(hasIdIndex >= 0){
                    return prjId;
                }else{
                    this.setCookie("prjId","");
                }
            }
            return;
        },
        _getCookie(){
            let prjId = this.getCookieId("prjId");
            let hasCookieIndex;
            if(prjId){
                hasCookieIndex = _findIndex(this.projectList,"id",prjId);
                if(hasCookieIndex >= 0){
                    return prjId;
                }else{
                    this.setCookie("prjId","");
                }
            }
            return;
        },
        getCookieId(key){
            let search = key+"=";
            let begin = document.cookie.indexOf(search);
            if(begin != -1 ){
                begin += search.length;
                let end = document.cookie.indexOf(";",begin);
                if(end == -1){end = document.cookie.length;}
                return unescape(document.cookie.substring(begin,end))
            }
            return 
        },

    },
    created(){
      this.showProjectList();
    },
    mounted() {
        //sessionStorage.setItem("prj_id", this.curProject);
        //document.cookie = "prj_id" + "=" + this.curProject + "; ";

    }
};
</script>
