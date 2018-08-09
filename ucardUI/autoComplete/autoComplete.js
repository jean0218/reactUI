//-------------------------------------------------------------------------------------------------------------------
//自动补全
//  onGetWordList = {this.handleGetWordList} //获取关键词方法，传入value参数
//  keyWordList = {list}//接收上一级的关键列表
//-------------------------------------------------------------------------------------------------------------------
import React, { Component, PropTypes } from 'react';
import AutoCompleteContent from './autoCompleteContent';
import { isAndroidClient, trim } from 'ucardUtils';


var _autoCompleteCountDown = 60,
    _autoCompleteOnChange = false;
export default class AutoComplete extends Component{
    static defaultProps = {
            class: '',
            inputId: '',
            value: '',
    };

    constructor(props){
        super(props);
        _autoCompleteCountDown = 60;
        _autoCompleteOnChange = false;
        var _value = this.props.value;
        this.state ={
            value: _value.length == 0 ? '' : _value
        }
    }

    //IOS中input键盘事件keyup、keydown、keypress支持不是很好
    handleChange = (event) =>{
        _autoCompleteCountDown = 4;
        _autoCompleteOnChange = true;
        var _value = trim(event.target.value),
            _self = this;
        _self.setState({
            value: event.target.value
        })
        if (_value.length == 0) {
        } else if (trim(this.state.value) != _value) { //排除两次输入的值一样的情况 
            _self.props.onGetWordList(_value); //执行父层的获取关键词
        }
        //处理在苹果中如果没有点击确定按钮，自动搜索内容
        var _thisValue = event.target.value,
            _lastValue = this.state.value;
        if (_thisValue.length > 0 && _lastValue.length > 0 && _thisValue != _lastValue) {
            _autoCompleteCountDown = 4;
        }
    }

    componentWillReceiveProps(newProps) {
        var flag = newProps.resultList !== null && newProps.resultList !== 'null' ? false : true;
        this.props.changeState(flag);
    }

    handleKeyUp = (event) =>{ //监听回车事件
        $('.input-kw-form').on('submit', function(e) {
            e.preventDefault();
        })
        if ((this.state.value !== '') && (event.keyCode === 13)) { //回车
            this.props.onChange(this.state.value);
        }
    }

    handleClear = () =>{ //清除搜索关键词
        this.setState({
            value: ''
        });
        this.props.onGetWordList('');
    }

    handleSelectItem = (newstate) =>{
        if(typeof(newstate) === 'object'){
            this.setState({
                value: newstate.name
            });
        }else{
            this.setState({
                value: newstate
            });
        }
        this.props.onChange(newstate);
    }

    componentWillUnmount() { //组件销毁时调用
        _autoCompleteCountDown = null;
        _autoCompleteOnChange = null;
    }

    render() {
        var _contentHtml = '',
            _clearHtml = '';
        if (this.props.keyWordList.length != 0) {
            _contentHtml = <AutoCompleteContent changeState={this.props.changeState} list={this.props.keyWordList} onChange={this.handleSelectItem}/>;
        }
        if (this.state.value.length != 0) {
            _clearHtml = <i className='iconfont icon-close' onClick={this.handleClear}>&#xe642;</i>
        }
        return <div className={"autocomplete "+this.props.class} >
                <div className="autocomplete-key">
                    <i className='iconfont icon-search'>&#xe610;</i>
                    {isAndroidClient ? <input type="text" className="autocomplete-input" id={this.props.inputId}
                          placeholder={this.props.placeholder} 
                          onChange={this.handleChange} 
                          value={this.state.value}
                          onKeyUp={this.handleKeyUp}
                          onFocus={this.handleFocus}
                    /> : <form className='input-kw-form' action='javascript:return true;'>
                          <input type="search" className="autocomplete-input" id={this.props.inputId}
                          placeholder={this.props.placeholder} 
                          onInput={this.handleChange}
                          value={this.state.value}
                          onKeyUp={this.handleKeyUp}
                          onFocus={this.handleFocus}
                    /></form>}
                    {_clearHtml}
                </div>
                {_contentHtml}
           </div>
    }
}
