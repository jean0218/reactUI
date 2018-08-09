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
import { supportENV } from './supportENV'; 
import { weixin } from './weixinBridge'; 

let weixinClient = function(){

    return{
        init:init,
        getCurrentLocation:getCurrentLocation,
        navigateToLocation:navigateToLocation,
        scanCode:scanCode,
        navigateToLocation:navigateToLocation,
        returnHome:returnHome      
    }


    function init(weixinUrl) {//调用微信扫码接口
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: weixinUrl,
                dataType: 'json',
                success: function(data) {
                    // console.log("weixin调取成功:", data);
                    if (data != '') {
                        weixin.configInit(data);
                        wx.ready(function() {
                            resolve(data);
                        });
                        wx.error(function(res) {
                            console.log('失败:', res.errMsg)
                            reject(res);
                        });
                    }
                },
                fail: function(res) {
                    console.log('调用fail', res);
                    reject(res);
                },
                cancel: function(res) {
                    console.log('调用cancel', res);
                    reject(res);
                },
                tigger: function(res) {
                    console.log('调用tigger', res);
                    reject(res);
                }
            });
        });
    }

    function scanCode(scancodeUrl) {//调用微信扫码接口
        return new Promise(function(resolve, reject) {            
            wx.scanQRCode({
                needResult: 1,
                success: function(res) {
                    resolve(res);
                }
            });            
        });
    }


    function getCurrentLocation(environment){
        return new Promise(function(resolve, reject){
        //     wx.getLocation({
        //         type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        //         success: function (result) {
        //             var latitude = result.latitude; // 纬度，浮点数，范围为90 ~ -90
        //             var longitude = result.longitude; // 经度，浮点数，范围为180 ~ -180。
        //             var speed = result.speed; // 速度，以米/每秒计
        //             var accuracy = result.accuracy; // 位置精度
                    resolve({
                        errorMessage:'',
                        positionCityName:'长沙',//模拟用啊啊啊啊啊啊
                        latitude: 28.228109, //经度
                        longitude: 112.938814, //纬度 
                    })
            //     }
            // });
            // wx.getLocation({
            //     type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            //     success: function (res) {   
                    // resolve({
                    //     errorMessage:'',
                    //     positionCityName:'长沙',//模拟用啊啊啊啊啊啊
                    //     latitude: 2222, //经度
                    //     longitude: 11222, //纬度 
                    // })
            //     },
            //     cancel: function(error) {
            //         console.log('调用cancel', res);
            //         reject(error);
            //     }
            // });
        });
    }

    function navigateToLocation(environment, location) {//跳转至导航
        console.log('跳转至导航，暂无');
        return true;
    }

    function returnHome(environment){
        console.log('返回首页，暂无');
        return true;
    }

}();
export { 
    weixinClient
};

//获取经纬度，获取后台数据无返回时需要增加超时处理