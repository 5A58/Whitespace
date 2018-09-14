import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Sign Up</NavLink>
                <p>Home</p>
                <NavLink to="/results">Results</NavLink>
            </div>
        )
    }
}
export default Home;