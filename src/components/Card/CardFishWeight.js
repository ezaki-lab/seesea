import React, { Component } from 'react'
import firebase from '../../firebase.js'

import Card from './Card'
import fish from './icons/fish.png'

class CardFishWeight extends Card {
    constructor(props) {
        super(props);

        this.state = {
            card: {
                title: "魚の重さ（推定）",
                symbol: fish,
                data: "-",
                addition: {
                    enable: false,
                    color: "#4E96E4",
                    text: "サイズを入力"
                }
            },
        }
    }

    componentDidMount() {
        this.startFetchFishWeightFromFirebase();
    }

    startFetchFishWeightFromFirebase() {
        const { raftId } = this.props;
        firebase.database().ref('rafts/' + raftId + '/fish').on('value', snapshot => {
            const val = snapshot.val();
            if (val === null) { return; }
            this.setState({
                card: {
                    title: "魚の重さ（推定）",
                    symbol: fish,
                    data: parseInt(val.weight) + "g",
                    addition: {
                        enable: false,
                        color: "#4E96E4",
                        text: "サイズを入力"
                    }
                }
            });
        });
    }

    render() {
        return (
            <Card card={this.state.card}></Card>
        )
    }
}

export default CardFishWeight;