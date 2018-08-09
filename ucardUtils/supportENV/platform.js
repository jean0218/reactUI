/*---------------------------------------------------------
@ 创建时间：20170912
@ 创 建 者：lunjiao.peng
@ 功能描述：运行平台
@ param 无
---------------------------------------------------------*/

//微信浏览器
export function isWeixinBrowser(){
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {        
        return true;
    }
    return false;
};

//支付宝
export function isAlipayBrowser(){
    var userAgent = navigator.userAgent.toLowerCase();
    if(userAgent.match(/Alipay/i)=="alipay"){
        return true;
    }
    return false;
};

export function isOtherBrowser(){
    
};


//判断是否是App客户端
export function isAppClient() {    
    if (window.bridgeHandler) {
        console.log('bridge on Android');
        return true;
    }
    if (window.webkit && window.webkit.messageHandlers) {
        var bridgeHandler = window.webkit.messageHandlers.bridgeHandler;
        if (bridgeHandler) {
            console.log('bridge on IOS');
            return true;
        }
    }
    return false;
}


export function isAndroidClient() {
    if (window.bridgeHandler) {
        console.log('bridge on Android');
        return true;
    }
    return false;
};


export function isIOSClient(){
    if (window.webkit && window.webkit.messageHandlers) {
        var bridgeHandler = window.webkit.messageHandlers.bridgeHandler;
        if (bridgeHandler) {
            console.log('bridge on IOS');
            return true;
        }
    }
    return false;
};



//web/移动端的判断
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (!(bIsIpad || bIsMidp || bIsIphoneOs || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
        console.log('PC端浏览器');
    } else {
        console.log('手机端浏览器');
    }
}
