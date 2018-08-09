/*---------------------------------------------------------
@ 创建时间：20171026
@ 创 建 者：lunjiao.peng
@ 功能描述：倒数组件，可配置是否保存在本地
@ param：
---------------------------------------------------------*/
import React, { Component, PropTypes } from 'react';
import Button from '../button/button';

export default class ButtonCountDown extends Component{
    static defaultProps = {
        classPrefix: 'countDown',
        text:'获取验证码',
        bizType:'bizType',//验证码类型
        onClick:() => {},//click事件的 handler
        refName:'beginCountdown',
        disabled:false,
        value:'',//依赖值，通常是手机号码，依赖值为空时，按钮不可点击
    };

    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            disabled:props.disabled,
        };
    }

    componentWillMount(){//初始渲染前获取本地缓存值
        this.getCountdown();
    }

    componentWillReceiveProps(newProps) {
        if(this.props.disabled != newProps.disabled){
            const { bizType } = this.props;
            const countdown = localStorage.getItem("ButtonCountDown_End_" + bizType);
            if (countdown > 0 && countdown != null && countdown != '') {
                this.beginCountdown();
                return;
            }
            if(newProps.value.length !== 0){
               this.setState({
                    disabled: newProps.disabled
                }) 
            }
        }
    }

    handleClick = () => { //获取验证码         
        this.props.onClick();        
    }

    getCountdown(){
        const { bizType } = this.props;
        const countdown = localStorage.getItem("ButtonCountDown_End_" + bizType);
        if (countdown > 0 && countdown != null && countdown != '') {
            this.beginCountdown();
        }
    }

    initCountdown(){
        let thisTime = parseInt(new Date().getTime() / 1000); //获取时间戳
        let endTime = thisTime + 60;
        const { bizType } = this.props;
        localStorage.setItem("ButtonCountDown_Start_" + bizType, endTime);
        this.beginCountdown();
    }

    beginCountdown() {
        const { bizType } = this.props;        
        var _newtime = parseInt(new Date().getTime() / 1000),//获取初始时间
            _endtime = localStorage.getItem("ButtonCountDown_Start_" + bizType) - _newtime;//设置结束时间  
        localStorage.setItem("ButtonCountDown_End_" + bizType, _endtime);
        if (_endtime > 0) {
            let text = "重新发送(" + localStorage.getItem("ButtonCountDown_End_" + bizType) + ")";
            this.setState({
                disabled:true,
                text: text,
            })
        } else {
            return this.clearCounDown();
        }
        const self = this;
        this.timeout = setTimeout(function() {
            self.beginCountdown();
        }, 1000)
    }

    clearCounDown = () => {
        const { bizType, text, disabled, value } = this.props;
        localStorage.setItem("ButtonCountDown_End_" + bizType, null);
        localStorage.setItem("ButtonCountDown_Start_" + bizType, null);
        this.setState({
            disabled:value.length != 0 ? false : true,
            text: text,
        })
        return;
    }

    componentWillUnmount() { //销毁时调用
        clearTimeout(this.timeout);
    }

    render(){
        const { classPrefix, refName } = this.props;
        const { disabled, text } = this.state;
        let classes = classPrefix + "-btn";
        return(
            <Button
                type = "button" 
                disabled = {disabled}
                className =  {classes} 
                ref = {refName}
                onClick = {this.handleClick}
            >
                {text}
            </Button>
        )
    }
}
