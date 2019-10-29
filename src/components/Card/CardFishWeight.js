import React, { Component } from 'react'

import Card from './Card'
import fish from './fish.png'

class CardFishWeight extends Card {
    constructor(props) {
        super(props);

        this.state = {
            card: {
                title: "魚の重さ（推定）",
                symbol: fish,
                data: "500g",
                addition: {
                    enable: true,
                    color: "#4E96E4",
                    text: "サイズを入力"
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

export default CardFishWeight;