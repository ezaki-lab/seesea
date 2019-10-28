import React, { Component } from 'react'
import ApexChart from 'react-apexcharts'

import { LoadingOverlay, Loader } from 'react-overlay-loader';

import 'react-calendar-heatmap/dist/styles.css';
import '../Base/Base.css'
import './OneDayScheduleGraph.css'

const RequestStateType = {
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
            requestStatus: RequestStateType.none,
            schedule: [],
        };
    }

    componentDidMount() {
        this.getComponentSize();
        this.getFeedSchedule(this.props.date);
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
        // return true;
    }

    componentDidUpdate() {
        // For get tides of selected date
        if (this.state.requestStatus === RequestStateType.none) {
            this.getFeedSchedule(this.props.date);
        }
        // For re-render component
        else if (this.state.requestStatus !== RequestStateType.loading) {
            this.setState({
                requestStatus: RequestStateType.none
            });
        }
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

    dateToString(current_datetime) {
        let year = current_datetime.getFullYear();
        let month = (current_datetime.getMonth() + 1);
        let day = current_datetime.getDate();
        return year + "-" + month + "-" + day + " 00:00:00"
    }

    getFeedSchedule(date) {
        console.log("request get feed schedule from https://feed-api-ezaki-lab.herokuapp.com/feeds/today")
        this.setState({
            requestStatus: RequestStateType.loading
        });

        var url = "https://feed-api-ezaki-lab.herokuapp.com/feeds/today"
        // var url = "http://localhost:8080/feeds/oneday"
        var schedule = [];
        fetch(url, {
            method: 'GET',
            // body: JSON.stringify({ 'date': this.dateToString(date) }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            }
        }).then(json => {
            if (json != null) {
                schedule = json['schedule'];
                console.log("success to get feed schedule");
                console.log(schedule);
                return schedule;
            }
            else {
                console.error("failed to get feed schedule")
            }
        }).catch(error => {
            console.error('Error:', error);
        }).finally(() => {
            this.setState({
                schedule: schedule,
                requestStatus: RequestStateType.success
            });
        });
    }

    makeSeriesFromSchedule(schedule) {
        var series = [];
        for (var i in schedule) {
            var point = {
                name: i.toString(),
                data: schedule[i],
            }
            series.push(point);
        }
        return series;
    }

    render() {
        let series = this.makeSeriesFromSchedule(this.state.schedule);
        let height = this.state.size.height;
        let width = this.state.size.width;

        var isLoadingActive = false;
        if (this.state.requestStatus === RequestStateType.loading) {
            isLoadingActive = true;
        }

        return (
            <div id='seesea-onedaygraph' className='base'>
                <LoadingOverlay style={{ width: width, height: height }}>
                    <span className='base-title-large'>給餌スケジュール</span>
                    <div className='chart'>
                        <ApexChart options={options} series={series} width="100%" height="100%" type={'heatmap'} />
                    </div>
                    <Loader loading={isLoadingActive} />
                </LoadingOverlay>
            </div>
        )
    }
}

export default OneDayScheduleGraph;



let options = {
    chart: {
        toolbar: {
            show: false
        },
        animations: {
            enabled: false,
        },
    },
    legend: {
        show: false,
    },
    plotOptions: {
        heatmap: {
            shadeIntensity: 0.0,
            colorScale: {
                ranges: [
                    {
                        from: -1,
                        to: 0,
                        color: '#EAF0F7'
                    },
                    {
                        from: 1,
                        to: 1,
                        color: '#01C5E9'
                    },
                    {
                        from: 2,
                        to: 2,
                        color: '#0189E9'
                    },
                    {
                        from: 3,
                        to: 3,
                        color: '#37D01F'
                    },
                    {
                        from: 4,
                        to: 4,
                        color: '#FDCD01'
                    },
                    {
                        from: 5,
                        to: 5,
                        color: '#FE7C03'
                    },
                    {
                        from: 6,
                        to: 6,
                        color: '#FF83B7'
                    },
                    {
                        from: 7,
                        to: 7,
                        color: '#FF284A'
                    },
                    {
                        from: 8,
                        to: 8,
                        color: '#B322FF'
                    }
                ]
            }
        }
    },
    dataLabels: {
        enabled: false,
    },
    xaxis: {
        type: 'numeric',
        tickAmount: 6,
        min: 0,
        max: 59.5,
        axisTicks: {
            show: true,
            color: '#CDD3E8'
        },
        axisBorder: {
            show: true,
            color: '#CDD3E8'
        },
        labels: {
            style: {
                colors: "#97A4BA",
                fontSize: '12px',
            },
        },
    },
    yaxis: [
        {
            show: true,
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: true,
                color: '#CDD3E8'
            },
            labels: {
                style: {
                    color: '#97A4BA',
                    fontSize: '12px',
                },
                formatter: function (value, opt) {
                    if (Number.isInteger(opt) === false && opt === undefined) {
                        // tooltip y label
                        return parseInt(23 - value).toString();
                    }
                    if (Number.isInteger(opt) === false && opt !== undefined) {
                        // tooltip box label
                        return parseInt(opt.series[opt.seriesIndex][opt.dataPointIndex]).toString();
                    }
                    let newValue = parseInt(value);
                    if (Number.isNaN(newValue) === true) {
                        return "";
                    }
                    if (newValue % 6 === 0 || newValue === 23) {
                        // yaxis label
                        return newValue.toString();
                    }
                    return "";
                },
            },
            tooltip: {
                enabled: true,
            },
            min: 0,
            max: 23,
            tickAmount: 4,
            reversed: true,
        },
    ],
    tooltip: {
        theme: "dark",
    }
};