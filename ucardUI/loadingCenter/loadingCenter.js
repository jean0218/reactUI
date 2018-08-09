/*---------------------------------------------------------
@ 创建时间：
@ 创 建 者：请稍候，居中显示
@ param 
    content:提示字符
---------------------------------------------------------*/
import React from 'react';
import 'style/base/widget/loading/loadingCenter.css';

export default function LoadingCenter(props){
    let tip = props.content;
    if(!props.content || props.content.length == 0){
        tip = '请稍候...';
    }
    return(
        <div className="data-wrap">
            <div className="data-loader">
              <div className="loader">
                <div className="line-spin-fade-loader">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>        
              <p className="loader-msg">{tip}</p>
            </div>
        </div>
    )
}
