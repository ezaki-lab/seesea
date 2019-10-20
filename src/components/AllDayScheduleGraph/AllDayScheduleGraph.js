import React, { Component } from 'react'
// import { ComposedChart, Legend, Bar, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import ApexChart from 'react-apexcharts'

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
            selection: 'one_year',
            xaxisDate: {
                start: null,
                end: null,
            },
            series: [{
                name: '給餌量',
                type: 'area',
                data: [],
            }],
        }
    }

    componentDidMount() {
        this.getComponentSize();
        this.getAllDayFeeds();
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
            this.getAllDayFeeds();
        }
        // For re-render component
        else if (this.state.requestStatus !== RequestStateType.loading) {
            this.setState({
                requestStatus: RequestStateType.none
            });
        }
    }

    componentWillUpdate() {
        options.xaxis.min = this.state.xaxisDate.start;
    }

    makeFeedDataPoints(dates, dayFeeds) {
        var dataPoints = []
        for (var i in dates) {
            var point = [
                dates[i],
                dayFeeds[i]
            ]
            dataPoints.push(point)
        }
        return dataPoints
    }

    makeFishSizeDataPoints(dates, fishSizes) {
        var dataPoints = []
        for (var i in dates) {
            var point = [
                dates[i],
                fishSizes[i]
            ]
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
                series: [
                    {
                        name: '給餌量',
                        type: 'area',
                        data: this.makeFeedDataPoints(dates, dayFeeds),
                    },
                    {
                        name: '魚の重さ',
                        type: 'line',
                        data: this.makeFishSizeDataPoints(dates, fishSizes),
                    },
                ],
                startDate: new Date(dates[0]).getTime(),
                requestStatus: RequestStateType.success
            });
        });
    }

    render() {
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
                    <div className='chart'>
                        <ApexChart options={options} series={this.state.series} type="area" width="100%" height="100%" />
                    </div>
                    <Loader loading={isLoadingActive} />
                </LoadingOverlay>
            </div>
        )
    }
}

export default AllDayScheduleGraph;

var options = {
    chart: {
        toolbar: {
            show: false
        },
        animations: {
            enabled: false,
        },
    },
    legend: {
        show: true,
        position: 'top'
    },
    colors: ['#F5B22F', '#9D60FB'],
    annotations: {
        xaxis: [{
            borderColor: '#999',
            yAxisIndex: 0,
            label: {
                show: true,
                text: 'Today',
                style: {
                    color: "#fff",
                    background: '#775DD0'
                }
            }
        }]
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        size: 0,
        style: 'hollow',
    },
    xaxis: {
        type: 'datetime',
        tickAmount: 6,
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
            },
            tickAmount: 4,
        },
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
            },
            tickAmount: 4,
        },
    ],
    tooltip: {
        x: {
            format: 'yyyy/MM/dd',
        },
        y: {
            formatter: function (value, opt) {
                // 給餌量
                if (opt.seriesIndex === 0) {
                    return value + " kg";
                }
                // 魚の重さ
                else if (opt.seriesIndex === 1) {
                    return value + " g";
                }
                return value;
            },
        },
        theme: "dark",
    },
    fill: {
        type: 'solid',
        opacity: [0.2, 0.8],
    },
    stroke: {
        width: 2,   
    }
    
};