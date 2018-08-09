import React, { Component } from 'react';


export default function TitleItem(props){
    let { item, visibleItem } = props;
    let visible = visibleItem.visible;
    return (
        <div 
            onClick = { () =>{
                visibleItem.visible = !visible;
                if (!visibleItem.visible) { //解决顶部置顶的bug
                    $('.modal').removeClass('modal-backdrop');
                    $('body').removeClass('modal-open'); //body和html必须同时设置
                    $("html").removeClass('modal-open');
                }
                props.onChange(visibleItem);
            }}
            className = {visible ? 'filter-category-title-item active' : 'filter-category-title-item'}
        >
            <span className='firstspan' data-value = {item.tabName}>{item.tabName}</span>&nbsp;
            {visible ? <i className='iconfont' >&#xe61b;</i> : <i className='iconfont' >&#xe675;</i>}
        </div>
    )
}
