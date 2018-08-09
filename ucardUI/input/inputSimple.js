import React, {Component} from 'react'

export default class InputSimple extends Component{
	constructor(props) {
		super(props);

		// this.setStat{

		// }
	}
	render() {
		return (
				<div className={this.props.class+ "-line"} >
					<input 
						className={this.props.class+"-input"}
						placeholder={this.props.placeholder}
						data-rule={this.props.rule}
						name={this.props.name}
						disabled={this.props.disabled}
						id={this.props.id}
						maxLength={this.props.maxlength}/>

				</div>
			)
	}
}