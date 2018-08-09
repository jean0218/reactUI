/*---------------------------------------------------------
@ 创建时间：20170822
@ 创 建 者：lunjiao.peng
@ 版本：与redux搭配使用
@ 功能描述：列表组件，上拉刷新，下拉翻页
@ param
---------------------------------------------------------
@ 修 改 者：lunjiao.peng
@ 修改时间：20171128
@ 修 改 点：抽取上滑下滑事件
---------------------------------------------------------*/
import React, { Component } from 'react';
import Loading from '../loading/loading';
import MessageTip from '../messageTip/messageTip';
import LoadListSuccess from './loadListSuccess';
import LoadListError from './loadListError';


export default class LoadList extends Component{
    static propTypes = {
        list: React.PropTypes.array.isRequired
    };
    
    static defaultProps = { //设置样式、错误提示初始化值
        listClassName: 'datalist-list', //列表样式
        baselineClassName: 'datalist-baseline', //我是有底限的样式
        noDataClassName: 'datalist-nodata', //没有数据时的样式
        noDataImgUrl: require('images/ucardUI/data_isNull.png'), //没有数据时显示的图片
        noDataMsg: '没有找到符合条件的记录', //没有数据时显示的文字内容
        list: [],
        currentPage: 1,
        stopFlip: false,
        messageTip: '',
        itemKeyName:'',//item中的key的值，该key主要用于优化性能
        isRefresh:false, //上滑重新请求
        onPageUp:() =>{},//向上翻页
        onPageDown:() =>{},//向下翻页
    };
    
    componentDidMount() { 
        this.scrollFlip(1);
    }
      
    scrollFlip = (pageNo) =>{
        this.props.onPageDown(pageNo);
    }    
    
    render() {
        const { list, currentPage, isLoading, stopFlip, endPage } = this.props;
        if(isLoading && currentPage === 1){
            return (
                <Loading 
                    content = '加载中'
                    classPrefix = "init"
                />
            )
        }else if(list != null && list.length > 0){
            return (
                <LoadListSuccess 
                    {...this.props}
                />
            );
        }else{
            return (
                <LoadListError
                    {...this.props}
                />
            )
            
        } 
    }
}


