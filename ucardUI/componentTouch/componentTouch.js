/*---------------------------------------------------------
@ 创建时间：20171103
@ 创 建 者：lunjiao.peng
@ 功能描述：专用于捕获touch事件
---------------------------------------------------------*/
import React, { Component, PropTypes } from 'react';

let touchElement = {
  startPos: {},
  movePos: {x:0,y:0},
  isScrolling:0, //isScrolling为1时，表示纵向滑动，0为横向滑动
}
export default class ComponentTouch extends Component{
    static defaultProps = {
        classPrefix: '',//样式前缀
        onPreviousSlide:() =>{},
        onNextSlide:() =>{},
        onMoveUpSlide:() =>{},
        onMoveDownSlide:() =>{},
    };

    // componentDidMount() {
    //     window.addEventListener('scroll',this.handleScrollTop);
    // }
    
    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleScrollTop);
    // }

    handleTouchStart = (event) =>{
        const _touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
        touchElement.startPos = {
            x: _touch.pageX,
            y: _touch.pageY,
        }; 
        touchElement.movePos = {
            x: 0,
            y: 0
        };
    }

    handleScrollTop = () =>{
        let scrollTopNum = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0;
        console.log('scrollTopNum',scrollTopNum)
        // this.handleScroll(0, scrollTopNum);
    }

    handleTouchMove = (event) =>{
        let touch = event.targetTouches[0];
        touchElement.movePos = {
            x: touch.pageX - touchElement.startPos.x,
            y: touch.pageY - touchElement.startPos.y
        };
        this.handleScroll(touchElement.movePos.x, touchElement.movePos.y);
    }

    handleScroll(x, y){
        touchElement.isScrolling = Math.abs(x) < Math.abs(y) ? 1 : 0; //isScrolling为1时，表示纵向滑动，0为横向滑动
        if(touchElement.isScrolling === 1){
            if(y > 0){
                this.moveDownSlide();
            }else{
                this.moveUpSlide();
            }  
        }
    }
    
    moveUpSlide(){
        this.props.onMoveUpSlide();
    }

    moveDownSlide(){
        this.props.onMoveDownSlide();
    }

    previousSlide(){
        this.props.onPreviousSlide();
    }

    nextSlide(){
        this.props.onNextSlide();
    }

    GetSlideAngle(dx, dy) {
        return Math.atan2(dy, dx) * 180 / Math.PI;
    }

    GetSlideDirection(dx, dy) {
        
    }
    render() {
        const { classPrefix, children } = this.props;
        return (
            <div 
                className = {classPrefix + 'componentTouch'}
                onTouchStart = {this.handleTouchStart}
                onTouchMove = {this.handleTouchMove} 
                                
            >
                {children}
            </div>
        )
    }
}
