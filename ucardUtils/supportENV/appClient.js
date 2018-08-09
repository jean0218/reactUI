/*---------------------------------------------------------
@ 创建时间：20170522
@ 创 建 者：lunjiao.peng
@ 版本：V0.01
@ 功能描述：App客户端返回的通用接口
@ param

---------------------------------------------------------
@ 修 改 者：
@ 修改时间：
@ 修 改 点：
---------------------------------------------------------*/
import { Amap } from './supportENV'; 
import { isAndroidClient, isIOSClient } from './platform';
import { bd09ToGcj02, wgs84ToGcj02 } from '../coordinate';
import getCookie from './shared/getCookie';


const appClient = function(){
    return {
        getCurrentLocation: getCurrentLocation,
        navigateToLocation: navigateToLocation,
        returnHome: returnHome,
        scanQRCodeAndPay: scanQRCodeAndPay,
        integralDetails:integralDetails,
        getToken:getToken,
        goUserLogin:goUserLogin,
        goPayment:goPayment,
        callNative:callNative,
    }

    function getCurrentLocation(environment){
        return new Promise(function(resolve, reject){
            let getAppLocation = environment.bridge.requestLocation();        
            getAppLocation.then(function(result){
                console.log('APP返回',result)
                //let province = locationInforProcessing.provinceHandle(result); //处理省
                
                let gaoDeLocation;
                //安卓返回的是百度的数据，需转化
                if(isAndroidClient()){
                    gaoDeLocation = bd09ToGcj02(result.longitude, result.latitude);//app返回是百度的数据
                }
                //IOS返回的是wsg84(wsg84->gcj02))
                if(isIOSClient()){
                    gaoDeLocation = wgs84ToGcj02(result.longitude, result.latitude);
                }                
                //注：后端返回的也是百度的数据
                resolve({
                    errorMessage:'',
                    provinceName: result.province, //省
                    cityName: result.selectedCity, //app选择的城市  
                    shortCityName: result.selectedCity, //市简称
                    selectedCityName: result.selectedCity,

                    positionCityName: result.city, //定位城市
                    positionShortName: result.city, //市简称                    

                    latitude: gaoDeLocation.latitude, //经度
                    longitude: gaoDeLocation.longitude, //纬度 
                })
          },function(error){
                reject({
                    errorMessage:error,
                    errorCode:error
                })
          }).catch(function(error){
                reject({
                    errorMessage:error,
                    errorCode:error
                })
          });
        });
    }

    function navigateToLocation(environment, location) {//跳转至导航
        return environment.bridge.navigateToLocation(location);
    }

    function returnHome(environment){
        return environment.bridge.goBack();
    }

    function scanCode(environment){
        return environment.bridge.scanQRCode();
    }

    function scanQRCodeAndPay(environment){
        return environment.bridge.callForBrotherNative({
            module: 'scanQRCodeAndPay', 
            params:'scanQRCodeAndPay'
        });
    } 

    function goPayment(environment, params){
        callNative(environment, 'payment', params);
    } 

    function integralDetails(environment, integralId){
        return environment.bridge.callForBrotherNative({
            module: 'integralDetails', 
            params:{id:integralId}
        });
    }  

    function goUserLogin(environment){
        callNative(environment, 'login', '');
    }

    //获取user数据
    function getToken(environment, isLogin) {
        var tokenId;
        if (!environment.bridge.isDataypNative()) {
            document.cookie = "tokenId=18104:E76CB160399ED213B0BF3095E5BAA74A"
        }
        tokenId = getCookie("tokenId");

        if ((tokenId == null || tokenId.length == 0) && isLogin) {
            goUserLogin(environment);
        }
        return tokenId;
    }

    function callNative(environment, moduleName, params){
        const bridgePromise = environment.bridge.callForBrotherNative({
            module: moduleName,
            params: params,
        });
        console.log('callNative params:'+params.appID);
        bridgePromise.then(function(data) { //调桥成功
            console.log('成功callForBrotherNative', data);
        }, function(reason) { //调桥失败
            console.log('调桥失败callForBrotherNative', reason);
        });
    }

}();
export { 
    appClient
};

function shortNameHandle(name) { //市短名处理
    let shortName = '';
    shortName = name.indexOf("市") === -1 ? name.substring(0, 4) : name.substring(0, name.length - 1);
    return shortName;
}

