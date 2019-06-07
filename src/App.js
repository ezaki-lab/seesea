import React, { Component } from 'react';
import './App.css'

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
    this.state = {
      date: new Date(),
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

  handleDateChange(date) {
    this.setState({ date: date });
  }

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user}></Navbar>
        <PickDate onDayChange={this.handleDateChange} ></PickDate>
        <Card card={this.state.cards[0]}></Card>
        <Card card={this.state.cards[1]}></Card>
        <Card card={this.state.cards[2]}></Card>
        <Camera date={this.state.date} url="http://uoccya.ise-hp.com/cages/lastimg/5018"></Camera>
        <OneDayScheduleGraph date={this.state.date}></OneDayScheduleGraph>
      </div>
    )
  }
}

export default App;
