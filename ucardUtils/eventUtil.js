/*---------------------------------------------------------
@ 创建时间：20170518
@ 创 建 者：lunjiao.peng
@ 版本：V0.01
@ 功能描述：原生js处理各类事件监听
            跨浏览器的事件、事件对象处理程序
---------------------------------------------------------
@ 修 改 者：
@ 修改时间：
@ 修 改 点：
---------------------------------------------------------*/
const EventUtil = {// 
  addHandler:function(element,type,handler){               
    if(element.addEventListener){ //IE9、Firefox,Safari,Chrome和Opera支持DOM2级事件处理程序
      element.addEventListener(type,handler,false);
    }else if(element.attachEvent){//IE,Opera
      element.attachEvent("on"+type,handler);
    }else{//DOM0级
      element["on"+type]=handler;
    }
  },
  removeHandler:function(element,type,handler){
    if(element.removeEventListenter){
      element.removeEventListenter(type,handler,false);
    }else if(element.detachEvent){
      element.detachEvent("on"+type,handler);
    }else{
      element["on"+type]=null;
    }
  },
  getEvent:function(event){
    return event ? event:window.event;
  },
  getTarget:function(event){
    return event.target || event.srcElement;
  },
  preventDefault:function(event){
    if(event.preventDefault){
      event.preventDefault();
    }else{
      event.returnValue=false;
    }
  },
  stopPropagation:function(event){
    if(event.stopPropagation){
      event.stopPropagation();
    }else{
      event.cancelBubble = true;
    }
  }
};

export { 
    EventUtil
};