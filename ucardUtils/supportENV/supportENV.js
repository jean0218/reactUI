/*---------------------------------------------------------
@ 创建时间：20170519
@ 创 建 者：lunjiao.peng
@ 版本：V0.01
@ 功能描述：根据不同的客户端载入不同的map处理机制
@ 思路:根据不同的环境判断调用不同的配置(待完成)
        app环境动态引入bridge文件
        微信环境引入js-sdk
        h5环境引入高德地图
@ param

---------------------------------------------------------
@ 修 改 者：
@ 修改时间：
@ 修 改 点：
---------------------------------------------------------*/
import { ENVIRONMENT } from '../consts/environment';
import { appClient } from './appClient';
import { weixinClient } from './weixinClient';
import { Amap } from './Amap';
import { isWeixinBrowser, isAppClient } from './platform';


let supportENV = function(){
    return{
        getENV: getENV,
        configInit: configInit,
        getCurrentLocation: getCurrentLocation,
        navigateToLocation: navigateToLocation, //导航至目标地
        marks: marks,
        //扫码
        scanCode: scanCode,
        scanQRCodeAndPay: scanQRCodeAndPay, //扫码后支付
        returnHome: returnHome,
        integralDetails: integralDetails,
        getToken: getToken,
        goPayment: goPayment,
        goUserLogin: goUserLogin,
        callNative:callNative,
    }

    function getENV(mapId, bridge, weixinUrl){
        return configInit(mapId, bridge, weixinUrl);
    }

    function configInit(mapId, bridge, weixinUrl){//环境初始化
        return new Promise(function(resolve, reject){
            let environmentName = JRE(),
                middleBridge;
            switch (environmentName) {
                case ENVIRONMENT.WEIXIN_CLIENT:
                    weixinClient.init(weixinUrl).then(function(wxResult){
                        resolve({
                            environmentName:ENVIRONMENT.WEIXIN_CLIENT,
                            middleBridge:''
                        });                    
                    }).catch(function(error){
                        console.log('微信公众号调取失败',error)
                    });
                    break;
                case ENVIRONMENT.APP_CLIENT:
                    // environment = require('./appBridge');
                    resolve({
                        environmentName:ENVIRONMENT.APP_CLIENT,
                        middleBridge:bridge
                    });
                    break;
                default:
                    let map = Amap.init(mapId);
                    resolve({
                        environmentName:ENVIRONMENT.OTHER_BROWSER,
                        middleBridge:map
                    });  
            } 
        });
        
    };


    function getCurrentLocation(mapId, bridge, weixinUrl){
        //在当前地图中显示当前位置的点,是否绘制地图
        return new Promise(function(resolve, reject){
            let environment;
            getENV(mapId, bridge, weixinUrl).then(function(result){
                environment = result;
                switch (environment.environmentName) {
                    // case ENVIRONMENT.WEIXIN_CLIENT:
                    //     resolve(weixinClient.getCurrentLocation(environment.middleBridge));
                    //     break;
                    case ENVIRONMENT.APP_CLIENT:
                        resolve(appClient.getCurrentLocation(environment.middleBridge));
                        break;
                    default: 
                        resolve(Amap.getCurrentLocation(environment.middleBridge));
                }
            });
        });
    };



    function marks(currentPosition, marksList, mapId, bridge, weixinUrl, locationStorage){//方法特殊，只能在h5中绘制多个地图点
        let map = Amap.init(mapId);
        let environment;
            getENV(mapId, bridge, weixinUrl).then(function(result){
                environment = result;
                switch (environment.environmentName) {
                    case ENVIRONMENT.WEIXIN_CLIENT:
                        Amap.getMarks(currentPosition, marksList, environment, Amap.init(mapId), locationStorage);
                        break;
                    case ENVIRONMENT.APP_CLIENT:
                        Amap.getMarks(currentPosition, marksList, environment, Amap.init(mapId), locationStorage);
                        break;
                    default:
                        Amap.getMarks(currentPosition, marksList, environment, Amap.init(mapId), locationStorage);  
                  }
            });
    };



    //调用导航
    function navigateToLocation(environment, location, marker) {
        switch (environment.environmentName) {
            // case ENVIRONMENT.WEIXIN_CLIENT:
            //     console.log('跳转至导航地图');
            //     break;
            case ENVIRONMENT.APP_CLIENT:
                appClient.navigateToLocation(environment.middleBridge, location).then(function(result){            
                    if(result.code == ENVIRONMENT.APP_CLIENT_CODE){
                        Amap.openAmap(environment, location, marker);
                    }
                });
                break;
            default:
                Amap.openAmap(environment, location, marker);              
        }        
        
    }

    //调用扫码
    function scanCode(mapId, bridge, scanCodeUrl){
        return new Promise(function(resolve, reject){
            let environment;
            getENV(mapId, bridge, scanCodeUrl).then(function(result){
                environment = result;
                switch (environment.environmentName) {
                    case ENVIRONMENT.WEIXIN_CLIENT:           
                        resolve(weixinClient.scanCode(scanCodeUrl));
                    case ENVIRONMENT.APP_CLIENT:
                        return {};
                    default:
                        resolve({
                            errorMessage:'更多内容请下载APP'
                        });
                } 
            })
        })
    }

    //调用扫码后支付
    function scanQRCodeAndPay(mapId, bridge, scanCodeUrl){
        return new Promise(function(resolve, reject){
            let environment;
            getENV(mapId, bridge, scanCodeUrl).then(function(result){
                environment = result;
                switch (environment.environmentName) {
                    case ENVIRONMENT.WEIXIN_CLIENT:              
                        resolve({
                            errorMessage:'更多内容请下载APP'
                        });
                    case ENVIRONMENT.APP_CLIENT:
                        resolve(appClient.scanQRCodeAndPay(bridge));
                    default:
                        resolve({
                            errorMessage:'更多内容请下载APP'
                        });
                } 
            })
        })
    }

    //支付
    function goPayment(params) {
        appClient.goPayment(bridge, params);
    }

    //登录
    function goUserLogin() {
        appClient.goUserLogin(bridge);
    }

    //
    function callNative(moduleName, params) {
        appClient.callNative(bridge, moduleName, params);
    }

    function returnHome(mapId, bridge, weixinUrl){
        appClient.returnHome(bridge);
        // let environment;
        // getENV(mapId, bridge, weixinUrl).then(function(result){
        //     environment = result;
        //     switch (environment.environmentName) {
        //         case ENVIRONMENT.WEIXIN_CLIENT:
        //             weixinClient.returnHome(environment.middleBridge);
        //             break;
        //         case ENVIRONMENT.APP_CLIENT:
        //             appClient.returnHome(environment.middleBridge);
        //             break;
        //         default:
        //             Amap.returnHome(environment.middleBridge);   
        //     }  
        // });
    }

    //跳转至券详情
    function integralDetails(mapId, bridge, scanCodeUrl, id){
        return new Promise(function(resolve, reject){
            let environment;
            getENV(mapId, bridge, scanCodeUrl).then(function(result){
                environment = result;
                switch (environment.environmentName) {
                    case ENVIRONMENT.WEIXIN_CLIENT:              
                        resolve({
                            errorMessage:'更多内容请下载APP',
                        });
                    case ENVIRONMENT.APP_CLIENT:
                        resolve(appClient.integralDetails(bridge, id));
                    default:
                        resolve({
                            errorMessage:'更多内容请下载APP',
                        });
                } 
            })
        })
    }

    function getToken(isLogin) {
        return appClient.getToken(bridge);
    }

}();


let JRE = () =>{
    let environment = ENVIRONMENT.OTHER_BROWSER;
    if(isWeixinBrowser()){
        console.log('weixin browser');
        environment = ENVIRONMENT.WEIXIN_CLIENT;
    }
    if(isAppClient()){
        console.log('app client');
        environment = ENVIRONMENT.APP_CLIENT;        
    }
    return environment;
}

export { 
    supportENV,
    Amap,
};
