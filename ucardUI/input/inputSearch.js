import React, { Component } from 'react';
import { isAndroidClient, trim } from 'ucardUtils';
import IconClearInput from '../icon/iconClearInput';
import 'style/base/ucardUI/input/searchInput.css';


export default class SearchInput extends Component{
    static defaultProps = {        
        className: '',
        placeholder: '',
        defaultValue: '',
        id: '',
        readOnly: false,
        disabled: false,
        onFocus: () => {},
        onInput: () => {},
        onChange: () => {},
        onKeyUp: () => {},
        onClear: () => {},
    };

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);

        const currProps = this.props;
        let acitveValue;
        if('acitveValue' in currProps){
            acitveValue = currProps.acitveValue;
        }else if('defaultValue' in currProps){
            acitveValue = currProps.defaultValue;
        }
        this.state = {
            acitveValue,
        };
    }

    handleChange(event){
        const targetValue = trim(event.target.value);
        if(this.state.acitveValue != targetValue && 'defaultValue' in this.props){
            this.setState({
                acitveValue:targetValue,
            });
            this.props.onChange(targetValue);
        }
    }

    handleClear(){
        this.setState({
            acitveValue:'',
        });
        this.props.onClear();
    }

    renderClearIcon(){
        const { readOnly } = this.props;
        const { acitveValue } = this.state;
        if(acitveValue.length !== 0 && readOnly !== true){
            return(
                <IconClearInput
                    onClear = {this.handleClear}
                />
            )
        }
        return null;
    }

    render(){   
        let {
            className,
            placeholder,
            id,
            onFocus,
            onKeyUp,
            onInput,
            onChange,
            readOnly,
        } = this.props;

        const { acitveValue } = this.state;
        //IOS中input键盘事件keyup、keydown、keypress支持不是很好
        let events = {
            onInput:this.handleChange,
        };
        if(isAndroidClient){
            events = {
                onChange:this.handleChange,
            };
        }

        return(
            <div 
                className = {className + " search-input-wrap"}
            >
                <i className='iconfont icon-search'>&#xe610;</i>
                <input 
                    type = "search" 
                    className = "search-input" 
                    placeholder = {placeholder}
                    id = {id}
                    value = {acitveValue}
                    onFocus = {onFocus}
                    {...events}
                    onKeyUp = {onKeyUp}
                    readOnly = {readOnly}                  
                />
                {this.renderClearIcon()}
            </div>
        );
    } 
}
