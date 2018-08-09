import React, { Component } from 'react';
import 'style/base/ucardUI/unusual/dataIsNull.css';


export default function DataIsNull(props){
    let { errorMsg, className } = props; 
    if(!errorMsg && errorMsg.length === 0){
        errorMsg = '没有找到符合条件的记录';
    }
    if(!className){
        className = 'data-isNull';
    }
    return (
        <div className = {className}>
            <img 
                src = {require('images/ucardUI/data_isNull.png')} 
                width = "100%"
            />           
            <p>{errorMsg}</p>
        </div>
    )
    
}