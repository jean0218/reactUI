var counter = 0
class Request {
    constructor() {
        counter += 1
        this.id = counter
    }

    toNativeRequest() {
        return JSON.stringify(
          {
            "id": this.id,
            "endpoint": this.endpoint,
            "params": this.params
          }
        );
    }
}

class Bridge {
    constructor() {
        this.requests = new Map();
    }

    isDataypNative() {
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

    // 获取位置数据
    requestLocation() {
        var request = this.createRequest(EndPoints.Location);

        this.postMessage(request);
        return request.promise;
    }

    // 获取位置数据
    requestUser() {
        var request = this.createRequest(EndPoints.User);
        this.postMessage(request);
        return request.promise;
    }

    // 获取常规数据
    requestData(endpoint, params = {}) {
        // TBD:
    }

    // 发送邀请
    sendInvitation(params) {
        var request = this.createRequest(EndPoints.SendInvitation, params);
        this.postMessage(request);
        return request.promise;
    }

    // 到地理上某地的线路
    navigateToLocation(params){
      var request = this.createRequest(EndPoints.NavigateToLocation, params);
      this.postMessage(request);
      return request.promise;
    }

    // 退出 web 模块, 返回到上一级
    goBack(){
      var request = this.createRequest(EndPoints.GoBack);
      this.postMessage(request);
      return request.promise;
    }

    // 改变 Navbar Title
    updateTitle(params){
      var request = this.createRequest(EndPoints.UpdateTitle, params);
      this.postMessage(request);
      return request.promise;
    }

    // 调用 Native 模块
    callForBrotherNative(params){
      var request = this.createRequest(EndPoints.CallNative, params);
      this.postMessage(request);
      return request.promise;
    }

    // 领取 388 礼包
    draw388(){
      var request = this.createRequest(EndPoints.Draw388);
      this.postMessage(request);
      return request.promise;
    }

    // 创建请求
    createRequest(endpoint, params = {}) {
        var request = new Request();
        request.endpoint = endpoint
        request.params = params

        var promise = new Promise(function(resolve, reject) {
            request.resolver = resolve;
            request.rejecter = reject;
        });
        request.promise = promise;

        return request;
    }

    // 传递消息给 Native 方
    postMessage(request) {
        this.requests.set(request.id, request);

        if (!this.isDataypNative()) {
            console.log('bridge on UnkownBrowser');
            return;
        }

        var reqStr = request.toNativeRequest();
        console.log('bridge call Native postMessage  endpoint=' + request.endpoint);
        if (window.bridgeHandler) { // Android
            window.bridgeHandler.postMessage(reqStr);
        } else { // iOS
            var bridgeHandler = window.webkit.messageHandlers.bridgeHandler;
            if (bridgeHandler) {
                bridgeHandler.postMessage(reqStr);
            }
        }
    }

    // 当 Native 方获取结果后会回调此方法
    onNativeCallback(reqID, result, ret) {
        var request = this.requests.get(reqID);

        var object = {};
        if (ret) {
            object = ret;
        }

        if (request) {
            if (result === 0) {
                request.resolver(object);
            } else {
                request.rejecter(object);
            }
            this.requests.delete(reqID);
        }
    }
}

// 功能点列表
export const EndPoints = {

    // 数据
    Location: 'Location',
    User: 'User',

    // 动作
    SendInvitation: 'SendInvitation',
    NavigateToLocation: 'NavigateToLocation',
    GoBack: 'GoBack',
    UpdateTitle: 'UpdateTitle',
    CallNative: 'CallNative',
    Draw388: 'Draw388'
}
export var bridge = new Bridge();

// test
