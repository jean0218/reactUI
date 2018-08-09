/*---------------------------------------------------------
@ 创建时间：20170413
@ 创 建 者：lunjiao.peng
@ 版本：V0.01
@ 功能描述：从后台获取数据处理
@ param：
---------------------------------------------------------
@ 修 改 者：
@ 修改时间：
@ 修 改 点：
---------------------------------------------------------*/
import { CODE } from './const';


let XHR = function() {
    function GET(url, queryParam, tokenId) {
        let getData;
        if (tokenId) {
            getData = $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", '{"tokenId":"' + tokenId + '"}')
                },
                data: queryParam
            });
        } else {
            getData = $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                data: queryParam
            });
        }
        return getAjaxData(getData);
    }

    function POST(url, queryParam, tokenId) {
        let getData;
        if (tokenId) {
            getData = $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function(request) {
                    request.setRequestHeader("Authorization", '{"tokenId":"' + tokenId + '"}')
                },
                data: JSON.stringify(queryParam)
            });
        } else {
            console.log('执行')
            getData = $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(queryParam)
            });
        }
        return getAjaxData(getData);    
    }

    function getAjaxData(getData) {
        return new Promise(function(resolve, reject) {
            getData.then(function(result) { // 当成功的时候需要做的事情
                if (result.code === '0000') {
                    resolve({
                        data: result,
                        errMsg: ''
                    })
                }else if (result.code === CODE.DATA_LOGGED_OTHER || result.code === CODE.DATA_INVALID) {
                    reject({
                        data: result,
                        errMsg: result.errMsg
                    })

                }else{
                    reject({
                        data: result,
                        errMsg: result.errMsg
                    })
                }
                
            }).catch(function(error){
                reject({
                    data: error,
                    errMsg: error.errMsg
                })
            });
        });
    }

    return {
        GET: GET,
        POST: POST
    }
}();

export { XHR };


