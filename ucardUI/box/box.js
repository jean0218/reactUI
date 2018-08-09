import React, { Component } from 'react';
import PropTypes from "prop-types";
import { isIOSClient } from 'ucardUtils';

export default function Box(props){
    const { className = "", children, onClick = () =>{} } = props;
    let events = {
        onClick:() => onClick(),
    }
    if(isIOSClient){
        events = {
            onTouchStart:(e) =>{
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                onClick();
            }
        }
    }
    return (
        <div 
            className = {className}
            {...events}
        >  
            {children}
        </div>
    ) 
};

Box.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]).isRequired,
    onClick: PropTypes.func,
};