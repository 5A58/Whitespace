import React, {Component} from 'react';
import "../styles/notfound.scss";

class NotFound extends Component {
    render() {
        return (
            <div id={"bg"}>
                <p id={"not-found-title"} className={"hit-the-floor"}>404</p>
                <p id={"not-found-text"}>Nothing to see here!</p>
            </div>
        )
    }
}
export default NotFound;