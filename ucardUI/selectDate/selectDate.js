import React, { Component } from 'react';
import { MessageTip } from 'ucardUI';
import SelectBody from './selectBody';


//计算年份
let caculateObj = {
    scrollTop: 0
}
let dateNow = new Date;
export default class SelectDate extends Component {
    static defaultProps = {
        year: dateNow.getFullYear(),
        month: dateNow.getMonth() + 1,
        class: 'select-dates',
        open: false
    };

    constructor(props){
        super(props);
        this.state = {
            item: {
                year: this.props.item.year,
                month: this.props.item.month,
                item: this.props.item.item,
            },
            open: false,
            messageTip: ''
        }
    }

    handleChangeClick = () =>{
        //在图层更新后再设置scrolltop的值，即didupdate
        // caculateObj.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        // $('body').addClass('modal-open');
        // $("html").addClass('modal-open');

        this.setState({
            open: true
        }, function() {
            $('.select-date').on('touchmove', function(e) {
                e.preventDefault()
            })
        })
    }

    handleChange = (value) =>{
        // if(value.year&&value.month&&value.item){
        this.setState({
            item: value,
            messageTip: ''
        })
        // }
    }

    handleClick = (value) =>{
        // event.preventDefault();
        // event.stopPropagation();
        // console.log("this.state.item:",this.state.item,!this.state.item.year);
        // // console.log("value:",value);
        // $('body').removeClass('modal-open');
        // $("html").removeClass('modal-open');
        if (value) {
            this.setState({
                open: false,
                messageTip: '',
                item: {
                    year: this.props.item.year,
                    month: this.props.item.month,
                    item: this.props.item.item,
                },
            });
            localStorage.setItem('scroll', true);
            return;
        }
        if (!this.state.item.year && !this.state.item.month) {
            this.setState({
                messageTip: '请选择正确的年份与月份'
            })
            return;
        }
        if (!this.state.item.year) {
            this.setState({
                messageTip: '请选择正确的年份'
            })
            return;
        }
        if (!this.state.item.month) {
            this.setState({
                messageTip: '请选择正确的月份'
            })
            return;
        }
        if (!value && this.state.item.year && this.state.item.month && this.state.item.item) {
            this.setState({
                open: false,
                messageTip: ''
            })
            localStorage.setItem('scroll', true);
            // $('.bill-list').off('touchmove',function(e){e.preventDefault()})

            // console.log("this.state.item:",this.state.item);
            this.props.handleChange(this.state.item);
        }
    }

    handleTouchMove = (event) =>{
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        return false;
    }

    handleTouchEnd = (event) =>{
        // console.log("className:",event.target.className,event.target.innerHTML);
        event.preventDefault();
        event.stopPropagation();
        if (event.target.innerHTML == '取消') {
            this.handleClick(true);
            // document.body.scrollTop = caculateObj.scrollTop;
            return;
        }
        if (event.target.innerHTML == '确定') {
            this.handleClick(false);
            return;
        }
        if (event.target.className == 'select-date') {
            localStorage.setItem('scroll', true);
            // console.log("aaa");
            // event.preventDefault();
            // event.stopPropagation();
            // $('body').removeClass('modal-open');
            // $("html").removeClass('modal-open');
            // document.body.scrollTop = caculateObj.scrollTop;
            this.setState({
                open: false,
                item: {
                    year: this.props.item.year,
                    month: this.props.item.month,
                    item: this.props.item.item,
                },
            });
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            item: newProps.item,
        })
    }
    // shouldComponentUpdate:function(nextProps,nextState){
    //   return nextState.item!=this.state.item
    // },
    render() {
        var __this = this;
        return(
            <div className={this.props.class} > 
                <div onClick={this.handleChangeClick}>{this.props.children}</div>
                {this.state.open ?
                    <div className='select-date' onTouchMove={this.handleTouchMove}  onTouchEnd={this.handleTouchEnd}>
                        <div className='select-date-content'>
                            <div className='select-date-title'>
                                <a >取消</a>
                                <a onClick={this.handleClick.bind(null,false)}>确定</a>
                            </div>
                            <SelectBody onChange={this.handleChange} year={this.state.item.year} month={this.state.item.month}/>
                        </div>
                    </div> : ''
                }
                <MessageTip content={this.state.messageTip}/>
            </div>
        )
    }
};
