import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import {
  isBrowser,
  isMobile,
  isTablet,
} from "react-device-detect";
import './Dashboard.css'

import AllDayScheduleGraph from '../components/AllDayScheduleGraph/AllDayScheduleGraph.js'
import Camera from '../components/Camera/Camera.js'
import CardWaterTemperature from '../components/Card/CardWaterTemperature.js'
import CardFeedingAmount from '../components/Card/CardFeedingAmount'
import CardFishWeight from '../components/Card/CardFishWeight'
import CardElapsedDays from '../components/Card/CardElapsedDays'
import OneDayScheduleGraph from '../components/OneDayScheduleGraph/OneDayScheduleGraph.js'
import PickDate from '../components/PickDate/PickDate.js'
import Navbar from '../components/Navbar/Navbar.js'
import TideChart from '../components/TideChart/TideChart.js'


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.getWindowSize = this.getWindowSize.bind(this);

    const { params } = this.props.match;
    const raftId = params.id;

    this.state = {
      date: new Date(),
      windowSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      raftId: raftId,
    }
  }

  componentWillMount() {
    window.addEventListener('resize', () => {
      this.getWindowSize();
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getWindowSize);
  }

  handleDateChange(date) {
    this.setState({ date: date });
  }

  getWindowSize() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let wsize = {
      width: width,
      height: height,
    };
    this.setState({ windowSize: wsize });
  }

  render() {
    var layout = [];
    var margin = [0, 0];
    var cols = 0;
    var rowHeight = 0;
    let wsize = this.state.windowSize;
    if (isMobile) {
      margin = [10, 10];
      cols = 2;
      rowHeight = 40;
      layout = [
        { i: 'pickdate', x: 0, y: 0, w: 1, h: 1, static: true },
        { i: 'card-date', x: 0, y: 1, w: 1, h: 2, static: true },
        { i: 'card-fishsize', x: 1, y: 1, w: 1, h: 2, static: true },
        { i: 'card-water', x: 0, y: 3, w: 1, h: 2, static: true },
        { i: 'card-feeds', x: 1, y: 3, w: 1, h: 2, static: true },
        { i: 'camera', x: 0, y: 5, w: 2, h: 5, static: true },
        { i: 'onedaygraph', x: 0, y: 10, w: 2, h: 5, static: true },
        { i: 'alldaygraph', x: 0, y: 15, w: 2, h: 5, static: true },
        { i: 'tidechart', x: 0, y: 20, w: 2, h: 5, static: true },
      ];
    }
    if (isTablet || isBrowser) {
      margin = [20, 15];
      cols = 12;
      rowHeight = 40;
      layout = [
        { i: 'pickdate', x: 0, y: 0, w: 1.7, h: 1, static: true },
        { i: 'card-date', x: 0, y: 1, w: 3, h: 2, static: true },
        { i: 'card-fishsize', x: 3, y: 1, w: 3, h: 2, static: true },
        { i: 'card-water', x: 6, y: 1, w: 3, h: 2, static: true },
        { i: 'card-feeds', x: 0, y: 3, w: 3, h: 2, static: true },
        { i: 'camera', x: 0, y: 5, w: 4, h: 5, static: true },
        { i: 'onedaygraph', x: 4, y: 5, w: 4, h: 5, static: true },
        { i: 'alldaygraph', x: 0, y: 10, w: 8, h: 4, static: true },
        { i: 'tidechart', x: 0, y: 14, w: 4, h: 5, static: true },
      ];
    }
    return (
      <div className="Dashboard">
        <Navbar style={{ zIndex: 1000 }}></Navbar>
        <GridLayout layout={layout} cols={cols} margin={margin} rowHeight={rowHeight} width={wsize.width}>
          <div key="pickdate" style={{ zIndex: 100 }}>
            <PickDate onDayChange={this.handleDateChange} ></PickDate>
          </div>
          <div key="card-date">
            <CardElapsedDays></CardElapsedDays>
          </div>
          <div key="card-fishsize">
            <CardFishWeight></CardFishWeight>
          </div>
          <div key="card-water">
            <CardWaterTemperature></CardWaterTemperature>
          </div>
          <div key="card-feeds">
            <CardFeedingAmount></CardFeedingAmount>
          </div>
          <div key="camera">
            <Camera date={this.state.date} raftId={this.state.raftId}></Camera>
          </div>
          <div key="onedaygraph">
            <OneDayScheduleGraph date={this.state.date}></OneDayScheduleGraph>
          </div>
          <div key="alldaygraph">
            <AllDayScheduleGraph></AllDayScheduleGraph>
          </div>
          <div key="tidechart">
            <TideChart date={this.state.date}></TideChart>
          </div>
        </GridLayout>
      </div>
    )
  }
}

export default Dashboard;
