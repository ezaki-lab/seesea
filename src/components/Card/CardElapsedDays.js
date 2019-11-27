import React, { Component } from 'react'
import firebase from '../../firebase.js'

import Card from './Card'
import clock from './icons/clock.png'

class CardElapsedDays extends Card {
    constructor(props) {
        super(props);

        this.state = {
            card: {
                title: "経過日数",
                symbol: clock,
                data: "-",
                addition: {
                    enable: false,
                    color: "",
                    text: ""
                }
            },
        }
    }

    componentDidMount() {
        this.startFetchElapsedDaysFromFirebase();
    }

    startFetchElapsedDaysFromFirebase() {
        const { raftId } = this.props;
        firebase.database().ref('rafts/' + raftId).on('value', snapshot => {
            const val = snapshot.val();
            if (val === null) { return; }
            const startDateTimestamp = val.start_date;
            const startDate = new Date(startDateTimestamp);
            const today = new Date();
            const diffInTime = today.getTime() - startDate.getTime(); 
            const diffInDays = parseInt(diffInTime / (1000 * 3600 * 24));
            this.setState({
                card: {
                    title: "経過日数",
                    symbol: clock,
                    data: diffInDays + "日",
                    addition: {
                        enable: false,
                        color: "",
                        text: ""
                    }
                },
            });
        });
    }

    render() {
        return (
            <Card card={this.state.card}></Card>
        )
    }
}

export default CardElapsedDays;