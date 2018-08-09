import React, { Component } from 'react';




export default function IconClearInput(props){ 
    return(
        <i 
            className = 'iconfont icon-clear-input' 
            onClick = {props.onClear}
        >&#xe642;</i>
    );
}