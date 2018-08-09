import React, { Component } from 'react';
import 'style/base/widget/loading/loading.css';

export default function Loading(props) {
    const { classPrefix } = props;
    let className = "loading";
    if(classPrefix && classPrefix.length != 0){
        className = "loading " + classPrefix + '-loading';
    }
    return(
        <div className = {className}>
            <div className = "la-ball-clip-rotate la-dark la-sm">
                <div></div>
            </div>
            &nbsp;&nbsp;
            {props.content}
        </div>
    )
}  