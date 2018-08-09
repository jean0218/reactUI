//年月组件
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

var __select = {
  startPos: {},//开始位置
  movePos: {},//滑动位置
  currentTop:0,//当前高度
  moveHeight:0,//滑动的高度
  activeIndex:0,//保存滑动过后为当前第几个
  lineHeight:3,//行高
  isMove:false
}
export default class ListSelect extends Component {
    static defaultProps = {
        class: ''
    };

    constructor(props){
        super(props);
        this.state = {
            activeIndex: 0,
        }
    }

    componentWillMount() {
        this.changeIndex(this.props.list, this.props.value);
    }

    changeIndex = (list, value) =>{
        var that = this;
        list.map(function(item, index) {
            if (item == value) {
                that.setState({
                    activeIndex: -index
                }, function() {
                    ReactDOM.findDOMNode(that).setAttribute('style', 'top:' + ((that.state.activeIndex + 1) * 3) + 'rem'); //更新组件的top值
                })
            }
        });
    }

    componentWillReceiveProps(newProps) {
        this.changeIndex(newProps.list, newProps.value);
    }


    //触摸开始
    handleTouchStart = (event) =>{
        // event.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        var _touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
        __select.startPos = {
            x: _touch.pageX,
            y: _touch.pageY,
        }; //取第一个touch的坐标值
        __select.currentTop = parseInt(ReactDOM.findDOMNode(this).style.top); //获取当前高度
        __select.isMove = false;
    }

    //滑动中
    handleTouchMove = (event) =>{
        // event.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        localStorage.setItem('scroll', false);
        var _touch = event.targetTouches[0];
        __select.movePos = {
            x: _touch.pageX - __select.startPos.x,
            y: _touch.pageY - __select.startPos.y
        };
        //当前被选中的为第一个并且向下滑动或当前为最后一个并且向上滑动时阻止其滑动
        if (this.state.activeIndex === 0 && __select.movePos.y > 0 || Math.abs(this.state.activeIndex) === this.props.list.length - 1 && __select.movePos.y < 0) {
            __select.isMove = false;
            return;
        }


        //isScrolling为1时，表示纵向滑动，0为横向滑动
        var _isScrolling = Math.abs(__select.movePos.x) < Math.abs(__select.movePos.y) ? 1 : 0;
        if (_isScrolling === 1) {
            __select.isMove = true;
            //当前移动距离
            __select.moveHeight = parseInt(__select.movePos.y) / 10;
            // __select.activeIndex =Math.floor(parseInt(Math.floor(__select.moveHeight)+__select.currentTop)/3);
            __select.activeIndex = __select.moveHeight < 0 ? Math.floor(parseInt(Math.floor(__select.moveHeight) + __select.currentTop) / 3) : Math.floor(parseInt(Math.floor(__select.moveHeight / 3) + __select.currentTop) / 3)

            // console.log("__select.moveHeight:",Math.ceil(__select.moveHeight),__select.moveHeight );
            // Math.floor(parseInt(Math.round(__select.moveHeight)+__select.currentTop)/3);
            // __select.activeIndex =__select.moveHeight<0?Math.ceil((Math.round(__select.moveHeight)+__select.currentTop)/3): Math.floor(parseInt(Math.floor(__select.moveHeight)+__select.currentTop)/3);
            this.move();
            ReactDOM.findDOMNode(this).setAttribute('style', 'top:' + (Math.floor(__select.moveHeight * .6) + __select.currentTop) + 'rem'); //更新组件的top值
               // 0.
        }
    }

    //移动算法
    move = () =>{
        var top = this.props.list.length - 1;
        //如果滑到顶部则activeIndex为初始值，如果滑到底部则activeIndex为list的长度-1
        if (__select.activeIndex > 0 && __select.moveHeight > 0) {
            __select.activeIndex = 0;
        } else if (Math.abs(__select.activeIndex) >= top && __select.moveHeight < 0 && __select.activeIndex < 0) {
            __select.activeIndex = -top;
        }
    }
    //离开屏幕
    handleTouchEnd = (event) =>{
        // event.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        var value = this.props.list[Math.abs(__select.activeIndex)],
            index = Math.abs(__select.activeIndex);
        if (__select.isMove) {
            //计算当前top是否
            this.setState({
                activeIndex: index
            }, function() {
                var that = this;
                // console.log("__select.activeIndex:",__select.activeIndex,__select.currentTop);

                // console.log("value:",value);
                // setTimeout(function(){
                ReactDOM.findDOMNode(that).setAttribute('style', 'top:' + ((__select.activeIndex + 1) * 3) + 'rem'); //更新组件的top值

                // __select.moveHeight<0?ReactDOM.findDOMNode(that).setAttribute('style', 'top:' + ((__select.activeIndex)*3) + 'rem'):ReactDOM.findDOMNode(that).setAttribute('style', 'top:' + ((__select.activeIndex+1)*3) + 'rem'); //更新组件的top值
                // },200)
                // ReactDOM.findDOMNode(this).setAttribute('style', 'top:' + (__select.activeIndex*3) + 'rem'); //更新组件的top值
                //将值上传给父组件
                this.props.onChange(value, this.props.type);
            });
        }
    }

    render() {
        var that = this;
        return(
            <ul className={'select-year '+this.props.class} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
                {this.props.list.map(function(item,index){
                   var className = index===Math.abs(that.state.activeIndex)?'active':'';
                   return <li className={className} key={index}>{item}</li>
                })}
            </ul>
        )
    }
};
