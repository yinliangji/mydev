<template>
  <div class="header" :class="header_position">
    <img src="@/assets/logo.png">
    <div class="h_menu">
      <a class="h_menu_btn" v-if="isgo==true"  v-for="(v,i) in menujson" :href="v.menuUrl" target="_blank" :key="i">{{ v.menuName}}</a>
      <a class="h_menu_btn" v-else  v-for="(v,i) in menujson" :href="v.menuUrl"  target="_self" :key="i">{{ v.menuName}}</a>
    </div>
    <div class="h_user">
      <div class="_h_user" @click="toLogin">
        <div class="h_user_img"></div>
        <div class="h_user_txt">{{who}}</div>
      </div>
    </div>
    <div class="login" v-if="showLogin">
      <div class="loginClo" @click="cloLogin">X</div>
      <div class="login_head">账号登陆</div>
      <div class="login_body">
        <div class="login_inputDiv">
          <input class="login_input" type="text" placeholder="账号/邮箱/手机" v-model="ruleForm.userName" />
        </div>
        <div class="login_inputDiv">
          <input class="login_input" type="password" placeholder="密码" v-model="ruleForm.password" />
        </div>
        <div class="login_some">
          <checkbox v-model="rem_user">记住密码</checkbox>
        </div>
      </div>
      <div class="login_foot">
        <div class="login_btn" @click="logIn">登陆</div>
      </div>
    </div>
    <div class="bg_black" v-if="showLogin"></div>
  </div>
</template>
<script>
	import Checkbox from "iview/src/components/checkbox/checkbox";

  export default {
    components: {Checkbox},
    name: "myhead",
    props:['isgo'],
    data(){
      return{
        header_position:'headFix',
        menujson : [],//菜单数组,
        who : '请登录',//用户名
        showLogin:false,//是否显示登陆界面
        rem_user:true,//是否记住密码
        ruleForm:{//账号密码(用户信息)
          userName:"",
          password:""
        },
      }
    },
    mounted:function () {
      this.$ajax({
        method: 'post',
        url: 'http://128.192.219.46:8000/menu/getMenu',
        data: {}
      }).then((parm)=>{
        console.log(parm);
        this.menujson = parm.data;
      }).catch((error)=>{})
    },
    methods:{
      toLogin:function () {
        this.ruleForm = {};
        this.getCookie();
        this.showLogin = true;
      },
      cloLogin:function () {
        this.showLogin = false;
      },
      logIn:function () {
        //保存的账号
        var name=this.ruleForm.userName;
        //保存的密码
        var pass=this.ruleForm.password;
        if(name==''||name==null){
          alert("请输入正确的用户名");
          return
        }else if(pass==''||pass==null) {
          alert("请输入正确的密码");
          return
        }
        //判断复选框是否被勾选 勾选则调用配置cookie方法
        if(this.rem_user === true){
          //传入账号名，密码，和保存天数3个参数
          this.setCookie(name,pass);
        }

        this.showLogin = false;
      },
      setCookie(c_name,c_pwd,exdays) {
        // var exdate=new Date();//获取时间
        // exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
        //字符串拼接cookie
        // window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
        window.document.cookie="userName"+ "=" +c_name+";path=/";
        // window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
        window.document.cookie="userPwd"+"="+c_pwd+";path=/";
      },
      //读取cookie
      getCookie:function () {
        if (document.cookie.length>0) {
          var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
          for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');//再次切割
            //判断查找相对应的值
            if(arr2[0]=='userName'){
              this.ruleForm.userName=arr2[1];//保存到保存数据的地方
            }else if(arr2[0]=='userPwd'){
              this.ruleForm.password=arr2[1];
            }
          }
        }
      },
    },
    mounted:function () {
      if(this.isgo){
        this.header_position = 'headFix'
      }else {
        this.isgo = false;
        this.header_position = 'headNoFix'
      }
    },
	}
</script>
<style lang="less" scoped>
.headFix{
  position: fixed;
  top: 0px;
  left: 0px;
}
.headNoFix{
  position: relative;
  top: 0px;
  left: 0px;
}
.header{
  width: 100%;
  min-width: 1000px;
  height: auto;
  text-align: left;

  background-color: #fff;
  // z-index: 2017;
  overflow: hidden;

  img{
    float: left;
    margin-left: 10px;
    width: 480px;
  }

  .h_menu{
    height: 100%;
    width: auto;
    float: left;

    .h_menu_btn{
      float: left;
      margin-left: 30px;
      width: auto;
      height: 59px;
      line-height: 59px;
      font-size: 14px;
      font-weight: bold;
      color: rgba(33,45,167,0.8);
      cursor: pointer;
    }
  }
  .h_user{
    float: right;
    width: auto;
    height: 100%;
    overflow: hidden;

    ._h_user{
      width: auto;
      height: 100%;
      float: left;
      margin-right: 10px;
      overflow: hidden;
      cursor: pointer;

      .h_user_img{
        width: 20px;
        height: 20px;
        margin-top: 19px;
        float: left;
        background-image: url("../../assets/u63.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .h_user_txt{
        float: left;
        height: 100%;
        line-height: 59px;
        margin-left: 5px;
      }
    }
  }

  .bg_black{
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #000;
    opacity: 0.8;
    filter: alpha(opacity=80);
    top: 0;
    left: 0;
    z-index: 2018;
  }
  .login{
    background-color: #fff;
    width: 300px;
    height: 400px;
    padding: 0px 2%;
    position: fixed;
    top: 100px;
    right: 100px;
    z-index: 2019;

    .login_head{
      width: 100%;
      height: 25%;
      text-align: left;
      font-size: 18px;
      line-height: 100px;
      color: #000;
      border-bottom: 1px solid #999;
    }
    .login_body{
      width: 100%;
      height: 50%;
      overflow: hidden;
      .login_inputDiv{
        width: 100%;
        height: 40px;
        margin-top: 30px;

        .login_input{
          width: 100%;
          height: 100%;
          padding: 10px 5px;
          font-size: 16px;
          line-height: 20px;
          border: 1px solid #000;
        }
      }
      .login_some{
        margin-top: 30px;
      }
    }
    .login_foot{
      width: 100%;
      height: 25%;
      padding: 25px 0px;

      .login_btn{
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: red;
        line-height: 50px;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .loginClo{
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }
  }
}
</style>
