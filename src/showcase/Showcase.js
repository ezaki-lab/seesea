import React, { Component } from 'react';
import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom'
import {
    isBrowser,
    isMobile,
    isTablet,
} from "react-device-detect";
import GridLayout from 'react-grid-layout';
import Dashboard from '../dashboard/Dashboard.js'
import Navbar from '../components/Navbar/Navbar.js'
import Display from '../components/Display/Display.js'
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

    componentWillUnmount() {
        window.removeEventListener('resize', this.getWindowSize);
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
        if (isMobile) {
            margin = [20, 20];
            cols = 1;
            rowHeight = 200;
            layout = [
                { i: 'display0', x: 0, y: 0, w: 1, h: 1, static: true },
                { i: 'display1', x: 0, y: 1, w: 1, h: 1, static: true },
                { i: 'display2', x: 0, y: 2, w: 1, h: 1, static: true },
                { i: 'display3', x: 0, y: 3, w: 1, h: 1, static: true },
            ];
        }
        if (isTablet || isBrowser) {
            margin = [50, 50];
            cols = 2;
            rowHeight = 300;
            layout = [
                { i: 'display0', x: 0, y: 0, w: 1, h: 1, static: true },
                { i: 'display1', x: 1, y: 0, w: 1, h: 1, static: true },
                { i: 'display2', x: 0, y: 1, w: 1, h: 1, static: true },
                { i: 'display3', x: 1, y: 1, w: 1, h: 1, static: true },
            ];
        }
        return (
            <div id="Showcase">
                <Navbar style={{ zIndex: 1000 }}></Navbar>
                <GridLayout layout={layout} cols={cols} margin={margin} rowHeight={rowHeight} width={wsize.width}>
                    <div key="display0">
                        <Link to={'/cages/'+5019+'/dashboard'} style={{ textDecoration: 'none' }}>
                            <Display raftId={5019} name="AI給餌機"></Display>
                        </Link>
                    </div>
                    <div key="display1">
                        <Link to={'/cages/'+5057+'/dashboard'} style={{ textDecoration: 'none' }}>
                            <Display raftId={5057} name="ICT給餌機"></Display>
                        </Link>
                    </div>
                    <div key="display2">
                        <Link to={'/cages/'+5058+'/dashboard'} style={{ textDecoration: 'none' }}>
                            <Display raftId={5058} name="タイマー給餌機"></Display>
                        </Link>
                    </div>
                    <div key="display3">
                        <Link to={'/cages/'+5024+'/dashboard'} style={{ textDecoration: 'none' }}>
                            <Display raftId={5024}></Display>
                        </Link>
                    </div>
                </GridLayout>
                <BrowserRouter>
                    <Route path='/cages/:id/dashboard' component={Dashboard}></Route>
                </BrowserRouter>
            </div>
        )
    }

}

export default Showcase;