import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Login from './Login.js';
import Dashboard from './dashboard/Dashboard.js';
import Showcase from './showcase/Showcase.js'
import firebase from './firebase.js'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            authenticated: false,
            user: null
        };
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    authenticated: true,
                    user: user,
                    loading: false
                });
            } else {
                this.setState({
                    authenticated: false,
                    user: null,
                    loading: false
                });
            }
        });
    }

    render() {
        const { authenticated, loading } = this.state;
        if (loading) return <p>loading..</p>;

        if (authenticated === false) {
            return (
                <BrowserRouter>
                    <Redirect to={'/login'} />
                    <Route path='/login' component={Login} />
                </BrowserRouter>
            )
        }
        return (
            <div className="App">
                <BrowserRouter>
                    <Route exact path="/" component={() => <Redirect to="/showcase" />}/>
                    <Route path='/login' component={Login} />
                    <Route path='/showcase' component={Showcase} />
                    <Route path='/dashboard' component={Dashboard} />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;