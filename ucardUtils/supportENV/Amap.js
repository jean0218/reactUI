/*---------------------------------------------------------
@ 创建时间：20170505
@ 创 建 者：lunjiao.peng
@ 版本：V0.01
@ 功能描述：高德地图返回的通用接口,封装的底层
@ param
    init(mapId)                 地图初始化,mapId,需要展示的地图id
    getCurrentLocation(map)     获取当前定位信息,map 是初始化后的地图对象
    getMarks(currentPosition, marksList, environment, webBridge, locationStorage)
        currentPosition, 
        marksList, 
        environment, 
        webBridge, 
        locationStorage
---------------------------------------------------------
@ 修 改 者：
@ 修改时间：
@ 修 改 点：
---------------------------------------------------------*/
import { calculationMeter } from '../distance';
import { locationInforProcessing, supportENV } from './supportENV';
import { EventUtil } from '../eventUtil';
import { ENVIRONMENT } from '../consts/environment';
import { bd09ToGcj02 } from '../coordinate';

let mapIcon = {
    currentLocation:'./images/currnet_location.gif',
    carWashPoint:'./images/carWash_netPoint.png',
    currentCarWashPoint:'./images/carWash_current_newPoint.png'
}
let Amap = function(){
    let geolocation;
    function init(mapId){//地图初始化
        let map = new AMap.Map(mapId, {
            resizeEnable: true,
            zoom: 12 //地图显示的缩放级别
        });
        return map;
    };

    function loadBmapScript() {  
        // var script = document.createElement("script");  
        // script.src = "http://webapi.amap.com/maps?v=1.3&amp;key=89233de15d0fec97eb33e77777b7fce0&callback=initialize";//此为v2.0版本的引用方式  
        // let node = document.body.firstChild.nextSibling;
       
        // let div = document.getElementById('map');
        // console.log(div);
        // document.body.insertBefore(script,node);  
        require.config({　　　　
            paths: {　　　　　　
                "amap": "http://webapi.amap.com/maps?v=1.3&key=89233de15d0fec97eb33e77777b7fce0&callback=init"　　　　
            }　　
        });

        // require(['amap'], function() {
        //   window.init = function() {
        //     require(['require-initMap'], function(mapIniter) {
        //       mapIniter.init();
        //     })
        //   }
        // })


    }
    
    function timeout() {
      let p = new Promise(function(resolve, reject) {
        setTimeout(function() {
          reject({
            errorMessage: '获取地图超时',
            longitude: '', //经度
            latitude: '' //纬度
          })
        }, 1);
      });
      return p;
    }
    function navigateToLocation(environment, location) {//跳转至导航
        console.log('跳转至导航，暂无');
        return true;
    }

    function returnHome(environment){
        console.log('返回首页，暂无');
        return true;
    }
    function getCurrentLocation(map){
        return new Promise(function(resolve, reject){
            let citysearch = new AMap.CitySearch(),
                cityName = '',
                provinceName = '';
            
            map.plugin('AMap.Geolocation', function() {
                geolocation = new AMap.Geolocation({
                    showButton: true,        //显示定位按钮，默认：true
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                    buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    buttonPosition:'RB',
                    maximumAge:1000            //缓存毫秒数。定位成功后，定位结果的保留时间
                });
                map.addControl(geolocation);
                geolocation.getCurrentPosition();
                AMap.event.addListener(geolocation, 'complete', function(data){
                    console.log('高德地图定位成功',data);
                    citysearch.getLocalCity(function(status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            if (result && result.city && result.bounds) {                                
                                resolve({
                                    errorMessage:'',
                                    provinceName:result.province,
                                    positionCityName:result.city,

                                    selectedCityName: result.city,

                                    longitude: data.position.getLng(), //经度
                                    latitude: data.position.getLat() //纬度
                                });                           
                            }
                        } 
                    });
                    
                });//返回定位信息
                AMap.event.addListener(geolocation, 'error', function(error) { //解析定位错误信息
                    console.log('高德地图定位失败', error);
                    reject({
                        errorMessage: error.message,
                        provinceName:'湖南省',
                        positionCityName:'长沙市',
                        longitude: '',
                        latitude: ''
                    });
                });
            });
        });
    }

    //调起高德地图
    function openAmap(environment, location, marker) {
        switch (environment.environmentName) {
            case ENVIRONMENT.WEIXIN_CLIENT:
                alert('更多功能请下载APP');
                break;
            // case ENVIRONMENT.APP_CLIENT:
            //     resolve(appClient.getCurrentLocation(environment.middleBridge));
            //     break;
            default:      
                environment.middleBridge.poiOnAMAP({
                    name: location.placemark,
                    location: location
                });
        }
    }
    //绘制多个点
    function getMarks(currentPosition, marksList, environment, webBridge, locationStorage) {
        let currentMark,
            btnNavigation,
            btnToPhone,
            selectNavigate,
            btnCancel,
            locationInfor,
            positionPoint,
            gaoDeLocation;
        let icon = new AMap.Icon({
                image: mapIcon.currentLocation,
                size: new AMap.Size(24, 24)
            }),
            listIcon = new AMap.Icon({
                image: mapIcon.carWashPoint,
                size: new AMap.Size(18, 18)
            }),
            currentIcon = new AMap.Icon({ //点击时的洗车点图标
                image: mapIcon.currentCarWashPoint,
                size: new AMap.Size(24, 24)
            });           

        let infoWindow = new AMap.InfoWindow({//窗体配置
            isCustom: true,
        });    

        let markers = [],
            firstMarker;
        for (let i = 0, marker; i < marksList.length; i++) {
            gaoDeLocation = bd09ToGcj02(marksList[i]['longitude'],marksList[i]['latitude']);//数据存储的API是百度的API，需要转换成高德的
            positionPoint = [gaoDeLocation.longitude, gaoDeLocation.latitude];
            if(i == 0){
                firstMarker = positionPoint;
            }
            marker = new AMap.Marker({
                icon:listIcon,
                position: positionPoint,               
                map: webBridge,

            });
            marker.content = markerContent(marksList[i], environment, marker);   
            marker.on('click',markerClick);
            // marker.emit('click', {target: marker});
            markers.push(marker);            
        }

        //判断定位城市与选择城市是否相等，如不相等不绘制当前定位
        if(locationStorage.cityName == locationStorage.positionCityName || marksList.length == 0){
            currentMark = new AMap.Marker({
                icon:icon,
                showPositionPoint: true,
                position:[currentPosition.longitude, currentPosition.latitude], 
                map: webBridge,
            });
            webBridge.setZoomAndCenter(13, [currentPosition.longitude, currentPosition.latitude]);
        }else{
            webBridge.setZoomAndCenter(12, firstMarker);
        };   

        function markerClick(e) {  
            for (let i = 0, marker; i < marksList.length; i++) {
                markers[i].setIcon(listIcon);
            }
            e.target.setIcon(currentIcon);
            infoWindow.setContent(e.target.content);
            infoWindow.open(webBridge, e.target.getPosition());      
        }
        // webBridge.setFitView();

    }


    //========非通用化模块，专门针对洗车弹出的图层 ========       
    function markerContent(item, environment, marker){//点击mark后创建的图层

        let conentArr = [],
            locationInfor,
            section = document.createElement('section'),
            btnNavigation = document.createElement('button');
        section.className = "carwash-infor postion-bottom";
        btnNavigation.type =  "button";
        btnNavigation.className = "btn-map";
        btnNavigation.textContent = "路线导航";
        btnNavigation.onclick = function(e){
            locationInfor = {
                "latitude": item.latitude,
                "longitude": item.longitude,
                "placemark": item.name
            };
            supportENV.navigateToLocation(environment, locationInfor, marker);
        };
        conentArr.push('<h4 class="title"><span class="name">');
        conentArr.push(item.name);
        conentArr.push('</span><span class="float-right">');
        conentArr.push(calculationMeter(item.distance));
        conentArr.push('</span></h4>');
        conentArr.push('<address>');
        conentArr.push(item.address);
        conentArr.push('</address><p>');
        conentArr.push(item.telephone);
        conentArr.push('</p>');
        section.innerHTML = conentArr.join('');
        section.appendChild(btnNavigation);
        section.appendChild(phone(item.phone));
        return section;
    }

    function phone(arr){//手机号码处理，如果是个单个直接拨号，如果是多个弹出图层由用户选择拨打哪个号码
        let phoneElement = [],
            itemHtml = [],
            len = arr.length;
        if(len > 1){
            phoneElement = document.createElement('button');
            phoneElement.type = "button";
            phoneElement.className = "btn-map";
            phoneElement.textContent = "电话咨询";
            phoneElement.onclick = function(e){
                document.body.appendChild(phoneContent(arr));                        
            }
            return phoneElement;
        }
        phoneElement = document.createElement('a');
        phoneElement.setAttribute('href', 'tel:' + arr[0]);
        phoneElement.className = "btn-map";
        phoneElement.textContent = "电话咨询";
        return phoneElement;
    }
    function phoneContent(arr) { // 多个号码的弹出图层
        let phoneHtml = [],
            element = document.createElement('div');
        element.className = 'modal-backdrop';
        element.onclick = function(){
            element.outerHTML = '';
        };
        phoneHtml.push('<div class="select-navigate-content" >');
        arr.map(function(item) {            
            phoneHtml.push('<a class="btn btn-navigate" href="tel:');
            phoneHtml.push(item);
            phoneHtml.push('">');
            phoneHtml.push(item);
            phoneHtml.push('</a>');
        });
        phoneHtml.push('<button type="button" class="btn btn-navigate top05" id="jsBtnCancel">');
        phoneHtml.push('取消');
        phoneHtml.push('</button>');
        phoneHtml.push('</div>');
        element.innerHTML = phoneHtml.join('');
        return element;
    }
    //========非通用化模块，专门针对洗车弹出的图层 ========  

  return{
    timeout:timeout,
    init:init,
    getCurrentLocation:getCurrentLocation,
    getMarks:getMarks,
    openAmap:openAmap,
    navigateToLocation:navigateToLocation,
    returnHome:returnHome
  }
}();
export { 
    Amap   
};
//获取经纬度，获取后台数据无返回时需要增加超时处理