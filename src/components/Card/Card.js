import React, { Component } from 'react'

import './Card.css'
import '../Base/Base.css'

class Card extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='card base'>
                <span className='base-title-small'>{this.props.card.title}</span>
                <img className='symbol' src={this.props.card.symbol} />
                <div className='data-content'>
                    <b className='data'>{this.props.card.data}</b>
                    <p
                        className='data-addition'
                        hidden={!this.props.card.addition.enable}
                        style={{ backgroundColor: this.props.card.addition.color }}
                    >
                        {this.props.card.addition.text}
                    </p>
                </div>
            </div>
        )
    }
}

export default Card;