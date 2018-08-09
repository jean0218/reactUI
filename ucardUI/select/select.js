/*---------------------------------------------------------
@ 创建时间：
@ 创 建 者：
@ 功能描述：多选框select组件
@ param：
---------------------------------------------------------*/
import React, { Component, PropTypes } from 'react';
import modal from '../dialog/modal';


export default class Select extends Component{
    static defaultProps = {
        class: 'form',
        open: 'false',
        chooseTitle: '',
        chooseValue: ''
    };
    
    constructor(props) {        
        super(props);
        return {
            open: this.props.open,
            chooseTitle: this.props.chooseTitle,
            chooseValue: this.props.value
        }
    }

    componentWillReceiveProps(newProps) { // 当组件获取新属性的时候调用，第一次渲染不会调用
        return {
            open: newProps.open,
        }
    }

    handleClick = () =>{ //显示模态框
        this.setState({
            open: 'true'
        })
    }

    handleopenCallback () {

    }

    handleValueCallback = (newState) =>{ //选定后的值
        console.log('newState', newState)
        this.setState({
            chooseValue: newState.value,
            chooseTitle: newState.title,
            open: 'false'
        })
    }

    render() {
        var _self = this;
        return(
            <div className={this.props.class} >              
                <div className="select-title" onClick={this.handleClick}>
                    {this.props.chooseTitle}<i className="iconfont ">&#xe65e;</i>
                </div>
                <div className="select-content">
                    <modal visible={this.state.open} title={this.props.title}>
                        {
                            React.Children.map(this.props.children, function(child) {
                                return React.cloneElement(child, { //把父组件的值传给每个子组件                        
                                    valueCallback: _self.handleValueCallback
                                })
                            })
                        }
                    </modal>
                </div>            
            </div>
        )
    }  
}
