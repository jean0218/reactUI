/*---------------------------------------------------------
@ 创建时间：20170822
@ 创 建 者：lunjiao.peng
@ 版本：与redux搭配使用
@ 功能描述：列表组件，上拉刷新，下拉翻页
@ param
---------------------------------------------------------
@ 修 改 者：lunjiao.peng
@ 修改时间：20171128
@ 修 改 点：抽取上滑下滑事件
---------------------------------------------------------*/
import React, { Component } from 'react';
import Pagination from './pagination';
import BaseLine from './baseLine';
import MessageTip from '../messageTip/messageTip';
import DataIsNull from '../unusual/dataIsNull';


export default class LoadListError extends Component{
    renderDataListIsNoData(){
        const { noDataClassName, noDataImgUrl, noDataMsg } = this.props;
        return (
            <DataIsNull 
                className = {noDataClassName} 
                src = {noDataImgUrl} 
                errorMsg = {noDataMsg}/>
        ) 
    }   
    
    renderMessage(){
        const {messageTip} = this.props;
        if(messageTip !== null && messageTip.length > 0){
            return (
                <MessageTip content = {this.props.messageTip}/>
            )   
        }
        return null;        
    }
    
    render() {
        return (
            <div>
                {this.renderDataListIsNoData()}
                {this.renderMessage()}
            </div>
        )
    }
}


