import React, { Component } from 'react'

import Card from './Card'
import clock from './icons/clock.png'

class CardElapsedDays extends Card {
    constructor(props) {
        super(props);

        this.state = {
            card: {
                title: "経過日数",
                symbol: clock,
                data: "323日目",
                addition: {
                    enable: false,
                    color: "",
                    text: ""
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

export default CardElapsedDays;