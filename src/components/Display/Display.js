import React, { Component } from 'react'

import './Display.css'
import '../Base/Base.css'

class Display extends Component {
    constructor(props) {
        super(props);

        this.getComponentSize = this.getComponentSize.bind(this);
        const { raftId } = this.props;
        this.state = {
            size: {
                height: 0,
                width: 0
            },
            image_url: "http://uoccya.ise-hp.com/cages/lastimg/" + raftId,
            getRaftImageInterval: null
        }
    }

    componentDidMount() {
        this.streamRaftImage();
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

    getComponentSize() {
        let height = document.getElementById('seesea-display').clientHeight;
        let width = document.getElementById('seesea-display').clientWidth;
        this.setState({
            size: {
                height: height,
                width: width
            }
        });
    }

    render() {
        var style = {
            zIndex: 500,
            width: '100%',
            height: '100%'
        }
        const { width, height } = this.props;
        if (width) {
            style.width = width;
        }
        if (height) {
            style.height = height;
        }

        const { image_url } = this.state;

        return (
            <div id="seesea-display" className='base' style={style}>
                <div className='info-content'>
                    <div className='name-content'>
                        <div className='name'>養殖筏1</div>
                    </div>
                    <div className='description-content'>
                        <div className='elapsed-days-label label'>経過日数</div>
                        <div className='elapsed-days data'>360日</div>
                        <div className='fish-weight-label label'>魚の重さ</div>
                        <div className='fish-weight data'>750g</div>
                    </div>
                </div>
                <div className='image-content'>
                    <img id="canvas" src={image_url} ></img>
                </div>
            </div>
        )
    }
}

export default Display;