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

class OneDayScheduleGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: {
                tides: [
                    140,
                    90,
                    60,
                    30,
                    50,
                    100,
                    160,
                    210,
                    260,
                    300,
                    280,
                    230,
                    180,
                    130,
                    80,
                    30,
                    60,
                    110,
                    160,
                    210,
                    260,
                    290,
                    250,
                    200
                ],
                feeds: [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    300,
                    500,
                    400,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    300,
                    200,
                    0,
                    0,
                    0,
                    0
                ]
            }
        }
    }

    makeDataPointsFromSchedule(schedule) {
        var dataPoints = []
        for (var i in schedule.tides) {
            var point = {
                month: i.toString(), tide: schedule.tides[i], feed: schedule.feeds[i]
            }
            dataPoints.push(point)
        }
        return dataPoints
    }

    render() {
        let dataPoints = this.makeDataPointsFromSchedule(this.state.schedule)

        return (
            <div className="graph base">
                <span className='base-title-large'>給餌スケジュール</span>
                <ComposedChart width={400} height={300} data={dataPoints} margin={{ top: 60, right: 30, bottom: 10, left: 0 }}>
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F18DE9" stopOpacity={0.5} />
                            <stop offset="95%" stopColor="#CE2BC1" stopOpacity={0.0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#8097B1" strokeOpacity={0.4} strokeWidth={0.5} strokeDasharray="3 5" />
                    <Area type="monotone" dataKey="tide" stroke="#F18DE9" fillOpacity={1} fill="url(#gradient)" />
                    <Bar dataKey='feed' barSize={10} fill="#3794FC" />
                    <XAxis stroke="#E0E7FF" tick={{ fill: "#97A4BA" }} dataKey="month" />
                    <YAxis stroke="#E0E7FF" tick={{ fill: "#97A4BA" }} />
                    <Tooltip />
                    <Legend />
                </ComposedChart>
            </div>
        )
    }
}

export default OneDayScheduleGraph;