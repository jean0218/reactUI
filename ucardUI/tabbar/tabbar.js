/*---------------------------------------------------------
@ 创建时间：
@ 创 建 者：lunjiao.peng
@ 功能描述：选项卡组件
@ param：
---------------------------------------------------------*/
import React, { Component } from 'react';
import TabbarHeader from './tabbarHeader';


export default class Tabbar extends Component{
    static defaultProps = {
        className: '',
        showIndex: 0,
        onChange:() =>{},
    };

    constructor(props){
        super(props);
        this.state = {
            showIndex: this.props.showIndex
        }
    }

    handleChange = (value) =>{
        this.setState({
            showIndex: value
        })
        this.props.onChange(value);
    }

    render() {
        var showIndex = this.state.showIndex;
        return (
            <div className={this.props.className+" tabbar"}>
                <TabbarHeader navlist={this.props.navlist} showIndex={showIndex} onChange={this.handleChange}/>
                <div className="tabbar-content">
                    {
                        React.Children.map(this.props.children, function(child, index) {
                            if (showIndex == index) {
                                return React.cloneElement(child, { //把父组件的值传给每个子组件 
                                    className: 'tabbar-content-item'
                                })
                            }
                        })
                    }
                </div>
            </div>
        )
    }
};