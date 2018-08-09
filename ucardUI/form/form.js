//-------------------------------------------------------------------------------------------------------------------
//form组件及表单提交校验
//-------------------------------------------------------------------------------------------------------------------
import React, {Component} from 'react';


export default function Form(props){
    if(!props.class){
        props.class = 'form';
    }
    return(
        <form role="form" id={props.id} className={props.class+"-content"}>              
            {props.children}
        </form>
    )
}
