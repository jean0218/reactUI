/*---------------------------------------------------------
@ 创建时间：20170517
@ 创 建 者：lunjiao.peng
@ 版本：V0.01
@ 功能描述：布局
@ param
---------------------------------------------------------
@ 修 改 者：
@ 修改时间：
@ 修 改 点：
---------------------------------------------------------*/
import Img from '../img/img';
import React, { Component } from 'react';

export function Media(props){
	return (
      	<div className = {"media " + props.className}>
      		<div className = "media-left">
      			<Img src = {props.imgUrl} width="100%"/>
      		</div>
      		{props.children}
      	</div>
    )
};


export function MediaBody(props){
	return (
      	<div className = "media-body">   
      		<h4 className = "media-heading">
  				{props.title}
  			</h4>   			
  			{props.children}
  		</div>
    )
};


export function MediaRight(props){
    return (
      	<div className = "media-right">
      		{this.props.children}	
      	</div>
    )
};

