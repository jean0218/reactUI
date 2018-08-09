import React, { Component } from "react";
import PropTypes from "prop-types";

export default function Radio(props) {
    const {
        defaultValue,
        value,
        labelInfo = "",
        checked = false,
        onChange,
    } = props;
    let checkedAttr = {
        checked,
    };
    if (defaultValue == value) {
        checkedAttr = {
            checked: true,
        };
    }

    return (
        <label className = "label-radio">
            <input
                type = "radio"
                {...checkedAttr}
                value = {value}
                onChange = {event => {
                  onChange(event.target.value);
                }}
            />
            {labelInfo}
        </label>
    );
}

Radio.propTypes = {
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    labelInfo: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};