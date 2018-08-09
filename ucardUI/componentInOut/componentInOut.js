import React, { Component, PropTypes } from 'react';
import 'style/base/widget/animation.css';


export default class ComponentInOut extends Component{
	static defaultProps = {
		type:'SlideInDown'
	};

	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event){
		if(event.target.className=='animated slide-inDown modal-backdrop'){
			this.props.onChange('');
		}
	}

	handleTouchMove(event){		
	   	event.preventDefault();
		event.stopPropagation();
  		event.nativeEvent.stopImmediatePropagation();
  		return false;
	}
	
	render() {
		const { type, children } = this.props;
		let className = '';
		switch(type){
			case 'SlideInUp':
				className = 'slide-inUp';
			default:
				className = 'slide-inDown';
		}
		return (
			<div className = {'animated ' + className + ' modal-backdrop'}
 				onTouchMove = {this.handleTouchMove}  
 				onClick = {(event) => {
	            	this.handleClick(event)
	            }}
	        >
				{children}
			</div>
		)
	}
}

