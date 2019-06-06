import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import '../Base/Base.css'
import './PickDate.css'

class PickDate extends Component {
    constructor(props) {
        super(props);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.clickedPrevDate = this.clickedPrevDate.bind(this);
        this.clickedNextDate = this.clickedNextDate.bind(this);
        this.state = {
            selectedDate: undefined
        }
    }

    componentWillMount() {
        var today = new Date();
        this.setState({
            selectedDate: today
        });
    }

    handleDateChange(date) {
        this.setState({ selectedDate: date });
    }

    clickedPrevDate() {
        let selectedDate = this.state.selectedDate;
        let prevDate = new Date(
            selectedDate.getFullYear(), 
            selectedDate.getMonth(), 
            selectedDate.getDate() - 1
            );
        this.setState({ selectedDate: prevDate })
    }

    clickedNextDate() {
        let selectedDate = this.state.selectedDate;
        let nextDate = new Date(
            selectedDate.getFullYear(), 
            selectedDate.getMonth(), 
            selectedDate.getDate() + 1
            );
        this.setState({ selectedDate: nextDate })
    }

    render() {
        return (
            <div className="pickdate">
                <button className="prev base" onClick={this.clickedPrevDate}>
                    <div className='arrow left'></div>
                </button>
                <DayPickerInput
                    inputProps={{ className: "inputdate base" }}
                    value={this.state.selectedDate}
                    onDayChange={this.handleDateChange}
                />
                <button className="next base" onClick={this.clickedNextDate}>
                    <div className='arrow right'></div>
                </button>
            </div>
        )
    }
}

export default PickDate;