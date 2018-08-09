/*---------------------------------------------------------
@ 创建时间：20171128
@ 创 建 者：lunjiao.peng
@ 功能描述：
    LoadList增加pageUp,pageUpKey,pageDownKey参数，
    原LoadList组件中的current参数无效
---------------------------------------------------------*/
import React, { Component } from 'react';
import LoadList from './loadList';

const LoadListWithKey = (WrappedComponent) =>
    class extends WrappedComponent{
        static defaultProps = {
            onPageUp:() => {},//向上翻页
        };

        static displayName = `HOC(${getDisplayName(WrappedComponent)})`;

        componentDidMount(){//必须要有，不然后执行WrappedComponent的componentDidMount方法
        }

        handlePageUp = (newState) =>{
            if(newState.refresh){
                return;
            }
            this.props.onPageUp(this.props.pageUpKey);
        }
        
        handlePageDown = (newState) =>{
            this.props.onPageDown(newState, this.props.pageDownKey);
        }

        render(){
            return(
                <WrappedComponent 
                    {...this.props}
                    onPageUp = {this.handlePageUp}
                    onPageDown = {this.handlePageDown}
                />
            )
        }
    }

function getDisplayName(WrappedComponent){  
    return WrappedComponent.displayName ||
           WrappedComponent.name ||
           'Component';
}

export default LoadListWithKey(LoadList);
