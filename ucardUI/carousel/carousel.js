import React, { Component, PropTypes } from 'react';
import Img from '../img/img';
import 'style/base/widget/animation.css';

let touchIMG = {
  startPos: {},
  movePos: {x:0,y:0},
  isScrolling:0, //isScrolling为1时，表示纵向滑动，0为横向滑动
}

export default class Carousel extends Component{
    static propTypes = {
        className:PropTypes.string,
        photoArray:PropTypes.array,
        onChange:PropTypes.func,
    };

    static defaultProps = {
        defaultIndex:0,
        onChange:()=>{},
    };

    constructor(props){
        super(props);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.state = {
            activeIndex:this.props.defaultIndex,
            animationClass:''
        }
    }

    handleTouchStart(event) {
        const _touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
        touchIMG.startPos = {
            x: _touch.pageX,
            y: _touch.pageY,
        }; 
        touchIMG.movePos = {
            x: 0,
            y: 0
        };
    }

    handleTouchEnd(event) {
        const touch = event.changedTouches[0];
        touchIMG.movePos = {
            x: touchIMG.startPos.x -  touch.pageX,
            y: touchIMG.startPos.y - touch.pageY 
        };
        //console.log('移动象数',touchIMG.movePos)
        const that = this;
        const direction = this.GetSlideDirection(touchIMG.movePos.x, touchIMG.movePos.y);
        switch (direction) {
            case 0:
                //console.log("没滑动");
                break;
            case 1:
                //console.log("向上");
                break;
            case 2:
                //console.log("向下");
                break;
            case 3:
                //console.log("向左");
                this.previousSlide();
                break;
            case 4:
                //console.log("向右");
                this.nextSlide();
                break;
            default:
        }
    }

    GetSlideAngle(dx, dy) {
        return Math.atan2(dy, dx) * 180 / Math.PI;
    }

    GetSlideDirection(dx, dy) {
        var result = 0;
        //如果滑动距离太短
        if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
            return result;
        }

        var angle = this.GetSlideAngle(dx, dy);
        if (angle >= -45 && angle < 45) {
            result = 4;
        } else if (angle >= 45 && angle < 135) {
            result = 1;
        } else if (angle >= -135 && angle < -45) {
            result = 2;
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 3;
        }
        return result;
    }

    nextSlide() {
        const { photoArray } = this.props;
        const { activeIndex } = this.state;
        let nextIndex = activeIndex + 1 < photoArray.length ? activeIndex + 1 : 0;
        if(activeIndex === nextIndex){
            return;
        }        
        this.sliderImage({
            nextIndex:nextIndex,
            className:'slide-inLeft',
        });
    }

    previousSlide() {
        const { photoArray } = this.props;
        const { activeIndex } = this.state;
        let nextIndex = activeIndex - 1 < 0 ? photoArray.length-1 : activeIndex - 1;
        if(activeIndex === nextIndex){
            return;
        }
        this.sliderImage({
            nextIndex:nextIndex,
            className:'slide-inRight',
        });
    }

    sliderImage({nextIndex, className}){
        this.setState({
            activeIndex: nextIndex,
            animationClass:className
        })
        this.props.onChange({
            activeIndex: nextIndex
        })
    }

    renderAlbumPhoto(){
        const { photoArray } = this.props;
        const { activeIndex, animationClass } = this.state;
        let activeClass = '';
        return photoArray.map((item, index)=>{
            activeClass = ''
            if(index === activeIndex){
                activeClass = ' active ' + animationClass;
            }
            return(
                <div 
                    className = {"carousel-group-item animated" + activeClass}
                    key = {'albumPhoto' + index}
                >
                    <Img 
                        src = {item}
                        onClick = {self.handlePhotoClick}
                    />
                </div>
            )
        })
    }

    render(){
        const { className } = this.props;
        return(
            <div className = {"carousel-group " + className}
                onTouchStart = {this.handleTouchStart}
                onTouchMove = {this.handleTouchMove}
                onTouchEnd = {this.handleTouchEnd}
                onClick = {this.handleContentClick}
            >
                {this.renderAlbumPhoto()}
            </div>
        )
    }
}