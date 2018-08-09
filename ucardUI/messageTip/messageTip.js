/*---------------------------------------------------------
@ 创建时间：
@ 创 建 者：
@ 功能描述：信息框弹出提示，2秒后隐藏
@ param 
    content:提示字符
---------------------------------------------------------*/
import React, { Component, PropTypes } from 'react';
import 'style/base/widget/dialog/messageTip.css';


export default class MessageTip extends Component{
    static defaultProps = {
        content:'',
    };

    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content
        };
    }

    componentDidMount() {
        var self = this;
        if (this.state.content.length !== 0) {
            this.timeout = setTimeout(function() {
                self.setState({
                    content: ''
                })
            }, 2000);
        }
    }

    componentWillReceiveProps(newProps) {
        var self = this;
        this.setState({
            content: newProps.content
        }, function() {
            if (this.state.content.length !== 0) {
                this.timeout = setTimeout(function() {
                    self.setState({
                        content: ''
                    })
                }, 2000);
            }
        })
    }
    shouldComponentUpdate(nextProps, nextState) {
        let render = this.props.content != nextProps.content || this.state.content != nextState.content;
        return render;
    }

    componentWillUnmount() { //销毁时调用
        clearTimeout(this.timeout);
    }

    render() {
        if (this.state.content.length === 0) {
             return null;
        }
        return(
            <div className="message-tip-wrap">
                <div className="message-tip" >
                    <div className="message-tip-header"></div>
                    <div className="message-tip-content">{this.state.content}</div>
                </div>
            </div>
        );
    }
}
