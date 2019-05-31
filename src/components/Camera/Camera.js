import React, { Component } from 'react'

import './Camera.css'
import '../Base/Base.css'

const image_url = "http://uoccya.ise-hp.com/cages/lastimg/5018";

class Camera extends Component {

    streamRaftImage() {
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
            <div className='camera base'>
                <span className='base-title-large'>カメラ</span>
                <img id="canvas" class="canvas" src={image_url}></img>
            </div>
        )
    }

}

export default Camera