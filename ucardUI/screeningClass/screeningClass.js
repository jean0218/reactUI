/*---------------------------------------------------------
@ 创建时间：20171101
@ 创 建 者：lunjiao.peng
@ 功能描述：筛选分类组件
    ** 二级分类数据需要增加parentCode数值，便于数据比较
@ return
        [{
            id: 0, //类id
            tabName: //标题名
            tabKey://标题值
            tabContent:[{
                    level:1,
                    levelData:{
                        name: '全城',
                        value: defaultTag,//值
                        compareName: 'id', //关键值比对值名
                    },
                },{
                    level:2,
                    levelData:{
                        name: '全城',
                        value: defaultTag,//值
                        compareName: 'id', //关键值比对值名
                    },
                }]
---------------------------------------------------------*/
import React, { Component } from 'react';
import ScreeningTitle from './screeningTitle';
import { isEqual } from 'ucardUtils';
import 'style/base/widget/screeningClass/screeningClass.css';

let classQueryParam;
export default class ScreeningClass extends Component{
    static defaultProps = {
        className: '',
        top: false,
        parentCode:'parentCode',//上一级分类的关键词
        parentName:'parentName',//上一级分类的关键名称
    };

    constructor(props){
        super(props);
        const titleGroup = initTitleGroup(this);
        classQueryParam = getQueryParam(this);
        this.state = {
            titleGroup:titleGroup,//专用于存储内容的显示与隐藏
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps.isUpdatePage){
            classQueryParam = getQueryParam(this);
            const titleGroup = initTitleGroup(this);
            this.setState({
                titleGroup:titleGroup
            });
            $('.modal').removeClass('modal-backdrop');
            $('body').removeClass('modal-open');
            $("html").removeClass('modal-open');
        }
        
    }

    componentWillUnmount() {
        classQueryParam = null;
        $('.modal').removeClass('modal-backdrop');
        $('body').removeClass('modal-open');
        $("html").removeClass('modal-open');
    }

    handleTouchMove(event){  
        event.stopPropagation();//阻止冒泡
        event.nativeEvent.stopImmediatePropagation();
        return false;
    }

    handleChangeTitle = (newState) =>{//点击title    
        let isReturn = false;    
        const titleGroup = this.state.titleGroup;
        titleGroup.map(function(item, index) { //去重
            if (item.classId === newState.classId) {
                item.visible = newState.visible;
                if(!newState.visible){
                    isReturn = true;
                }
            } else {
                item.visible = false;
            }
        });
        this.setState({
            titleGroup:titleGroup
        });
        if(isReturn){//全部隐藏时传值
            this.props.onChange(classQueryParam);
        }
       
    }

    handleChangeItem = (newState) =>{//点击任意item拿到所有参数集合
        const { parentCode, parentName } = this.props;               
        let isEdit = false;//此次是否有修改数据

        let thisQueryParam = classQueryParam;
        let currentItem = thisQueryParam[newState.classId],
            thisLevel = newState.level, 
            currentItemData = currentItem.tabContent[thisLevel].levelData,            
            thisData = newState.levelData,
            thisValue = thisData.value; 
        
        if(currentItemData.value != thisValue){//比较当前层的值
            currentItem.tabContent[thisLevel].levelData = newState.levelData;
            isEdit = true; 
        }else if(thisData.item[parentCode] != currentItemData.item[parentCode]){//比较parentCode是否相等
            currentItem.tabContent[thisLevel].levelData = newState.levelData;
            isEdit = true; 
        }


        //更新是否隐藏
        let preLevel = currentItem.tabContent[thisLevel - 1];//上一层 
        let thisClassLevel = currentItem.tabContent.length; 
        if(thisClassLevel === (thisLevel + 1)){//判断选择的是否是最后一层,隐藏查询
            if(isEdit){//内容改变才更改title
               if(preLevel && newState.levelData.value.length === 0){//最后一级的value为空，获取父层name
                    currentItem.tabName = newState.levelData.item[parentName];
                }else{
                    currentItem.tabName = newState.levelData.name;
                }  
            }                                    

            let currentTitle = this.state.titleGroup[newState.classId];
            currentTitle.visible = newState.visible;  
            $('.modal').removeClass('modal-backdrop');
            $('body').removeClass('modal-open');
            $("html").removeClass('modal-open');
            let titleGroup = this.state.titleGroup;
            titleGroup[newState.classId] = currentTitle;
            this.setState({
                titleGroup: titleGroup
            })
        }else{//选择的不是最后一层，清空下一层的值
            let itemLen = currentItem.tabContent.length;
            currentItem.tabName = newState.levelData.name;
            for(let i = thisLevel + 1; i < itemLen; i++){
                currentItem.tabContent[i].levelData.name = currentItem.tabName;
                currentItem.tabContent[i].levelData.value = "";
                currentItem.tabContent[i].levelData.item = {};
            }
        }
        thisQueryParam[newState.classId] = currentItem;
        classQueryParam = thisQueryParam;
        this.props.onChange(thisQueryParam);       
    }

    renderTitle(currentTitleGroup, titleGroup){
        return(
            <ScreeningTitle
                navList = {currentTitleGroup}
                titleGroup = {titleGroup}
                onChange = {this.handleChangeTitle}
                className = {this.props.headClassName}
            />
        )
    }

    render() {
        const { titleGroup } = this.state;  
        const currentTitleGroup = initTitleGroup(this);
        const self = this; 
        return (
            <div 
                className={'modal filter-category' + this.props.className}
                onTouchMove = {this.handleTouchMove}
            >
                {this.renderTitle(currentTitleGroup, titleGroup)}
                {
                    React.Children.map(this.props.children, function(child, index) {
                        return React.cloneElement(child, { //把父组件的值传给每个子组件 
                            visible:titleGroup[index].visible,
                            classId: index,
                            onChange: self.handleChangeItem,                            
                            content:child.props.content 
                        })
                    })
                }
            </div>
        )
    }
}

function initTitleGroup(that){
    let titleGroup = [],
        titleItem = {};
    React.Children.map(that.props.children, function(child, index) {      
        titleItem.classId = child.props.order;
        titleItem.visible = false; 
        titleItem.tabName = child.props.tabName;
        titleGroup.push(titleItem);
        titleItem = {};
    });
    return titleGroup;
}

function getQueryParam(that){//初始化查询参数            
    let queryParam = [],
        queryItem = {},
        tabContent = [],
        contentLevel = {},
        tabName = '';
    React.Children.map(that.props.children, function(child, index) {
        tabName = child.props.tabName;
        queryItem.classId = child.props.order; //类id
        queryItem.tabName = tabName, //标题名
        child.props.content.map((contentItem, contentIndex) =>{   
            contentLevel.level = contentIndex;
            contentLevel.levelData = {
                name: tabName ? tabName : '',
                value: contentItem.defaultValue ? contentItem.defaultValue : '',//值
                nearValue: contentItem.nearValue ? contentItem.nearValue : '',
                compareName: contentItem.compareName ? contentItem.compareName : '', //关键值比对值名
                item: {},
            };
            tabContent.push(contentLevel);            
            contentLevel = {};            
        });
        queryItem.tabContent = tabContent;
        queryParam.push(queryItem);
        queryItem = {};
        tabContent = [];  

    });
    return queryParam;
}