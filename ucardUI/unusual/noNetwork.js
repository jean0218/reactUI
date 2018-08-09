import React, { Component } from 'react';


export default class NoNetwork extends Component{
    handelFresh() {
        location.reload();
    }

    render(){
        return (
            <div className = {"no-network " + this.props.className}>
                <img 
                    src = {require('images/ucardUI/no_network.png')} 
                    width = "100%"
                />           
                <p>啊哦，您的网络似乎出现问题了</p>
                <button className='no-network-button' onClick={this.handelFresh}>重新加载</button>
            </div>
        )
    }
}