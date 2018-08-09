import React, { Component, PropTypes } from 'react';
import caculateDate from './caculateDate';
import ListSelect from './listSelect';


export default class SelectBody extends Component {
    constructor(props){
        super(props);
        this.state = {
            year: this.props.year,
            month: this.props.month,
            monthList: []
        }
    }

    componentWillMount() {
        // console.log("this.props.year:",this.props.year,this.props.month);
        this.isCurrentYear(this.props.year, this.props.month);
    }

    isCurrentYear = (propsYear, propsMonth) =>{
        var isChangeMonth = this.isChangeMonth(propsYear, propsMonth);
        var date = new Date;
        var year = date.getFullYear();
        if (propsYear == year) {
            this.setState({
                monthList: isChangeMonth.monthList,
                month: isChangeMonth.month
            });
        } else {
            this.setState({
                monthList: isChangeMonth.monthList,
            })
        }
    }

    isChangeMonth = (propsYear, propsMonth) =>{
        var date = new Date;
        var year = date.getFullYear(),
            month = (date.getMonth() + 1),
            changeMonth = this.state.month,
            monthList = caculateDate().month,
            k = 0,
            valMonth = [];
        // console.log("month:",monthList);
        var __month = month.length == 1 ? '0' + month : month;
        if (propsYear == year) {
            for (let i = 0; i < monthList.length; i++) {
                if (monthList[i] == __month) {
                    k = i;
                    break;
                }
            }
            monthList = monthList.slice(0, k + 1);
            changeMonth = this.state.month > __month ? __month : propsMonth;
        }
        if (propsYear == caculateDate().year[0]) {
            monthList = ['10', '11', '12'];
            changeMonth = this.state.month < '10' ? '12' : propsMonth;
        }
        changeMonth.toString().length == 1 ? "0" + changeMonth : changeMonth;
        // console.log("changeMonth:",changeMonth,this.state.month);
        return {
            monthList: monthList,
            month: changeMonth
        }
    }

    componentWillReceiveProps(newProps) {
        this.isCurrentYear(newProps.year, newProps.month);
    }

    handleChange= (value, type) =>{
        var year = this.state.year,
            month = this.state.month,
            __month;
        // console.log("value:",value);
        if (type == 'month') {
            month = value;
        } else {
            year = value;
            month = this.isChangeMonth(year, this.state.month).month;
        }
        month = month.toString().length == 1 ? "0" + month : month;
        this.setState({
            year: year,
            month: month
        })
        this.props.onChange({
            year: year,
            month: month,
            item: year + "-" + month
        })
    }

    render() {
        var item = caculateDate();
        return(
            <div className='select-date-body'>
                <div className='date-selected'></div>
                <div className='select-date-list'>
                    <ListSelect list={caculateDate().year} onChange={this.handleChange} value={this.state.year} type='year'/>
                    {this.state.monthList.length!=0?<ListSelect class='select-month' list={this.state.monthList} onChange={this.handleChange} isCircle='true' value={this.state.month} type='month'/>:""}
                </div>
            </div>
        )
    }
};
