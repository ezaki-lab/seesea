import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import Navbar from '../components/Navbar/Navbar.js'
import Display from '../components/Display/Display.js'
import user from '../user.js'
import './Showcase.css'

class Showcase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            windowSize: {
              width: window.innerWidth,
              height: window.innerHeight,
            },
        }
        this.getWindowSize = this.getWindowSize.bind(this);
    }

    componentWillMount() {
        window.addEventListener('resize', () => {
          this.getWindowSize();
        });
    }

    getWindowSize() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        let wsize = {
          width: width,
          height: height,
        };
        this.setState({ windowSize: wsize });
    }

    render() {
        var layout = [];
        var margin = [0, 0];
        var cols = 0;
        var rowHeight = 0;
        let wsize = this.state.windowSize;
        margin = [50, 50];
        cols = 2;
        rowHeight = 300;
        layout = [
          { i: 'display0', x: 0, y: 0, w: 1, h: 1, static: true },
          { i: 'display1', x: 1, y: 0, w: 1, h: 1, static: true },
          { i: 'display2', x: 0, y: 1, w: 1, h: 1, static: true },
          { i: 'display3', x: 1, y: 1, w: 1, h: 1, static: true },
        ];
        return (
            <div id="Showcase">
              <Navbar user={user} style={{zIndex:1000}}></Navbar>
              <GridLayout layout={layout} cols={cols} margin={margin} rowHeight={rowHeight} width={wsize.width}>
                    <div key="display0">
                        <Display raftId={5018}></Display>
                    </div>
                    <div key="display1">
                        <Display raftId={5012}></Display>
                    </div>
                    <div key="display2">
                        <Display raftId={5022}></Display>
                    </div>
                    <div key="display3">
                        <Display raftId={5024}></Display>
                    </div>
              </GridLayout>
            </div>
          )
    }

}

export default Showcase;