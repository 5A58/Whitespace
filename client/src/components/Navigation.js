import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/results">Results</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Sign Up</NavLink>
            </div>
        )
    }
}

export default Navigation;