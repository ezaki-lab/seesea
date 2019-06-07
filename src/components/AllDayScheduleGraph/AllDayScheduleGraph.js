import React, { Component } from 'react'
import { ComposedChart, Legend, Bar, LabelList, AreaChart, Area, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import '../Base/Base.css'
import './AllDayScheduleGraph.css'

class AllDayScheduleGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: {
                waterTemperature: [14, 9, 6, 3, 5, 10, 16, 21, 26, 30, 28, 23, 18, 13, 8, 3, 6, 11, 16, 21, 26, 29, 25, 20],
                fishSize: [0, 50, 110, 160, 210, 300, 340, 380, 420, 460, 500, 550, 660, 720, 780, 830, 940, 990, 1040, 1100, 1200, 1250, 1300],
                dayFeeds: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 390, 395, 400]
            }
        }
    }

    makeDataPointsFromSchedule(schedule) {
        var dataPoints = []
        for (var i in schedule.dayFeeds) {
            var point = {
                month: i.toString(), 
                waterTemperature: schedule.waterTemperature[i], 
                fishSize: schedule.fishSize[i],
                dayFeed: schedule.dayFeeds[i]
            }
            dataPoints.push(point)
        }
        return dataPoints
    }

    render() {
        let dataPoints = this.makeDataPointsFromSchedule(this.state.schedule)
        console.log(dataPoints)

        return (
            <div className="allgraph base">
                <span className='base-title-large'>養殖スケジュール</span>
                <ComposedChart width={700} height={250} data={dataPoints} margin={{ top: 60, right: 30, bottom: 10, left: 0 }}>
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
                    <Area yAxisId={0} dataKey="waterTemperature" type="monotone" stroke="#3A96FD" fillOpacity={1} fill="url(#gradient-water)" />
                    <Area yAxisId={1} dataKey="fishSize" type="monotone" stroke="#9D60FB" fillOpacity={1} fill="url(#gradient-fishsize)" />
                    <Bar  yAxisId={1} dataKey='dayFeed' barSize={10} fill="url(#gradient-dayfeeds)" />
                    <XAxis dataKey="month" stroke="#E0E7FF" tick={{ fill: "#97A4BA" }} />
                    <YAxis yAxisId={0} dataKey="waterTemperature" stroke="#E0E7FF" tick={{ fill: "#97A4BA" }} />
                    <YAxis yAxisId={1} dataKey="fishSize" stroke="#E0E7FF" tick={{ fill: "#97A4BA" }} />
                    <Tooltip />
                    <Legend />
                </ComposedChart>
            </div>
        )
    }
}

export default AllDayScheduleGraph;