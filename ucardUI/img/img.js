import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Loading from '../loading/loading';
import 'style/base/widget/img.css';

export default class Img extends Component{
	static propTypes = {
		className:PropTypes.string,
		src:PropTypes.string,
		onClick:PropTypes.func,
	};	
	
	static defaultProps = {
		src:'',
		className:'',
		onClick:() => {},
		onLoad:() => {},
	};

	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleLoad = this.handleLoad.bind(this);
		// this.handleError = this.handleError.bind(this);				
	}

	handleClick(){
		this.props.onClick();
	}

	// handleError(){
		
	// }

	handleLoad(){
		const imgDOM = ReactDOM.findDOMNode(this);
		this.props.onLoad({
			DOM:imgDOM,
			width:imgDOM.width,
			height:imgDOM.height
		});
	}

	render(){
		const{ src, className } = this.props;
		if(src.length === 0){
			return <Loading />
		}
		return	<img  
        	src = {src} 
        	className = {className}
        	width = "100%"
        	onClick = {this.handleClick}
        	onLoad = {this.handleLoad}
        />
	}
}

