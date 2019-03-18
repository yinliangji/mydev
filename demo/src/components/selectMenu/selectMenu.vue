<template>
    <div class="curPosition" id="curPosition" ref="curPosition">
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
import API from '@/api'
const {defaultAXIOS} = API;
import {getUrlParam,_findIndex,_findItem} from "@/base/base"
import Common from "@/Common";
const { projectListDataNew } = Common.restUrl;
export default {
    name: 'curPosition',
    props: {
        Init: {
            type: [String,Number,Boolean,Function,Object,Array,Symbol],
            default: function() {
                return false;
            }
        },
    },
    watch: {
        '$route' (to, from) {
        },
        curProject(curVal,oldVal){
        },
        Init(curVal,oldVal){
            console.error("Init",this.Init)
            if(!curVal){
                this.showProjectList();        
            }
        },
        
    },
    
    data() {
        return {
            projectList: [],
            curProject: "",
            isTestBtn:window.location.href.indexOf('//127.0.0.1:') != -1 ? true : false,
        };
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
        mySetCookie(name,val){
            if(val && name && (name == "prjId" || name == "id")){
                this.setCookie("prjId",val);
                this.setCookie("id",val);
                return true;
            }else if(val && name && (name == "prjSn" || name == "prj_id")){
                this.setCookie("prjSn",val);
                this.setCookie("prj_id",val);
                return true;
            }else if(val,name){
                this.setCookie(name,val);
                return true;
            }else{
                return false;
            }

        },
        isTrue(val){
            return (val || val == 0 || val == "0") && val != "false" && val != "null" && val != "undefined" && val != "NaN" && val != "NaN-aN-aN" ? true : false;
        },
        isReturnValue(val){
            return this.isTrue(val) ? val :false; 
        },
        showProjectList(){
            var self = this;
            let username = this.getCookie("username");
            if(!username){
                Common.CommonError(this,"没有获取到username 无法获取项目列表")
                return;
            }
            let params = {
                username:username,
            }
            defaultAXIOS(projectListDataNew,params,{timeout:20000,method:'get'}).then(res => {
                if(res.status != 200){
                    this.$router.push({path:"/agile"});
                    return;
                }
                let _cur;
                this.projectList = [];
                if(res.data.data && Array.isArray(res.data.data) && res.data.data.length){
                    res.data.data.forEach((item)=>{
                        if(item.id && !item.prjId){
                            item.prjId = item.id;
                        }
                        if(item.prj_id && !item.prjSn){
                            item.prjSn = item.prj_id;
                        }
                        this.projectList.push(item);
                    }) 
                }else if(res.data.data && Array.isArray(res.data.data) && res.data.data.length == 0){
                    Common.CommonError(this,"没有项目");
                    return
                }else{
                    Common.CommonError(this,"获取项目失败");
                    return
                }
                
                this.$nextTick(()=>{
                    let prjIdUrl = this._getUrlParam();//从url获取id或prjId并在projectList 里发现相同的id或prjId
                    let prjIdCookie = this._getCookie();//从cookie获取id或prjId并在projectList 里发现相同的id或prjId
                    let myGetOutID =  this.isReturnValue(getUrlParam("prjId")) || this.isReturnValue(getUrlParam("id")) || this.isReturnValue(this.getCookie("prjId")) || this.isReturnValue(this.getCookie("id"));
                    console.log("prjIdUrl=",prjIdUrl," prjIdCookie=",prjIdCookie," myGetOutID=",myGetOutID);
                    if(!this.isTrue(myGetOutID)){
                        let ID = this.isReturnValue(this.projectList[0].prjId) || this.isReturnValue(this.projectList[0].id);
                        setTimeout(()=>{
                            let myGetInID = this.isReturnValue(getUrlParam("prjId")) || this.isReturnValue(getUrlParam("id")) || this.isReturnValue(this.getCookie("prjId")) || this.isReturnValue(this.getCookie("id"));
                            if(!this.isTrue(myGetInID)){
                                this.curProject = ID;
                                this.mySetCookie("prjId",ID);
                                this.mySetCookie("prj_name",this.projectList[0].prj_name);
                                let prjSn = this._getPrjSn(ID);
                                let isResult = prjSn ? this.mySetCookie("prjSn",prjSn) : this.mySetCookie("prjSn","");
                                sessionStorage.setItem("QprjNumber",(this.isReturnValue(prjNumArr[i].prjSn) || this.isReturnValue(prjNumArr[i].prj_id)));
                                sessionStorage.setItem("QprjName",prjNumArr[i].prj_name);
                                this.$emit("sendData",this.projectList[0]);
                                console.log("用默认projectList第一条");
                            }
                        },2000)
                        console.log("没有获取到prjId或id 等待2秒");
                    }else if(prjIdUrl == false && prjIdCookie == false){
                        Common.CommonError(this,"选择项目列表【projectList】里没有匹配的prjId或id");
                        this.$emit("sendData",false);
                        console.log("选择项目列表【projectList】里没有匹配的prjId或id");
                        return
                    }else if(prjIdUrl != false){
                        this.curProject = parseInt(prjIdUrl);
                        this.mySetCookie("prjId",prjIdUrl);
                        this.nextStep();
                        console.log("prjIdUrl != false",prjIdUrl)
                    }else if(prjIdCookie != false){
                        this.curProject = parseInt(prjIdCookie);
                        this.nextStep();
                        console.log("prjIdCookie != false",prjIdCookie)
                    }else{
                        Common.CommonError(this,"没有获取到prjId或id 回到agile")
                        this.$emit("sendData",false);
                        console.log("else");
                        return
                    }
                })
            });
        },
        nextStep(){
            let prjSn = this._getPrjSn(this.curProject);
            prjSn ? this.mySetCookie("prjSn",prjSn) : this.mySetCookie("prjSn","");
            let ID = this.isReturnValue(this.getCookie("prjId")) || this.isReturnValue(this.getCookie("id"));
            let prjNumArr = this.projectList;
            for(var i=0;i<prjNumArr.length;i++){
                if(ID == (this.isReturnValue(prjNumArr[i].prjId) || this.isReturnValue(prjNumArr[i].id))){
                    sessionStorage.setItem("QprjNumber",(this.isReturnValue(prjNumArr[i].prjSn) || this.isReturnValue(prjNumArr[i].prj_id)));
                    sessionStorage.setItem("QprjName",prjNumArr[i].prj_name);
                    this.mySetCookie("prj_name",prjNumArr[i].prj_name);
                    break
                }
            }
            this.$emit("sendData",this.checkGet(this.curProject || "",this.projectList));
        },
        checkGet(val,arr){
            return arr.find(item=>item.id == val);
        },
        changeCurProject(data) {
            if(!data){return}
            if(this.$route.name == "Product"){
                let _url = this.$route.fullPath;
                let isID = _url.indexOf("prjId=") != -1 || _url.indexOf("id=") != -1 || false;
                let isPSN = _url.indexOf("prj_id=") != -1 || _url.indexOf("prj_id=") != -1 || false;
                let isProdID =  _url.indexOf("prod_id=") != -1 || false;
                if( isID || isPSN || isProdID){
                    if(isID){
                        let ID = _url.indexOf("prjId=") != -1 ? "prjId" : "id";
                        _url = this.delUrlParam(_url,ID);
                    }
                    if(isPSN){
                        let PSN = _url.indexOf("prjSn=") != -1 ? "prjSn" : "prj_id";
                        _url = this.delUrlParam(_url,PSN);
                    }
                    if(isProdID){
                        _url = this.delUrlParam(_url,"prod_id");
                    }
                    this.$router.push({fullPath:_url})
                }
            }
            this.mySetCookie("prjId",data);
            let prjSn = this._getPrjSn(data);
            prjSn ? this.mySetCookie("prjSn",prjSn) : this.mySetCookie("prjSn","");


            let ID = this.isReturnValue(this.getCookie("prjId")) || this.isReturnValue(this.getCookie("id"));
            let prjNumArr = this.projectList;
            for(var i=0;i<prjNumArr.length;i++){
                if(ID == (this.isReturnValue(prjNumArr[i].prjId) || this.isReturnValue(prjNumArr[i].id))){ 
                    sessionStorage.setItem("QprjNumber",(this.isReturnValue(prjNumArr[i].prjSn) || this.isReturnValue(prjNumArr[i].prj_id)));
                    sessionStorage.setItem("QprjName",prjNumArr[i].prj_name);
                    this.mySetCookie("prj_name",prjNumArr[i].prj_name);
                    break
                }
            }
            this.$emit("changeSelect",data);
            this.$emit("sendData",this.checkGet(data || "",this.projectList));
        },
        _getPrjSn(pId){
            let isPrjId = this.projectList.every((item)=>{return item.prjId ? true : false});
            let isId = this.projectList.every((item)=>{return item.prjId ? true : false});
            let ID = isPrjId ? "prjId" : (isId ? "id" : "");  
            let curPrj = _findItem(this.projectList,ID,pId);
            return curPrj ? (this.isTrue(curPrj.prj_id) ? curPrj.prj_id : false) : false;
        },
        _getUrlParam(){
            let prjId = this.isReturnValue(getUrlParam("prjId")) || this.isReturnValue(getUrlParam("id"));
            let isPrjId = this.projectList.every((item)=>{return item.prjId ? true : false})
            let isId = this.projectList.every((item)=>{return item.prjId ? true : false})
            let ID = isPrjId ? "prjId" : (isId ? "id" : "");  
            if(prjId && ID){
                return _findIndex(this.projectList,ID,prjId) >= 0 ? prjId : false;
            }else{
                return false;    
            }
        },
        _getCookie(){
            let prjId = this.isReturnValue(this.getCookie("prjId")) || this.isReturnValue(this.getCookie("id"));
            let ID = this.getCookie("prjId") ? "prjId" : "id";
            if(prjId){
                return _findIndex(this.projectList,ID,prjId)  >= 0 ? prjId : false; 
            }else{
                return false;    
            }
        },
    },
    created(){
        if(!this.Init){
            this.showProjectList();        
        }
    },
    mounted() {
    }
};
</script>
