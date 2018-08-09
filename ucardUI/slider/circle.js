import React, { Component } from 'react';

export default function Circle(props){
    return(
        <div className={props.class+' circlediv'}>
            <div className='circledivchild'>
                {props.items.map(function(item,i){
                    return <span className='circle' key={i}></span>
                })}
            </div>
        </div>
    )
};
