/*---------------------------------------------------------
@ 创建时间：20171128
@ 创 建 者：lunjiao.peng
@ 功能描述：组件分页事件捕获
            包括向上翻页，向下翻页  
---------------------------------------------------------*/
import React, { Component } from 'react';
import { isAndroidClient } from 'ucardUtils';

let widowsObj = {
    pageHeight: 0,
    viewportHeight: 0,
    scrollHeight: 0,
    startPos: {},
    movePos: {
        x: 0,
        y: 0
    },
    isScrolling: 0, //isScrolling为1时，表示纵向滑动，0为横向滑动
    touchMoved: false, //设定标记，表示touchmove事件执行,屏蔽click事件
    touchMoveScroll: 0,
    touchEndScroll: 0,
}

export default class Pagination extends Component{
    static defaultProps = {
        currentPage:1,//当前页码
        onPageUp:() =>{refresh:false},//向上滑动
        onPageDown:() =>{},//向下滑动
        stopPageUp:false,//停止向上翻页
        stopPageDown:false,//停止向下翻页
    };

    componentDidMount(){
        widowsObj = {
            pageHeight: 0,
            viewportHeight: 0,
            scrollHeight: 0,
            startPos: {},
            movePos: {
                x: 0,
                y: 0
            },
            isScrolling: 0, //isScrolling为1时，表示纵向滑动，0为横向滑动
            touchMoved: false, //设定标记，表示touchmove事件执行,屏蔽click事件
            touchMoveScroll: 0,
            touchEndScroll: 0,
            isRefresh: false, //刷新动作是否被触发 
        }   
        widowsObj.viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0; //视窗的高度;  
    }
    componentWillUnmount() {
        //组件销毁时清空变量
        widowsObj = null;
    }

    handleTouchStart(event){
        var _touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
        widowsObj.startPos = {
            x: _touch.pageX,
            y: _touch.pageY,
        }; //取第一个touch的坐标值
        widowsObj.movePos = {
            x: 0,
            y: 0
        };
    }

    handleTouchMove = (event) =>{
        const { onPageUp, stopPageUp } = this.props;
        var _touch = event.targetTouches[0];
        widowsObj.movePos = {
            x: _touch.pageX - widowsObj.startPos.x,
            y: _touch.pageY - widowsObj.startPos.y
        };
        widowsObj.touchMoved = true; //设定标记，表示touchmove事件执行
        widowsObj.isScrolling = Math.abs(widowsObj.movePos.x) < Math.abs(widowsObj.movePos.y) ? 1 : 0; //isScrolling为1时，表示纵向滑动，0为横向滑动
        if (widowsObj.movePos.y >= 0 && !stopPageUp && widowsObj.isScrolling == 1) { //上拉刷新
            widowsObj.touchMoveScroll = window.pageYOffset || document.body.scrollTop;
            if (widowsObj.touchMoveScroll <= 0 && widowsObj.movePos.y >= 60) { //IOS中，scroll<0
                onPageUp({refresh:true});
                widowsObj.isRefresh = true;
            }
        }
    }
    
    handleScroll = () =>{ //tuchEnd事件
        const { currentPage, onPageUp, stopPageUp, onPageDown, stopPageDown } = this.props;
        if ((widowsObj.movePos.x != 0 || widowsObj.movePos.y != 0) && widowsObj.touchMoved) { //屏蔽click事件，屏蔽原理:click事件touchmove没有执行
            if (widowsObj.movePos.y > 0 && !stopPageUp) { //上拉刷新
                widowsObj.touchEndScroll = window.pageYOffset || document.body.scrollTop;
                if (widowsObj.isRefresh) {
                    onPageUp({refresh:false});
                }
            } else {
                var _currentPage = currentPage;
                if (currentPage >= 1 && !stopPageDown) { // 下拉加载
                    widowsObj.pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight); //真实内容的高度,

                    //黑科技，安卓点击头部返回获取的视图和真实内容高度不正确，需找到进一步的方法=s
                    if(isAndroidClient() && widowsObj.viewportHeight < widowsObj.pageHeight  && _currentPage === 1){
                        widowsObj.viewportHeight = widowsObj.pageHeight;
                    }
                    //黑科技，安卓点击头部返回获取的视图和真实内容高度不正确，需找到进一步的方法=e

                    widowsObj.scrollHeight = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0; //隐藏的高度
                    if (widowsObj.pageHeight - widowsObj.viewportHeight - widowsObj.scrollHeight < 60) { //如果满足触发条件，执行
                        _currentPage++;
                        onPageDown({
                            currentPage:_currentPage,
                        });
                    }
                }
            }
            widowsObj.touchMoved = false;
        }
    }

    render() {
        const { children, className } = this.props;
        return (
            <div 
                className = {className}
                onTouchStart = {this.handleTouchStart} 
                onTouchMove = {this.handleTouchMove} 
                onTouchEnd = {this.handleScroll}
                                
            >
                {children}
            </div>
        )
    }
}