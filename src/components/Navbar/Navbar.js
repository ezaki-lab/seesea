import React, { Component } from 'react'

import './Navbar.css'

import logo from '../../images/logo.png'


class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='seesea-navbar'>
                <img className='logo' src={logo} />
                <a className='profile' href="https://www.google.com/">
                    <div className='arrow'>
                        <div className='arrow-icon'></div>
                    </div>
                    <b className='username'>{this.props.user.name}</b>
                    <img className='usericon' src={this.props.user.icon} />
                </a>
            </div>
        )
    }
}

export default Navbar