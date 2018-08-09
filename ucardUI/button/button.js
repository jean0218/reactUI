//设置30秒才能点击一次的按钮
import React, { Component, PropTypes } from 'react';


export default class Button extends Component{
	static defaultProps = {
		time:3000,
      	className:'',
      	refName:'',
      	disabled:false,
      	onClick:() => {},
	};

    constructor(props){
        super(props);
        this.state = {
            disabled:props.disabled,
        }
    }

    componentWillReceiveProps(newProps) {
        if(this.props.disabled != newProps.disabled){
            this.setState({
                disabled: newProps.disabled
            })  
        }
    }

	handleClick = (event) => {
		let times = parseInt(this.props.time);
		const self = this;
		if (!this.state.disabled) {
			self.setState({
				disabled: true,
			});
			this.props.onClick(event);
			this.timeout = setTimeout(function() {
				self.setState({
					disabled:false,
				});
			}, times);
		}
	}

    componentWillUnmount() {
	    clearTimeout(this.timeout);
	}

	render() {
		const { disabled } = this.state;
        let events = {};
		if(!disabled){
            events = {
                onClick:this.handleClick,
            };
		}
		return(
			<button 
				type = "button" 
				ref = {this.props.refName}
				className = {this.props.className} 
				disabled = {disabled}
                {...events}
			>
				{this.props.children}
			</button>
		)		
	}
}
