/*---------------------------------------------------------
@ 创建时间：20171112
@ 创 建 者：lunjiao.peng
@ 功能描述：筛选条件的内容部分
  
---------------------------------------------------------*/
import React, { Component } from 'react';
import ScreeningContentSingle from './screeningContentSingle';
import 'style/base/widget/screeningClass/screeningContent.css';

export default class ScreeningContent extends Component{
    shouldComponentUpdate(nextProps, nextState) {
        let isRender = true;
        isRender = this.props.visible != nextProps.visible || this.props.tabName != nextProps.tabName;
        return isRender;
    }

    handleChange = (newState) =>{  
        const { content } = this.props;
        let visible = true;
        if (content.length == (newState.level + 1)) {
            visible = false;
        }
        this.props.onChange({
            classId: this.props.classId, //类id
            visible:visible,
            level: newState.level,
            levelData: {
                name: newState.name,
                value: newState.value, //值
                compareName: newState.compareName, //关键值比对值名
                item:newState.item, //当前点击对象
            }
        });
        
    }

    renderContent(){
        const { content } = this.props;
        const self = this;
        return(
            <div className = "filter-category-content-wrap">
               {
                    content.map((item, index) =>{
                        return(
                            <ScreeningContentSingle  
                                key = {"CategoryItemSingle" + index }                                                
                                defaultValue = {item.defaultValue}//默认值
                                list = {item.list}
                                onChange = {self.handleChange}
                                compareName = {item.compareName}//比较值名
                                level = {index}//当前处于第几层
                            />
                        )
                   })
               } 
            </div>
        )
    }

    componentWillUnmount() {
        $('.modal').removeClass('modal-backdrop');
        $('body').removeClass('modal-open'); //body和html必须同时设置
        $("html").removeClass('modal-open');
    }
    
    render() {
        if (this.props.visible) {
            $('.modal').addClass('modal-backdrop');
            $('body').addClass('modal-open');
            $("html").addClass('modal-open');
            return (
                <div> 
                    {this.renderContent()}
                </div>
            )
        }
        return null;
    
    }
};



