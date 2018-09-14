import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// Components
import Home from './components/Home';
import Results from './components/Results';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Register from "./components/Register";

import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/" component={Home} exact />
                        <Route path="/results" component={Results}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;