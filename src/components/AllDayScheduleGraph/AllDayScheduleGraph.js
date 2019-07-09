import React, { Component } from 'react'
import { ComposedChart, Legend, Bar, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import { LoadingOverlay, Loader } from 'react-overlay-loader';

import '../Base/Base.css'
import './AllDayScheduleGraph.css'

const RequestStateType = {
    success: 'success',
    failed: 'failed',
    loading: 'loading',
    none: 'none'
}

class AllDayScheduleGraph extends Component {
    constructor(props) {
        super(props);
        this.getComponentSize = this.getComponentSize.bind(this);
        this.state = {
            size: {
                height: 0,
                width: 0
            },
            requestStatus: RequestStateType.none,
            schedule: {
                // waterTemperature: [14, 9, 6, 3, 5, 10, 16, 21, 26, 30, 28, 23, 18, 13, 8, 3, 6, 11, 16, 21, 26, 29, 25, 20],
                // fishSizes: [0, 50, 110, 160, 210, 300, 340, 380, 420, 460, 500, 550, 660, 720, 780, 830, 940, 990, 1040, 1100, 1200, 1250, 1300],
                // dayFeeds: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 390, 395, 400]
                fishSizes: [],
                dayFeeds: [],
                dates: []
            }
        }
    }

    componentDidMount() {
        this.getComponentSize();
        this.getAllDayFeeds();
    }

    componentWillMount() {
        window.addEventListener('resize', () => {
            this.getComponentSize();
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        // For re-render component
        if (nextState.requestStatus === RequestStateType.success) {
            return true;
        }
        if (nextState.requestStatus === RequestStateType.loading) {
            return true;
        }
        // For get tides of selected date
        if (nextProps.date !== this.props.date) {
            return true;
        }
        return false;
    }

    componentDidUpdate() {
        // For get tides of selected date
        if (this.state.requestStatus === RequestStateType.none) {
            this.getAllDayFeeds();
        }
        // For re-render component
        else if (this.state.requestStatus !== RequestStateType.loading) {
            this.setState({
                requestStatus: RequestStateType.none
            });
        }
    }

    makeDataPointsFromSchedule(schedule) {
        var dataPoints = []
        for (var i in schedule.dayFeeds) {
            var point = {
                month: i.toString(),
                // waterTemperature: schedule.waterTemperature[i], 
                fishSize: schedule.fishSizes[i],
                dayFeed: schedule.dayFeeds[i],
                date: schedule.dates[i],
            }
            dataPoints.push(point)
        }
        return dataPoints
    }

    getComponentSize() {
        let height = document.getElementById('seesea-alldaygraph').clientHeight;
        let width = document.getElementById('seesea-alldaygraph').clientWidth;
        this.setState({
            size: {
                height: height,
                width: width
            }
        });
    }

    getAllDayFeeds(date) {
        console.log("request get all day feeds from https://feed-api-ezaki-lab.herokuapp.com/")
        this.setState({
            requestStatus: RequestStateType.loading
        });

        let url = "https://feed-api-ezaki-lab.herokuapp.com/feeds/allday"
        // let url = "http://localhost:8080/feeds/allday"
        var dayFeeds = [];
        var fishSizes = [];
        var dates = [];
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            }
        }).then(json => {
            if (json != null) {
                console.log("success to fetch all day feeds");
                dayFeeds = [];
                fishSizes = [];
                dates = [];
                for (var i in json['results']) {
                    dayFeeds.push(json['results'][i]['feed'])
                    fishSizes.push(json['results'][i]['size'])
                    dates.push(json['results'][i]['date'])
                }
            }
            else {
                console.error("failed to fetch all day feeds")
            }
        }).catch(error => {
            console.error('Error:', error);
        }).finally(() => {
            this.setState({
                schedule: {
                    fishSizes: fishSizes,
                    dayFeeds: dayFeeds,
                    dates: dates
                },
                requestStatus: RequestStateType.success
            });
        });
    }

    render() {
        let dataPoints = this.makeDataPointsFromSchedule(this.state.schedule);
        let height = this.state.size.height;
        let width = this.state.size.width;

        var isLoadingActive = false;
        if (this.state.requestStatus === RequestStateType.loading) {
            isLoadingActive = true;
        }

        return (
            <div id="seesea-alldaygraph" className="base">
                <LoadingOverlay style={{ width: width, height: height }}>
                    <span className='base-title-large'>養殖スケジュール</span>
                    <ComposedChart width={width} height={height} data={dataPoints} margin={{ top: 60, right: 20, bottom: 10, left: 10 }}>
                        <defs>
                            <linearGradient id="gradient-water" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3A96FD" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#3A96FD" stopOpacity={0.0} />
                            </linearGradient>
                            <linearGradient id="gradient-fishsize" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#9D60FB" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#9D60FB" stopOpacity={0.0} />
                            </linearGradient>
                            <linearGradient id="gradient-dayfeeds" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="30%" stopColor="#F3B92D" stopOpacity={1.0} />
                                <stop offset="70%" stopColor="#FCA137" stopOpacity={1.0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#8097B1" strokeOpacity={0.4} strokeWidth={0.5} strokeDasharray="3 5" />
                        {/* <Area yAxisId={0} dataKey="waterTemperature" type="monotone" stroke="#3A96FD" fillOpacity={1} fill="url(#gradient-water)" /> */}
                        <Area yAxisId={0} dataKey="fishSize" type="monotone" stroke="#9D60FB" fillOpacity={1} fill="url(#gradient-fishsize)" />
                        <Bar yAxisId={1} dataKey='dayFeed' barSize={10} fill="url(#gradient-dayfeeds)" />
                        <XAxis dataKey="date" stroke="#E0E7FF" tick={{ fill: "#97A4BA" }} />
                        {/* <YAxis yAxisId={0} dataKey="waterTemperature" stroke="#E0E7FF" tick={{ fill: "#97A4BA" }} /> */}
                        <YAxis yAxisId={0} dataKey="fishSize" stroke="#E0E7FF" tick={{ fill: "#97A4BA" }} />
                        <YAxis yAxisId={1} dataKey="dayFeed" stroke="#E0E7FF" tick={{ fill: "#97A4BA" }} />
                        <Tooltip />
                        <Legend />
                    </ComposedChart>
                    <Loader loading={isLoadingActive} />
                </LoadingOverlay>
            </div>
        )
    }
}

export default AllDayScheduleGraph;