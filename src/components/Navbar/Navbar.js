import React, { Component } from 'react'
import firebase from '../../firebase.js'

import './Navbar.css'
import '../Base/Base.css'

import logo from '../../images/logo.png'


class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    componentWillUnmount() {
        document.addEventListener('click', this.closeMenu);
        document.removeEventListener('click', this.closeMenu);
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {
        if (!this.dropdownMenu.contains(event.target)) {
            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.closeMenu);
            });
        }
    }

    clickSettingProfile(event) {

    }

    clickLogout(event) {
        firebase.auth().signOut()
    }

    render() {
        return (
            <div id='seesea-navbar'>
                <img className='logo' src={logo} />
                <button className='profile' onClick={this.showMenu}>
                    <div className='arrow'>
                        <div className='arrow-icon'></div>
                    </div>
                    <b className='username'>{this.props.user.name}</b>
                    <img className='usericon' src={this.props.user.icon} />
                </button>

                {
                    this.state.showMenu
                        ? (
                            <div
                                className="menu base"
                                ref={(element) => {
                                    this.dropdownMenu = element;
                                }}
                            >
                                <button className="menu-item" onClick={this.clickSettingProfile}>プロフィール設定</button>
                                <button className="menu-item" onClick={this.clickLogout}>ログアウト</button>
                            </div>
                        )
                        : (
                            null
                        )
                }

            </div>
        )
    }
}

export default Navbar