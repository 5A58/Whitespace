import React, {Component} from 'react';

class Message extends Component {
    constructor() {
        super();
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", "/" + this.props.postID, true)

        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 4) return;
            if(xhr.status !== 200) {
                // Error!
            }

            // Delete post from page
            this.props.removeFromParent(this.props.postID);
        }

        xhr.send();
    }

    render() {
        var messageStyle = {
            background: "orange",
            margin: "1em",
            position: "relative"
        };

        var deleteButton = {
            background: "red",
            height: "100%",
            width: "20px",
            display: "inline-flex",
            justifyContent: "center",
            position: "absolute",
            right: "0"
        }

        return (
            <div style={messageStyle}>
                {this.props.body}
                <div style={deleteButton} onClick={this.handleDelete}>X</div>
            </div>
        )
    }
}
export default Message;