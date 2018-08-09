import React, { Component } from "react";
import PropTypes from "prop-types";

export default function RadioGroup(props) {
    const {
        children,
        value,
        className = "",
        onChange = () => {},
    } = props;
    return (
        <div className = {className}>
            {
                React.Children.map(children, function(child, index) {
                    if(!child){return null;}
                    return React.cloneElement(child, {
                        defaultValue: value,
                        value: child.props.value,
                        labelInfo: child.props.labelInfo,
                        onChange: onChange,
                    });
                })
            }
        </div>
    );
}

RadioGroup.propTypes = {
    children: PropTypes.array,
    value: PropTypes.string,
    labelInfo: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};