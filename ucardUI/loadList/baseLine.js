import React, { Component } from 'react';

export default function BaseLine(props){  
    return (
        <div className={props.className}>
            <div className="baseline"></div>
            <span>我是有底线的</span>
        </div>
    )
};