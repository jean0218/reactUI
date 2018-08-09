// 通过 require 的方式依赖 React，ReactDOM
var React = require('react');
var ReactDOM = require('react-dom');
import TitleItem from './titleItem';


export default function ScreeningTitle(props){
    return (
        <div className="filter-category-title">
            {
                props.navList.map(function(item, index){
                    return(
                        <TitleItem 
                            key = {index}
                            id = {index}
                            item = {item}
                            visibleItem = {props.titleGroup[index]}
                            onChange = {(newState) =>{
                                props.onChange(newState);
                            }}            
                        />
                    )
                })
            }
        </div>
    )
}
