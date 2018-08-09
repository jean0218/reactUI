/*---------------------------------------------------------
@ 创建时间：20170922
@ 创 建 者：lunjiao.peng
@ 功能描述：封装的fetch方法，代替ajax
@ param：
    url [type] obj
    body  [type] obj
---------------------------------------------------------*/
// var Promise = require('es6-promise').polyfill();
// import 'whatwg-fetch';
// import 'fetch-detector'
// import 'fetch-ie8'



export default function fetchRequest(method, url, body, file) {
    console.log('fetchRequest',method, url, body, file)
    method = method.toUpperCase();
    if(file === 'file'){        
        return fetch(url, {
            method,
            headers:{
                'Content-Type': 'application/json',
                // 'Accept':'application/json',
            },
            body:JSON.stringify(body),
        }).then((res) => {
            if (res.status === 401) {
                return Promise.reject('Unauthorized');
            } else {   
                return res;
            }
        })
    }

    if (method === 'GET') {
        // body = undefined;
    } else {
        body = JSON.stringify(body);
    }
    return fetch(url, {
        method,
        headers:{
            'Content-Type': 'application/json',
            'Accept':'application/json',
        },
        body:body,
    }).then((res) => {
        // if(response.status!==200){
        //     console.log("存在一个问题，状态码为："+response.status);
        //     return;
        // }
        if (res.status === 401) {
            return Promise.reject('Unauthorized');
        } else {   
            return res.json();
        }
    })
}


export const fetchGetFile = (url, body) => fetchRequest('GET', url, body, 'file');
export const fetchGet = (url, body) => fetchRequest('GET', url, body);
export const fetchPost = (url, body) => fetchRequest('POST', url, body);
export const fetchPut = (url, body) => fetchRequest('PUT', url, body);
export const fetchDel = (url, body) => fetchRequest('DELETE', url, body);