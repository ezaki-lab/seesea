import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Showcase from './showcase/Showcase.js'
import firebase from './firebase.js'
import './Login.css';
import './components/Base/Base.css'

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            user: null,
            authenticated: false,
        };

        this.handleClickLogin = this.handleClickLogin.bind(this);
    }

    handleClickLogin(event) {
        event.preventDefault();

        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.setState({
                    authenticated: true,
                    user: user
                });
            })
            .catch((error) => {
                this.setState({
                    authenticated: false,
                    user: null
                });
                alert(error);
            });
    }

    render() {
        const { authenticated } = this.state;
        if (authenticated) {
            return (
                <BrowserRouter>
                    <Redirect to={'/showcase'} />
                    <Route path='/showcase' component={Showcase} />
                </BrowserRouter>
            )
        }
        else {
            return (
                <div className="Login">
                    <div className="form base" onSubmit={this.handleClickLogin}>
                        <form>
                            <div className="content">
                                <p className="inputtitle">Email address</p>
                                <input className="input" type="email" name="email" onChange={(e) => this.setState({ email: e.target.value })}></input>
                            </div>
                            <div className="content">
                                <p className="inputtitle">Password</p>
                                <input className="input" type="password" name="password" onChange={(e) => this.setState({ password: e.target.value })}></input>
                            </div>
                            <div className="content">
                                <button className="button" type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

export default Login;