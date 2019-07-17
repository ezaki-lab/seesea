import React, { Component } from 'react'
import { ComposedChart, Legend, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import { LoadingOverlay, Loader } from 'react-overlay-loader';

import 'react-overlay-loader/styles.css';
import '../Base/Base.css'
import './TideChart.css'

const RequestStateType = {
    success: 'success',
    failed: 'failed',
    loading: 'loading',
    none: 'none'
}

class TideChart extends Component {
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
                tides: []
            }
        };
    }

    componentDidMount() {
        this.getComponentSize();
        this.getTides(this.props.date);
    }

    componentWillMount() {
        window.addEventListener('resize', this.getComponentSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.getComponentSize);
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
            this.getTides(this.props.date);
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
        for (var i = 0; i < 24; i++) {
            var tide = 0;
            if (i < schedule.tides.length) {
                tide = schedule.tides[i];
            }
            var point = {
                month: i.toString(), tide: tide
            };
            dataPoints.push(point);
        }
        return dataPoints;
    }

    getComponentSize() {
        let height = document.getElementById('seesea-tidechart').clientHeight;
        let width = document.getElementById('seesea-tidechart').clientWidth;
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
            requestStatus: RequestStateType.loading
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
                    tides: tides_calculate
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
            <div id='seesea-tidechart' className='base'>
                <LoadingOverlay style={{ width: width, height: height }}>
                    <span className='base-title-large'>潮汐</span>
                    <ComposedChart width={width} height={height} data={dataPoints} margin={{ top: 60, right: 30, bottom: 10, left: 0 }}>
                        <defs>
                            <linearGradient id="gradient-tide" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#F18DE9" stopOpacity={0.5} />
                                <stop offset="95%" stopColor="#CE2BC1" stopOpacity={0.0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#8097B1" strokeOpacity={0.4} strokeWidth={0.5} strokeDasharray="3 5" />
                        <Area dataKey="tide" type="monotone" stroke="#F18DE9" fillOpacity={1} fill="url(#gradient-tide)" />
                        <XAxis dataKey="month" stroke="#E0E7FF" tick={{ fill: "#97A4BA" }} />
                        <YAxis stroke="#E0E7FF" tick={{ fill: "#97A4BA" }} />
                        <Tooltip />
                        <Legend />
                    </ComposedChart>
                    <Loader loading={isLoadingActive} />
                </LoadingOverlay>
            </div>
        )
    }
}

export default TideChart;