import React, { Component } from 'react'

import './Camera.css'
import '../Base/Base.css'

var image_url = "";
var getRaftImageInterval = null;

class Camera extends Component {
    constructor(props) {
        super(props);
        this.getComponentSize = this.getComponentSize.bind(this);
        this.state = {
            size: {
                height: 0,
                width: 0
            }
        }
        image_url = this.props.url;
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
        clearInterval(getRaftImageInterval);
    }

    streamRaftImage() {
        console.log(this.props.url);
        getRaftImageInterval = setInterval(function () {
            var myImageElement = document.getElementById('canvas');
            var newImage = image_url + '?' + new Date();
            myImageElement.src = newImage;
        }, 5000);
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
        return (
            <div id="seesea-camera" className='base'>
                <span className='base-title-large'>カメラ</span>
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