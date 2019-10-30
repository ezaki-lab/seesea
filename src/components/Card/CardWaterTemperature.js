import React, { Component } from 'react'

import Card from './Card'
import waterdrop from './icons/waterdrop.png'

class CardWaterTemperature extends Card {
    constructor(props) {
        super(props);

        this.state = {
            card: {
                title: "水温",
                symbol: waterdrop,
                data: "32℃",
                addition: {
                    enable: true,
                    color: "#F35C5C",
                    text: "前日比 -2℃"
                }
            },
        }
    }

    render() {
        return (
            <Card card={this.state.card}></Card>
        )
    }
}

export default CardWaterTemperature;