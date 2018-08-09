import React, { Component } from 'react';


export default class TabbarHeader extends Component{
    static defaultProps = {
        active: '',
    };

    handleClick = (value, event) =>{
        this.props.onChange(value);
    }

    render() {
        var _self = this,
            itemAcitve = '';
        return(
            <div className="tabbar-header">
                {
                    this.props.navlist.map(function(item, index) {
                        if (_self.props.showIndex == index) {
                            return <div className={"tabbar-header-item"+" active"} onClick={_self.handleClick.bind(null,index)} key={index}>{item.title}</div>
                        }else{
                            return <div className={"tabbar-header-item"} onClick={_self.handleClick.bind(null,index)} key={index}>{item.title}</div>
                        }
                    })
                }            
            </div>
        )
    }
};