/*---------------------------------------------------------
@ 创建时间：20171027
@ 创 建 者：lunjiao.peng
@ 功能描述：模态框
---------------------------------------------------------*/
import React, { Component, PropTypes } from 'react';
import Button from '../button/button';
import 'style/base/widget/dialog/modal.css';


export default class Modal extends Component{
    static defaultProps = {
        title: '',//标题
        classPrefix: '',//样式前缀
        visible:false,//对话框是否可见visible
        closable:true,//是否显示右上角的关闭按钮
        onOk:() => {},//点击确定回调
        onCancel:() => {},//点击遮罩层或右上角叉或取消按钮的回调
        okText:'确定',//确认按钮文字
        cancelText:'取消',//取消按钮文字
        footer:'',//底部内容，当不需要默认底部按钮时，可以设为 footer={null}
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
        };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            visible: newProps.visible
        })
    }

    renderTitle(){
        const { title } = this.props;
        if(title.length === 0){
            return null;
        }
        return(
            <div className="modal-header">
                {title}
            </div>
        )
    }

    renderClose(){
        const { closable } = this.props;
        if(!closable){
           return null;
        }
        return(
            <span 
                className = "modal-close" 
                onClick = {this.handleCancel}
            >
                <i className = "iconfont ">&#xe63d;</i>
            </span>
        ) 
        
    }

    handleOk = () =>{
        this.hiddenModal();
        this.props.onOk();
    }

    handleCancel = () =>{
        this.hiddenModal();
        this.props.onCancel();
    }

    renderFooter(){
        const { footer, okText, cancelText } = this.props;
        if(footer == null){
            return null;
        }
        if(footer.length === 0){
            return(
                <div className = "modal-footer">
                    <Button 
                        onClick = {this.handleCancel} 
                        className = "btn-cancle"
                    >
                        {cancelText}
                    </Button>
                    <Button 
                        onClick = {this.handleOk} 
                        className = "btn-ok"
                    >
                        {okText}
                    </Button>
                </div>
            )
        }
        return footer;
    }

    hiddenModal(){
        this.setState({
            visible:false
        });
    }

    render() {
        const { visible } = this.state;
        const { classPrefix } = this.props;
        if(!visible){
            return null;
        }
        const className = classPrefix + " modal-wrap ";
        return(
            <div className = {className}>
                <div className = "modal-content">
                    {this.renderClose()}
                    {this.renderTitle()}
                    <div className = "modal-body">
                        {this.props.children}
                    </div>
                    {this.renderFooter()}      
                </div> 
            </div>
        )
    }
}
