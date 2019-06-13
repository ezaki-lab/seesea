import React, { Component } from 'react'
import { ComposedChart, Legend, Bar, LabelList, AreaChart, Area, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import '../Base/Base.css'
import './OneDayScheduleGraph.css'

// const data = [
//     { month: "0", tide: 140, feed: 0},
//     { month: "1", tide: 90, feed: 0},
//     { month: "2", tide: 60, feed: 0},
//     { month: "3", tide: 30, feed: 0},
//     { month: "4", tide: 50, feed: 0},
//     { month: "5", tide: 100, feed: 0},
//     { month: "6", tide: 160, feed: 300},
//     { month: "7", tide: 210, feed: 500},
//     { month: "8", tide: 260, feed: 400},
//     { month: "9", tide: 300, feed: 0},
//     { month: "10", tide: 280, feed: 0},
//     { month: "11", tide: 230, feed: 0},
//     { month: "12", tide: 180, feed: 0},
//     { month: "13", tide: 130, feed: 0},
//     { month: "14", tide: 80, feed: 0},
//     { month: "15", tide: 30, feed: 0},
//     { month: "16", tide: 60, feed: 0},
//     { month: "17", tide: 110, feed: 0},
//     { month: "18", tide: 160, feed: 300},
//     { month: "19", tide: 210, feed: 200},
//     { month: "20", tide: 260, feed: 0},
//     { month: "21", tide: 290, feed: 0},
//     { month: "22", tide: 250, feed: 0},
//     { month: "23", tide: 200, feed: 0},
// ]

const RequestStateTypes = {
    success: 'success',
    failed: 'failed',
    loading: 'loading',
    none: 'none'
}

class OneDayScheduleGraph extends Component {
    constructor(props) {
        super(props);
        this.getComponentSize = this.getComponentSize.bind(this);
        this.state = {
            size: {
                height: 0,
                width: 0
            },
            requestStatus: RequestStateTypes.none,
            schedule: {
                tides: [],
                hourFeeds: [0, 0, 0, 0, 0, 0, 300, 500, 400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 300, 200, 0, 0, 0, 0]
            }
        }
    }

    componentDidMount() {
        this.getComponentSize();
        this.getTides(this.props.date);
    }

    componentWillMount() {
        window.addEventListener('resize', () => {
            this.getComponentSize();
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        // For re-render component
        if (nextState.requestStatus === RequestStateTypes.success) {
            return true;
        }
        // For get tides of selected date
        const diffDate = this.props.date !== nextProps.date;
        return diffDate;
    }

    componentDidUpdate() {
        // For get tides of selected date
        if (this.state.requestStatus === RequestStateTypes.none) {
            this.setState({
                schedule: {
                    tides: [],
                    hourFeeds: this.state.schedule.hourFeeds
                }
            })
            this.getTides(this.props.date)
        }
        // For re-render component
        else if (this.state.requestStatus !== RequestStateTypes.loading) {
            this.setState({
                requestStatus: RequestStateTypes.none
            });
        }
    }

    makeDataPointsFromSchedule(schedule) {
        var dataPoints = []
        for (var i in schedule.tides) {
            let tide = schedule.tides[i];
            var hourFeed = 0;
            if (i < schedule.hourFeeds.length) {
                hourFeed = schedule.hourFeeds[i];
            }
            var point = {
                month: i.toString(), tide: tide, hourFeed: hourFeed
            }
            dataPoints.push(point)
        }
        return dataPoints
    }

    getComponentSize() {
        let height = document.getElementById('seesea-onedaygraph').clientHeight;
        let width = document.getElementById('seesea-onedaygraph').clientWidth;
        this.setState({
            size: {
                height: height,
                width: width
            }
        });
    }

    getTides(date) {
        console.log("request get tides from https://tide-api-ezaki-lab.herokuapp.com/")
        this.setState({
            requestStatus: RequestStateTypes.loading
        });

        var url_calculate = "https://tide-api-ezaki-lab.herokuapp.com/calculate"
        var tides_calculate = [];
        fetch(url_calculate, {
            method: 'POST',
            body: JSON.stringify({ 'date': date }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 201) {
                return response.json();
            }
        }).then(json => {
            if (json != null) {
                console.log("success to fetch tides (calculate)");
                tides_calculate = json['tides'];
            }
            else {
                console.error("failed to fetch tides (calculate)")
            }
        }).catch(error => {
            console.error('Error:', error);
        }).finally(() => {
            this.setState({
                schedule: {
                    tides: tides_calculate,
                    hourFeeds: this.state.schedule.hourFeeds
                },
                requestStatus: RequestStateTypes.success
            });
        });
    }

    render() {
        let dataPoints = this.makeDataPointsFromSchedule(this.state.schedule);
        let height = this.state.size.height;
        let width = this.state.size.width;

        return (
            <div id='seesea-onedaygraph' className='base'>
                <span className='base-title-large'>給餌スケジュール</span>
                <ComposedChart width={width} height={height} data={dataPoints} margin={{ top: 60, right: 30, bottom: 10, left: 0 }}>
                    <defs>
                        <linearGradient id="gradient-tide" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F18DE9" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="#CE2BC1" stopOpacity={0.0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#8097B1" strokeOpacity={0.4} strokeWidth={0.5} strokeDasharray="3 5" />
                    <Area dataKey="tide" type="monotone" stroke="#F18DE9" fillOpacity={1} fill="url(#gradient-tide)" />
                    <Bar dataKey='hourFeed' barSize={10} fill="#3794FC" />
                    <XAxis dataKey="month" stroke="#E0E7FF" tick={{ fill: "#97A4BA" }} />
                    <YAxis stroke="#E0E7FF" tick={{ fill: "#97A4BA" }} />
                    <Tooltip />
                    <Legend />
                </ComposedChart>
            </div>
        )
    }
}

export default OneDayScheduleGraph;