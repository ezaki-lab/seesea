import React, { Component } from 'react'
import firebase from '../../firebase.js'

import './Camera.css'
import '../Base/Base.css'

class Camera extends Component {
    constructor(props) {
        super(props);

        this.getComponentSize = this.getComponentSize.bind(this);
        const { raftId } = this.props;
        this.state = {
            size: {
                height: 0,
                width: 0
            },
            ai: {
                activity: false
            },
            image_url: "http://uoccya.ise-hp.com/cages/lastimg/" + raftId,
            getRaftImageInterval: null
        }
    }

    componentDidMount() {
        this.streamRaftImage();
        this.startFetchActivityFromFirebase();
        this.getComponentSize();
    }

    componentWillMount() {
        window.addEventListener('resize', this.getComponentSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.getComponentSize);
        clearInterval(this.state.getRaftImageInterval);
    }

    streamRaftImage() {
        const { raftId } = this.props;
        this.state.getRaftImageInterval = setInterval(function () {
            this.setState({
                image_url: "http://uoccya.ise-hp.com/cages/lastimg/" + raftId + '?' + new Date()
            });
        }.bind(this), 5000);
    }

    startFetchActivityFromFirebase() {
        const { raftId } = this.props;
        firebase.database().ref('rafts/' + raftId + '/ai').on('value', snapshot => {
            const val = snapshot.val();
            if (val === null) { return; }
            this.setState({
                ai: {
                    activity: val.activity
                }
            });
        });
    }

    getComponentSize() {
        let height = document.getElementById('seesea-camera').clientHeight;
        let width = document.getElementById('seesea-camera').clientWidth;
        this.setState({
            size: {
                height: height,
                width: width
            }
        });
    }

    render() {
        let height = this.state.size.height;
        let width = this.state.size.width;
        const { image_url } = this.state;
        const activity = this.state.ai.activity;
        var activityString = "";
        var activityColor = "";
        if (activity) {
            activityString = "高活性";
            activityColor = "#4E96E4";
        } else {
            activityString = "低活性";
            activityColor = "#F35C5C";
        }

        return (
            <div id="seesea-camera" className='base'>
                <span className='base-title-large'>カメラ</span>
                <p className="activity" style={{backgroundColor: activityColor}}>{activityString}</p>
                <img
                    id="canvas"
                    src={image_url}
                    style={{
                        marginTop: 50,
                        marginLeft: "auto",
                        marginRight: "auto",
                        height: height - 60,
                        width: width - 30,
                        backgroundColor: "#F6F9FC"
                    }}
                ></img>
            </div>
        )
    }

}

export default Camera