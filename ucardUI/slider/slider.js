/*---------------------------------------------------------
@ 创建时间：
@ 创 建 者：
@ 功能描述：图片轮播组件
@ param：
// 调用<Carousel items={ImgData} kuan={100+'%'} gao={20} delayall={3} delay={1} autoplay={true}/> 宽度为100%充满整个屏幕，高度为20rem,全参数
//  简单模式<Carousel items={ImgData}/>

// delayall一个间接的时间，包括图片移动的时间和图片暂停的时间，自动播放时有效
// delay为图片移动的时间
// autoplay为图片自动播放
// const ImgData=[{src:require('../images/1.jpg')},
//               {src:require('../images/2.jpg')},
//               {src:require('../images/3.jpg')}]
---------------------------------------------------------*/
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import Circle from './circle';


var scrool;
var i = 0;
var t;
export default class Slider extends Component{
    static defaultProps = {
            kuan: 100 + '%',
            delayall: 3,
            delay: 1,
            autoplay: true,
    };

    constructor(props) {
        super(props);
        this.state = {
            i: 0,
            currentpage: 0,
            time: new Date(),
            length: this.props.items.length,
            startPos: '',
            proismove: false,
            endPos: '',
            isScrolling: '',
        }
    }

    move(n){
        let size = this.state.length + 1
        if (i == size) {
            $(".banner .img").css({
                left: 0
            });
            i = 1;
        }
        if (i == -1) {
            $(".banner .img").css({
                left: -(size - 1) * 100 + '%'
            });
            i = size - 2;
        }
        $(".banner .img").stop().animate({
            left: -i * 100 + '%'
        }, this.props.delay * 1000);

        if (i == size - 1) {
            $(".circlediv .circledivchild .circle").eq(0).addClass("checked").siblings().removeClass("checked");
        } else {
            $(".circlediv .circledivchild .circle").eq(i).addClass("checked").siblings().removeClass("checked");
        }
    }

    componentDidMount() {
        let that = this;
        if (this.props.autoplay) {
            t = setInterval(function() {
                i++;
                that.move();
            }, that.props.delayall * 1000);
        }
        $(".circlediv .circledivchild .circle").first().addClass("checked");
    }

    touchstart = (event) =>{
        var touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
        var startPos = {
            x: touch.pageX,
            y: touch.pageY,
            time: +new Date
        }; //取第一个touch的坐标值
        this.setState({
            startPos: startPos,
            proismove: false
        });
    }

    touchmove = (event) =>{
        var touch = event.targetTouches[0];
        var endPos = {
            x: touch.pageX - this.state.startPos.x,
            y: touch.pageY - this.state.startPos.y
        };
        var isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0; //isScrolling为1时，表示纵向滑动，0为横向滑动
        if (isScrolling === 0) {
            this.setState({
                proismove: true,
                isScrolling: isScrolling,
                endPos: endPos
            });
        }
    }

    touchend = (event) =>{
        let that = this;
        if (this.state.proismove) {
            if (this.state.isScrolling === 0) { //当为垂直滚动时
                if (this.props.autoplay) {
                    clearInterval(t); //鼠标悬停时清除定时器
                }
                if (this.state.endPos.x > 0) {
                    i = i - 1;
                    that.move();
                } else {
                    i = i + 1;
                    that.move();
                }
                if (this.props.autoplay) {
                    t = setInterval(function() {
                        i++;
                        that.move();
                    }, that.props.delayall * 1000);
                }
            } //当为垂直滚动时 this.state.isScrolling === 1
        } 
    }

    componentWillUnmount() {
        clearInterval(t);
    }

    hrefclick(index) {
        if(index){
            const path = `/${index}`;
            hashHistory.push(path);
        };
    }

    render() {
        let that = this;
        return (
            <div className={this.props.class+' slide-div banner'}>
                <img src={this.props.items[0].src} width="100%" className="opacity"/>
                <ul 
                    className={this.props.class+' slide-ul img'} 
                    style={{width:(that.state.length+1)*100+'%'}}
                    onTouchEnd={this.touchend} 
                    onTouchMove={this.touchmove} 
                    onTouchStart={this.touchstart}
                >
                    {
                        this.props.items.map(function(item,i){
                            return(
                                <li style={{width:1/(that.state.length+1)*100+'%'}} key={i}><a onClick={that.hrefclick.bind(that,item.index)}><img src={item.src}/></a></li>
                            )
                        })
                    }
                    <li style={{width:1/(this.state.length+1)*100+'%'}}><a onClick={that.hrefclick.bind(that,this.props.items[0].index)}><img src={this.props.items[0].src}/></a></li>
                </ul>
                <Circle 
                    class={this.props.class} 
                    items={this.props.items} 
                    circleClick={this.circleClick} 
                    currentpage={this.state.currentpage} 
                    length={this.state.length}
                />
            </div>
        );
    }
};




