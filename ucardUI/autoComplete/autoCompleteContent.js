import React, { Component, PropTypes } from 'react';

export default function AutoCompleteContent(props){
    return (
        <ul className="autocomplete-content">
            {
                props.list.map(function(item,index){
                    if(typeof(item) === 'object'){
                        return(
                            <li 
                                key = {index} 
                                onClick = {() =>{
                                    props.onChange(item);
                                }} 
                            >
                                <i className='iconfont'>&#xe610;</i>&nbsp;{item.name}
                            </li>
                        )
                    }else{
                        return(
                            <li 
                                key = {index} 
                                onClick = {() =>{
                                    props.onChange(item);
                                }} 
                            >
                                <i className='iconfont'>&#xe610;</i>&nbsp;{item}
                            </li>
                        ) 
                    }
                    
                })
            }
        </ul>
    )
}
