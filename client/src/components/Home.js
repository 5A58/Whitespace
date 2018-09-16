import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Particles from 'react-particles-js';
import "../styles/home.scss";

const particleParams = {
    "particles": {
    "number": {
        "value": 200,
            "density": {
            "enable": true,
                "value_area": 800
        }
    },
    "color": {
        "value": "#ffffff"
    },
    "shape": {
        "type": "circle",
            "stroke": {
            "width": 0,
                "color": "#000000"
        },
        "polygon": {
            "nb_sides": 5
        },
        "image": {
            "src": "img/github.svg",
                "width": 100,
                "height": 100
        }
    },
    "opacity": {
        "value": 0.5,
            "random": false,
            "anim": {
            "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
        }
    },
    "size": {
        "value": 3,
            "random": true,
            "anim": {
            "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
        }
    },
    "line_linked": {
        "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
    },
    "move": {
        "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
            "enable": false,
                "rotateX": 600,
                "rotateY": 1200
        }
    }
},
    "interactivity": {
    "detect_on": "canvas",
        "events": {
        "onhover": {
            "enable": true,
                "mode": "grab"
        },
        "onclick": {
            "enable": true,
                "mode": "push"
        },
        "resize": true
    },
    "modes": {
        "grab": {
            "distance": 140,
                "line_linked": {
                "opacity": 1
            }
        },
        "bubble": {
            "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
        },
        "repulse": {
            "distance": 200,
                "duration": 0.4
        },
        "push": {
            "particles_nb": 4
        },
        "remove": {
            "particles_nb": 2
        }
    }
},
    "retina_detect": true
}


class Home extends Component {
    render() {
        return (
            <div id={"homeContainer"}>
                {/*<NavLink to="/login">Login</NavLink>*/}
                {/*<NavLink to="/register">Sign Up</NavLink>*/}
                <Particles
                    params={particleParams}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />
                <div id={"content"}>
                    <div id={"titleContent"}>
                        <p id={"title"}>Whitespace</p>
                        <p id={"description"}>Post news about your life for the world to see</p>
                        <NavLink id={"resultsNav"} className={"draw-border"} to="/results">Get Started</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;