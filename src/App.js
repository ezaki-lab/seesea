import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import './App.css'

import AllDayScheduleGraph from './components/AllDayScheduleGraph/AllDayScheduleGraph.js'
import Camera from './components/Camera/Camera.js'
import Card from './components/Card/Card.js'
import OneDayScheduleGraph from './components/OneDayScheduleGraph/OneDayScheduleGraph.js'
import PickDate from './components/PickDate/PickDate.js'
import Navbar from './components/Navbar/Navbar.js'

import clock from './images/Card/clock.png'
import fish from './images/Card/fish.png'
import usericon from './images/usericon.png'
import waterdrop from './images/Card/waterdrop.png'

class App extends Component {
  constructor() {
    super();
    this.handleDateChange = this.handleDateChange.bind(this);
    this.getWindowSize = this.getWindowSize.bind(this);
    this.state = {
      date: new Date(),
      windowSize: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      user: {
        name: "山田太郎",
        icon: usericon
      },
      cards: [
        {
          title: "経過日数",
          symbol: clock,
          data: "323日目",
          addition: {
            enable: false,
            color: "",
            text: ""
          }
        },
        {
          title: "魚の重さ（推定）",
          symbol: fish,
          data: "500g",
          addition: {
            enable: true,
            color: "#4E96E4",
            text: "実際のサイズを入力"
          }
        },
        {
          title: "水温",
          symbol: waterdrop,
          data: "32℃",
          addition: {
            enable: true,
            color: "#F35C5C",
            text: "前日比 -2℃"
          }
        },
      ]
    }
  }

  componentWillMount() {
    window.addEventListener('resize', () => {
      this.getWindowSize();
    });
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
    var layout = [
      { i: 'pickdate', x: 0, y: 0, w: 2, h: 1, static: true },
      { i: 'card-date', x: 0, y: 1, w: 3, h: 2, static: true },
      { i: 'card-fishsize', x: 3, y: 1, w: 3, h: 2, static: true },
      { i: 'card-water', x: 6, y: 1, w: 3, h: 2, static: true },
      { i: 'camera', x: 0, y: 3, w: 4, h: 5, static: true },
      { i: 'onedaygraph', x: 4, y: 3, w: 4, h: 5, static: true },
      { i: 'alldaygraph', x: 0, y: 8, w: 8, h: 4, static: true },
    ];
    let wsize = this.state.windowSize;
    return (
      <div className="App">
        <Navbar user={this.state.user}></Navbar>
        <GridLayout layout={layout} cols={12} margin={[20, 20]} rowHeight={45} width={wsize.width}>
          <div key="pickdate">
            <PickDate onDayChange={this.handleDateChange} ></PickDate>
          </div>
          <div key="card-date">
            <Card key="card-date" card={this.state.cards[0]}></Card>
          </div>
          <div key="card-fishsize">
            <Card card={this.state.cards[1]}></Card>
          </div>
          <div key="card-water">
            <Card card={this.state.cards[2]}></Card>
          </div>
          <div key="camera">
            <Camera date={this.state.date} url="http://uoccya.ise-hp.com/cages/lastimg/5018"></Camera>
          </div>
          <div key="onedaygraph">
            <OneDayScheduleGraph date={this.state.date}></OneDayScheduleGraph>
          </div>
          <div key="alldaygraph">
            <AllDayScheduleGraph date={this.state.date}></AllDayScheduleGraph>
          </div>
        </GridLayout>
      </div>
    )
  }
}

export default App;
