import React, { Component } from 'react'

import './Camera.css'
import '../Base/Base.css'

var image_url = ""

class Camera extends Component {
    constructor(props) {
        super(props);
        image_url = this.props.url;
    }

    streamRaftImage() {
        console.log(this.props.url);
        setInterval(function () {
            var myImageElement = document.getElementById('canvas');
            var newImage = image_url + '?' + new Date();
            myImageElement.src = newImage;
        }, 5000);
    }

    componentDidMount() {
        this.streamRaftImage();
    }

    render() {
        return (
            <div className='seesea-camera base'>
                <span className='base-title-large'>カメラ</span>
                <img id="canvas" className="canvas" src={image_url}></img>
            </div>
        )
    }

}

export default Camera