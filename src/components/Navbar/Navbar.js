import React, { Component } from 'react'
import firebase from '../../firebase.js'
import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom'

import './Navbar.css'
import '../Base/Base.css'

import logo from '../../images/logo.png'
import defaultIcon from '../../images/defaultIcon.png'


class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
            user: {
                name: "",
                icon: defaultIcon
            }
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);

        this.startFetchUserDataFromFirebase();
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

    startFetchUserDataFromFirebase() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId).on('value', snapshot => {
            firebase.storage().refFromURL(snapshot.val()['icon_path']).getDownloadURL().then(function (url) {
                this.setState({
                    user: {
                        name: snapshot.val()['name'],
                        icon: url
                    }
                });
            }.bind(this)).catch(function (error) {
                this.setState({
                    user: {
                        name: snapshot.val()['name'],
                        icon: defaultIcon
                    }
                });
            }.bind(this));
        });
    }

    render() {
        return (
            <div id='seesea-navbar'>
                <Link className='logo-link' to={'/cages/showcase'} style={{ textDecoration: 'none' }}>
                    <img className='logo' src={logo} />
                </Link>
                <button className='profile' onClick={this.showMenu}>
                    <div className='arrow'>
                        <div className='arrow-icon'></div>
                    </div>
                    <b className='username'>{this.state.user.name}</b>
                    <img className='usericon' src={this.state.user.icon} />
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