import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts'

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
            schedule: {
                hourFeeds: [0, 0, 0, 0, 0, 0, 300, 500, 400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 300, 200, 0, 0, 0, 0]
            },
            series: [
                {
                    name: '0',
                    data: [...Array(60).keys()]
                },
                {
                    name: '1',
                    data: [...Array(60).keys()]
                },
                {
                    name: '2',
                    data: [...Array(60).keys()]
                },
                {
                    name: '3',
                    data: [...Array(60).keys()]
                },
                {
                    name: '4',
                    data: [...Array(60).keys()]
                },
                {
                    name: '5',
                    data: [...Array(60).keys()]
                },
                {
                    name: '6',
                    data: [...Array(60).keys()]
                },
                {
                    name: '7',
                    data: [...Array(60).keys()]
                },
                {
                    name: '8',
                    data: [...Array(60).keys()]
                },
                {
                    name: '9',
                    data: [...Array(60).keys()]
                },
                {
                    name: '10',
                    data: [...Array(60).keys()]
                },
                {
                    name: '11',
                    data: [...Array(60).keys()]
                },
                {
                    name: '12',
                    data: [...Array(60).keys()]
                },
                {
                    name: '13',
                    data: [...Array(60).keys()]
                },
                {
                    name: '14',
                    data: [...Array(60).keys()]
                },
                {
                    name: '15',
                    data: [...Array(60).keys()]
                },
                {
                    name: '16',
                    data: [...Array(60).keys()]
                },
                {
                    name: '17',
                    data: [...Array(60).keys()]
                },
                {
                    name: '18',
                    data: [...Array(60).keys()]
                },
                {
                    name: '19',
                    data: [...Array(60).keys()]
                },
                {
                    name: '20',
                    data: [...Array(60).keys()]
                },
                {
                    name: '21',
                    data: [...Array(60).keys()]
                },
                {
                    name: '22',
                    data: [...Array(60).keys()]
                },
                {
                    name: '23',
                    data: [...Array(60).keys()]
                }
            ],
        };
    }

    componentDidMount() {
        this.getComponentSize();
        // this.getTides(this.props.date);
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
        // return true;
    }

    componentDidUpdate() {
        // For get tides of selected date
        if (this.state.requestStatus === RequestStateType.none) {
            // this.getTides(this.props.date);
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
        console.log("kita", width, height);
        this.setState({
            size: {
                height: height,
                width: width
            }
        });
    }

    render() {
        // let dataPoints = this.makeDataPointsFromSchedule(this.state.schedule);
        let height = this.state.size.height;
        let width = this.state.size.width;

        var isLoadingActive = false;
        if (this.state.requestStatus === RequestStateType.loading) {
            isLoadingActive = true;
        }

        var options = {
            chart: {
                toolbar: {
                    show: false
                },
                animations: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: ["#008FFB"],
            xaxis: {
                type: 'numeric',
                tickAmount: 6,
                labels: {
                    formatter: function (value) {
                        return Math.round(value - 1);
                    }
                }
            }
        };

        return (
            <div id='seesea-onedaygraph' className='base'>
                <span className='base-title-large'>給餌スケジュール</span>
                <div className='chart'>
                    <ReactApexChart options={options} series={this.state.series} width="100%" height="100%" type={'heatmap'} />
                </div>
                {/* <LoadingOverlay style={{ width: width, height: height }}>
                    
                    <Loader loading={isLoadingActive} />
                </LoadingOverlay> */}
            </div>
        )
    }
}

export default OneDayScheduleGraph;