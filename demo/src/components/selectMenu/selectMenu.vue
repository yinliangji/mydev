<template>
    <div class="curPosition">
        <Icon type="navicon-round" style="color:#01babc;font-size:16px;"></Icon>

        <span>选择项目</span>
        <Select v-model="curProject" clearable filterable style="width:300px" @on-change="changeCurProject">
            <Option v-for="(item,index) in projectList" :value="item.id" :key="index">{{ item.prj_name }}</Option>
        </Select>
        <a v-if="isTestBtn" @click="testBtn">from=nav</a>
        <a v-if="isTestBtn" @click="testBtn2">maven</a>
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
            curProject: "",
            isTestBtn:window.location.href.indexOf('//127.0.0.1:') != -1 ? true : false,
        };
    },
    watch: {
      '$route' (to, from) {
       },
       curProject(curVal,oldVal){

       },
    },
    methods: {
        testBtn(){
            this.$router.push({path: '/agile/detail', query: {from:"nav"}});
        },
        testBtn2(){
            this.$router.push({path: '/maven'});
        },
        delUrlParam(url, ref) {
            // 如果不包括此参数
            if (url.indexOf(ref) == -1)
                return url;
            var arr_url = url.split('?');
            var base = arr_url[0];
            var arr_param = arr_url[1].split('&');
            var index = -1;
            for (let i = 0; i < arr_param.length; i++) {
                var paired = arr_param[i].split('=');
                if (paired[0] == ref) {
                    index = i;
                    break;
                }
            }
            if (index == -1) {
                return url;
            } else {
                arr_param.splice(index, 1);
                return base + "?" + arr_param.join('&');
            }
        },
        showProjectList(){
            var self = this;
            let username = this.getCookie("username");
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
                let _cur;
                this.projectList = res.data.data;
                
                this.$nextTick(function(){

                    let prjIdUrl = this._getUrlParam();
                    let prjIdCookie = this._getCookie();

                    console.log("prjIdUrl=",prjIdUrl,"prjIdUrl=",prjIdUrl)

                    if(prjIdUrl || prjIdUrl === 0){
                        if(prjIdUrl === 0){
                            this.setCookie("prjId","");
                            this.setCookie("id","");
                            this.$router.push({path:"/agile"});
                        }else{
                            this.curProject = parseInt(prjIdUrl);
                            this.setCookie("prjId",prjIdUrl);
                            this.setCookie("id",prjIdUrl);

                        }
                        console.log("prjIdUrl || prjIdUrl === 0",prjIdUrl,prjIdUrl)
                    }else if(!prjIdUrl && prjIdCookie){
                        this.curProject = parseInt(prjIdCookie);
                        this.setCookie("prjId",prjIdCookie);
                        this.setCookie("id",prjIdCookie);
                        console.log("!prjIdUrl && prjIdCookie",prjIdUrl,prjIdCookie)
                    }else if(!prjIdUrl && !prjIdCookie){
                        this.curProject = self.projectList[0].id;
                        this.setCookie("prjId",self.projectList[0].id);
                        this.setCookie("id",self.projectList[0].id);
                        this.setCookie("prj_name",self.projectList[0].prj_name);
                        console.log("!prjIdUrl && !prjIdCookie",prjIdUrl,prjIdCookie)
                    }else{
                        this.curProject = "";
                        this.setCookie("prjId","");
                        this.setCookie("id","");
                        console.log("else")
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
                            this.setCookie("prj_name",prjNumArr[i].prj_name);
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
            if(!data){return}
            if(this.$route.name == "Product"){
                let _url = this.$route.fullPath
                if( _url.indexOf("id=") != -1 || _url.indexOf("prj_id=") != -1 || _url.indexOf("prod_id=") != -1){
                    if(_url.indexOf("id=") != -1){
                        _url = this.delUrlParam(_url,"id");
                    }
                    if(_url.indexOf("prj_id=") != -1){
                        _url = this.delUrlParam(_url,"prj_id");
                    }
                    if(_url.indexOf("prod_id=") != -1){
                        _url = this.delUrlParam(_url,"prod_id");
                    }
                    this.$router.push({fullPath:_url})
                }
            }
            
            this.setCookie("prjId", data);
            this.setCookie("id", data);
            let prjSn = this._getPrjSn(data);
            this.setCookie("prj_id",prjSn);
            this.setCookie("prjSn",prjSn);
            
            let prjNumArr = this.projectList;
            for(var i=0;i<prjNumArr.length;i++){
                if(this.getCookie("prjId") == prjNumArr[i].id || this.getCookie("id") == prjNumArr[i].id){
                    sessionStorage.setItem("QprjNumber",prjNumArr[i].prj_id);
                    sessionStorage.setItem("QprjName",prjNumArr[i].prj_name);
                    this.setCookie("prj_name",prjNumArr[i].prj_name);
                    break
                }
            }
            this.$emit("changeSelect",this.curProject);
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
                    this.setCookie("id","");
                    return 0;
                }
            }
            return;
        },
        _getCookie(){
            let prjId = this.getCookie("prjId") || this.getCookie("id");
            let hasCookieIndex;
            if(prjId){
                hasCookieIndex = _findIndex(this.projectList,"id",prjId);
                if(hasCookieIndex >= 0){
                    return prjId;
                }else{
                    this.setCookie("prjId","");
                    this.setCookie("id","");
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
