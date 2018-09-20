import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import socketIOClient from "socket.io-client";

// Components
import Home from './components/Home';
import Results from './components/Results';
import NotFound from './components/NotFound';

import './App.scss';

class App extends Component {
    constructor() {
        super();

        if(window.location.hostname === "localhost") {
            this.state = {endpoint: "localhost:5000"};
        } else {
            this.state = {endpoint: `${window.location.hostname}`};
        }
    }
    render() {
        // testing for socket connections
        const socket = socketIOClient(this.state.endpoint);

        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/results" component={() => <Results socket={socket} />}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;