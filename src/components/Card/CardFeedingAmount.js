import React, { Component } from 'react'

import { LoadingOverlay, Loader } from 'react-overlay-loader';

import Card from './Card'
import feeds from './icons/feeds.png'

const RequestStateType = {
    success: 'success',
    failed: 'failed',
    loading: 'loading',
    none: 'none'
}

class CardFeedingAmount extends Card {
    constructor(props) {
        super(props);

        this.state = {
            card: {
                title: "給餌量",
                symbol: feeds,
                data: "-",
                addition: {
                    enable: false,
                    color: "",
                    text: ""
                }
            },
            requestStatus: RequestStateType.none,
        }

    }

    componentDidMount() {
        this.getFeedSchedule()
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        // For re-render component
        if (nextState.requestStatus === RequestStateType.success) {
            return true;
        }
        if (nextState.requestStatus === RequestStateType.loading) {
            return true;
        }
        // For get tides of selected date
        if (nextProps.date !== this.props.date) {
            return true;
        }
        return false;
        // return true;
    }

    componentDidUpdate() {
        // For get tides of selected date
        if (this.state.requestStatus === RequestStateType.none) {
            this.getFeedSchedule(this.props.date);
        }
        // For re-render component
        else if (this.state.requestStatus !== RequestStateType.loading) {
            this.setState({
                requestStatus: RequestStateType.none
            });
        }
    }

    getFeedSchedule() {
        console.log("request get feed amount from https://feed-api-ezaki-lab.herokuapp.com/feeds/today")
        this.setState({
            requestStatus: RequestStateType.loading
        });

        var url = "https://feed-api-ezaki-lab.herokuapp.com/feeds/today"
        var feedAmount = 0;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            }
        }).then(json => {
            if (json != null) {
                feedAmount = json['adjusted_amount'];
                console.log("success to get feed amount");
            }
            else {
                console.error("failed to get feed amount")
            }
        }).catch(error => {
            console.error('Error:', error);
        }).finally(() => {
            this.setState({
                card: {
                    title: this.state.card.title,
                    symbol: this.state.card.symbol,
                    data: Math.round(feedAmount).toString() + 'g',
                    addition: {
                        enable: this.state.card.addition.enable,
                        color: this.state.card.addition.color,
                        text: this.state.card.addition.text
                    }
                },
                requestStatus: RequestStateType.success
            });
        });
    }


    render() {
        return (
            <Card card={this.state.card}></Card>
        )
    }
}

export default CardFeedingAmount;