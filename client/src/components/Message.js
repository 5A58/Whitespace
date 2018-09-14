import React, {Component} from 'react';

class Message extends Component {
    render() {
        var messageStyle = {
            background: "orange",
            margin: "1em"
        };

        return (
            <div style={messageStyle}>
                {this.props.name}
            </div>
        )
    }
}
export default Message;