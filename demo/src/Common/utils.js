"use strict"
import CommonRest from './CommonRest';

import Vue from 'vue'

export default class Utils extends CommonRest {

//export default {
    constructor() {
        super()
    }
    static CommonMultiStoreFn() {
      console.log("====CommonUtilsFn====");
    }
    static setDocumentTitle (name){
      window.document.title = Math.random();
      window.document.title = name;
      if(this.browser.isWeixin){
        const body = document.body
        const iframe = document.createElement('iframe')
        iframe.src = '/favicon.ico'
        iframe.style.display = 'none'
        iframe.onload = () => {
          setTimeout(() => {
              iframe.onload = null
              body.removeChild(iframe)
          }, 0)
        }
        body.appendChild(iframe)
      }
    }
   
    static getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        var r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2]); return null
    }
    
    //函数节流
    static throttle2 (func, wait, options) {
        /* options的默认值
         *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
         *  options.leading = true;
         * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
         *  options.trailing = true; 
         * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
         */
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options) options = {};
        var later = function() {
            previous = options.leading === false ? 0 : _.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function() {
            var now = _.now();
            if (!previous && options.leading === false) previous = now;
            // 计算剩余时间
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            // 当到达wait指定的时间间隔，则调用func函数
            // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
            if (remaining <= 0 || remaining > wait) {
                // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
                if (timeout) {
                  clearTimeout(timeout);
                  timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                // options.trailing=true时，延时执行func函数
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    };

    //函数节流
    static throttle(fn, context, delay, text, mustApplyTime) {
      return ()=>{
        //
        clearTimeout(context.timer);
        let _exec = false;
        if(context._now && Date.now() - context._now > delay){
          console.log("context._now",Date.now() - context._now)
          //_exec = true;
          //fn.call(context, text,context);  
        }
        context._now = Date.now();
        context.timer = setTimeout(() => {
          if (!_exec) {
            fn.call(context, text, context);
            _exec = false;
          }

        }, delay);
        //      
      }

    }

    //去除数组某个值
    static ArrDelVal(array = [],_return = false,VAL = ""){
      for (var i = 0; i < array.length; i++) {
        if (array[i] == VAL || typeof(array[i]) == "undefined") {
          array.splice(i, 1);
          i = i - 1;
        }

      }
      if(_return){return array};
      
    }


    
    //写cookies 
    static setCookie(name,value) { 
        var Days = 365; 
        var exp = new Date(); 
        exp.setTime(exp.getTime() + Days*24*60*60*1000); 
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
    }
    //读取cookies 
    static getCookie(name) { 
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
     
        if(arr=document.cookie.match(reg))
     
            return unescape(arr[2]); 
        else 
            return null; 
    } 

    //删除cookies 
    static delCookie(name) { 
        var exp = new Date(); 
        exp.setTime(exp.getTime() - 1); 
        var cval=getCookie(name); 
        if(cval!=null) 
            document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
    }
    //使用示例 
    // setCookie("name","hayden"); 
    // alert(getCookie("name"));   
   
    // 图片压缩
    static compress(img,Orientation) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext('2d');
        //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = width * height / 4000000) > 1) {
        console.log("大于400万像素")
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      //        铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = width * height / 3000000) > 1) {
        console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //修复ios上传图片的时候 被旋转的问题
      if(Orientation != "" && Orientation != 1){
        switch(Orientation){
          case 6://需要顺时针（向左）90度旋转
              this.rotateImg(img,'left',canvas);
              break;
          case 8://需要逆时针（向右）90度旋转
              this.rotateImg(img,'right',canvas);
              break;
          case 3://需要180度旋转
              this.rotateImg(img,'right',canvas);//转两次
              this.rotateImg(img,'right',canvas);
              break;
        }
      }
      //进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.1);
      console.log('压缩前：' + initSize);
      console.log('压缩后：' + ndata.length);
      console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
    }
    static rotateImg (img, direction,canvas) {
        //最小与最大旋转方向，图片旋转4次后回到原方向    
        const min_step = 0;    
        const max_step = 3;      
        if (img == null)return;    
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错    
        let height = img.height;    
        let width = img.width;      
        let step = 2;    
        if (step == null) {    
            step = min_step;    
        }    
        if (direction == 'right') {    
            step++;    
            //旋转到原位置，即超过最大值    
            step > max_step && (step = min_step);    
        } else {    
            step--;    
            step < min_step && (step = max_step);    
        }     
        //旋转角度以弧度值为参数    
        let degree = step * 90 * Math.PI / 180;    
        let ctx = canvas.getContext('2d');    
        switch (step) {    
          case 0:    
              canvas.width = width;    
              canvas.height = height;    
              ctx.drawImage(img, 0, 0);    
              break;    
          case 1:    
              canvas.width = height;    
              canvas.height = width;    
              ctx.rotate(degree);    
              ctx.drawImage(img, 0, -height);    
              break;    
          case 2:    
              canvas.width = width;    
              canvas.height = height;    
              ctx.rotate(degree);    
              ctx.drawImage(img, -width, -height);    
              break;    
          case 3:    
              canvas.width = height;    
              canvas.height = width;    
              ctx.rotate(degree);    
              ctx.drawImage(img, -width, 0);    
              break;
        }    
    }
    // base64转化为blob
    static convertImgDataToBlob(base64Data) {  
      var format = "image/jpeg";  
      var base64 = base64Data;  
      var code = window.atob(base64.split(",")[1]);  
      var aBuffer = new window.ArrayBuffer(code.length);  
      var uBuffer = new window.Uint8Array(aBuffer);  
      for(var i = 0; i < code.length; i++){  
          uBuffer[i] = code.charCodeAt(i) & 0xff ;  
      }  
      var blob=null;  
      try{  
        blob = new Blob([uBuffer], {type : format});  
      }  
      catch(e){  
        window.BlobBuilder = window.BlobBuilder ||  
        window.WebKitBlobBuilder ||  
        window.MozBlobBuilder ||  
        window.MSBlobBuilder;  
        if(e.name == 'TypeError' && window.BlobBuilder){  
          var bb = new window.BlobBuilder();  
          bb.append(uBuffer.buffer);  
          blob = bb.getBlob("image/jpeg");
        }  
        else if(e.name == "InvalidStateError"){  
          blob = new Blob([aBuffer], {type : format});  
        }  
      }  
      return blob;  
    }
   
    
}