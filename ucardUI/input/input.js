import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { validateRules } from 'ucardUtils';
//-------------------------------------------------------------------------------------------------------------------
//输入框组件及组件校验
//-------------------------------------------------------------------------------------------------------------------
//<InputText label="姓名"  value={name} name="realName" rule="text"/>
//                     //rule 校验规则名，校验规则在form.js的 validateRules 中,提示信息也在其中
//                     name 需要返回给数据库的字段名
//                     label 标签名
//                     class 类名，加入类名后，默认为form
//                         行的类名为 class-line,
//                         input      calss-input 
//                         错误提示   class-infor
//输入框组件
export class Input extends Component{
    static defaultProps = {
        value: '',
        rule: '',
        type: 'text',
        placeholder: '',
        class: 'form',
        maxlength: 40,
        readOnly: '',
        valueCallback:() =>{},
    };

    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
            active: this.props.value ? 'active' : '',
            type: this.props.type,
            errorMsg: ''
        }
    }

    // componentWillReceiveProps: function(newProps) {
    //     if(newProps.value.length === 0){//清空值
    //         this.setState({
    //             value: '',
    //         })
    //     }
    // },
    handleChange = (event) =>{
        var value = event.target.value,
            textReg = new RegExp(validateRules.rule[this.props.rule]),
            validate = textReg.test(value);
        if (value.length <= this.props.maxlength) {
            this.setState({
                value: value
            });
            this.props.valueCallback({
                value: value,
                validate: validate
            });
        }
    }

    handleFocus = (event) =>{
        this.setState({
            active: 'active'
        });
    }

    handleBlur = () =>{
        var value = this.state.value,
            checkResult = {
                validate: false,
                errorMsg: ''
            };
        if (value == "") {
            this.setState({
                active: '',
                validate: false,
                errorMsg: ''
            })
        } else if (value) {
            checkResult = inputHandleBlur(ReactDOM.findDOMNode(this), this, this.props.rule, value, this.props.name); //返回{validate:true|false，message:''|提示字符串}    
        }
        this.props.valueCallback({
            value: value,
            validate: checkResult.validate
        });
    }

    render() {
        var label = '',
            infor;
        if (this.state.errorMsg === '') {
            infor = '';
        } else {
            infor = '<i class="iconfont">&#xe6b6;</i>' + this.state.errorMsg;
        }
        label = this.props.label === undefined ? '' : <label>{this.props.label}</label>;
        return(
            <div className={this.state.active+" "+this.props.class+"-line"}>
                {label}
                <input
                    autoComplete="off"
                    className={this.props.class+"-input "+ this.props.class+"-input-phone" } 
                    type={this.state.type} 
                    placeholder={this.props.placeholder}
                    value={this.state.value} 
                    onChange={this.handleChange}  
                    onFocus={this.handleFocus} 
                    onBlur={this.handleBlur} 
                    name={this.props.name}
                    data-rule={this.props.rule}
                    readOnly={this.props.readOnly}
                />
                {this.props.children}
                <p className={this.props.class+"-infor"} dangerouslySetInnerHTML={{__html: infor}}/>
          </div>
        )
    }
};

function inputHandleBlur(objDom, obj, rules, value, name) {
    if (rules === null || rules === '') {
        return {
            validate: true,
            message: ''
        };
    } else {
        var checkResult = inputValidate(rules, value);
        if (checkResult.message === '') {
            objDom.getElementsByTagName("p")[0].innerHTML = "";
            obj.setState({
                errorMsg: ''
            })
        } else {
            obj.setState({
                errorMsg: checkResult.message
            })
        }
        return checkResult;
    }
};


export function inputValidate(text, value) {
    var textArr = new Array;
    if (text === null || text === undefined ) {
        formError('noRule');
        return false;
    }
    // console.log("text:",text);
    if (text.indexOf('&') > 0) { //判断校验规则是一个还是多个
        textArr = text.split('&'); //拆分校验规则                
    } else {
        textArr[0] = text;
    }
    return inputValidateArr(textArr, value);
};

function inputValidateArr(arr, value) {
    var textReg, validate = true,
        msg = '',
        validateItem = true;
    for (var i = 0; i < arr.length; i++) {
        textReg = new RegExp(validateRules.rule[arr[i]]);
        validateItem = textReg.test(value);
        msg = validateItem ? '' : validateRules.message[arr[i]];
        validate = validate && validateItem;
    }
    return {
        validate: validate,
        message: msg
    }
}
// export {
//   Input,
//   inputValidate,
// };