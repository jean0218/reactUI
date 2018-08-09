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
import Loading from '../loading/loading';
import MessageTip from '../messageTip/messageTip';



export default class LoadListSuccess extends Component{ 
    constructor(props){
        super(props);
        this.state =  {
            isRefreshDOM: false, //上拉刷新
        };
    }

    handlePageUp = (newState) =>{
        if(this.props.isRefresh){
            this.setState({
                isRefreshDOM: newState.refresh
            },function(){
                if(!newState.refresh){
                    this.scrollFlip(1);
                }
            })
        }  
        this.props.onPageUp(newState);      
    }
    
    handlePageDown = (newState) =>{
        const { stopFlip, endPage } = this.props;
        if (newState.currentPage >= 1 && !stopFlip && !endPage) {
            this.scrollFlip(newState.currentPage);
        }
    }
      
    scrollFlip = (pageNo) =>{
        this.props.onPageDown(pageNo);
    }
    
    renderDataList(){       
        var listIndex,
            self = this;
        const { children, itemKeyName } = this.props;
        let itemKey;
        return this.props.list.map(function(item, listIndex, array) {
            itemKey = item[itemKeyName] ? item[itemKeyName] : listIndex;
            return React.Children.map(children, (child, index) =>{
                if(!child){return;}
                return React.cloneElement(child, {
                    item,
                    onChange:self.handleChange,
                    index:listIndex,
                    array,
                    key:itemKey,
                });
            });
        });
    }    
   
    renderDataListLoading(){
        const { isLoading } = this.props;
        if(isLoading){
            return (
                <Loading content = '加载中'/>
            )
        }
        return null;       
    }
    
    renderMessage(){
        const {messageTip} = this.props;
        if(messageTip.length > 0){
            return (
                <MessageTip content = {this.props.messageTip}/>
            )   
        }
        return null;        
    }
    
    renderIsRrfreshDOM(){
        if(this.state.isRefreshDOM){
            return (
                <Loading content = '加载中,松开之后刷新'/>
            )
        }
        return null;
    }
    
    renderBaseLine(){
        const { endPage } = this.props;
        if(endPage){
            return (
                <BaseLine className = {this.props.baselineClassName}/>
            )
        }
        return null;
    }
    
    render() {
        const { listClassName, isFirstLoading, list, currentPage, isLoading, stopFlip, endPage } = this.props;
        const stopPageDown = stopFlip || endPage;
        return (
            <Pagination
                className = {listClassName} 
                currentPage = {currentPage}
                onPageUp = {this.handlePageUp} 
                onPageDown = {this.handlePageDown} 
                stopPageDown = {stopPageDown}
            >
                {this.renderIsRrfreshDOM()}
                {this.renderDataList()}
                {this.renderDataListLoading()}
                {this.renderMessage()}
                {this.renderBaseLine()}
            </Pagination>
        );
    }
}


