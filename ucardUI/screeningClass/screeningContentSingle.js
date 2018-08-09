import React, { Component } from 'react';

export default class ScreeningContentSingle extends Component {

    handleChange = (newState) =>{
        const { level, compareName} = this.props;
        this.props.onChange({
            level: level,
            name:newState.name,
            value:newState[compareName],
            compareName:compareName,
            item:newState
        });
    }

    renderItem(index, item, isActive) {
        return(
            <SingleItem 
                key = {index}
                item = {item}
                isActive = {isActive }
                onChange = {this.handleChange}
            />
        )
    }

    render() {
        var self = this,
            _compareName = this.props.compareName;
        const {defaultValue} = this.props;
        return (
            <div className="filter-category-content" >
                {
                    this.props.list.map(function(item, index) {
                        if (defaultValue === undefined || defaultValue.length === 0 || defaultValue === null) { //没有默认值
                            if (index === 0) {
                                return self.renderItem(index, item, true);
                            }
                            return self.renderItem(index, item, false);
                        }
                        if (self.props.defaultValue == item[_compareName]) {
                            return self.renderItem(index, item, true);
                        }
                        return self.renderItem(index, item, false);
                    })
                }
            </div>
        )
    }
};

function SingleItem(props){
    const { item, isActive } = props;
    let className = 'filter-category-item',
        rightIco = '' ;
    if(isActive){
        className = 'filter-category-item active';
        rightIco = <i className='iconfont icon-right' >&#xe600;</i> ;
    }
    return(
        <div
            className = {className}
            onClick = {() =>{
                props.onChange(props.item);
            }} 
        > 
            {item.logUrl2 != undefined ? <img src={item.logUrl2} width="100%" className="tag-logo"/> : '' }                            
            {item.name}
            {rightIco}
        </div>
    )
}
