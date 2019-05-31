import React, { Component } from 'react';
import './App.css'

import Camera from './components/Camera/Camera.js'
import Card from './components/Card/Card.js'
import Navbar from './components/Navbar/Navbar.js'

import clock from './images/Card/clock.png'
import fish from './images/Card/fish.png'
import usericon from './images/usericon.png'
import waterdrop from './images/Card/waterdrop.png'

class App extends Component {
  constructor() {
    super();
    this.state = {
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

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user}></Navbar>
        <Card card={this.state.cards[0]}></Card>
        <Card card={this.state.cards[1]}></Card>
        <Card card={this.state.cards[2]}></Card>
        <Camera></Camera>
      </div>
    )
  }
}

export default App;
