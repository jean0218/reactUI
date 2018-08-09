/*---------------------------------------------------------
@ 创建时间：
@ 创 建 者：
@ 功能描述：
@ param：
---------------------------------------------------------*/
import React, { Component, PropTypes } from 'react';

export default class Option extends Component{
    static defaultProps = {
        class: '',
        value: '',
        valueCallback:() =>{},
    };
    
    handleClick = (event) =>{
        this.setState({
            value: event.target.getAttribute('value')
        });
        this.props.valueCallback({
            value: event.target.getAttribute('value'),
            title: this.props.title
        });
    }

    render() {
        if(isAndroid){
          return <div className={this.props.class} value={this.props.value} onClick={this.handleClick}>
                {this.props.children}
          </div>
        }
        return(
            <div className={this.props.class} value={this.props.value} onTouchEnd={this.handleClick}>
                {this.props.children}
            </div>
        )
    }
}