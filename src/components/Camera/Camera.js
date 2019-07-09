import React, { Component } from 'react'

import './Camera.css'
import '../Base/Base.css'

var image_url = "";

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

    streamRaftImage() {
        console.log(this.props.url);
        setInterval(function () {
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

    componentDidMount() {
        this.streamRaftImage();
        this.getComponentSize();
    }

    componentWillMount() {
        window.addEventListener('resize', () => {
            this.getComponentSize();
        });
    }

    render() {
        let height = this.state.size.height;
        let width = this.state.size.width;
        return (
            <div id="seesea-camera" className='base'>
                <span className='base-title-large'>カメラ</span>
                {/* <div
                    className="canvas-container"
                    style={{
                        marginTop: 60,
                        marginLeft: "auto",
                        marginRight: "auto",
                        height: height - 70,
                        width: width - 30,
                        backgroundColor: "gray",
                        display: 'flex', justifyContent: 'center',
                        backgroundImage: `url(${image_url})`,
                        filter: 'blur(8px)',
                    }}
                >
                    <img
                        id="canvas"
                        src={image_url}
                        style={{
                            height: "100%",
                        }}
                    ></img>
                </div> */}
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